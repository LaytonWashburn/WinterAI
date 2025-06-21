# app/routers/auth.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.utils.authenticate import verify_password
from app.utils.jwt import create_access_token
from app.services.db.database import get_db
from app.models.user import User
from app.schemas.auth import Token

auth_router = APIRouter()


# @auth_router.post("/token", response_model=Token)
# def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.username == form_data.username).first()
#     if not user or not verify_password(form_data.password, user.hashed_password):
#         raise HTTPException(status_code=400, detail="Incorrect username or password")
#     token = create_access_token(data={"sub": user.username})
#     return {"access_token": token, "token_type": "bearer"}
