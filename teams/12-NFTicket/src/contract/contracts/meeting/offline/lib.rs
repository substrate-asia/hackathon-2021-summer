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
pub use self::meeting::Meeting;
use ink_lang as ink;

#[ink::contract]
mod meeting {
    use ink_env::{Clear, hash::{Blake2x256, CryptoHash, HashOutput}};
    #[cfg(not(feature = "ink-as-dependency"))]
    use ink_prelude::vec::Vec;
    use ink_storage::{Lazy, collections::HashMap, traits::{PackedLayout, SpreadLayout}};
    use primitives::TickeResult;

    /// The ERC-20 error types.
    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        /// Returned if not enough balance to fulfill a request is available.
        InsufficientBalance,
        /// Returned if not enough allowance to fulfill a request is available.
        InsufficientAllowance,
    }

    pub type Result<T> = core::result::Result<T, Error>;

    /// a simple template contract.
    #[ink(storage)]
    pub struct Meeting {
        template: AccountId,   // 模板账号
        name: Vec<u8>,         // 活动名称
        desc: Vec<u8>,         // 活动介绍
        poster: Vec<u8>,       // 活动海报地址
        uri: Vec<u8>,          // 活动网址
        start_time: u64,       // 活动开始时间
        end_time: u64,         // 活动结束时间
        start_sale_time: u64,  // 开始售卖时间
        end_sale_time: u64,    // 开始售卖时间
        class_id: u64,         // 关联的 NFT 集合ID
        status: MeetingStatus, // 会议状态
        zone_id: u32,          //会议区域划分
        ticket_id:u32,
        ticket_map:HashMap<u32,Ticket>, //ticker存放map
    }

    impl Default for Meeting {
        fn default() -> Self {
            Meeting {
                template: Default::default(),
                name: Default::default(),
                desc: Default::default(),
                poster: Default::default(),
                uri: Default::default(),
                start_time: Default::default(),
                end_time: Default::default(),
                start_sale_time: Default::default(),
                end_sale_time: Default::default(),
                class_id: Default::default(),
                status: MeetingStatus::Active,
                zone_id: Default::default(),
                ticket_id:Default::default(),
                ticket_map:Default::default(),
            }
        }
    }

    #[derive(
        Debug, Clone, PartialEq, Eq, scale::Encode, scale::Decode, SpreadLayout, PackedLayout,
    )]
    #[cfg_attr(
        feature = "std",
        derive(::scale_info::TypeInfo, ::ink_storage::traits::StorageLayout)
    )]
    struct Zone{
        id:u32,             //id
        desc:Vec<u8>,       //描述
        ticke_numbers:u32   //可售票数
    }

    impl Zone{
        pub fn new(id:u32,desc:Vec<u8>,ticke_numbers:u32)->Self{
            Self{
                id,
                desc,
                ticke_numbers,
            }
        }
    }

    #[derive(
        Debug, Clone, PartialEq, Eq, scale::Encode, scale::Decode, SpreadLayout, PackedLayout,
    )]
    #[cfg_attr(
        feature = "std",
        derive(::scale_info::TypeInfo, ::ink_storage::traits::StorageLayout)
    )]
    pub struct Ticket {
        template: AccountId,    //模板地址
        meeting:AccountId,      //活动地址
        hash: Vec<u8>,          //hash值
        price: Balance,         //价格
        zone_id:u8              //区域.
    }

    impl Ticket{
        pub fn new(template:AccountId,meeting:AccountId,price:Balance,zone_id:u8,ticket_id:u32)->Self{
            // 此处的生成hash的方法极度不合理.需要将template+meeting+price一起生成encode后得到进行hash运算.
            let mut template_code=scale::Encode::encode(&template);
            let mut meeting_code=scale::Encode::encode(&meeting);
            template_code.append(&mut meeting_code);
            let mut as_byte = ticket_id.to_be_bytes().to_vec();
            template_code.append(&mut as_byte);
            // let random_hash:[u8] = ink_env::random(template_code).unwrap().0;
            // template_code.append(random_hash);
            let hash = scale::Encode::encode(&template_code);
            
            let mut hash_output = <<Blake2x256 as HashOutput>::Type as Default>::default();
            <Blake2x256 as CryptoHash>::hash(&hash, &mut hash_output);
            Self{
                template,
                meeting,
                hash:hash_output.into(),
                price,
                zone_id,
            }
        }
    }

    #[derive(
        Debug, Copy, Clone, PartialEq, Eq, scale::Encode, scale::Decode, SpreadLayout, PackedLayout,
    )]
    #[cfg_attr(
        feature = "std",
        derive(::scale_info::TypeInfo, ::ink_storage::traits::StorageLayout)
    )]
    enum MeetingStatus {
        Active,
        Pause,
    }

    // 会议添加事件
    #[ink(event)]
    pub struct MeetingAdded {
        #[ink(topic)]
        meeting_address: AccountId,
        #[ink(topic)]
        template: AccountId,
        #[ink(topic)]
        name: Vec<u8>,
        // #[ink(topic)]
        // desc: Vec<u8>,
        // #[ink(topic)]
        // poster: Vec<u8>,
        // #[ink(topic)]
        // uri: Vec<u8>,
        // #[ink(topic)]
        // start_time: u64,
        // #[ink(topic)]
        // end_time: u64,
        // #[ink(topic)]
        // start_sale_time: u64,
        // #[ink(topic)]
        // end_sale_time: u64,
    }

    impl Meeting {
        /// Creates a new ERC-20 contract with the specified initial supply.
        #[ink(constructor)]
        pub fn new(template_address:AccountId,name: Vec<u8>, desc: Vec<u8>,) -> Self {
            let mut hash_output = <<Blake2x256 as HashOutput>::Type as Default>::default();
            <Blake2x256 as CryptoHash>::hash(&name, &mut hash_output);
            Meeting{
                template:template_address,
                name,
                desc,
                poster: Default::default(),
                uri: Default::default(),
                start_time: Default::default(),
                end_time: Default::default(),
                start_sale_time: Default::default(),
                end_sale_time: Default::default(),
                class_id: Default::default(),
                status: MeetingStatus::Active,
                zone_id: Default::default(),
                ticket_id:Default::default(),
                ticket_map: Default::default(),
            }
        }


        /// 购买ticker,需要支付一定数量的币.
        /// meeting_addr会议地址,zone_id区域ID,seat_id 第几排,第几列
        #[ink(message,payable)]
        pub fn buy_ticket(&mut self, meeting_addr: AccountId,zone_id:u32,seat_id:Option<(u32,u32)>) -> Result<TickeResult> {
            let ticket_price = self.get_ticket_price(zone_id,seat_id);
            let income: Balance = self.env().transferred_balance();
            ///保证用户传送的金额必须大于票价

            // todo buy ticket
            let result: TickeResult = TickeResult {
                price: 100u128,
                maker: AccountId::from([0x01; 32]),
            };
            Ok(result)
        }

        /// 得到某个区域的票价
        fn get_ticket_price(&self,zone_id:u32,seat_id:Option<(u32,u32)>)->Option<Balance>{
            //TODO 确保这个位置是有效的.
            //TODO 获取这个位置的票价
            return Some(20000000000u128.into());
        }

        //确保这个位置是否已经售出
        

        #[ink(message)]
        pub fn get_id(&self) -> u32 {
            return 1u32;
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
