from typing import Union, List
from pydantic import BaseModel
from models.customer_model import CustomerPredictionModel


class BaseUserInfoModel(BaseModel):
    id: int
    username: str
    Email: str
    FirstName: str
    LastName: str

    class Config:
        orm_mode = True


class UserHistoryInfoModel(BaseUserInfoModel):
    Customers: List[CustomerPredictionModel] = []


class UserCredentials(BaseUserInfoModel):
    password: str
