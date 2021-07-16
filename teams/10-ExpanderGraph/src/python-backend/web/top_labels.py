import sys
sys.path.append("..")
from data_model.top_labels import *
from data_model.base import session
from flask_restful import Resource
from flask import jsonify


class TopLabels(Resource):
    def get(self, num_of_rows=0, offset=0):
        top_labels = session.query(TopLabel)
        return jsonify(list(map(lambda x: {
            "label": x.label,
            "transactions": x.transactions,
            "num_addresses": x.num_addresses,
            "eth_vol": x.eth_vol,
            "vol_out_eth": x.vol_out_eth,
            "vol_in_eth": x.vol_in_eth,
            "num_token_txs": x.num_token_txs,
            "txs_in_tokens": x.txs_in_tokens,
            "txs_out_tokens": x.txs_out_tokens
        }, top_labels)))
