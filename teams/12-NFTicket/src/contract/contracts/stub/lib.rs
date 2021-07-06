#![cfg_attr(not(feature = "std"), no_std)]

pub use self::stub::MainStub;
use ink_lang as ink;

#[ink::contract]
mod stub {
    use ink_prelude::vec::Vec;
    use primitives::{MeetingError, Ticket, TicketNft};

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
    }
    #[ink(storage)]
    pub struct MainStub {}

    // pub type Result<T> = core::result::Result<T, Error>;
    impl MainStub {
        
        #[ink(constructor)]
        pub fn new(fee_taker: AccountId) -> Self {
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
        pub fn buy_ticket(&mut self,creator:AccountId, _ticket:Ticket,)->Result<TicketNft,MeetingError>{
            unimplemented!()
        }

        #[ink(message)]
        pub fn get_id(&self) -> u32 {
            unimplemented!()
        }
    }
}
