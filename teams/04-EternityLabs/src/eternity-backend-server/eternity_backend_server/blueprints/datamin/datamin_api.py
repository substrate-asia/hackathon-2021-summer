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
    current_app,
    g
)
import requests

from eternity_backend_server.extensions import csrf_protect
from eternity_backend_server.blueprints.datamin.datamin import bishijieclient
from eternity_backend_server.extensions import db
from eternity_backend_server.blueprints.datamin.models import DATAMINFLAG, DATAMIN
from eternity_backend_server.blueprints.datamin.etherscanclient import etherscanclient
from eternity_backend_server.extensions import db
from eternity_backend_server.settings import ETHERSCAN_APIKEY, ETHERSCAN_TOKEN

datamin_bp = Blueprint("datamin", __name__)

@csrf_protect.exempt
@datamin_bp.route("/news/get", methods=["GET"])
def get_view():
    """获取新闻时讯的数据内容

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
            "content": "A新闻的内容",
            "look_count_flase": "看空12",
            "look_count_true": "看多23",
            "title": "A新闻的标题"
          },
          {
            "content": "B新闻的内容",
            "look_count_flase": "看空25",
            "look_count_true": "看多12",
            "title": "B新闻的标题"
          },
          {
            "content": "C新闻的内容",
            "look_count_flase": "看空33",
            "look_count_true": "看多12",
            "title": "C新闻的标题"
          },
        ]
       ```
       @@@
       """
    datamin = DATAMIN.query.filter().first()
    return jsonify(datamin.datalist)



@csrf_protect.exempt
@datamin_bp.route("/news/send_heartbeat", methods=["GET"])
def send_heartbeat():
    """更新新闻时讯数据库信息

       @@@
       ### description
       > finished
       ### args
       None

       ### return
       status code: **200**
       已经更新过了
       ```json
        {
            "result": "is update",
            "message": [
              {
                "content": "A新闻的内容",
                "look_count_flase": "看空12",
                "look_count_true": "看多23",
                "title": "A新闻的标题"
              },
              {
                "content": "B新闻的内容",
                "look_count_flase": "看空25",
                "look_count_true": "看多12",
                "title": "B新闻的标题"
              },
              {
                "content": "C新闻的内容",
                "look_count_flase": "看空33",
                "look_count_true": "看多12",
                "title": "C新闻的标题"
              },
            ],
            "flag": 1
        }

       status code: **200**
       现在更新成功。
       ```json
        {
            "result": "is update",
            "message": [
              {
                "content": "A新闻的内容",
                "look_count_flase": "看空12",
                "look_count_true": "看多23",
                "title": "A新闻的标题"
              },
              {
                "content": "B新闻的内容",
                "look_count_flase": "看空25",
                "look_count_true": "看多12",
                "title": "B新闻的标题"
              },
              {
                "content": "C新闻的内容",
                "look_count_flase": "看空33",
                "look_count_true": "看多12",
                "title": "C新闻的标题"
              },
            ],
            "flag": 1
        }


       ```
       @@@
       """
    dataminflag = DATAMINFLAG.query.filter(DATAMINFLAG.id==1).first()
    if dataminflag.flag == 1:
        datamin = DATAMIN.query.filter(DATAMIN.id==1).first()
        return jsonify({
            "result": "is update",
            "message": datamin.datalist,
            "flag": dataminflag.flag
        })
    dataminflag.flag = 1
    result = bishijieclient()
    datamin = DATAMIN.query.filter(DATAMIN.id==1).first()
    datamin.type = result.get("info")
    datamin.datalist = result.get("info_list")
    db.session.commit()
    return jsonify({
        "result": "success update",
        "message": datamin.datalist,
        "flag": dataminflag.flag
    })

@csrf_protect.exempt
@datamin_bp.route("/eth/contractaddress", methods=["GET"])
def contract_address():
    """获取合约状态

       @@@
       ### description
       > finished
       ### args
       None

       ### return
       status code: **200**
       ```json
       {
          "message": "OK",
          "result": "0",
          "status": "1"
        }
       ```
       @@@
    """
    ethclient = etherscanclient(ETHERSCAN_TOKEN, ETHERSCAN_APIKEY)
    result = ethclient.contractaddress()
    return jsonify(result)


@csrf_protect.exempt
@datamin_bp.route("/eth/tokencontractaddress", methods=["GET"])
def token_contract_address():
    """获取tokenbalance状态

       @@@
       ### description
       > finished
       ### args
       None

       ### return
       status code: **200**
       ```json
       {
          "message": "OK",
          "result": "0",
          "status": "1"
        }
       ```
       @@@
    """
    ethclient = etherscanclient(ETHERSCAN_TOKEN, ETHERSCAN_APIKEY)
    result = ethclient.tokencontractaddress()
    return jsonify(result)


@csrf_protect.exempt
@datamin_bp.route("/eth/token_info", methods=["GET"])
def token_info():
    """获取token合约的信息

       @@@
       ### description
       > finished
       ### args
       None

       ### return
       status code: **200**
       ```json
        {
          "info_list": [
            {
              "name": "Price",
              "value": "$0.0772 @ 0.000036 Eth (-1.41%)"
            },
            {
              "name": "Fully_Diluted_Market_Cap",
              "value": "$77,244,000.00"
            },
            {
              "name": "Max_Total_Supply",
              "value": "1,000,000,000"
            },
            {
              "name": "Holders",
              "value": "5,098 ( -0.059%)"
            },
            {
              "name": "Volume_24H",
              "value": "$1,794,841.00"
            },
            {
              "name": "Market_Capitalization",
              "value": "$5,299,380.00"
            },
            {
              "name": "Circulating_Supply",
              "value": "68,605,322.00 ARES"
            }
          ],
          "info_name": "basic information",
          "status": true
        }
       ```
       @@@
    """
    ethclient = etherscanclient(ETHERSCAN_TOKEN, ETHERSCAN_APIKEY)
    result = ethclient.token_info()
    return jsonify(result)


@csrf_protect.exempt
@datamin_bp.route("/eth/token_transfers", methods=["GET"])
def token_transfers():
    """获取tokenbalance状态

       @@@
       ### description
       > error api, todo
       ### args
       None

       ### return
       status code: **200**
       ```json
        {}
       ```
       @@@
    """
    ethclient = etherscanclient(ETHERSCAN_TOKEN, ETHERSCAN_APIKEY)
    result = ethclient.token_transfers()
    return jsonify(result)

