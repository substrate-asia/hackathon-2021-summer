#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

pub use nftmart_contract::*;
#[ink::contract]
mod online {
    use ink_prelude::string::String;
    use meeting::Meeting;
    use ink_lang::ToAccountId;
    use ink_env::call::FromAccountId;
    use nfticket::NfticketTrait;
    use primitives::TemplateError;

    #[ink(storage)]
    pub struct Online {
        owner: AccountId,
        controller: AccountId,
        meeting_hash: Hash,
        min_endowment: Balance, // 部署活动合约时最少需要支付的费用
        meeting_seq: u32,
    }

    impl Online {
        #[ink(constructor)]
        pub fn new(controller: AccountId, meeting_hash: Hash, min_endowment: Balance) -> Self {
            let caller = Self::env().caller();
            Self {
                owner: caller,
                controller: controller,
                meeting_hash: meeting_hash,
                min_endowment: min_endowment,
                meeting_seq: Default::default(),
            }
        }



        /// 创建活动
        #[ink(message, payable)]
        pub fn create_meeting(&mut self,
            name: String,
            desc: String,
            poster: String,
            uri: String, 
            start_time: u64,
            end_time: u64,
            start_sale_time: u64,
            end_sale_time: u64,
        ) -> Result<ink_env::AccountId, TemplateError>{
            let caller = Self::env().caller();
            let transferred: Balance = self.env().transferred_balance();
            // 付费必须大于必须付费金额
            if transferred < self.get_create_meeting_fee() {
                return Err( TemplateError::LessThanCreateMeetingFee )
            }
            // 部署活动合约
            self.meeting_seq = self.meeting_seq.checked_add(1).unwrap();
            let salt = self.meeting_seq.to_le_bytes();
            let new_meeting = Meeting::new(caller, Self::env().account_id(), self.controller)
                            .endowment(self.min_endowment)
                            .code_hash(self.meeting_hash)
                            .salt_bytes(salt)
                            .instantiate()
                            .expect("MeetingDeployFail");
            let meeting_addr = new_meeting.to_account_id();

            // // 调动主合约添加会议
            let create_fee = transferred - self.min_endowment;
            let mut nfticket_instance: NfticketTrait = FromAccountId::from_account_id( self.controller );

            use ink_lang::ForwardCallMut;
            let _ = <&mut NfticketTrait>::call_mut(&mut nfticket_instance)
                .add_meeting(meeting_addr, name, desc, poster, uri, start_time, end_time, start_sale_time, end_sale_time)
                .transferred_value(create_fee)
                .fire()
                .unwrap();

            Ok(meeting_addr)
        }


        /// 返回 meeting_hash
        #[ink(message)]
        pub fn get_meeting_hash(&self) -> Hash {
            self.meeting_hash
        }

        /// 转让所有权
        pub fn transfer_ownership(&mut self, new_owner:AccountId){
            self.ensure_owner();

            self.owner = new_owner
        }
        /// 返回当前拥有人
        #[ink(message)]
        pub fn get_owner(&self) -> AccountId {
            self.owner
        }

        /// 返回当前拥有人
        #[ink(message)]
        pub fn get_meeting_seq(&self) -> u32 {
            self.meeting_seq
        }

        /// 返回创建活动最少付费代币（包括部署合约和）
        #[ink(message)]
        pub fn get_create_meeting_fee(&self) -> Balance{
            let nfticket_instance: NfticketTrait = FromAccountId::from_account_id( self.controller );

            self.min_endowment+ nfticket_instance.get_min_create_meeting_fee()
        }

        /// 返回创建活动最少付费代币（包括部署合约和）
        #[ink(message)]
        pub fn get_min_create_ticket_fee(&self) -> Balance{
            let nfticket_instance: NfticketTrait = FromAccountId::from_account_id( self.controller );

            nfticket_instance.get_min_create_ticket_fee()
        }

        /// 返回部署活动合约最少充值代币数量
        #[ink(message)]
        pub fn get_min_endowment(&self) -> Balance{
            self.min_endowment
        }

        /// 设置部署活动合约最少充值代币
        #[ink(message)]
        pub fn set_min_endowment(&mut self, min_endowment:Balance){
            self.ensure_owner();
            
            self.min_endowment = min_endowment;
        }

        /// 如果不是管理员，就报错
        fn ensure_owner(&self) {
            assert_eq!(self.owner, self.env().caller(), "not owner");
        }

        /// 返回主合约账号
        #[ink(message)]
        pub fn get_controller(&self) -> AccountId {
            self.controller
        }

        /// 返回主合约账号[仅用于测试，正式上线需要去掉]
        #[ink(message)]
        pub fn set_controller(&mut self, controller:AccountId){
            self.controller = controller;
        }
    }
}