## 说明
目前是基于substrate2.0作的修改  
没有增加的新pallet, 而是在frame/system与frame/balance下增加了功能  

 



## frame/system
增加设置当前APP在ipfs上的CID方法  
fn set_app_cid(origin, app_cid: Vec<u8>)  

## frame/balances  
- 增加传播关系确定方法  
pub fn spread_transfer  
  
- 奖励提现方法  
pub fn spread_return  

 

