本项目是为波卡hackathon-2021-summer比赛建立的，所列资料仅供比赛使用。

** 基本资料

* 项目名称：
  * NFTmall - Creat&Mint Sell&Trade your NFT digital assets in an Ethereum-compatible smart contract parachain on Polkadot<br/>
  * NFTmall - 制作、销售、交易NFT数字资产的智能合约市场，完全兼容以太坊和波卡<br/>

* 项目LOGO:


![NFTmall](http://nft.ueuo.com/img/movieimg.png)


* 项目立项日期：2021 年 5 月。

** 项目整体简介

* 项目简介： NFT mall目标是成为NFT资产的制作、交易平台

项目背景/原由/要解决的问题 (如有其他附件，可放到 docs 目录内。中文提交)。

* 1、NFTmall 的愿景目标：

  * NFTmall 的愿景和目标是打造一个NFT数字资产的交易平台。
  * 在平台里，用户可以自由地创作、制作、交易自己的NFT Token，这个平台兼容主流的公链（具备跨链功能）。


* 2、NFTmall 的目标：

  * NFT mall目标是成为NFT资产的制作、交易平台。

* 3、NFTmall 的基本功能
  * Create an NFT marketplace contract that supports ERC721 and ERC1155
  * Sellers can list their NFTs on the platform
  * Buyers can preview, and purchase NFTs listed on the platform

* 4、项目总体思路

  我们研究现有的交易市场，结合自身的技术情况和目标，把NFTmall项目分解为以下三个部分：创建合约、交易市场  和 链平台。
  * 4.1 创建合约：
  * 创建合约部分的主要功能是：
    * web用户登录与身份验证
    * 进行数字数据链上存证
    * IPFS分布存储
    * 链上创建NFT Token
  * 4.2 交易市场：
     交易市场，主要功能是服务于web用户，进行NFT Token的展示、交易、兑换、碎片化等功能。
      * NFT Token数字作品的展示
      * NFT Token数字作品的交易
      * NFT Token数字作品的兑换
      * NFT Token数字作品的碎片化
  * 4.3 链平台：部署交易市场的链平台
      * 多平台服务网关和多类型发布渠道支持：需要支持Ethereum evm 合约 NFT、原生substrate NFT。
      * 多个去中心化存储渠道支持：需要支持 IPFS作为 NFT的内容存储平台。
      * 多平台服务网关和多类型发布渠道支持：需要支持Ethereum evm 合约 NFT、原生substrate NFT。
  
  
* 5 所属参赛类别：
    DApp、应用链、平行链 
        
    

**技术栈： substrate 

**黑客松期间所完成的事项 (7月5日初审前提交)
7月5日前，在本栏列出黑客松期间最终完成的功能点。
------
目前进度：（截止至 06.25）

* 6、 完成项目定位、发展路径和发展规划（已完成）
  * 项目定位
  * 开发思路
  * 发展规划

                      前端开发者 Danny完成的前台展示界面，如图所示：
![NFTmall](http://nft.ueuo.com/2021/webscreen.png)

* 7、完成Demo 模型的制作（实现中）
  * ~~Added ERC721 Contract~~
  * ~~Connected to Metamask~~
  * ~~Started NFTMinter Contract~~
  * ~~Added truffle-flattener and flattened openZeppelin contracts~~
  *  ~~Contracts and Solc compiler updated to version: "^0.8"~~
  * ~~Added Tests and Migration~~
  * Develop and Improve front-end
  * Test in production environment


* 8、公链测试和部署Public chain deployment, testing and operation
  * Deployment & testing in Ethereum
  * Deployment & testing in moonbeam
  * Deployment & testing in Kusama



* 9、在NFTmall公链部署和测试Deployment, testing and operation in NFTmall chain
  * NFTmall Public chain deployment



** 路线图Roadmap & Plan

![NFTmall](http://nft.ueuo.com/2021/roadmap.png)


** 团队人员信息
  * feiying	  团队带头人，来自北京，丰富的投资行业经验
  * Stvenyin  来自上海 经验丰富的区块链公链开发者
  * hfxx	    来自上海 前neo高级研究员
  * Danny     来自深圳 目前在大三计算机&金融在读，fisco bcos和eth合约开发经验
  * cooper    来自上海 目前在从事区块链链存储研究，四年区块链开发经验
  * 越泽	    来自广州，擅长golang、熟悉物联网
  * 海中蛟龙  来自北京，区块链交易员
