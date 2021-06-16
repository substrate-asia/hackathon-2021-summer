// Copyright 2021 MintEngine Lab.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#![cfg_attr(not(feature = "std"), no_std)]
#![allow(dead_code)]

// Export to pub
pub use self::erc721::{
    Error,
    IErc721,
    IErc721Metadata,
    Result,
    TokenId,
};
// FIXME Cursor errors when export Event

use ink_lang as ink;

#[ink::contract]
mod erc721 {
    use ink_lang as ink;
    use ink_prelude::string::String;
    use scale::{
        Decode,
        Encode,
    };

    /// The result type.
    pub type Result<T> = core::result::Result<T, Error>;

    /// A token ID.
    pub type TokenId = u128;

    #[derive(Encode, Decode, Debug, PartialEq, Eq, Copy, Clone)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        NotOwner,
        NotApproved,
        TokenExists,
        TokenNotFound,
        CannotInsert,
        CannotRemove,
        CannotFetchValue,
        NotAllowed,
    }

    /// Event emitted when a token transfer occurs.
    #[ink(event)]
    pub struct Transfer {
        #[ink(topic)]
        from: Option<AccountId>,
        #[ink(topic)]
        to: Option<AccountId>,
        #[ink(topic)]
        id: TokenId,
    }

    /// Event emitted when a token approve occurs.
    #[ink(event)]
    pub struct Approval {
        #[ink(topic)]
        from: AccountId,
        #[ink(topic)]
        to: AccountId,
        #[ink(topic)]
        id: TokenId,
    }

    /// Event emitted when an operator is enabled or disabled for an owner.
    /// The operator can manage all NFTs of the owner.
    #[ink(event)]
    pub struct ApprovalForAll {
        #[ink(topic)]
        owner: AccountId,
        #[ink(topic)]
        operator: AccountId,
        approved: bool,
    }

    /// Trait implemented by all ERC-721 respecting smart contracts.
    #[ink::trait_definition]
    pub trait IErc721 {
        /// Creates a new ERC-721 token contract.
        #[ink(constructor)]
        fn new() -> Self;

        /// Returns the balance of the owner.
        ///
        /// This represents the amount of unique tokens the owner has.
        #[ink(message)]
        fn balance_of(&self, owner: AccountId) -> Balance;

        /// Returns the owner of the token.
        #[ink(message)]
        fn owner_of(&self, id: TokenId) -> Option<AccountId>;

        /// Returns the approved account ID for this token if any.
        #[ink(message)]
        fn get_approved(&self, id: TokenId) -> Option<AccountId>;

        /// Returns `true` if the operator is approved by the owner.
        #[ink(message)]
        fn is_approved_for_all(&self, owner: AccountId, operator: AccountId) -> bool;

        /// Approves or disapproves the operator for all tokens of the caller.
        #[ink(message)]
        fn set_approval_for_all(&mut self, to: AccountId, approved: bool) -> Result<()>;

        /// Approves the account to transfer the specified token on behalf of the caller.
        #[ink(message)]
        fn approve(&mut self, to: AccountId, id: TokenId) -> Result<()>;

        /// Transfers the token from the caller to the given destination.
        #[ink(message)]
        fn transfer(&mut self, destination: AccountId, id: TokenId) -> Result<()>;

        /// Transfer approved or owned token.
        #[ink(message)]
        fn transfer_from(
            &mut self,
            from: AccountId,
            to: AccountId,
            id: TokenId,
        ) -> Result<()>;

        /// Creates a new token.
        #[ink(message)]
        fn mint(&mut self, id: TokenId) -> Result<()>;

        /// Deletes an existing token. Only the owner can burn the token.
        #[ink(message)]
        fn burn(&mut self, id: TokenId) -> Result<()>;
    }

    /// Trait implmented by all ERC-721 with metadata
    #[ink::trait_definition]
    pub trait IErc721Metadata {
        /// @notice A descriptive name for a collection of NFTs in this contract
        #[ink(message)]
        fn name(&self) -> Option<String>;

        /// @notice An abbreviated name for NFTs in this contract
        #[ink(message)]
        fn symbol(&self) -> Option<String>;

        /// A distinct Uniform Resource Identifier (URI) for a given asset.
        ///
        /// @dev Throws if `_tokenId` is not a valid NFT. URIs are defined in RFC
        /// 3986. The URI may point to a JSON file that conforms to the "ERC721
        /// Metadata JSON Schema".
        #[ink(message)]
        fn token_uri(&self, id: TokenId) -> Option<String>;
    }

    // TODO tmp hack struct for passing compile
    #[ink(storage)]
    pub struct Phantom;
    impl Phantom {
        #[ink(constructor)]
        pub fn new() -> Self {
            Phantom {}
        }
        #[ink(message)]
        pub fn message(&self) {}
    }
}
