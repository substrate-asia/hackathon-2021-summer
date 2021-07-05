

** 项目代码结构及说明
    
* 1、代码目录及结构
  * 主目录07-NFTmall
    
	* --backend-decentraland-indexer    
	  实现4.2 交易市场后端功能，和 7.2 Develop and Improve Back-end，需要整合thegraph，因此，正在进行中。
    
	* --docs    说明文档
    
	* --frontend-decentraland-webapp    
	  实现4.2 进行NFT Token的展示，服务于web用户 可见界面。已经在本地运行测试。详见 7.1 完成的前台展示界面截图。
    
	* --frontend-mint-ERC721-IPFS       
	   实现4.1 创建合约功能，进行IPFS分布存储，链上创建NFT Token。本地测试截图见4.1
    
	* --moonbeam-master 	        
	   实现9、在NFTmall公链部署和测试。以moonbeam为基础发行自有平行链，进行交易市场平行链开发。发链设计chan spec修改，正在进行中。
    
	* --Readme	
	
* 4、项目总体思路

  我们研究现有的交易市场，结合自身的技术情况和目标，把NFTmall项目分解为以下三个部分：创建合约、交易市场  和 链平台。
  * 4.1 创建合约：
  * 创建合约部分的主要功能是：
    * web用户登录与身份验证
    * 进行数字数据链上存证
    * IPFS分布存储
    * 链上创建NFT Token
    
    
	            完成的上传图片保持到IPFS展示界面，如图所示：
![NFTmall](http://nft.ueuo.com/2021/6choose-image.png)
![NFTmall](http://nft.ueuo.com/2021/7upload-image-to-IPFS.png)
![NFTmall](http://nft.ueuo.com/2021/8view-an-NFT.png)
	
  * 4.2 交易市场：
    * 交易市场，主要功能是服务于web用户，进行NFT Token的展示、交易。这一部分发代码在frontend-decentraland-webapp     
	
      * NFT Token数字作品的展示
      * NFT Token数字作品的交易
      * NFT Token数字作品的兑换
      * NFT Token数字作品的碎片化
      
      
  * 4.3 链平台：部署交易市场的链平台
      * 支持去中心化存储：需要支持 IPFS作为 NFT的内容存储平台。
      * 主平台：需要兼容Ethereum、substrate
      * 平台技术：选择[moonbeam](https://moonbeam.network/)作为进一步开发的基础
  


* 7、完成Demo 模型的制作（实现中--以[decentraland](http://market.decentraland.org)为基础）
  * 7.1 Develop and Improve front-end 
    * ~~Test in localhost ~~
    * ~~show products~~
    * ~~show Lists & classification~~
   
   
                          完成的前台展示界面，如图所示：
![NFTmall](http://nft.ueuo.com/2021/1.png)
![NFTmall](http://nft.ueuo.com/2021/2.png)
![NFTmall](http://nft.ueuo.com/2021/3.png)
![NFTmall](http://nft.ueuo.com/2021/4.png)
![NFTmall](http://nft.ueuo.com/2021/5.png)


  * 7.2 Develop and Improve Back-end
    * Added ERC721 Contract
    * Connected to Metamask
    * Started NFTMinter Contract
    * Added truffle-flattener and flattened openZeppelin contracts
                           本地测试的后台界面，如图所示：




* 8、公链测试和部署Public chain deployment, testing（规划中）
  * Deployment & testing in Ethereum
  * Deployment & testing in moonbeam
  * Deployment & testing in Kusama



* 9、在NFTmall公链部署和测试Deployment and operation in NFTmall chain（规划中）
  * NFTmall Public chain deployment



** 路线图Roadmap & Plan

![NFTmall](http://nft.ueuo.com/2021/roadmap.png)




