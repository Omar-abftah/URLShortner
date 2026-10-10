from pymongo import AsyncMongoClient
from config import Settings
from functools import lru_cache
from config import settings

client = AsyncMongoClient(settings.database_uri)
database = client["sample_mflix"]

async def connect_db():
    await client.admin.command("ping")

async def close_db():
    await client.close()

