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
pub use nftmart_contract::*;
#[ink::contract(env = CustomEnvironment)]
mod nfticket {
    #[cfg(not(feature = "ink-as-dependency"))]
    use super::*;
    use ink_env::call::FromAccountId;
    use ink_prelude::format;
    use ink_prelude::vec::Vec;
    use ink_storage::collections::stash;
    use ink_storage::{
        collections::{hashmap::Keys, HashMap as StorageHashMap, Stash as StrorageStash},
        lazy::Lazy,
    };
    use primitives::{MeetingStatus, Template, TicketNft};
    use primitives::TemplateStatus;
    use primitives::Ticket;
    use primitives::{Meeting, MeetingError};
    use stub::MainStub;
    use ink_prelude::vec;

    const min_ticket_fee: u128 = 100u128;
    /// A simple ERC-20 contract.
    #[ink(storage)]
    pub struct NftTicket {
        //合约模板hash和address映射.
        template_hash_address_map: StorageHashMap<Hash, AccountId>,
        //所有者
        owner: AccountId,
        //费率
        fee_rate: (u128, u128),
        // 收取费用的人,删除收费者,币留在合约内.TODO,owner可以把合约的资金转到指定的账户.
        fee_taker: AccountId,
        // 会议集合
        meeting_map: StorageHashMap<AccountId, Meeting>,
        //模板集合
        template_map: StorageHashMap<AccountId, Template>,
        // 记录会议对应的classId
        classid_map:StorageHashMap<AccountId,ClassId>,
    }

    /// 模板创建事件
    #[ink(event)]
    pub struct TemplateAdded {
        #[ink(topic)]
        template_addr: AccountId, //模板地址
        #[ink(topic)]
        creator: AccountId, //创建人
    }
    /// 模板创建事件
    #[ink(event)]
    pub struct TemplateModified {
        #[ink(topic)]
        template_addr: AccountId, //模板地址
        #[ink(topic)]
        creator: AccountId, //创建人
    }

    /// 活动创建事件
    #[ink(event)]
    pub struct MeetingAdded {
        #[ink(topic)]
        meeting_addr: AccountId, //模板地址
        #[ink(topic)]
        creator: AccountId, //创建人
        #[ink(topic)]
        class_id:ClassId
    }

    /// 活动创建事件
    #[ink(event)]
    pub struct MeetingModified {
        #[ink(topic)]
        meeting_addr: AccountId, //模板地址
        #[ink(topic)]
        creator: AccountId, //创建人
    }

    /// 活动创建事件
    #[ink(event)]
    pub struct TicketSelled {
        #[ink(topic)]
        ticket: Ticket, //模板地址
    }

    #[ink(event)]
    pub struct CreateClassFromContract {
        #[ink(topic)]
        owner: AccountId,
        class_id: ClassId,
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
                meeting_map: Default::default(),
                template_map: Default::default(),
                classid_map: Default::default(),
                
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
        pub fn owner_transfer(&mut self, new_owner: AccountId) -> bool {
            self.ensure_owner();
            self.owner = new_owner;
            return true;
        }

        /**
        添加模板
        1. 验证操作人是否 系统owner ;
        2. 验证 address 是否有重复;
        3. 调用模板合约的 get_controller 确认主控合约地址是将当前合约
        4. 添加模板数据
        5. 触发事件 template_added(AccountId, AccountId,)
        */
        #[ink(message)]
        pub fn add_template(
            &mut self,
            template_addr: AccountId,
            name: Vec<u8>,
            desc: Vec<u8>,
            uri: Vec<u8>,
            ratio: u128,
        ) -> bool {
            self.ensure_owner();
            let caller = Self::env().caller();
            //验证 address 是否有重复;
            if self.template_map.contains_key(&template_addr) {
                ink_env::debug_message(&format!("-------------------------income {:?}", template_addr));
            } else {
                let my_template = Template {
                    template_addr,
                    name,
                    desc,
                    uri,
                    ratio,
                    status: primitives::TemplateStatus::Active,
                };
                self.template_map.insert(template_addr, my_template);
            }
            Self::env().emit_event(TemplateAdded {
                template_addr: template_addr,
                creator: caller,
            });
            true
        }
        // /**
        // 修改模板状态
        // 1. 验证操作人是否 owner ;
        // 2. 验证模板是否有效
        // 3. 触发事件 tempalte_status_changed
        // */
        #[ink(message)]
        pub fn set_template_status(
            &mut self,
            template_addr: AccountId,
            status: TemplateStatus,
        ) -> bool {
            self.ensure_owner();
            self.template_map.get_mut(&template_addr).map(|t| {
                t.status = status;
            });
            true
        }
        /**
        修改模板信息
        1. 验证操作人是否系统 owner or 模板的 owner（需要通过 活动模板合约获取）
        2. 验证模板是否有效
        3. 触发事件 template_modified
        */
        #[ink(message)]
        pub fn modify_template(
            &mut self,
            template_addr: AccountId,
            name: Vec<u8>,
            desc: Vec<u8>,
            uri: Vec<u8>,
            ratio: u128,
        ) -> bool {
            self.ensure_owner();
            let caller = Self::env().caller();
            let my_template = Template {
                template_addr,
                name,
                desc,
                uri,
                ratio,
                status: primitives::TemplateStatus::Active,
            };
            self.template_map.insert(template_addr, my_template);
            Self::env().emit_event(TemplateModified {
                template_addr: template_addr,
                creator: caller,
            });
            true
        }

