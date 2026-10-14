from datetime import datetime

from beanie import PydanticObjectId
from pydantic import BaseModel, Field, HttpUrl, ConfigDict


class UrlCreate(BaseModel):
    target: HttpUrl
    custom_code: str | None = Field(default=None, pattern=r"^[A-Za-z0-9_-]{4,32}$")
    expires_at: datetime | None = None

class UrlRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: PydanticObjectId
    code: str
    target: HttpUrl
    clicks: int = 0
    created_at: datetime
    expires_at: datetime | None = None

class RedirectionView(BaseModel):
    target: HttpUrl
    expires_at: datetime | None = None