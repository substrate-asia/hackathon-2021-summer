#![cfg_attr(not(feature = "std"), no_std)]

pub use self::template::TemplateTrait;
use ink_lang as ink;

#[ink::contract]
mod template {
    
    use ink_prelude::string::String;

    #[ink(storage)]
    pub struct TemplateTrait {
        owner: AccountId,
        name: String,
    }

    impl TemplateTrait {

        #[ink(constructor)]
        pub fn new(name: String) -> Self {
            unimplemented!()
        }

        #[ink(message)]
        pub fn get_owner(&self) -> AccountId {
            unimplemented!()
        }

        #[ink(message)]
        pub fn get_controller(&self) -> AccountId {
            unimplemented!()
        }

        #[ink(message)]
        pub fn set_name(&mut self, name: String){
            unimplemented!()
        }

        #[ink(message)]
        pub fn get_min_create_ticket_fee(&mut self) -> Balance{
            unimplemented!()
        }
        
        #[ink(message)]
        pub fn get_name(&self) -> String {
            unimplemented!()
        }
    }
}