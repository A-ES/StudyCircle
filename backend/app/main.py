from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import rooms, ai  # Import routers

app = FastAPI()

# Allow React frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(rooms.router, prefix="/api/rooms")
app.include_router(ai.router, prefix="/api/ai")

# Test root route
@app.get("/")
def root():
    return {"message": "StudyCircle backend running"}
