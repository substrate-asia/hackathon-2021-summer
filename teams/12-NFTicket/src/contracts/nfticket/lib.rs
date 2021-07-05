#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;
pub use nftmart_contract::*;
#[ink::contract(env = CustomEnvironment)]
mod nfticket {
    use super::*;
    use template::TemplateTrait;
    use ink_env::call::FromAccountId;
    // use ink_lang::ToAccountId;
    use ink_prelude::string::String;
    use ink_prelude::vec::Vec;
    use primitives::{Meeting, MeetingStatus, NFTicketError};
    use primitives::{Template, TemplateStatus};
    use ink_storage::collections::{HashMap as StorageMap};
    // use ink_env::{debug_message,debug_print,debug_println};

    #[cfg(not(feature = "ink-as-dependency"))]
    #[ink(storage)]
    pub struct Nfticket {
        owner: AccountId,
        min_create_meeting_fee: Balance,
        min_create_ticket_fee: Balance,
        template_map: StorageMap<AccountId, Template>,
        meeting_map: StorageMap<AccountId, Meeting>,
        classid_map: StorageMap<AccountId,ClassId>,
    }

    /// 模板创建事件
    #[ink(event)]
    pub struct TemplateAdded {
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

    impl Nfticket {
        /// 创建合约 min_create_meeting_fee 创建会议最小支付的代币，min_create_ticket_fee 创建门票最少需要支付的代币
        #[ink(constructor)]
        pub fn new(min_create_meeting_fee:Balance, min_create_ticket_fee:Balance) -> Self {
            let caller = Self::env().caller();

            Self {
                owner: caller,
                min_create_meeting_fee: min_create_meeting_fee,
                min_create_ticket_fee: min_create_ticket_fee,
                meeting_map: Default::default(),
                template_map: Default::default(),
                classid_map: Default::default(),
            }
        }
        /// 设置最小创建活动的费用
        #[ink(message)]
        pub fn set_min_create_meeting_fee(&mut self, min_create_meeting_fee: Balance) {
            self.ensure_owner();

            self.min_create_meeting_fee = min_create_meeting_fee;
        }
        /// 返回最小创建活动的费用
        #[ink(message)]
        pub fn get_min_create_meeting_fee(&self) -> Balance {
            self.min_create_meeting_fee
        }

        /// 设置最小创建门票的费用
        #[ink(message)]
        pub fn set_min_create_ticket_fee(&mut self, min_create_ticket_fee: Balance) {
            self.ensure_owner();

            self.min_create_ticket_fee = min_create_ticket_fee;
        }
        /// 返回最小创建门票的费用
        #[ink(message)]
        pub fn get_min_create_ticket_fee(&self) -> Balance {
            self.min_create_ticket_fee
        }

        /// 添加活动模板合约（如果相同地址，可实现修改功能）
        #[ink(message)]
        pub fn add_template(
            &mut self,
            template_addr: AccountId,
            name: String,
            desc: String,
            uri: String,
            ratio: u128,
        ) -> Result<(), NFTicketError> {
            self.ensure_owner();
            let caller = Self::env().caller();

            // 模板的 controller 必须是当前合约
            let template_instance: TemplateTrait = FromAccountId::from_account_id(template_addr);
            if template_instance.get_controller() != Self::env().account_id() {
                return Err(NFTicketError::ControllerError)
            }
            // 直接 insert ，如果有重复的会自动替换
            let template = Template {
                template_addr,
                name,
                desc,
                uri,
                ratio,
                status: TemplateStatus::Active,
            };
            self.template_map.insert(template_addr, template);
            Self::env().emit_event(TemplateAdded {
                template_addr: template_addr,
                creator: caller,
            });

            Ok(())
        }

        /// 修改模板的状态信息
        #[ink(message)]
        pub fn set_template_status(
            &mut self,
            template_addr: AccountId,
            status: TemplateStatus,
        ) -> Result<(), NFTicketError> {
            self.ensure_owner();
            self.template_map.get_mut(&template_addr).map(|t| {
                t.status = status;
            });
            
            Ok(())
        }

        /// 返回模板列表
        #[ink(message)]
        pub fn get_all_templates(&self) -> Vec<Template> {
            self.template_map.values().map(|v| v.clone()).collect()
        }

        /// 添加活动
        #[ink(message, payable)]
        pub fn add_meeting(
            &mut self,
            meeting_addr: AccountId,
            name: String,
            desc: String,
            poster: String,
            uri: String,
            start_time: u64,
            end_time: u64,
            start_sale_time: u64,
            end_sale_time: u64,
        ) -> Result<u32, NFTicketError >{
            let transferred: Balance = self.env().transferred_balance();
            if transferred < self.min_create_meeting_fee {
                return Err(NFTicketError::LessThanMinCreateMeetingFee)
            }

            let caller = Self::env().caller();
            // 判断 caller 是否是模板合约
            // if !self.template_map.contains_key( &caller ) {
            //     return Err(NFTicketError::OnlyTemplateContractCall)
            // }
            let creator = caller;

            let meeting = Meeting {
                template: creator,
                meeting: meeting_addr,
                name: name.clone(),
                desc: desc.clone(),
                poster,
                uri,
                start_time,
                end_time,
                start_sale_time,
                end_sale_time,
                status: MeetingStatus::Stop,
            };

            self.meeting_map.insert(meeting_addr, meeting);

            // 调用 Runtime 创建门票NFT的class，并存下ID
            let creator = Self::env().account_id();
            // let class_id = 100u32;
            let (_, class_id) = self.env().extension().create_class(
                    &creator,
                    name.clone().into_bytes(),
                    name.into_bytes(),
                    desc.into_bytes(),
                    0u8
                )
                .unwrap();
            self.classid_map.insert(meeting_addr, class_id);

            Self::env().emit_event(MeetingAdded{meeting_addr, creator, class_id});

            Ok(class_id)
        }

