# @ credit to
#       github: wyf-ACCEPT 
#       email : define_wifi@163.com

# CCI 顺势指标

import numpy as np
import pandas as pd

def CCI(
    data: pd.DataFrame,
    N: int = 5,
):
    assert {'Open', 'Close', 'High', 'Low', 'Volume'} <= set(data.columns), \
        "The OHCLV information ('Open', 'Close', 'High', 'Low', 'Volume') should be in the data!"
        
    MA = data['Close'].rolling(N).mean().fillna(method='bfill')
    TP = (data['High'] + data['Low'] + data['Close']) / 3
    MD = (MA - data['Close']).rolling(N).mean().fillna(method='bfill')
    
    cci = (TP - MA) / MD / 0.015
    return cci