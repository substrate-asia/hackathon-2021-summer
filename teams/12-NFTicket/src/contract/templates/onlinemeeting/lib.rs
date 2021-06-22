#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

/**
活动模板合约
1. 创建活动，部署活动合约，并将创建的活动条件到主合
2. 不同活动模板，因为相应的活动不同，创建的方法也会不同；
*/
#[ink::contract]
mod onlinemeeting {
    #[ink(storage)]
    pub struct Onlinemeeting {
        controller: AccountId,   // 主合约地址
        owner: AccountId,   // 所有者
        fee_ratio: u64,     // 按票价提取多少比例作为服务费，不过服务费不能低于 min_ticket_fee
    }

    impl Onlinemeeting {
        #[ink(constructor)]
        pub fn new(controller: AccountId) -> Self {
            let caller = Self::env().caller();
            Self {
                controller: controller,
                owner: caller,
            }
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
        1. 部署一个活动合约，传入主合约地址等参数，获得合约地址
        2. 调用主合约的 add_meeting 接口，添加活动；
        3. 返回活动合约地址
        */
        pub fn create_meeting(&mut self, name: Vec<u8>, desc: Vec<u8>, poster: Vec<u8>, uri: Vec<u8>, start_time: u64, end_time: u64, start_sale_time: u64, end_sale_time: u64) -> AccountId{

        }
        /**
        Owner转移相关方法，可以活动模板的控制人
        1. 验证操作人是否 owner;
        */
        #[ink(message)]
        pub fn transfer_owner(mut &self, new_owner: AccountId){

        }

        /**
        返回控制人账号
        */
        pub fn get_owner(&self) -> AccountId {

        }

        /**
        设置服务费比例
        1. 必须是 owner 才可以修改
        */
        pub fn set_fee_ratio(&mut self, fee_ratio: u64){

        }

        /**
        返回服务费比例
        */
        pub fn get_fee_rate(&self)->u64{

        }
*/
    }
}