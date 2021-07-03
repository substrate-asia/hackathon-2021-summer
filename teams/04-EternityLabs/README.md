# 欢迎来到Eternity-Labs

<img src="http://qpjf9b6ys.hn-bkt.clouddn.com/logo.png"/>

中文 / [英文](https://github.com/ParityAsia/hackathon-2021-spring/tree/main/teams/01-Web3Games/README.md)

## 导航

- [项目介绍](https://github.com/ParityAsia/hackathon-2021-spring/tree/main/teams/01-Web3Games/docs/project-CN.md)
- [团队成员](https://github.com/ParityAsia/hackathon-2021-spring/blob/main/teams/01-Web3Games/docs/team-CN.md)
- [代码资源](https://github.com/ParityAsia/hackathon-2021-spring/tree/main/teams/01-Web3Games/src/README-CN.md)
- [演示稿](https://github.com/ParityAsia/hackathon-2021-spring/tree/main/teams/01-Web3Games/docs/presentation-CN.pdf)





## 基本资料

项目名称：Eternity-Labs

项目立项日期：2021年4月

## 项目整体简介

TODO

## 黑客松期间计划完成的事项

**区块链端**

- `Dispatch`
  - [x] `Dispatch-Stake` 调度节点的代币质押、候选人
  - [x] `Dispatch-sig` 调度节点的结果上链
- `Analysis`

  - [x] `Analysis-Stake` 分析节点的质押、候选人

  - [x] `Analysis-Sig` 分析节点的结果上链
- `Verification`
  - [x] `Verification-Stake`:验证节点质押、候选人
  - [x] `Verification-Sig` 验证节点上链
- `Quantification` 
  - [x] `Quan-Stake` 量化节状态质押,候选人
  - [x] `Quan-Sig` 量化节点质押上链
- `Model` 

  - [x] 模型pallet
- `Token-Supply` 
  - [x] token合约
  - [ ] 根据市场行情供应代币



**链下服务端**

- WEB官网

  - [x] 登录页面

  - [x] 行情数据dashboard显示
  - [x] 模型可视化

- IPFS存储
  - [x] 上传功能
  - [x] 查询功能
  - [x] 压缩内容功能

- 验证节点
  - [ ] 根据ipfs的hash值和链上数据, 分析节点是否作恶

- 调度节点

  - [x] 区块链SDK
  - [x] 发送交易接口
  - [ ] 分析节点控制器，下发指令给分析节点分析
- 分析节点
  - [x] 爬取erc20代币的基本信息
  - [ ] 爬取heco代币的基本信息
  - [ ] 爬取bsc代币的基本信息
  - [x] 爬取polkadot代币的质押、大额转账、交易量等信息
  - [ ] 对代币数额分布地址进行聚类分析

- 量化节点
  - [x] 多种量化指标
  - [ ] 网格交易策略模型
  - [x] 火币、okex、binance等多家交易所的策略套利模型


## 黑客松期间所完成的事项 (7月5日初审前提交)

- 7月5日前，在本栏列出黑客松期间最终完成的功能点。
- 把相关代码放在 `src` 目录里，并在本栏列出在黑客松期间打完成的开发工作/功能点。我们将对这些目录/档案作重点技术评审。
- 放一段不长于 **5 分钟** 的产品 DEMO 展示视频, 命名为 `团队目录/docs/demo.mp4`。初审时这视频是可选，demo day 这是计分项。

## 队员信息

**团队成员**

| 参赛人员姓名 | Github地址                                  |
| ------------ | ------------------------------------------- |
| 邓良君       | [peter-jim](https://github.com/peter-jim)   |
| 汤会枫       | [99Kies](https://github.com/99Kies)         |
| 汪一帆       | [wyf-ACCEPT](https://github.com/wyf-ACCEPT) |
| 张杰尘       | [Lazer2001](https://github.com/Lazer2001)   |
| 刘家委       | [M42-Orion](https://github.com/M42-Orion)   |
| 祝玉峰       | [1740610821](https://github.com/1740610821) |
| 杜林峰       | [mxd3236181](https://github.com/mxd3236181) |

**团队联络人微信**



![wechat](\wechat.jpg)
