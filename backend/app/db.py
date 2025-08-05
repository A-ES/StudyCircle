from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Use SQLite file db
DATABASE_URL = "sqlite:///./studycircle.db"

# connect_args is specific for SQLite to allow multi-threading
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# This is the base class for all SQLAlchemy models
Base = declarative_base()
