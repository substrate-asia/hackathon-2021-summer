from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from datapools import crud, models, schemas
from sqlalchemy.orm import Session
from datapools.database import get_db
from datetime import datetime, timedelta

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()


@router.get("/authors/", response_model=List[schemas.Author], tags=["authors"])
def read_authors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    authors = crud.get_authors(db, skip=skip, limit=limit)
    return authors


@router.get("/authors/me/", response_model=schemas.Author, tags=["authors"])
async def read_authors_me(current_author: schemas.Author = Depends(crud.get_current_user)):
    print(current_author.__dict__)
    return current_author


@router.post("/authors/create_author/", response_model=schemas.Token, tags=["authors"])
def create_author(author: schemas.AuthorCreate, db: Session = Depends(get_db)):
    author = crud.create_author(db=db, author=author)

    access_token_expires = timedelta(minutes=crud.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = crud.create_access_token(
        data={"sub": author.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/authors/token/", response_model=schemas.Token, tags=["authors"])
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="用户名或密码错误",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=crud.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = crud.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/authors/{username}/", response_model=schemas.Author, tags=["authors"])
def read_author(username, db: Session = Depends(get_db)):
    db_author = crud.get_author_by_username(db, username=username)
    if db_author is None:
        raise HTTPException(status_code=404, detail="用户不存在")
    return db_author






