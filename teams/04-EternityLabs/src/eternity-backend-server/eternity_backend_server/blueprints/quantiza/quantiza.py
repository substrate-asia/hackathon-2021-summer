# -*- coding: utf-8 -*-
from flask import (
    Blueprint,
    current_app,
    flash,
    Flask,
    redirect,
    render_template,
    request,
    url_for,
    abort,
    jsonify,
    g
)



from eternity_backend_server.extensions import db, csrf_protect
import ipfshttpclient

from substrateinterface import SubstrateInterface, Keypair
from substrateinterface.exceptions import SubstrateRequestException

import os
import json
from scalecodec.type_registry import load_type_registry_file
from pprint import pprint
import requests
from eternity_backend_server.config import TYPE_REGISTRY_JSON

def model_list():
    custom_type_registry = load_type_registry_file(TYPE_REGISTRY_JSON)
    substrate = SubstrateInterface(
        url="wss://service.eternitylab.cn",
        ss58_format=42,
        type_registry_preset='substrate-node-template',
        type_registry=custom_type_registry
    )
    result = substrate.query_map('DispSigMoudle', 'DispatchSig')
    return_res = []
    for blocknumber, dispatchsig in result:
        res = {}
        res["blocknumber"] = int(str(blocknumber))
        res["ipfshash"] = str(dispatchsig.value[0])
        res["accountid"] = str(dispatchsig.value[1])
        return_res.append(res)

    return return_res


def search_node(id_or_hash):
    custom_type_registry = load_type_registry_file(TYPE_REGISTRY_JSON)
    substrate = SubstrateInterface(
        url="wss://service.eternitylab.cn",
        ss58_format=42,
        type_registry_preset='substrate-node-template',
        type_registry=custom_type_registry
    )
    try:
        _id = int(id_or_hash)
        _hash = substrate.get_block_hash(_id)
    except:
        _id = substrate.get_block_number(id_or_hash)
        _hash = id_or_hash

    result = substrate.query(
        module='DispSigMoudle',
        storage_function='DispatchSig',
        params=[_id]
    )
    # pprint(result.value)
    return_res = {}

    return_res["blocknumber"] = _id
    return_res["blockhash"] = _hash
    return_res["ipfshash"] = str(result.value[0])
    return_res["accountid"] = str(result.value[1])

    return return_res

def add_node(port):
    '''
    :param port:
    :return:
    '''
    #矿工通过add_node来启动节点

    #

def list_node():
    custom_type_registry = load_type_registry_file(TYPE_REGISTRY_JSON)
    substrate = SubstrateInterface(
        url="wss://service.eternitylab.cn",
        ss58_format=42,
        type_registry_preset='substrate-node-template',
        type_registry=custom_type_registry
    )
    result = substrate.query_map('QuanStakeMoudle', 'Nodes')
    return_res = []
    for accountid, nodemsg in result:
        res = {}
        res["accountid"] = str(accountid)
        nodemsg_str = str(nodemsg).replace('\'', "\"")
        nodemsg_dict = json.loads(nodemsg_str)
        res["model"] = nodemsg_dict["model"]

        res["address"] = nodemsg_dict["address"]
        res["dexaddress"] = nodemsg_dict["dexaddress"]
        res["stake"] = nodemsg_dict["stake"]
        res["ipport"] = nodemsg_dict["ipport"]
        return_res.append(res)
    return return_res
