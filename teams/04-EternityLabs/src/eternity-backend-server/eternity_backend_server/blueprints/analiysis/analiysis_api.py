# -*- coding: utf-8 -*-
from flask import (
    Blueprint,
    current_app,
    flash,
    redirect,
    render_template,
    request,
    url_for,
    abort,
    jsonify,
    g
)
from eternity_backend_server.extensions import csrf_protect

analiysis_bp = Blueprint("analiysis", __name__)

@csrf_protect.exempt
@analiysis_bp.route("/substrate/listnodeinfo", methods=["GET"])
def list_node_info():
    """列出分析节点所有节点的信息

        @@@
        ### description
        > finished
        ### args
        None

        ### return
        status code: **200**
        ```json
        [
            {
                "name":"Axxx",
                "IP": "127.0.0.1:9000",
                "Status": "online",
                "AccountId": "0x123156184",
            },
            {
                "name":"Bxxx",
                "IP": "127.0.0.1:9000",
                "Status": "offline",
                "AccountId": "0x123156184",
            },
            {
                "name":"Cxxx",
                "IP":"127.0.0.1:9000",
                "Status": "online",
                "AccountId":"0x123156184",

            }
        ]
        ```
        @@@
    """
    data = [
        {
            "name":"Axxx",
            "IP": "127.0.0.1:9000",
            "Status": "online",
            "AccountId": "0x123156184",
        },
        {
            "name":"Bxxx",
            "IP": "127.0.0.1:9000",
            "Status": "offline",
            "AccountId": "0x123156184",
        },
        {
            "name":"Cxxx",
            "IP":"127.0.0.1:9000",
            "Status": "online",
            "AccountId":"0x123156184",

        },
        {
            "name":"Axxx",
            "IP": "127.0.0.1:9000",
            "Status": "online",
            "AccountId": "0x123156184",
        },
        {
            "name":"Axxx",
            "IP": "127.0.0.1:9000",
            "Status": "online",
            "AccountId": "0x123156184",
        },
    ]
    return jsonify(data)



@csrf_protect.exempt
@analiysis_bp.route("/feargreedindex", methods=["GET"])
def fear_greed_index():
    """返回恐惧贪婪指数，用于首页的仪表盘。

        @@@
        ### description
        > finished
        ### args
        None

        ### return
        status code: **200**
        ```json
        {
            "index": 0.78
        }
        ```
        @@@
    """
    data = {
        "index": 0.78
    }
    return jsonify(data)

@csrf_protect.exempt
@analiysis_bp.route("/officalpoolportfolio", methods=["GET"])
def offical_pool_portfolio():
    """返回ENL交易的资产配比。

        @@@
        ### description
        > finished
        ### args
        None

        ### return
        status code: **200**
        ```json
         [
            {
                "name": "BTC",
                "Volume": 1300,
                "Rate": 0.1,
                "Price": 188
            },{
                "name": "ETH",
                "Volume": 1300,
                "Rate": 0.1,
                "Price": 188
            }
        ]
        ```
        @@@
    """
    data = [
        {
            "name": "BTC",
            "Volume": 1300,
            "Rate": 0.1,
            "Price": 188
        },{
            "name": "ETH",
            "Volume": 1300,
            "Rate": 0.1,
            "Price": 188
        },{
            "name": "DOT",
            "Volume": 1300,
            "Rate": 0.1,
            "Price": 188
        },{
            "name": "ENL",
            "Volume": 1300,
            "Rate": 0.1,
            "Price": 188
        },
    ]
    return jsonify(data)



@csrf_protect.exempt
@analiysis_bp.route("/spotpricedifference", methods=['GET'])
def spot_price_difference():
    """返回 DOT 火币,币安,okex,抹茶,uniswap,heco交易所现货价格的最大价差

        @@@
        ### description
        > finished
        ### args
        None

        ### return
        status code: **200**
        ```json
        [
            {
                "dex": "huobi",
                "price": 100,
                "gasfee": 1,
            },
            {
                "dex": "binance",
                "price": 100,
                "gasfee": 1,
            },
            {
                "dex": "okex",
                "price": 100,
                "gasfee": 1,
            },
        ]
        ```
        @@@
    """
    data = [
        {
            "dex": "huobi",
            "price": 100,
            "gasfee": 1,
        },
        {
            "dex": "binance",
            "price": 100,
            "gasfee": 1,
        },
        {
            "dex": "okex",
            "price": 100,
            "gasfee": 1,
        },
        {
            "dex": "mxc",
            "price": 100,
            "gasfee": 1,
        },
        {
            "dex": "uniswap",
            "price": 100,
            "gasfee": 1,
        },
        {
            "dex": "heco",
            "price": 100,
            "gasfee": 1,
        },
    ]
    return jsonify(data)


@csrf_protect.exempt
@analiysis_bp.route("/contractpricedifference", methods=["GET"])
def contract_price_difference():
    """返回 DOT 火币,币安,okex,抹茶,合约价格的最大价差

        @@@
        ### description
        > finished
        ### args
        None

        ### return
        status code: **200**
        ```json
        [
            {
                "dex": "huobi",
                "price": 100,
                "gasfee": 1,
            },
            {
                "dex": "binance",
                "price": 100,
                "gasfee": 1,
            },
            {
                "dex": "okex",
                "price": 100,
                "gasfee": 1,
            },
        ]
        ```
        @@@
    """
    data = [
        {
            "dex": "huobi",
            "price": 100,
            "gasfee": 1,
        },
        {
            "dex": "binance",
            "price": 100,
            "gasfee": 1,
        },
        {
            "dex": "okex",
            "price": 100,
            "gasfee": 1,
        },
        {
            "dex": "mxc",
            "price": 100,
            "gasfee": 1,
        },
        {
            "dex": "uniswap",
            "price": 100,
            "gasfee": 1,
        },
        {
            "dex": "heco",
            "price": 100,
            "gasfee": 1,
        },
    ]
    return jsonify(data)