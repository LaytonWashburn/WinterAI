from pydantic import BaseModel
from app.models.user import User
from ...user.schema.user import UserPydanticResponse

# New schema for successful registration/login response
class AuthSuccessfulResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserPydanticResponse # UserPydantic # Include the user details here