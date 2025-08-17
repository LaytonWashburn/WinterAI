# core/middleware/auth.py
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request
from jose import jwt, JWTError
from app.utils.db.database import get_db
from app.models.user import User
from app.core.config.settings import settings
from sqlalchemy.orm import Session

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        print("In the auth middleware")
        token = request.headers.get("Authorization")
        user = None
        print("Here is the token from the auth middleware: ", token)
        if token and token.startswith("Bearer "):
            token_value = token[7:]  # remove "Bearer "
            try:
                payload = jwt.decode(token_value, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
                user_id: int = payload.get("user_id")
                print("Here is the payload from auth middleware: ", payload)
                print("Here is the user id: ", user_id)
                if user_id:
                    db_gen = get_db()
                    db: Session = next(db_gen)
                    try:
                        user = db.query(User).filter(User.id == user_id).first()
                    finally:
                        try:
                            next(db_gen)
                        except StopIteration:
                            pass
            except JWTError:
                pass  # optionally handle invalid token

        request.state.user = user  # attach user to the request
        response = await call_next(request)
        return response

