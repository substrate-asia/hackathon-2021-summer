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
from eternity_backend_server.extensions import db, csrf_protect
from eternity_backend_server.blueprints.ipfs.ipfs import check_code
from eternity_backend_server.blueprints.dispatch.dispatch import upload_ipfshash, dispatch_model_list, dispatch_search_node
from substrateinterface import SubstrateInterface, Keypair
from substrateinterface.exceptions import SubstrateRequestException

import requests

dispatch_bp = Blueprint("dispatch", __name__)

class ValidationError(Exception):
    pass

@csrf_protect.exempt
@dispatch_bp.route("/substrate/upload/ipfshash", methods=["GET"])
def upload_ipfshash_view():
    """向链上对应的account上传ipfshash值。（链上存储）

        @@@
        ### description
        > finished
        ### args
        None


        ### args
        |  args | nullable | request type | type |
        |-------|----------|--------------|------|
        |  account |  false   |    body      | str  |
        |  ipfshash |  false   |    body      | str  |

        ### request
        ```json
        {
            "Account": "Alice",
            "Ipfahash": "your ipfshash"
        }
        ```

        ### return
        status code: **200**
        ```json
        {
            "result": "Extrinsic xxxxxxxx sent and included in block xxxxxxx",
            "extrinsic_hash": "xxxxxxxx",
            "block_hash": "xxxxxxxxx",
            "block_number": 1,
            "code": "201"
        }
        ```
        @@@
    """
    post_data = request.get_json()
    account = post_data.get("Account")
    ipfshash = post_data.get("Ipfshash")
    data = upload_ipfshash(account, ipfshash)
    extrinsic_hash = data.get("extrinsic_hash")
    block_hash = data.get("block_hash")
    block_number = data.get("block_number")

    return jsonify({
            "result": "Extrinsic '{}' sent and included in block '{}'".format(extrinsic_hash, block_hash),
            "extrinsic_hash": extrinsic_hash,
            "block_hash": block_hash,
            "block_number": block_number,
            "code": "201"
        }), 201

@csrf_protect.exempt
@dispatch_bp.route("/substrate/<string:account>/get/<string:blockhash_or_blockid>", methods=["GET"])
def get_ipfshash_by_blockhash_view(account, blockhash_or_blockid):
    """根据account名和block id 或者 hash值，获取对应的ipfshash值

        @@@
        ### description
        > finished
        ### args
        None

        ### return
        status code: **200**
        ```json
        {
            "result": "Extrinsic xxxxxxxx sent and included in block xxxxxxx",
            "extrinsic_hash": "xxxxxxxx",
            "block_hash": "xxxxxxxxx",
            "block_number": 1,
            "code": "201"
        }
        ```
        @@@
    """

    block_result = dispatch_search_node(account, blockhash_or_blockid)
    return jsonify(block_result)



@csrf_protect.exempt
@dispatch_bp.route("/substrate/modellist", methods=["GET"])
def model_list_view():
    """列举调度节点所有的存储信息

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
            "accountid": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
            "blocknumber": 100,
            "ipfshash": "youripfshash_data"
          },
          {
            "accountid": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
            "blocknumber": 14862,
            "ipfshash": "youripfshash_data"
          },
          {
            "accountid": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
            "blocknumber": 14874,
            "ipfshash": "youripfshash_data"
          }
        ]
        ```
        @@@
    """
    result = dispatch_model_list()
    return jsonify(result)


@csrf_protect.exempt
@dispatch_bp.route("/substrate/listnodeinfo", methods=["GET"])
def list_node_info_view():
    """列出调度节点所有节点的信息

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
@dispatch_bp.route("/node/islive", methods=["GET"])
def isLive():
    data = request.get_json()
    url = data.get("url")
    r = requests.get(url)
    if r.status_code == 200:
        return jsonify({
            "result": "is_alive"
        }), 201
    else:
        return jsonify({
            "result": "not_alive"
        }), 400