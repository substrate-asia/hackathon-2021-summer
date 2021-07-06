import requests
from eternity_backend_server.blueprints.datamin.detail_function.bishijie_parse import bishijie_info_parse
from flask import Flask
from time import sleep
from concurrent.futures import ThreadPoolExecutor

from eternity_backend_server.blueprints.datamin.models import DATAMINFLAG, DATAMIN
import time
from eternity_backend_server.extensions import db

from eternity_backend_server.blueprints.datamin import datamin_api
from eternity_backend_server.blueprints.datamin import etherscanclient

# https://api-cn.etherscan.com/api?module=stats&action=tokensupply&contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055&apikey=YourApiKeyToken

#ContractAddress

import requests
import logging
from eternity_backend_server import settings
import re
from bs4 import BeautifulSoup
from lxml import etree
import time

from eternity_backend_server.blueprints.datamin.detail_function import token_parse

def bishijieclient():
    """
    B世界咨询
    """
    headers = settings.HEADERS_BISHIJIE
    url = 'https://www.bishijie.com/kuaixun'
    response = requests.get(url=url, headers=headers)
    result_info = bishijie_info_parse(response.text)
    return result_info

def _update_data_loop(app):
    with app.app_context():
        while 1:
            time.sleep(10)
            dataminflag = DATAMINFLAG.query.filter(DATAMINFLAG.id==1).first()

            if dataminflag.flag == 1:
                dataminflag = DATAMINFLAG.query.filter(DATAMINFLAG.id == 1).first()
                dataminflag.flag = 0
                db.session.commit()

            result = bishijieclient()
            datamin = DATAMIN.query.filter(DATAMIN.id==1).first()
            datamin.type = result.get("info")
            datamin.datalist = result.get("info_list")
            db.session.commit()


def time_():
    a = 0
    while 1:
        print(a)
        time.sleep(1)
        a+=1

if __name__ == '__main__':
    a = bishijieclient()
    print(a)