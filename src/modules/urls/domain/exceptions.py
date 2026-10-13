from core.exceptions import AppException

class CodeNotFound(AppException):
    code = "code_not_found"

class CodeExpired(AppException):
    code = "code_expired"

class CodeAlreadyExists(AppException):
    code = "code_already_exists"

class InvalidTarget(AppException):
    code = "invalid_target"