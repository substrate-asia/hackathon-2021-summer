from fastapi import param_functions
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import BigInteger, SmallInteger
from .database import engine

Base = declarative_base()
Base.metadata.create_all(bind=engine)

# Stage与Author多对多关联中间表
# stages_authors = Table(
#     "stages_authors",
#     Base.metadata,
#     Column("stage_id", Integer, ForeignKey("stages.id"), nullable=False, primary_key=True),
#     Column("author_id", Integer, ForeignKey("authors.id"), nullable=False, primary_key=True)
# )


class RelateStagesAuthors(Base):
    __tablename__ = "stages_authors"
    id = Column(Integer, primary_key=True)
    stage_id = Column(Integer, ForeignKey("stages.id"))
    author_id = Column(Integer, ForeignKey("authors.id"))


class Author(Base):

    __tablename__ = "authors"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    nickname = Column(String(50), nullable=True)
    email = Column(String(200), unique=True, index=True)
    hashed_password = Column(String(300))
    chain_address = Column(String(300))
    is_active = Column(Boolean, default=True)

    stages = relationship("Stage", back_populates="owner")
    join_stages = relationship(
        "Stage",
        secondary="stages_authors",
        back_populates="partners")



class Stage(Base):
    __tablename__ = "stages"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), index=True)
    content = Column(Text)
    owner_id = Column(Integer, ForeignKey("authors.id"))

    owner = relationship("Author", back_populates="stages")
    partners = relationship(
        "Author",
        secondary="stages_authors",
        back_populates="join_stages")



class Test(Base):
    __tablename__ = "tests"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), index=True)
    owner_id = Column(Integer, ForeignKey("authors.id"))
