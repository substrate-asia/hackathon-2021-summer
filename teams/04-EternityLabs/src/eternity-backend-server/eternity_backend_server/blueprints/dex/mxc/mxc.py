#!/usr/bin/python3
# -*- coding: utf-8 -*-

import time
import requests
import hmac
import hashlib
from urllib import parse

from eternity_backend_server.settings import MXC_API_KEY, MXC_ROOT_URL, MXC_SECRET_KEY


API_KEY = MXC_API_KEY
SECRET_KEY = MXC_SECRET_KEY
ROOT_URL = MXC_ROOT_URL


def _get_server_time():
    return int(time.time())

def _sign(method, path, original_params=None):
    params = {
        'api_key': API_KEY,
        'req_time': _get_server_time(),
    }
    if original_params is not None:
        params.update(original_params)
    params_str = '&'.join('{}={}'.format(k, params[k]) for k in sorted(params))
    to_sign = '\n'.join([method, path, params_str])
    params.update({'sign': hmac.new(SECRET_KEY.encode(), to_sign.encode(), hashlib.sha256).hexdigest()})
    return params

def get_symbols():
    """marget data"""
    method = 'GET'
    path = '/open/api/v2/market/symbols'
    url = '{}{}'.format(ROOT_URL, path)
    params = {'api_key': API_KEY}
    response = requests.request(method, url, params=params)
    #print(response.json())
    # for i in response:
    #     for j in i:
    #      print(i,j)

def get_rate_limit():
    """rate limit"""
    method = 'GET'
    path = '/open/api/v2/common/rate_limit'
    url = '{}{}'.format(ROOT_URL, path)
    params = {'api_key': API_KEY}
    response = requests.request(method, url, params=params)
    print(response.json())

def get_timestamp():
    """get current time"""
    method = 'GET'
    path = '/open/api/v2/common/timestamp'
    url = '{}{}'.format(ROOT_URL, path)
    params = {'api_key': API_KEY}
    response = requests.request(method, url, params=params)
    print(response.json())

def get_ticker(symbol):
    """get ticker information"""
    method = 'GET'
    path = '/open/api/v2/market/ticker'
    url = '{}{}'.format(ROOT_URL, path)
    params = {
        'api_key': API_KEY,
        'symbol': symbol,
    }
    response = requests.request(method, url, params=params).json()
    print(response)

def get_bid(symbol):
    """get ticker information"""
    method = 'GET'
    path = '/open/api/v2/market/ticker'
    url = '{}{}'.format(ROOT_URL, path)
    params = {
        'api_key': API_KEY,
        'symbol': symbol,
    }
    response = requests.request(method, url, params=params).json()
    data = response['data'][0]
    bid =  float(data['bid'])
    return bid
    print(bid)

def get_depth(symbol, depth):
    """获market depth"""
    method = 'GET'
    path = '/open/api/v2/market/depth'
    url = '{}{}'.format(ROOT_URL, path)
    params = {
        'api_key': API_KEY,
        'symbol': symbol,
        'depth': depth,
    }
    response = requests.request(method, url, params=params)
    print(response.json())

def get_deals(symbol, limit):
    """get deals records"""
    method = 'GET'
    path = '/open/api/v2/market/deals'
    url = '{}{}'.format(ROOT_URL, path)
    params = {
        'api_key': API_KEY,
        'symbol': symbol,
        'limit': limit,
    }
    response = requests.request(method, url, params=params)
    print(response.json())

def get_kline(symbol, interval):
    """k-line data"""
    method = 'GET'
    path = '/open/api/v2/market/kline'
    url = '{}{}'.format(ROOT_URL, path)
    params = {
        'api_key': API_KEY,
        'symbol': symbol,
        'interval': interval,
    }
    response = requests.request(method, url, params=params)
    print(response.json())

def get_account_info():
    """account information"""
    method = 'GET'
    path = '/open/api/v2/account/info'
    url = '{}{}'.format(ROOT_URL, path)
    params = _sign(method, path)
    response = requests.request(method, url, params=params).json()['data']
    print(response)
    for i in response:
        print(i,response[i])
    print('user USDT',response['USDT'])

def get_account_usdt():
    """account usdt """
    method = 'GET'
    path = '/open/api/v2/account/info'
    url = '{}{}'.format(ROOT_URL, path)
    params = _sign(method, path)
    response = requests.request(method, url, params=params).json()['data']
    USDT = response['USDT']
    return USDT

def post_token_7day(symbol,  trade_type, order_type):
    """buy token with 7 day"""

    #step 1 获取账户余额   {'frozen': '0', 'available': '100.00431506256'}
    usdt = get_account_usdt()

    #step 2 余额拆分
    one_usdt = (float(usdt['available'])/7) - 0.1
    # print(one_usdt)

    #setp 3
    for i in range(7):
        method = 'POST'
        path = '/open/api/v2/order/place'
        url = '{}{}'.format(ROOT_URL, path)
        params = _sign(method, path)

        price = get_bid(symbol)
        quantity = one_usdt/(price)
        data = {
            'symbol': symbol,
            'price': price,
            'quantity': quantity,
            'trade_type': trade_type,
            'order_type': order_type,
        }
        # send buy token requets
        try:

            response = requests.request(method, url, params=params, json=data)
            print(response.json())
            time.sleep(1000000)
        except:
            print("error")
        return True

