from pydantic import BaseModel

class DuckDuckGoSearchRequest(BaseModel):
    query: str