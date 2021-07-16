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
    use ink_prelude::collections::BTreeMap;
    use ink_prelude::format;
    use ink_prelude::vec::Vec;
    use ink_storage::collections::stash;
    use ink_storage::{
        collections::{hashmap::Keys, HashMap as StorageHashMap, Stash as StrorageStash},
        lazy::Lazy,
    };
    use primitives::{MeetingStatus, Template, TickedStatus, TicketNft};
    use primitives::TemplateStatus;
    use primitives::Ticket;
    use primitives::{Meeting, MeetingError};
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
        // // 收取费用的人,删除收费者,币留在合约内.TODO,owner可以把合约的资金转到指定的账户.
        // fee_taker: AccountId,
        // 会议集合
        meeting_map: StorageHashMap<AccountId, Meeting>,
        //模板集合
        template_map: StorageHashMap<AccountId, Template>,
        // 记录会议对应的classId
        classid_map:StorageHashMap<AccountId,ClassId>,
        // 用户拥有的门票.StorageHashMap<用户id, BTreeMap<(meeting_addr,ticket_id),Ticket>>
        user_tickets: StorageHashMap<AccountId, BTreeMap<(AccountId,u32),Ticket>>, 
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
        pub fn new() -> Self {
            let caller = Self::env().caller();
            let instance = Self {
                template_hash_address_map: Default::default(),
                owner: caller,
                fee_rate: (10, 100),
                meeting_map: Default::default(),
                template_map: Default::default(),
                classid_map: Default::default(),
                user_tickets:Default::default(),
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

        #[ink(message)]
        pub fn get_owner(&self) -> AccountId {
            self.owner
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
        /// 创建活动,返回值nft classId,返回值可以不予理会,
        #[ink(message)]
        pub fn add_meeting(
            &mut self,
            meeting_addr: AccountId,
            creator:AccountId,
            name: Vec<u8>,
            desc: Vec<u8>,
            poster: Vec<u8>,
            uri: Vec<u8>,
            start_time: u64,
            end_time: u64,
            start_sale_time: u64,
            end_sale_time: u64,
            publisher:Vec<u8>,//会议发起者
            min_price:u128,     //最低价
        ) -> Result<u32,MeetingError >{
            let mut my_class_id:ClassId = 0u32;
            let caller = Self::env().caller();
            // TODO 判断只能模板合约调用
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
                    publisher,//会议发起者
                    min_price,//最低价
                };
                self.meeting_map.insert(meeting_addr, meeting);
                ink_env::debug_message(&format!("-------------------------create_class name:{:?},desc:{:?}", name.clone(),desc.clone()));
                // TODO 创建相应的 NFT 集合（调用 runtime 接口）
                let (_, class_id) = self.env().extension().create_class(&creator,name.clone(), name, desc, 0).unwrap();
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
            creator:AccountId,
            metadata: Vec<u8>,
            name: Vec<u8>,
            description: Vec<u8>,
            properties: u8,
        ) -> Result<(), NFTMartErr> {
            let (owner, class_id) = self.env().extension().create_class(&creator,metadata, name, description, properties)?;
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
        
        /// 返回用户的所有已经购买的票.
        #[ink(message)]
        pub fn get_user_all_ticket(&self,user:AccountId) -> Vec<Ticket> {
            let user_tiket_map = self.user_tickets.get(&user).unwrap();
            user_tiket_map.iter().map(|(_,v)|v.clone()).collect()
        }

        #[ink(message)]
        pub fn get_user_ticket(&self,user:AccountId,ticket_status:TickedStatus) -> Vec<Ticket> {
            let user_tiket_map = self.user_tickets.get(&user).unwrap();
            user_tiket_map.iter().map(|(_,v)|v.clone()).filter(|t|t.status==ticket_status).collect()
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
        pub fn modify_meeting(&mut self, meeting_addr:AccountId, name: Option<Vec<u8>>, desc: Option<Vec<u8>>, 
            poster: Option<Vec<u8>>, uri: Option<Vec<u8>>, start_time: Option<u64>, end_time: Option<u64>, start_sale_time: Option<u64>, end_sale_time: Option<u64>,
            publisher:Option<Vec<u8>>,
            min_price:Option<u128>,
        )->bool{
            self.ensure_owner();
            let caller = Self::env().caller();
            let my_meeting = self.meeting_map.get_mut(&meeting_addr).unwrap();
            if let Some(t)=name{
				my_meeting.name = t;
			}
            if let Some(t)=desc{
				my_meeting.desc = t;
			}
            if let Some(t)=poster{
				my_meeting.poster = t;
			}
            if let Some(t)=uri{
				my_meeting.uri = t;
			}
            if let Some(t)=start_time{
				my_meeting.start_time = t;
			}
            if let Some(t)=end_time{
				my_meeting.end_time = t;
			}
            if let Some(t)=start_sale_time{
				my_meeting.start_sale_time = t;
			}
            if let Some(t)=end_sale_time{
				my_meeting.end_sale_time = t;
			}
            if let Some(t)=publisher{
				my_meeting.publisher = t;
			}
            if let Some(t)=min_price{
				my_meeting.min_price = t;
			}
            
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
        pub fn buy_ticket(&mut self,creator:AccountId, _ticket: Ticket) -> Result<TicketNft,MeetingError> {
            ink_env::debug_message("-------------------------buy_ticket开始调用");
            let ticket_treemap = self.user_tickets.get_mut(&creator);
            match ticket_treemap{
                Some(ticketmap)=>{
                    ticketmap.insert((_ticket.meeting.clone(),_ticket.ticket_id.clone()),_ticket.clone());
                },
                None=>{
                    let mut ticketmap = BTreeMap::new();
                    ticketmap.insert((_ticket.meeting.clone(),_ticket.ticket_id.clone()),_ticket.clone());
                    self.user_tickets.insert(creator, ticketmap);
                }
            }
            // self.user_tickets.insert(creator, _ticket.clone());
            let mut ticket_nft:TicketNft = Default::default();
            // 1. 调用本合约，必须付费，并且必须大于等于 min_ticket_fee
            let main_fee: Balance = self.env().transferred_balance();
            assert!(main_fee>=min_ticket_fee,"转账金额必须大于最小费用");
            ink_env::debug_message(&format!("-------------------------收到的费用{:?}",main_fee));
            //2. 仅能通过活动合约调用；
            let caller = self.env().caller();
            ink_env::debug_message(&format!("-------------------------调用者为caller{:?}",caller));
            //查询调用者是否是来自合约.
            if let Some(_) = self.meeting_map.get(&caller) {
                let calss_id = self.classid_map.get(&_ticket.meeting).unwrap();
                // fn proxy_mint(creator: &ink_env::AccountId,to: &ink_env::AccountId,class_id: ClassId,metadata: Metadata,quantity: Quantity,charge_royalty: Option<bool>,) 
                // -> (ink_env::AccountId, ink_env::AccountId, ClassId, TokenId, Quantity);
                let (_class_owner, _ticket_owner, _class_id, token_id, quantity) = self.env().extension()
                .proxy_mint(&creator,&_ticket.buyer, *calss_id, vec![1], 1,Some(false)) // TODO 第四个参数不清楚应该传啥
                .map_err(|_|MeetingError::NftCallerError)?;
                ticket_nft = TicketNft{
                    _class_owner,
                    _ticket_owner,
                    _class_id,
                    token_id,
                    quantity,
                    ticket_id:_ticket.ticket_id,
                    meeting_addr: _ticket.meeting,
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

        /// 验票成功后,修改ticket的状态,只能由对应的会议调用.
        #[ink(message)]
        pub fn update_ticket_sell_status(&mut self,user:AccountId,meeting_addr: AccountId,ticket_id:u32,status:TickedStatus)->bool{
            self.user_tickets.get_mut(&user).unwrap().get_mut(&(meeting_addr,ticket_id)).unwrap().status=status;
            true
        }


        /// Panic if `owner` is not an owner,
        fn ensure_owner(&self) {
            assert_eq!(self.owner, self.env().caller(), "not owner");
        }

        #[ink(message)]
        pub fn test_block_time(&self)->u64{
			let now:u64 = Self::env().block_timestamp();
            ink_env::debug_message(&format!("now is{}",now));
			now
		}
    }

    #[cfg(not(feature = "ink-experimental-engine"))]
    #[cfg(test)]
    mod tests {
        use std::ops::Add;

        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;

        type Event = <Meeting as ::ink_lang::BaseEvent>::Type;

        use ink_lang as ink;

        /// The default constructor does its job.
        #[ink::test]
        fn new_works() {
            let mut s =12u32.to_string();
            s.push_str("rhs");
			s.push_str("abc");
            let encode_data = 12u32.to_string().add(&18u64.to_string()).add(&18u32.to_string());
            // Constructor works.
            let meeting = NftTicket::new();
			meeting.test_block_time();
        }

        #[ink::test]
        fn test_modify_meeting() {
            let account1=AccountId::from([0x01; 32]);
            // Constructor works.
            let mut meeting = NftTicket::new();
			meeting.add_meeting(account1, account1, "name".as_bytes().to_vec(), "你好,我是一个小偷".as_bytes().to_vec(), "poster".as_bytes().to_vec(),
             "uri".as_bytes().to_vec(), 1, 1, 1, 1, "publisher".as_bytes().to_vec(), 1).expect("add meeting error");
            let m1 = meeting.meeting_map.get(&account1).unwrap();
            println!("m1 is {:?}",m1);
            meeting.modify_meeting(account1, Some("namf1".as_bytes().to_vec()), None, None, None, None, None, None, None, None, None);
            let m2 = String::from_utf8(meeting.meeting_map.get(&account1).unwrap().desc.clone()).unwrap();
            println!("m2 is {:?}",m2);
        }
    }
}
