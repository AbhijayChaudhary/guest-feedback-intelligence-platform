"""
Authentication Middleware

This module defines the require_auth dependency to authenticate FastAPI requests
by validating the JWT token in the Authorization header.
"""

from fastapi import Header, HTTPException, status
from utils.database import users_collection
from utils.jwt_handler import verify_access_token

async def require_auth(authorization: str = Header(None)) -> dict:
    """
    Dependency function to enforce authentication on routes.
    
    Checks for a valid JWT token in the 'Authorization' header in the format:
    Bearer <token>
    
    If the token is valid, it retrieves the user information from the database
    and returns it. Otherwise, it raises an HTTP 401 Unauthorized exception.
    """
    # 1. Check if Authorization header is present
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header is missing",
            headers={"WWW-Authenticate": "Bearer"}
        )
        
    # 2. Check if format is exactly "Bearer <token>"
    parts = authorization.split()
    if len(parts) != 2 or parts[0] != "Bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token format. Expected: Bearer <token>",
            headers={"WWW-Authenticate": "Bearer"}
        )
        
    token = parts[1]
    
    # 3. Verify and decode the access token
    payload = verify_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"}
        )
        
    # 4. Extract user identifier from the token payload
    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload: missing user identification",
            headers={"WWW-Authenticate": "Bearer"}
        )
        
    # 5. Fetch user details from MongoDB using users_collection
    user = users_collection.find_one({"id": user_id})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or database record missing",
            headers={"WWW-Authenticate": "Bearer"}
        )
        
    # 6. Sanitize user object by removing password hash for security
    if "password" in user:
        del user["password"]
        
    # 7. Convert MongoDB ObjectId to string to prevent serialization issues
    if "_id" in user:
        user["_id"] = str(user["_id"])
        
    # 8. Return the authenticated user object
    return user
