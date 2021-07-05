import sys

sys.path.append("..")
from data_model.notable_wallets import *
from data_model.base import session
from flask_restful import Resource
from flask import jsonify


class NotableWallets(Resource):
    def get(self, token):
        wallets = session.query(NotableWallet).filter_by(token=token).all()
        print(wallets)
        return jsonify(list(map(lambda x: {'address': x.name,
                                           'change': x.change,
                                           'balance': x.balance,
                                           'first in': x.first_in,
                                           'depositors': x.depositors,
                                           'recipients': x.recipients}, wallets)))
