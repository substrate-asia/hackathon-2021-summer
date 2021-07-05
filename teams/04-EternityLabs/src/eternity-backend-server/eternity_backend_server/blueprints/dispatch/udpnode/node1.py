from flask import Flask, jsonify
# from eternity_backend_server.utils import UDPPlus
from basenode.udpplus import UDPPlus
node1 = Flask(__name__)

@node1.route("/")
def index():
    return jsonify({"node"})


def node1server(port):
    node1 = UDPPlus(port)
    node1.startRecv()

def node1client(port):
    node1 = UDPPlus(port)
    node1.startSend()





if __name__ == "__main__":
    # demo = UDPPlus(8000)
    # demo.start()

    # node1server(8000)
    node1client(8010)
# run()
#

# #coding=utf-8
# import socket
# # 获取本机的ip地址
# def get_addr():
#   # 获取本机计算机名称
#   hostname = socket.gethostname()
#   # 获取本机ip并返回
#   return socket.gethostbyname(hostname)
# # 创建udp套接字,
# # AF_INET表示ip地址的类型是ipv4，
# # SOCK_DGRAM表示传输的协议类型是udp
# udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
# # 要发送的信息
# test_data = input('请输入要发送的消息：')
# bytes_data = str.encode(test_data)
# print('send_data = ', bytes_data)
# # 要发送的ip地址和端口（元组的形式）
# host = get_addr()
# test_addr = (host, 7788)
# print('send_addr = ', test_addr)
# print('prepare to send ------')
# # 发送消息
# udp_socket.sendto(bytes_data, test_addr)
# # 关闭套接字
# udp_socket.close()
# print('send end ------')

