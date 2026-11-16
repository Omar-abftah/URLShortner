from fastapi import Depends, HTTPException, Request

from core.auth import InvalidSessionToken, verify_session_token


def get_current_user_id(request: Request) -> str:
    """FastAPI dependency: returns the authenticated user's ID or raises 401.

    Sync on purpose so FastAPI runs it in a threadpool (token verification may block).
    """
    try:
        return verify_session_token(request)
    except InvalidSessionToken:
        raise HTTPException(status_code=401, detail="Not authenticated")


CurrentUserId = Depends(get_current_user_id)
