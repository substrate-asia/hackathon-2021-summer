#![cfg_attr(not(feature = "std"), no_std)]
#![allow(clippy::too_many_arguments)]

use codec::Codec;
use sp_std::prelude::*;

sp_api::decl_runtime_apis! {
    pub trait MembersApi<AccountId> where AccountId: Codec {
        fn is_platform_expert(account: AccountId, app_id: u32) -> bool;
        fn is_model_expert(account: AccountId, app_id: u32, model_id: Vec<u8>) -> bool;
        fn is_model_creator(account: AccountId, app_id: u32, model_id: Vec<u8>) -> bool;
        fn model_experts(app_id: u32, model_id: Vec<u8>) -> Vec<AccountId>;
        fn model_creator(app_id: u32, model_id: Vec<u8>) -> AccountId;
    }
}
