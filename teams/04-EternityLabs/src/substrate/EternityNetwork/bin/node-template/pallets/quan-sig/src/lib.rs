#![cfg_attr(not(feature = "std"), no_std)]

//! Simple Token Transfer
//! 1. set total supply
//! 2. establish ownership upon configuration of circulating tokens
//! 3. coordinate token transfers with the runtime functions
use frame_support::{
	decl_error, decl_event, decl_module, decl_storage, dispatch::DispatchResult, ensure,
};
use frame_system::ensure_signed;
use sp_std::vec::Vec;




pub trait Config: frame_system::Config {
	type Event: From<Event<Self>> + Into<<Self as frame_system::Config>::Event>;
}

decl_storage! {
	trait Store for Module<T: Config> as Dispsig {
		pub DispatchSig get(fn get_balance): map hasher(blake2_128_concat) <T as frame_system::Config>::BlockNumber => (Vec<u8>,T::AccountId);


	}
}

decl_event!(
	pub enum Event<T>
	where
		AccountId = <T as frame_system::Config>::AccountId,
	{
		/// Token was initialized by user
		Initialized(AccountId),
		/// Tokens successfully transferred between users
		Transfer(AccountId, AccountId, u64), // (from, to, value)
	}
);

decl_error! {
	pub enum Error for Module<T: Config> {
		/// Attempted to initialize the token after it had already been initialized.
		AlreadyInitialized,
		/// Attempted to transfer more funds than were available
		InsufficientFunds,
	}
}

decl_module! {
	pub struct Module<T: Config> for enum Call where origin: T::Origin {
		fn deposit_event() = default;

		/// Transfer tokens from one account to another
		#[weight = 10_000]
		fn ipfs_store(_origin, ipfshash: Vec<u8>) -> DispatchResult {
			let sender = ensure_signed(_origin)?;
			let now = <frame_system::Module<T>>::block_number();
			<DispatchSig<T>>::insert(now,(ipfshash,sender));
			Ok(())
		}
		
	}
}