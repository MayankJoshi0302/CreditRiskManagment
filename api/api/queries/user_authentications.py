from sqlalchemy.orm import Session
from schemas.user import User
from helper import hashing
from models import user_model
from typing import Union


def validate_user(db: Session, username: str, password: str) -> Union[bool, user_model.BaseUserInfoModel]:
    user_info = db.query(User).filter(User.username == username).first()
    if not user_info:
        return False
    if not hashing.verify_password(password, user_info.password):
        return False
    user = user_model.BaseUserInfoModel(
        id=user_info.id,
        username=user_info.username,
        Email=user_info.Email,
        FirstName=user_info.FirstName,
        LastName=user_info.LastName
    )
    return user


def is_user_exists(db: Session, username: str) -> Union[bool, user_model.BaseUserInfoModel]:
    user_info = db.query(User).filter(User.username == username).first()
    if not user_info:
        return False
    user = user_model.BaseUserInfoModel(
        id=user_info.id,
        username=user_info.username,
        Email=user_info.Email,
        FirstName=user_info.FirstName,
        LastName=user_info.LastName
    )
    return user
