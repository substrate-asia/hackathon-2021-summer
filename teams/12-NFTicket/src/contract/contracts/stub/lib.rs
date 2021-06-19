#![cfg_attr(not(feature = "std"), no_std)]

pub use self::stub::TemplateStub;
use ink_lang as ink;

#[ink::contract]
mod stub {
    use ink_prelude::vec::Vec;
    #[ink(storage)]
    pub struct TemplateStub {}

    impl TemplateStub {
        /// Creates a new ERC-20 contract with the specified initial supply.
        #[ink(constructor)]
        pub fn new(
            name: Vec<u8>, desc: Vec<u8>,id:u32,fee:(u32,u32),
        ) -> Self {
            unimplemented!()
        }

        #[ink(message)]
        pub fn get_id(&self) -> u32 {
            unimplemented!()
        }
    }
}
