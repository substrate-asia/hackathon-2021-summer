import enum

from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey, Date, Enum
from sqlalchemy.orm import relationship
from data_model.base import Base


class EthFlowTypeEnum(enum.Enum):
    incoming = 1
    outgoing = 2


class Counterparty(Base):
    __tablename__ = "counterparties"

    id = Column(Integer, primary_key=True)
    flow_type = Column(Enum(EthFlowTypeEnum))
    exchange = Column(String(64))
    volume = Column(Float)
    address = Column(String(64))

    def __init__(self, flow_type, exchange, volume, address):
        self.flow_type = flow_type
        self.exchange = exchange
        self.volume = volume
        self.address = address
