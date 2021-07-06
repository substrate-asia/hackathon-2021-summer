# @ credit to
#       github: wyf-ACCEPT 
#       email : define_wifi@163.com

# RSI 相对强弱指数

import numpy as np
import pandas as pd

def RSI(
    data: pd.DataFrame,
    N: int = 14,
):
    """Calculate RSI Index (Relative Strength Index).

    Args:
        series (np.array): Close price data Series.
        N (int, optional): Number of days to calculate. Defaults to 14.
    """
    
    assert {'Open', 'Close', 'High', 'Low', 'Volume'} <= set(data.columns), \
        "The OHCLV information ('Open', 'Close', 'High', 'Low', 'Volume') should be in the data!"
    length = data.shape[0]
    
    diff_series = np.diff(data['Close'], 1, prepend=0)
    up, down = diff_series.copy(), diff_series.copy()
    
    # 统计所有涨盘和所有跌盘
    up[up < 0] = 0
    down[down > 0] = 0; down = -down
        
    # 注意前 N-1 个 rsi 的值直接定义为 50%
    rsi = np.zeros(length); rsi[:N-1] = 50
    
    for i in range(N-1, length): 
        A = up[i-N+1 : i+1].sum()       
        B = down[i-N+1 : i+1].sum()
        rsi[i] = A / (A + B) * 100
        
    return rsi


def RSI_strategy(
    data: pd.DataFrame,
    N: int = 14,
    window: int = 5,
    buy_threshold: float = 20,
    sell_threshold: float = 80,
):
    rsi = RSI(data, N)
    length = len(rsi)
    strategy = np.zeros(length)
    
    for i in range(window, length):
        if rsi[i] < sell_threshold and min(rsi[i-window:i]) > sell_threshold:
            strategy[i] = -1
        if rsi[i] > buy_threshold and max(rsi[i-window:i]) < buy_threshold:
            strategy[i] = 1
    
    return strategy