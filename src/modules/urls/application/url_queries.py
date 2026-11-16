from datetime import datetime, timezone

from beanie import PydanticObjectId
from modules.urls.api.url_schemas import RedirectionView

from modules.urls.domain.exceptions import CodeNotFound, CodeExpired
from modules.urls.domain.url_rules import is_expired
from modules.urls.infrastructure.url_document import Url


async def list_urls(owner_id: str, limit: int = 20, after: PydanticObjectId | None = None) -> tuple[list[Url], PydanticObjectId | None]:
    query = Url.find(Url.owner_id == owner_id)
    if after:
        query = query.find(Url.id < after)
    docs = await query.sort(-Url.id).limit(limit + 1).to_list()
    has_more = len(docs) > limit
    docs = docs[:limit]
    next_cursor = docs[-1].id if has_more else None
    return docs, next_cursor

async def resolve_code(code: str) -> str:
    view = await Url.find_one({"code": code}).project(RedirectionView)
    if view is None:
        raise CodeNotFound(f"Code {code} not found")
    if is_expired(view.expires_at, datetime.now(timezone.utc)):
        raise CodeExpired(f"Code {code} expired")
    return view.target