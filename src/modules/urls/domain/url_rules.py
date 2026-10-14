from datetime import datetime


def is_expired(url_expiry_time: datetime, current_time: datetime) -> bool:
    return url_expiry_time < current_time if url_expiry_time is not None else False