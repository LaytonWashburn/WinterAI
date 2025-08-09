from fastapi import  Depends, APIRouter, HTTPException, status
from fastapi.responses import RedirectResponse 
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.exc import IntegrityError, OperationalError
from sqlalchemy.orm import Session
from datetime import timedelta
from app.services.db.database import get_db
from app.models.user import User  # Assuming you have a User model defined in models/user.py
from ..auth.service.password import hash_password, verify_password  # Assuming you have a utility function for hashing passwords
from .profile.profile import profile_router
from ..auth.service.auth import create_access_token
from ..auth.schema.auth import AuthSuccessfulResponse
from ..user.schema.user import UserPydanticRequest, UserPydanticResponse  # Assuming you have a Pydantic model defined in routers/pydantic/user.py

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
    
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except IntegrityError as e:
        db.rollback()
        # Check if it's a unique violation (Postgres error code '23505')
        if "unique constraint" in str(e.orig).lower() or getattr(e.orig, 'pgcode', '') == '23505':
            raise HTTPException(status_code=400, detail="Username or email already exists") from e
        else:
            raise HTTPException(status_code=400, detail="Database integrity error") from e
    except OperationalError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Database connection failed") from e
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Unexpected error") from e


     # 3. Generate a JWT token for the newly created user
    access_token_expires = timedelta(minutes=360)
    print("Generating access token for new user")
    access_token = create_access_token(
        data={"sub": new_user.username, "user_id": new_user.id}, # 'sub' is standard, user_id is useful
        expires_delta=access_token_expires
    )

    # Return the token and the user's details
    print("New user created with ID:", new_user.id)
    print(dir(new_user))
    return AuthSuccessfulResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserPydanticResponse.model_validate(new_user)  # Pass the SQLAlchemy user object here
    )




