"""
Authentication Router

This module defines the API endpoints for user registration and login.
It handles password hashing, verification, validation, and JWT token issuance.
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime, timezone

# Import the MongoDB collection object
from utils.database import users_collection

# Import helper functions
from utils.password import hash_password, verify_password
from utils.jwt_handler import create_access_token

# Initialize the router
router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

class RegisterRequest(BaseModel):
    # Full name of the user
    name: str = Field(..., min_length=2, max_length=50, description="The user's full name")
    
    # Unique email address of the user
    email: EmailStr = Field(..., description="The user's unique email address")
    
    # Plaintext password
    password: str = Field(..., min_length=8, max_length=64, description="The user's password")
    
    # Role of the user: "customer" or "manager"
    role: str = Field(..., description="The user's role (customer or manager)")

class LoginRequest(BaseModel):
    # Email address of the user
    email: EmailStr = Field(..., description="The user's registered email address")
    
    # Plaintext password
    password: str = Field(..., min_length=8, max_length=64, description="The user's password")


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(req: RegisterRequest):
    """
    Register a new user in the GuestBook system.
    
    Requirements:
    - Email must be unique.
    - Role must be either 'customer' or 'manager'.
    - Hashes password before storing.
    - Automatically assigns id (max existing id + 1) and created_at timestamp.
    - Never returns the hashed password.
    """
    # Clean and validate input fields
    role = req.role.strip().lower()
    if role not in ["customer", "manager"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role must be either 'customer' or 'manager'"
        )
        
    email = req.email.strip().lower()
    
    # Check if a user with the same email already exists
    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered"
        )
        
    # Determine the custom ID using max existing ID + 1
    max_user = users_collection.find_one(sort=[("id", -1)])
    new_id = (max_user["id"] + 1) if max_user else 1
    
    # Securely hash the password using bcrypt
    hashed_pwd = hash_password(req.password)
    
    # Generate ISO created_at timestamp
    created_at = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    
    # Prepare the user document
    user_doc = {
        "id": new_id,
        "name": req.name.strip(),
        "email": email,
        "password": hashed_pwd,
        "role": role,
        "created_at": created_at
    }
    
    # Insert user details into MongoDB
    users_collection.insert_one(user_doc)
    
    # Return user details excluding the password
    return {
        "id": user_doc["id"],
        "name": user_doc["name"],
        "email": user_doc["email"],
        "role": user_doc["role"],
        "created_at": user_doc["created_at"]
    }


@router.post("/login", status_code=status.HTTP_200_OK)
async def login(req: LoginRequest):
    """
    Authenticate a user and return a JWT access token.
    
    Requirements:
    - Finds user by email.
    - Verifies password.
    - Returns HTTP 401 for invalid credentials.
    - Generates JWT containing user_id, email, and role.
    """
    email = req.email.strip().lower()
    
    # Retrieve user from the database
    user = users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
        
    # Verify the password against the stored bcrypt hash
    if not verify_password(req.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
        
    # Prepare the JWT payload details
    token_data = {
        "user_id": user["id"],
        "email": user["email"],
        "role": user["role"]
    }
    
    # Create the token
    access_token = create_access_token(token_data)
    
    # Return response payload
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }
    }
