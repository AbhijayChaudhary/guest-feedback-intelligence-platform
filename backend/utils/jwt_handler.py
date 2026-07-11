"""
JWT Handler Utility

This module provides helper functions to create and verify JSON Web Tokens (JWT)
for user authentication.
"""

import os
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from dotenv import load_dotenv

# Load env variables from the backend directory
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dotenv_path = os.path.join(base_dir, ".env")
load_dotenv(dotenv_path)

# Load configurations with sensible defaults
JWT_SECRET = os.getenv("JWT_SECRET", "super_secret_key_guestbook_app_2026")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

# Set ACCESS_TOKEN_EXPIRE_DAYS to default of 7 if not specified or invalid
try:
    ACCESS_TOKEN_EXPIRE_DAYS = int(os.getenv("ACCESS_TOKEN_EXPIRE_DAYS", "7"))
except ValueError:
    ACCESS_TOKEN_EXPIRE_DAYS = 7

def create_access_token(data: dict) -> str:
    """
    Create a JWT access token containing only the user information and expiration.
    
    Args:
        data (dict): Dictionary containing payload details (user_id, email, role).
        
    Returns:
        str: Encoded JWT string.
    """
    # Build payload with only the requested fields and the expiration claim
    to_encode = {
        "user_id": data.get("user_id"),
        "email": data.get("email"),
        "role": data.get("role")
    }
    
    # Calculate expiration time and add to the payload
    expire = datetime.now(timezone.utc) + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    to_encode["exp"] = expire
    
    # Encode and return the JWT
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt

def verify_access_token(token: str) -> dict:
    """
    Verify and decode a JWT access token.
    
    Args:
        token (str): Encoded JWT string.
        
    Returns:
        dict: The decoded token payload if valid, or None if invalid/expired.
    """
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except JWTError:
        return None
