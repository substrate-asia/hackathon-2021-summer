// This file is part of Substrate.

// Copyright (C) 2018-2020 Parity Technologies (UK) Ltd.
// SPDX-License-Identifier: Apache-2.0

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// 	http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//! Low-level types used throughout the Substrate code.

#![cfg_attr(not(feature = "std"), no_std)]

use sp_std::collections::btree_set::BTreeSet;
use sp_std::prelude::*;

use sp_runtime::{
    generic,
    traits::{BlakeTwo256, IdentifyAccount, Verify},
    MultiSignature, OpaqueExtrinsic,
};

use frame_support::dispatch::DispatchResult;

/// power compute base size
pub type PowerSize = u64;

/// An index to a block.
pub type BlockNumber = u32;

/// Alias to 512-bit hash when used in the context of a transaction signature on the chain.
pub type Signature = MultiSignature;

/// Some way of identifying an account on the chain. We intentionally make it equivalent
/// to the public key of our transaction signing scheme.
pub type AccountId = <<Signature as Verify>::Signer as IdentifyAccount>::AccountId;

/// The type for looking up accounts. We don't expect more than 4 billion of them.
pub type AccountIndex = u32;

/// Balance of an account.
pub type Balance = u128;

/// Type used for expressing timestamp.
pub type Moment = u64;

/// Index of a transaction in the chain.
pub type Index = u32;

/// A hash of some data used by the chain.
pub type Hash = sp_core::H256;

/// A timestamp: milliseconds since the unix epoch.
/// `u64` is enough to represent a duration of half a billion years, when the
/// time scale is milliseconds.
pub type Timestamp = u64;

/// Digest item type.
pub type DigestItem = generic::DigestItem<Hash>;
/// Header type.
pub type Header = generic::Header<BlockNumber, BlakeTwo256>;
/// Block type.
pub type Block = generic::Block<Header, OpaqueExtrinsic>;
/// Block ID.
pub type BlockId = generic::BlockId<Block>;

/// App-specific crypto used for reporting equivocation/misbehavior in BABE and
/// GRANDPA. Any rewards for misbehavior reporting will be paid out to this
/// account.
pub mod report {
    use super::{Signature, Verify};
    use frame_system::offchain::AppCrypto;
    use sp_core::crypto::{key_types, KeyTypeId};

    /// Key type for the reporting module. Used for reporting BABE and GRANDPA
    /// equivocations.
    pub const KEY_TYPE: KeyTypeId = key_types::REPORTING;

    mod app {
        use sp_application_crypto::{app_crypto, sr25519};
        app_crypto!(sr25519, super::KEY_TYPE);
    }

    /// Identity of the equivocation/misbehavior reporter.
    pub type ReporterId = app::Public;

    /// An `AppCrypto` type to allow submitting signed transactions using the reporting
    /// application key as signer.
    pub struct ReporterAppCrypto;

    impl AppCrypto<<Signature as Verify>::Signer, Signature> for ReporterAppCrypto {
        type RuntimeAppPublic = ReporterId;
        type GenericSignature = sp_core::sr25519::Signature;
        type GenericPublic = sp_core::sr25519::Public;
    }
}

/// Used for outside interface
pub type AuthAccountId = <<MultiSignature as Verify>::Signer as IdentifyAccount>::AccountId;
/// Types that implement the AccountSet trait are able to supply a set of accounts
/// The trait is generic over the notion of Account used.
pub trait AccountSet {
    type AccountId;

    fn accounts() -> BTreeSet<Self::AccountId>;
}

pub trait Membership<AccountId, Hash, Balance> {
    fn is_platform(who: &AccountId, app_id: u32) -> bool;
    fn is_expert(who: &AccountId, app_id: u32, model_id: &Vec<u8>) -> bool;
    fn is_app_admin(who: &AccountId, app_id: u32) -> bool;
    fn is_investor(who: &AccountId) -> bool;
    fn is_finance_member(who: &AccountId) -> bool;
    fn set_model_creator(key: &Hash, creator: &AccountId, is_give_benefit: bool) -> Balance;
    fn transfer_model_owner(key: &Hash, new_owner: &AccountId);
    fn is_model_creator(who: &AccountId, app_id: u32, model_id: &Vec<u8>) -> bool;
    fn config_app_admin(who: &AccountId, app_id: u32);
    fn config_app_key(who: &AccountId, app_id: u32);
    fn config_app_setting(app_id: u32, rate: u32, name: Vec<u8>, stake: Balance);
    fn get_app_setting(app_id: u32) -> (u32, Vec<u8>, Balance);
    fn is_valid_app(app_id: u32) -> bool;
    fn is_valid_app_key(app_id: u32, app_key: &AccountId) -> bool;
    fn valid_finance_members() -> Vec<AccountId>;
    fn slash_finance_member(
        member: &AccountId,
        receiver: &AccountId,
        amount: Balance,
    ) -> DispatchResult;
}

// For RPC return data types
pub struct PowerLeaderData {}
