## 基本资料

项目名称：基于自研二次方捐赠pallet的dApp网页应用

项目立项日期：2021.06.05

## 项目整体简介

项目简介：

此项目是dApp网页应用，基于自研二次方捐赠pallet，该pallet已经获得波卡Open Grant赞助支持。

本次参赛应用通过整合该pallet，Subscan源代码和AWS Lambda等多层技术，实现了一个完整的dApp网页应用。该网页应用像Gitcoin一样提供了用户友好的图形界面，允许用户使用钱包实现链上捐助，并附带链上交易查询，捐赠数据图形化，用户留言和点赞等丰富的功能。

此二次方投票，是约束自由主义激进主义算法（以下简称为CLR）的通用简称。CLR由Vitalik Buterin 于2018提出，是一种针对公共物品（例如开源项目）众筹匹配的机制，已经通过Gitcoin在以太坊上被广泛采用。二次方投票是从数学逻辑上，通过民主形式实现的最佳生态系统资助模式，它将能够有效地为小型网络创建者提供捐款资助，从而支持Polkadot生态系统中的海量优秀项目的发展。

OAK Network将率先采用CLR模块并将其应用于Polkadot生态系统，凭借着其自身优秀的可拓展性，未来也可以通过Substrate构建在其他不同的区块链网络上。

整个pallet的代码逻辑和功能包括：
- 提供12个可调用的方法提供服务；
- 使用链上storage存储自定义的数据结构；
- 可自定义的创世区块参数；
- 可更改的模块设置；
- 使用substrate identity提供身份验证功能过滤不良参与者；
- 提供了benchmarking代码，并完成了基准测试和交易费weight的准确计算；

logo-small.png![image](https://user-images.githubusercontent.com/2616844/110753853-f0b37800-81fb-11eb-8d07-2e1cb39e3d10.png)

## 黑客松期间计划完成的事项

OAK团队获得波卡Open Grant赞助，基于substrate开发独立了pallet模块，本次黑客松参赛是基于该pallet，Subscan源码和AWS Lambda实现一个完整的dApp网页应用，该网页应用除了允许用户通过二次方模块实现捐赠以外，还会通过Subscan实现链上交易查询，并通过AWS Lambda实现用户留言和点赞的功能。

**客户端**

- web 端
  - [ ] 首页 landing page 展示所有的捐赠轮和参与项目。
  - [ ] 项目介绍页面，查看单个项目的具体内容，包括但不限于项目名字、详细介绍、创建者钱包地址、网站、捐赠投票情况等。
  - [ ] 用户捐赠投票操作和反馈，用户可以查看预估的匹配金额，并通过polkadot.js浏览器钱包实现捐赠投票。
  - [ ] 链上交易查询，方便用户查询各项目的捐赠记录。
  - [ ] 捐赠数据图形化，以可交互图形的方式直观鲜明的展示当前的网站数据。
  - [ ] 用户留言和点赞，为社区用户互动提供支持。

## 黑客松期间所完成的事项 (7月5日初审前提交)

- 7月5日前，在本栏列出黑客松期间最终完成的功能点。
- 把相关代码放在 `src` 目录里，并在本栏列出在黑客松期间打完成的开发工作/功能点。我们将对这些目录/档案作重点技术评审。
- 放一段不长于 **5 分钟** 的产品 DEMO 展示视频, 命名为 `团队目录/docs/demo.mp4`。初审时这视频是可选，demo day 这是计分项。

## 队员信息

Chris Li: [chrisli30](https://github.com/chrisli30)

Leah Li: [yuexxili](https://github.com/yuexxili)

Charles Chen: [imstar15](https://github.com/imstar15)

Jay Line: [JackLamCHN](https://github.com/JackLamCHN)
