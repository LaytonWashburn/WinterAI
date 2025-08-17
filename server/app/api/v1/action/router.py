from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from app.utils.db.database import get_db
from app.api.v1.action.schema.action import ActionOut  # define a Pydantic schema for output
from app.api.v1.action.service.action import get_recent_actions

action_router = APIRouter(prefix="/action", tags=["actions"])

@action_router.get("/", response_model=List[ActionOut])
def get_recent_actions(
    limit: int = Query(10, gt=0, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    """
    Get the most recent actions, sorted by created_at descending.
    """
    actions = get_recent_actions(db, limit=limit, offset=offset)
    return actions