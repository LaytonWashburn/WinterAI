from pydantic import BaseModel, EmailStr
from typing import Optional

class UserPydantic(BaseModel):
    # id: int
    username:str
    first_name: str | None 
    last_name: str | None 
    full_name: str | None
    date_of_birth: str | None
    email: str | None
    password: str
    profile_picture: Optional[str] = None  # Optional field for profile picture URL

    class Config:
        orm_mode = True  # This allows Pydantic to work with ORM models
