"""
AI Routes

This module exposes all AI-related API endpoints for GuestBook.

The routes are responsible for:
- Receiving review text from the frontend
- Validating incoming requests
- Calling the Gemini AI service
- Returning structured AI analysis as JSON
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

# Import the reusable Gemini analysis function
from utils.gemini_service import analyze_review

# Create a router for all AI-related endpoints
router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


# Request body schema
# This defines what the frontend should send.
class ReviewAnalysisRequest(BaseModel):
    review: str


@router.post("/analyze-review")
async def analyze_review_endpoint(request: ReviewAnalysisRequest):
    """
    Analyze a guest review using Gemini AI.

    This endpoint accepts raw guest review text, sends it to the
    Gemini AI service, and returns structured analysis containing:

    - Sentiment
    - Themes
    - Summary
    - Response suggestion
    - Sarcasm detection
    """

    # Prevent empty reviews from being analyzed
    if not request.review.strip():
        raise HTTPException(
            status_code=400,
            detail="Review cannot be empty."
        )

    try:
        # Call the reusable AI service
        result = analyze_review(request.review)

        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI analysis failed: {str(e)}"
        )