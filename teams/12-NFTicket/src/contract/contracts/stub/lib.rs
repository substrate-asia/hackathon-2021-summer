#![cfg_attr(not(feature = "std"), no_std)]

pub use self::stub::TemplateStub;
use ink_lang as ink;

#[ink::contract]
mod stub {
    use ink_prelude::vec::Vec;

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
    }
    #[ink(storage)]
    pub struct TemplateStub {}

    pub type Result<T> = core::result::Result<T, Error>;
    impl TemplateStub {
        /// Creates a new ERC-20 contract with the specified initial supply.
        #[ink(constructor)]
        pub fn new(
            _name: Vec<u8>, _desc: Vec<u8>,_id:u32,_fee:(u32,u32),
        ) -> Self {
            unimplemented!()
        }

        /// 购买票,并返回票价
        #[ink(message)]
        pub fn buy_ticket(&mut self,_ticker:Hash) -> Result<primitives::TickeResult> {
            unimplemented!()
        }

        #[ink(message)]
        pub fn get_id(&self) -> u32 {
            unimplemented!()
        }
    }
}
