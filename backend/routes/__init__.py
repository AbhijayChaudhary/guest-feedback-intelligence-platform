# Routes package
from .reviews import router as reviews_router
from .auth import router as auth_router
from .ai import router as ai_router

__all__ = ["reviews_router", "auth_router", "ai_router"]
