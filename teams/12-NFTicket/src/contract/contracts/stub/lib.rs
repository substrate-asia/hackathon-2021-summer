#![cfg_attr(not(feature = "std"), no_std)]

pub use self::stub::MainStub;
use ink_lang as ink;

#[ink::contract]
mod stub {
    use ink_prelude::vec::Vec;
    use primitives::Ticket;

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
    }
    #[ink(storage)]
    pub struct MainStub {}

    pub type Result<T> = core::result::Result<T, Error>;
    impl MainStub {
        
        #[ink(constructor)]
        pub fn new(fee_taker: AccountId) -> Self {
            unimplemented!()
        }

        /// 购买票,并返回票价
        #[ink(message)]
        pub fn buy_ticket(&mut self, _ticket:Ticket)->bool{
            unimplemented!()
        }

        #[ink(message)]
        pub fn get_id(&self) -> u32 {
            unimplemented!()
        }

        /**
        创建门票
        1. 调用本合约，必须付费，并且必须大于等于 min_ticket_fee
        2. 仅能通过活动合约调用；
        3. 通过调用的活动合约地址，知道是哪个活动，知道是哪个模板生成的，给相应的模板记分成收入；
        4. 调用 runtime 的 NFT 创建接口，创建门票 NFT，并将门票NFT发放给 buyer
        5. 返回创建的 class_id 和 NFT_ID的元组
        6. 触发事件： ticket_created
        */
        #[ink(message, payable)]
        pub fn create_ticket(&mut self, _ticket:Ticket)->bool{
            unimplemented!()
        }
    }
}
