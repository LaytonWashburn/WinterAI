from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request
from app.utils.db.actions import insert_action
from app.utils.db.database import get_db
from sqlalchemy.orm import Session
from datetime import datetime

# class LogActionMiddleware(BaseHTTPMiddleware):
#     async def dispatch(self, request: Request, call_next):
#         response = await call_next(request)
#         print("Here is the response: ", response)
#         if request.method in ["GET", "POST", "PUT"]:
#             print("In the if")
#             user = getattr(request.state, "user", None)  # full User object
#             print("Here is the user: ", user)
#             if user:
#                 try:
#                     metadata = await request.json()
#                 except:
#                     metadata = {}

#                 service = request.url.path.strip("/").split("/")[0].capitalize()
#                 action_name = request.url.path.strip("/").split("/")[-1]

#                 # Get DB session per request
#                 db_gen = get_db()
#                 db: Session = next(db_gen)
#                 try:
#                     insert_action(db, user.id, service, action_name, metadata)
#                 finally:
#                     try:
#                         next(db_gen)  # closes session
#                     except StopIteration:
#                         pass

#         return response

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from sqlalchemy.orm import Session
from jose import jwt
from app.utils.db.actions import insert_action
from app.utils.db.database import SessionLocal
from app.models.user import User
from app.core.config.settings import settings

class LogActionMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Skip OPTIONS requests
        if request.method == "OPTIONS":
            return await call_next(request)

        # Decode user from JWT if available
        user = None
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
            print("Here is the token: ", token)
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
                print("Here is the payload: ", payload)
                user_id = payload.get("user_id")
                print("Here is the user id: ", user_id)
                if user_id:
                    with SessionLocal() as db:
                        user = db.query(User).filter(User.id == user_id).first()

            except Exception as e:
                print("An exception occurred: ", e)
        
        print("Here is the user from the log action: ", user)
        request.state.user = user

        # Call the endpoint
        response = await call_next(request)

        # Only log if user exists and method is relevant
        if user and request.method in ["POST", "PUT", "DELETE"]:
            metadata = {}
            content_type = request.headers.get("content-type", "")

            if "application/json" in content_type:
                try:
                    metadata = await request.json()
                except Exception:
                    metadata = {}
            elif "multipart/form-data" in content_type:
                try:
                    form = await request.form()
                    metadata = {k: str(v) for k, v in form.items()}
                except Exception:
                    metadata = {"info": "multipart form data received"}

            service = request.url.path.strip("/").split("/")[0].capitalize()
            action_name = request.url.path.strip("/").split("/")[-1]

            # Log action in DB
            with SessionLocal() as db:
                insert_action(db, user.id, service, action_name, metadata)

        return response
