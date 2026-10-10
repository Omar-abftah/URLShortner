from fastapi import FastAPI, Depends

from database import connect_db, close_db
from contextlib import asynccontextmanager
from logger import setup_logger, get_logger

setup_logger()
logger = get_logger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await connect_db()
        logger.info("Database is connected Successfully")
        yield
    except Exception:
        logger.exception("Application has encontered an issue with the database connection")
        raise
    finally:
        await close_db()
        logger.info('database client is closed')


app = FastAPI(lifespan=lifespan)


@app.get('/', tags=["Health"])
async def Health():

    return {
        'message': "Alive",
        }

