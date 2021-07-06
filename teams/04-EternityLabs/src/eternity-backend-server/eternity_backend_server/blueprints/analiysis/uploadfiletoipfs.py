import ipfshttpclient
from eternity_backend_server.blueprints.ipfs.aes import PrpCrypt

 
def list_all_files(rootdir):
    import os
    _files = []

    #列出文件夹下所有的目录与文件
    list_file = os.listdir(rootdir)
    
    for i in range(0,len(list_file)):

        # 构造路径
        path = os.path.join(rootdir,list_file[i])

        # 判断路径是否是一个文件目录或者文件
        # 如果是文件目录，继续递归
        
        if os.path.isdir(path):
            _files.extend(list_all_files(path))
        if os.path.isfile(path):
             _files.append(path)
    return _files

def upload_aes_model_file(key1, key2, src_dir):
    files = list_all_files(src_dir)
    client = ipfshttpclient.connect()
    all_result = []
    for file in files:
        result = {}
        save_data = ""
        filename = file.split("\\")[2]
        with open(file, "r", encoding="utf-8") as data:
            content = data.read()
        pc = PrpCrypt(key1, key2)
        redata = pc.encrypt(content)
        save_data = filename + "_" + redata
        res = client.add_str(save_data)
        print(save_data)
        result[filename] = res
        all_result.append(result)
    return all_result


def get_ipfs_model_file(key1, key2, ipfshash):
    client = ipfshttpclient.connect()
    bytes_encrypt_content = client.cat(ipfshash)
    encrypt_content = str(bytes_encrypt_content, "utf-8")
    filename, aes_content = encrypt_content.split("_")
    pc = PrpCrypt(key1, key2)
    content = pc.decrypt(aes_content)
    result = {filename:content}
    return result

# if __name__ == '__main__':
#
#
#     KEY1 = "xxxxxxxxxxxxxxxxxx"
#     KEY2 = "xxxxxxxxxxxxxxxxxx"
#     src_dir = r'.\py_analysis'      # 源文件目录地址
#     result = upload_aes_model_file(KEY1, KEY2, src_dir)
#     print(result)
#
#     KEY1 = "xxxxxxxxxxxxxxxxxx"
#     KEY2 = "xxxxxxxxxxxxxxxxxx"
#     filename = "AR.py"
#     ipfshash = "QmXLrQ4dubrT3LJ5XtRhojygegRLecQ9AqpQDMbA9E7FXt"
#
#     result = get_ipfs_model_file(KEY1, KEY2, filename, ipfshash)
#     print(result)