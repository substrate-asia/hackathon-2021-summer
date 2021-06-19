// Copyright 2018-2021 Parity Technologies (UK) Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#![cfg_attr(not(feature = "std"), no_std)]
pub use self::template::Tempalate;
use ink_lang as ink;

#[ink::contract]
mod template {
    #[cfg(not(feature = "ink-as-dependency"))]
    use ink_lang as ink;
    use ink_prelude::vec::Vec;
    use ink_storage::{collections::HashMap as StorageHashMap, lazy::Lazy};
    use ink_env::{
        hash::{
            Blake2x256,
            CryptoHash,
            HashOutput,
        },
        Clear,
    };
    /// a simple template contract.
    #[ink(storage)]
    pub struct Tempalate {
        /// 模板名称
        name: Vec<u8>,
        /// 模板说明
        desc: Vec<u8>,
        //模板hash
        id: u32,
        //收费比例
        fee:(u32,u32),
        hash_code:Hash,
        ///主合约地址
        main_address:Hash,
        /// 合约开关
        switch:bool,
        owner:AccountId,
    }

    /// Event emitted when a token transfer occurs.
    #[ink(event)]
    pub struct Transfer {
        #[ink(topic)]
        from: Option<AccountId>,
        #[ink(topic)]
        to: Option<AccountId>,
        value: Balance,
    }

    /// Event emitted when an approval occurs that `spender` is allowed to withdraw
    /// up to the amount of `value` tokens from `owner`.
    #[ink(event)]
    pub struct Approval {
        #[ink(topic)]
        owner: AccountId,
        #[ink(topic)]
        spender: AccountId,
        value: Balance,
    }

    /// The ERC-20 error types.
    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        /// Returned if not enough balance to fulfill a request is available.
        InsufficientBalance,
        /// Returned if not enough allowance to fulfill a request is available.
        InsufficientAllowance,
    }

    impl Tempalate {
        /// Creates a new ERC-20 contract with the specified initial supply.
        #[ink(constructor)]
        pub fn new(name: Vec<u8>, desc: Vec<u8>,id:u32,fee:(u32,u32)) -> Self {
            let mut hash_output =
                    <<Blake2x256 as HashOutput>::Type as Default>::default();
            <Blake2x256 as CryptoHash>::hash(&name, &mut hash_output);
            let caller = Self::env().caller();
            Self {
                name,
                desc,
                id,
                fee,
                hash_code:hash_output.into(),
                main_address:Default::default(),
                switch:Default::default(),
                owner:caller
            }
        }

        #[ink(message)]
        pub fn get_name(&self) -> Vec<u8> {
            let result = self.name.clone();
            result
        }

        #[ink(message)]
        pub fn get_desc(&self) -> Vec<u8> {
            let result = self.desc.clone();
            result
        }

        #[ink(message)]
        pub fn get_id(&self) -> u32 {
            self.id
        }

        #[ink(message)]
        pub fn get_fee(&self) -> (u32,u32) {
            self.fee
        }

        #[ink(message)]
        pub fn get_hash_code(&self) -> Hash {
            self.hash_code
        }

        #[ink(message)]
        pub fn get_owner(&self) -> AccountId {
            self.owner
        }
    }

    // #[cfg(test)]
    // mod tests {
    //     use crate::stub::TemplateStub;

    //     use super::*;
    //     use ink_lang as ink;
    //     use ink_env::{AccountId, call::FromAccountId};

    //     #[ink::test]
    //     fn it_works() {
    //         let account_id:AccountId = Default::default();
            
    //         // let template:TemplateStub = FromAccountId::from_account_id(account_id);
    //         // let id =template.get_id();
    //         // println!("id is :{}",id);


    //         // let template = Tempalate::new(vec![132,31],vec![132,31],12,(10,100));
    //         // // Can call using universal call syntax using the trait.
    //         // assert_eq!(<Tempalate as TemplateStub>::get_id(&template), 12);
    //     }
    // }
}
