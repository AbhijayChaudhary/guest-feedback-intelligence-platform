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

@router.get("/search", response_model=List[Review], status_code=status.HTTP_200_OK)
async def search_reviews(q: str):
    """
    Search reviews in the in-memory store by a query parameter 'q'.
    Matches (case-insensitive) against guest_name, review, category, and sentiment.
    """
    results = []
    
    # Normalize query to lowercase to ensure case-insensitive matching
    query_lower = q.lower()
    
    for review in SAMPLE_REVIEWS:
        # Extract fields to perform search on (default to empty string if missing)
        guest_name = review.get("guest_name", "").lower()
        review_text = review.get("review", "").lower()
        category = review.get("category", "").lower()
        sentiment = review.get("sentiment", "").lower()
        
        # Check if the query matches as a substring in any of these fields
        if (
            query_lower in guest_name or
            query_lower in review_text or
            query_lower in category or
            query_lower in sentiment
        ):
            results.append(review)
            
    return results

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

@router.put("/{review_id}", response_model=Review, status_code=status.HTTP_200_OK)
async def update_review(review_id: int, updated_review: Review):
    """
    Update an existing guest review by its ID.
    Replaces the review data, forcing the ID to remain as specified in the path.
    """
    # Search for the review in our in-memory list
    for idx, review in enumerate(SAMPLE_REVIEWS):
        if review["id"] == review_id:
            # Prepare the updated review dictionary, preserving the URL path ID
            review_dict = updated_review.model_dump()
            review_dict["id"] = review_id
            
            # Replace the existing review data in-place
            SAMPLE_REVIEWS[idx] = review_dict
            
            # Ensure returning object matches the path ID
            updated_review.id = review_id
            return updated_review
            
    # Raise a 404 error if the review to update doesn't exist
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Review with ID {review_id} not found"
    )

@router.delete("/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_review(review_id: int):
    """
    Delete a guest review by its ID.
    Removes the review from the in-memory list.
    Returns HTTP 204 No Content on success.
    """
    # Search for the review in our in-memory list
    for idx, review in enumerate(SAMPLE_REVIEWS):
        if review["id"] == review_id:
            # Remove from list
            SAMPLE_REVIEWS.pop(idx)
            return
            
    # Raise a 404 error if the review to delete doesn't exist
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Review with ID {review_id} not found"
    )
