# GuestBook

AI-Powered Guest Feedback Intelligence Platform for Homestay Businesses.

## Description

GuestBook helps homestay operators analyze guest reviews from platforms such as Google Reviews, Booking.com, and TripAdvisor. The platform uses AI to classify sentiment, identify key themes, generate response suggestions, and provide actionable insights to improve guest satisfaction and service quality.

## Tech Stack

### Frontend

- React JS
- Next.js

### Backend

- FastAPI (Python)

### Database

- MongoDB Atlas

### AI Integration

- Gemini API

## Backend Setup

### 1. Navigate to the backend folder

```bash
cd backend
```

### 2. Create a virtual environment

```bash
python3 -m venv .venv
```

### 3. Activate the virtual environment

**macOS / Linux**

```bash
source .venv/bin/activate
```

**Windows**

```bash
.venv\Scripts\activate
```

### 4. Install the required dependencies

```bash
pip install -r requirements.txt
```

### 5. Start the FastAPI server

```bash
uvicorn main:app --reload
```

The backend will run at:

```
http://127.0.0.1:8000
```

### 6. API Documentation

Swagger UI:

```
http://127.0.0.1:8000/docs
```

Interactive API documentation can be used to test all available endpoints, including:

- GET all reviews
- GET review by ID
- POST a review
- PUT update a review
- DELETE a review
- Search reviews
