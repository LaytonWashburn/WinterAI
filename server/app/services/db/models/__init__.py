# server/app/models/__init__.py

from .user import User  # Import any other models here
from app.services.db.base import Base  # Import the base class for models

__all__ = ["Base", "User"]
