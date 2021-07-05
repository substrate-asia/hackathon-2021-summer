#![cfg_attr(not(feature = "std"), no_std)]

//! Simple Token Transfer
//! 1. set total supply
//! 2. establish ownership upon configuration of circulating tokens
//! 3. coordinate token transfers with the runtime functions


use std::u8;

use frame_support::{PalletId,storage::child, decl_error, decl_event, decl_module, decl_storage, dispatch::{DispatchResult,DispatchError}, ensure, traits::{Currency, ExistenceRequirement::AllowDeath, Get, Imbalance, OnUnbalanced}};
use sp_std::prelude::*;

use frame_system::{ensure_signed};
use codec::{Encode,Decode};
use sp_runtime::{traits::{AccountIdConversion,CheckedAdd}};
/// Hardcoded pallet ID; used to create the special Pot Account
/// Must be exactly 8 characters long
//const PALLET_ID: ModuleId = ModuleId(*b"Charity!");


pub trait Config: frame_system::Config {
	type Event: From<Event<Self>> + Into<<Self as frame_system::Config>::Event>;
	type Currency: Currency<Self::AccountId>;
	type PalletId: Get<PalletId>;
}
/// Hardcoded pallet ID; used to create the special Pot Account
/// Must be exactly 8 characters long


type AccountIdOf<T> = <T as frame_system::Config>::AccountId;
type BalanceOf<T> = <<T as Config>::Currency as Currency<AccountIdOf<T>>>::Balance;
type QuanInfoOf<T> = QuanInfo<AccountIdOf<T>,<T as frame_system::Config>::BlockNumber,BalanceOf<T>>;
type QuanNodeOf<T> = QuanNode<AccountIdOf<T>,BalanceOf<T>>;
pub type QuanIndex = u32;
pub type Manager<T> = <T as frame_system::Config>::AccountId;

#[derive(Encode, Decode, Default, PartialEq, Eq)]
#[cfg_attr(feature = "std", derive(Debug))]
pub struct QuanInfo<AccountId,BlockNumber,Balance>{
	benificiary:AccountId,
	end:BlockNumber,
	minstake:Balance,
	maxauthoritynum:u32,
	status:bool,
}

#[derive(Encode, Decode, Default, PartialEq, Eq)]
#[cfg_attr(feature = "std", derive(Debug))]
pub struct QuanNode<AccountId,Balance>{
	model:Vec<u8>,
	address:AccountId,
	dexaddress:Vec<u8>,
	stake:Balance,
	ipport:Vec<u8>,
}



decl_storage! {
	trait Store for Module<T: Config> as Quanstake {
		
		
		pub QuanStakes get(fn get_quan): map hasher(blake2_128_concat) T::AccountId => BalanceOf<T>;
		pub Nodes get(fn get_node): map hasher(blake2_128_concat) T::AccountId => QuanNodeOf<T>;
		Managers get(fn get_manger): Manager<T>;
		pub Qunans get(fn quans):map hasher(blake2_128_concat) QuanIndex => Option<QuanInfoOf<T>>;
		pub Init get(fn is_init): bool;
		pub QuanCount get(fn is_index): QuanIndex;
	}

	add_extra_genesis {
		build(|_config| {
			// Create the charity's pot of funds, and ensure it has the minimum required deposit
			let _ = T::Currency::make_free_balance_be(
				&<Module<T>>::account_id(),
				T::Currency::minimum_balance(),
			);
		});
	}
}

decl_event!(
	pub enum Event<T>
	where
		<T as frame_system::Config>::AccountId,
		BlockNumber = <T as frame_system::Config>::BlockNumber,
	{
		/// Token was initialized by user
		Initialized(AccountId,BlockNumber),
		/// Tokens successfully transferred between users
		AddQuanNodeed(AccountId, AccountId,BlockNumber), // (from, to, value)
		Created(QuanIndex,BlockNumber,AccountId),
		Shutdowned(AccountId,BlockNumber),
	}
);

decl_error! {
	pub enum Error for Module<T: Config> {
		/// Attempted to initialize the token after it had already been initialized.
		AlreadyInitialized,
		/// Attempted to transfer more funds than were available
		InsufficientFunds,
		EndToEarly,
		NotManager,
		AlreadyAdd,
		AlreadyClose,
		Overflow,
	}
}

