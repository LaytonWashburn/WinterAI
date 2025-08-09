from pydantic import BaseModel

from typing import Optional
from pydantic import BaseModel

class UserPydanticRequest(BaseModel):
    username: str
    password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    full_name: Optional[str] = None
    date_of_birth: Optional[str] = None
    email: Optional[str] = None
    profile_picture: Optional[str] = None

    class Config:
        from_attributes = True


class UserPydanticResponse(BaseModel):
    id: int
    username:str
    first_name: str | None 
    last_name: str | None 
    full_name: str | None
    date_of_birth: str | None
    email: str | None
    # password: str
    profile_picture: str | None  # Optional field for profile picture URL

    class Config:
        # orm_mode = True  # This allows Pydantic to work with ORM models
        from_attributes = True