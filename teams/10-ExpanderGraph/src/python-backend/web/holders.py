import sys

sys.path.append("..")
from data_model.holders import *
from data_model.base import session
from flask_restful import Resource
from flask import jsonify


class SeniorityDistributions(Resource):
    def get(self, token):
        distribution = session.query(TokenSeniorityDistribution).filter_by(token=token).first()
        return jsonify(
            {'< 7 days': {'tokens': distribution.pct_token_less_7d, 'addresses': distribution.pct_address_less_7d},
             '7-30 days': {'tokens': distribution.pct_token_7d_to_30d,
                           'addresses': distribution.pct_address_7d_to_30d}})


class NumUniqueAddresses(Resource):
    def get(self, token):
        unique_address_list = session.query(UniqueAddressesForToken).filter_by(token=token).all()
        return jsonify(list(map(lambda x: {'date': x.date.strftime("%y%m%d"),
                                           'addresses': x.num_unique_addresses
                                           }, unique_address_list)))
