#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

#[ink::contract]
mod onlinemeeting {
    #[ink(storage)]
    pub struct Onlinemeeting {
        controller: AccountId,   // 主合约地址
    }

    impl onlinemeeting {
        #[ink(constructor)]
        pub fn new(controller: AccountId) -> Self {
            Self { controller: controller }
        }

        /// 返回主控合约地址
        #[ink(message)]
        pub fn get_controller(&self) {
            self.controller
        }
/**
TODO
        /**
        创建会议活动
        1. 部署活动合约：根据活动参数对活动合约进行初始化（活动信息有效性验证，放到活动合约内）
        2. 部署活动合约的时候，需要将主合约传给活动合约
        3. 通过活动参数，调用主控合约，添加活动；
        */
        pub fn create_meeting(template_address:AccountId, owner: AccountId, name:Vec<u8>, desc:Vec<u8>, uri: Vec<u8>){
            
        }
*/
    }
}
    
