from fastapi import APIRouter, Response, HTTPException

from backend.pydantic_classes import BudyReg
from backend.jwt import security, config
from backend.database.requests import insert_user

router = APIRouter()

@router.post("/reg", tags=["Регистрация"])
async def post_reg(body: BudyReg, response: Response):
    response_db = insert_user(body.login, body.name, body.surname, body.password)
    if response_db:
        token = security.create_access_token(uid=str(response_db))
        response.set_cookie(config.JWT_ACCESS_COOKIE_NAME, token)
        return {"detail": "Вы успешно зарегистрировались", "access_token": token}
    raise HTTPException(status_code=409, detail="Такой логин уже занят")