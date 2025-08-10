from fastapi import APIRouter, status, Depends, Request
from app.api.v1.search.schema.searching import DuckDuckGoSearchRequest, SearXNGRequest
from app.api.v1.search.service.duck_duck_go_search import duck_duck_go_search
from app.api.v1.search.service.sear_xng_search import SearxngService, get_searxng_service

search_router = APIRouter(prefix="/search")

@search_router.get("/health")
async def health_check():
    return {"status": "auth service is healthy"}

@search_router.post("/ddg", status_code=status.HTTP_200_OK)
async def ddg(request: DuckDuckGoSearchRequest):
    """
        Duck Duck Go Search Endpoint
    """
    res = duck_duck_go_search(query=request.query)
    if (res["status"] == "ok"):
        return {"answer": res}
    
@search_router.post("/searxng", status_code=status.HTTP_200_OK)
async def searxng(
    request: Request,
    search_request: SearXNGRequest,
    searxng_service: SearxngService = Depends(get_searxng_service)
):
    print("SearXNG Endpoint has been hit", flush=True)
    client_ip = request.client.host
    results = searxng_service.search(query=search_request.query, client_ip=client_ip)
    return {"results": results}