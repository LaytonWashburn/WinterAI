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

# @auth_router.post("/login", response_model=Token)
# async def login_for_access_token(
#     form_data: OAuth2PasswordRequestForm = Depends(), # Expects username and password as form data
#     db: Session = Depends(get_db)
# ):
#     # 1. Find the user
#     user_in_db = db.query(User).filter(User.username == form_data.username).first()
#     if not user_in_db:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )

#     # 2. Verify password
#     if not verify_password(form_data.password, user_in_db.hashed_password):
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )

#     # 3. Create JWT token
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user_in_db.username, "user_id": user_in_db.id}, # 'sub' is standard for subject
#         expires_delta=access_token_expires
#     )

#     # 4. Return token and user details (optional, but good for client-side state)
#     # You might want to return the UserResponse model here too, or fetch it separately on the client
#     return {"access_token": access_token, "token_type": "bearer"}

# Optional: Endpoint to get current authenticated user (for protected routes)
# Requires implementing OAuth2PasswordBearer for token validation
# from fastapi.security import OAuth2PasswordBearer
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         user_id: int = payload.get("user_id") # Get user_id from token
#         if username is None or user_id is None:
#             raise credentials_exception
#     except JWTError:
#         raise credentials_exception
    
#     user = db.query(User).filter(User.id == user_id).first()
#     if user is None:
#         raise credentials_exception
#     return UserResponse.from_orm(user) # Return Pydantic model for current user

# # app/routers/auth.py
# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from fastapi.security import OAuth2PasswordRequestForm
# from app.utils.authenticate import verify_password
# from app.utils.jwt import create_access_token
# from app.services.db.database import get_db
# from app.models.user import User
# from app.schemas.auth import Token

# auth_router = APIRouter()


# # @auth_router.post("/token", response_model=Token)
# # def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
# #     user = db.query(User).filter(User.username == form_data.username).first()
# #     if not user or not verify_password(form_data.password, user.hashed_password):
# #         raise HTTPException(status_code=400, detail="Incorrect username or password")
# #     token = create_access_token(data={"sub": user.username})
# #     return {"access_token": token, "token_type": "bearer"}

