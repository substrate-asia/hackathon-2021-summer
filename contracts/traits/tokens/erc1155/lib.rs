// Copyright 2018-2021 Parity Technologies (UK) Ltd.
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
#![allow(unused_imports)]

// Export to pub
pub use self::erc1155::{
    consts, types, IERC1155Metadata, IErc1155, IErc1155TokenReceiver,
};
// FIXME Cursor errors when export Event

use ink_lang as ink;

#[ink::contract]
mod erc1155 {
    use crate::types::TokenId;
    use ink_lang as ink;
    use ink_prelude::{string::String, vec::Vec};

    /// export all types
    pub mod types {
        use scale::{Decode, Encode};

        /// The result type.
        pub type Result<T> = core::result::Result<T, Error>;
        /// A token ID.
        pub type TokenId = u128;

        // The ERC-1155 error types.
        #[derive(Debug, PartialEq, scale::Encode, scale::Decode)]
        #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
        pub enum Error {
            /// This token ID has not yet been created by the contract.
            UnexistentToken,
            /// The amount of Token minting should be not zero.
            ZeroAmountMint,
            /// The caller tried to sending tokens to the zero-address (0x00).
            ZeroAddressTransfer,
            /// The caller is not approved to transfer tokens on behalf of the account.
            NotApproved,
            /// The account does not have enough funds to complete the transfer.
            InsufficientBalance,
            /// An account does not need to approve themselves to transfer tokens.
            SelfApproval,
            /// The number of tokens being transferred does not match the specified number of transfers.
            BatchTransferMismatch,
            // The caller is not the contract owner.
            NotContractOwner,
            // The caller is not the creator of the token.
            NotTokenCreator,
        }
    }

    /// Indicate that a token transfer has occured.
    ///
    /// This must be emitted even if a zero value transfer occurs.

    /// @dev Either `TransferSingle` or `TransferBatch` MUST emit when tokens are transferred, including zero value transfers as well as minting or burning (see "Safe Transfer Rules" section of the standard).
    ///
    /// The `_operator` argument MUST be the address of an account/contract that is approved to make the transfer (SHOULD be msg.sender).
    /// The `_from` argument MUST be the address of the holder whose balance is decreased.
    /// The `_to` argument MUST be the address of the recipient whose balance is increased.
    /// The `_id` argument MUST be the token type being transferred.
    /// The `_value` argument MUST be the number of tokens the holder balance is decreased by and match what the recipient balance is increased by.
    /// When minting/creating tokens, the `_from` argument MUST be set to `0x0` (i.e. zero address).
    /// When burning/destroying tokens, the `_to` argument MUST be set to `0x0` (i.e. zero address).
    #[ink(event)]
    pub struct TransferSingle {
        #[ink(topic)]
        operator: Option<AccountId>,
        #[ink(topic)]
        from: Option<AccountId>,
        #[ink(topic)]
        to: Option<AccountId>,
        token_id: TokenId,
        value: Balance,
    }

    /// @dev Either `TransferSingle` or `TransferBatch` MUST emit when tokens are transferred, including zero value transfers as well as minting or burning (see "Safe Transfer Rules" section of the standard).
    ///
    ///  The `_operator` argument MUST be the address of an account/contract that is approved to make the transfer (SHOULD be msg.sender).
    /// The `_from` argument MUST be the address of the holder whose balance is decreased.
    /// The `_to` argument MUST be the address of the recipient whose balance is increased.
    /// The `_ids` argument MUST be the list of tokens being transferred.
    /// The `_values` argument MUST be the list of number of tokens (matching the list and order of tokens specified in _ids) the holder balance is decreased by and match what the recipient balance is increased by.
    /// When minting/creating tokens, the `_from` argument MUST be set to `0x0` (i.e. zero address).
    /// When burning/destroying tokens, the `_to` argument MUST be set to `0x0` (i.e. zero address).
    #[ink(event)]
    pub struct TransferBatch {
        #[ink(topic)]
        operator: AccountId,
        #[ink(topic)]
        from: AccountId,
        #[ink(topic)]
        to: AccountId,
        ids: Vec<TokenId>,
        values: Vec<Balance>,
    }

