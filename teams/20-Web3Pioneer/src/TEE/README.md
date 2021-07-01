## 说明
在SGX里访问给定的网址，然后生成可验证的数据      
为了减轻代码量，我们选用了Open Enclave来进行POC  
选用Open Enclave原因之二，短期可以避开Intel的商业认证，采用微软的第三方认证   
 



## 验证在SGX里访问给定的网址
IO在SGX里比较特殊，一般采ocall来实现  
但部分IO是可以在SGX里进行的  
这里我们将验证使用 Open Encalve在SGX里访问URL  
主要代码来自  https://github.com/openenclave/openenclave/tree/master/samples/attested_tls/client  
需要改动：
- 注释掉  ../common/cert_verifier.cpp  里的 result = oe_verify_attestation_certificate_with_evidence  
(不要让client 去验证被访问端是否是另一个enclave, 这个跟本POC无关）
- 修改 ../common/common.h 设置我们要访问的 path :#define CLIENT_PAYLOAD "GET /ipfs/bafybeifx7yeb55armcsxwwitkymga5xf53dxiarykms3ygqic223w5sk3m HTTP/1.1  

按照Open encalve的要求，我们选择机器，安装环境，然后编译运行。  
以下是我们在azure上申请的SGX机器，运行的示例
（红框里是访问的网址，地址，及返回的结果，  
返回结果显示网站已经有了回应，但还不是期望的数据，接下去我们会修改http的请求头，来获取正确的内容）  

![image](https://user-images.githubusercontent.com/4797328/124059049-096ec480-da5d-11eb-8632-c014a18cc0be.png)



## 生成可验证报告
待进行



