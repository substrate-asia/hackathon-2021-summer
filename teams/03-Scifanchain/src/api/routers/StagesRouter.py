from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from datapools import crud, models, schemas
from sqlalchemy.orm import Session
from datapools.database import get_db
from datetime import datetime, timedelta

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()


@router.post("/stages/create_stage/", response_model=schemas.Stage, tags=["stages"])
async def create_stage(stage: schemas.StageCreate, db: Session = Depends(get_db), author: schemas.Author = Depends(crud.get_current_user)):
    return crud.create_stage(stage=stage, db=db, author=author)


@router.get("/stages/", tags=["stages"])
async def read_stages(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    stages = crud.get_stages(db, skip=skip, limit=limit)
    return stages


@router.get("/stages/{stage_id}", tags=["stages"])
async def read_stages(stage_id: int, db: Session = Depends(get_db)):
    stage = crud.get_stage(stage_id, db)
    return stage


@router.put("/stages/{stage_id}", response_model=schemas.Stage, tags=["stages"])
def update_stage(stage_id: int, stage_update: schemas.StageUpdate, db: Session = Depends(get_db), author: schemas.Author = Depends(crud.get_current_user)):
    new_stage = crud.update_stage(stage_id=stage_id, stage_update=stage_update, db=db, author=author)
    if new_stage is None:
        raise HTTPException(status_code=404, detail="Stage not found")

    return new_stage
