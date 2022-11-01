from sqlalchemy.orm import Session
import models
import schemas
import datetime


def add_customer(db: Session,
                 customer_info: models.customer_model.CreateCustomerModel,
                 user_info: models.user_model.BaseUserInfoModel):
    db_customer = schemas.customers.Customer(
        UserId=user_info.id,
        Name=customer_info.Name,
        Email=customer_info.Email,
        Mobile=customer_info.Mobile,
        City=customer_info.City,
        State=customer_info.State,
        HouseOwnership=customer_info.HouseOwnership,
        Age=customer_info.Age,
        NetMonthlyIncome=customer_info.NetMonthlyIncome,
        EmploymentType=customer_info.EmploymentType,
        Occupation=customer_info.Occupation,
        Qualification=customer_info.Qualification,
        NumberOfDependants=customer_info.NumberOfDependants,
        IsActiveLiabilities=customer_info.IsActiveLiabilities,
        TotalLiabilities=customer_info.TotalLiabilities,
        MonthlySpend=customer_info.MonthlySpend,
        RepaymentType=customer_info.RepaymentType
    )
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer


def get_user_details(db: Session, user_id: int):
    return db.query(schemas.user.User).filter(schemas.user.User.id == user_id).first()


def add_customer_prediction(db: Session,
                            predictions: models.prediction_model.BasePredictionModel):
    cust_prediction = schemas.predictions.Prediction(
        ModelId=predictions.ModelId,
        CustomerId=predictions.CustomerId,
        ConfidenceScore=predictions.ConfidenceScore,
        CreditScore=predictions.CreditScore,
        PredictedLabel=predictions.PredictedLabel
    )
    db.add(cust_prediction)
    db.commit()
    db.refresh(cust_prediction)

    return cust_prediction


def update_existing_customer(db: Session,
                             customer: models.customer_model.BaseCustomerModel,
                             customer_id: int, user_id: int):
    db_customer = db.query(schemas.customers.Customer).filter(schemas.customers.Customer.CustomerId == customer_id).filter(schemas.customers.Customer.UserId == user_id).first()

    if not db_customer:
        return -1

    for var, value in customer.dict().items():
        setattr(db_customer, var, value)

    setattr(db_customer, 'ModifiedAt', datetime.datetime.now())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)

    return db_customer


def update_existing_customer_prediction(db: Session,
                                        customer_id: int,
                                        predictions: models.prediction_model.BasePredictionModel,
                                        model_id: str):
    db_cust_prediction = db.query(schemas.predictions.Prediction).filter((schemas.predictions.Prediction.CustomerId == customer_id) & (schemas.predictions.Prediction.ModelId == model_id)).first()
    if not db_cust_prediction:
        add_customer_prediction(db, predictions)
        return db_cust_prediction

    for var, value in predictions.dict().items():
        setattr(db_cust_prediction, var, value)

    db.add(db_cust_prediction)
    db.commit()
    db.refresh(db_cust_prediction)

    return db_cust_prediction
