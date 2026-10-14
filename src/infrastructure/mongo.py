from pymongo import AsyncMongoClient
from core.config import settings
from beanie import init_beanie

from modules.urls.infrastructure.url_document import Url

client = AsyncMongoClient(settings.database_uri, tz_aware=True)
database = client[settings.database_name]

async def connect_db():
    await client.admin.command("ping")
    await init_beanie(database=database, document_models=[Url])
    return client

async def close_db():
    await client.close()

