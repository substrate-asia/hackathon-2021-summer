import requests
import logging
from eternity_backend_server import settings
import re
from bs4 import BeautifulSoup
from lxml import etree
import time
from eternity_backend_server.blueprints.datamin.detail_function import token_parse
import json


class etherscanclient(object):
    """
    数据采集入口类
    """

    def __init__(self, token, apikey):
        self.token = token
        self.apikey = apikey

    def contractaddress(self):
        '''
        https://api-cn.etherscan.com/api?module=stats&action=tokensupply&contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055&apikey=YourApiKeyToken
        '''
        return json.loads(datamin_contractaddress(self.token, self.apikey))

    def tokencontractaddress(self):
        '''
        https://api-cn.etherscan.com/api?module=account&action=tokenbalance&contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055&address=0xe04f27eb70e025b78871a2ad7eabe85e61212761&tag=latest&apikey=YourApiKeyToken
        '''
        return json.loads(datamin_tokencontractaddress(self.token, self.apikey))

    def token_info(self):
        '''
        https://cn.etherscan.com/token/0x358AA737e033F34df7c54306960a38d09AaBd523
        '''
        return json.loads(datamin_token_info(self.token))

    def token_transfers(self):
        '''
        https://cn.etherscan.com/token/generic-tokentxns2?contractAddress=0x358AA737e033F34df7c54306960a38d09AaBd523&mode=&sid=4632ba89ca08b23ff97da5d8c6f47cb2&m=normal&p=2
        '''
        return datamin_token_transfers(self.token)
        
    def datamin_polkadot_subscan(self):
        '''
        https://polkadot.subscan.io/api/scan/daily
        POST请求
        '''
        return datamin_polkadot()


def datamin_token_info(
    contractaddress:str = "0x358AA737e033F34df7c54306960a38d09AaBd523"
    )->str:
    """
    抓取token当中的部分内容
    """
    headers = settings.HEADERS_TOKEN
    url = 'https://cn.etherscan.com/token/{}'.format(contractaddress)
    response = requests.get(url=url, headers=headers)
    base_info = token_parse.overview_info_parse(response.text)
    return str(base_info)

def datamin_token_transfers(
    contractaddress:str = "0x358AA737e033F34df7c54306960a38d09AaBd523"
    ):
    """
    抓取token当中的Transfers内容 
    """
    headers = settings.HEADERS_TOKEN
    url = 'https://cn.etherscan.com/token/{}'.format(contractaddress)
    response = requests.get(url=url, headers=headers)
    try:
        sid = re.findall(r"sid = '(.*?)';",response.text)[0] # 获取sid码
        url = 'https://cn.etherscan.com/token/generic-tokentxns2?m=normal&contractAddress={}&a=&sid={}&p=1'.format(contractaddress,sid)
        response = requests.get(url=url, headers=headers)
        # ==========获取页数===========
        html_info = etree.HTML(response.text,parser=None)
        page_count = int(html_info.xpath('string(//*[@id="maindiv"]/div[2]/div/div/ul/li[3]/span/strong[2])'))
        # ==========获取页数结束========
        info_list = []
        for page_info in range(1,page_count+1):
            url = 'https://cn.etherscan.com/token/generic-tokentxns2?m=normal&contractAddress={}&a=&sid={}&p={}'.format(contractaddress,sid,page_info)
            response = requests.get(url=url, headers=headers)
            pe_page_list = token_parse.overview_info_transfers_parse(response.text)
            info_list.append({str(page_info):pe_page_list})
            time.sleep(0.4)
        dict_info = {'status':True,
                     'info_list':info_list}
        return dict_info
    except:
        overview_info = "sid parsing failed"
        return overview_info



def datamin_contractaddress(
    contractaddress:str = "0x358AA737e033F34df7c54306960a38d09AaBd523",
    apikey:str = ''
    ) ->str:
    """
    docstring
    """
    try:
        headers = settings.HEADERS_API
        params = (
            ('module', 'stats'),
            ('action', 'tokensupply'),
            ('contractaddress', contractaddress),
            ('apikey', apikey),
        )
        response = requests.get('https://api-cn.etherscan.com/api', headers=headers, params=params)
        return response.text
    except Exception as e:
        logging.warning('请求失败，失败类型为：%s'%e)
        return '请求失败，失败类型为：%s'%e
# TokenContractAddress
def datamin_tokencontractaddress(
    contractaddress:str = "0x358AA737e033F34df7c54306960a38d09AaBd523",
    apikey:str = ''
    ) ->str:
    """
    docstring
    """
    try:
        headers = settings.HEADERS_API
        params = (
        ('module', 'account'),
        ('action', 'tokenbalance'),
        ('contractaddress', contractaddress),
        ('address', '0xe04f27eb70e025b78871a2ad7eabe85e61212761'),
        ('tag', 'latest'),
        ('apikey', apikey)
        )
        response = requests.get('https://api-cn.etherscan.com/api', headers=headers, params=params)
        return response.text

    except Exception as e:
        logging.warning('请求失败，失败类型为：%s'%e)
        return '请求失败，失败类型为：%s'%e

def datamin_polkadot(
    start_time:str = '2020-07-18',
    end_time:str = '2021-07-12',
    ):
    '''
    可以更改参数用于抓取其他数据
    '''
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.864.59',
        'content-type': 'application/json;charset=UTF-8',
        'cookie': 'local_language=zh-CN',
    }
    data = {"start":start_time,
            "end":end_time,
            "format":"day",
            "category":"Unbond"}
    data = json.dumps(data)
    try:
        response = requests.post('https://polkadot.subscan.io/api/scan/daily', headers=headers, data=data)
        return json.loads(response.text).get('data',{}).get('list',[])
    except Exception as e:
        logging.warning('请求失败，失败类型为：%s'%e)
        return '请求失败，失败类型为：%s'%e

class requests_reloads(object):
    """
    更改请求的方式，让请求更加稳定
    """
    def __init__(self, datamin_info):
        """
        获取爬虫相关字典数据
        """
        self.datamin_info = datamin_info

    def ip_info(self,datamin_info):
        return datamin_info

    def headers_info(self, parameter_list):
        """
        docstring
        """
        return datamin_info
        
    def cookies_info(self, parameter_list):
        """
        docstring
        """
        return datamin_info
        
    def retry_info(self, parameter_list):
        """
        重试包含重试次数以及重试爬虫信息是否更改，IP是否替换
        """
        return datamin_info
    
    def request_method(self, parameter_list):
        """
        docstring
        """
        headers = parameter_list.get('method','')
        data = parameter_list.get('data','')
        if parameter_list.get('method','') == "POST":
            result_info = requests.post('https://polkadot.subscan.io/api/scan/daily', headers=headers, data=data)
            return result_info.text
        else:
            result_info = requests.get('https://polkadot.subscan.io/api/scan/daily', headers=headers)
            return result_info.text