import logging
from typing import Any

from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi import Request, FastAPI
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.responses import JSONResponse

from core.context import request_id_var
from core.exceptions import AppException
from modules.urls.domain.exceptions import CodeNotFound, CodeExpired, CodeAlreadyExists, InvalidTarget

logger = logging.getLogger(__name__)

STATUS_CODES :dict[type[AppException], int] = {
    CodeNotFound: 404,
    CodeExpired: 410,
    CodeAlreadyExists: 409,
    InvalidTarget: 422
}

def _get_status_code(exception: AppException) -> int:
    for cls in type(exception).__mro__:
        if cls in STATUS_CODES:
            return STATUS_CODES[cls]
    return 500

def _body(code: str, message: str, details=None) -> dict[str, Any]:
    error = {
        "code": code,
        "message": message,
        "request_id": request_id_var.get()
    }

    if details is not None:
        error["details"] = details
    return {"error": error}

def _log_fields(request: Request, **extras):
    return {"method": request.method,
            "path": request.url.path,
            **extras}

async def app_exception_handler(request: Request, exception: AppException) -> JSONResponse:
    status_code = _get_status_code(exception)
    if status_code >= 500:
        logger.error("app_error", extra=_log_fields(request, exc_code=exception.code), exc_info=exception)
    else:
        logger.warning("app_error", extra=_log_fields(request, exc_code=exception.code, status_code=status_code))

    return JSONResponse(status_code=status_code, content=_body(exception.code, exception.message))

async def request_validation_exception_handler(request: Request, exception: RequestValidationError) -> JSONResponse:
    logger.info("Validation Failed", extra=_log_fields(request))
    return JSONResponse(status_code=422,
                        content=_body("validation_error", "request validation failed", details=jsonable_encoder(exception.errors())))

async def http_exception_handler(request: Request, exception: StarletteHTTPException) -> JSONResponse:
    return JSONResponse(status_code=exception.status_code,
                        content=_body("http_exception", str(exception.detail)),
                        headers=getattr(exception, "headers", None))

async def unhandled_exception_handler(request: Request, exception: Exception) -> JSONResponse:
    logger.exception("Unhandled Exception", extra=_log_fields(request))
    return JSONResponse(status_code=500,
                        content=_body("unhandled_exception","something went wrong"))

def verify_exception_handlers(app: FastAPI) -> None:
    app.add_exception_handler(AppException, app_exception_handler)
    app.add_exception_handler(RequestValidationError, request_validation_exception_handler)
    app.add_exception_handler(StarletteHTTPException, http_exception_handler)
    app.add_exception_handler(Exception, unhandled_exception_handler)




