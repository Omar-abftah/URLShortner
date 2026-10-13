from fastapi import FastAPI

from infrastructure.mongo import connect_db, close_db
from contextlib import asynccontextmanager
from core.logger import setup_logger, get_logger
from api.v1.router import api_router
from api.error_handlers import verify_exception_handlers

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
verify_exception_handlers(app)
app.include_router(api_router, prefix="/api")

@app.get('/', tags=["Health"])
async def Health():

    return {
        'message': "Alive",
        }

