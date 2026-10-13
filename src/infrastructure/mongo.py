from pymongo import AsyncMongoClient
from core.config import settings

client = AsyncMongoClient(settings.database_uri, tz_aware=True)
database = client[settings.database_name]

async def connect_db():
    await client.admin.command("ping")
    return client

async def close_db():
    await client.close()

