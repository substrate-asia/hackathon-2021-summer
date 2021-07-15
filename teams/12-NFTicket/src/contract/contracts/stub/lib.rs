#![cfg_attr(not(feature = "std"), no_std)]

pub use self::stub::MainStub;
use ink_lang as ink;

#[ink::contract]
mod stub {
    use ink_prelude::vec::Vec;
    use primitives::{MeetingError, TickedStatus, Ticket, TicketNft};

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
    }
    #[ink(storage)]
    pub struct MainStub {}

    // pub type Result<T> = core::result::Result<T, Error>;
    impl MainStub {
        
        #[ink(constructor)]
        pub fn new(_fee_taker: AccountId) -> Self {
            unimplemented!()
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
        #[ink(message)]
        pub fn add_meeting(
            &mut self,
            _meeting_addr: AccountId,
            _creator:AccountId,
            _name: Vec<u8>,
            _desc: Vec<u8>,
            _poster: Vec<u8>,
            _uri: Vec<u8>,
            _start_time: u64,
            _end_time: u64,
            _start_sale_time: u64,
            _end_sale_time: u64,
            _publisher:Vec<u8>,//会议发起者
            _min_price:u128,     //最低价
        ) -> Result<u32,MeetingError >{
            unimplemented!()
        }

        /**
        创建门票
        1. 调用本合约，必须付费，并且必须大于等于 min_ticket_fee
        2. 仅能通过活动合约调用；
        3. 通过调用的活动合约地址，知道是哪个活动，知道是哪个模板生成的，给相应的模板记分成收入；
        4. 调用 runtime 的 NFT 创建接口，创建门票 NFT，并将门票NFT发放给 buyer
        5. 返回创建的 class_id 和 NFT_ID的元组
        6. 触发事件： ticket_created
        */
        #[ink(message, payable)]
        pub fn buy_ticket(&mut self,_creator:AccountId, _ticket:Ticket,)->Result<TicketNft,MeetingError>{
            unimplemented!()
        }

        #[ink(message)]
        pub fn get_id(&self) -> u32 {
            unimplemented!()
        }

        /// 修改ticket状态
        #[ink(message)]
        pub fn update_ticket_sell_status(&mut self,_user:AccountId,_meeting_addr: AccountId,_ticket_id:u32,_status:TickedStatus)->bool{
            unimplemented!()
        }
    }
}
