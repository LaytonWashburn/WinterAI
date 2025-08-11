from fastapi import  Depends, HTTPException
from sqlalchemy.exc import IntegrityError, OperationalError
from sqlalchemy.orm import Session
from app.services.db.database import get_db
from app.models.user import User
from app.api.v1.auth.service.password import hash_password

def create_user_by_user(user: User = None,
                        db: Session = None) -> User:
    if not user:
        raise HTTPException(status_code=400, detail="Use not provided") from e
    
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
    
    try: # commit the user to the db
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

    return new_user


def get_user_by_username(db: Session = Depends(get_db), 
                     username: str = None,
                     User:User = None):
    """Get a User"""
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user
