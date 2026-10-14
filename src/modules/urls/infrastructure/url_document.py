from beanie import init_beanie, Document
from datetime import datetime, timezone
from pydantic import Field
from pymongo import IndexModel, ASCENDING


class Url(Document):
    code: str
    target: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    expires_at: datetime | None = None

    class Settings:
        name = "urls"
        indexes = [
            IndexModel([("code", ASCENDING)], unique=True, name="uq_urls_code"),
            IndexModel([("expires_at", ASCENDING)], expireAfterSeconds=0, name="ttl_urls_expires_at" ),
        ]