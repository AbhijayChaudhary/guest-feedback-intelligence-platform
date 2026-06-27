"""
Review Data Model

This module defines the schema/structure for guest reviews using Pydantic's BaseModel.
It ensures that all reviews contain the required fields and matching data types.
"""

from pydantic import BaseModel

class Review(BaseModel):
    # Unique identifier for the review
    id: int
    
    # Name of the guest who wrote the review
    guest_name: str
    
    # Rating given by the guest (typically between 1 and 5)
    rating: int
    
    # The actual review text
    review: str
    
    # Sentiment analysis result (e.g., "Positive", "Negative", "Neutral")
    sentiment: str
    
    # Category of the review (e.g., "Cleanliness", "Food", "Staff")
    category: str
    
    # ISO timestamp when the review was created (as a string)
    created_at: str
