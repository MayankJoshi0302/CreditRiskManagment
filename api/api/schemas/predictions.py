from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from helper.database import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True)
    ModelId = Column(String)
    CustomerId = Column(Integer, ForeignKey("customers.CustomerId"), nullable=False)
    ConfidenceScore = Column(Float, nullable=True)
    CreditScore = Column(Integer, nullable=False, default=0)
    PredictedLabel = Column(Integer, nullable=True)


