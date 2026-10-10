import logging
import logging.config
from config import settings

LOG_LEVEL = settings.log_level.upper()

log = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "json": { 
            "()": "pythonjsonlogger.jsonlogger.JsonFormatter"
        }
    },
    "handlers": {
        "stdout": {
            "class": "logging.StreamHandler",
            "formatter": "json",
            "level": LOG_LEVEL,
            "stream": "ext://sys.stdout"
        }
    },
    "root": {
        "level": LOG_LEVEL,
        "handlers": ["stdout"]
    },
    "loggers":{
        "src": {"level": LOG_LEVEL},
        "uvicorn": {"handlers":[], "propagate": True},
        "uvicorn.access": {"handlers":[], "propagate": True}
    }
}

def setup_logger():
    logging.config.dictConfig(log)

def get_logger(name: str) -> logging.Logger:
    return logging.getLogger(name)