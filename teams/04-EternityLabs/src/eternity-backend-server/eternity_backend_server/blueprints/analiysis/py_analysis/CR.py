# @ credit to
#       github: wyf-ACCEPT 
#       email : define_wifi@163.com

# CR 价格动量指标

import numpy as np
import pandas as pd

def CR(
    data: pd.DataFrame,
    N: int = 26,
):
    assert {'Open', 'Close', 'High', 'Low', 'Volume'} <= set(data.columns), \
        "The OHCLV information ('Open', 'Close', 'High', 'Low', 'Volume') should be in the data!"
    length = data.shape[0]
        
    Median = ((data['High'] + data['Low']) / 2).values
    High, Low = data['High'].values, data['Low'].values
    up, down = np.zeros(length), np.zeros(length)
    
    for i in range(1, length):
        up[i] = max(High[i] - Median[i-1], 0)
        down[i] = max(Median[i-1] - Low[i], 0)
    
    long_side = pd.Series(up).rolling(N).mean().fillna(value=1)
    short_side = pd.Series(down).rolling(N).mean().fillna(value=1)
    
    cr = (long_side / short_side).fillna(value=1) * 100
    return cr