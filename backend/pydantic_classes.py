from pydantic import BaseModel

class BudyReg(BaseModel):
    login: str
    name: str
    surname : str
    password: str

class BodyVhod(BaseModel):
    login: str
    password: str

class BodyMessage(BaseModel):
    text: str

class BodyNewTitle(BaseModel):
    new_title: str

class BodyLogin(BaseModel):
    new_login: str

class BodyLoginPassword(BaseModel):
    new_login: str
    old_password: str
    new_password: str