# 基本资料

项目名称：Mintcraft

项目立项日期：2021年3月（第一届Substrate Hackathon期间）

## 项目整体简介

> **项目背景**

Mintcraft 是春季波卡黑客松时期诞生的想法，最早是计划制作一个通用“游戏链”的开发范式。在经历的春季黑客松的洗礼之后，我们发现 Substrate 本身已经提供了无穷的可能性，若在其之上打造一个有局限性的开发范式，这其实是一件本末倒置的事情。

在观察了春季黑客松获奖项目的产品思路、对我们产品的路线进行深度分析后，我们认为：对接更加轻量的智能合约、对游戏开发工具的深度定制以及为区块链游戏的研发提供轻量级的扩展支持，这几个方面才是我们最值得进行突破的方向。因此我们重新规划了产品方向，决定再次出发参加这次夏季波卡黑客松。

我们组建了 MintEngine Lab，旨在打造全新的 Mintcraft 开发套件：

- 多平台区块链服务网关
  - 多类型NFT发布渠道支持：计划支持 ink 合约 NFT、evm 合约 NFT、原生substrate NFT。
  - 多个去中心化存储渠道支持：计划支持 IPFS 和 Swarm 作为 NFT的内容存储平台。
  - 使用加密通信，完成多链的原始交易构造、发送和确认的统一API。
- 游戏引擎套件（基于 UnrealEngine 4 虚幻引擎）
  - 引擎内置软件签名机和钱包（以 ethereum keystore v3 标准持久化）
  - 引擎内置和服务网关的加密授权通信机制，使用 ecdh + aes 确保通信内容的对称加密。（与区块链交互的形式是：游戏内发起请求 -> 服务网关完成交易的构建 -> 引擎组件内完成签名 -> 服务网关发送交易。因此所有消息均需对称加密。）
  - 引擎内置基于对象模块的 NFT 导出和发布工具。
  - 引擎内置NFT加载器，可在游戏运行时动态加载对象模块。
- 智能合约与NFT
  - 使用 ink! 开发 ERC1155 合约，用于 Demo 用途

> **LOGO:**

![Logo Light][logo1]
![Logo Dark][logo2]

## 黑客松期间计划完成的事项

> 部分 traits 如 erc20 等，直接使用 [patract/metis](https://github.com/patractlabs/metis) 的依赖

| 优先级 | 类型 | 名称 | 内容说明 |
| :---: | ---- | ------ | ------------ |
| P0 | ink! | trait-erc721 | NFT合约基础traits之一 |
| P0 | ink! | trait-erc1155 | NFT合约基础traits之一 |
| P0 | ink! | aura | 灵气，主资源币ERC20合约 |
| P1 | ink! | chi | 气，养成资源ERC20合约 |
| P1 | ink! | samsara | 轮回，角色诞生存亡的控制合约 |
| P1 | ink! | actor | 角色，具有存活属性(ERC721实现) |
| P2 | ink! | land | 地块，具有唯一的空间坐标(ERC721实现) |
| P0 | ink! | entity | 实体，多类型、可培养(ERC1155实现) |
| P1 | ink! | cultivate | 培养合约，NFT链上数据养成合约 |
| P1 | ink! | dungeons | 地下城控制合约 |
| P0 | backend | gateway-api-design | 网关 API 架构设计 |
| P0 | backend | nft-storage | NFT资源上传并生成 metadata uri的系列 API |
| P0 | backend | nft-query | NFT资源的数据查询API |
| P0 | backend | tx-builder | 多链交易构造器 |
| P0 | backend | tx-sender | 多链交易发送及监控 |
| P0 | ue4-plugin | plugin-framework | UE4的插件框架 |
| P0 | ue4-plugin | engine-signer | UE4可用的签名机 |
| P0 | ue4-plugin | editor-entity-builder | UE4下 NFT 的构造导出功能 |
| P0 | ue4-plugin | editor-entity-publisher | 将 NFT 资源导出到给服务器后端的功能 |
| P0 | ue4-plugin | runtime-entity-loader | 运行中载入 NFT 资源的插件 |
| P0 | ue4-asset | asset-entity-demo | demo 用模型 - 实体单位 |
| P1 | ue4-asset | asset-actor-demo | demo 用模型 - 角色 |
| P2 | ue4-asset | asset-equipment-sword | demo 用模型 - 剑 |
| P2 | ue4-demo | demo-mini-game | 载入角色信息和 NFT 资源，通过地下城控制合约开启副本，并进行游戏的 demo |

## 黑客松期间所完成的事项 (7月5日初审前提交)

> 在黑客松期间计划完成的功能点。

Demo ink!合约

- [x] trait-erc721
- [x] trait-erc1155
- [x] aura
- [x] entity
- [ ] chi
- [ ] samsara
- [ ] actor
- [ ] land
- [ ] cultivate
- [ ] dungeons

后端API

- [x] gateway-api-design
- [x] nft-storage
- [x] nft-query
- [ ] tx-builder
- [ ] tx-sender

ue4插件

- [x] plugin-framework
- [ ] engine-signer
- [ ] editor-entity-builder
- [ ] editor-entity-publisher
- [ ] runtime-entity-loader

游戏 Demo

- [x] asset-entity-demo
- [ ] asset-actor-demo
- [ ] asset-equipment-sword
- [ ] mini-game

> 项目演示 PPT 和 Demo 视频
> 可选：放一段不长于 **5 分钟** 的产品 DEMO 展示视频, 命名为 `团队目录/docs/demo.mp4`。

项目尚在按照我们的节奏开发，PPT 和 Demo 视频预期将在 DemoDay 现场演示。

## 队员信息

- 项目团队: MintEngine Lab。Github: [MintEngine](https://github.com/MintEngine)
- 唐博皞(队长、产品设计、区块链开发、UE开发)。Github: [btspoony](https://github.com/btspoony)
- 尹楠(区块链开发、测试)。Github: [ww8912188](https://github.com/ww8912188)
- 黄康宁(UE开发、技术支持)。Github: [PandaNotPig](https://github.com/PandaNotPig)
- 刘超(UE开发、技术支持)。Github: [neskynight](https://github.com/neskynight)

[logo1]: docs/assets/logo_en_small.png "logo_small"
[logo2]: docs/assets/logo_en_white_small.png "logo_dark"
