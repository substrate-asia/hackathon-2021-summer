#![cfg_attr(not(feature = "std"), no_std)]

pub use self::meeting::Meeting;
use ink_lang as ink;

/**
 活动合约
 1. 由活动模板合约创建，每个模板匹配一个活动合约
 2. 每个活动会独立部署一个合约(实例);
 3. 所有合约的操作都是通过活动合约实现；
*/
#[ink::contract]
pub mod meeting {
    use ink_prelude::vec::Vec;
    use ink_prelude::vec;
    use ink_storage::{
        collections::HashMap as StorageMap,
        traits::{PackedLayout, SpreadLayout},
    };


    // 检票历史记录
    #[derive(
        Debug, PartialEq, Eq, Clone, scale::Encode, scale::Decode, SpreadLayout, PackedLayout,
    )]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
    )]
    struct CheckRecord{
        inspector: AccountId, // 检票人
        timestamp: u128, // 检票时间戳
        block: u128, // 检票记录区块
    }
    impl Default for CheckRecord {
        fn default() -> CheckRecord {
            CheckRecord {
                inspectors: Default::default(),
                timestamp: Default::default(),
                block: Default::default(),
            }
        }
    }


    #[ink(storage)]
    pub struct Meeting {

        // 这个是关于活动控制部分，不属于活动跟本身的信息
        controller: AccountId,   // 主合约地址
        template: AccountId,   // 主合约地址
        owner: AccountId,   // 活动管理员

        // 活动基础信息 
        //      这部分信息的修改，通过主合约来修改
        // name: Vec<u8>, // 活动名称
        // desc: Vec<u8>, // 活动描述
        // uri: Vec<u8>,  // 活动网址 
        // poster: Vec<u8>, // 活动海报地址
        // start_time: u64,       // 活动开始时间
        // end_time: u64,         // 活动结束时间
        // start_sale_time: u64,       // 开始售卖时间
        // end_sale_time: u64,         // 开始售卖时间
        // status: MeetingStatus,  // 会议状态

        // 活动配置参数
        price: Balance,         // 收费方式=Uniform 时候生效
        max_tickets: u64,       // 总共可以出手多少车票
        inspectors: StorageMap<AccountId, bool>, // 检票员

        // 用户参与后会产生的数据
        tickets: StorageMap<(u128,u128),(u8,u8,u8)>,     // 已经售出门票，由元组组成key,元组元素为 分区序号，排号，座号，值是门票NFT（包括集合ID和NFT ID）

        check_records: StorageMap<(u128, u128), Vec<CheckRecord> >, // 检票记录： 
    }

    impl Meeting {

        #[ink(constructor)]
        pub fn new( controller: AccountId, template: AccountId) -> Self {
            let caller = Self::env().caller();
            Self {
                controller: controller,
                template: template,
                owner: caller,
                price: 0,
                max_tickets: 0,
                inspectors: StorageMap::new(),
                tickets: StorageMap::new(),
                check_records: StorageMap::new(),
            }
        }

        /**
        转移 owner
        1. 必须 owner 才可以调用
        */
        #[ink(message)]
        pub fn transfer_owner(&mut self, new_owner:AccountId){
            let caller = Self::env().caller();
            if caller == self.owner {
                self.owner = new_owner
            }
        }

        #[ink(message)]
        pub fn get_owner(&self)-> AccountId{
            self.owner
        }

        #[ink(message)]
        pub fn get_self(&self)-> AccountId{
            Self::env().account_id()
        }

        /**
        更新活动信息，包括：活动基础信息、活动配置参数
        1. 只有 owner 可以调用修改，如果活动处于 active 状态 或者 活动已经有售卖门票，暂时不允许修改；
        2. 如果涉及到基础信息部分的更新，需要调用主合约更新；
        3. 修改成功后，触发事件 meeting_modified
        */
        #[ink(message)]
        pub fn modify_meeting(&mut self, max_tickets: u64, price: Balance ){
            assert_eq!(Self::env().caller(), self.owner);
            assert_ne!(self.tickets.len(), 0);
            // todo: 添加活动状态字段，检查状态
            self.max_tickets = max_tickets;
            self.price = price;

            // todo: 触发事件
        }


        /**
        购买门票
        2. 需要确认转过来的钱是否大于等于票价（如果大于需要退回一部分）
        3. 调用主合约创建 NFT 门票，需要支付服务费：服务费按票价比例(ratio)，但是不得低于 min_ticket_price 
        4. 更新 tickets 
        5. 返回
        */
        #[ink(message)]
        pub fn buy_ticket(&mut self) -> (u128,u128) {
            (0,0)
        }

        /**
        添加验票员
        1. 只能由 owner 调用
        2. 需要检查是否已经存在了
        3. 触发时间 inspector_added
        */
        #[ink(message)]
        pub fn add_inspector(&mut self, inspector: AccountId){
            assert_eq!(Self::env().caller(), self.owner);
            self.inspectors.insert(inspector, true);
        }

        /**
        移除验票员
        1. 只能由 owner 调用
        2. 需要检查是否存在
        3. 触发事件 inspector_removed
        */
        #[ink(message)]
        pub fn remove_inspector(&mut self, inspector: AccountId){
            assert_eq!(Self::env().caller(), self.owner);
            self.inspectors.take(inspector, true);
        }

        /**
        检票
        1. 只能由 owner 或者 inspector 调用
        2. 检查 NFT门票 是否有效；
        3. 检查时间戳和当前区块时间戳间隔是否在 N 分钟以内
        4. 获取 NFT门票当前的拥有账号
        5. 检测 NFT门票的class_ID、nft_id, 和 timestamp 的 hash值与 提供的hash是否匹配
        6. 添加检票记录 check_records ，返回 true
        7. 触发事件 ticket_checked
        */
        #[ink(message)]
        pub fn check_ticket(&mut self, ticket: (u128, u128), timestamp: u128, hash: Vec<u8> ) -> bool {
            if Self::env().caller() != self.owner &&
            self.inspectors.contains_key(&Self::env().caller()) == false {
                return false
            }
            if self.tickets.contains_key(&ticket) == false {
                return false
            }
            if timestamp as u64 - Self::env().block_timestamp() > 1000 {
                return false
            }
            let r = CheckRecord {
                timestamp: timestamp.clone(),
                inspectors: Self::env().caller(),
                block: Self::env().block_number(),
            };
            let mut v = self.check_records.take(&ticket);
            let vec = match v {
                None => vec![r],
                Some(x) => vec![r], // fixme
            }
            self.check_records.insert(ticket, vec);

            // todo: 调用 event
        }

        /**
        返回所有的门票检票记录
        */
        #[ink(message)]
        pub fn get_check_records(&self, ticket: (u128, u128) ){

        }

        /**
        提取门票收入
        1. 只能由 owner 调用
        2. 
        */
        #[ink(message)]
        pub fn withdraw(&mut self, to:AccountId, amount:Balance){

        }
    }
}
