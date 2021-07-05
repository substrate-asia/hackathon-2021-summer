# 基本资料
- 项目名称：Wasmark
- 简介：开源的智能合约压力测试工具。用于开发者评估合约消耗和节点性能

# 技术架构
基于polkadot-js/api开发。提供一个Node.js命令行工具包，将主要的压测逻辑封装于其中。基于polkadot-apps，提供一个REACT编写的UI界面。

# 功能点-进展
1. 提供Node.js命令行工具, 可全局使用也可以本地使用 - 已完成
2. 提供浏览器界面，展示用户指定的合约列表。用户可选择合约地址以及带测试的方法，并填写参数 - 已完成
2. 批量重复执行合约方法调用 - 已在前端实现，考虑移植后端。
3. BenchMark图表及统计信息 - 待完善

# 仓库地址
[@wasmark/cli](https://github.com/wasmark/cli)
[@wasmark/ui](https://github.com/wasmark/ui)


# 使用方法
## 安装命令行工具
```
yarn add wasmark -g
//
yarn add wasmark
```

## 使用
```
wasmark 
npx wasmark -d [.contract文件所存放的路径] -e [节点] -m [助记词 多个] -c [合约文件路径] -p [端口]
```

# 团队成员
- Founder：Freepoix(https://github.com/FreePoi)