    /// @dev MUST emit when approval for a second party/operator address to manage all tokens for an owner address is enabled or disabled (absence of an event assumes disabled).
    #[ink(event)]
    pub struct ApprovalForAll {
        #[ink(topic)]
        owner: AccountId,
        #[ink(topic)]
        operator: AccountId,
        approved: bool,
    }

    /// Emitted when the URI for token type `id` changes to `value`, if it is a non-programmatic URI.
    ///
    /// If an {URI} event was emitted for `id`, the standard
    /// https://eips.ethereum.org/EIPS/eip-1155#metadata-extensions[guarantees] that `value` will equal the value
    /// returned by {IERC1155MetadataURI-uri}.
    #[ink(event)]
    pub struct URI {
        value: ink_prelude::string::String,
        #[ink(topic)]
        token_id: TokenId,
    }

    /// The interface for an ERC-1155 compliant contract.
    ///
    /// The interface is defined here: https://eips.ethereum.org/EIPS/eip-1155.
    ///
    /// The goal of ERC-1155 is to allow a single deployed contract to manage a variety of assets.
    /// These assets can be fungible, non-fungible, or a combination.
    ///
    /// By tracking multiple assets the ERC-1155 standard is able to support batch transfers, which
    /// make it easy to transfer a mix of multiple tokens at once.
    #[ink::trait_definition]
    pub trait IErc1155 {
        /// Transfer the a `value` amount of `token_id` tokens to the `to` account from the `from`
        /// account.
        ///
        /// Note that the call does not have to originate from the `from` account, and may originate
        /// from any account which is approved to transfer `from`'s tokens.
        #[ink(message)]
        fn safe_transfer_from(
            &mut self,
            from: AccountId,
            to: AccountId,
            token_id: types::TokenId,
            value: Balance,
            data: Vec<u8>,
        ) -> types::Result<()>;

        /// Perform a batch transfer of `token_ids` to the `to` account from the `from` account.
        ///
        /// The number of `values` specified to be transfer must match the number of `token_ids`,
        /// otherwise this call will revert.
        ///
        /// Note that the call does not have to originate from the `from` account, and may originate
        /// from any account which is approved to transfer `from`'s tokens.
        #[ink(message)]
        fn safe_batch_transfer_from(
            &mut self,
            from: AccountId,
            to: AccountId,
            token_ids: Vec<types::TokenId>,
            values: Vec<Balance>,
            data: Vec<u8>,
        ) -> types::Result<()>;

        /// Query the balance of a specific token for the provided account.
        #[ink(message)]
        fn balance_of(&self, owner: AccountId, token_id: types::TokenId) -> Balance;

        /// Query the balances for a set of tokens for a set of accounts.
        ///
        /// E.g use this call if you want to query what Alice and Bob's balances are for Tokens ID1 and
        /// ID2.
        ///
        /// This will return all the balances for a given owner before moving on to the next owner. In
        /// the example above this means that the return value should look like:
        ///
        /// [Alice Balance of Token ID1, Alice Balance of Token ID2, Bob Balance of Token ID2, Bob Balance of Token ID2]
        #[ink(message)]
        fn balance_of_batch(
            &self,
            owners: Vec<AccountId>,
            token_ids: Vec<types::TokenId>,
        ) -> Vec<Balance>;

        /// Enable or disable a third party, known as an `operator`, to control all tokens on behalf of
        /// the caller.
        #[ink(message)]
        fn set_approval_for_all(
            &mut self,
            operator: AccountId,
            approved: bool,
        ) -> types::Result<()>;

        /// Query if the given `operator` is allowed to control all of `owner`'s tokens.
        #[ink(message)]
        fn is_approved_for_all(&self, owner: AccountId, operator: AccountId) -> bool;
    }

