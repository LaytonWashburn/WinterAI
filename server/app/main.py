from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from minio import Minio
from app.routers.user.user import user_router
from app.services.auth.auth import auth_router

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://client:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")
app.include_router(user_router, prefix="/user")

@app.get("/")
async def root():
    return {"message": "Hello World"}