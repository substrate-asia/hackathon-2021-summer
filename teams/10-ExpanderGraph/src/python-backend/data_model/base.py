from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


USERNAME = ''
PASSWORD = ''
IP = ''
PORT = '3306'
DB = 'xpander'

engine = create_engine(f'mysql+mysqlconnector://{USERNAME}:{PASSWORD}@{IP}:{PORT}/{DB}')
DBSession = sessionmaker(bind=engine)
session = DBSession()

Base = declarative_base()
