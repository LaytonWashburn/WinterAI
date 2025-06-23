from sqlalchemy import Column, String, Integer
from app.services.db.base import Base 

class User(Base):
    __tablename__ = 'users'

    id: int = Column(Integer, primary_key=True, index=True)
    username:str = Column(String, index=True, unique=True, nullable=False)
    first_name: str | None = Column(String, nullable=True)
    last_name: str | None = Column(String, nullable=True)
    full_name: str | None = Column(String, nullable=True)
    date_of_birth: str | None = Column(String, nullable=True)
    email: str | None = Column(String, nullable=True, unique=True)
    hashed_password: str = Column(String, nullable=False)
    profile_picture: str | None = Column(String, nullable=True)


    def __init__(self, 
                 username: str, 
                 hashed_password: str, 
                 first_name: str | None = None, 
                 last_name: str | None = None, 
                 full_name: str | None = None, 
                 date_of_birth: str | None = None, 
                 email: str | None = None,
                 profile_picture: str | None = None):
        self.username = username
        self.hashed_password = hashed_password
        self.first_name = first_name
        self.last_name = last_name
        self.full_name = full_name
        self.date_of_birth = date_of_birth
        self.email = email
        self.profile_picture = profile_picture