from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey, Date, Enum
from data_model.base import Base


class TopLabel(Base):
    __tablename__ = "top_labels"

    id = Column(Integer, primary_key=True)
    label = Column(String(64))
    transactions = Column(Integer)
    num_addresses = Column(Integer)
    eth_vol = Column(Float)
    vol_out_eth = Column(Float)
    vol_in_eth = Column(Float)
    num_token_txs = Column(Integer)
    txs_in_tokens = Column(Integer)
    txs_out_tokens = Column(Integer)

    def __init__(self, label, transactions, num_addresses, eth_vol, vol_out_eth, vol_in_eth, num_token_txs, txs_in_tokens, txs_out_tokens):
        self.label = label
        self.transactions = transactions
        self.num_addresses = num_addresses
        self.eth_vol = eth_vol
        self.vol_out_eth = vol_out_eth
        self.vol_in_eth = vol_in_eth
        self.num_token_txs = num_token_txs
        self.txs_in_tokens = txs_in_tokens
        self.txs_out_tokens = txs_out_tokens
