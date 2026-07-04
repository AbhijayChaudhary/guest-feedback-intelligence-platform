"""
Property Data Model

This module defines the schema/structure for properties using Pydantic's BaseModel.
It represents the properties collection in MongoDB.
"""

from pydantic import BaseModel

class Property(BaseModel):
    # Unique identifier for the property
    id: int
    
    # Name of the property (e.g., "Mountain View Homestay")
    name: str
    
    # Location of the property (e.g., "Mussoorie, Uttarakhand")
    location: str
    
    # Brief description of the property
    description: str
