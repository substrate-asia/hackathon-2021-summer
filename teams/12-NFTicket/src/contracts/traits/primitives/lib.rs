#![cfg_attr(not(feature = "std"), no_std)]

use ink_env::{
    hash::{Blake2x256, CryptoHash, HashOutput},
    AccountId,
};
use ink_prelude::vec::Vec;
use ink_prelude::string::String;
use ink_storage::traits::{PackedLayout, SpreadLayout};


/// 主合约错误信息
#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum NFTicketError{
    ControllerError,    // 模板合约的 controller 信息错误
    OnlyTemplateContractCall, // 仅能通过模板合约调用
    OnlyMeetingContractCall,  // 仅限通过活动合约调用
    OnlyMeetingContractOrAdministor,    // 仅活动合约或者系统管理员可调用
    LessThanMinCreateMeetingFee,    // 小于创建会议的费用
    LessThanMinCreateTicketFee, // 小于创建门票的费用
    ClassIdNotFound,    // 没有找到 class id
}

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub struct TickeResult {
    pub price: u128,
    pub maker: ink_env::AccountId,
}

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum MeetingError {
    LessThanCreateTicketFee,    // 票价低于最低创建门票费用
    LessThanSoldTickets,    // 设置的门票数小于已经售出的门票数

    NotOwner,
    CallBuyTickerError,
    TransferError,
}

#[derive(Debug, Clone, PartialEq, Eq, scale::Encode, scale::Decode, SpreadLayout, PackedLayout)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
)]
pub struct Ticket {
    template_addr: AccountId, //模板id
    meeting: AccountId,       //活动地址
    hash: Vec<u8>,            //hash值
    price: u128,              //价格
    zone_id: u32,             //区域.
    seat_id: Option<(u32, u32)>,
}

/// 模板状态
#[derive(Debug, Clone, PartialEq, Eq, scale::Encode, scale::Decode, SpreadLayout, PackedLayout)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
)]
pub enum TemplateStatus {
    Active,
    Stop,
}
/// 模板合约错误信息
#[derive(Debug, Clone, PartialEq, Eq, scale::Encode, scale::Decode, SpreadLayout, PackedLayout)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
)]
pub enum TemplateError {
    LessThanCreateMeetingFee, // 小于创建活动需要的费用
    MeetingDeployFail,  // 活动合约部署失败
}

// 模板数据结构
#[derive(Debug, Clone, PartialEq, Eq, scale::Encode, scale::Decode, SpreadLayout, PackedLayout)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
)]
pub struct Template {
    pub template_addr: AccountId,
    pub name: String, // 模板名称
    pub desc: String, // 介绍内容
    pub uri: String, // 介绍网址
    pub ratio: u128, // 服务费提成比例
    pub status: TemplateStatus,
}

/// 活动数据
#[derive(Debug, Clone, PartialEq, Eq, scale::Encode, scale::Decode, SpreadLayout, PackedLayout)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
)]
pub struct Meeting {
    pub template: AccountId,
    pub meeting: AccountId,
    pub name: String,
    pub desc: String,
    pub poster: String,
    pub uri: String,
    pub start_time: u64,
    pub end_time: u64,
    pub start_sale_time: u64,
    pub end_sale_time: u64,
    pub status: MeetingStatus,
}

/// 活动状态
#[derive(Debug, Clone, PartialEq, Eq, scale::Encode, scale::Decode, SpreadLayout, PackedLayout)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
)]
pub enum MeetingStatus {
    Active,
    Stop,
}

impl Ticket {
    pub fn new(
        template_addr: AccountId,
        meeting: AccountId,
        price: u128,
        zone_id: u32,
        seat_id: Option<(u32, u32)>,
        ticket_id: u32,
    ) -> Self {
        // 此处的生成hash的方法极度不合理.需要将template+meeting+price一起生成encode后得到进行hash运算.
        // let mut template_code=scale::Encode::encode(&template);
        let mut meeting_code = scale::Encode::encode(&meeting);
        let mut ticket_id_byte = ticket_id.to_be_bytes().to_vec();
        meeting_code.append(&mut ticket_id_byte);
        // let random_hash:[u8] = ink_env::random(template_code).unwrap().0;
        // template_code.append(random_hash);
        let hash = scale::Encode::encode(&meeting_code);

        let mut hash_output = <<Blake2x256 as HashOutput>::Type as Default>::default();
        <Blake2x256 as CryptoHash>::hash(&hash, &mut hash_output);
        Self {
            template_addr,
            meeting,
            hash: hash_output.into(),
            price,
            zone_id,
            seat_id,
        }
    }
}

// 检票历史记录
#[derive(Debug, Clone, PartialEq, Eq, scale::Encode, scale::Decode, SpreadLayout, PackedLayout)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
)]
pub struct CheckRecord{
    pub inspector: AccountId, // 检票人
    pub timestamp: u64, // 检票时间戳
    pub block: u32, // 检票记录区块
}

