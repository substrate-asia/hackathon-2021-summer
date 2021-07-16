import sys

sys.path.append("..")
from data_model.top_balances import *
from data_model.base import session
from flask_restful import Resource
from flask import jsonify


class TopBalances(Resource):
    def get(self, token):
        top_balances = session.query(TopBalance).filter_by(token=token).all()
        return jsonify(list(map(lambda x: {'address': x.address,
                                           'balance': x.balance,
                                           'pct_ownership': x.pct_ownership,
                                           'change 7d': x.change_7d,
                                           'change 30d': x.change_30d,
                                           'received': x.received,
                                           'sent': x.sent,
                                           'first in': x.first_in}, top_balances)))