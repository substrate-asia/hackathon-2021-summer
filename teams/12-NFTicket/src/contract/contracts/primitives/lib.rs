#![cfg_attr(not(feature = "std"), no_std)]

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub struct TickeResult {
    pub price: u128,
    pub maker: ink_env::AccountId,
}

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum Meeting_Error {
    /// Returned if not enough balance to fulfill a request is available.
    NotOwner,
    CallBuyTickerError,
    TransferError,
}