        /// 修改活动状态
        #[ink(message)]
        pub fn set_meeting_status(&mut self,meeting_addr:AccountId, status: MeetingStatus)-> Result<(), NFTicketError>{
            let caller = Self::env().caller();
            // 判断 caller 是否是活动合约或者 owner
            if caller != meeting_addr || caller != self.owner {
                return Err(NFTicketError::OnlyMeetingContractOrAdministor)
            }
            self.meeting_map.get_mut(&meeting_addr).map(|t| {
                t.status = status;
            });
            
            Ok(())
        }

        /// 返回活动列表
        #[ink(message)]
        pub fn get_all_meeting(&self) -> Vec<Meeting> {
            self.meeting_map.values().map(|v|v.clone()).collect()
        }

        #[ink(message)]
        pub fn get_meeting(&self, meeting_addr: AccountId) -> Meeting{
            
            self.meeting_map.get(meeting_addr).unwrap()
        }

        /// 返回活动关联的NFT Class 的 ID
        #[ink(message)]
        pub fn get_class_id(&self,meeeting_addr:AccountId) -> u32 {
            (*self.classid_map.get(&meeeting_addr).unwrap()).clone()
        }

        /// 创建门票NFT，受活动合约调用
        #[ink(message, payable)]
        pub fn create_ticket(&mut self, buyer: AccountId, metadata: String) -> Result<(u32, u64), NFTicketError> {
            // 1. 调用本合约，必须付费，并且必须大于等于 min_ticket_fee
            let transferred: Balance = self.env().transferred_balance();
            if transferred < self.min_create_ticket_fee {
                return Err(NFTicketError::LessThanMinCreateTicketFee)
            }
            //2. 仅能通过活动合约调用；
            let caller = self.env().caller();
            
            // 判断 caller 是否是模板合约
            if !self.meeting_map.contains_key( &caller ) {
                return Err(NFTicketError::OnlyMeetingContractCall)
            }
            
            let class_id = self.classid_map.get( &caller ).ok_or( NFTicketError::ClassIdNotFound ).unwrap();

            let creator = Self::env().account_id();
            let (_, _, class_id, token_id, _) = self.env().extension().proxy_mint(&creator, &buyer, *class_id, metadata.into_bytes(), 1u64, Some(true)).unwrap();
            
            Ok((class_id, token_id))
        }
        
        /// 转让所有权
        pub fn transfer_ownership(&mut self, new_owner:AccountId){
            self.ensure_owner();
            self.owner = new_owner
        }
        /// 返回当前拥有人
        #[ink(message)]
        pub fn get_owner(&self) -> AccountId {
            self.owner
        }
        /// 如果不是管理员，就报错
        fn ensure_owner(&self) {
            assert_eq!(self.owner, self.env().caller(), "not owner");
        }

/* TODO
        #[ink(message)]
        pub fn fetch_random( &self ) -> [u8; 32] {
            let random = self.env().extension().fetch_random();
            let random = random.unwrap_or_default();
            random
        }

        #[ink(message)]
        pub fn create_class(
            &mut self,
            metadata: Metadata,
            name: Chars,
            description: Chars,
            properties: u8,
        ) -> Result<(), NFTMartErr> {
            let (owner, class_id) = self.env().extension().create_class(metadata, name, description, properties)?;
            Ok(())
        }

        #[ink(message)]
        pub fn create_class_1(
            &mut self,
            metadata: Metadata,
            name: Chars,
            description: Chars,
            properties: u8,
        ) -> Result<(), NFTMartErr> {
            let (owner, class_id) = self.env().extension().create_class_1(metadata, name, description, properties)?;
            Ok(())
        }

        #[ink(message)]
        pub fn create_class_2(
            &mut self,
            creater: AccountId,
            metadata: Metadata,
            name: Chars,
            description: Chars,
            properties: u8,
        ) -> Result<(), NFTMartErr> {
            let (owner, class_id) = self.env().extension().create_class_2(&creater ,metadata, name, description, properties)?;
            Ok(())
        }

        #[ink(message)]
        pub fn mint_nft(
            &mut self,
            creater: AccountId,
            class_id: ClassId,
            metadata: Metadata,
            quantity: Quantity,
            charge_royalty: Option<bool>,
        ) -> Result<(), NFTMartErr> {
            let (_class_owner, _beneficiary, _class_id, _token_id, _quantity) = self.env().extension().proxy_mint(
                // &Self::env().account_id(),
                &creater,
                &self.env().caller(),
                class_id,
                metadata,
                quantity,
                charge_royalty,
            )?;
            Ok(())
        }
 需要清理掉的  */
    }
}
