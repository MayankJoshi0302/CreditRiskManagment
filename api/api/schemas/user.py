from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship
from helper.database import Base
from schemas.customers import Customer


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True)
    password = Column(String(255))
    Email = Column(String(255))
    FirstName = Column(String(255))
    LastName = Column(String(255))

    Customers = relationship("Customer")
