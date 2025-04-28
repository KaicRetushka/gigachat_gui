from sqlalchemy import create_engine, INTEGER, String, JSON, ForeignKey
from sqlalchemy.orm import declarative_base, Mapped, mapped_column, relationship 
from datetime import datetime

engine = create_engine("sqlite:///backend/database/mydb.db")

Base = declarative_base()

class TableUsers(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(INTEGER, primary_key=True, autoincrement=True)
    login: Mapped[str]
    name: Mapped[str]
    surname: Mapped[str]
    password: Mapped[str]
    chats = relationship("TableChats", back_populates="users")

class TableChats(Base):
    __tablename__ = "chats"
    id: Mapped[int] = mapped_column(INTEGER, primary_key=True, autoincrement=True)
    title: Mapped[str]
    messages: Mapped[str] = mapped_column(JSON)
    users = relationship("TableUsers", back_populates="chats")
    last_change_datetime: Mapped[datetime]
    user_id: Mapped[int] = mapped_column(INTEGER, ForeignKey("users.id"))

def create_db():
    Base.metadata.create_all(bind=engine)