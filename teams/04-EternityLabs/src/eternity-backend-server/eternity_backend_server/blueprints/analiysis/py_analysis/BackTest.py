# @ credit to
#       github: wyf-ACCEPT 
#       email : define_wifi@163.com

# Back Test 根据历史数据进行回测

import numpy as np
import pandas as pd

def BackTest(
    data: pd.DataFrame,
    strategy: np.array,
    show_log: bool = True,
):
    length = data.shape[0]
    assert {'Open', 'Close', 'High', 'Low', 'Volume'} <= set(data.columns), \
        "The OHCLV information ('Open', 'Close', 'High', 'Low', 'Volume') should be in the data!"
    assert len(strategy) == length, "The strategy length should be equal to the data length!"
    # assert 0 < quarter <= 1, "The 'quarter' variable should be in (0,1]!"
    
    prices = data['Close']
    wealths, ex_times = [], 0
    money,stack = 100,0
    # money, stack = initial_money, initial_stack
    
    for this_moment in range(length):
        step = strategy[this_moment]
        price = prices[this_moment]
        wealth = money + stack * price
        # this_exchange = wealth * quarter
        
        if step == 1:
            stack += money / price
            money = 0
            if show_log:
                print('Buy in: %.3f.' % (stack * price))
            ex_times += 1
        
        if step == -1:
            money += stack * price
            stack = 0
            if show_log:
                print('Sell out: %.3f.' % money)
            ex_times += 1
        
        wealths.append(wealth)
    
    wealths = np.array(wealths)
    print("币种涨幅: %.3f %%" % (prices[-1] * 100 / prices[0] - 100))
    print("量化收益: %.3f %%" % (wealths[-1] * 100 / wealths[0] - 100))
    print("交易次数: %d " % ex_times)
    
    return wealths / wealths[0]
