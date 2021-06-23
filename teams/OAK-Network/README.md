## 基本资料

项目名称：Quadratic Funding

项目立项日期：2021.06.23

## 项目整体简介

项目简介：

二次方投票，是约束自由主义激进主义算法（以下简称为CLR）的通用简称。CLR由Vitalik Buterin 于2018提出，是一种针对公共物品（例如开源项目）众筹匹配的机制，已经通过Gitcoin在以太坊上被广泛采用。

二次方投票是从数学逻辑上，通过民主形式实现的最佳生态系统资助模式，它将能够有效地为小型网络创建者提供捐款资助，从而支持Polkadot生态系统中的海量优秀项目的发展。

OAK Network将率先采用CLR模块并将其应用于Polkadot生态系统，凭借着其自身优秀的可拓展性，未来也可以通过Substrate构建在其他不同的区块链网络上。

logo-small.png![image](https://user-images.githubusercontent.com/2616844/110753853-f0b37800-81fb-11eb-8d07-2e1cb39e3d10.png)

## 黑客松期间计划完成的事项

**区块链端**

- `pallet-quadratic-funding`
  - [ ] 创建项目 (`fn create_project(origin, name: Vec<u8>, logo: Vec<u8>, description: Vec<u8>, website: Vec<u8>)`)
  - [ ] 向模块账号资助金额 (`fn fund(origin, fund_balance: BalanceOf<T>)`)
  - [ ] 计划一轮活动 (`fn schedule_round(origin, start: T::BlockNumber, end: T::BlockNumber, matching_fund: BalanceOf<T>, project_indexes: Vec<ProjectIndex>)`)
  - [ ] 取消一轮活动 (`cancel_round(origin, round_index: RoundIndex)`)
  - [ ] 完成一轮活动 (`finalize_round(origin, round_index: RoundIndex)`)
  - [ ] 向一个项目捐款 (`fn contribute(origin, project_index: ProjectIndex, value: BalanceOf<T>)`)
  - [ ] 通过一个项目的审查 (`fn approve(origin, round_index: RoundIndex, project_index: ProjectIndex)`)
  - [ ] 取消一个项目的资格 (`fn cancel(origin, round_index: RoundIndex, project_index: ProjectIndex)`)
  - [ ] 提款 (`fn withdraw(origin, round_index: RoundIndex, project_index: ProjectIndex)`)
  - [ ] 设置一个活动最大项目数 (`fn set_max_grant_count_per_round(origin, max_round_grants: u32)`)
  - [ ] 设置提款过期时间 (`fn set_withdrawal_expiration(origin, withdrawal_period: T::BlockNumber)`)
  - [ ] 设置是否需要身份认证 (`set_is_identity_required(origin, is_identity_needed: bool)`)
  

**客户端**

- web 端
  - [ ] 首页，用于浏览活动和项目
  - [ ] 项目介绍页面
  - [ ] 用户捐赠投票流程

## 黑客松期间所完成的事项 (7月5日初审前提交)

- 7月5日前，在本栏列出黑客松期间最终完成的功能点。
- 把相关代码放在 `src` 目录里，并在本栏列出在黑客松期间打完成的开发工作/功能点。我们将对这些目录/档案作重点技术评审。
- 放一段不长于 **5 分钟** 的产品 DEMO 展示视频, 命名为 `团队目录/docs/demo.mp4`。初审时这视频是可选，demo day 这是计分项。

## 队员信息

Chris Li: [chrisli30](https://github.com/chrisli30)

Leah Li: [yuexxili](https://github.com/yuexxili)

Charles Chen: [imstar15](https://github.com/imstar15)

Jay Line: [JackLamCHN](https://github.com/JackLamCHN)


