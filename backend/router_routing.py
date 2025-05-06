from fastapi import APIRouter, Request, Depends, Response
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates

from backend.jwt import security, config
from backend.database.requests import check_chat, select_all_messages, select_all_chats, select_login, select_name_chat

router_routing = APIRouter()

templates = Jinja2Templates(directory="frontend/templates")

@router_routing.get("/chat", tags=["Получение страницы нового чата"], dependencies=[Depends(security.access_token_required)])
async def give_new_chat(request: Request):
    token = request.cookies.get(config.JWT_ACCESS_COOKIE_NAME)
    user_id = security._decode_token(token).sub
    list_chats = select_all_chats(int(user_id))
    login = select_login(int(user_id))
    return templates.TemplateResponse("chat.html", {"request": request, "is_history": False, "list_chats": list_chats, "login": login, "name_chat": "Новый чат"})

@router_routing.get("/chat/{chat_id}", tags=["Получение страницы чата"], dependencies=[Depends(security.access_token_required)])
async def chat_id(request: Request, chat_id: str):
    token = request.cookies.get(config.JWT_ACCESS_COOKIE_NAME)
    user_id = security._decode_token(token).sub
    resposne_db = check_chat(chat_id, int(user_id))
    if resposne_db:
        messages = select_all_messages(chat_id)
        name_chat = select_name_chat(chat_id)
        list_chats = select_all_chats(int(user_id))
        login = select_login(int(user_id))
        return templates.TemplateResponse("chat.html", {"request": request, "messages": messages, "is_history": True, "list_chats": list_chats, "login": login, "name_chat": name_chat})
    return RedirectResponse("/chat", status_code=303)

@router_routing.get("/vhod", tags=["Получение страницы входа"])
async def give_vhod(request: Request):
    return templates.TemplateResponse("vhod.html", {"request": request})

@router_routing.get("/reg", tags=["Получить страницу регистрации"])
async def give_reg(request: Request):
    return templates.TemplateResponse("reg.html", {"request": request})

@router_routing.get("/profile", tags=["Получение страницы профиля"], dependencies=[Depends(security.access_token_required)])
async def give_profile(request: Request):
    token = request.cookies.get(config.JWT_ACCESS_COOKIE_NAME)
    user_id = security._decode_token(token).sub
    login = select_login(int(user_id))
    return templates.TemplateResponse("profile.html", {"request": request, "login": login})