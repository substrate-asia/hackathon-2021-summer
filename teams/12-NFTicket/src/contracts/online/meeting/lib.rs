#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;
pub use self::meeting::Meeting;

#[ink::contract]
mod meeting {
    use template::TemplateTrait;
    use nfticket::NfticketTrait;
    use ink_env::call::FromAccountId;
    use ink_prelude::vec::Vec;
    use primitives::{Meeting as MeetingStruct, MeetingError, CheckRecord, MeetingStatus};
    use core::default::Default;
    use ink_prelude::string::ToString;
    use ink_storage::collections::{HashMap as StorageMap};

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
        ticket_map: StorageMap< u32,(u32,u64)>,     // 已经售出门票

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

        /// 购买门票
        #[ink(message, payable)]
        pub fn buy_ticket(&mut self, amount: u32) -> Result<(), MeetingError>{
            let mut nfticket = self.get_nfticket_instance();
            let meeting: MeetingStruct = nfticket.get_meeting( self.env().account_id() );

            // 必须 active 才能卖票
            assert!( meeting.status == MeetingStatus::Active, "InactiveMeeting");
            // 必须在售卖时间范围内
            assert!( meeting.start_sale_time < self.env().block_timestamp() && meeting.end_sale_time > self.env().block_timestamp(), "OutOfSale" );
            
            // 检查剩余门票是否足够
            assert!( self.max_tickets >= (self.sold_tickets + amount), "NotEnoughTicketsLeft");

            // 检查付款是否足够
            let total = self.price * amount as u128;
            let transferred: Balance = self.env().transferred_balance();
            assert!( total <= transferred , "InsufficientPayment");

            // 计算需要用于创建门票的费用
            let mut template = self.get_template_instanc();
            let create_fee = template.get_min_create_ticket_fee();

            // 调用 nfticket 的 create_ticket 创建NFT门票
            let caller = self.env().caller();
            use ink_lang::ForwardCallMut;

            // 循环创建门票NFT
            for _n in 1..amount {
                self.sold_tickets = self.sold_tickets.checked_add(1).unwrap();

                let (class_id, nft_id) = <&mut NfticketTrait>::call_mut(&mut nfticket)
                .create_ticket(caller, self.sold_tickets.to_string() )
                .transferred_value(create_fee)
                .fire()
                .unwrap()
                .unwrap();

                // 保存每一张门票
                self.ticket_map.insert(self.sold_tickets, (class_id, nft_id));
            }
            
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

        /// 验票员验票
        #[ink(message)]
        pub fn check_ticket(&mut self, ticket:(u128, u128), timestamp: u64, sign: Hash) -> Result<(), MeetingError>{
            // 必须是验票员
            self.ensure_inspector();
            // 验票时间必须是当前区块生产前后5分种内
            let check_split: u64;
            if self.env().block_timestamp() > timestamp{
                check_split = self.env().block_timestamp() - timestamp;
            }else{
                check_split = timestamp - self.env().block_timestamp();
            }
            assert!( check_split< 300, "CheckTimeout");

            // TODO：检查HASH

            // 添加到验票记录
            let caller = self.env().caller();
            let recode = CheckRecord{
                inspector: caller,
                timestamp: timestamp,
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

        // 返回一个主合约
        fn get_nfticket_instance(&self) -> NfticketTrait{
            let nfticket_instance: NfticketTrait = FromAccountId::from_account_id( self.controller );

            nfticket_instance
        }

        // 返回一个主合约
        fn get_template_instanc(&self) -> TemplateTrait{
            let template_instance: TemplateTrait = FromAccountId::from_account_id( self.template );

            template_instance
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
        /// 返回主合约地址
        #[ink(message)]
        pub fn get_controller(&self) -> AccountId {
            self.controller
        }
        /// 返回最大门票数
        #[ink(message)]
        pub fn get_max_tickets(&self) -> u32 {
            self.max_tickets
        }
        
        /// 返回售出门票数
        #[ink(message)]
        pub fn get_sold_tickets(&self) -> u32 {
            self.sold_tickets
        }
    }
}
