from fastapi import APIRouter, Request
from starlette.responses import JSONResponse

from modules.urls.domain.exceptions import CodeNotFound

url_router = APIRouter(
    prefix="/urls",
    tags=["urls"]
)

@url_router.get("/", tags=["v1"])
async def root():
    return {"message": "Hello World"}

@url_router.get("/code/{code}", tags=["v1"])
async def code_router(code) -> JSONResponse:
    raise CodeNotFound(f"No Url Found with code {code}")

