# @ credit to
#       github: wyf-ACCEPT 
#       email : define_wifi@163.com

# BR 意愿指标 (Almost the same as AR !!)

import numpy as np
import pandas as pd

def BR(
    data: pd.DataFrame,
    N: int = 26,
):
    assert {'Open', 'Close', 'High', 'Low', 'Volume'} <= set(data.columns), \
        "The OHCLV information ('Open', 'Close', 'High', 'Low', 'Volume') should be in the data!"
    length = data.shape[0]
    
    br = np.zeros(length); br[:N] = 100
    
    for i in range(N, length):
        numerator = data['High'][i-N+1 : i+1].sum() - data['Close'][i-N : i].sum()
        denominator = data['Close'][i-N : i].sum() - data['Low'][i-N+1 : i+1].sum()
        br[i] = numerator / denominator * 100
        
    return br