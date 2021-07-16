# %%
import ccxt,time,mplfinance
from tqdm import tqdm
import numpy as np
import pandas as pd
from pandas import Timestamp as ts
import matplotlib.pyplot as plt
import seaborn as sns
from all_index import *

cex = ccxt.okex({'hostname': 'okex.win',})
# cex = ccxt.binance() 
cex.load_markets()
columns = ['Timestamp', 'Open', 'High', 'Low', 'Close', 'Volume']
print(list(filter(lambda x: '/USDT' in x,
                  cex.symbols))[:30])

def plot_bs_point(prices, strategy):
    xb = prices.iloc[strategy==1].index
    xs = prices.iloc[strategy==-1].index
    yb = prices[xb]
    ys = prices[xs]
    plt.scatter(xb, yb, s=30, c='green')
    plt.scatter(xs, ys, s=30, c='purple')
    
def crawl_coin(coin_name, freq, limit = 200):
    data_concat, data = [], []
    data_next = cex.fetch_ohlcv(coin_name, timeframe=freq, limit=limit)
    interval = data_next[1][0] - data_next[0][0]

    while True:
        since = data_next[0][0] - limit * interval
        data_next = cex.fetch_ohlcv(coin_name, timeframe=freq, limit=limit, since=since - 1)
        if not data_next:
            break
        data_concat.append(data_next)

    for data_prev in reversed(data_concat):
        data.extend(data_prev)
        
    data = np.array(data)
    assert len(np.unique(np.diff(data[:,0]))) == 1, "Time Interval Error!"
    return data


# %%
coin = 'BCD/BTC'
freq = '1h'

data = pd.DataFrame(cex.fetch_ohlcv(coin, freq), columns=columns)
data.index = pd.to_datetime(data['Timestamp'] * 1e6)

strategy = MACD_strategy(data)

plt.figure(figsize=(12, 7))

plt.subplot(2,1,1)
plt.plot(data['Close'], color = 'lightblue')

plt.subplot(2,1,2)
plt.plot(RSI(data, 6))
plt.plot(RSI(data, 12))
# plt.plot(range(len(data)), [20]*len(data.index))
# plt.plot(range(len(data)), [80]*len(data.index))
plt.show()

# %%
freq = '1m'

coins = ('BTC/USDT', 'ETH/USDT', 'XRP/USDT',
             'DOT/USDT', 'XLM/USDT', 'DOGE/USDT',
             'MATIC/USDT', 'CMT/USDT')

# coins = ('MATIC/USDT', )

for coin in coins:
    print(coin)
    data = pd.DataFrame(cex.fetch_ohlcv(coin, freq), columns=columns)
    # data = pd.DataFrame(crawl_coin(coin, freq), columns=columns)
    data.index = pd.to_datetime(data['Timestamp'] * 1e6)

    prices = data['Close'] / data['Close'][0]

    # strategy = RSI_strategy(data, window=4,
    #                         buy_threshold=50,
    #                         sell_threshold=50)
    
    strategy = MACD_strategy(data, 7, 30)
    wealths = BackTest(data, strategy, show_log=False,)

    plt.figure(figsize=(12, 5))
    plt.plot(data.index, prices, color='lightblue')
    plt.plot(data.index, wealths, color='yellow')
    plot_bs_point(prices, strategy)
    plt.show()
    print('\n\n')
    time.sleep(1)

# %%
