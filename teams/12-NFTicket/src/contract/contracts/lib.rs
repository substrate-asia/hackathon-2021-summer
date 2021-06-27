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
mod nfticket {
    #[cfg(not(feature = "ink-as-dependency"))]
    use ink_env::call::FromAccountId;
    use ink_prelude::vec::Vec;
    use ink_prelude::format;
    use ink_env::{AccountId, debug_print};
    use ink_storage::{collections::{HashMap as StorageHashMap, Stash, hashmap::Keys}, lazy::Lazy};
    use primitives::MeetingError;
    use primitives::Ticket;
    use stub::MainStub;

    pub type Result<T> = core::result::Result<T, MeetingError>;
    const min_ticket_fee:u128 = 100u128;
    /// A simple ERC-20 contract.
    #[ink(storage)]
    pub struct NftTicket {
        //合约模板hash和address映射.
        template_hash_address_map: StorageHashMap<Hash, AccountId>,
        //所有者
        owner: AccountId,
        //费率
        fee_rate: (u128, u128),
        // 收取费用的人
        fee_taker: AccountId,
        // 会议收集
        meeting_coll:Stash<AccountId>,
    }


    impl NftTicket {
        /// Creates a new ERC-20 contract with the specified initial supply.
        #[ink(constructor)]
        pub fn new(fee_taker: AccountId) -> Self {
            let caller = Self::env().caller();
            let instance = Self {
                template_hash_address_map: Default::default(),
                owner: caller,
                fee_rate: (10, 100),
                fee_taker,
                meeting_coll:Default::default(),
            };
            instance
        }

        /// 更新费率
        #[ink(message)]
        pub fn update_fee_rate(&mut self, fee_rate: (u128, u128)) -> bool {
            self.ensure_owner();
            self.fee_rate = fee_rate;
            true
        }

        //查询当前费率
        #[ink(message)]
        pub fn get_fee_rate(&self) -> (u128, u128) {
            self.fee_rate
        }

        /// Owner转移相关方法，可以更换主合约的控制人
        ///验证操作人是否 owner;
        #[ink(message)]
        pub fn owner_transfer(&mut self, new_owner: AccountId)->bool{
            self.ensure_owner();
            self.owner = new_owner;
            return true;
        }

        /// 添加会议地址
        #[ink(message)]
        pub fn add_meeting(&mut self,meeting_addr:AccountId)->bool{
            self.meeting_coll.put(meeting_addr);
            true
        }


        ///
        /// 购买门票
        /// 3. 通过调用的活动合约地址，知道是哪个活动，知道是哪个模板生成的，给相应的模板记分成收入；
        /// 4. 调用 runtime 的 NFT 创建接口，创建门票 NFT，并将门票NFT发放给 buyer
        /// 5. 返回创建的 class_id 和 NFT_ID的元组
        /// 6. 触发事件： ticket_created
        #[ink(message, payable)]
        pub fn buy_ticket(&mut self, _ticket:Ticket)->bool{
            ink_env::debug_message("-------------------------buy_ticket开始调用");
            // 1. 调用本合约，必须付费，并且必须大于等于 min_ticket_fee暂缓
            let main_fee:Balance=self.env().transferred_balance();
            //2. 仅能通过活动合约调用；
            let caller = self.env().caller();
            //查询调用者是否是来自合约.
            if let Some(_)=self.meeting_coll.get(&caller){
                
            }

            // assert!(main_fee>min_ticket_fee,"main_fee is smaller than min_ticket_fee");
            true
        }

        /// 开始收费门票.
        // #[ink(message, payable)]
        // pub fn buy_ticket(&mut self, ticker: Hash, template_hash: Hash,maker:AccountId) -> Result<bool> {
        //     let income: Balance = self.env().transferred_balance();
        //     ink_env::debug_message(&format!("-------------------------received payment {:?}",income));
        //     //做前置检查.判断大于0
        //     assert!(income > 0, "income is negtive");
        //     // 购买票,如果成功则返回需要的资金.
        //     //根据template_id查询template合约地址.
        //     ink_env::debug_message(&format!("-------------------------template_hash is {:?}",template_hash));
        //     let template_address: &AccountId =
        //         self.template_hash_address_map.get(&template_hash).unwrap();
        //     ink_env::debug_message(&format!("-------------------------template_address {:?}",*template_address));
        //     let mut template: MainStub = FromAccountId::from_account_id(*template_address);
        //     ink_env::debug_message(&format!("-------------------------template {:?}",template));
        //     let ticket_price_result = template.buy_ticket(ticker);
        //     ink_env::debug_message(&format!("-------------------------ticket_price_result {:?}",ticket_price_result));
        //     let result= match ticket_price_result {
        //         Ok(ticker_result) => {
        //             //开始扣除资金.
        //             assert!(income >= ticker_result.price,"not enough money!");
        //             // 计算需要的手续费
        //             let fee: Balance = ticker_result.price.checked_mul(Balance::from(self.fee_rate.0)).unwrap().checked_div(Balance::from(self.fee_rate.1)).unwrap();
        //             // 把资金按照百分比给资金转给资金账户
        //             let trans=self.env().transfer(self.fee_taker, fee);
        //             if let Err(_) = trans{
        //                 return Err(MeetingError::TransferError);
        //             }
        //             //将买票的收入转账给发布活动的账户.
        //             let contract_fee = ticker_result.price.checked_sub(fee).unwrap();
        //             // self.env().transfer(ticker_result.maker, contract_fee);
        //             self.env().transfer(maker, contract_fee);
        //             Ok(true)
        //         }
        //         Err(_) => Err(MeetingError::CallBuyTickerError),
        //         // Err(_) => panic!("call buy ticker error!"),
        //     };
        //     return result;
        // }

        /// 添加合约的id和hash值
        #[ink(message)]
        pub fn add_template_hash(&mut self, hash: Hash, template_address: AccountId) -> bool {
            let value = self.template_hash_address_map.insert(hash, template_address);
            if let None = value {
                //如果该key不存在,返回true
                true
            } else {
                false
            }
        }

        /// 查询所有模板的hash值队列
        #[ink(message)]
        pub fn get_all_template_hash(&self) -> Vec<Hash> {
            let mut result: Vec<Hash> = Vec::new();
            for k in self.template_hash_address_map.keys() {
                result.push(*k);
            }
            result
            // let temp_map:Vec<Hash> = self.template_index_hash_map.iter().map(|k,v|k).collect();
            // temp_map
        }

        #[ink(message)]
        pub fn get_template_address(&self, hash: Hash) -> AccountId {
            self.template_hash_address_map.get(&hash).unwrap().clone()
        }

        #[ink(message)]
        pub fn get_template_id_by_hash(&self, hash: Hash) -> u32 {
            ink_env::debug_message("-------------1");
            let address: AccountId = self.template_hash_address_map.get(&hash).unwrap().clone();
            let template: MainStub = FromAccountId::from_account_id(address);
            ink_env::debug_message("-------------2");
            template.get_id()
        }

        #[ink(message)]
        pub fn get_template_id(&self, account_id: AccountId) -> u32 {
            ink_env::debug_message("-------------333");
            let template: MainStub = FromAccountId::from_account_id(account_id);
            ink_env::debug_message("-------------444");
            template.get_id()
        }

        /// Panic if `owner` is not an owner,
        fn ensure_owner(&self) {
            assert_eq!(self.owner, self.env().caller(), "not owner");
        }
    }
}
