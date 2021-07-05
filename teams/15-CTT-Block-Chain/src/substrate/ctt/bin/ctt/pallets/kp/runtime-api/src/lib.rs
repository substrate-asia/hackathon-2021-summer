#![cfg_attr(not(feature = "std"), no_std)]
#![allow(clippy::too_many_arguments)]

use codec::Codec;
use kp::{
    AppFinancedData, AppFinancedUserExchangeData, AppIncomeCycleRecord, CommoditySlashRecord,
    DocumentPowerInfo, LeaderBoardResult, ModelDisputeRecord, ModelIncomeCurrentStage,
};
use primitives::PowerSize;
use sp_std::prelude::*;

// Here we declare the runtime API. It is implemented it the `impl` block in
// runtime amalgamator file (the `runtime/src/lib.rs`)
sp_api::decl_runtime_apis! {
    pub trait KpApi<AccountId, Balance, BlockNumber> where AccountId: Codec, Balance: Codec, BlockNumber: Codec {
        fn total_power() -> PowerSize;
        fn account_power(account: AccountId) -> PowerSize;
        fn commodity_power(app_id: u32, cart_id: Vec<u8>) -> PowerSize;
        fn document_power(app_id: u32, doc_id: Vec<u8>) -> DocumentPowerInfo;
        fn is_commodity_power_exist(app_id: u32, cart_id: Vec<u8>) -> bool;
        fn leader_board_result(block: u32, app_id: u32, model_id: Vec<u8>) -> LeaderBoardResult<AccountId>;
        fn stake_to_vote(account: AccountId, stake: Balance) -> Balance;
        fn power_ratio(account: AccountId) -> u64;
        fn app_finance_record(app_id: u32, proposal_id: Vec<u8>) -> AppFinancedData<Balance, BlockNumber>;
        fn app_finance_exchange_accounts(app_id: u32, proposal_id: Vec<u8>) -> Vec<AccountId>;
        fn app_finance_exchange_data(app_id: u32, proposal_id: Vec<u8>, account: AccountId) -> AppFinancedUserExchangeData<Balance>;
        fn app_income_exchange_accounts(app_id: u32, cycle: BlockNumber) -> Vec<AccountId>;
        fn app_income_exchange_data(app_id: u32, cycle: BlockNumber, account: AccountId) -> AppFinancedUserExchangeData<Balance>;
        fn app_income_record(app_id: u32, cycle: BlockNumber) -> AppIncomeCycleRecord<Balance, BlockNumber>;
        fn model_income_current_stage() -> ModelIncomeCurrentStage<BlockNumber>;
        fn is_tech_member_sign(account: AccountId, msg: Vec<u8>, sign: Vec<u8>) -> bool;
        fn misc_document_power(app_id: u32, document_id: Vec<u8>) -> DocumentPowerInfo;
        fn model_deposit(app_id: u32, model_id: Vec<u8>) -> Balance;
        fn model_dispute_record(app_id: u32, comment_id: Vec<u8>) -> ModelDisputeRecord<BlockNumber>;
        fn commodity_power_slash_record(app_id: u32, comment_id: Vec<u8>) -> CommoditySlashRecord<BlockNumber>;
        fn is_commodity_in_black_list(app_id: u32, cart_id: Vec<u8>) -> bool;
    }
}
