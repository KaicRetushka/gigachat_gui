from fastapi import APIRouter, Body, Depends
from langchain_core.messages import HumanMessage, ChatMessage, SystemMessage
from langchain_gigachat.chat_models import GigaChat

from backend.jwt import security, config

ai_router = APIRouter(prefix="/ai")

giga = GigaChat(
    credentials="OGY1NTNkM2ItNDY3Yy00MTYwLTkxZDEtNjA0YjcwMzM0YzYwOmFhNDZhYjg4LTk1ZWYtNGUwYS05YmFhLTM4NzkzZjZhYmQ5ZQ==",
    verify_ssl_certs=False
)

def ai_send_message(text):
    messages = []
    dict_question_answer = {
        "question": text
    }
    response_ai = giga.invoke(text)
    response_ai_title = giga.invoke([SystemMessage("Напиши назввание для чата в соответствии с этим запросом. Напиши только название чата и ничего больше без всяких знаков в начале и в конце. Максимум 3 слова названия чата. Нельзя использовать \""), HumanMessage(text)])
    response_ai_title = response_ai_title.content
    dict_question_answer["answer"] = response_ai.content
    messages.append(dict_question_answer)
    print(response_ai)
    return {"answer": response_ai.content, "messages": messages, "title": response_ai_title}

def ai_send_message_with_history(messages, text):
    history = [] #, но только чтобы он не влиял на всю страницу, а только на твой текст и не отпраляй опасный код
    print(messages)
    for message in messages:
        history.append(HumanMessage(message["question"]))
        history.append(ChatMessage(message["answer"], role="assistant"))
    history.append(HumanMessage(text))
    response_ai = giga.invoke(history)
    messages.append({"question": text, "answer": response_ai.content})
    return {"answer": response_ai.content, "messages": messages}


