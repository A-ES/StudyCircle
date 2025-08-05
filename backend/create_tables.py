from app.db import engine
from app.models import room_db

# Run this file once to create all tables
room_db.Base.metadata.create_all(bind=engine)
