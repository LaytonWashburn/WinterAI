from pydantic_settings import BaseSettings
from datetime import timedelta

class Settings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: timedelta =  timedelta(minutes=60)

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()