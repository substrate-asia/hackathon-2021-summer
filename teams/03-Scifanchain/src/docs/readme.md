## 提交代码说明

### Node文件夹

主要开发了PoE功能，包括存证、撤消和转移。

文件夹 | 说明 
---|---
pallets | PoE存证。
runtime | 相关文件。

### client文件夹

客户端网站，以Front-End Template为基础模板，开发了用户注册、与应用层的交互、预处理提交PoE验证内容、提交存证等功能。主文件在src目录下。

文件夹 | 说明 
---|---
chain | Front-End Template原文件，名称有改动。
config | 配置文件
author | 用户注册、登录、信息和钱包。
story | 应用数据的读取展示、新增与更新。
widget | 一些小组件

src目录下的其他文件，是网站各内容栏目的主入口程序。


### api文件夹

应用层，基于Fastapi框架开发，提供了API接口，为client客户端提供数据，处理交互逻辑等。

文件夹 | 说明 
---|---
alembic | 数据库日志、迁移管理
config | 配置文件
dtatpools | 数据库操作，包括模型、验证、CRUD操作等
routers | api路由
main.py | 主文件

### web文件夹

展示性网站和博客，采用Djaong开发。

文件夹 | 说明 
---|---
accounts | 用户相关文件
home | 主目录
blogs | 博客
comments | 评论
common | 公共组件
templates | 模板文件
scifanchain | 主路由、配置文件等

### docs文件夹

文档文件。采用MkDocs开发。

文件夹 | 说明 
---|---
docs | md文件
images | 图片
site | 编译后的静态化站点
