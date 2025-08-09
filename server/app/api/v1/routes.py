from fastapi import APIRouter
from .auth.router import auth_router
from .user.router import user_router

# Define v1 router
v1_router = APIRouter(prefix="/v1")

# Include sub-routers
v1_router.include_router(user_router)
v1_router.include_router(auth_router)

@v1_router.get("/")
async def root():
    return {"message": "Welcome to API version 1"}