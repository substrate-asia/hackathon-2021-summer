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

/// Evaluate `$x:expr` and if not true return `Err($y:expr)`.
///
/// Used as `ensure!(expression_to_ensure, expression_to_return_on_false)`.
macro_rules! ensure {
    ( $condition:expr, $error:expr $(,)? ) => {{
        if !$condition {
            return ::core::result::Result::Err(::core::convert::Into::into($error))
        }
    }};
}

pub use self::entity::Contract;
#[metis_lang::contract]
mod entity {
    #[allow(unused_imports)]
    use ink_prelude::{
        collections::BTreeMap,
        format,
        string::String,
        vec::Vec,
    };
    #[allow(unused_imports)]
    use ink_storage::{
        collections::{
            HashMap as StorageHashMap,
            Vec as StorageVec,
        },
        traits::{
            PackedLayout,
            SpreadLayout,
        },
    };
    #[allow(unused_imports)]
    use metis_lang::{
        import,
        metis,
    };
    #[allow(unused_imports)]
    use metis_ownable as ownable;

    #[allow(unused_imports)]
    use trait_erc1155::{
        consts::MAGIC_VALUE_RECEIVED,
        types::{
            Error,
            Result,
            TokenId,
        },
        IERC1155Metadata,
        IErc1155,
        IErc1155TokenReceiver,
    };

    /// Event emitted when Owner AccountId Transferred
    #[ink(event)]
    #[metis(ownable)]
    pub struct OwnershipTransferred {
        /// previous owner account id
        #[ink(topic)]
        previous_owner: Option<AccountId>,
        /// new owner account id
        #[ink(topic)]
        new_owner: Option<AccountId>,
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

    /// @dev MUST emit when approval for a second party/operator address to manage all tokens for an owner address is enabled or disabled (absence of an event assumes disabled).
    #[ink(event)]
    pub struct ApprovalForAll {
        #[ink(topic)]
        owner: AccountId,
        #[ink(topic)]
        operator: AccountId,
        approved: bool,
    }

