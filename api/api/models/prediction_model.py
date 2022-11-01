from typing import Union
from pydantic import BaseModel


class BasePredictionModel(BaseModel):
    ModelId: str
    CustomerId: int
    ConfidenceScore: float
    CreditScore: int
    PredictedLabel: int

    class Config:
        orm_mode = True


class AllCustomerPredictions(BasePredictionModel):
    id: int

    class Config:
        orm_mode = True
