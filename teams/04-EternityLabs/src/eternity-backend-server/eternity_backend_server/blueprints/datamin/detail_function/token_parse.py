from bs4 import BeautifulSoup
from lxml import etree
import json

# xpath需要定期更换，否则数据抓取不全

def  overview_info_parse(parse_str:str = ''):
    """
    传入一个待解析的字符串
    """
    html_info = etree.HTML(parse_str,parser=None)
    try:
        #=======================开始解析字段=======================
        Price = html_info.xpath('string(//*[@id="ContentPlaceHolder1_tr_valuepertoken"]/div/div[1]/span)').strip()
        Fully_Diluted_Market_Cap = html_info.xpath('string(//*[@id="pricebutton"])').strip()
        Max_Total_Supply = html_info.xpath('string(//*[@id="ContentPlaceHolder1_divSummary"]/div[1]/div[1]/div/div[2]/div[2]/div[2]/span)').strip()
        Holders = html_info.xpath('string(//*[@id="ContentPlaceHolder1_tr_tokenHolders"]/div/div[2]/div)').strip()
        Transfers = ''# 在另一个接口当中才有这个数据
        Volume_24H = html_info.xpath('string(//*[@id="tokenInfo"]/div/table/tbody/tr[1]/td[3])').strip()
        Market_Capitalization = html_info.xpath('string(//*[@id="tokenInfo"]/div/table/tbody/tr[2]/td[3])').strip()
        Circulating_Supply = html_info.xpath('string(//*[@id="tokenInfo"]/div/table/tbody/tr[3]/td[3])').strip()
        #=======================解析字段结束=======================
    except:
        return {'status':False,
                'wrong_reason':"Error parsing the file, please change the XPATH parsing path."}
    
    Dict_info = {
        "status":True,
        "info_name":"basic information",
        "info_list":[{
            "name": "Price",
            "value":Price
        },{
            "name":"Fully_Diluted_Market_Cap",
            "value":Fully_Diluted_Market_Cap
        },{
            "name":"Max_Total_Supply",
            "value":Max_Total_Supply
        },{
            "name":"Holders",
            "value":Holders
        },{
            "name":"Volume_24H",
            "value":Volume_24H
        },{
            "name":"Market_Capitalization",
            "value":Market_Capitalization
        },{
            "name":"Circulating_Supply",
            "value":Circulating_Supply
        }]
    }
    return json.dumps(Dict_info)
    
def  overview_info_transfers_parse(parse_str:str = ''):
    """
    传入一个待解析的字符串
    """
    soup = BeautifulSoup(parse_str,features="lxml")
    all_info_list = []
    key_list = ['Txn_Hash','Method','time1','time2','From','To','Quantitiy']
    for tr in soup.find_all("tr"):
        list_info = []
        for i in tr.find_all("td"):
            if i.text != '':
                if "..." not in i.text:
                    list_info.append(i.text)
                else:
                    list_info.append(i.span['title'])
        if len(list_info) == 7:
            all_info_list.append(dict(zip(key_list,list_info)))
    return all_info_list