import os
import firebase_admin
from firebase_admin import credentials, firestore, auth

# Path to your downloaded service account JSON
CRED_PATH = os.path.join(os.path.dirname(__file__), "../../firebase/credentials.json")

# Initialize Firebase app only once
if not firebase_admin._apps:
    cred = credentials.Certificate(CRED_PATH)
    firebase_admin.initialize_app(cred)

# Firestore client
db = firestore.client()
