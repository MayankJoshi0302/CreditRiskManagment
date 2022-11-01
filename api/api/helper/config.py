SECRET_KEY = "<secret-key-for-jwt-signing>"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440
SQLALCHEMY_DATABASE_URL = "<your-own-connection-string>"
CORS_ORIGIN = [
    "http://localhost",
    "https://localhost",
    "http://localhost:3000",
    "https://localhost:3000",
    "http://localhost:3000/dashboard",
    "https://localhost:3000/dashboard",
]