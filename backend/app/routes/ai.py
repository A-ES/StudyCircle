from fastapi import APIRouter
from app.models.ai_models import AIRequest
from app.services.gemini_service import get_gemini_response

router = APIRouter()

@router.post("/message")
def ask_gemini(req: AIRequest):
    reply = get_gemini_response(req.message)
    return {"reply": reply}