        /// 返回模板列表，可能需要考虑一套完整的方案，智能合约也许不能返回 hashMap
        #[ink(message)]
        pub fn get_all_templates(&self) -> Vec<Template> {
            self.template_map.values().map(|v| v.clone()).collect()
        }

        /**
        添加会议活动，仅限已登记并且处于激活状态的模板合约调用
        1. 通过调用合约地址，确认是哪个模板
        3. 确认活动地址是否重复，
        4. 需要验证:(1)名称必须有;(2)几个时间的合理性：开始时间必须比结束时间早，活动结束后，售卖应该停止
        5. 创建相应的 NFT 集合（调用 runtime 接口）
        6. 添加活动信息
        7. 触发事件 meeting_added
        */
        /// 创建活动,返回值nft classId,返回值可以不予理会
        #[ink(message)]
        pub fn add_meeting(
            &mut self,
            meeting_addr: AccountId,
            name: Vec<u8>,
            desc: Vec<u8>,
            poster: Vec<u8>,
            uri: Vec<u8>,
            start_time: u64,
            end_time: u64,
            start_sale_time: u64,
            end_sale_time: u64,
        ) -> Result<u32,MeetingError >{
            let mut my_class_id:ClassId = 0u32;
            let caller = Self::env().caller();
            // 判断是否重复
            if self.meeting_map.contains_key(&meeting_addr) {
                ink_env::debug_message(&format!("-------------------------add meeting meeting_addr {:?}", meeting_addr));
            } else {
                // TODO前置验证 需要验证:(1)名称必须有;(2)几个时间的合理性：开始时间必须比结束时间早，活动结束后，售卖应该停止
                let meeting = Meeting {
                    meeting_addr,
                    name:name.clone(),
                    desc:desc.clone(),
                    poster,
                    uri,
                    start_time,
                    end_time,
                    start_sale_time,
                    end_sale_time,
                    status:primitives::MeetingStatus::Active,
                };
                self.meeting_map.insert(meeting_addr, meeting);
                ink_env::debug_message(&format!("-------------------------create_class name:{:?},desc:{:?}", name.clone(),desc.clone()));
                // TODO 创建相应的 NFT 集合（调用 runtime 接口）
                let (_, class_id) = self.env().extension().create_class(name.clone(), name, desc, 0).unwrap();
                //调试信息
                // let class_id = 123;
                self.classid_map.insert(meeting_addr, class_id);
                my_class_id=class_id;
                Self::env().emit_event(MeetingAdded{meeting_addr,creator:caller,class_id});
            }
            Ok(my_class_id)
        }

        // 创建NFT类别
        #[ink(message)]
        pub fn create_class(
            &mut self,
            metadata: Vec<u8>,
            name: Vec<u8>,
            description: Vec<u8>,
            properties: u8,
        ) -> Result<(), NFTMartErr> {
            let (owner, class_id) = self.env().extension().create_class(metadata, name, description, properties)?;
            self.env().emit_event(CreateClassFromContract { owner, class_id });
            Ok(())
        }

        #[ink(message)]
        pub fn tokens(&self, class_id: ClassId, token_id: TokenId) -> (Metadata, Quantity, BlockNumber) {
            let info: Option<ContractTokenInfo<_, _, _, _, _>> = self.env().extension().tokens(class_id, token_id);
            let info = info.unwrap_or_default();
            (info.metadata, info.quantity, info.data.create_block)
        }

        /// 返回活动列表
        #[ink(message)]
        pub fn get_all_meeting(&self) -> Vec<Meeting> {
            self.meeting_map.values().map(|v|v.clone()).collect()
        }


