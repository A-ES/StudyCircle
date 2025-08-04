from pydantic import BaseModel

class RoomCreateRequest(BaseModel):
    name: str
    description: str