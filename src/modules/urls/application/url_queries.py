from starlette.responses import JSONResponse
from pymongo.errors import DuplicateKeyError

async def get_all_urls() -> JSONResponse:
    