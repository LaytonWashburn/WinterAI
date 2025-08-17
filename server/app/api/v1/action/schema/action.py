from pydantic import BaseModel
from typing import Any
from datetime import datetime

class ActionOut(BaseModel):
    id: int
    user_id: int
    service: str
    action: str
    details: Any
    created_at: datetime

    class Config:
        orm_mode = True