    /// Note: The ERC-165 identifier for this interface is 0x0e89341c.
    #[ink::trait_definition]
    pub trait IERC1155Metadata {
        /// @notice A distinct Uniform Resource Identifier (URI) for a given token.
        /// @dev URIs are defined in RFC 3986.
        /// The URI MUST point to a JSON file that conforms to the "ERC-1155 Metadata URI JSON Schema".
        #[ink(message)]
        fn uri(&self, token_id: types::TokenId) -> Option<String>;
    }

    pub mod consts {
        // This is the "magic" return value that we expect if a smart contract supports receiving ERC-1155
        // tokens.
        //
        // It is calculated with
        // `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`, and corresponds
        // to 0xf23a6e61.
        //
        // Note that this is Ethereum specific, I don't know how it translates in Ink! land.
        #[cfg_attr(test, allow(dead_code))]
        pub const MAGIC_VALUE_RECEIVED: [u8; 4] = [0xF2, 0x3A, 0x6E, 0x61];
        // This is the return value that we expect if a smart contract supports batch receiving ERC-1155
        // tokens.
        //
        // It is calculated with
        // `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`, and
        // corresponds to 0xbc197c81.
        pub const MAGIC_VALUE_BATCH_RECEIVED: [u8; 4] = [0xBC, 0x19, 0x7C, 0x81];
    }

    /// The interface for an ERC-1155 Token Receiver contract.
    ///
    /// The interface is defined here: https://eips.ethereum.org/EIPS/eip-1155.
    ///
    /// Smart contracts which want to accept token transfers must implement this interface. By default
    /// if a contract does not support this interface any transactions originating from an ERC-1155
    /// compliant contract which attempt to transfer tokens directly to the contract's address must be
    /// reverted.
    #[ink::trait_definition]
    pub trait IErc1155TokenReceiver {
        /// Handle the receipt of a single ERC-1155 token.
        ///
        /// This should be called by a compliant ERC-1155 contract if the intended recipient is a smart
        /// contract.
        ///
        /// If the smart contract implementing this interface accepts token transfers then it must
        /// return `MAGIC_VALUE_RECEIVED` from this function. To reject a transfer it must revert.
        ///
        /// Any callers must revert if they receive anything other than `MAGIC_VALUE_RECEIVED` as a return
        /// value.
        ///
        /// @param _operator  The address which initiated the transfer (i.e. msg.sender)
        /// @@param _from      The address which previously owned the token
        /// @@param _id        The ID of the token being transferred
        /// @@param _value     The amount of tokens being transferred
        /// @@param _data      Additional data with no specified format
        /// @@return           `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))` (i.e. 0xf23a6e61)
        #[ink(message)]
        fn on_received(
            &mut self,
            operator: AccountId,
            from: AccountId,
            token_id: types::TokenId,
            value: Balance,
            data: Vec<u8>,
        ) -> Vec<u8>;

        /// Handle the receipt of multiple ERC-1155 tokens.
        ///
        /// This should be called by a compliant ERC-1155 contract if the intended recipient is a smart
        /// contract.
        ///
        /// If the smart contract implementing this interface accepts token transfers then it must
        /// return `MAGIC_VALUE_BATCH_RECEIVED` from this function. To reject a transfer it must revert.
        ///
        /// Any callers must revert if they receive anything other than `MAGIC_VALUE_BATCH_RECEIVED` as a return
        /// value.
        ///
        /// @param _operator  The address which initiated the batch transfer (i.e. msg.sender)
        /// @param _from      The address which previously owned the token
        /// @param _ids       An array containing ids of each token being transferred (order and length must match _values array)
        /// @param _values    An array containing amounts of each token being transferred (order and length must match _ids array)
        /// @param _data      Additional data with no specified format
        /// @return           `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))` (i.e. 0xbc197c81)
        #[ink(message)]
        fn on_batch_received(
            &mut self,
            operator: AccountId,
            from: AccountId,
            token_ids: Vec<types::TokenId>,
            values: Vec<Balance>,
            data: Vec<u8>,
        ) -> Vec<u8>;
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
