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
            return user.id
        return False
    
def insert_message_create_chat(user_id, text):
    with Session() as session:
        response_ai = ai_send_message(text)
        chat = TableChats(user_id=user_id, messages=json.dumps(response_ai["messages"]), title=response_ai["title"], last_change_datetime=datetime.now())
        session.add(chat)
        session.commit()
        return {"answer_ai": response_ai["answer"], "chat_id": chat.id, "title": response_ai["title"]}
    
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
    
def select_all_chats(user_id):
    print(user_id)
    with Session() as session:
        list_chats = session.query(TableChats.id, TableChats.title).filter(TableChats.user_id == user_id).order_by(TableChats.last_change_datetime).all()
        list_chats = [{"id": chat.id, "title": chat.title} for chat in list_chats]
        print(list_chats)
        return list_chats
    
def delete_chat_db(user_id, chat_id):
    with Session() as session:
        chat = session.query(TableChats).filter((TableChats.user_id == user_id) & (TableChats.id == chat_id)).first()
        if chat:
            session.delete(chat)
            session.commit()
            return True
        else:
            return False
    
def update_chat_db(user_id, chat_id, new_title):
    with Session() as session:
        chat = session.query(TableChats).filter((TableChats.user_id == user_id) & (TableChats.id == chat_id)).first()
        if chat:
            chat.title = new_title
            session.commit()
            return True
        else:
            return False

def select_login(user_id):
    with Session() as session:
        user = session.query(TableUsers).filter(TableUsers.id == user_id).first()
        return user.login 
    
def update_login(user_id, new_login):
    with Session() as session:
        user = session.query(TableUsers).filter((TableUsers.login == new_login) & (TableUsers.id != user_id)).first()
        if not(user):
            user = session.query(TableUsers).filter(TableUsers.id == user_id).first()
            user.login = new_login
            session.commit()
            return True
        return False

def update_login_password(user_id, new_login, old_password, new_password):
    with Session() as session:
        user = session.query(TableUsers).filter((TableUsers.login == new_login) & (TableUsers.id != user_id)).first()
        if not(user):
            user = session.query(TableUsers).filter(TableUsers.id == user_id).first()
            if user.password != old_password:
                return {"status_code": 401, "detail": "Неверный старый пароль"}
            user.login = new_login
            user.password = new_password
            session.commit()
            return {"status_code": 200, "detail": "Логин и пароль успешно изменены"}
        return {"status_code": 409, "detail": "Такой логин уже занят"}