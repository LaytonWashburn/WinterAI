from fastapi import APIRouter, status
from app.api.v1.search.schema.duck_duck_go_search import DuckDuckGoSearchRequest
from app.api.v1.search.service.duck_duck_go_search import duck_duck_go_search

search_router = APIRouter(prefix="/search")

@search_router.get("/health")
async def health_check():
    return {"status": "auth service is healthy"}

@search_router.post("/query", status_code=status.HTTP_200_OK)
async def chat(query: DuckDuckGoSearchRequest):
    res = duck_duck_go_search(query=query.query)
    if (res["status"] == "ok"):
        return {"answer": res}