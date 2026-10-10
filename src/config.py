from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "URLShortner"
    version: str = "v1.0"
    database_uri: str = "test"
    database_name: str = "test"
    log_level: str = "info"

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()