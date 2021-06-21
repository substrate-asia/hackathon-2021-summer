#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

/**
 活动合约
 1. 由活动模板合约创建，每个模板匹配一个活动合约
 2. 每个活动会独立部署一个合约(实例);
 3. 所有合约的操作都是通过活动合约实现；
*/
#[ink::contract]
mod meeting {
    use ink_storage::{
        collections::HashMap as StorageMap,
        traits::{PackedLayout, SpreadLayout},
    };


    // 定价方式，Uniform 统一定价，Partition 分区定价
    #[derive(
        Debug, PartialEq, Eq, Clone, scale::Encode, scale::Decode, SpreadLayout, PackedLayout,
    )]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
    )]
    enum PriceType{
        Uniform,
        Partition,
    }
    impl Default for PriceType {
        fn default() -> PriceType {
            PriceType::Uniform
        }
    }

    // 场地区域设置，name 区域名称，rows:有多少排，cols: 每排多少座
    #[derive(
        Debug, PartialEq, Eq, Clone, scale::Encode, scale::Decode, SpreadLayout, PackedLayout,
    )]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
    )]
    struct Zone{ // 场地区域设置
        name: Vec<u8>, // 区域名称
        rows: u8, // 行
        cols: u8, // 列
    }
    impl Default for Zone {
        fn default() -> Zone {
            Zone {
                name: Default::default(),
                rows: Default::default(),
                cols: Default::default(),
                disables: Default::default(),
            }
        }
    }

    // 座位状态，Disabled 座位不可用；Empty 座位空闲；Ticket(u128, u128) 座位售出，里边两个数是售出NFT门票的 class_id 和 nft_id
    #[derive(
        Debug, PartialEq, Eq, Clone, scale::Encode, scale::Decode, SpreadLayout, PackedLayout,
    )]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
    )]
    enum SeatStatus{
        Disabled,
        Empty,
        Ticket(u128, u128)
    }
    impl Default for SeatStatus {
        fn default() -> SeatStatus {
            SeatStatus::Empty
        }
    }

    // 检票历史记录
    #[derive(
        Debug, PartialEq, Eq, Clone, scale::Encode, scale::Decode, SpreadLayout, PackedLayout,
    )]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
    )]
    struct check_record{
        inspectors: AccountId, // 检票人
        timestamp: u128, // 检票时间戳
        block: u128, // 检票记录区块
    }
    impl Default for check_record {
        fn default() -> check_record {
            check_record {
                inspector: Default::default(),
                timestamp: Default::default(),
                block: Default::default(),
            }
        }
    }


    #[ink(storage)]
    pub struct Meeting {

        // 这个是关于活动控制部分，不属于活动跟本身的信息
        controller: AccountId,   // 主合约地址
        owner: AccountId,   // 活动管理员
        min_ticket_price: Balance,  // 最低票价设定，定价的时候，单张票价不允许低于此价格
        ratio: u8,  // 按票价提取多少比例作为服务费，不过服务费不能低于 min_ticket_price

        // 活动基础信息
        //      思考问题：这部分与主合约的相同，两边是否选一遍保存，只保存一份就可以？

        name: Vec<u8>, // 活动名称
        desc: Vec<u8>, // 活动描述
        uri: Vec<u8>,  // 活动网址 
        poster: Vec<u8>, // 活动海报地址
        start_time: u64,       // 活动开始时间
        end_time: u64,         // 活动结束时间
        start_sale_time: u64,       // 开始售卖时间
        end_sale_time: u64,         // 开始售卖时间
        status: MeetingStatus,  // 会议状态

        // 活动配置参数
        local_address: Vec<u8>, // 获取举办地址
        zones: StorageMap<u8, Zone>,    // 活动场地的分区配置，key 为分区的序号
        price_type: PriceType,  // 收费方式
        price: Balance,         // 收费方式=Uniform 时候生效
        prices: StorageMap<u8, Balance> //收费明细，收费方式=Partition时候看，生效；
        seats: StorageMap<(u8,u8,u8), SeatStatus>,    // 活动场地的不可用的座位，是由元组组成的key，元组元素为 分区序号，排号，座号。这样可以快速检测座位是否被禁用
        inspectors: StorageMap<AccountId, bool>, // 检票员

        // 用户参与后会产生的数据
        tickets: StorageMap<(u128,u128),(u8,u8,u8)>,     // 已经售出门票，由元组组成key,元组元素为 分区序号，排号，座号，值是门票NFT（包括集合ID和NFT ID）

        check_records: StorageMap<(u128, u128), Vec<check_record> >, // 检票记录： 
    }

    impl Meeting {

        #[ink(constructor)]
        pub fn new() -> Self {
            Self {  }
        }

/**
TODO:
        /**
        更新活动信息，包括：活动基础信息、活动配置参数
        1. 可以讨论：是否需要拆分成多个方法，设置不同的参数？
        2. 至于 owner 可以调用修改，如果活动处于 active 状态 或者 活动已经有售卖门票，暂时不允许修改；
        3. 如果涉及到基础信息部分的更新，需要调用主合约更新；
        4. 修改成功后，触发事件 meeting_modified
        */
        pub fn modify_meeting(){

        }

        /**
        转移 owner
        1. 必须 owner 才可以调用
        */
        pub fn transfer_owner(mut &self, new_owner:AccountId){

        }

        /**
        更新活动状态
        1. 仅 owner 可以调用；
        2. 需要调用 主合约 更新状态
        3. 触发 meeting_status_changed
        */
        pub fn set_meeting_status(status: MeetingStatus){

        }

        /**
        购买门票
        1. 需要检查作为是否可用（1）是否被禁用；（2）是否已经卖出去了；
        2. 需要确认转过来的钱是否大于等于票价（如果大于需要退回一部分）
        3. 调用主合约创建 NFT 门票，需要支付服务费：服务费按票价比例(ratio)，但是不得低于 min_ticket_price 
        4. 更新 seats、tickets 
        5. 返回
        */
        pub fn buy_ticket(zone_id:u8, row: u8, col: u8) -> (u128,u128) {

        }

        /**
        添加验票员
        1. 只能由 owner 调用
        2. 需要检查是否已经存在了
        3. 触发时间 inspector_added
        */
        pub fn add_inspector(mut &self, inspector: AccountId){

        }

        /**
        移除验票员
        1. 只能由 owner 调用
        2. 需要检查是否存在
        3. 触发事件 inspector_removed
        */
        pub fn remove_inspector(mut &self, inspector: AccountId){

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
        pub fn check_ticket(mut &self, ticket: (u128, u128), timestamp: u128, hash: Vec<u8> ) -> bool {

        }

        /**
        返回所有的门票检票记录
        */
        pub fn get_check_records(&self, ticket: (u128, u128) ){

        }

        /**
        提取门票收入
        1. 只能由 owner 调用
        2. 
        */
        pub fn withdraw(mut &self, to:AccountId, amount:Balance){

        }
*/
    }
}
