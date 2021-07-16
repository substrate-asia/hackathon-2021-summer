from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey, Date

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship


from data_model.base import Base


class Label(Base):
    __tablename__ = "label"

    id = Column(Integer, primary_key=True)
    name = Column(String(64))
    address = Column(String(64))

    def __init__(self, name, address):
        self.name = name
        self.address = address


class TokenBalance(Base):
    __tablename__ = "token_balance"

    id = Column(Integer, primary_key=True)
    token = Column(String(64))
    balance = Column(Float)
    address = Column(String(64))

    def __init__(self, token, balance, address):
        self.token = token
        self.balance = balance
        self.address = address


class DailyActivity(Base):
    __tablename__ = "daily_activities"
    id = Column(Integer, primary_key=True)
    date = Column(Date)
    transactions = Column(Integer)
    address = Column(String(64))

    def __init__(self, date, transactions, address):
        self.date = date
        self.transactions = transactions
        self.address = address


class HourlyActivity(Base):
    __tablename__ = "hourly_activities"
    id = Column(Integer, primary_key=True)
    date = Column(Date)
    transactions = Column(Integer)
    address = Column(String(64))

    def __init__(self, date, transactions, address):
        self.date = date
        self.transactions = transactions
        self.address = address


# class Address(Base):
#     __tablename__ = "address"
#
#     id = Column(Integer, primary_key=True)
#     address = Column(String(64), unique=True)
#     eth_balance = Column(Float)
#     labels = relationship(Label)
#     token_balances = relationship(TokenBalance)
#     daily_activities = relationship(DailyActivity)
#     hourly_activities = relationship(HourlyActivity)
#     counter_parties = relationship(Counterparties)
#
#     def __init__(self, address, eth_balance=0, labels=[], token_balances=[], daily_activities=[],
#                  hourly_activities=[], counter_parties=[]):
#         self.address = address
#         self.eth_balance = eth_balance
#         self.labels = labels
#         self.token_balances = token_balances
#         self.daily_activities = daily_activities
#         self.hourly_activities = hourly_activities
#         self.counter_parties = counter_parties
