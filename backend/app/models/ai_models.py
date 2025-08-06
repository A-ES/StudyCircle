from pydantic import BaseModel

class AIRequest(BaseModel):
    message: str
    room_id: str
    user_id: str
