# -*- coding: utf-8 -*-


from substrateinterface import SubstrateInterface, Keypair
from substrateinterface.exceptions import SubstrateRequestException

import os
import json
from scalecodec.type_registry import load_type_registry_file
from pprint import pprint
import requests
from eternity_backend_server.config import TYPE_REGISTRY_JSON
from eternity_backend_server.blueprints.ipfs.ipfs import check_code

def DispSigMoudle_DispatchSig():
    # 列出存储信息
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


def DispSigMoudle_DispatchSig(id_or_hash):
    # search node
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


def QuanStakeMoudle_Nodes():
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


def DispSigMoudle_transfer(account, ipfshash):
    # checkcode = check_code(ipfshash)
    # if checkcode == False:
    #     raise ValueError("Failed to send: {}".format("This [ipfshash] is illegal! Please enter the correct [ipfshash]."))
    #     # return jsonify({"result":"",
    #     #                 "code":"404"}), 404

    substrate = SubstrateInterface(
        url="wss://service.eternitylab.cn",
        ss58_format = 42,
        type_registry_preset='default'
    )
    account_name = "//"+account
    keypair = Keypair.create_from_uri(account_name)
    call = substrate.compose_call(
        call_module='DispSigMoudle',
        call_function='transfer',
        call_params={
            'ipfshash':ipfshash
        }
    )
    extrinsic = substrate.create_signed_extrinsic(call=call, keypair=keypair)
    try:
        receipt = substrate.submit_extrinsic(extrinsic, wait_for_finalization=True)
        # print("Extrinsic '{}' sent and included in block '{}'".format(receipt.extrinsic_hash, receipt.block_hash))
        block_number = substrate.get_block_number(receipt.block_hash)
        return {
            "extrinsic_hash": receipt.extrinsic_hash,
            "block_hash": receipt.block_hash,
            "block_number": block_number
        }

    except SubstrateRequestException as e:
        raise ValueError("Failed to send: {}".format(e))
        # return {
        #     "result": "Failed to send: {}".format(e),
        #     "code": "404"
        # }
