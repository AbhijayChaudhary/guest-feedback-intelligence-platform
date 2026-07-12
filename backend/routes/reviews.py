"""
Reviews Router

This module defines the API endpoints for managing and retrieving guest reviews.
It handles requests under the '/api/reviews' path (once registered) and performs
live database operations against MongoDB.
"""

from fastapi import APIRouter, HTTPException, status, Depends
from typing import List, Dict, Any

# Import authentication middleware dependency
from middleware import require_auth

# Import our Review model
from models import Review

# Import the MongoDB collection object
from utils.database import review_collection

def remove_mongo_id(document: Dict[str, Any]):
    """
    Helper function to remove MongoDB's internal "_id" field (ObjectId)
    from a document dictionary before returning it to the user.
    This prevents Pydantic validation errors since "_id" is not in the schema.
    """
    if document is not None:
        document.pop("_id", None)
    return document

# Initialize the router
router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"]
)

@router.get("/", response_model=List[Review], status_code=status.HTTP_200_OK)
async def get_all_reviews(current_user: dict = Depends(require_auth)):
    """
    Retrieve all guest reviews from MongoDB, sorted by ID in ascending order.
    
    This endpoint is protected by require_auth middleware:
    - Extracts 'Authorization' header and validates 'Bearer <token>' format.
    - Decodes JWT access token and queries MongoDB for the matching user.
    - If successful, proceeds and makes the authenticated 'current_user' available.
    """
    # Query MongoDB for all reviews
    cursor = review_collection.find()
    
    # Sort the results by 'id' field in ascending order (1)
    cursor = cursor.sort("id", 1)
    
    reviews = []
    for doc in cursor:
        # Use our helper function to remove the private '_id' field
        remove_mongo_id(doc)
        reviews.append(doc)
        
    return reviews

@router.get("/search", response_model=List[Review], status_code=status.HTTP_200_OK)
async def search_reviews(q: str):
    """
    Search reviews directly in MongoDB by a query parameter 'q'.
    Matches (case-insensitive) against guest_name, review, category, and sentiment
    using a MongoDB $or query with the $regex operator.
    """
    # Build a query using MongoDB's $or operator to search across multiple fields.
    # The $regex operator allows substring matching, and the $options 'i' parameter
    # makes the search case-insensitive.
    query = {
        "$or": [
            {"guest_name": {"$regex": q, "$options": "i"}},
            {"review": {"$regex": q, "$options": "i"}},
            {"category": {"$regex": q, "$options": "i"}},
            {"sentiment": {"$regex": q, "$options": "i"}}
        ]
    }
    
    # Run the query on MongoDB and return results sorted by review ID
    cursor = review_collection.find(query).sort("id", 1)
    
    results = []
    for doc in cursor:
        # Remove MongoDB's internal '_id' before returning
        remove_mongo_id(doc)
        results.append(doc)
        
    return results

@router.get("/{review_id}", response_model=Review, status_code=status.HTTP_200_OK)
async def get_review_by_id(review_id: int):
    """
    Retrieve a single review from MongoDB by its unique ID.
    Raises an HTTP 404 error if the review does not exist.
    """
    # Find a single document with the matching custom 'id' field
    doc = review_collection.find_one({"id": review_id})
    
    if not doc:
        # If no document is matched, raise a 404 HTTPException
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Review with ID {review_id} not found"
        )
        
    # Remove MongoDB's internal '_id' field before validation
    remove_mongo_id(doc)
    
    return doc

@router.post("/", response_model=Review, status_code=status.HTTP_201_CREATED)
async def create_review(
    new_review: Review,
    current_user: dict = Depends(require_auth)
):
    """
    Create a new guest review in MongoDB.
    Validates that the ID is unique before inserting.
    """
    # Check if a review with the same custom 'id' already exists in MongoDB
    existing_doc = review_collection.find_one({"id": new_review.id})
    if existing_doc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Review with ID {new_review.id} already exists"
        )
        
    # Convert Pydantic object to dictionary
    review_dict = new_review.model_dump()
    
    # Insert the document into MongoDB
    review_collection.insert_one(review_dict)
    
    # Remove '_id' if present
    remove_mongo_id(review_dict)
    
    return review_dict

@router.put("/{review_id}", response_model=Review, status_code=status.HTTP_200_OK)
async def update_review(
    review_id: int,
    updated_review: Review,
    current_user: dict = Depends(require_auth)
):
    """
    Update an existing guest review in MongoDB by its ID.
    Replaces the review data, forcing the ID to remain as specified in the path.
    """
    # Check if the review exists in MongoDB before attempting update
    existing_doc = review_collection.find_one({"id": review_id})
    if not existing_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Review with ID {review_id} not found"
        )
        
    # Convert Pydantic object to dictionary
    review_dict = updated_review.model_dump()
    
    # Always preserve the URL path's review_id as the final ID
    review_dict["id"] = review_id
    
    # Perform the update on MongoDB using update_one with $set
    review_collection.update_one({"id": review_id}, {"$set": review_dict})
    
    # Clean up the returning dictionary by removing '_id'
    remove_mongo_id(review_dict)
    
    return review_dict

@router.delete("/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_review(
    review_id: int,
    current_user: dict = Depends(require_auth)
):
    """
    Delete a guest review from MongoDB by its ID.
    Returns HTTP 204 No Content on success.
    """
    # Delete the document with the matching custom 'id'
    result = review_collection.delete_one({"id": review_id})
    
    # If deleted_count is 0, it means no document matched the given ID
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Review with ID {review_id} not found"
        )
        
    return
