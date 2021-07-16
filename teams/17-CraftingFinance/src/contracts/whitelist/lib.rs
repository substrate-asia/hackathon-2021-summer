#![cfg_attr(not(feature = "std"), no_std)]

pub use self::whitelist::Whitelist;

use ink_lang as ink;

#[ink::contract]
mod whitelist {
    #[cfg(not(feature = "ink-as-dependency"))]
    use ink_storage::collections::HashMap as StorageHashMap;

    #[ink(storage)]
    pub struct Whitelist {
        collateral_assets: StorageHashMap<AccountId, u32>,
        synthetic_assets: StorageHashMap<AccountId, u8>,
        leverage_ratio: (u8, u8),
        owner: AccountId,
    }

    impl Whitelist {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                collateral_assets: StorageHashMap::new(),
                synthetic_assets: StorageHashMap::new(),
                leverage_ratio: (1, 10),
                owner: Self::env().caller(),
            }
        }

        #[ink(message)]
        pub fn get_collateral_asset(&self, asset: AccountId) -> u32 {
            assert_ne!(asset, Default::default());

            self.collateral_assets.get(&asset).copied().unwrap_or(0)
        }

        #[ink(message)]
        pub fn set_collateral_asset(&mut self, asset: AccountId, ratio: u32) {
            self.is_owner();
            assert_ne!(asset, Default::default());

            self.collateral_assets.insert(asset, ratio);
        }

        #[ink(message)]
        pub fn remove_collateral_asset(&mut self, asset: AccountId) {
            self.is_owner();
            assert_ne!(asset, Default::default());

            self.collateral_assets.take(&asset);
        }

        #[ink(message)]
        pub fn is_effective_collateral_asset(&self, asset: AccountId) -> bool {
            assert_ne!(asset, Default::default());

            if self.collateral_assets.contains_key(&asset) {
                return true;
            }

            false
        }

        #[ink(message)]
        pub fn get_synthetic_asset(&self, asset: AccountId) -> u8 {
            assert_ne!(asset, Default::default());

            self.synthetic_assets.get(&asset).copied().unwrap_or(0)
        }

        #[ink(message)]
        pub fn set_synthetic_asset(&mut self, asset: AccountId, status: u8) {
            self.is_owner();
            assert_ne!(asset, Default::default());

            self.synthetic_assets.insert(asset, status);
        }

        #[ink(message)]
        pub fn remove_synthetic_asset(&mut self, asset: AccountId) {
            self.is_owner();
            assert_ne!(asset, Default::default());

            self.synthetic_assets.take(&asset);
        }

        #[ink(message)]
        pub fn is_effective_synthetic_asset(&self, asset: AccountId) -> bool {
            assert_ne!(asset, Default::default());

            if self.synthetic_assets.contains_key(&asset) {
                return true;
            }

            false
        }

        #[ink(message)]
        pub fn get_leverage_ratio(&self) -> (u8, u8) {
            self.leverage_ratio
        }

        #[ink(message)]
        pub fn set_leverage_ratio(&mut self, min: u8, max: u8) {
            self.is_owner();

            self.leverage_ratio = (min, max);
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