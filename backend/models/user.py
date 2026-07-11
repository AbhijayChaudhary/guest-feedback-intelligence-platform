"""
User Data Model

This module defines the schema/structure for users using Pydantic's BaseModel.
It ensures that all user records contain the required fields and matching data types.
"""

from pydantic import BaseModel

class User(BaseModel):
    # Unique identifier for the user
    id: int
    
    # Full name of the user
    name: str
    
    # Email address of the user (used for login and identification)
    email: str
    
    # Hashed password of the user for security
    password: str
    
    # Role of the user, restricted to "customer" or "manager"
    role: str
    
    # ISO timestamp when the user account was created (as a string)
    created_at: str
