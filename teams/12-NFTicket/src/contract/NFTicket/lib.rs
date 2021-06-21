#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

/**
* 主合约
* 1. 管理和记录所有的活动模板合约( Tempate )
* 2. 管理和记录所有的活动（ Meeting )
* 3. 负责主系统以及活动模板的手续费收入分成
* 3.1 模板的提成，是通过从总得提成收入里边分一定高比例；
* 3.2 各个模板的提成比例，单独设置
*/
#[ink::contract]
mod nfticket {
    use ink_storage::{
        collections::HashMap as StorageMap,
        traits::{PackedLayout, SpreadLayout},
    };
    
    // 模板状态 Active 正常使用；Pause 暂停使用；Expired 已过期
    #[derive(
        Debug, PartialEq, Eq, Clone, scale::Encode, scale::Decode, SpreadLayout, PackedLayout,
    )]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
    )]
    enum TempalateStatus{
        Active,     // 正常使用
        Pause,      // 暂停使用
        Expired,    // 已过期
    }
    impl Default for TempalateStatus {
        fn default() -> TempalateStatus {
            TempalateStatus::Active
        }
    }

     // 模板数据结构
    #[derive(
        Debug, PartialEq, Eq, Clone, scale::Encode, scale::Decode, SpreadLayout, PackedLayout,
    )]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
    )]
    struct Template{
        owner: AccountId,   // 模板的控制人
        name: Vec<u8>,      // 模板名称
        desc: Vec<u8>,      // 模板描述
        uri: Vec<u8>,       // 模板介绍网址
        ratio: u128,        // 模板将获得的分成比例，百万分之N，
        status: TempalateStatus,         // 模板状态，1：正常；2：暂停使用；3：过期；
    }
    impl Default for Template {
        fn default() -> Template {
            Template {
                owner: Default:default(),
                name: Vec::default(),
                desc: Vec::default(),
                uri: Vec::default(),
                ratio: Default:default(),
                status: Default::default(),
            }
        }
    }

    // 活动状态 Active: 正常可用的，Pause: 暂停使用
    #[derive(
        Debug, PartialEq, Eq, Clone, scale::Encode, scale::Decode, SpreadLayout, PackedLayout,
    )]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
    )]
    enum MeetingStatus{
        Active,
        Pause,
    }
    impl Default for MeetingStatus {
        fn default() -> MeetingStatus {
            MeetingStatus::Active
        }
    }

    // 活动数据
    #[derive(
        Debug, PartialEq, Eq, Clone, scale::Encode, scale::Decode, SpreadLayout, PackedLayout,
    )]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
    )]
    struct Meeting{
        template: AccountId,   // 模板账号
        name: Vec<u8>,      // 活动名称
        desc: Vec<u8>,      // 活动介绍
        poster: Vec<u8>,    // 活动海报地址
        uri: Vec<u8>,        // 活动网址
        start_time: u64,       // 活动开始时间
        end_time: u64,         // 活动结束时间
        start_sale_time: u64,       // 开始售卖时间
        end_sale_time: u64,       // 开始售卖时间
        class_id: u64,      // 关联的 NFT 集合ID
        status: MeetingStatus,  // 会议状态
    }
    impl Default for Meeting {
        fn default() -> Meeting {
            Meeting {
                template: Default::default(),
                name: Default::default(),
                desc: Default::default(),
                poster: Default::default(),
                start_time: Default::default(),
                end_time: Default::default(),
                start_sale_time: Default::default(),
                end_sale_time: Default::default(),
                class_id: Default:default(),
                status: MeetingStatus::default(),
            }
        }
    }

    // 添加模板事件
    #[ink(event)]
    pub struct template_added {
        #[ink(topic)]
        template: AccountId,
        #[ink(topic)]
        owner: AccountId,
        #[ink(topic)]
        name: Vec<u8>,
        #[ink(topic)]
        desc: Vec<u8>,
        #[ink(topic)]
        uri: Vec<u8>,
        #[ink(topic)]
        ratio: u128,
    }

    // 修改模板事件
    #[ink(event)]
    pub struct template_modified {
        #[ink(topic)]
        template: AccountId,
        #[ink(topic)]
        owner: AccountId,
        #[ink(topic)]
        name: Vec<u8>,
        #[ink(topic)]
        desc: Vec<u8>,
        #[ink(topic)]
        uri: Vec<u8>,
        #[ink(topic)]
        ratio: u128,
    }

    // 模板状态变更事件
    #[ink(event)]
    pub struct tempalte_status_changed {
        #[ink(topic)]
        template: AccountId,
        status: TempalateStatus,
    }

    // 模板状态变更事件
    #[ink(event)]
    pub struct template_transfered {
        #[ink(topic)]
        template: AccountId,
        #[ink(topic)]
        from: AccountId,
        to: AccountId,
    }

    // 添加会议事件
    #[ink(event)]
    pub struct meeting_added {
        #[ink(topic)]
        meeting_address: AccountId,
        #[ink(topic)]
        template: AccountId,
        #[ink(topic)]
        name: Vec<u8>,
        #[ink(topic)]
        desc: Vec<u8>,
        #[ink(topic)]
        poster: Vec<u8>,
        #[ink(topic)]
        uri: Vec<u8>,
        #[ink(topic)]
        start_time: u64,
        #[ink(topic)]
        end_time: u64,
        #[ink(topic)]
        start_sale_time: u64,
        #[ink(topic)]
        end_sale_time: u64,
    }






    #[ink(storage)]
    pub struct Nfticket {
        owner: AccountId,       // 系统管理员账号
        templates: StorageMap<AccountId, Template>,   // 模板列表，使用模板合约address 作为 key
        meetings: StorageMap<AccountId, Meeting>,   // 会议列表，使用会议合约address 作为 key
        min_ticket_price: Balance,  // 创建门票的时候，一张门票最少需要付多少钱
        balance: Balance,   // 系统收入账户余额
        teplate_balances: StorageMap<AccountId, Balance>, // 模板账户余额

    }

    impl Nfticket {
        #[ink(constructor)]
        pub fn new() -> Self {
            let caller = Self::env().caller();
            Self {
                owner: caller,
                templates: Default::default(),
                meetings: Default::default(),
                min_ticket_price: Default::default(),
                balance: Default::default(),
                teplate_balances: Default::default(),
            }
        }

        #[ink(constructor)]
        pub fn default() -> Self {
            Self::new()
        }

/** TODO
        /**
        Owner转移相关方法，可以更换主合约的控制人
        1. 验证操作人是否 owner;
        */
        #[ink(message)]
        pub fn owner_transfer(mut &self, new_owner: AccountId){

        }

        /**
        修改最小门票付款限额
        1. 验证操作人是否 owner;
        */
        pub fn set_min_ticket_price(mut &self, min_ticket_price:Balance){

        }

        /**
         添加模板
         1. 验证操作人是否 系统owner ;
         2. 验证 address 是否有重复;
         3. 调用模板合约的 get_controler 确认主控合约地址是将当前合约
         4. 添加模板
         5. 触发事件 template_added(AccountId, AccountId,)
         */
        pub fn add_template(template_address:AccountId, owner: AccountId, name:Vec<u8>, desc:Vec<u8>, uri: Vec<u8>, ratio: u128){

        }
        /**
        修改模板状态
        1. 验证操作人是否 owner ;
        2. 验证模板是否有效
        3. 触发事件 tempalte_status_changed
        */
        pub fn set_template_status(template_address: AccountId, status: TemplateStatus){

        }
        /**
        修改模板信息
        1. 验证操作人是否系统 owner or 模板的 owner
        2. 验证模板是否有效
        3. 触发事件 template_modified
        */
        pub fn modify_template(template_address:AccountId, name: Vec<u8>, desc: Vec<u8>, uri: Vec<u8>, ratio: u128 ){

        }

        /**
        转移模板的 owner
        1. 仅 template 的 owner 可以调用
        2. 触发时间 template_transfered
        */
        pub fn transfer_template(template_address:AccountId, new_owner:AccountId)
        
        /**
        返回模板列表，可能需要考虑一套完整的方案，智能合约也许不能返回 hashMap
        */
        pub fn get_templates()

        /** 
        添加会议活动，仅限已登记并且处于激活状态的模板合约调用
        1. 通过调用合约地址，确认是哪个模板
        3. 确认活动地址是否重复，
        4. 确认活动参数信息
        5. 创建相应的 NFT 集合（调用 runtime 接口）
        6. 添加活动信息
        7. 触发事件 meeting_added
        */
        pub fn add_meeting(meeting_address:AccountId, /* meeting的各项参数 */){

        }
        /**
        修改活动状态，（仅限已登记的活动合约调用）
        1. 通过调用合约地址，确认是哪个活动
        2. 更新状态
        */
        pub fn set_meeting_status(status: MeetingStatus){

        }
        /**
        修改活动信息（仅限已登记的活动合约调用，修改该活动的信息）
        1. 通过调用合约地址，确认是哪个活动
        2. 确认活动信息内容
        3. 更新活动信息内容
        4. 不触发事件，由 活动合约 去触发，因为有一部分的修改，不会调用主合约(问题：是否会造成监控事件复杂？)
        */
        pub fn modify_meeting(/* meeting的各项参数 */){

        }

        /**
        返回活动列表，与获取模板一样，
        */
        pub fn get_meetings()

        /**
        系统管理员提取手续费收入到指定账户
        1. 必须 owner 调用
        2. 触发 withdraw 时间
        */
        pub fn withdraw(to: AccountId, amount: Balance){

        }

        /**
        模板的管理员，提取模板分成收入到指定账户
        1. 指定模板必须有效
        2. 调用者必须是模板的 owner
        */
        pub fn template_withdraw(template: Account, to:AccountId, amount:Balance){

        }

        /**
        返回系统账号收入的余额
        */
        pub fn get_balance()->Balance{

        }

        /**
        返回模板收入账号的余额
        */
        pub fn get_temlate_balance()->Balance{

        }

        /**
        收取购票手续费
        受活动合约调用，当活动合约售出门票的时候，按百分比将一定比例的收入转到控制合约；
        1. 通过调用合约地址确认是哪个活动的收入；
        2. 通过活动列表，确认是哪个活动模板的活动
        3. 按照 ratio 的比例，将一部分收入记到相应模板下
        3. 触发事件 ticket_fee_received
        */

        /**
        创建门票
        1. 调用本合约，必须付费，并且必须大于等于 min_ticket_price
        2. 仅能通过活动合约调用；
        3. 通过调用的活动合约地址，知道是哪个活动，知道是哪个模板生成的，给相应的模板记分成收入；
        4. 调用 runtime 的 NFT 创建接口，创建门票 NFT，并将门票NFT发放给 buyer
        5. 返回创建的 class_id 和 NFT_ID的元组
        6. 触发时间： ticket_created
        */
        #[ink(message, payable)]
        pub fn create_ticket(&mut self, buyer: AccountId, ext_data: Vec<u8>)->（u128, u128){

        }

*/
    }
}
