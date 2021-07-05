from socket import *
from time import ctime, sleep

import random
import threading
class UDPPlus:
    def __init__(self, port):
        # 全局参数配置
        self.encoding = "utf-8"  # 使用的编码方式
        self.broadcastPort = port   # 广播端口
        self.broadcastHost = self.get_addr() # 广播IP
        # 创建广播接收器
        self.recvSocket = socket(AF_INET, SOCK_DGRAM)
        self.recvSocket.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
        self.recvSocket.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)
        self.recvSocket.bind((self.broadcastHost, self.broadcastPort))

        # 创建广播发送器
        self.sendSocket = socket(AF_INET, SOCK_DGRAM)
        self.sendSocket.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)

        # 其他
        self.threads = []

    # 获取本机的ip地址
    def get_addr(self):
        # 获取本机计算机名称
        hostname = gethostname()
        # 获取本机ip并返回
        return gethostbyname(hostname)

    def send(self):
        """发送广播"""

        print("调度节点通信广播器启动成功...")
        # self.sendSocket.sendto("".encode(self.encoding), (self.broadcastHost, self.broadcastPort))
        while True:
            sendData = input("请输入需要发送的消息:")

            self.sendSocket.sendto(sendData.encode(self.encoding), (self.broadcastHost, self.broadcastPort))
            # self.sendSocket.sendto(sendData.encode(self.encoding), ('255.255.255.255', self.broadcastPort))
            # print("【%s】%s:%s" % (ctime(), "我", sendData))

            sleep(1)

    def recv(self):
        """接收广播"""

        print("调度节点通信接收器启动成功...")
        while True:
            # 接收数据格式：(data, (ip, port))
            recvData = self.recvSocket.recvfrom(1024)

            print("【%s】[%s : %s] : %s" % (ctime(), recvData[1][0], recvData[1][1], recvData[0].decode(self.encoding)))

            sleep(1)

    def start(self):
        """启动线程"""

        t1 = threading.Thread(target=self.recv)
        t2 = threading.Thread(target=self.send)
        self.threads.append(t1)
        self.threads.append(t2)

        for t in self.threads:
            t.setDaemon(True)
            t.start()

        while True:
            pass

    def startRecv(self):
        t1 = threading.Thread(target=self.recv)
        self.threads.append(t1)

        for t in self.threads:
            t.setDaemon(True)
            t.start()

        while True:
            pass

    def startSend(self):
        t2 = threading.Thread(target=self.send)
        self.threads.append(t2)

        for t in self.threads:
            t.setDaemon(True)
            t.start()

        while True:
            pass
