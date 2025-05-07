from fastapi import APIRouter, Body, Depends
from langchain_core.messages import HumanMessage, ChatMessage, SystemMessage
from langchain_gigachat.chat_models import GigaChat
import markdown

from backend.jwt import security, config

ai_router = APIRouter(prefix="/ai")

giga = GigaChat(
    credentials="<YOUR_API_KEY>",
    verify_ssl_certs=False
)

def ai_send_message(text):
    messages = []
    dict_question_answer = {
        "question": text
    }
    response_ai = giga.invoke(text)
    response_ai_title = giga.invoke([SystemMessage("Напиши назввание для чата в соответствии с этим запросом, максимум 3 слова названия чата, нельзя использовать: \" и '."), HumanMessage(text)])
    response_ai_title = response_ai_title.content
    response_ai_html = markdown.markdown(response_ai.content)
    dict_question_answer["answer"] = response_ai_html
    messages.append(dict_question_answer)
    return {"answer": response_ai_html, "messages": messages, "title": response_ai_title}

def ai_send_message_with_history(messages, text):
    history = []
    for message in messages:
        history.append(HumanMessage(message["question"]))
        history.append(ChatMessage(message["answer"], role="assistant"))
    history.append(HumanMessage(text))
    response_ai = giga.invoke(history)
    response_ai_html = markdown.markdown(response_ai.content)
    messages.append({"question": text, "answer": response_ai_html})
    return {"answer": response_ai_html, "messages": messages}


