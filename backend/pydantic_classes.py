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