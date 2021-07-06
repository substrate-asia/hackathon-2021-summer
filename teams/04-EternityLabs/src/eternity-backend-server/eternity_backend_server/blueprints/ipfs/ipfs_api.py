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

from eternity_backend_server.blueprints.ipfs.ipfs import upload_data, get_data_by_ipfsHash, check_code, download_decode_aes_py_file
import os
from threading import Thread

import threading
import time
import random

import json

from eternity_backend_server.extensions import db, csrf_protect
import ipfshttpclient

ipfs_bp = Blueprint("ipfs", __name__)

class ValidationError(Exception):
    pass

@csrf_protect.exempt
@ipfs_bp.route("/upload", methods=["POST"])
def upload_data_view():
    """上传内容到ipfs链上，（提供ip address detail信息）

        @@@
        ### description
        > Todo

        ### args
        |  args | nullable | request type | type |
        |-------|----------|--------------|------|
        |  ip |  false   |    body      | str  |
        |  address |  false   |    body      | str  |
        |  detail |  false   |    body      | json  |

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
            "ipfshash": "QmWfVY9y3xjsixTgbd9AorQxH7VtMpzfx2HaWtsoUYecaX"
        }
        ```
        @@@
    """
    data = request.get_json()
    res = upload_data(data)
    return jsonify({"ipfshash": res})


@csrf_protect.exempt
@ipfs_bp.route("/getdatabyipfshash/<string:ipfshash>", methods=["GET", "POST"])
def get_data_by_ipfsHash_view(ipfshash):
    data_dict = get_data_by_ipfsHash(ipfshash)
    return jsonify({"data":data_dict, "ipfshash":ipfshash}), 200



@csrf_protect.exempt
@ipfs_bp.route("/downloadpyfile", methods=["POST"])
def download_aes_py_file():

    """获取ipfs加密文件内容，（需要提供ipfs地址以及两个key解密钥匙）

        @@@
        ### description
        > finished

        ### args
        |  args | nullable | request type | type |
        |-------|----------|--------------|------|
        |  key1 |  false   |    body      | str  |
        |  key2 |  false   |    body      | str  |
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
            "xxx.py": "import time\nprint('hello')"
        }
        ```
        @@@
    """
    data = request.get_json()
    key1 = data["key1"]
    key2 = data["key2"]
    ipfshash = data["ipfshash"]
    result_file = download_decode_aes_py_file(key1, key2, ipfshash)
    return jsonify(result_file)



@csrf_protect.exempt
@ipfs_bp.route("/checkcode/<string:ipfshash>", methods=["GET", "POST"])
def check_code_view(ipfshash):
    """验证ipfs数据验证码

        @@@
        ### description
        > finished,
        ### args
        None

        ### return
        status code: **200**
        ```json
        {
            “legal”: true
        }
        ```
        @@@
    """
    return jsonify({"legal": check_code(ipfshash)}), 200