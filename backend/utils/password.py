"""
Password Hashing Utility

This module provides helper functions to securely hash passwords and verify them
using the bcrypt library.
"""

import bcrypt

def hash_password(password: str) -> str:
    """
    Hash a plaintext password using bcrypt.
    
    Args:
        password (str): The plain-text password to hash.
        
    Returns:
        str: The hashed password string.
    """
    # Generate a salt and hash the password
    salt = bcrypt.gensalt(rounds=12)
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plaintext password against a bcrypt hash.
    
    Args:
        plain_password (str): The plain-text password to check.
        hashed_password (str): The hashed password to verify against.
        
    Returns:
        bool: True if the passwords match, False otherwise.
    """
    # Compare the password with the hash
    try:
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    except Exception:
        return False
