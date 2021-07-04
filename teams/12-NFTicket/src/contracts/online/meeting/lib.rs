#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;
pub use self::meeting::Meeting;

#[ink::contract]
mod meeting {

    use template::TemplateTrait;
    use ink_env::call::FromAccountId;
    use primitives::{CheckRecord, MeetingError};
    use ink_storage::Vec;
    use ink_storage::{
        collections::HashMap as StorageMap,
    };

    #[ink(storage)]
    pub struct Meeting {
        controller: AccountId,
        template: AccountId,
        owner: AccountId,
        
        price: Balance,         // 收费方式=Uniform 时候生效
        sold_tickets: u32,      // 已经售出多少门票
        max_tickets: u32,       // 总共可以出售多少车票
        inspector_map: StorageMap<AccountId, bool>, // 检票员

        // 用户参与后会产生的数据
        ticket_map: StorageMap<(u128,u128),(u8,u8,u8)>,     // 已经售出门票，由元组组成key,元组元素为 分区序号，排号，座号，值是门票NFT（包括集合ID和NFT ID）

        check_times: StorageMap<(u128, u128), u32>, // 检票次数(获得最大次数后，通过 check_records 轮询可以查到各个检票记录数据)
        check_records: StorageMap<(u128, u128, u32), CheckRecord> // 检票记录
    }

    impl Meeting {
        /// Constructor that initializes the `bool` value to the given `init_value`.
        #[ink(constructor)]
        pub fn new(owner: AccountId, template: AccountId, controller: AccountId) -> Self {
            Self {
                controller: controller,
                template: template,
                owner: owner,
                price: Default::default(),
                sold_tickets: Default::default(),
                max_tickets: Default::default(),
                inspector_map: Default::default(),
                ticket_map: Default::default(),
                check_times: Default::default(),
                check_records: Default::default(),
            }
        }

        /// 修改门票价格、门票总数
        #[ink(message)]
        pub fn modify_meeting(&mut self,max_tickets: u32, price: Balance) -> Result<(), MeetingError>{
            self.ensure_owner();

            if max_tickets < self.sold_tickets {
                return Err(MeetingError::LessThanSoldTickets)
            }
            let mut template_instance: TemplateTrait = FromAccountId::from_account_id(self.template);
            if price < template_instance.get_min_create_ticket_fee() {
                return Err(MeetingError::LessThanCreateTicketFee)
            }
            self.max_tickets = max_tickets;
            self.price = price;

            Ok(())
        }

        /// 添加检票员
        #[ink(message)]
        pub fn add_inspector(&mut self, inspector: AccountId){
            self.ensure_owner();
            self.inspector_map.insert(inspector, true);
        }

        /// 移除验票员
        #[ink(message)]
        pub fn remove_inspector(&mut self, inspector: AccountId){
            self.ensure_owner();
            let _ = self.inspector_map.take(&inspector);
        }
        
        #[ink(message)]
        pub fn check_ticket(&mut self, ticket:(u128, u128) ) -> Result<(), MeetingError>{
            self.ensure_inspector();
            let caller = self.env().caller();
            let recode = CheckRecord{
                inspector: caller,
                timestamp: self.env().block_timestamp(),
                block: self.env().block_number()
            };
            let times = self.check_times.get( &ticket ).unwrap_or(&0u32) + 1u32;
            self.check_times.insert(ticket, times);

            self.check_records.insert((ticket.0, ticket.1, times), recode);

            Ok(())
        }

        /// 转让所有权
        #[ink(message)]
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

        /// 检查是否管理员或者检票员
        fn ensure_inspector(&self){
            let caller = self.env().caller();
            if self.owner == caller{
                return ()
            }
            assert!(self.inspector_map.contains_key(&caller), "NotInspector");
        }

        /// 返回模板合约
        #[ink(message)]
        pub fn get_template(&self) -> AccountId {
            self.template
        }
        /// 返回主合约
        #[ink(message)]
        pub fn get_controller(&self) -> AccountId {
            self.controller
        }
        /// 返回主合约
        #[ink(message)]
        pub fn get_max_tickets(&self) -> u32 {
            self.max_tickets
        }
    }
}