        #[ink(message)]
        pub fn get_class_id(&self,meeeting_addr:AccountId) -> u32 {
            (*self.classid_map.get(&meeeting_addr).unwrap()).clone()
        }

        /**
        修改活动状态，（仅限已登记的活动合约调用）
        1. 通过调用合约地址，确认是哪个活动
        2. 更新状态
        3. 触发 meeting_status_changed 事件
        4. 如果状态和先前状态一致，仍然返回 true ，只是不触发事件
        */
        #[ink(message)]
        pub fn set_meeting_status(&mut self,meeting_addr:AccountId, status: MeetingStatus)->bool{
            self.meeting_map.get_mut(&meeting_addr).map(|t| {
                t.status = status;
            });
            true
        }

        /**
        修改活动信息（ 仅 活动的 owner 可以调用 ）
        1. 通过调用合约地址，确认活动
        2. 需要验证:(1)名称必须有;(2)几个时间的合理性：开始时间必须比结束时间早，活动结束后，售卖应该停止
        3. 更新信息；
        4. 触发 meeting_modified 事件
        5. 更新成功，返回 true
        */
        #[ink(message)]
        pub fn modify_meeting(&mut self, meeting_addr:AccountId, name: Vec<u8>, desc: Vec<u8>, poster: Vec<u8>, uri: Vec<u8>, start_time: u64, end_time: u64, start_sale_time: u64, end_sale_time: u64)->bool{
            self.ensure_owner();
            let caller = Self::env().caller();
            let my_meeting = Meeting {
                meeting_addr,
                name,
                desc,
                poster,
                uri,
                start_time,
                end_time,
                start_sale_time,
                end_sale_time,
                status:primitives::MeetingStatus::Active,
            };
            self.meeting_map.insert(meeting_addr, my_meeting);
            Self::env().emit_event(MeetingModified {
                meeting_addr: meeting_addr,
                creator: caller,
            });
            true
        }

        ///
        /// 购买门票
        /// 3. 通过调用的活动合约地址，知道是哪个活动，知道是哪个模板生成的，给相应的模板记分成收入；
        /// 4. 调用 runtime 的 NFT 创建接口，创建门票 NFT，并将门票NFT发放给 buyer
        /// 5. 返回创建的 class_id 和 NFT_ID的元组
        /// 6. 触发事件： ticket_created
        #[ink(message, payable)]
        pub fn buy_ticket(&mut self, _ticket: Ticket) -> Result<TicketNft,MeetingError> {
            ink_env::debug_message("-------------------------buy_ticket开始调用");
            let mut ticket_nft:TicketNft = Default::default();
            // 1. 调用本合约，必须付费，并且必须大于等于 min_ticket_fee
            let main_fee: Balance = self.env().transferred_balance();
            assert!(main_fee>=min_ticket_fee,"转账金额必须大于最小费用");
            ink_env::debug_message(&format!("-------------------------收到的费用{:?}",main_fee));
            //2. 仅能通过活动合约调用；
            let caller = self.env().caller();
            //查询调用者是否是来自合约.
            if let Some(_) = self.meeting_map.get(&caller) {
                let calss_id = self.classid_map.get(&_ticket.meeting).unwrap();
                
                let (_class_owner, _ticket_owner, _class_id, token_id, quantity) = self.env().extension()
                .proxy_mint(&_ticket.buyer, *calss_id, vec![1], 1,Some(false))
                .map_err(|_|MeetingError::NftCallerError)?;
                ticket_nft = TicketNft{
                    _class_owner,
                    _ticket_owner,
                    _class_id,
                    token_id,
                    quantity,
                };
                // 存储 token_id和数量
                Self::env().emit_event(TicketSelled{
                    ticket:_ticket,
                });
            }else{
                ink_env::debug_message("-------------------------错误:当前合约只能通过活动合约调用!");
                //触发pannic,整个事务回滚.
                panic!("错误:当前合约只能通过活动合约调用!");
            }
            return Ok(ticket_nft)
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

        // /// 添加合约的id和hash值
        // #[ink(message)]
        // pub fn add_template_hash(&mut self, hash: Hash, template_address: AccountId) -> bool {
        //     let value = self
        //         .template_hash_address_map
        //         .insert(hash, template_address);
        //     if let None = value {
        //         //如果该key不存在,返回true
        //         true
        //     } else {
        //         false
        //     }
        // }

        

        /// Panic if `owner` is not an owner,
        fn ensure_owner(&self) {
            assert_eq!(self.owner, self.env().caller(), "not owner");
        }
    }
}
