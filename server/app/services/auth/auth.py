from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm # For standard username/password form data
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Optional
# --- Password Hashing/Verification (using passlib.context) ---
from passlib.context import CryptContext
# --- JWT Token Generation (using python-jose) ---
from jose import JWTError, jwt
# Import your DB session, user model, and schemas



pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# Replace with a strong, random secret key from environment variables!
SECRET_KEY = "your-super-secret-key-replace-me-in-prod"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 # Token expiration time

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# --- FastAPI Authentication Router ---
auth_router = APIRouter(prefix="/auth", tags=["Authentication"])

