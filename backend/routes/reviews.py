"""
Reviews Router

This module defines the API endpoints for managing and retrieving guest reviews.
It handles requests under the '/api/reviews' path (once registered).
"""

from fastapi import APIRouter, HTTPException, status
from typing import List

# Import our Review model and in-memory sample reviews
from models import Review
from data import SAMPLE_REVIEWS

# Initialize the router. We omit '/api' prefix here because it will be added
# when we register the router in main.py.
router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"]
)

@router.get("/", response_model=List[Review], status_code=status.HTTP_200_OK)
async def get_all_reviews():
    """
    Retrieve all guest reviews from the in-memory store.
    """
    return SAMPLE_REVIEWS

@router.get("/{review_id}", response_model=Review, status_code=status.HTTP_200_OK)
async def get_review_by_id(review_id: int):
    """
    Retrieve a single review by its unique ID.
    Raises an HTTP 404 error if the review does not exist.
    """
    # Search for the review matching the provided review_id
    for review in SAMPLE_REVIEWS:
        if review["id"] == review_id:
            return review
            
    # If not found, raise a 404 HTTPException
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Review with ID {review_id} not found"
    )

@router.post("/", response_model=Review, status_code=status.HTTP_201_CREATED)
async def create_review(new_review: Review):
    """
    Create a new guest review.
    Validates that the ID is unique before appending to the in-memory list.
    """
    # Check if a review with the same ID already exists in our mock data
    for review in SAMPLE_REVIEWS:
        if review["id"] == new_review.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Review with ID {new_review.id} already exists"
            )
            
    # Convert Pydantic object to dictionary and save it to our in-memory list
    SAMPLE_REVIEWS.append(new_review.model_dump())
    
    return new_review
