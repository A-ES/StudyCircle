from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.rooms_models import RoomCreateRequest
from app.models.room_db import Room
from app.db import SessionLocal

router = APIRouter()

# Dependency to get DB session for each request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_rooms(db: Session = Depends(get_db)):
    rooms = db.query(Room).all()
    return {
        "rooms": [
            {"id": r.id, "name": r.name, "description": r.description}
            for r in rooms
        ]
    }

@router.post("/")
def create_room(data: RoomCreateRequest, db: Session = Depends(get_db)):
    new_room = Room(name=data.name, description=data.description)
    db.add(new_room)
    db.commit()
    db.refresh(new_room)
    return {
        "room": {
            "id": new_room.id,
            "name": new_room.name,
            "description": new_room.description
        }
    }
