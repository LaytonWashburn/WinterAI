from fastapi import APIRouter, Depends, Form
from sqlalchemy.orm import Session
from app.utils.db.database import get_db
from app.api.v1.auth.service.password import verify_password 
from app.api.v1.auth.service.auth import authenticate_user


auth_router = APIRouter(prefix="/auth")

@auth_router.get("/")
async def read_root():
    return {"message": "Auth Service Root"}



@auth_router.post("/health")
async def health_check():
    return {"status": "auth service is healthy"}



@auth_router.post("/login")
async def login(username: str = Form(...),  # Required form field
                password: str = Form(...), 
                db: Session = Depends(get_db)):
    data = authenticate_user(db, username, password)
    print("Authenticated data:", data)
    return {"access_token": data["access_token"], "user": data["user"]}