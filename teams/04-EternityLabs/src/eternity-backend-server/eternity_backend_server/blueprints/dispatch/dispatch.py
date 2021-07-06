# -*- coding: utf-8 -*-

from eternity_backend_server.config import SUBSTRATE_URL

from eternity_backend_server.blueprints.ipfs.ipfs import check_code

from substrateinterface import SubstrateInterface, Keypair
from substrateinterface.exceptions import SubstrateRequestException

import os
import json
import time
import requests

from scalecodec.type_registry import load_type_registry_file
from eternity_backend_server.config import TYPE_REGISTRY_JSON

def upload_ipfshash(account, ipfshash):
    checkcode = check_code(ipfshash)
    if checkcode == False:
        raise ValueError("Failed to send: {}".format("This [ipfshash] is illegal! Please enter the correct [ipfshash]."))
        # return jsonify({"result":"",
        #                 "code":"404"}), 404

    substrate = SubstrateInterface(
        url=SUBSTRATE_URL,
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

def dispatch_model_list():
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

def dispatch_search_node(account, id_or_hash):
    custom_type_registry = load_type_registry_file(TYPE_REGISTRY_JSON)
    substrate = SubstrateInterface(
        url="wss://service.eternitylab.cn",
        ss58_format=42,
        type_registry_preset='substrate-node-template',
        type_registry=custom_type_registry
    )


    account_name = "//"+account
    keypair = Keypair.create_from_uri(account_name)

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

    if keypair.ss58_address != str(result.value[1]):
        raise ValueError("Bad User!")

    return_res["accountid"] = str(result.value[1])
    return return_res

def cheack_contract():
    """
    devloper:@peter-jim
    Check if the contract is quantified
    :return:
    """
    while(1):
      #cheack
      if 1:
          ping_node()

      time.sleep(1000)

def send_address_to_contract(address):
    return ping_node()

def ping_node():
    '''
    devloper:@peter-jim
    ping quant node status,and update the dispatch table
    :return: address
    '''
    #step1 get table from substrate


    #step2 ping node
    for i in  range(1,len):
        response =requests.get('url')
        #step3 cheack legal node
        if response.text == 'online':
            pass

    #step return address to dispatch,after dispatch send address to contract
    #this is heco address,Be careful
    return '0xbacd15010678bd31197f6eb6b971ab7154674d48'
