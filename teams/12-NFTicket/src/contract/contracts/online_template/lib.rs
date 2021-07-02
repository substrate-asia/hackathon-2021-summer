#![cfg_attr(not(feature = "std"), no_std)]
pub use self::template::Onlinemeeting;
use ink_lang as ink;

#[ink::contract]
mod template {
    use ink_prelude::vec::Vec;
    use ink_storage::Lazy;
    use online_meeting::meeting::Meeting;

    #[ink(storage)]
    pub struct Onlinemeeting {
        controller: AccountId,   // 主合约地址
        owner: AccountId,   // 所有者
        fee_ratio: u64,     // 按票价提取多少比例作为服务费，不过服务费不能低于 min_ticket_fee
        meeting_seq:u32,
    }

    impl Onlinemeeting {
        #[ink(constructor)]
        pub fn new(controller: AccountId) -> Self {
            let caller = Self::env().caller();
            Self {
                controller: controller,
                owner: caller,
                fee_ratio: 0,
                meeting_seq: 0,
            }
        }

        /// 返回主控合约地址
        #[ink(message)]
        pub fn get_controller(&self) -> AccountId {
            self.controller
        }

        /**
        创建会议活动
        1. 部署一个活动合约，传入主合约地址等参数，获得合约地址
        2. 调用主合约的 add_meeting 接口，添加活动；
        3. 返回活动合约地址
        */
        #[ink(message)]
        pub fn create_meeting(&mut self, 
            name: Vec<u8>, desc: Vec<u8>, poster: Vec<u8>, uri: Vec<u8>, 
            start_time: u64, end_time: u64, start_sale_time: u64, end_sale_time: u64,
            code_hash: Hash, controller: AccountId ) -> AccountId{
                // 调用主合约 add_meeting
                let caller = Self::env().caller();
                let total_balance = Self::env().balance();
                let salt = self.meeting_seq.to_le_bytes();
                self.meeting_seq.checked_add(1);
                let new_meeting = Meeting::new(caller, controller)
                                .endowment(total_balance/4)
                                .code_hash(code_hash)
                                .salt_bytes(salt)
                                .instantiate()
                                .expect("fail");
                new_meeting.get_self()
        }
        /**
        Owner转移相关方法，可以活动模板的控制人
        1. 验证操作人是否 owner;
        */
        #[ink(message)]
        pub fn transfer_owner(&mut self, new_owner: AccountId){
            let caller = Self::env().caller();
            if caller == self.owner {
                self.owner = new_owner
            }
        }

        /**
        返回控制人账号
        */
        pub fn get_owner(&self) -> AccountId {
            self.owner
        }

        /**
        设置服务费比例
        1. 必须是 owner 才可以修改
        */
        pub fn set_fee_ratio(&mut self, fee_ratio: u64){
            self.fee_ratio = fee_ratio
        }

        /**
        返回服务费比例
        */
        pub fn get_fee_rate(&self)->u64{
            self.fee_ratio
        }
    }
}
