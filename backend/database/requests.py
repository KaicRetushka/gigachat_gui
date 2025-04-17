from sqlalchemy.orm import sessionmaker

from backend.database.models import engine, TableUsers

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