decl_module! {
	pub struct Module<T: Config> for enum Call where origin: T::Origin {
		fn deposit_event() = default;

	
		/// set super manager
		#[weight = 10_000]
		fn init(_origin) -> DispatchResult {
			let creator = ensure_signed(_origin)?;
			ensure!(!Self::is_init(), <Error<T>>::AlreadyInitialized);
            // <SuperManager<T>>::insert(&creator,&creator.clone());
			<Managers<T>>::put(&creator.clone());
			QuanCount::put(1u32);
		
			Init::put(true);
			// Emit an event.
			let now = <frame_system::Pallet<T>>::block_number();
			Self::deposit_event(RawEvent::Initialized(creator, now));
			Ok(())
		}

		#[weight = 10_000]
		fn create(origin,
			benificiary:AccountIdOf<T>,
			end:T::BlockNumber,
			minstake:BalanceOf<T>,
			maxauthoritynum:u32,
			status:bool,) -> DispatchResult {
			let sender = ensure_signed(origin)?;
			ensure!(Self::get_manger() == sender,<Error<T>>::NotManager);
			let now = <frame_system::Pallet<T>>::block_number();
			ensure!(end>now,<Error<T>>::EndToEarly);
			let index = QuanCount::get() + 1;
			<Qunans<T>>::insert(index,QuanInfo{
				benificiary,
				end,
				minstake,
				maxauthoritynum,
				status
			});
			QuanCount::put(index);
			Self::deposit_event(RawEvent::Created(index,now,sender));
			Ok(())
		}
		#[weight = 10_000]
		fn shutdown(origin,index:u32)-> DispatchResult {
			let shutdowner = ensure_signed(origin)?;
			ensure!(Self::get_manger() == shutdowner,<Error<T>>::NotManager);

			let now = <frame_system::Pallet<T>>::block_number();
			let end =Qunans::<T>::get(index).ok_or(Error::<T>::AlreadyAdd)?.end;
			let status = Qunans::<T>::get(index).ok_or(Error::<T>::AlreadyAdd)?.status;
			ensure!(status == true,<Error<T>>::AlreadyClose);

			let benificiary= Qunans::<T>::get(index).ok_or(Error::<T>::AlreadyAdd)?.benificiary;
			let minstake= Qunans::<T>::get(index).ok_or(Error::<T>::AlreadyAdd)?.minstake;
			let maxauthoritynum= Qunans::<T>::get(index).ok_or(Error::<T>::AlreadyAdd)?.maxauthoritynum;
			let status = false;
			<Qunans<T>>::insert(index,QuanInfo{
				benificiary,
				end,
				minstake,
				maxauthoritynum,
				status
			});
			Self::deposit_event(RawEvent::Shutdowned(shutdowner,now));
			Ok(())
		}

		/// Transfer tokens from one account to another
		#[weight = 10_000]
		fn add_quan_node(_origin,
			model:Vec<u8>,
			address:T::AccountId,
			dexaddress:Vec<u8>,
			stake:BalanceOf<T>,
			ipport:Vec<u8>,) -> DispatchResult {
			let sender = ensure_signed(_origin)?;
			ensure!(Self::get_manger() == sender,<Error<T>>::NotManager);
			//ensure!(Self::get_quan(&quan_node) != quan_node ,<Error<T>>::AlreadyAdd);

			let index = Self::is_index()+ 1 ;
			
			//<QuanStakes<T>>::insert(index,&quan_node);
			QuanCount::put(index);
			let node = address.clone();
			<Nodes<T>>::insert(address.clone(),QuanNode{
				model,
				address,
				dexaddress,
				stake,
				ipport
			});
			
			let now = <frame_system::Pallet<T>>::block_number();
			Self::deposit_event(RawEvent::AddQuanNodeed(sender, node,now));
			Ok(())
		}

		#[weight = 10_000]
		fn donate(origin,amount: BalanceOf<T>,dest:T::AccountId) -> DispatchResult{
			let donor = ensure_signed(origin)?;
			T::Currency::transfer(&donor, &Self::account_id(), amount, AllowDeath)
				.map_err(|_| DispatchError::Other("Can't make donation"))?;
			let old_amount = <QuanStakes<T>>::get(&donor);
			let update_amount_add = old_amount.checked_add(&amount).ok_or(Error::<T>::Overflow);
			<QuanStakes<T>>::insert(donor,update_amount_add.unwrap());
			Ok(())
		}

		#[weight = 10_000]
		fn allocate(
			origin,
			dest: T::AccountId,
			amount: BalanceOf<T>,
		) -> DispatchResult {
			//ensure_root(origin)?;

			// Make the transfer requested
			T::Currency::transfer(
				&Self::account_id(),
				&dest,
				amount,
				AllowDeath,
			).map_err(|_| DispatchError::Other("Can't make allocation"))?;

			//TODO what about errors here??
			
			//Self::deposit_event(RawEvent::FundsAllocated(dest, amount, Self::pot()));
			Ok(())
		}
		
	}
}


impl<T: Config> Module<T> {
	/// The account ID that holds the Charity's funds
	pub fn account_id() -> T::AccountId {
		
		T::PalletId::get().into_account()
		
	}
}


// 	/// The Charity's balance
// 	fn pot() -> BalanceOf<T> {
// 		T::Currency::free_balance(&Self::account_id())
// 	}
// }

