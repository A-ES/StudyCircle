from fastapi import FastAPI
from app.routes import rooms, ai

app = FastAPI()

# Attach routers for rooms and AI endpoints
app.include_router(rooms.router, prefix="/api/rooms")
app.include_router(ai.router, prefix="/api/ai")

@app.get("/")
def root():
    return {"message": "StudyCircle backend running"}