from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

_ENV_FILE = Path(__file__).resolve().parents[2] / ".env"

class Settings(BaseSettings):
    app_name: str = "URLShortner"
    version: str = "v1.0"
    database_uri: str = "test"
    database_name: str = "test"
    log_level: str = "info"
    clerk_secret_key: str = ""
    # Origins of your frontend(s), e.g. ["http://localhost:3000"]; checked against the token's `azp` claim
    clerk_authorized_parties: list[str] = []

    model_config = SettingsConfigDict(env_file=_ENV_FILE)

settings = Settings()