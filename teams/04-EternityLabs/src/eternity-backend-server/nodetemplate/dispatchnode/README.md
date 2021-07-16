## 启动调度节点

1. 获取调度节点镜像

~~~bash
$ docker pull 99kies/enldispatchnode
~~~

2. 启动服务

~~~bash
$ export NODE_PORT=33943
$ chmod u+x ./run_node.sh
$ ./run_node.sh
~~~

3. 检查服务

~~~bash
$ curl 127.0.0.1:33943

{"address":"5HjY6wPoN6YXvp3Wew6uNRzbZEtTeoKrrKazALkPikVRdEAj","dexaddress":"0xbacd15010678bd31197f6eb6b971ab7154674d48","ipport":33943,"model":"mxc_post_token_7day","stake":0}
~~~

