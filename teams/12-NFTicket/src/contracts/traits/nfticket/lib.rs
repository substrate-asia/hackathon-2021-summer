#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;
pub use self::nfticket::NfticketTrait;

pub use nftmart_contract::*;
#[ink::contract(env = CustomEnvironment)]
mod nfticket {

    use super::*;
    use primitives::{Meeting, NFTicketError};
    use ink_prelude::string::String;

    #[ink(storage)]
    pub struct NfticketTrait {
        min_create_fee: Balance,    // 创建活动最少需要多少的费用(创建 class 需要质押，还有服务费)
        min_ticket_fee: Balance,    // 创建门票最少需要多少的费用(创建 nft需要质押，还有服务费)
    }

    impl NfticketTrait {

        #[ink(constructor)]
        pub fn new() -> Self {
            unimplemented!()
        }
        /// 添加活动，只能受模板合约调用，需要提供活动合约地址
        #[ink(message, payable)]
        pub fn add_meeting(
            &mut self,
            meeting_addr: AccountId,
            name: String,
            desc: String,
            poster: String,
            uri: String,
            start_time: u64,
            end_time: u64,
            start_sale_time: u64,
            end_sale_time: u64,
        ) -> Result<(), NFTicketError >{
            unimplemented!()
        }

        // 创建门票，返回门票NFT的class_id 和 token_id
        #[ink(message, payable)]
        pub fn create_ticket(&mut self, buyer: AccountId, metadata: String) -> Result<(u32, u64), NFTicketError> {
            unimplemented!()
        }

        #[ink(message)]
        pub fn get_meeting(&self, meeting_addr: AccountId) -> Meeting{
            unimplemented!()
        }

        #[ink(message)]
        pub fn get_min_create_meeting_fee(&self) -> Balance{
            unimplemented!()
        }

        #[ink(message,)]
        pub fn get_min_create_ticket_fee(&self) -> Balance{
            unimplemented!()
        }
        
        #[ink(message)]
        pub fn fetch_random( &self ) -> [u8; 32] {
            unimplemented!()
        }

        #[ink(message)]
        pub fn create_class(
            &mut self,
            creater: AccountId,
            metadata: Metadata,
            name: Chars,
            description: Chars,
            properties: u8,
        ) -> u128 {
            unimplemented!()
        }
    }
}
