from typing import List

from fastapi import APIRouter, Request
from starlette.background import BackgroundTasks
from starlette.responses import JSONResponse, RedirectResponse

from modules.urls.api.url_schemas import UrlRead
from modules.urls.application.url_commands import record_click
from modules.urls.application.url_queries import list_urls, resolve_code
from modules.urls.domain.exceptions import CodeNotFound

url_router = APIRouter(
    prefix="/urls",
    tags=["urls"]
)

@url_router.get("/", response_model=List[UrlRead])
async def get_urls() -> JSONResponse:
    docs, next_cursor = await list_urls(20)
    return docs

@url_router.get("/{code}", response_model=RedirectResponse)
async def redirect_url(code: str, background: BackgroundTasks):
    target = await resolve_code(code)
    background.add_task(record_click, code)
    return RedirectResponse(target, status_code=307)