from typing import List

from fastapi import APIRouter, Request
from starlette.background import BackgroundTasks
from starlette.responses import JSONResponse, RedirectResponse
from modules.urls.api.dependencies import CurrentUserId
from modules.urls.api.url_schemas import UrlRead, UrlCreate
from modules.urls.application.url_commands import record_click, create_short_code
from modules.urls.application.url_queries import list_urls, resolve_code

url_router = APIRouter(
    prefix="/urls",
    tags=["urls"]
)

@url_router.get("/", response_model=List[UrlRead])
async def get_urls(user_id: str = CurrentUserId) -> JSONResponse:
    docs, next_cursor = await list_urls(user_id, 20)

    return docs

@url_router.get("/{code}")
async def redirect_url(code: str, background: BackgroundTasks):
    target = await resolve_code(code)
    background.add_task(record_click, code)
    return RedirectResponse(target, status_code=307)

@url_router.post("/", response_model=UrlRead)
async def create_url(request: UrlCreate, user_id: str = CurrentUserId)->JSONResponse:
    created_url = await create_short_code(request.custom_code, request.target, request.expires_at, user_id)
    return created_url