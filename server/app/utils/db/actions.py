
from sqlalchemy.orm import Session
from app.models.action import Action
from datetime import datetime

def insert_action(db: Session, user_id: int, service: str, action_name: str, details: dict):
    new_action = Action(
        user_id=user_id,
        service=service,
        action=action_name,
        details=details,
        created_at=datetime.utcnow()
    )
    try:
        db.add(new_action)
        db.commit()
        db.refresh(new_action)
    except Exception as e:
        print(e)
    return new_action


