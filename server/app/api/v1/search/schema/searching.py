from pydantic import BaseModel

class DuckDuckGoSearchRequest(BaseModel):
    query: str

class SearXNGRequest(BaseModel):
    query:str