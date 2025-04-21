from fastapi import APIRouter, Body, Depends
from langchain_core.messages import HumanMessage, BaseMessage
from langchain_gigachat.chat_models import GigaChat

from backend.jwt import security, config

ai_router = APIRouter(prefix="/ai")

gifa = GigaChat(
    credentials="OGY1NTNkM2ItNDY3Yy00MTYwLTkxZDEtNjA0YjcwMzM0YzYwOmFhNDZhYjg4LTk1ZWYtNGUwYS05YmFhLTM4NzkzZjZhYmQ5ZQ==",
    verify_ssl_certs=False
)

@ai_router.post("/send", dependencies=[Depends(security.access_token_required)], tags=["Отправить сообщение"])
async def ai_post_send(message: str):
    response_ai =  gifa.invoke(message)
    return response_ai.content
