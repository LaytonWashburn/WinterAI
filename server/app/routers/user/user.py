from fastapi import  Depends, APIRouter, HTTPException, status
from fastapi.responses import RedirectResponse 
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.services.db.database import get_db
from app.services.db.models.user import User  # Assuming you have a User model defined in models/user.py
from app.utils.authentication.password import hash_password, verify_password  # Assuming you have a utility function for hashing passwords
from app.routers.user.profile.profile import profile_router
from app.services.auth.auth import create_access_token
from app.pydantic.auth import AuthSuccessfulResponse
from app.pydantic.user import UserPydanticRequest, UserPydanticResponse, LoginRequest  # Assuming you have a Pydantic model defined in routers/pydantic/user.py

user_router = APIRouter()

user_router.include_router(profile_router)


@user_router.get("/all")
async def get_users():  
    return [{"username": "user1"}, {"username": "user2"}]


@user_router.get("/users")
async def read_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

@user_router.post("/token")
async def token(form_data: OAuth2PasswordRequestForm = Depends(), 
                db: Session = Depends(get_db)):
    print("In the credentials endpoint")
    # form_data: OAuth2PasswordRequestForm = Depends()
    # db: Session = Depends(get_db)

    # 1. Retrieve the user from the database by username
    user = db.query(User).filter(User.username == form_data.username).first()
    print(user)

    # 2. Check if user exists AND verify the password
    # verify_password takes the PLAIN password (from form_data) and the STORED HASHED password (from DB)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}, # Required for OAuth2 standard
        )

    # 3. Create access token
    print("Creating the access token")
    access_token_expires = timedelta(minutes=60)
    access_token = create_access_token(
        data={"sub": user.username, "user_id": user.id}, # Data to encode in the token payload
        expires_delta=access_token_expires
    )
    print("Access token")
    # 4. Return the token and user data
    return AuthSuccessfulResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserPydanticResponse.model_validate(user) # Convert SQLAlchemy User to Pydantic User for response
    )


@user_router.post("/create")
async def create_user(user: UserPydanticRequest, db: Session = Depends(get_db)):
    print("Creating user:", user)
    new_user = User(
        username=user.username,
        hashed_password=hash_password(user.password),  # Assuming you handle password hashing elsewhere
        first_name=user.first_name,
        last_name=user.last_name,
        full_name=user.full_name,
        date_of_birth=user.date_of_birth,
        email=user.email,
        profile_picture=user.profile_picture
    ) # Upacks the Pydantic model into a dictionary
    # Assuming User model has a constructor that accepts keyword arguments
    db.add(new_user)
    db.commit()
    db.refresh(new_user)


     # 3. Generate a JWT token for the newly created user
    access_token_expires = timedelta(minutes=360)
    access_token = create_access_token(
        data={"sub": new_user.username, "user_id": new_user.id}, # 'sub' is standard, user_id is useful
        expires_delta=access_token_expires
    )

    # 4. Return the token and the user's details
    # FastAPI will automatically convert new_user (SQLAlchemy ORM object)
    # to UserResponse (Pydantic) because of from_attributes=True in UserResponse's config.
    print(dir(new_user))
    return AuthSuccessfulResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserPydanticResponse.model_validate(new_user)  # Pass the SQLAlchemy user object here
    )



@user_router.post("/users/authenticate")
async def authenticate_user(username: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return {"message": f"Welcome {user.username}!"}