def place_order(symbol, price, quantity, trade_type, order_type):
    """place order"""
    method = 'POST'
    path = '/open/api/v2/order/place'
    url = '{}{}'.format(ROOT_URL, path)
    params = _sign(method, path)
    data = {
        'symbol': symbol,
        'price': price,
        'quantity': quantity,
        'trade_type': trade_type,
        'order_type': order_type,
    }
    response = requests.request(method, url, params=params, json=data)
    print(response.json())

def batch_orders(orders):
    """batch order"""
    method = 'POST'
    path = '/open/api/v2/order/place_batch'
    url = '{}{}'.format(ROOT_URL, path)
    params = _sign(method, path)
    response = requests.request(method, url, params=params, json=orders)
    print(response.json())

def cancel_order(order_id):
    """cancel in batch"""
    origin_trade_no = order_id
    if isinstance(order_id, list):
        origin_trade_no = parse.quote(','.join(order_id))
    method = 'DELETE'
    path = '/open/api/v2/order/cancel'
    url = '{}{}'.format(ROOT_URL, path)
    params = _sign(method, path, original_params={'order_ids': origin_trade_no})
    if isinstance(order_id, list):
        params['order_ids'] = ','.join(order_id)
    response = requests.request(method, url, params=params)
    print(response.json())

def get_open_orders(symbol):
    """current orders"""
    method = 'GET'
    path = '/open/api/v2/order/open_orders'
    original_params = {
        'symbol': symbol,
    }
    url = '{}{}'.format(ROOT_URL, path)
    params = _sign(method, path, original_params=original_params)
    response = requests.request(method, url, params=params)
    print(response.json())

def get_all_orders(symbol, trade_type):
    """order list"""
    method = 'GET'
    path = '/open/api/v2/order/list'
    original_params = {
        'symbol': symbol,
        'trade_type': trade_type,
    }
    url = '{}{}'.format(ROOT_URL, path)
    params = _sign(method, path, original_params=original_params)
    response = requests.request(method, url, params=params)
    print(response.json())

def query_order(order_id):
    """query order"""
    origin_trade_no = order_id
    if isinstance(order_id, list):
        origin_trade_no = parse.quote(','.join(order_id))
    method = 'GET'
    path = '/open/api/v2/order/query'
    url = '{}{}'.format(ROOT_URL, path)
    original_params = {
        'order_ids': origin_trade_no,
    }
    params = _sign(method, path, original_params=original_params)
    if isinstance(order_id, list):
        params['order_ids'] = ','.join(order_id)
    response = requests.request(method, url, params=params)
    print(response.json())

def get_deal_orders(symbol):
    """account deal records"""
    method = 'GET'
    path = '/open/api/v2/order/deals'
    url = '{}{}'.format(ROOT_URL, path)
    original_params = {
        'symbol': symbol,
    }
    params = _sign(method, path, original_params=original_params)
    response = requests.request(method, url, params=params)
    print(response.json())

def get_deal_detail(order_id):
    """deal detail"""
    method = 'GET'
    path = '/open/api/v2/order/deal_detail'
    url = '{}{}'.format(ROOT_URL, path)
    original_params = {
        'order_id': order_id,
    }
    params = _sign(method, path, original_params=original_params)
    response = requests.request(method, url, params=params)
    print(response.json())
#
# if __name__ == '__main__':
#     # get_symbols()
#     # get_rate_limit()
#     # get_timestamp()
#     #  get_ticker('DOT_USDT')
#     # get_depth('BTC_USDT', 5)
#     # get_deals('BTC_USDT', 5)
#     # get_kline('BTC_USDT', '1m')
#     # get_account_info()
#     # place_order('DOT_USDT', 22, 0.1, 'BID', 'LIMIT_ORDER')
#      post_token_7day('DOT_USDT', 'BID', 'LIMIT_ORDER')
#     # place_order('BTC_USDT', 7900, 0.1, 'BID', 'LIMIT_ORDER')
#     # cancel_order('cfc5a95618f****6d751dd04b2')
#     # cancel_order(['cfc5a95618f****d751dd04b2', 'b956dfc923d***31b383c9d'])
#     # batch_orders([
#     #     {
#     #         'symbol': 'BTC_USDT',
#     #         'price': '7900',
#     #         'quantity': '1',
#     #         'trade_type': 'BID',
#     #         'order_type': 'LIMIT_ORDER',
#     #     },
#     #     {
#     #         'symbol': 'BTC_USDT',
#     #         'price': '7901',
#     #         'quantity': '1',
#     #         'trade_type': 'ASK',
#     #         'order_type': 'LIMIT_ORDER',
#     #     },
#     # ])
#     # get_open_orders('BTC_USDT')
#     # get_all_orders('BTC_USDT', 'BID')
#     # query_order('ccbd62471d***dd109903e')
#     # query_order(['ec72970d2****8264d7e86e', 'fd4d614ee4cf46***c7c82c0'])
#     # get_deal_orders('BTC_USDT')
#     # get_deal_detail('ccbd62471d*****ddd109903e')
#
#     # get_bid('DOT_USDT')
#     # USDT = get_account_usdt()
#     # print(USDT)
#
#
#
