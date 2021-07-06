#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

#[ink::contract]
mod forge {
    #[cfg(not(feature = "ink-as-dependency"))]
    use ink_storage::{
        collections::HashMap as StorageHashMap,
        traits::{PackedLayout, SpreadLayout},
        Lazy,
    };
    #[cfg(not(feature = "ink-as-dependency"))]
    use ink_env::call::FromAccountId;
    #[cfg(not(feature = "ink-as-dependency"))]
    use ink_prelude::vec::Vec;

    use accountbook::AccountBook;
    use debtpool::SDP;

    pub type CollateralId = u128;

    #[ink(storage)]
    pub struct CollateralPool {
        collaterals: StorageHashMap<CollateralId, Collateral>,
        collateral_count: CollateralId,

        account_book: Lazy<AccountBook>,
        sdp: Lazy<SDP>,
        owner: AccountId,
    }

    #[derive(Debug, PartialEq, Eq, Clone, Copy, scale::Encode, scale::Decode, SpreadLayout, PackedLayout)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout))]
    pub struct Collateral {
        issuer: AccountId,
        collateral_asset: AccountId,
        collateral_amount: Balance,
        synthetic_asset: AccountId,
        synthetic_amount: Balance,
        join_debtpool: bool,
        create_time: Timestamp,
    }

    #[ink(event)]
    pub struct IssueSynth {
        #[ink(topic)]
        collateral_id: CollateralId,
        #[ink(topic)]
        collateral_asset: AccountId,
        collateral_amount: Balance,
        #[ink(topic)]
        synthetic_asset: AccountId,
        synthetic_amount: Balance,
        join_debtpool: bool,
    }

    impl CollateralPool {
        #[ink(constructor)]
        pub fn new(accountbook_account: AccountId, debtpool_account: AccountId) -> Self {
            let account_book: AccountBook = FromAccountId::from_account_id(accountbook_account);
            let sdp:SDP = FromAccountId::from_account_id(debtpool_account);

            Self {
                collaterals: StorageHashMap::new(),
                collateral_count: 0,
                account_book: Lazy::new(account_book),
                sdp: Lazy::new(sdp),
                owner: Self::env().caller(),
            }
        }

        #[ink(message)]
        pub fn get_collateral(&self, collateral_id: CollateralId) -> Option<Collateral> {
            self.collaterals.get(&collateral_id).cloned().and_then(|collateral| Some(collateral))
        }

        #[ink(message)]
        pub fn get_user_collateral(&self, user: AccountId) -> Vec<CollateralId> {
            assert_ne!(user, Default::default());

            if user != self.env().caller() {
                self.is_owner();
            }

            let mut v: Vec<CollateralId> = Vec::new();
            for (collateral_id, collateral) in self.collaterals.iter() {
                if user == collateral.issuer {
                    v.push(*collateral_id);
                }
            }

            v
        }

        #[ink(message)]
        pub fn get_collateral_count(&self) -> CollateralId {
            self.collateral_count
        }

        #[ink(message)]
        pub fn forge(&mut self, collateral_asset: AccountId, collateral_amount:Balance,
                     synthetic_asset: AccountId, synthetic_amount: Balance, join_debtpool: bool) {
            let caller = self.env().caller();
            // let collateral_amount = self.env().transferred_balance();

            if join_debtpool {
                self.sdp.join(caller, collateral_asset, collateral_amount, synthetic_asset,
                              synthetic_amount);
            } else {
                self.account_book.mint(caller, collateral_asset, collateral_amount, synthetic_asset,
                                       synthetic_amount);
            }

            let collateral = Collateral {
                issuer: caller,
                collateral_asset,
                collateral_amount,
                synthetic_asset,
                synthetic_amount,
                join_debtpool,
                create_time: self.env().block_timestamp(),
            };

            self.collateral_count += 1;
            self.collaterals.insert(self.collateral_count, collateral);

            self.env().emit_event(IssueSynth {
                collateral_id: self.collateral_count,
                collateral_asset,
                collateral_amount,
                synthetic_asset,
                synthetic_amount,
                join_debtpool,
            });
        }

        #[ink(message)]
        pub fn transfer_ownership(&mut self, new_owner: AccountId) {
            self.is_owner();
            assert_ne!(new_owner, Default::default());

            self.owner = new_owner;
        }

        fn is_owner(&self) {
            assert_eq!(self.owner, self.env().caller());
        }
    }
}