# @ credit to
#       github: wyf-ACCEPT 
#       email : define_wifi@163.com

# MA 均线策略: 跌破均线时卖出

import numpy as np
import pandas as pd

def MA_touch_strategy(
    data: pd.DataFrame,
    N: int = 12,
):
    assert {'Open', 'Close', 'High', 'Low', 'Volume'} <= set(data.columns), \
        "The OHCLV information ('Open', 'Close', 'High', 'Low', 'Volume') should be in the data!"
    length = data.shape[0]
    
    ma = data['Close'].rolling(N).mean()
    low, high, close = data['Low'], data['High'], data['Close']
    strategy = np.zeros(length)
    
    for i in range(N-1, length):
        if ma[i-1] > close[i-1] and ma[i] < close[i]:
            strategy[i] = 1
        if ma[i-1] < close[i-1] and ma[i] > close[i]:
            strategy[i] = -1
            
    return strategy



def MA_cross_strategy(
    data: pd.DataFrame,
    N1: int = 5,
    N2: int = 20,
):
    assert {'Open', 'Close', 'High', 'Low', 'Volume'} <= set(data.columns), \
        "The OHCLV information ('Open', 'Close', 'High', 'Low', 'Volume') should be in the data!"
    assert N1 < N2, "The first MA parameter should be smaller than the second one!"
    length = data.shape[0]
    
    close = data['Close']
    ma1 = close.rolling(N1).mean()
    ma2 = close.rolling(N2).mean()
    ma_diff = ma1 - ma2
    strategy = np.zeros(length)
    
    for i in range(N2, length):
        if ma_diff[i-1] < 0 and ma_diff[i] >= 0:
            strategy[i] = 1
        if ma_diff[i-1] >= 0 and ma_diff[i] < 0:
            strategy[i] = -1
    
    return strategy