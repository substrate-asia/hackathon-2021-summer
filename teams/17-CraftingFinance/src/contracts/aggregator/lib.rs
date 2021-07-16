#![cfg_attr(not(feature = "std"), no_std)]

pub use self::aggregator::ExchangePrices;

use ink_lang as ink;

#[ink::contract]
mod aggregator {
    #[cfg(not(feature = "ink-as-dependency"))]
    use ink_storage::collections::HashMap as StorageHashMap;

    #[ink(storage)]
    pub struct ExchangePrices {
        /// Mapping from rafts to price of rafts.
        prices: StorageHashMap<AccountId, u128>,
    }

    /// Event emitted when a token transfer occurs.
    #[ink(event)]
    pub struct Feed {
        #[ink(topic)]
        rafts: AccountId,
        price: u128,
    }

    impl ExchangePrices {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                prices: StorageHashMap::new(),
            }
        }

        /// Returns the price of rafts.
        ///
        /// Returns `0` if the account is non-existent.
        #[ink(message)]
        pub fn get_price(&self, rafts: AccountId) -> u128 {
            *self.prices.get(&rafts).unwrap_or(&0)
        }

        /// Feed the price of rafts.
        /// On success a `Feed` event is emitted.
        #[ink(message)]
        pub fn feed_price(&mut self, rafts: AccountId, price: u128) {
            self.prices.insert(rafts, price);

            self.env().emit_event(Feed {
                rafts,
                price,
            });
        }
    }

    /// Unit tests.
    #[cfg(test)]
    mod tests {
        use super::*;
        use ink_lang as ink;

        /// The default constructor does its job.
        #[ink::test]
        fn new_works() {
            // Constructor works.
            let contract = ExchangePrices::new();

            assert_eq!(contract.get_price(AccountId::from([0x01; 32])), 0);
        }

        #[ink::test]
        fn get_price_works() {
            let mut contract = ExchangePrices::new();

            contract.feed_price(AccountId::from([0x01; 32]), 100);
            assert_eq!(contract.get_price(AccountId::from([0x01; 32])), 100);
        }
    }
}