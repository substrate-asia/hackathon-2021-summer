import sys

sys.path.append("..")
from data_model.token_exchanges_overview import *
from data_model.base import session
from flask_restful import Resource
from flask import jsonify
from collections import defaultdict


class TokenExchangeSupplyRatioResource(Resource):
    def get(self, token):
        ratio = session.query(TokenExchangeSupplyRatio).filter_by(token=token).first()
        return jsonify({"ratio": ratio.ratio})


class TokenBalancesComp(Resource):
    def get(self, token):
        balances_comp = session.query(TokenBalancesComparison).filter_by(token=token).all()
        return jsonify(list(map(lambda x: {'date': x.date.strftime("%y%m%d"),
                                           'dex traders': x.pct_of_dex_traders,
                                           'exchanges': x.pct_of_exchanges}, balances_comp)))


class TokenVolumeOnExchanges(Resource):
    def get(self, token):
        token_volume_on_exchanges = session.query(TokensOnExchanges).filter_by(token=token).all()
        date_dict = defaultdict(list)
        for entry in token_volume_on_exchanges:
            the_date = entry.date
            date_dict[the_date].append(entry)
        return_list = [{"date": item[0].strftime("%y%m%d"),
                        "exchanges": [{"exchange": ex.exchange, "volumn_in_k": ex.volume / 1000} for ex in item[1]]} for
                       item in date_dict.items()]
        return jsonify(return_list)


class TopExchanges(Resource):
    def get(self, token):
        top_exchanges = session.query(TopExchange).filter_by(token=token).all()
        return jsonify(list(map(lambda x: {'exchange': x.exchange,
                                           'balance': x.balance,
                                           'change': x.change,
                                           'first in': x.first_in}, top_exchanges)))

