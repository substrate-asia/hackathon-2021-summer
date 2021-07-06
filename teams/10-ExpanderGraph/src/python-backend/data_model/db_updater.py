import sys

sys.path.append("..")
from sqlalchemy.orm import relationship, sessionmaker

from address_overview import *
from top_labels import *
from holders import *
from notable_wallets import *
from token_exchanges_overview import *
from top_balances import *
from top_transactions import *
from holders import *
from wallet_profiller import *

from base import engine, session

import datetime

sample_date = datetime.datetime(2020, 11, 30)

Base.metadata.create_all(engine)
label = Label(name="NFT", address="0x829bd824b016326a401d083b33d092293333a832")
session.add(label)
balance0 = TokenBalance(token="ETH", address="0x829bd824b016326a401d083b33d092293333a832", balance=1.5)
balance1 = TokenBalance(token="ECG", address="0x829bd824b016326a401d083b33d092293333a832", balance=2.5)
session.add(balance0)
session.add(balance1)
# dailyactivity = DailyActivity(date=sample_date, address="0x829bd824b016326a401d083b33d092293333a832", transactions=50)
# # session.add(dailyactivity)
#
# counter_party = Counterparty(flow_type=EthFlowTypeEnum.incoming, exchange="OKEX", volume=324, address="0x829bd824b016326a401d083b33d092293333a832")
# counter_party = Counterparty(flow_type=EthFlowTypeEnum.incoming, exchange="Uniswap", volume=255, address="0x829bd824b016326a401d083b33d092293333a832")
# counter_party = Counterparty(flow_type=EthFlowTypeEnum.outgoing, exchange="Uniswap", volume=723, address="0x829bd824b016326a401d083b33d092293333a832")
# counter_party = Counterparty(flow_type=EthFlowTypeEnum.outgoing, exchange="Tokenlon", volume=55, address="0x829bd824b016326a401d083b33d092293333a832")
# session.add(counter_party)
#
# top_label = TopLabel(
# label = 'High Activity',
# transactions = 117,
# num_addresses=40,
# eth_vol=23,
# vol_out_eth=9.95,
# vol_in_eth=13,
# num_token_txs=62,
# txs_in_tokens=38,
# txs_out_tokens=24
# )
# session.add(top_label)
#
# supply_ratio = TokenExchangeSupplyRatio(token="GTC", ratio=0.0067)
# session.add(supply_ratio)
#
#
# token_balances_comp = TokenBalancesComparison(token="GTC", pct_of_dex_traders=1, pct_of_exchanges=0, date=sample_date)
# session.add(token_balances_comp)
#
# tokens_on_exchanges0 = TokensOnExchanges(date=sample_date, token="GTC", exchange="Okex", volume=1554)
# tokens_on_exchanges1 = TokensOnExchanges(date=sample_date, token="GTC", exchange="Binance", volume=397)
# tokens_on_exchanges2 = TokensOnExchanges(date=sample_date, token="GTC", exchange="Huobi", volume=888)
#
# session.add(tokens_on_exchanges0)
# session.add(tokens_on_exchanges1)
# session.add(tokens_on_exchanges2)
#
# top_exchange0 = TopExchange(token="GTC", exchange = "Okex", balance = 131212, change = 7831, first_in = 30)
# top_exchange1 = TopExchange(token="GTC", exchange = "Binance", balance = 11023, change = 333, first_in = 50)
#
# session.add(top_exchange0)
# session.add(top_exchange1)
#
# wallet0 = NotableWallet(token="GTC", name = "Dex Trader", change=-198782, balance=1231421, first_in = 22)
# wallet1 = NotableWallet(token="GTC", name = "MMC", change=932073, balance=12322, first_in = 50)
# session.add(wallet0)
# session.add(wallet1)
#
# txn0=TopTransaction(token="GTC", source="Gate.io 1", destination="izzv.eth", volume=12223, time_ago='5d')
# txn1=TopTransaction(token="GTC", source="linch", destination="ETH millionaire", volume=520012, time_ago='15h')
# session.add(txn0)
# session.add(txn1)
#
# top_balance0 = TopBalance(token="GTC", address="Medium Dex Tranders", balance=1231231,
#                           pct_ownership=0.04, change_7d=-410983, change_30d=878897,
#                           received=900000, sent=992, first_in=22)
# top_balance1 = TopBalance(token="GTC", address="MXE2", balance=5531231,
#                           pct_ownership=0.05, change_7d=-510983, change_30d=578897,
#                           received=500000, sent=52, first_in=42)
# session.add(top_balance0)
# session.add(top_balance1)
#
#
# token_senaiority_distribution = TokenSeniorityDistribution(token="GTC",
#                                                            pct_token_less_7d=0.05,
#                                                            pct_token_7d_to_30d=0.95,
#                                                            pct_address_less_7d=0.2,
#                                                            pct_address_7d_to_30d=0.8)
#
#
# session.add(token_senaiority_distribution)
#
# unique_address0 = UniqueAddressesForToken(token="GTC", date=sample_date, num_unique_addresses=10)
# session.add(unique_address0)

session.commit()
session.close()
