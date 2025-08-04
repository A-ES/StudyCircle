from fastapi import APIRouter
from app.models.rooms_models import RoomCreateRequest
import uuid

router = APIRouter()

# In-memory DB for prototyping only
rooms_db = []

@router.get("/")
def get_rooms():
    return {"rooms": rooms_db}

@router.post("/")
def create_room(data: RoomCreateRequest):
    new_room = {
        "id": str(uuid.uuid4()),
        "name": data.name,
        "description": data.description
    }
    rooms_db.append(new_room)
    return {"room": new_room}