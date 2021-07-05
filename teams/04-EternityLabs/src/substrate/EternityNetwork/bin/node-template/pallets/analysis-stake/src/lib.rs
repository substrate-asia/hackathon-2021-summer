#![cfg_attr(not(feature = "std"), no_std)]

//! Simple Token Transfer
//! 1. set total supply
//! 2. establish ownership upon configuration of circulating tokens
//! 3. coordinate token transfers with the runtime functions
use frame_support::{decl_error, decl_event, decl_module, decl_storage, dispatch::DispatchResult, ensure, traits::Get};
use frame_system::ensure_signed;
use sp_std::vec::Vec;


pub trait Config: frame_system::Config + pallet_token::Config{
	type Event: From<Event<Self>> + Into<<Self as frame_system::Config>::Event>;

	
}

pub type Manager<T> = <T as frame_system::Config>::AccountId;
pub type AnalyCount = u32;

decl_storage! {
	trait Store for Module<T: Config> as AnalysisStake {
		
		//AnalysislList get(fn get_analysis): Vec<T::AccountId> = Vec::new();

		pub AnalysislList get(fn list): map hasher(blake2_128_concat) T::AccountId => AnalyCount;
		Managers get(fn get_manger): Manager<T>;
		AnalyCounts get(fn count): AnalyCount; 
		Init get(fn is_init): bool;
		

	}
}

decl_event!(
	pub enum Event<T>
	where
		AccountId = <T as frame_system::Config>::AccountId,
		BlockNumber = <T as frame_system::Config>::BlockNumber,
	{
		/// Token was initialized by user
		Initialized(AccountId,BlockNumber),
		/// Tokens successfully transferred between users
		AddAnalysisNode(AccountId, AccountId), // (from, to, value)
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
            // <SuperManager<T>>::insert(&creator,&creator.clone());
			<Managers<T>>::put(&creator.clone());
			
			Init::put(true);
			
			let now = <frame_system::Pallet<T>>::block_number();
			Self::deposit_event(RawEvent::Initialized(creator,now));
			Ok(())
		}

		/// Transfer tokens from one account to another
		#[weight = 10_000]
		fn add_analysis_node(_origin,analysis_account:T::AccountId) -> DispatchResult {
			let sender = ensure_signed(_origin)?;
			// ensure!(Self::is_manager(&sender) == sender,<Error<T>>::NotManager);
			ensure!(Self::get_manger() == sender,<Error<T>>::NotManager);
			ensure!(!<AnalysislList<T>>::contains_key(&analysis_account),<Error<T>>::AlreadyInitialized);
			let count = AnalyCounts::get() + 1;
			AnalyCounts::put(count);
			<AnalysislList<T>>::insert(&analysis_account,count);
			//<AnalysislList<T>>::append(sender.clone());
			//Self::get_analysis().dedup(sender.clone());
			//<ModelList<T>>::insert(model,(ipfshash,sender));
			Self::deposit_event(RawEvent::AddAnalysisNode(sender,analysis_account));
			Ok(())
		}
		
	}
}

impl<T:Config> Module<T>{
	pub fn get_count()->u32{
		AnalyCounts::get()
	}
}
