# from substrateinterface import SubstrateInterface, Keypair
# from substrateinterface.exceptions import SubstrateRequestException
# from eternity_backend_server.config import TYPE_REGISTRY_JSON
#
# import os
# import json
# from scalecodec.type_registry import load_type_registry_file
# from pprint import pprint
#
# custom_type_registry = load_type_registry_file(TYPE_REGISTRY_JSON)
# substrate = SubstrateInterface(
#     url="wss://service.eternitylab.cn",
#     ss58_format = 42,
#     type_registry_preset='substrate-node-template',
#     type_registry=custom_type_registry
# )
#
# block_hash = substrate.get_block_hash(14458)
# print(block_hash)
# # block_hash = "0xb768cd59e0586b55a68370b131679448a92ad8963ef7d80750258bd5ebb36153"
# result = substrate.get_block(block_hash=block_hash)
#
# pprint(result)
#
#
# for extrinsic in result['extrinsics']:
#
#     if extrinsic.address:
#         signed_by_address = extrinsic.address.value
#     else:
#         signed_by_address = None
#
#     print('\nPallet: {}\nCall: {}\nSigned by: {}'.format(
#         extrinsic.call_module.name,
#         extrinsic.call.name,
#         signed_by_address
#     ))
#
#     # Loop through call params
#     for param in extrinsic.params:
#
#         if param['type'] == 'Compact<Balance>':
#             param['value'] = '{} {}'.format(param['value'] / 10 ** substrate.token_decimals, substrate.token_symbol)
#
#         print("Param '{}': {}".format(param['name'], param['value']))
#
# storage_func = substrate.get_metadata_storage_functions()
# pprint(storage_func)
# result = substrate.query(
#     module='System',
#     storage_function='Account',
#     params=['5Fk5vkJ8BDMWYHyEMnsrVrAnPkPmuSzMMBSACwn1Hdwr3Lza']
# )
#
# print(result.value['nonce']) #  7695
# print(result.value['data']['free']) # 635278638077956496
# pprint(result.value)
#
#
#
# result = substrate.query(
#     module='DispSigMoudle',
#     storage_function='DispatchSig',
#     params=[14438]
# )
#
# print(result.value['nonce']) #  7695
# print(result.value['data']['free']) # 635278638077956496
# pprint(result.value)
#
# result = substrate.query_map('DispSigMoudle', 'DispatchSig')
#
# pprint(result.records)
#
# for index, dispatchsig in result:
#     print(index, dispatchsig)
# # #
# # #
# # # from flask import Flask
# # # from time import sleep
# # # from concurrent.futures import ThreadPoolExecutor
# # #
# # # # DOCS https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.ThreadPoolExecutor
# # # # 创建线程池执行器
# # # executor = ThreadPoolExecutor(2)
# # #
# # # app = Flask(__name__)
# # #
# # #
# # # @app.route('/jobs')
# # # def run_jobs():
# # #     # 交由线程去执行耗时任务
# # #     executor.submit(long_task, 'hello', 123)
# # #     return 'long task running.'
# # #
# # #
# # # # 耗时任务
# # # def long_task(arg1, arg2):
# # #     print("args: %s %s!" % (arg1, arg2))
# # #     for i in range(10):
# # #         sleep(1)
# # #         print("Task is done!")
# # #
# # #
# # # if __name__ == '__main__':
# # #     app.run()
# #
# # from eternity_backend_server.blueprints.datamin.models import DATAMINFLAG, DATAMIN
# # from eternity_backend_server.blueprints.datamin.datamin import spider_bishijie
# # from eternity_backend_server.extensions import db
# #
# # import time
# #
# # from flask import Flask
# # from time import sleep
# # from concurrent.futures import ThreadPoolExecutor
# #
# # # DOCS https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.ThreadPoolExecutor
# # # 创建线程池执行器
# # executor = ThreadPoolExecutor(2)
# #
# # app = Flask(__name__)
# #
# #
# # @app.route('/jobs')
# # def run_jobs():
# #     # 交由线程去执行耗时任务
# #     executor.submit(update_data_loop)
# #     return 'long task running.'
# #
# #
# # def update_data_loop(flag):
# #     while 1:
# #         time.sleep(2)
# #         if flag == 1:
# #             flag = 0
# #             continue
# #         result = spider_bishijie()
# #         print(result)
# #
# #
# # def time_():
# #     a = 0
# #     while 1:
# #         print(a)
# #         time.sleep(1)
# #         a+=1
# #
# # def update_data_heart():
# #     dataminflag = DATAMINFLAG.query.filter(DATAMINFLAG.id==1).first()
# #     dataminflag_flag = 1
# #
# #
# #
# # if __name__ == '__main__':
# #     executor.submit(update_data_loop, 0)
# #     executor.submit(time_)
# #     # update_data_loop(flag=0)