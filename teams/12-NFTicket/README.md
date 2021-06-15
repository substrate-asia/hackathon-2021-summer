## 基本资料

项目名称：NFTicket

项目立项日期：2021年6月3日

## 项目整体简介

当前NFT领域大多关注的是艺术品、收藏品领域，但是NFT的应用绝不仅限于此。我们认为NFT与现实需求的结合，为现实业务赋能将会是未来一个重要的发展方向。
NFTicket就是希望通过NFT作为活动门票的载体，利用区块链的去中心化和密码学特征实现门票的承载、流转、验证、收藏功能。对现有的中心化票务系统进行升级，增强门票的安全性，提高门票的流通性，扩展门票的收藏价值。

## 黑客松期间计划完成的事项
(主要功能点，方法名称仅参考，以实际开发为准)

**合约端**
- 主合约（NFTicket）
  - 系统管理相关
     - [ ] 设置系统提成比例 (set_fee_rate)
     - [ ] 设置系统分成收款账号 (set_fee_account)
  - 活动模板管理相关
     - [ ] 添加活动模板（add_event_template）
     - [ ] 设置模板提成（set_template_fee）
     - [ ] 设置模板提成账号（set_template_fee_accout）
     - [ ] 设置活动模板状态（event_template_status）
  - 活动管理相关
     - [ ] 创建活动（create_event）
     - [ ] 设置售票状态（set_ticketing_status）
     - [ ] 设置验票人（set_ ticket_collector)
  - 门票相关
     - [ ] 门票购买（buy_ticket）
     - [ ] 验票（ticket_checking）
- 活动合约（NFTEvent）
   - [ ] 初始化接口（initialized）：这事主合约地址；
   - [ ] 创建活动（create_event）：创建活动（补充活动的独特性的信息）
   - [ ] 购买门票验证（buy_ticket_verify）：受主合约调用，用于执行购买门票前验证是否可以购票；
   - [ ] 检票前验证（ticket_checking_verify）：受主合约调用，用于执行检票前的验证；

**客户端**
 - web端
   - [ ] 用户账号创建页面
   - [ ] 用户账号导入页面
   - [ ] 创建活动页面
   - [ ] 活动列表页面
   - [ ] 活动详情页面
   - [ ] 购买门票页面
   - [ ] 我的活动（创建、参加、验票）
   - [ ] 门票详情页面（用于验票）
   - [ ] 验票页面（检票员用）

## 黑客松期间所完成的事项 (7月5日初审前提交)

TODO

## 队员信息

- Tallone (https://github.com/NetGodFather/)
- Kaiweicai (https://github.com/kaiweicai)
- Renfenyi (https://github.com/renfengyi)
- Hutu1st (https://github.com/hutu1st)
- arrom
- Adorine
- Ezio
