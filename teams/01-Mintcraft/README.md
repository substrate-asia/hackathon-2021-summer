# 基本资料

项目名称：Mintcraft

项目立项日期：2021年3月（第一届Substrate Hackathon期间）

## 项目整体简介

> **项目背景**

TODO

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
| P0 | backend | uploader | NFT资源上传并生成 metadata uri的API |
| P0 | backend | metadata | metadata NFT资源数据查询API |
| P0 | backend | tx-builder | 交易构造器 |
| P0 | backend | tx-sender | 交易发送器 |
| P0 | ue4-plugin | engine-signer | UE4下可用的签名机 |
| P0 | ue4-plugin | editor-entity-builder | UE4下 NFT 的构造导出功能 |
| P0 | ue4-plugin | editor-entity-publisher | 将 NFT 资源导出到给服务器后端的功能 |
| P0 | ue4-plugin | runtime-entity-loader | 运行中载入 NFT 资源的插件 |
| P1 | ue4-asset | asset-actor-demo | demo 用模型 - 角色 |
| P2 | ue4-asset | asset-equipment-sword | demo 用模型 - 剑 |
| P2 | ue4-demo | demo-mini-game | 载入角色信息和 NFT 资源，通过地下城控制合约开启副本，并进行游戏的 demo |

## 黑客松期间所完成的事项 (7月5日初审前提交)

> 7月5日前，在黑客松期间完成的功能点。

ink!合约

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

- [ ] uploader
- [ ] metadata
- [ ] tx-builder
- [ ] tx-sender

ue4插件

- [ ] engine-wallet
- [ ] editor-entity-builder
- [ ] editor-entity-publisher
- [ ] runtime-entity-loader

游戏 Demo

- [ ] asset-actor-demo
- [ ] asset-equipment-sword
- [ ] mini-game

> 产品最终 Demo 视频
> 可选：放一段不长于 **5 分钟** 的产品 DEMO 展示视频, 命名为 `团队目录/docs/demo.mp4`。

TODO

## 队员信息

- 项目团队: MintEngine Lab。Github: [MintEngine](https://github.com/MintEngine)
- 唐博皞(队长、产品设计、区块链开发、UE开发)。Github: [btspoony](https://github.com/btspoony)
- 尹楠(区块链开发、测试)。Github: [ww8912188](https://github.com/ww8912188)
- 黄康宁(UE开发、技术支持)。Github: [PandaNotPig](https://github.com/PandaNotPig)
- 刘超(UE开发、技术支持)。Github: [neskynight](https://github.com/neskynight)

[logo1]: docs/assets/logo_en_small.png "logo_small"
[logo2]: docs/assets/logo_en_white_small.png "logo_dark"
