#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

#[ink::contract]
mod kingsman {
    #[cfg(not(feature = "ink-as-dependency"))]
    use ink_storage::Lazy;
    #[cfg(not(feature = "ink-as-dependency"))]
    use ink_env::call::FromAccountId;

    use accountbook::AccountBook;
    use debtpool::SDP;

    #[ink(storage)]
    pub struct Kingsman {
        account_book: Lazy<AccountBook>,
        sdp: Lazy<SDP>,
        owner: AccountId,
    }

    #[ink(event)]
    pub struct Swap {
        #[ink(topic)]
        trader: AccountId,
        #[ink(topic)]
        old_asset: AccountId,
        #[ink(topic)]
        new_asset: AccountId,
        swap_amount: Balance,
        in_debtpool: bool,
    }

    impl Kingsman {
        #[ink(constructor)]
        pub fn new(accountbook_account: AccountId, debtpool_account: AccountId) -> Self {
            let account_book: AccountBook = FromAccountId::from_account_id(accountbook_account);
            let sdp:SDP = FromAccountId::from_account_id(debtpool_account);

            Self {
                account_book: Lazy::new(account_book),
                sdp: Lazy::new(sdp),
                owner: Self::env().caller(),
            }
        }

        #[ink(message)]
        pub fn swap(&mut self, old_asset: AccountId, new_asset: AccountId,
                    swap_amount: Balance, in_debtpool: bool) {
            assert_ne!(old_asset, Default::default());
            assert_ne!(new_asset, Default::default());
            assert!(swap_amount > 0);

            let caller = self.env().caller();
            if in_debtpool {
                self.sdp.swap_in_sdp(caller, old_asset, new_asset, swap_amount);
            } else {
                self.account_book.swap(caller, old_asset, new_asset, swap_amount);
                self.sdp.swap_not_in_sdp(old_asset, new_asset, swap_amount);
            }

            self.env().emit_event(Swap {
                trader: caller,
                old_asset,
                new_asset,
                swap_amount,
                in_debtpool,
            });
        }

        #[ink(message)]
        pub fn transfer_ownership(&mut self, new_owner: AccountId) {
            assert_eq!(self.owner, self.env().caller());
            assert_ne!(new_owner, Default::default());

            self.owner = new_owner;
        }
    }
}