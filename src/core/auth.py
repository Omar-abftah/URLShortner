from typing import Any

from clerk_backend_api.security import authenticate_request
from clerk_backend_api.security.types import AuthenticateRequestOptions

from core.config import settings


class InvalidSessionToken(Exception):
    """Raised when the request carries no valid Clerk session token."""


def verify_session_token(request: Any) -> str:
    state = authenticate_request(
        request,
        AuthenticateRequestOptions(
            secret_key=settings.clerk_secret_key,
            authorized_parties=settings.clerk_authorized_parties or None,
        ),
    )
    if not state.is_signed_in or not state.payload or not state.payload.get("sub"):
        raise InvalidSessionToken(state.message or "Not authenticated")
    return state.payload["sub"]
