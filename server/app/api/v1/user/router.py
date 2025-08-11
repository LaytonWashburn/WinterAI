from fastapi import  Depends, APIRouter, HTTPException, status
from fastapi.responses import RedirectResponse 
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.exc import IntegrityError, OperationalError
from sqlalchemy.orm import Session
from datetime import timedelta
from app.services.db.database import get_db
from app.models.user import User  # Assuming you have a User model defined in models/user.py
from ..auth.service.password import verify_password  # Assuming you have a utility function for hashing passwords
from .profile.profile import profile_router
from ..auth.service.auth import create_access_token
from ..auth.schema.auth import AuthSuccessfulResponse
from ..user.schema.user import UserPydanticRequest, UserPydanticResponse  # Assuming you have a Pydantic model defined in routers/pydantic/user.py
from app.api.v1.user.service.users import get_user_by_username, create_user_by_user

user_router = APIRouter(prefix="/users", tags=["User"])

user_router.include_router(profile_router)

@user_router.get("/health")
async def health_check():
    return {"status": "ok"}

@user_router.get("/all")
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
    user = get_user_by_username(username=form_data.username, User=User)
    print(user)
    # user = db.query(User).filter(User.username == form_data.username).first()
    # print(user)

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
async def create_user(user: UserPydanticRequest,
                      db: Session = Depends(get_db)):
    print("Creating user:", user)

    # Create User
    new_user = create_user_by_user(user=user, db=db)

    # Generate a JWT token for the newly created user
    print("Generating access token for new user")
    access_token = create_access_token(
        data={"sub": new_user.username, "user_id": new_user.id}, # 'sub' is standard, user_id is useful
        expires_delta=timedelta(minutes=360)
    )

    # Return the token and the user's details
    print("New user created with ID:", new_user.id)
    print(dir(new_user))
    return AuthSuccessfulResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserPydanticResponse.model_validate(new_user)  # Pass the SQLAlchemy user object here
    )