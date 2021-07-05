# @ credit to
#       github: wyf-ACCEPT 
#       email : define_wifi@163.com

# VR 成交量比率

import numpy as np
import pandas as pd

def VR(
    data: pd.DataFrame,
    N: int = 26,
):
    assert {'Open', 'Close', 'High', 'Low', 'Volume'} <= set(data.columns), \
        "The OHCLV information ('Open', 'Close', 'High', 'Low', 'Volume') should be in the data!"
    length = data.shape[0]
    
    vr = np.zeros(length); vr[:N-1] = 100
    
    for i in range(N-1, length):
        N_data = data[i-N+1 : i+1]
        up = N_data[N_data['Close'] >= N_data['Open']]['Volume'].sum()
        down = N_data[N_data['Close'] < N_data['Close']]['Volume'].sum()
        vr[i] = up / down
    
    return vr