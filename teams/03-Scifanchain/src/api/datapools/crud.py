from sqlalchemy.sql.functions import mode
from datapools.database import get_db
from sqlalchemy.orm import Session, session
from . import models, schemas
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
from fastapi import Depends, status, HTTPException

from sqlalchemy import Table, create_engine, MetaData, select, func

# to get a string like this run:
# openssl rand -hex 32
# 令牌签名密钥
SECRET_KEY = "da0346235d5544c31273e0dfc044a730b00c5ab7f676f75721778c9f6104d3e3"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 6000

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# 校验密码
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# 哈希密码
def get_password_hash(password):
    return pwd_context.hash(password)

# 校验用户
def authenticate_user(db, username: str, password: str):
    user = get_author_by_username(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

# 创建token
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt

# 获取当前用户
async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_author_by_username(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

# 获取当前活跃用户
async def get_current_active_user(current_user: schemas.Author = Depends(get_current_user)):
    if current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# 根据ID获取某一用户
def get_author(db: Session, author_id: int):
    return db.query(models.Author).filter(models.Author.id == author_id).first()

# 根据用户名获取某一用户
def get_author_by_username(db: Session, username: str):

    return db.query(models.Author).filter(models.Author.username == username).first()

# 根据邮箱获取某一用户
def get_author_by_email(db: Session, email: str):

    return db.query(models.Author).filter(models.Author.email == email).first()

# 获取用户列表
# 根据skip和limit分页
def get_authors(db: Session, skip: int = 0, limit: int = 100):

    return db.query(models.Author).offset(skip).limit(limit).all()

# 创建用户
def create_author(db: Session, author: schemas.AuthorCreate):
    hashed_password = get_password_hash(author.password)
    db_author = models.Author(
        username = author.username,
        nickname = '',
        email=author.email, 
        chain_address = author.chain_address,
        hashed_password=hashed_password)
    db.add(db_author)
    db.commit()
    db.refresh(db_author)
    return db_author

# 获取stages列表
def get_stages(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Stage).offset(skip).limit(limit).all()


# 获取stages列表
def get_stage(stage_id, db: Session):
    return db.query(models.Stage).filter(models.Stage.id == stage_id).first()

# 创建stage
def create_stage(db: Session, stage: schemas.StageCreate, author: schemas.Author):
    db_stage = models.Stage(**stage.dict(), owner_id=author.id)
    db.add(db_stage)
    db.commit()
    db.refresh(db_stage)
    return db_stage


# 更新stage
def update_stage(stage_id: int, stage_update: schemas.StageUpdate, db: Session,  author: schemas.Author):
  db_stage = db.query(models.Stage).filter(
      models.Stage.id == stage_id).first()
  db_author = db.query(models.Author).filter(models.Author.id == author.id).first()
  if db_stage:
      update_dict = stage_update.dict(exclude_unset=True)
      for k, v in update_dict.items():
          setattr(db_stage, k, v)
    
      db_stage.partners = [db_author]

      db.add(db_stage)
      db.commit()
      db.flush()
      db.refresh(db_stage)


      return db_stage

# 创建stage和author多对多映射
def create_state_author(stage_id: int, author_id: int, db: Session):
  db_stage_author = models.stages_authors(stage_id, author_id)
  db.add(db_stage_author)
  db.commit()
  db.refresh(db_stage_author)
  return db_stage_author
