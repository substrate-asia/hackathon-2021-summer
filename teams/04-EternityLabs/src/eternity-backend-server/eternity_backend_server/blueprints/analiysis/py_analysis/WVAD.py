# @ credit to
#       github: wyf-ACCEPT 
#       email : define_wifi@163.com

# WVAD 威廉变异离散量

import numpy as np
import pandas as pd

def WVAD(
    data: pd.DataFrame,
    N: int = 5,
):
    assert {'Open', 'Close', 'High', 'Low', 'Volume'} <= set(data.columns), \
        "The OHCLV information ('Open', 'Close', 'High', 'Low', 'Volume') should be in the data!"
        
    A = data['Close'] - data['Open']
    B = data['High'] - data['Low']
    V = data['Volume']
    wvad = (A / B * V).rolling(N).mean().fillna(value=0)
    
    return wvad