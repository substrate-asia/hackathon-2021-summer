import sys

sys.path.append("..")
from data_model.top_transactions import *
from data_model.base import session
from flask_restful import Resource
from flask import jsonify


class TopTransactions(Resource):
    def get(self, token):
        transactions = session.query(TopTransaction).filter_by(token=token).all()
        return jsonify(list(map(lambda x: {'from': x.source,
                                           'to': x.destination,
                                           'volume': x.volume,
                                           'time ago': x.time_ago}, transactions)))