from pydantic import BaseModel


class BaseCreditRiskModelV1(BaseModel):
    Age: int
    Qualification: str
    Occupation: str
    EmploymentType: str
    HouseOwnership: str
    NumberOfDependants: int
    NetMonthlyIncome: float

    class Config:
        orm_mode = True


class BaseCreditRiskModelV2(BaseModel):
    Age: int
    Qualification: str
    Occupation: str
    EmploymentType: str
    HouseOwnership: str
    NumberOfDependants: int
    NetMonthlyIncome: float
    MonthlySpend: float
    RepaymentType: str
    TotalLiabilities: float

    class Config:
        orm_mode = True


class BaseCreditRiskModelV3(BaseModel):
    Age: int
    Qualification: str
    Occupation: str
    EmploymentType: str
    HouseOwnership: str
    NumberOfDependants: int
    NetMonthlyIncome: float
    MonthlySpend: float
    TotalLiabilities: float

    class Config:
        orm_mode = True
