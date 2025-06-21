from fastapi import  Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from app.services.db.database import get_db
from app.services.db.models.user import User  # Assuming you have a User model defined in models/user.py
from app.routers.pydantic.user import UserPydantic  # Assuming you have a Pydantic model defined in routers/pydantic/user.py
from app.utils.authentication.password import hash_password  # Assuming you have a utility function for hashing passwords
from app.utils.authentication.password import verify_password

user_router = APIRouter()


@user_router.get("/all")
async def get_users():  
    return [{"username": "user1"}, {"username": "user2"}]


@user_router.get("/users")
def read_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

@user_router.post("/create")
def create_user(user: UserPydantic, db: Session = Depends(get_db)):
    print("Creating user:", user)
    new_user = User(
        username=user.username,
        hashed_password=hash_password(user.password),  # Assuming you handle password hashing elsewhere
        first_name=user.first_name,
        last_name=user.last_name,
        full_name=user.full_name,
        date_of_birth=user.date_of_birth,
        email=user.email
    ) # Upacks the Pydantic model into a dictionary
    # Assuming User model has a constructor that accepts keyword arguments
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@user_router.post("/users/authenticate")
def authenticate_user(username: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return {"message": f"Welcome {user.username}!"}
