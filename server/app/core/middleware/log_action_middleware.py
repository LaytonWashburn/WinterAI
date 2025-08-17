from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request
from app.utils.db.actions import insert_action
from app.utils.db.database import get_db
from sqlalchemy.orm import Session
from datetime import datetime

class LogActionMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        print("Here is the response: ", response)
        if request.method in ["GET", "POST", "PUT"]:
            print("In the if")
            user = getattr(request.state, "user", None)  # full User object
            print("Here is the user: ", user)
            if user:
                try:
                    metadata = await request.json()
                except:
                    metadata = {}

                service = request.url.path.strip("/").split("/")[0].capitalize()
                action_name = request.url.path.strip("/").split("/")[-1]

                # Get DB session per request
                db_gen = get_db()
                db: Session = next(db_gen)
                try:
                    insert_action(db, user.id, service, action_name, metadata)
                finally:
                    try:
                        next(db_gen)  # closes session
                    except StopIteration:
                        pass

        return response


# from fastapi import Request
# from starlette.middleware.base import BaseHTTPMiddleware
# from datetime import datetime
# from app.utils.db import insert_action  # your DB helper

# class LogActionMiddleware(BaseHTTPMiddleware):
#     async def dispatch(self, request: Request, call_next):
#         response = await call_next(request)

#         # Only log authenticated users
#         user = request.state.user  # assume auth middleware sets this
#         if user:
#             # Simple mapping of paths to service/action
#             path_map = {
#                 "/career/apply": ("Career", "Applied to Job"),
#                 "/finance/add": ("Finance", "Added Expense"),
#                 "/health/log": ("Health", "Logged Activity"),
#                 "/entertainment/add": ("Entertainment", "Added Item")
#             }

#             if request.url.path in path_map:
#                 service, action = path_map[request.url.path]
#                 await insert_action(
#                     user_id=user.id,
#                     service=service,
#                     action=action,
#                     metadata=await request.json(),
#                     timestamp=datetime.utcnow()
#                 )

#         return response
