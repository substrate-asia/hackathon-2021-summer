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
use ink_lang as ink;
// #[ink::contract(env = ink_log::CustomEnvironment)]
#[ink::contract]
mod meeting {
    use ink_storage::{collections::{HashMap as StorageHashMap, hashmap::Keys}, lazy::Lazy};
    #[cfg(not(feature = "ink-as-dependency"))]
    use ink_env::call::FromAccountId;
    use stub::TemplateStub;
    use ink_prelude::vec::Vec;

    /// A simple ERC-20 contract.
    #[ink(storage)]
    pub struct Meeting {
        //合约模板hash和address映射.
        template_hash_address_map:StorageHashMap<Hash,AccountId>,
        //所有者
        owner:AccountId,
        
        fee_rate:(u128,u128),
        /// 收取费用的人
        fee_taker:AccountId,
    }


    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        /// Returned if not enough balance to fulfill a request is available.
        NotOwner,
    }

    impl Meeting {
        /// Creates a new ERC-20 contract with the specified initial supply.
        #[ink(constructor)]
        pub fn new(fee_taker:AccountId) -> Self {
            let caller = Self::env().caller();
            let instance = Self {
                template_hash_address_map:Default::default(),
                owner:caller,
                fee_rate:(10,100),
                fee_taker,
            };
            instance
        }

        /// 更新费率
        #[ink(message)]
        pub fn update_fee_rate(&mut self,fee_rate:(u128,u128))->bool{
            self.ensure_owner();
            self.fee_rate = fee_rate;
            true
        }

        //查询当前费率
        #[ink(message)]
        pub fn get_fee_rate(&self)->(u128,u128){
            self.fee_rate
        }

        /// 开始收费门票.
        #[ink(message,payable)]
        pub fn buy_ticket(&mut self,ticker:Hash,template_hash:Hash)->bool{
            ink_env::debug_message("received payment");
            let income:Balance = self.env().transferred_balance();
            //做前置检查.判断大于0
            assert!(income>0,"income is negtive");
            // 购买票,如果成功则返回需要的资金.
            //根据template_id查询template合约地址.
            let template_address = self.template_hash_address_map.get(&template_hash);
            //开始扣除资金.
            
            // ink_log::info!(target: "received payment: {}", income);
            // 计算需要的手续费
            let income_per:Balance = income.saturating_mul(Balance::from(self.fee_rate.0));
            let fee = income_per.checked_div(Balance::from(self.fee_rate.1)).unwrap();
            // let fee = self.fee_rate.0.saturating_mul(income.into()).saturating_div(self.fee_rate.1);
            // 把资金按照百分比给资金转给资金账户
            self.env().transfer(self.fee_taker,fee);
            /// 将剩余的金额转账给会议举办者.
            
            true
        }
        

        /// 添加合约的id和hash值
        #[ink(message)]
        pub fn add_template_hash(&mut self,hash:Hash,account_id:AccountId)->bool{
            let value = self.template_hash_address_map.insert(hash,account_id);
            if let None = value {
                //如果该key不存在,返回true
                true
            }else{
                false
            }
        }

        /// 查询所有模板的hash值队列
        #[ink(message)]
        pub fn get_all_template_hash(&self)->Vec<Hash> {
            let mut result:Vec<Hash> = Vec::new();
            for k in self.template_hash_address_map.keys(){
                result.push(*k);
            }
            result
            // let temp_map:Vec<Hash> = self.template_index_hash_map.iter().map(|k,v|k).collect();
            // temp_map
        }

        #[ink(message)]
        pub fn get_template_address(&self,hash:Hash)->AccountId {
            self.template_hash_address_map.get(&hash).unwrap().clone()
        }

        #[ink(message)]
        pub fn get_template_id_by_hash(&self,hash:Hash) -> u32 {
            ink_env::debug_message("-------------1");
            let address:AccountId = self.template_hash_address_map.get(&hash).unwrap().clone();
            let template:TemplateStub = FromAccountId::from_account_id(address);
            ink_env::debug_message("-------------2");
            template.get_id()
        }

        #[ink(message)]
        pub fn get_template_id(&self,account_id:AccountId) -> u32 {
            ink_env::debug_message("-------------1");
            let template:TemplateStub = FromAccountId::from_account_id(account_id);
            ink_env::debug_message("-------------2");
            template.get_id()
        }

        /// Panic if `owner` is not an owner,
        fn ensure_owner(&self) {
            assert_eq!(self.owner,self.env().caller(),"not owner");
        }
    }
}
