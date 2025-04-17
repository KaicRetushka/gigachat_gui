from authx import AuthXConfig, AuthX
from datetime import timedelta

config = AuthXConfig()
config.JWT_ACCESS_COOKIE_NAME = "giga_token"
config.JWT_TOKEN_LOCATION = ["cookie"]
config.JWT_SECRET_KEY = "secret"
config.JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
config.JWT_COOKIE_CSRF_PROTECT = False

security = AuthX(config=config)