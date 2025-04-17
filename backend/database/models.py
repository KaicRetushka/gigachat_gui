from sqlalchemy import create_engine, INTEGER, String
from sqlalchemy.orm import declarative_base, Mapped, mapped_column

engine = create_engine("sqlite:///backend/database/mydb.db")

Base = declarative_base()

class TableUsers(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(INTEGER, primary_key=True, autoincrement=True)
    login: Mapped[str]
    name: Mapped[str]
    surname: Mapped[str]
    password: Mapped[str]


def create_db():
    Base.metadata.create_all(bind=engine)