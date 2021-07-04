#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

#[ink::contract]
mod meeting {
    #[ink(storage)]
    pub struct Meeting {
        
    }

    impl Meeting {
        #[ink(constructor)]
        pub fn new(init_value: bool) -> Self {
            Self { value: init_value }
        }

        #[ink(message)]
        pub fn get(&self) -> bool {
            self.value
        }
    }
}
