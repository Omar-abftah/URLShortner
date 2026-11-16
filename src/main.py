from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from infrastructure.mongo import connect_db, close_db
from contextlib import asynccontextmanager
from core.logger import setup_logger, get_logger
from api.v1.router import api_router
from api.error_handlers import verify_exception_handlers
from modules.urls.api.url_router import redirect_url

setup_logger()
logger = get_logger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await connect_db()
        logger.info("Database is connected Successfully")
        yield
    except Exception:
        logger.exception("Application has encountered an issue with the database connection")
        raise
    finally:
        await close_db()
        logger.info('database client is closed')

app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
verify_exception_handlers(app)
app.include_router(api_router, prefix="/api")

@app.get('/', tags=["Health"])
async def Health():

    return {
        'message': "Alive",
        }

app.add_api_route("/{code}", redirect_url, methods=["GET"], tags=["urls"])

