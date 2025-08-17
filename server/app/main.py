from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
from app.core.middleware.auth_middleware import AuthMiddleware
from app.core.middleware.log_action_middleware import LogActionMiddleware
from app.api.routes import api_router

app = FastAPI(
    title="Winter AI Server",
    description="Winter AI Server API Documentation",
    version="1.0.0",
    contact={
        "name": "Support Team",
        "email": "",
    },
    license_info={
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT",
    },
)   

origins = [
    "http://localhost:5173",
    "http://client:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(AuthMiddleware)
app.add_middleware(LogActionMiddleware)

instrumentator = Instrumentator()
instrumentator.instrument(app).expose(app)

app.include_router(api_router)

@app.get("/")
async def root():
    """Root endpoint returning a welcome message."""
    return {"message": "Welcome to Winter AI Server"}