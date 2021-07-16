# eternity_backend_server


## 运行 eternity_backend_server

**运行环境**

python3.7+

**运行 eternity_backend_server**

~~~bash
git clone https://github.com/Eternity-labs/eternity-backend-server.git

cd eternity_backend_server/

cp .envrc eternity_backend_server/.env

pip install -r requirements.txt

python manager.py runserver 
# 运行服务
~~~
-----------------


~~~bash
positional arguments:
  {runserver,shell,reset_local_db,reset_server_db,reset_db,init_local_db,init_server_db,init_db,set_user}
    runserver           Runs the Flask development server i.e. app.run()
    shell               Runs a Python shell inside Flask application context.
~~~