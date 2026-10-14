from fastapi import APIRouter
from modules.urls.api.url_router import url_router


api_router = APIRouter(prefix="/v1",
                   tags=["v1"])

api_router.include_router(url_router)