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
#![cfg_attr(test, allow(dead_code))]
#![cfg_attr(test, allow(unused_imports))]

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

    // /// @dev Either `TransferSingle` or `TransferBatch` MUST emit when tokens are transferred, including zero value transfers as well as minting or burning (see "Safe Transfer Rules" section of the standard).
    // ///
    // ///  The `_operator` argument MUST be the address of an account/contract that is approved to make the transfer (SHOULD be msg.sender).
    // /// The `_from` argument MUST be the address of the holder whose balance is decreased.
    // /// The `_to` argument MUST be the address of the recipient whose balance is increased.
    // /// The `_ids` argument MUST be the list of tokens being transferred.
    // /// The `_values` argument MUST be the list of number of tokens (matching the list and order of tokens specified in _ids) the holder balance is decreased by and match what the recipient balance is increased by.
    // /// When minting/creating tokens, the `_from` argument MUST be set to `0x0` (i.e. zero address).
    // /// When burning/destroying tokens, the `_to` argument MUST be set to `0x0` (i.e. zero address).
    // #[ink(event)]
    // pub struct TransferBatch {
    //     #[ink(topic)]
    //     operator: AccountId,
    //     #[ink(topic)]
    //     from: AccountId,
    //     #[ink(topic)]
    //     to: AccountId,
    //     ids: Vec<TokenId>,
    //     values: Vec<Balance>,
    // }

    /// @dev MUST emit when approval for a second party/operator address to manage all tokens for an owner address is enabled or disabled (absence of an event assumes disabled).
    #[ink(event)]
    pub struct ApprovalForAll {
        #[ink(topic)]
        owner: AccountId,
        #[ink(topic)]
        operator: AccountId,
        approved: bool,
    }

    // /// Emitted when the URI for token type `id` changes to `value`, if it is a non-programmatic URI.
    // ///
    // /// If an {URI} event was emitted for `id`, the standard
    // /// https://eips.ethereum.org/EIPS/eip-1155#metadata-extensions[guarantees] that `value` will equal the value
    // /// returned by {IERC1155MetadataURI-uri}.
    // #[ink(event)]
    // pub struct URI {
    //     value: String,
    //     #[ink(topic)]
    //     token_id: TokenId,
    // }

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
        pub fn mint(&mut self, token_id: TokenId, value: Balance) {
            let caller = self.env().caller();

            self._ensure_caller_is_token_creator(token_id);
            self._ensure_token_id_valid(token_id);

            assert!(value > 0, "Cannot send mint zero amount.");

            self.balances.insert((caller, token_id), value);

            // Emit transfer event but with mint semantics
            self.env().emit_event(TransferSingle {
                operator: Some(caller),
                from: None,
                to: Some(caller),
                token_id,
                value,
            });
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
        pub fn set_base_uri(&mut self, new_base_uri: Option<String>) {
            self._ensure_caller_is_contract_owner();
            self.base_uri = new_base_uri;
        }

        // ------------------------------ Private Methods ------------------------------

        /// get token uri
        fn _get_token_uri(&self, token_id: TokenId) -> Option<String> {
            self._ensure_token_id_valid(token_id);
            self.token_uris.get(&token_id).unwrap_or(&None).clone()
        }

        /// Panic if token_id invalid
        fn _ensure_token_id_valid(&self, token_id: TokenId) {
            assert!(
                token_id <= self.token_id_nonce,
                "The `token_id` {:?} has not yet been created in this contract.",
                token_id
            );
        }

        /// Panic if `owner` is not a contract owner
        fn _ensure_contract_owner(&self, owner: &AccountId) {
            assert!(&self.get_ownership().clone().unwrap() == owner);
        }

        /// Panic if caller is not a contract owner
        fn _ensure_caller_is_contract_owner(&self) {
            self._ensure_contract_owner(&self.env().caller());
        }

        // Panic if `who` own less than value of the token id
        fn _ensure_token_owner_amount(
            &self,
            who: &AccountId,
            token_id: TokenId,
            value: Balance,
        ) {
            self._ensure_token_id_valid(token_id);

            let balance = self.balance_of(who.clone(), token_id);
            assert!(
                balance >= value,
                "Insufficent token balance for transfer. Expected: {:?}, Got: {:?}",
                value,
                balance,
            );
        }

        // Panic if caller own less than 1 of the token id
        fn _ensure_caller_is_token_owner(&self, token_id: TokenId) {
            self._ensure_token_owner_amount(&self.env().caller(), token_id, 1)
        }

        // Panic if `who` is not the creator of the token id
        fn _ensure_token_creator(&self, who: &AccountId, token_id: TokenId) {
            self._ensure_token_id_valid(token_id);

            let creator = self.creators.get(&token_id);
            assert!(creator.clone().unwrap() == who);
        }

        // Panic if caller is not the creator of the token id
        fn _ensure_caller_is_token_creator(&self, token_id: TokenId) {
            self._ensure_token_creator(&self.env().caller(), token_id)
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
            #[cfg_attr(test, allow(unused_variables))] data: Vec<u8>,
        ) {
            self._ensure_token_id_valid(token_id);
            self._ensure_token_owner_amount(&from, token_id, value);

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
                assert!(
                    self.is_approved_for_all(from, caller),
                    "Caller ({:?}) is not allowed to transfer on behalf of {:?}.",
                    caller,
                    from
                );
            }

            assert!(
                to != AccountId::default(),
                "Cannot send tokens to the zero-address."
            );

            self._perform_transfer(from, to, token_id, value, data);
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
                assert!(
                    self.is_approved_for_all(from, caller),
                    "Caller is not allowed to transfer on behalf of {:?}.",
                    from
                );
            }

            assert!(
                to != AccountId::default(),
                "Cannot send tokens to the zero-address."
            );

            assert_eq!(
                token_ids.len(),
                values.len(),
                "The number of tokens being transferred ({:?}) does not match the number of transfer amounts ({:?}).",
                token_ids.len(), values.len()
            );

            token_ids.iter().zip(values.iter()).for_each(|(&id, &v)| {
                self._perform_transfer(from, to, id, v, data.clone());
            });

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
                    let amt = self.balance_of(*o, *t);
                    output.push(amt);
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

            assert!(
                operator != caller,
                "An account does not need to approve themselves to transfer tokens."
            );

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
            unimplemented!("This smart contract does not accept batch token transfers.")
        }
    }

    /// Unit tests.
    #[cfg(not(feature = "ink-experimental-engine"))]
    #[cfg(test)]
    mod tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;
        use crate::Erc1155;

        use ink_lang as ink;

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

        fn default_accounts(
        ) -> ink_env::test::DefaultAccounts<ink_env::DefaultEnvironment> {
            ink_env::test::default_accounts::<ink_env::DefaultEnvironment>()
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
            let mut erc = Contract::new();
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

            erc.safe_transfer_from(alice(), bob(), 1, 5, vec![]);
            assert_eq!(erc.balance_of(alice(), 1), 5);
            assert_eq!(erc.balance_of(bob(), 1), 15);

            erc.safe_transfer_from(alice(), bob(), 2, 5, vec![]);
            assert_eq!(erc.balance_of(alice(), 2), 15);
            assert_eq!(erc.balance_of(bob(), 2), 5);
        }

        #[ink::test]
        #[should_panic(
            expected = "Insufficent token balance for transfer. Expected: 99, Got: 10"
        )]
        fn sending_too_many_tokens_fails() {
            let mut erc = init_contract();
            erc.safe_transfer_from(alice(), bob(), 1, 99, vec![]);
        }

        #[ink::test]
        #[should_panic(expected = "Cannot send tokens to the zero-address.")]
        fn sending_tokens_to_zero_address_fails() {
            let burn: AccountId = [0; 32].into();

            let mut erc = init_contract();
            erc.safe_transfer_from(alice(), burn, 1, 10, vec![]);
        }

        #[ink::test]
        fn can_send_batch_tokens() {
            let mut erc = init_contract();
            erc.safe_batch_transfer_from(alice(), bob(), vec![1, 2], vec![5, 10], vec![]);

            let balances = erc.balance_of_batch(vec![alice(), bob()], vec![1, 2]);
            assert_eq!(balances, vec![5, 10, 15, 10])
        }

        #[ink::test]
        #[should_panic(
            expected = "The number of tokens being transferred (3) does not match the number of transfer amounts (1)."
        )]
        fn rejects_batch_if_lengths_dont_match() {
            let mut erc = init_contract();
            erc.safe_batch_transfer_from(alice(), bob(), vec![1, 2, 3], vec![5], vec![]);
        }

        #[ink::test]
        fn operator_can_send_tokens() {
            let mut erc = init_contract();

            let owner = alice();
            let operator = bob();

            set_sender(owner);
            erc.set_approval_for_all(operator, true);

            set_sender(operator);
            erc.safe_transfer_from(owner, charlie(), 1, 5, vec![]);
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

            erc.set_approval_for_all(operator, true);
            assert!(erc.is_approved_for_all(owner, operator));

            erc.set_approval_for_all(another_operator, true);
            assert!(erc.is_approved_for_all(owner, another_operator));

            erc.set_approval_for_all(operator, false);
            assert!(erc.is_approved_for_all(owner, operator) == false);
        }

        #[ink::test]
        fn minting_tokens_works() {
            let mut erc = Contract::new();

            set_sender(alice());
            assert_eq!(erc.create(0, None), 1);
            assert_eq!(erc.balance_of(alice(), 1), 0);

            erc.mint(1, 123);
            assert_eq!(erc.balance_of(alice(), 1), 123);
        }

        #[ink::test]
        #[should_panic(
            expected = "The `token_id` 7 has not yet been created in this contract."
        )]
        fn minting_not_allowed_for_nonexistent_tokens() {
            let mut erc = Contract::new();
            erc.mint(7, 123);
        }
    }
}
