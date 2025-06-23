from pydantic import BaseModel

class UserPydanticRequest(BaseModel):
    username:str
    first_name: str | None 
    last_name: str | None 
    full_name: str | None
    date_of_birth: str | None
    email: str | None
    password: str
    profile_picture: str | None  # Optional field for profile picture URL

    class Config:
        # orm_mode = True  # This allows Pydantic to work with ORM models
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


class LoginRequest(BaseModel):
    username:str
    plain_text_password:str