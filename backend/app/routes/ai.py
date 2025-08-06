from fastapi import APIRouter, HTTPException
from app.models.ai_models import AIRequest
from app.services.gemini_service import get_gemini_response
from app.services.firebase_service import db
from datetime import datetime
import uuid

router = APIRouter()

@router.post("/message")
def ask_gemini(req: AIRequest):
    try:
        # Get AI reply
        reply = get_gemini_response(req.message)

        # Create a message object
        message_entry = {
            "user_id": req.user_id,
            "room_id": req.room_id,
            "user_message": req.message,
            "ai_reply": reply,
            "timestamp": datetime.utcnow().isoformat()
        }

        # Save message to Firestore
        msg_id = str(uuid.uuid4())
        db.collection("rooms").document(req.room_id).collection("messages").document(msg_id).set(message_entry)

        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
