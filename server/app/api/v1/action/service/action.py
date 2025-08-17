# app/services/action_service.py
from sqlalchemy.orm import Session
from typing import List
from app.models.action import Action

def get_recent_actions(db: Session, limit: int = 10, offset: int = 0) -> List[Action]:
    """
    Retrieve the most recent actions from the database.
    """
    return (
        db.query(Action)
        .order_by(Action.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )
