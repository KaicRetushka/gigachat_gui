from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from backend.router_routing import router_routing
from backend.router import router
from backend.database.models import create_db

app = FastAPI()

app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

app.include_router(router_routing)
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_headers=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_origins=["*"]
)

if __name__ == "__main__":
    create_db()
    uvicorn.run("main:app", host="0.0.0.0", reload=True)