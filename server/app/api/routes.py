from fastapi import APIRouter
from .v1.routes import v1_router

api_router = APIRouter(prefix="/api")

@api_router.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint to verify the server is running."""
    return {"status": "ok"}

api_router.include_router(v1_router)