# @ credit to
#       github: wyf-ACCEPT 
#       email : define_wifi@163.com

# EMA 指数移动均线

import numpy as np
import pandas as pd

def EMA(
    data: pd.DataFrame,
    N: int = 20,
):
    assert {'Open', 'Close', 'High', 'Low', 'Volume'} <= set(data.columns), \
        "The OHCLV information ('Open', 'Close', 'High', 'Low', 'Volume') should be in the data!"
        
    ema = data['Close'].ewm(span = N).mean()
    return ema
    