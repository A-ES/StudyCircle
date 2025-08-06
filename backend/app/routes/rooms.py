from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from typing import List
from ..models.rooms_models import RoomCreateRequest
from app.services.firebase_service import db
import uuid
from google.cloud import firestore

router = APIRouter()

# ---------------- Day 4: Room logic ---------------- #

@router.get("/")
def get_rooms():
    rooms_ref = db.collection("rooms")
    docs = rooms_ref.stream()
    rooms = []
    for doc in docs:
        room = doc.to_dict()
        room["id"] = doc.id
        rooms.append(room)
    return {"rooms": rooms}

@router.get("/{room_id}")
def get_room_by_id(room_id: str):
    doc = db.collection("rooms").document(room_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Room not found")
    room = doc.to_dict()
    room["id"] = doc.id
    return {"room": room}

@router.post("/")
def create_room(data: RoomCreateRequest):
    room_id = str(uuid.uuid4())
    room_data = {
        "name": data.name,
        "description": data.description,
        "members": [],
        "messages": []  # 👈 Needed for Day 5 chat history
    }
    db.collection("rooms").document(room_id).set(room_data)
    return {"room": {"id": room_id, **room_data}}

@router.post("/{room_id}/join")
def join_room(room_id: str, user: dict = Body(...)):
    user_id = user.get("uid")
    if not user_id:
        raise HTTPException(status_code=400, detail="Missing 'uid' in request body")

    doc_ref = db.collection("rooms").document(room_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Room not found")

    doc_ref.update({
        "members": firestore.ArrayUnion([user_id])
    })
    return {"message": f"User {user_id} joined room {room_id}"}

class Message(BaseModel):
    sender: str
    content: str
    role: str  # "user" or "ai"

class MessagesRequest(BaseModel):
    messages: List[Message]

@router.get("/{room_id}/messages")
def get_room_messages(room_id: str):
    doc = db.collection("rooms").document(room_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Room not found")

    room_data = doc.to_dict()
    return {"messages": room_data.get("messages", [])}

@router.post("/{room_id}/messages")
def post_room_messages(room_id: str, req: MessagesRequest):
    doc_ref = db.collection("rooms").document(room_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Room not found")

    existing_messages = doc.to_dict().get("messages", [])
    new_messages = [msg.dict() for msg in req.messages]

    updated = existing_messages + new_messages

    doc_ref.update({"messages": updated})
    return {"status": "messages added", "count": len(new_messages)}
