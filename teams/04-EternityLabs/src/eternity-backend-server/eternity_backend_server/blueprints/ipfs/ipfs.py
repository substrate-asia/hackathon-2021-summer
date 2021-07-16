# -*- coding: utf-8 -*-

import time
import random

import json

import ipfshttpclient
from eternity_backend_server.blueprints.ipfs.aes import PrpCrypt

def upload_data(data):
    ip = data.get("ip")
    address = data.get("address")
    detail = data.get("detail")
    detail_dic = json.loads(detail)
    timestamp = time.time()
    need_upload_msg = {
        "timestamp": timestamp,
        "ip": ip,
        "detail": detail_dic,
        "address": address,
        "checkcode": True
    }
    upload_msg_str = json.dumps(need_upload_msg)
    client = ipfshttpclient.connect()

    res = client.add_str(upload_msg_str)
    return res


def check_code(ipfshash):
    data = get_data_by_ipfsHash(ipfshash)
    if data is None:
        raise ValueError("IPFS data is Null, Please enter the correct ipfshash.")
    checkcode = data.get("checkcode")
    if checkcode==True:
        return checkcode
    else:
        return False


def get_data_by_ipfsHash(ipfshash):
    client = ipfshttpclient.connect()
    data_bytes = client.cat(ipfshash)
    data_str = str(data_bytes, encoding="utf-8")
    data_dict = json.loads(data_str)
    return data_dict



def upload_encode_aes_file(key1, key2, content):
    client = ipfshttpclient.connect()
    pc = PrpCrypt(key1, key2)
    redata = pc.encrypt(content)
    res = client.add_str(redata)
    # res 存储的是ipfs hash地址

    return res


def download_decode_aes_file(key1, key2, ipfshash):
    client = ipfshttpclient.connect()
    bytes_encrypt_content = client.cat(ipfshash)
    encrypt_content = str(bytes_encrypt_content, "utf-8")
    pc = PrpCrypt(key1, key2)
    content = pc.decrypt(encrypt_content)
    # 返回解密之后的存储内容
    return content


def download_decode_aes_py_file(key1, key2, ipfshash):
    client = ipfshttpclient.connect()
    bytes_encrypt_content = client.cat(ipfshash)
    encrypt_content = str(bytes_encrypt_content, "utf-8")
    filename, aes_content = encrypt_content.split("_")
    pc = PrpCrypt(key1, key2)
    content = pc.decrypt(aes_content)
    result = {filename:content}
    return result