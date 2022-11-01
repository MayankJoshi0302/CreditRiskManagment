from typing import Union, List
from pydantic import BaseModel
from models.prediction_model import BasePredictionModel, AllCustomerPredictions


class BaseCustomerModel(BaseModel):
    Email: str
    Name: str
    Mobile: str
    City: str
    State: str
    Age: int
    Qualification: str
    Occupation: str
    EmploymentType: str
    HouseOwnership: str
    NumberOfDependants: int
    NetMonthlyIncome: float
    IsActiveLiabilities: int
    TotalLiabilities: float
    MonthlySpend: float
    RepaymentType: str

    class Config:
        orm_mode = True


class CustomerPredictionModel(BaseCustomerModel):
    CustomerId: int
    Predictions: List[AllCustomerPredictions] = []


class CreateCustomerModel(BaseCustomerModel):
    UserId: int
