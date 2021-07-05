# @ credit to
#       github: wyf-ACCEPT 
#       email : define_wifi@163.com

# BIAS 乖离率

import numpy as np
import pandas as pd

def BIAS(
    data: pd.DataFrame,
    N: int = 5,
):
    assert {'Open', 'Close', 'High', 'Low', 'Volume'} <= set(data.columns), \
        "The OHCLV information ('Open', 'Close', 'High', 'Low', 'Volume') should be in the data!"
        
    MA = data['Close'].rolling(N).mean().fillna(method='bfill')
    Y = (data['Close'] - MA) / MA * 100
    
    return Y