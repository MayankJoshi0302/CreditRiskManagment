from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship
from helper.database import Base
import datetime
from schemas.predictions import Prediction


class Customer(Base):
    __tablename__ = "customers"

    CustomerId = Column(Integer, primary_key=True, unique=True)
    UserId = Column(Integer, ForeignKey("users.id"), nullable=False)
    Name = Column(String)
    Email = Column(String)
    Mobile = Column(String)
    City = Column(String)
    State = Column(String)
    HouseOwnership = Column(String)
    Age = Column(Integer)
    NetMonthlyIncome = Column(Float)
    EmploymentType = Column(String)
    Occupation = Column(String)
    Qualification = Column(String)
    NumberOfDependants = Column(Integer)
    IsActiveLiabilities = Column(Integer)
    TotalLiabilities = Column(Float)
    MonthlySpend = Column(Float)
    RepaymentType = Column(String, nullable=True)
    CreatedAt = Column(DateTime, nullable=False, default=datetime.datetime.now())
    ModifiedAt = Column(DateTime)

    # User = relationship("User", back_populates='Customers')
    Predictions = relationship("Prediction")
