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
	trait Store for Module<T: Config> as Model {
		pub ModelList get(fn get_model): map hasher(blake2_128_concat) Vec<u8> => (Vec<u8>,T::AccountId);
		pub SuperManager get(fn is_manager): map hasher(blake2_128_concat) T::AccountId => T::AccountId;
		Init get(fn is_init): bool;

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
		NotManager,
	}
}

decl_module! {
	pub struct Module<T: Config> for enum Call where origin: T::Origin {
		fn deposit_event() = default;

	
		#[weight = 10_000]
		fn init(origin) -> DispatchResult {
			let creator = ensure_signed(origin)?;
			ensure!(!Self::is_init(), <Error<T>>::AlreadyInitialized);
            
            <SuperManager<T>>::insert(&creator,&creator.clone());
			Init::put(true);
			Ok(())
		}

		/// Transfer tokens from one account to another
		#[weight = 10_000]
		fn ipfs_store(_origin,model:Vec<u8>, ipfshash: Vec<u8>) -> DispatchResult {
			let sender = ensure_signed(_origin)?;
			ensure!(Self::is_manager(&sender) == sender,<Error<T>>::NotManager);

			<ModelList<T>>::insert(model,(ipfshash,sender));
			Ok(())
		}
		
	}
}