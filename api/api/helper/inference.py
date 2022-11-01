import os
import joblib
import pandas as pd
import numpy as np
from models.credit_risk_model import BaseCreditRiskModelV1, BaseCreditRiskModelV2, BaseCreditRiskModelV3
from models.prediction_model import BasePredictionModel


class CreditRiskModeling_V1:
    def __init__(self, customer, ml_pipeline):
        self.__model_id = "LR_V1_15OCT2022_2A76E"
        self.__customer_info = customer
        self.credit_risk_customer_model = BaseCreditRiskModelV1(
            Age=customer.Age,
            Qualification=customer.Qualification,
            Occupation=customer.Occupation,
            EmploymentType=customer.EmploymentType,
            HouseOwnership=customer.HouseOwnership,
            NumberOfDependants=customer.NumberOfDependants,
            NetMonthlyIncome=customer.NetMonthlyIncome,
        )

        self.__credit_risk_customer_model_df = pd.DataFrame([self.credit_risk_customer_model.dict()])

        # self.__ml_pipeline_path = os.getcwd() + '/ml_models/CreditRiskModeling_TransformerPipeline_v1.0'
        self.__ml_pipeline = ml_pipeline

    def get_predictions(self):
        proba = round(self.__ml_pipeline.predict_proba(self.__credit_risk_customer_model_df).max(), 2)
        offset, pdo = 500, 20
        factor = (pdo/np.log(2))*2
        return BasePredictionModel(
            ModelId=self.__model_id,
            CustomerId=self.__customer_info.CustomerId,
            ConfidenceScore=proba,
            CreditScore=round(offset + (factor * np.log(proba/(1 - proba))), 0),
            PredictedLabel=self.__ml_pipeline.predict(self.__credit_risk_customer_model_df)[0]
        )


class CreditRiskModeling_V2:
    def __init__(self, customer, ml_pipeline):
        self.__model_id = "DT_V1_25OCT2022_2B76E"
        self.__customer_info = customer
        self.credit_risk_customer_model = BaseCreditRiskModelV2(
            Age=customer.Age,
            Qualification=customer.Qualification,
            Occupation=customer.Occupation,
            EmploymentType=customer.EmploymentType,
            HouseOwnership=customer.HouseOwnership,
            NumberOfDependants=customer.NumberOfDependants,
            NetMonthlyIncome=customer.NetMonthlyIncome,
            MonthlySpend=customer.MonthlySpend,
            RepaymentType=customer.RepaymentType,
            TotalLiabilities=customer.TotalLiabilities,
        )

        self.__credit_risk_customer_model_df = pd.DataFrame([self.credit_risk_customer_model.dict()])

        # self.__ml_pipeline_path = os.getcwd() + '/ml_models/CreditRiskModeling_TransformerPipeline_v1.0'
        self.__ml_pipeline = ml_pipeline

    def get_predictions(self):
        proba = round(self.__ml_pipeline.predict_proba(self.__credit_risk_customer_model_df).max(), 2)
        offset, pdo = 500, 20
        factor = (pdo/np.log(2))*2
        return BasePredictionModel(
            ModelId=self.__model_id,
            CustomerId=self.__customer_info.CustomerId,
            ConfidenceScore=proba,
            CreditScore=round(offset + (factor * np.log(proba/(1 - proba))), 0),
            PredictedLabel=self.__ml_pipeline.predict(self.__credit_risk_customer_model_df)[0]
        )


class CreditRiskModeling_V3:
    def __init__(self, customer, ml_pipeline):
        self.__model_id = "RF_V1_26OCT2022_2C76E"
        self.__customer_info = customer
        self.credit_risk_customer_model = BaseCreditRiskModelV3(
            Age=customer.Age,
            Qualification=customer.Qualification,
            Occupation=customer.Occupation,
            EmploymentType=customer.EmploymentType,
            HouseOwnership=customer.HouseOwnership,
            NumberOfDependants=customer.NumberOfDependants,
            NetMonthlyIncome=customer.NetMonthlyIncome,
            MonthlySpend=customer.MonthlySpend,
            TotalLiabilities=customer.TotalLiabilities,
        )

        self.__credit_risk_customer_model_df = pd.DataFrame([self.credit_risk_customer_model.dict()])

        # self.__ml_pipeline_path = os.getcwd() + '/ml_models/CreditRiskModeling_TransformerPipeline_v1.0'
        self.__ml_pipeline = ml_pipeline

    def get_predictions(self):
        proba = round(self.__ml_pipeline.predict_proba(self.__credit_risk_customer_model_df).max(), 2)
        offset, pdo = 500, 20
        factor = (pdo/np.log(2))*2
        return BasePredictionModel(
            ModelId=self.__model_id,
            CustomerId=self.__customer_info.CustomerId,
            ConfidenceScore=proba,
            CreditScore=round(offset + (factor * np.log(proba/(1 - proba))), 0),
            PredictedLabel=self.__ml_pipeline.predict(self.__credit_risk_customer_model_df)[0]
        )
