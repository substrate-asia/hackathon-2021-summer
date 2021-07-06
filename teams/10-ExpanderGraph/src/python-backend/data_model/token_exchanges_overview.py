import enum

from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey, Date, Enum
from sqlalchemy.orm import relationship, sessionmaker
from data_model.base import Base


class TokenBalanceTypeEnum(enum.Enum):
    dex_traders = 1
    exchanges = 2


class TokenExchangeSupplyRatio(Base):
    __tablename__ = "token_exchange_supply_ratio"

    id = Column(Integer, primary_key=True)
    token = Column(String(64))
    ratio = Column(Float)

    def __init__(self, token, ratio):
        self.token = token
        self.ratio = ratio


class TokenBalancesComparison(Base):
    __tablename__ = "token_balances_comparison"

    id = Column(Integer, primary_key=True)
    token = Column(String(64))
    pct_of_dex_traders = Column(Float)
    pct_of_exchanges = Column(Float)
    date = Column(Date)


    def __init__(self, token, pct_of_dex_traders, pct_of_exchanges, date):
        self.token = token
        self.pct_of_dex_traders = pct_of_dex_traders
        self.pct_of_exchanges = pct_of_exchanges
        self.date = date


class TokensOnExchanges(Base):
    __tablename__ = "tokens_on_exchanges"

    id = Column(Integer, primary_key=True)
    token = Column(String(64))
    exchange = Column(String(64))
    date = Column(Date)
    volume = Column(Integer)

    def __init__(self, token, exchange, date, volume):
        self.token = token
        self.exchange = exchange
        self.date = date
        self.volume = volume


class TopExchange(Base):
    __tablename__ = "top_exchanges"

    id = Column(Integer, primary_key=True)
    token = Column(String(64))
    exchange = Column(String(64))
    balance = Column(Integer)
    change = Column(Integer)
    first_in = Column(Integer)

    def __init__(self, token, exchange, balance, change, first_in):
        self.token = token
        self.exchange = exchange
        self.balance = balance
        self.change = change
        self.first_in = first_in
