import sys

sys.path.append("..")
from data_model.wallet_profiller import *
from data_model.base import session
from flask_restful import Resource
from flask import jsonify


class InEth(Resource):
    def get(self, address):
        parties = session.query(Counterparty).filter_by(address=address, flow_type=EthFlowTypeEnum.incoming).all()
        total_volume = sum(list(map(lambda x: x.volume, parties)))
        return jsonify(list(map(lambda x: {'exchange': x.exchange, 'pct': x.volume / total_volume}, parties)))


class OutEth(Resource):
    def get(self, address):
        parties = session.query(Counterparty).filter_by(address=address, flow_type=EthFlowTypeEnum.outgoing).all()
        total_volume = sum(list(map(lambda x: x.volume, parties)))
        return jsonify(list(map(lambda x: {'exchange': x.exchange, 'pct': x.volume / total_volume}, parties)))
