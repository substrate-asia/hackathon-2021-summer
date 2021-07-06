# @ credit to
#       github: wyf-ACCEPT 
#       email : define_wifi@163.com

# KDJ 随机指数

import numpy as np
import pandas as pd

def KDJ(
    data: pd.DataFrame,
    N: int = 9,
    kdN: int = 3,
    jN: int = 3,
):
    assert {'Open', 'Close', 'High', 'Low', 'Volume'} <= set(data.columns), \
        "The OHCLV information ('Open', 'Close', 'High', 'Low', 'Volume') should be in the data!"
    length = data.shape[0]
    
    rsv = np.zeros(length); rsv[:N-1] = 100
    K,D,J = np.zeros((3, length)); K[0],D[0],J[0] = 50,50,50
    
    # Calculate the rsv index (Raw Stochastic Value, 未成熟随机值)
    for i in range(N-1, length):
        Ct = data['Close'][i]
        Ln = data['Low'][i-N+1 : i+1].min()
        Hn = data['High'][i-N+1 : i+1].max()
        rsv[i] = (Ct - Ln) / (Hn - Ln) * 100
        
    # Calculate the KDJ
    for i in range(1, length):
        K[i] = (1 - 1/kdN) * K[i-1] + (1/kdN) * rsv[i]
        D[i] = (1 - 1/kdN) * D[i-1] + (1/kdN) * K[i]
        J[i] = jN * D[i] - (jN - 1) * K[i]
        
    return K,D,J