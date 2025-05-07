from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from authx.exceptions import MissingTokenError, JWTDecodeError
import uvicorn
import jwt

from backend.router_routing import router_routing
from backend.router import router
from backend.ai_router import ai_router
from backend.database.models import create_db
from backend.jwt import security, config

app = FastAPI()

app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

app.include_router(router_routing)
app.include_router(router)
app.include_router(ai_router)

app.add_middleware(
    CORSMiddleware,
    allow_headers=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_origins=["*"]
)

@app.exception_handler(MissingTokenError)
async def misssing_token_error(request, exc):
    return RedirectResponse("/reg")

@app.exception_handler(JWTDecodeError)
async def jwt_decode_error(request, exc):
    return RedirectResponse("/reg")

@app.api_route("/{unknown_path:path}", methods=["GET"])
async def give_unknown_path(unknown_path: str):
    return RedirectResponse("/chat", status_code=307)

if __name__ == "__main__":
    create_db()
    uvicorn.run("main:app", host="localhost", reload=True)
