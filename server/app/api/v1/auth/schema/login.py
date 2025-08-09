from pydantic import BaseModel

class LoginRequest(BaseModel):
    username:str
    plain_text_password:str