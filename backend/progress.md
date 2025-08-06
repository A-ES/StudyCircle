## Day 1 Progress backend

# Current Progress Summary :
### 1. FastAPI Backend Fully Set Up
Built using FastAPI with a clean project structure.

Modular routing via routers for /api/rooms and /api/ai.

Swagger UI (http://127.0.0.1:8000/docs) is auto-generated and functional.

### 2. Study Room Management (Prototype)
✅ GET /api/rooms
→ Lists all existing study rooms.

✅ POST /api/rooms
→ Creates a new study room with name and description.

✅ Uses an in-memory Python list for storage (temporary, no database yet).

## 3. Gemini AI Integration (via MakerSuite API)

✅ POST /api/ai/message
→ Sends a text message to Gemini AI and returns its response.

Uses Google’s official MakerSuite-compatible SDK (google-generativeai).

Accepts user questions and generates natural language answers.

Example:

```bash
{
  "message": "Explain what a black hole is in simple words"
}
```

## steps to run backend

1. Install dependencies

```bash
pip install -r requirements.txt
```

2. Add your Gemini API key to a file named .env:

```bash
GEMINI_API_KEY=your-makersuite-api-key-here
```

3. Run the server

```bash
uvicorn app.main:app --reload
```

## Test API with Swagger UI

FastAPI automatically generates an interactive Swagger UI:

👉 Visit: http://127.0.0.1:8000/docs

Available endpoints:

GET /api/rooms → list all rooms

POST /api/rooms → create a new room

POST /api/ai/message → ask Gemini AI a question

Example for /api/rooms:

In swagger UI goto POST /api/rooms then click "try it out" and paste:

```bash
{
  "name": "AI Study Group",
  "description": "Collaborative ML practice"
}
```
then enter "Execute".

Example for /api/ai/message:

In swagger UI goto POST /api/ai/message then click "try it out" and paste:

```bash
{
  "message": "Explain Newton's second law in simple terms"
}
```

## 🧰 Firebase Setup (Collaborator Instructions)

### 🔷 Frontend

1. Run `npm install firebase`
3. Run `npm run dev`

### 🔶 Backend

1. Run `pip install -r requirements.txt` (includes `firebase-admin`)
2. Ask Sabith for `credentials.json`
3. Place it in the backend directory as `firebase/credentials.json` 
4. Run backend: `uvicorn main:app --reload`
