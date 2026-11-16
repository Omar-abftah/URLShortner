import secrets
import string
from datetime import datetime

from pydantic import HttpUrl
from pymongo.errors import DuplicateKeyError

from modules.urls.domain.exceptions import CodeAlreadyExists
from modules.urls.infrastructure.url_document import Url

_ALPHABET = string.ascii_letters + string.digits


def _generate_code(length: int = 7) -> str:
    return "".join(secrets.choice(_ALPHABET) for _ in range(length))


async def record_click(code: str)-> None:
    await Url.find_one(Url.code == code).update({"$inc": {"clicks": 1}})

async def create_short_code(code: str | None, target_url: HttpUrl, expiry_date: datetime | None, owner_id: str | None = None) -> Url:
    custom = code is not None
    for _ in range(1 if custom else 5):
        url = Url(code = code or _generate_code(), target = str(target_url), expires_at=expiry_date, owner_id=owner_id)
        try:
            await url.insert()
            return url
        except DuplicateKeyError:
            if custom:
                raise CodeAlreadyExists(f"code {code} already exists")
    raise CodeAlreadyExists("could not generate a unique code, please retry")
