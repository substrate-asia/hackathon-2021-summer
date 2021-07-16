#![cfg_attr(not(feature = "std"), no_std)]

pub use self::accountbook::AccountBook;

use ink_lang as ink;

#[ink::contract]
mod accountbook {
    #[cfg(not(feature = "ink-as-dependency"))]
    use ink_storage::{
        collections::HashMap as StorageHashMap,
        Lazy,
    };
    #[cfg(not(feature = "ink-as-dependency"))]
    use ink_env::call::FromAccountId;

    use aggregator::ExchangePrices;
    use erc20::Erc20;
    use whitelist::Whitelist;

    #[ink(storage)]
    pub struct AccountBook {
        /// Mapping from asset to amount of asset.
        asset_amounts: StorageHashMap<AccountId, Balance>,
        /// Mapping from user and asset to amount of asset that user can extract.
        user_asset_amounts: StorageHashMap<(AccountId, AccountId), Balance>,

        exchange_prices: Lazy<ExchangePrices>,
        asset_whitelist: Lazy<Whitelist>,
        owner: AccountId,
        operator: AccountId,
    }

    impl AccountBook {
        #[ink(constructor)]
        pub fn new(aggregator_account: AccountId, whitelist_account: AccountId) -> Self {
            let exchange_prices: ExchangePrices = FromAccountId::from_account_id(aggregator_account);
            let asset_whitelist: Whitelist = FromAccountId::from_account_id(whitelist_account);

            Self {
                asset_amounts: StorageHashMap::new(),
                user_asset_amounts: StorageHashMap::new(),
                exchange_prices: Lazy::new(exchange_prices),
                asset_whitelist: Lazy::new(asset_whitelist),
                owner: Self::env().caller(),
                operator: Self::env().caller(),
            }
        }

        #[ink(message)]
        pub fn get_asset_amount(&self, asset: AccountId) -> Balance {
            assert!(self.asset_whitelist.is_effective_synthetic_asset(asset));

            self.asset_amounts.get(&asset).copied().unwrap_or(0)
        }

        #[ink(message)]
        pub fn get_asset_value(&self, asset: AccountId) -> u128 {
            let amount = self.get_asset_amount(asset);
            self.calc_asset_value(asset, amount)
        }

        /// Returns the total value of assets.
        #[ink(message)]
        pub fn get_asset_total_value(&self) -> u128 {
            let mut total: u128 = 0;
            for (asset, amount) in self.asset_amounts.iter() {
                total += self.calc_asset_value(*asset, *amount);
            }

            total
        }

        #[ink(message)]
        pub fn get_user_asset_amount(&self, user: AccountId, asset: AccountId) -> Balance {
            assert_ne!(user, Default::default());
            assert!(self.asset_whitelist.is_effective_synthetic_asset(asset));

            if user != self.env().caller() {
                self.is_owner();
            }

            self.user_asset_amounts.get(&(user, asset)).copied().unwrap_or(0)
        }

        #[ink(message)]
        pub fn get_user_asset_total_value(&self, user: AccountId) -> u128 {
            assert_ne!(user, Default::default());

            if user != self.env().caller() {
                self.is_owner();
            }

            let mut total: u128 = 0;
            for (asset, _) in self.asset_amounts.iter() {
                let amount = self.user_asset_amounts.get(&(user, *asset)).copied().unwrap_or(0);
                if amount != 0 {
                    total += self.calc_asset_value(*asset, amount);
                }
            }

            total
        }

        fn calc_asset_value(&self, asset: AccountId, amount: Balance) -> u128 {
            self.exchange_prices.get_price(asset) * amount
        }

        #[ink(message)]
        pub fn mint(&mut self, user: AccountId, collateral_asset: AccountId, collateral_amount:Balance,
                    synthetic_asset: AccountId, synthetic_amount: Balance) {
            self.is_operator();
            assert_ne!(user, Default::default());
            assert!(self.asset_whitelist.is_effective_collateral_asset(collateral_asset));
            assert!(self.asset_whitelist.is_effective_synthetic_asset(synthetic_asset));
            assert!(collateral_amount > 0);
            assert!(synthetic_amount > 0);

            let collateral_ratio = (self.exchange_prices.get_price(collateral_asset) * collateral_amount * 100)
                / (self.exchange_prices.get_price(synthetic_asset) * synthetic_amount);
            assert!(collateral_ratio >= self.asset_whitelist.get_collateral_asset(collateral_asset).into());

            let old_amount = self.asset_amounts.get(&synthetic_asset).copied().unwrap_or(0);
            self.asset_amounts.insert(synthetic_asset, old_amount + synthetic_amount);

            let old_amount = self.user_asset_amounts.get(&(user, synthetic_asset)).copied().unwrap_or(0);
            self.user_asset_amounts.insert((user, synthetic_asset), old_amount + synthetic_amount);
        }

        #[ink(message)]
        pub fn swap(&mut self, user: AccountId, old_asset: AccountId, new_asset: AccountId,
                    swap_amount: Balance) {
            assert_ne!(user, Default::default());
            assert!(self.asset_whitelist.is_effective_synthetic_asset(old_asset));
            assert!(self.asset_whitelist.is_effective_synthetic_asset(new_asset));
            assert!(swap_amount > 0);

            let old_amount = self.asset_amounts.get(&old_asset).copied().unwrap_or(0);
            assert!(old_amount >= swap_amount);
            self.asset_amounts.insert(old_asset, old_amount - swap_amount);

            let new_swap_amount = (self.exchange_prices.get_price(old_asset) * swap_amount)
                / self.exchange_prices.get_price(new_asset);
            let new_amount = self.asset_amounts.get(&new_asset).copied().unwrap_or(0);
            self.asset_amounts.insert(new_asset, new_amount + new_swap_amount);

            let old_amount = self.user_asset_amounts.get(&(user, old_asset)).copied().unwrap_or(0);
            assert!(old_amount >= swap_amount);
            self.user_asset_amounts.insert((user, old_asset), old_amount - swap_amount);

            let new_amount = self.user_asset_amounts.get(&(user, new_asset)).copied().unwrap_or(0);
            self.user_asset_amounts.insert((user, new_asset), new_amount + new_swap_amount);
        }

        #[ink(message)]
        pub fn deposit(&self, asset: AccountId) -> Balance {
            assert!(self.asset_whitelist.is_effective_synthetic_asset(asset));

            // TODO
            // let token: Erc20 = FromAccountId::from_account_id(asset);
            // token.mint(self.env().caller(), 0);
            0
        }

        #[ink(message)]
        pub fn withdraw(&self, asset: AccountId, amount: Balance) -> Balance {
            assert!(self.asset_whitelist.is_effective_synthetic_asset(asset));
            assert!(amount > 0);

            // TODO
            // let token: Erc20 = FromAccountId::from_account_id(asset);

            0
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

        #[ink(message)]
        pub fn transfer_operator(&mut self, new_operator: AccountId) {
            self.is_owner();
            assert_ne!(new_operator, Default::default());

            self.operator = new_operator;
        }

        fn is_operator(&self) {
            assert_eq!(self.operator, self.env().caller());
        }
    }
}