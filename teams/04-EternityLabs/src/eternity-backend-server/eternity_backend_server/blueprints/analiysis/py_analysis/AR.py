# @ credit to
#       github: wyf-ACCEPT 
#       email : define_wifi@163.com

# AR 人气指标

import numpy as np
import pandas as pd

def AR(
    data: pd.DataFrame,
    N: int = 26,
):
    assert {'Open', 'Close', 'High', 'Low', 'Volume'} <= set(data.columns), \
        "The OHCLV information ('Open', 'Close', 'High', 'Low', 'Volume') should be in the data!"
    length = data.shape[0]
    
    ar = np.zeros(length); ar[:N-1] = 100
    
    for i in range(N-1, length):
        numerator = data['High'][i-N+1 : i+1].sum() - data['Open'][i-N+1 : i+1].sum()
        denominator = data['Open'][i-N+1 : i+1].sum() - data['Low'][i-N+1 : i+1].sum()
        ar[i] = numerator / denominator * 100
        
    return ar


def AR_strategy(
    data: pd.DataFrame,
    N: int = 26,
    buy_threshold = 70,
    sell_threshold = 150,
):
    assert buy_threshold < sell_threshold, \
        "Buy-Threshold should lower than 100, Sell-Threshold should higher than 100!"
    
    ar = AR(data, N)
    strategy = np.zeros(ar.shape)
    strategy[ar > sell_threshold] = -1
    strategy[ar < buy_threshold] = 1
    
    return strategy