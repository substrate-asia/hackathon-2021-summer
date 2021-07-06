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
from eternity_backend_server.blueprints.dex.mxc import mxc
from eternity_backend_server.settings import MXC_API_KEY, MXC_ROOT_URL, MXC_SECRET_KEY


dexmxc_bp = Blueprint("mxc", __name__)

class ValidationError(Exception):
    pass


@csrf_protect.exempt
@dexmxc_bp.route("/posttoken7day", methods=["POST"])
def post_token_7day():


    data = request.get_json()

    symbol = data["symbol"]
    trade_type = data["trade_type"]
    order_type = data["order_type"]


    # result = mxc.post_token_7day(symbol, trade_type, order_type)

    return jsonify({"result": "successful"}), 201