
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


# SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://sfc_api_db_user:SFC2021$happy@nj-cdb-4onyqbzd.sql.tencentcdb.com:63942/sfc_api_db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