    /// Represents an (Owner, Operator) pair, in which the operator is allowed to spend funds on
    /// behalf of the operator.
    #[derive(
        Copy,
        Clone,
        Debug,
        Ord,
        PartialOrd,
        Eq,
        PartialEq,
        PackedLayout,
        SpreadLayout,
        scale::Encode,
        scale::Decode,
    )]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    struct Approval {
        owner: AccountId,
        operator: AccountId,
    }

    /// An ERC-1155 contract.
    #[ink(storage)]
    #[import(ownable)]
    pub struct Contract {
        /// Tracks the balances of accounts across the different tokens that they might be holding.
        balances: BTreeMap<(AccountId, TokenId), Balance>,
        /// Which accounts (called operators) have been approved to spend funds on behalf of an owner.
        approvals: BTreeMap<Approval, ()>,
        /// A unique identifier for the tokens which have been minted (and are therefore supported) by this contract.
        token_id_nonce: TokenId,
        /// Ownable data
        ownable: ownable::Data<Contract>,
        /// The accounts who creates
        creators: StorageHashMap<TokenId, AccountId>,
        /// token metadata uri
        token_uris: StorageHashMap<TokenId, Option<String>>,
        /// token metadata baseuri
        base_uri: Option<String>,
    }

    impl Contract {
        /// Initialize a default instance of this ERC-1155 implementation.
        #[ink(constructor)]
        pub fn new(_base_uri: Option<String>) -> Self {
            let mut instance = Self {
                balances: Default::default(),
                approvals: Default::default(),
                token_id_nonce: Default::default(),
                ownable: ownable::Data::new(),
                creators: StorageHashMap::new(),
                token_uris: StorageHashMap::new(),
                base_uri: _base_uri,
            };
            // init metis ownable module
            ownable::Impl::init(&mut instance);
            instance
        }

        /// Create the initial supply for a token.
        ///
        /// The initial supply will be provided to the caller (a.k.a the minter), and the
        /// `token_id` will be assigned by the smart contract.
        ///
        /// Note that as implemented anyone can create tokens. If you were to deploy this to a
        /// production environment you'd probably want to lock down the addresses that are allowed
        /// to create tokens.
        #[ink(message)]
        pub fn create(
            &mut self,
            _initial_supply: Balance,
            _metadata_uri: Option<String>,
        ) -> TokenId {
            let caller = self.env().caller();

            // Given that TokenId is a `u128` the likelihood of this overflowing is pretty slim.
            self.token_id_nonce += 1;
            // Add balance
            if _initial_supply > 0 {
                self.balances
                    .insert((caller, self.token_id_nonce), _initial_supply);
            }
            // Set creator
            self.creators.insert(self.token_id_nonce, caller);

            // Set metadata
            self.token_uris.insert(self.token_id_nonce, _metadata_uri);

            // Emit transfer event but with mint semantics
            self.env().emit_event(TransferSingle {
                operator: Some(caller),
                from: None,
                to: if _initial_supply == 0 {
                    None
                } else {
                    Some(caller)
                },
                token_id: self.token_id_nonce,
                value: _initial_supply,
            });

            self.token_id_nonce
        }

        /// Mint a `value` amount of `token_id` tokens.
        ///
        /// It is assumed that the token has already been `create`-ed. The newly minted supply will
        /// be assigned to the caller (a.k.a the minter).
        ///
        /// Note that as implemented anyone can mint tokens. If you were to deploy this to a
        /// production environment you'd probably want to lock down the addresses that are allowed
        /// to mint tokens.
        #[ink(message)]
        pub fn mint(&mut self, token_id: TokenId, value: Balance) -> Result<()> {
            ensure!(token_id <= self.token_id_nonce, Error::UnexistentToken);

            let caller = self.env().caller();

            let creator = self.creators.get(&token_id);
            ensure!(creator.clone().unwrap() == &caller, Error::NotTokenCreator);

            ensure!(value > 0, Error::ZeroAmountMint);

            self.balances.insert((caller, token_id), value);

            // Emit transfer event but with mint semantics
            self.env().emit_event(TransferSingle {
                operator: Some(caller),
                from: None,
                to: Some(caller),
                token_id,
                value,
            });

            Ok(())
        }

        // Ownable messages
        #[ink(message)]
        pub fn get_ownership(&self) -> Option<AccountId> {
            *ownable::Impl::owner(self)
        }

        #[ink(message)]
        pub fn renounce_ownership(&mut self) {
            ownable::Impl::renounce_ownership(self)
        }

        #[ink(message)]
        pub fn transfer_ownership(&mut self, new_owner: AccountId) {
            ownable::Impl::transfer_ownership(self, &new_owner)
        }

        #[ink(message)]
        pub fn set_base_uri(&mut self, new_base_uri: Option<String>) -> Result<()> {
            let caller = self.env().caller();

            ensure!(
                &self.get_ownership().clone().unwrap() == &caller,
                Error::NotContractOwner
            );

            self.base_uri = new_base_uri;

            Ok(())
        }

        // ------------------------------ Private Methods ------------------------------

        /// get token uri
        fn _get_token_uri(&self, token_id: TokenId) -> Option<String> {
            self.token_uris.get(&token_id).unwrap_or(&None).clone()
        }

        // Helper function for performing single token transfers.
        //
        // Should not be used directly since it's missing certain checks which are important to the
        // ERC-1155 standard (it is expected that the caller has already performed these).
        fn _perform_transfer(
            &mut self,
            from: AccountId,
            to: AccountId,
            token_id: TokenId,
            value: Balance,
        ) {
            self.balances
                .entry((from, token_id))
                .and_modify(|b| *b -= value);

            self.balances
                .entry((to, token_id))
                .and_modify(|b| *b += value)
                .or_insert(value);

            let caller = self.env().caller();
            self.env().emit_event(TransferSingle {
                operator: Some(caller),
                from: Some(from),
                to: Some(from),
                token_id,
                value,
            });
        }

        // Check if the address at `to` is a smart contract which accepts ERC-1155 token transfers.
        //
        // If they're a smart contract which **doesn't** accept tokens transfers this call will
        // revert. Otherwise we risk locking user funds at in that contract with no chance of
        // recovery.
        #[cfg_attr(test, allow(unused_variables))]
        fn _transfer_acceptance_check(
            &mut self,
            caller: AccountId,
            from: AccountId,
            to: AccountId,
            token_id: TokenId,
            value: Balance,
            data: Vec<u8>,
        ) {
            // This is disabled during tests due to the use of `eval_contract()` not being
            // supported (tests end up panicking).
            #[cfg(not(test))]
            {
                use ink_env::call::{
                    build_call,
                    utils::ReturnType,
                    ExecutionInput,
                    Selector,
                };

                // If our recipient is a smart contract we need to see if they accept or
                // reject this transfer. If they reject it we need to revert the call.
                let params = build_call::<ink_env::DefaultEnvironment>()
                    .callee(to)
                    .gas_limit(5000)
                    .exec_input(
                        ExecutionInput::new(Selector::new(MAGIC_VALUE_RECEIVED))
                            .push_arg(caller)
                            .push_arg(from)
                            .push_arg(token_id)
                            .push_arg(value)
                            .push_arg(data),
                    )
                    .returns::<ReturnType<Vec<u8>>>()
                    .params();

                match ink_env::eval_contract(&params) {
                    Ok(v) => {
                        ink_env::debug_println!(
                            "Received return value \"{:?}\" from contract {:?}",
                            v,
                            from
                        );
                        assert_eq!(
                            v,
                            &MAGIC_VALUE_RECEIVED[..],
                            "The recipient contract at {:?} does not accept token transfers.\n
                            Expected: {:?}, Got {:?}", to, MAGIC_VALUE_RECEIVED, v
                        )
                    }
                    Err(e) => {
                        match e {
                            ink_env::Error::CodeNotFound
                            | ink_env::Error::NotCallable => {
                                // Our recipient wasn't a smart contract, so there's nothing more for
                                // us to do
                                ink_env::debug_println!("Recipient at {:?} from is not a smart contract ({:?})", from, e);
                            }
                            _ => {
                                // We got some sort of error from the call to our recipient smart
                                // contract, and as such we must revert this call
                                let msg = ink_prelude::format!(
                                    "Got error \"{:?}\" while trying to call {:?}",
                                    e,
                                    from
                                );
                                ink_env::debug_println!("{}", &msg);
                                panic!("{}", &msg)
                            }
                        }
                    }
                }
            }
        }
    }

    /// ERC 1155 basic implementation
    impl IErc1155 for Contract {
        #[ink(message)]
        fn safe_transfer_from(
            &mut self,
            from: AccountId,
            to: AccountId,
            token_id: TokenId,
            value: Balance,
            data: Vec<u8>,
        ) -> Result<()> {
            let caller = self.env().caller();
            if caller != from {
                ensure!(self.is_approved_for_all(from, caller), Error::NotApproved);
            }

            ensure!(to != AccountId::default(), Error::ZeroAddressTransfer);

            let balance = self.balance_of(from, token_id);
            ensure!(balance >= value, Error::InsufficientBalance);

            self._perform_transfer(from, to, token_id, value);
            self._transfer_acceptance_check(caller, from, to, token_id, value, data);

            Ok(())
        }

        #[ink(message)]
        fn safe_batch_transfer_from(
            &mut self,
            from: AccountId,
            to: AccountId,
            token_ids: Vec<TokenId>,
            values: Vec<Balance>,
            data: Vec<u8>,
        ) -> Result<()> {
            let caller = self.env().caller();
            if caller != from {
                ensure!(self.is_approved_for_all(from, caller), Error::NotApproved);
            }

            ensure!(to != AccountId::default(), Error::ZeroAddressTransfer);
            ensure!(!token_ids.is_empty(), Error::BatchTransferMismatch);
            ensure!(
                token_ids.len() == values.len(),
                Error::BatchTransferMismatch,
            );

            let transfers = token_ids.iter().zip(values.iter());
            for (&id, &v) in transfers.clone() {
                let balance = self.balance_of(from, id);
                ensure!(balance >= v, Error::InsufficientBalance);
            }

            for (&id, &v) in transfers {
                self._perform_transfer(from, to, id, v);
            }

            // Can use the any token ID/value here, we really just care about knowing if `to` is a
            // smart contract which accepts transfers
            self._transfer_acceptance_check(
                caller,
                from,
                to,
                token_ids[0],
                values[0],
                data,
            );

            Ok(())
        }

        #[ink(message)]
        fn balance_of(&self, owner: AccountId, token_id: TokenId) -> Balance {
            *self.balances.get(&(owner, token_id)).unwrap_or(&0)
        }

        #[ink(message)]
        fn balance_of_batch(
            &self,
            owners: Vec<AccountId>,
            token_ids: Vec<TokenId>,
        ) -> Vec<Balance> {
            let mut output = Vec::new();
            for o in &owners {
                for t in &token_ids {
                    let amount = self.balance_of(*o, *t);
                    output.push(amount);
                }
            }
            output
        }

        #[ink(message)]
        fn set_approval_for_all(
            &mut self,
            operator: AccountId,
            approved: bool,
        ) -> Result<()> {
            let caller = self.env().caller();
            ensure!(operator != caller, Error::SelfApproval);

            let approval = Approval {
                owner: caller,
                operator,
            };

            if approved {
                self.approvals.insert(approval, ());
            } else {
                self.approvals.remove(&approval);
            }

            self.env().emit_event(ApprovalForAll {
                owner: approval.owner,
                operator,
                approved,
            });
            Ok(())
        }

        #[ink(message)]
        fn is_approved_for_all(&self, owner: AccountId, operator: AccountId) -> bool {
            self.approvals.get(&Approval { owner, operator }).is_some()
        }
    }

    impl IERC1155Metadata for Contract {
        /// @notice A distinct Uniform Resource Identifier (URI) for a given token.
        /// @dev URIs are defined in RFC 3986.
        /// The URI MUST point to a JSON file that conforms to the "ERC-1155 Metadata URI JSON Schema".
        #[ink(message)]
        fn uri(&self, token_id: TokenId) -> Option<String> {
            let token_uri = self._get_token_uri(token_id);
            // return uri
            if self.base_uri.is_none() {
                token_uri
            } else if token_uri.is_some() {
                Some(format!(
                    "{0}{1}",
                    &self.base_uri.clone().unwrap(),
                    &token_uri.clone().unwrap()
                ))
            } else {
                None
            }
        }
    }
    impl IErc1155TokenReceiver for Contract {
        #[ink(message, selector = "0xF23A6E61")]
        fn on_received(
            &mut self,
            _operator: AccountId,
            _from: AccountId,
            _token_id: TokenId,
            _value: Balance,
            _data: Vec<u8>,
        ) -> Vec<u8> {
            // The ERC-1155 standard dictates that if a contract does not accept token transfers
            // directly to the contract, then the contract must revert.
            //
            // This prevents a user from unintentionally transferring tokens to a smart contract
            // and getting their funds stuck without any sort of recovery mechanism.
            //
            // Note that the choice of whether or not to accept tokens is implementation specific,
            // and we've decided to not accept them in this implementation.
            unimplemented!("This smart contract does not accept token transfer.")
        }

        #[ink(message, selector = "0xBC197C81")]
        fn on_batch_received(
            &mut self,
            _operator: AccountId,
            _from: AccountId,
            _token_ids: Vec<TokenId>,
            _values: Vec<Balance>,
            _data: Vec<u8>,
        ) -> Vec<u8> {
            // The ERC-1155 standard dictates that if a contract does not accept token transfers
            // directly to the contract, then the contract must revert.
            //
            // This prevents a user from unintentionally transferring tokens to a smart contract
            // and getting their funds stuck without any sort of recovery mechanism.
            //
            // Note that the choice of whether or not to accept tokens is implementation specific,
            // and we've decided to not accept them in this implementation.
            unimplemented!("This smart contract does not accept batch token transfers.")
        }
    }

    /// Unit tests.
    #[cfg(test)]
    mod tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;
        use crate::entity::Contract;

        use ink_lang as ink;

        #[cfg(feature = "ink-experimental-engine")]
        fn set_sender(sender: AccountId) {
            ink_env::test::set_caller::<Environment>(sender);
        }

        #[cfg(not(feature = "ink-experimental-engine"))]
        fn set_sender(sender: AccountId) {
            const WALLET: [u8; 32] = [7; 32];
            ink_env::test::push_execution_context::<Environment>(
                sender,
                WALLET.into(),
                1000000,
                1000000,
                ink_env::test::CallData::new(ink_env::call::Selector::new([0x00; 4])), /* dummy */
            );
        }

        #[cfg(feature = "ink-experimental-engine")]
        fn default_accounts() -> ink_env::test::DefaultAccounts<Environment> {
            ink_env::test::default_accounts::<Environment>()
        }

        #[cfg(not(feature = "ink-experimental-engine"))]
        fn default_accounts() -> ink_env::test::DefaultAccounts<Environment> {
            ink_env::test::default_accounts::<Environment>()
                .expect("off-chain environment should have been initialized already")
        }

        fn alice() -> AccountId {
            default_accounts().alice
        }

        fn bob() -> AccountId {
            default_accounts().bob
        }

        fn charlie() -> AccountId {
            default_accounts().charlie
        }

        fn init_contract() -> Contract {
            let mut erc = Contract::new(Option::default());
            erc.balances.insert((alice(), 1), 10);
            erc.balances.insert((alice(), 2), 20);
            erc.balances.insert((bob(), 1), 10);

            erc
        }

        #[ink::test]
        fn can_get_correct_balance_of() {
            let erc = init_contract();

            assert_eq!(erc.balance_of(alice(), 1), 10);
            assert_eq!(erc.balance_of(alice(), 2), 20);
            assert_eq!(erc.balance_of(alice(), 3), 0);
            assert_eq!(erc.balance_of(bob(), 2), 0);
        }

        #[ink::test]
        fn can_get_correct_batch_balance_of() {
            let erc = init_contract();

            assert_eq!(
                erc.balance_of_batch(vec![alice()], vec![1, 2, 3]),
                vec![10, 20, 0]
            );
            assert_eq!(
                erc.balance_of_batch(vec![alice(), bob()], vec![1]),
                vec![10, 10]
            );

            assert_eq!(
                erc.balance_of_batch(vec![alice(), bob(), charlie()], vec![1, 2]),
                vec![10, 20, 10, 0, 0, 0]
            );
        }

        #[ink::test]
        fn can_send_tokens_between_accounts() {
            let mut erc = init_contract();

            assert!(erc.safe_transfer_from(alice(), bob(), 1, 5, vec![]).is_ok());
            assert_eq!(erc.balance_of(alice(), 1), 5);
            assert_eq!(erc.balance_of(bob(), 1), 15);

            assert!(erc.safe_transfer_from(alice(), bob(), 2, 5, vec![]).is_ok());
            assert_eq!(erc.balance_of(alice(), 2), 15);
            assert_eq!(erc.balance_of(bob(), 2), 5);
        }

        #[ink::test]
        fn sending_too_many_tokens_fails() {
            let mut erc = init_contract();
            let res = erc.safe_transfer_from(alice(), bob(), 1, 99, vec![]);
            assert_eq!(res.unwrap_err(), Error::InsufficientBalance);
        }

        #[ink::test]
        fn sending_tokens_to_zero_address_fails() {
            let burn: AccountId = [0; 32].into();

            let mut erc = init_contract();
            let res = erc.safe_transfer_from(alice(), burn, 1, 10, vec![]);
            assert_eq!(res.unwrap_err(), Error::ZeroAddressTransfer);
        }

        #[ink::test]
        fn can_send_batch_tokens() {
            let mut erc = init_contract();
            assert!(erc
                .safe_batch_transfer_from(alice(), bob(), vec![1, 2], vec![5, 10], vec![])
                .is_ok());

            let balances = erc.balance_of_batch(vec![alice(), bob()], vec![1, 2]);
            assert_eq!(balances, vec![5, 10, 15, 10])
        }

        #[ink::test]
        fn rejects_batch_if_lengths_dont_match() {
            let mut erc = init_contract();
            let res = erc.safe_batch_transfer_from(
                alice(),
                bob(),
                vec![1, 2, 3],
                vec![5],
                vec![],
            );
            assert_eq!(res.unwrap_err(), Error::BatchTransferMismatch);
        }

        #[ink::test]
        fn batch_transfers_fail_if_len_is_zero() {
            let mut erc = init_contract();
            let res =
                erc.safe_batch_transfer_from(alice(), bob(), vec![], vec![], vec![]);
            assert_eq!(res.unwrap_err(), Error::BatchTransferMismatch);
        }

        #[ink::test]
        fn operator_can_send_tokens() {
            let mut erc = init_contract();

            let owner = alice();
            let operator = bob();

            set_sender(owner);
            assert!(erc.set_approval_for_all(operator, true).is_ok());

            set_sender(operator);
            assert!(erc
                .safe_transfer_from(owner, charlie(), 1, 5, vec![])
                .is_ok());
            assert_eq!(erc.balance_of(alice(), 1), 5);
            assert_eq!(erc.balance_of(charlie(), 1), 5);
        }

        #[ink::test]
        fn approvals_work() {
            let mut erc = init_contract();
            let owner = alice();
            let operator = bob();
            let another_operator = charlie();

            // Note: All of these tests are from the context of the owner who is either allowing or
            // disallowing an operator to control their funds.
            set_sender(owner);
            assert!(erc.is_approved_for_all(owner, operator) == false);

            assert!(erc.set_approval_for_all(operator, true).is_ok());
            assert!(erc.is_approved_for_all(owner, operator));

            assert!(erc.set_approval_for_all(another_operator, true).is_ok());
            assert!(erc.is_approved_for_all(owner, another_operator));

            assert!(erc.set_approval_for_all(operator, false).is_ok());
            assert!(erc.is_approved_for_all(owner, operator) == false);
        }

        #[ink::test]
        fn minting_tokens_works() {
            let mut erc = Contract::new(Option::default());

            set_sender(alice());
            assert_eq!(erc.create(0, Option::default()), 1);
            assert_eq!(erc.balance_of(alice(), 1), 0);

            assert!(erc.mint(1, 123).is_ok());
            assert_eq!(erc.balance_of(alice(), 1), 123);
        }

        #[ink::test]
        fn minting_not_allowed_for_nonexistent_tokens() {
            let mut erc = Contract::new(Option::default());

            let res = erc.mint(1, 123);
            assert_eq!(res.unwrap_err(), Error::UnexistentToken);
        }

        #[ink::test]
        fn init_baseurl_works() {
            let mut erc = Contract::new(Some(String::from("test")));
            let baseUrl = erc.base_uri.unwrap();
            assert_eq!(baseUrl, String::from("test"));
        }

        #[ink::test]
        fn set_baseurl_works() {
            let mut erc = Contract::new(Option::default());
            erc.set_base_uri(Some(String::from("test2")));
            let baseUrl = erc.base_uri.unwrap();
            assert_eq!(baseUrl, String::from("test2"));
        }


    }
}
