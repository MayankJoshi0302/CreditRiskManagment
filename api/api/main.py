import os
import dill
import uvicorn
from typing import Union
from fastapi import Depends, FastAPI, HTTPException, status, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from auth import auth_handler
from routers import token_route
import models
from sqlalchemy.orm import Session
from queries import queries
from helper.database import get_db_session
from helper import config, inference
from helper.ml_transformer import CRMTransformer


app = FastAPI()
app.include_router(token_route.token)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=['*']
)


@app.exception_handler(Exception)
async def something_went_wrong(req: Request, err: Exception):
    base_error_message = f"Something went wrong with: {req.method}: {req.url}"
    return JSONResponse(status_code=400, content={"message": f"{base_error_message}. Detail: {err}"})


@app.on_event('startup')
async def startup_event():
    global RF_V1_26OCT2022_2C76E # Model 03
    global DT_V1_25OCT2022_2B76E # Model 02
    global LR_V1_15OCT2022_2A76E # Model 01

    RF_V1_26OCT2022_2C76E_path = os.getcwd() + '/ml_models/RF_V1_26OCT2022_2C76E.dill'
    with open(RF_V1_26OCT2022_2C76E_path, 'rb') as pipe_03:
        RF_V1_26OCT2022_2C76E = dill.load(pipe_03)

    DT_V1_25OCT2022_2B76E_path = os.getcwd() + '/ml_models/DT_V1_25OCT2022_2B76E.dill'
    with open(DT_V1_25OCT2022_2B76E_path, 'rb') as pipe_02:
        DT_V1_25OCT2022_2B76E = dill.load(pipe_02)

    LR_V1_15OCT2022_2A76E_path = os.getcwd() + '/ml_models/LR_V1_15OCT2022_2A76E.dill'
    with open(LR_V1_15OCT2022_2A76E_path, 'rb') as pipe_01:
        LR_V1_15OCT2022_2A76E = dill.load(pipe_01)


@app.post('/api/v1/predictions/', response_model=models.customer_model.CustomerPredictionModel)
def prediction(customer: models.customer_model.BaseCustomerModel,
               db: Session = Depends(get_db_session),
               auth_user: str = Depends(auth_handler.get_current_user),
               update: bool = False, customer_id: int = -1):

    if update:
        if customer_id < 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
        db_customer = queries.update_existing_customer(db, customer, customer_id=customer_id, user_id=auth_user.id)
        if isinstance(db_customer, int):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
                headers={"WWW-Authenticate": "Bearer"},
            )
        ml_01 = inference.CreditRiskModeling_V1(db_customer, ml_pipeline=LR_V1_15OCT2022_2A76E)
        ml_02 = inference.CreditRiskModeling_V2(db_customer, ml_pipeline=DT_V1_25OCT2022_2B76E)
        ml_03 = inference.CreditRiskModeling_V3(db_customer, ml_pipeline=RF_V1_26OCT2022_2C76E)
        predictions_01 = ml_01.get_predictions()
        predictions_02 = ml_02.get_predictions()
        predictions_03 = ml_03.get_predictions()

        customer_predictions_01 = queries.update_existing_customer_prediction(db, customer_id, predictions_01,
                                                                              model_id='LR_V1_15OCT2022_2A76E')
        customer_predictions_02 = queries.update_existing_customer_prediction(db, customer_id, predictions_02,
                                                                              model_id='DT_V1_25OCT2022_2B76E')
        customer_predictions_03 = queries.update_existing_customer_prediction(db, customer_id, predictions_03,
                                                                              model_id='RF_V1_26OCT2022_2C76E')
    else:
        db_customer = queries.add_customer(db, customer, auth_user)
        ml_01 = inference.CreditRiskModeling_V1(db_customer, ml_pipeline=LR_V1_15OCT2022_2A76E)
        ml_02 = inference.CreditRiskModeling_V2(db_customer, ml_pipeline=DT_V1_25OCT2022_2B76E)
        ml_03 = inference.CreditRiskModeling_V3(db_customer, ml_pipeline=RF_V1_26OCT2022_2C76E)
        predictions_01 = ml_01.get_predictions()
        predictions_02 = ml_02.get_predictions()
        predictions_03 = ml_03.get_predictions()

        customer_predictions_01 = queries.add_customer_prediction(db, predictions_01)
        customer_predictions_02 = queries.add_customer_prediction(db, predictions_02)
        customer_predictions_03 = queries.add_customer_prediction(db, predictions_03)

    return db_customer


@app.get("/users/history", response_model=models.user_model.UserHistoryInfoModel)
def read_user(db: Session = Depends(get_db_session), auth_user: str = Depends(auth_handler.get_current_user)):
    db_user = queries.get_user_details(db, user_id=auth_user.id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', reload=True)
