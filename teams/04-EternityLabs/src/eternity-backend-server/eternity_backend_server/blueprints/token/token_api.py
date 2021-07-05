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

token_bp = Blueprint("token", __name__)

class ValidationError(Exception):
    pass

@csrf_protect.exempt
@token_bp.route("/substrate/erc20distribute", methods=["GET"])
def erc20distribute():
    """返回erc20链上代币的分布情况

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
                "address":"0xx12341",
                "Num":"2313",
            },
            {
                "address":"0x124591",
                "Num":"2313",
            },
            {
                "address":"0x859901",
                "Num":"2313",
            },
        ]
        ```
        @@@
    """
    data = [
        {
            "address":"0xx12341",
            "Num":"2313",
        },
        {
            "address":"0x124591",
            "Num":"2313",
        },
        {
            "address":"0x859901",
            "Num":"2313",
        },
        {
            "address":"0x0884904",
            "Num":"2313",
        }
    ]
    return jsonify(data)

@csrf_protect.exempt
@token_bp.route("/substrate/kmanserc20", methods=["GET"])
def kmanserc20():
    """返回erc20链上代币持币聚类信息。

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
                "Erc20Class": "A",
                "Totalnum": 2000
            },
            {
                "Erc20Class": "B",
                "Totalnum": 2001231
            },
            {
                "Erc20Class": "C",
                "Totalnum": 2015
            },
            {
                "Erc20Class": "D",
                "Totalnum": 12000
            },
        ]
        ```
        @@@
    """
    data = [
        {
            "Erc20Class": "A",
            "Totalnum": 2000
        },
        {
            "Erc20Class": "B",
            "Totalnum": 2001231
        },
        {
            "Erc20Class": "C",
            "Totalnum": 2015
        },
        {
            "Erc20Class": "D",
            "Totalnum": 12000
        },
        {
            "Erc20Class": "E",
            "Totalnum": 978000
        }
    ]
    return jsonify(data)


