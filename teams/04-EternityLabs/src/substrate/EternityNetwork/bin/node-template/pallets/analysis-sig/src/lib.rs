#![cfg_attr(not(feature = "std"), no_std)]

//! Simple Token Transfer
//! 1. set total supply
//! 2. establish ownership upon configuration of circulating tokens
//! 3. coordinate token transfers with the runtime functions

use sp_std::convert::TryInto;

use frame_support::{decl_error, decl_event, decl_module, decl_storage, dispatch::DispatchResult, ensure, traits::Get};
use frame_system::ensure_signed;
use sp_std::vec::Vec;
use sp_runtime::print;
use sp_std::if_std;


pub trait Config: frame_system::Config + pallet_analysis_stake::Config {
	type Event: From<Event<Self>> + Into<<Self as frame_system::Config>::Event>;
	
}
 
pub type BlockNumberOf<T> = <T as frame_system::Config>::BlockNumber;



decl_storage! {
	trait Store for Module<T: Config> as Model {
		pub AnalysisSig get(fn get_balance): map hasher(blake2_128_concat) BlockNumberOf<T> => (Vec<u8>,T::AccountId);
		pub AnalysislList get(fn get_model): map hasher(blake2_128_concat) Vec<u8> => (Vec<u8>,T::AccountId);
		pub SuperManager get(fn is_manager): map hasher(blake2_128_concat) T::AccountId => T::AccountId;
		Init get(fn is_init): bool;

	}
}

decl_event!(
	pub enum Event<T>
	where
		AccountId = <T as frame_system::Config>::AccountId,
		// BlockNumber = <T as frame_system::Config>::BlockNumber,
	{
		/// Token was initialized by user
		Initialized(AccountId),
		/// Tokens successfully transferred between users
		IPFSStored(AccountId,Vec<u8>,u32),// (from, to, value)
	}
);

decl_error! {
	pub enum Error for Module<T: Config> {
		/// Attempted to initialize the token after it had already been initialized.
		AlreadyInitialized,
		/// Attempted to transfer more funds than were available
		InsufficientFunds,
		NotTime,
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
            
            <SuperManager<T>>::insert(&creator.clone(),&creator.clone());
			Init::put(true);
			Self::deposit_event(RawEvent::Initialized(creator));
			Ok(())
		}

		/// Transfer tokens from one account to another
		#[weight = 10_000]
		fn ipfs_store(_origin, ipfshash: Vec<u8>) -> DispatchResult {
			let sender = ensure_signed(_origin)?;
			//ensure!(Self::is_manager(&sender) == sender,<Error<T>>::NotManager);
			let analysislist = pallet_analysis_stake::Module::<T>::list(&sender);
			let count = pallet_analysis_stake::Module::<T>::get_count();
			let  now =<frame_system::Pallet<T>>::block_number();	
			let number = TryInto::<u32>::try_into(now).map_err(|e|"InsufficientFunds")?;
			ensure!((number%count)+1 == analysislist,<Error<T>>::NotTime);
			<AnalysisSig<T>>::insert(now,(ipfshash.clone(),sender.clone()));

			Self::deposit_event(RawEvent::IPFSStored(sender,ipfshash,number));
			Ok(())
		}
		
	}
}


