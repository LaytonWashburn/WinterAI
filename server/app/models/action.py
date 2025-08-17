# models/action.py
from sqlalchemy import Column, Integer, String, DateTime, JSON, ForeignKey
from sqlalchemy.sql import func
from app.schemas.base import Base

class Action(Base):
    __tablename__ = "actions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    service = Column(String, index=True)
    action = Column(String)
    details = Column(JSON) 
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    def __init__(self, user_id: Integer, service: String, action: String, details: JSON, created_at: DateTime):
        self.user_id = user_id
        self.service = service
        self.action = action
        self.details = details
        self.created_at = created_at

