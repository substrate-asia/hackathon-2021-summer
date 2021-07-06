# @ credit to
#       github: wyf-ACCEPT 
#       email : define_wifi@163.com

# BOLL 布林线

import numpy as np
import pandas as pd

def BOLL(
    data: pd.DataFrame,
    N: int = 5,
):
    assert {'Open', 'Close', 'High', 'Low', 'Volume'} <= set(data.columns), \
        "The OHCLV information ('Open', 'Close', 'High', 'Low', 'Volume') should be in the data!"
        
    MA = data['Close'].rolling(N).mean().fillna(method='bfill')
    MD = data['Close'].rolling(N).std().fillna(method='bfill')
    
    MB, UP, DN = MA, MA + 2*MD, MA - 2*MD
    return MB, UP, DN