from fastapi import APIRouter
from ..models.rooms_models import RoomCreateRequest
from app.services.firebase_service import db
import uuid

router = APIRouter()

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

@router.post("/")
def create_room(data: RoomCreateRequest):
    room_id = str(uuid.uuid4())
    room_data = {
        "name": data.name,
        "description": data.description
    }
    db.collection("rooms").document(room_id).set(room_data)
    return {"room": { "id": room_id, **room_data }}
@router.get("/rooms")
async def get_rooms():
    rooms_ref = db.collection("rooms")
    docs = await rooms_ref.stream()
    rooms = []
    for doc in docs:
        room = doc.to_dict()
        room["id"] = doc.id
        rooms.append(room)
    return {"rooms": rooms}
