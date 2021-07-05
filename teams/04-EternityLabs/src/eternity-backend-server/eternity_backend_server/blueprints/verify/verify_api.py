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
from eternity_backend_server.blueprints.dispatch.dispatch import upload_ipfshash

verify_bp = Blueprint("verify", __name__)



@csrf_protect.exempt
@verify_bp.route("/substrate/listnodeinfo", methods=["GET"])
def list_node_info():
    """列出验证节点所有节点的信息

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