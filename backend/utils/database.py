"""
Database Connection Manager

This module handles connecting to MongoDB Atlas using PyMongo.
It loads database configurations from the environment and verifies
the connection status on startup.
"""

import os
import certifi
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

# Load environment variables from the .env file in the backend directory
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dotenv_path = os.path.join(base_dir, ".env")
load_dotenv(dotenv_path)

# Read configurations
MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "guestbook_db")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "reviews")

# Global PyMongo client, database, and collection objects
client = None
db = None
review_collection = None
users_collection = None

try:
    if not MONGO_URI:
        raise ValueError("MONGO_URI is not set in the environment (.env file).")

    # Initialize the client with local SSL/TLS certificate verification path via certifi
    client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
    
    # Select the database and collections
    db = client[DATABASE_NAME]
    review_collection = db[COLLECTION_NAME]
    users_collection = db["users"]
    
    # PyMongo connections are lazy. We perform a ping command on the admin
    # database to verify that the connection works and credentials are correct.
    client.admin.command("ping")
    print("✅ Connected to MongoDB Atlas successfully.")


except ConnectionFailure as conn_err:
    print(f"❌ Failed to connect to MongoDB Atlas (Connection Error): {conn_err}")
except Exception as err:
    print(f"❌ Failed to initialize MongoDB connection: {err}")
