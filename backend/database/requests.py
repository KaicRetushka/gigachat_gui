from sqlalchemy.orm import sessionmaker
from datetime import datetime
import json

from backend.ai_router import ai_send_message, ai_send_message_with_history
from backend.database.models import engine, TableUsers, TableChats

Session = sessionmaker(bind=engine, autoflush=True)

def insert_user(login, name, surname, password):
    with Session() as session:
        user = session.query(TableUsers).filter(TableUsers.login == login).first()
        if user:
            return False
        else:
            user = TableUsers(login=login, name=name, surname=surname, password=password)
            session.add(user)
            session.commit()
            return user.id
        
def check_user(login, password):
    with Session() as session:
        user = session.query(TableUsers).filter((TableUsers.login == login) & (TableUsers.password == password)).first()
        if user:
            return True
        return False
    
def insert_message_create_chat(user_id, text):
    with Session() as session:
        response_ai = ai_send_message(text)
        chat = TableChats(user_id=user_id, messages=json.dumps(response_ai["messages"]), title=response_ai["title"], last_change_datetime=datetime.now())
        session.add(chat)
        session.commit()
        return {"answer_ai": response_ai["answer"], "chat_id": chat.id}
    
def insert_message_with_history(user_id, chat_id, text):
    with Session() as session:
        chat = session.query(TableChats).filter((TableChats.user_id == user_id) & (TableChats.id == chat_id)).first()
        if chat:
            messages = chat.messages
            response_ai = ai_send_message_with_history(json.loads(messages), text)
            chat.messages = json.dumps(response_ai["messages"])
            chat.last_change_datetime = datetime.now()
            session.commit()
            return response_ai["answer"]
        return False
    
def check_chat(chat_id, user_id):
    with Session() as session:
        chat = session.query(TableChats).filter((TableChats.user_id == user_id) & (TableChats.id == chat_id)).first()
        if chat:
            return True
        return False
    
def select_all_messages(chat_id):
    with Session() as session:
        messages = (session.query(TableChats).filter(TableChats.id == chat_id).first()).messages
        return json.loads(messages)
    
# def select_all_chats(id):
#     chats = 