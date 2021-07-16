import enum

from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey, Date, Enum
from sqlalchemy.orm import relationship
from data_model.base import Base


class TokenSeniorityDistribution(Base):
    __tablename__ = "token_seniority_distribution"

    id = Column(Integer, primary_key=True)
    token = Column(String(64))
    pct_token_less_7d = Column(Float)
    pct_token_7d_to_30d = Column(Float)
    pct_address_less_7d = Column(Float)
    pct_address_7d_to_30d = Column(Float)

    def __init__(self, token, pct_token_less_7d, pct_token_7d_to_30d, pct_address_less_7d,
                 pct_address_7d_to_30d):
        self.token = token
        self.pct_token_less_7d = pct_token_less_7d
        self.pct_token_7d_to_30d = pct_token_7d_to_30d
        self.pct_address_less_7d = pct_address_less_7d
        self.pct_address_7d_to_30d = pct_address_7d_to_30d


class UniqueAddressesForToken(Base):
    __tablename__ = "unique_addresses_for_token"

    id = Column(Integer, primary_key=True)
    date = Column(Date)
    token = Column(String(64))
    num_unique_addresses = Column(Integer)

    def __init__(self, date, token, num_unique_addresses):
        self.date = date
        self.token = token
        self.num_unique_addresses = num_unique_addresses
