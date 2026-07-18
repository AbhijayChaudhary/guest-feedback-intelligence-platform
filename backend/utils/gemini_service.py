"""
Gemini AI Service

This module contains reusable functions for communicating with the
Google Gemini API.

The service is responsible for:
- Loading the Gemini API key
- Sending prompts to Gemini
- Returning structured AI responses
"""

import json
import os

from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

# Read Gemini API key from .env
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "models/gemini-3.5-flash")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is missing from the .env file.")

# Create Gemini client
client = genai.Client(api_key=GEMINI_API_KEY)

SYSTEM_PROMPT = """
You are an expert hospitality review analyst.

Analyze the guest review and return ONLY valid JSON.

Do not include markdown.
Do not include explanations.
Do not wrap the JSON in triple backticks.

Return exactly this structure:

{
  "sentiment": "Positive | Neutral | Negative",
  "themes": [],
  "summary": "",
  "response_suggestion": "",
  "sarcasm_detected": false
}

Rules:

- Sentiment must be one of:
Positive
Neutral
Negative

- Themes must ONLY come from this list:
Cleanliness
Food
Host Behaviour
Location
Wi-Fi
Amenities
Value for Money
Overall Experience

- summary should be 1–2 concise sentences.

- response_suggestion should be polite and professional.

- sarcasm_detected must be either true or false.
"""

# Analyze the review and return structured JSON
def analyze_review(review_text: str):
    """
    Analyze a guest review using Gemini AI.
    Returns a Python dictionary.
    """

    prompt = f"""
Guest Review:

{review_text}
"""

    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=[
            SYSTEM_PROMPT,
            prompt
        ]
    )

    text = response.text.strip()

    # Remove accidental markdown if Gemini returns it
    if text.startswith("```"):
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

    return json.loads(text)