import enum

from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey, Date, Enum
from sqlalchemy.orm import relationship, sessionmaker
from data_model.base import Base


class TopBalance(Base):
    __tablename__ = "top_balances"

    id = Column(Integer, primary_key=True)
    token = Column(String(64))
    address = Column(String(64))
    balance = Column(Integer)
    pct_ownership = Column(Float)
    change_7d = Column(Integer)
    change_30d = Column(Integer)
    received = Column(Integer)
    sent = Column(Integer)
    first_in = Column(Integer)

    def __init__(self, token, address, balance, pct_ownership, change_7d, change_30d, received, sent, first_in):
        self.token = token
        self.address = address
        self.balance = balance
        self.pct_ownership = pct_ownership
        self.change_7d = change_7d
        self.change_30d = change_30d
        self.received = received
        self.sent = sent
        self.first_in = first_in

