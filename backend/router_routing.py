from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates

router_routing = APIRouter()

templates = Jinja2Templates(directory="frontend/templates")

@router_routing.get("/", tags=["Получение главной страницы"])
async def get_head(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@router_routing.get("/vhod", tags=["Получение страницы входа"])
async def give_vhod(request: Request):
    return templates.TemplateResponse("vhod.html", {"request": request})

@router_routing.get("/reg", tags=["Получить страницу регистрации"])
async def give_reg(request: Request):
    return templates.TemplateResponse("reg.html", {"request": request})
