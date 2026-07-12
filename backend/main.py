import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

# Import rate limiter utility and exception
from utils.rate_limiter import limiter
from slowapi.errors import RateLimitExceeded

# Import routers
from routes import reviews_router, auth_router

# Initialize database connection
from utils import database
from utils.seeding import seed_database
seed_database()

# Load environment variables from .env if present
load_dotenv()

app = FastAPI(
    title="GuestBook API",
    description="FastAPI Backend for GuestBook",
    version="1.0.0"
)

# Connect the rate limiter to the application state
app.state.limiter = limiter

# Custom Exception Handler for rate limit exceeded errors
# Returns a clean JSON response with HTTP 429 Too Many Requests status
@app.exception_handler(RateLimitExceeded)
async def rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many requests. Limit is 5 requests per 15 minutes."}
    )

# CORS (Cross-Origin Resource Sharing) configuration
# Defaults to localhost:3000 for local Next.js frontend development.
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")

origins = [
    frontend_url,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(reviews_router, prefix="/api")
app.include_router(auth_router, prefix="/api")


# Global Exception Handler
# Catches all exceptions and always returns a standard 500 Internal Server Error response.
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )

@app.get("/", tags=["Health"])
async def read_root():
    return {"message": "GuestBook Backend Running"}
