from fastapi import  Depends, APIRouter, HTTPException, status
from fastapi.responses import RedirectResponse 
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.exc import IntegrityError, OperationalError
from sqlalchemy.orm import Session
from datetime import timedelta
from app.services.db.database import get_db
from app.models.user import User



def get_user_by_username(db: Session = Depends(get_db), 
                     username: str = None,
                     User:User = None):
    """Get a User"""
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user
