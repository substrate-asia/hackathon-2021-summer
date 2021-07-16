# @ credit to
#       github: wyf-ACCEPT 
#       email : define_wifi@163.com

# MACD 平滑异同移动平均线

import numpy as np
import pandas as pd

def MACD(
    data: pd.DataFrame,
    N_EMA_1: int = 12,
    N_EMA_2: int = 26,
    N_EMA_DIF: int = 9,
):
    assert {'Open', 'Close', 'High', 'Low', 'Volume'} <= set(data.columns), \
        "The OHCLV information ('Open', 'Close', 'High', 'Low', 'Volume') should be in the data!"
    assert N_EMA_1 < N_EMA_2, "The first EMA parameter should be smaller the second one!"
    
    EMA_1 = data['Close'].ewm(span = N_EMA_1).mean()
    EMA_2 = data['Close'].ewm(span = N_EMA_2).mean()
    
    DIF = EMA_1 - EMA_2
    DEA = DIF.ewm(span = N_EMA_DIF).mean()
    
    BAR = (DIF - DEA) * 2
    return DIF,DEA,BAR


def MACD_strategy(
    data: pd.DataFrame,
    N_EMA_1: int = 12,
    N_EMA_2: int = 26,
    N_EMA_DIF: int = 9,
    buy_threshold = 0,
    sell_threshold = 0,
):
    dif,dea,bar = MACD(data, N_EMA_1, N_EMA_2, N_EMA_DIF)
    strategy = np.zeros(bar.shape[0])
    for i in range(1, bar.shape[0]):
        if bar[i] > 0 and bar[i-1] < 0:
            strategy[i] = 1
        elif bar[i] < 0 and bar[i-1] > 0:
            strategy[i] = -1
    
    return strategy