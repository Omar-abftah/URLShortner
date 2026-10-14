from modules.urls.infrastructure.url_document import Url


async def record_click(code: str)-> None:
    await Url.find_one(Url.code == code).update({"$inc": {"clicks": 1}})