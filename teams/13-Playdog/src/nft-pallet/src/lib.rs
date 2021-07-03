// This file is part of Substrate.

// Copyright (C) 2019-2021 Parity Technologies (UK) Ltd.
// SPDX-License-Identifier: Apache-2.0

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// 	http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//! # Nicks Pallet
//!
//! - [`Config`]
//! - [`Call`]
//!
//! ## Overview
//!
//! Nicks is an example pallet for keeping track of account names on-chain. It makes no effort to
//! create a name hierarchy, be a DNS replacement or provide reverse lookups. Furthermore, the
//! weights attached to this pallet's dispatchable functions are for demonstration purposes only and
//! have not been designed to be economically secure. Do not use this pallet as-is in production.
//!
//! ## Interface
//!
//! ### Dispatchable Functions
//!
//! * `set_name` - Set the associated name of an account; a small deposit is reserved if not already
//!   taken.
//! * `clear_name` - Remove an account's associated name; the deposit is returned.
//! * `kill_name` - Forcibly remove the associated name; the deposit is lost.
//!
//! [`Call`]: ./enum.Call.html
//! [`Config`]: ./trait.Config.html

#![cfg_attr(not(feature = "std"), no_std)]

use sp_std::prelude::*;
use sp_runtime::{
	traits::{StaticLookup, Zero, BadOrigin}
};
use frame_support::traits::{Currency, ReservableCurrency, OnUnbalanced};
pub use pallet::*;

type BalanceOf<T> = <<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;
type NegativeImbalanceOf<T> = <<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::NegativeImbalance;

#[frame_support::pallet]
pub mod pallet {
	use frame_system::{ensure_signed, pallet_prelude::*};
	use frame_support::{ensure, pallet_prelude::*, traits::{EnsureOrigin, Get}};
	use super::*;

	#[pallet::config]
	pub trait Config: frame_system::Config {
		/// The overarching event type.
		type Event: From<Event<Self>> + IsType<<Self as frame_system::Config>::Event>;

		/// The currency trait.
		type Currency: ReservableCurrency<Self::AccountId>;

		/// What to do with slashed funds.
		type Slashed: OnUnbalanced<NegativeImbalanceOf<Self>>;

		/// The origin which may forcibly set or remove a name. Root can always do this.
		type ForceOrigin: EnsureOrigin<Self::Origin>;
	}

	#[pallet::event]
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	#[pallet::metadata(T::AccountId = "AccountId", BalanceOf<T> = "Balance")]
	pub enum Event<T: Config> {

		/// The owner changed
		OwnerChanged(T::AccountId),

		/// The use owner changed
		UseOwnerChanged(bool),

		/// Create a nft type
		CreateNftType(T::AccountId, u128),

		/// Create a nft
		CreateNft(u128, Vec<u8>, T::AccountId),

		/// Translate
		Translate(u128, u128, T::AccountId),
	}

	/// Error for the nicks pallet.
	#[pallet::error]
	pub enum Error<T> {
		/// Nft Type not exist
		NftTypeNotExist,
		/// Nft not exist
		NftNotExist,
		/// UnknownError
		Unknown
	}

	/// super manager of nft
	#[pallet::storage]
	pub(super) type SuperOwner<T: Config> = StorageValue<_, T::AccountId, ValueQuery>;
	
	/// whether use supper manager
	#[pallet::storage]
	pub(super) type UseSuperOwner<T: Config> = StorageValue<_, bool, ValueQuery>;

	/// nft type index now
	#[pallet::storage]
	pub(super) type LastNftTypeIndex<T: Config> = StorageValue<_, u128, ValueQuery>;

	/// The manager of specific nft
	#[pallet::storage]
	pub(super) type NftOwner<T: Config> = StorageMap<_, Twox64Concat, u128, T::AccountId>;

	/// The symbol of specific nft
	#[pallet::storage]
	pub(super) type Symbol<T: Config> = StorageMap<_, Twox64Concat, u128, Vec<u8>>;

	/// the last index of specific nft
	#[pallet::storage]
	pub(super) type LastNftIndex<T: Config> = StorageMap<_, Twox64Concat, u128, u128>;

	/// the owner of specific nft item
	#[pallet::storage]
	pub(super) type NftItemOwner<T: Config> = StorageDoubleMap<_, Blake2_128Concat, u128, Blake2_128Concat, u128, T::AccountId, ValueQuery>;

	/// balance of specific account
	#[pallet::storage]
	pub(super) type BalanceCount<T: Config> = StorageDoubleMap<_, Blake2_128Concat, T::AccountId, Blake2_128Concat, u128, u128, ValueQuery>;
	
	/// balance of specific account
	#[pallet::storage]
	pub(super) type NftUri<T: Config> = StorageDoubleMap<_, Blake2_128Concat, u128, Blake2_128Concat, u128, Vec<u8>, ValueQuery>;
	
	#[pallet::genesis_config]
	pub struct GenesisConfig<T: Config> {
		/// The `AccountId` of the sudo key.
		pub super_owner: T::AccountId,
		pub use_super_owner: bool
	}

	#[cfg(feature = "std")]
	impl<T: Config> Default for GenesisConfig<T> {
		fn default() -> Self {
			Self {
				super_owner: Default::default(),
				use_super_owner: true
			}
		}
	}

	#[pallet::genesis_build]
	impl<T: Config> GenesisBuild<T> for GenesisConfig<T> {
		fn build(&self) {
			<SuperOwner<T>>::put(&self.super_owner);
			<UseSuperOwner<T>>::put(&self.use_super_owner);
		}
	}

	

	#[pallet::pallet]
	#[pallet::generate_store(pub(super) trait Store)]
	pub struct Pallet<T>(_);

	#[pallet::call]
	impl<T: Config> Pallet<T> {
		/// Change owner to new_owner, caller must be owner
		#[pallet::weight(50_000_000)]
		pub fn set_super_owner(origin: OriginFor<T>, new_owner: T::AccountId) -> DispatchResult {
			let sender = ensure_signed(origin)?;
			ensure!(sender == <SuperOwner<T>>::get(), BadOrigin);
			<SuperOwner<T>>::set(new_owner.clone());
			Self::deposit_event(Event::<T>::OwnerChanged(new_owner));
			Ok(())
		}

		/// Change owner to new_owner, the caller must be root
		#[pallet::weight(50_000_000)]
		pub fn force_set_super_owner(origin: OriginFor<T>, new_owner: T::AccountId) -> DispatchResult {
			T::ForceOrigin::ensure_origin(origin)?;
			<SuperOwner<T>>::set(new_owner.clone());
			Self::deposit_event(Event::<T>::OwnerChanged(new_owner));
			Ok(())
		}

		/// Change use_super_owner, the caller must be owner
		#[pallet::weight(50_000_000)]
		pub fn set_use_super_owner(origin: OriginFor<T>, b_use: bool) -> DispatchResult {
			let sender = ensure_signed(origin)?;
			ensure!(sender == <SuperOwner<T>>::get(), BadOrigin);
			if  b_use { // if use_super_owner is false, the owner can't change it
				return Err(BadOrigin.into());
			}
			<UseSuperOwner<T>>::set(b_use);
			Self::deposit_event(Event::<T>::UseOwnerChanged(b_use));
			Ok(())
		}

		/// Change use_super_owner, the caller must be root
		#[pallet::weight(50_000_000)]
		pub fn force_set_use_super_owner(origin: OriginFor<T>, b_use: bool) -> DispatchResult {
			T::ForceOrigin::ensure_origin(origin)?;
			<UseSuperOwner<T>>::set(b_use);
			Self::deposit_event(Event::<T>::UseOwnerChanged(b_use));
			Ok(())
		}

		/// Create Nft type, if use_supper_owner, the caller must be super owner or root
		#[pallet::weight(50_000_000)]
		pub fn create_nft_type(origin: OriginFor<T>, symbol: Vec<u8>) -> DispatchResult {
			let sender = ensure_signed(origin.clone())?;
			let mut max_nft_index = <LastNftTypeIndex<T>>::get();
			max_nft_index += 1;
			if  <UseSuperOwner<T>>::get() {
				// must be owner or root
				if sender != <SuperOwner<T>>::get(){
					T::ForceOrigin::ensure_origin(origin.clone())?;
				}
			}
			<NftOwner<T>>::insert(max_nft_index, sender.clone());
			<Symbol<T>>::insert(max_nft_index, symbol.clone());
			<LastNftIndex<T>>::insert(max_nft_index, 0);
			<LastNftTypeIndex<T>>::put(max_nft_index);
			Self::deposit_event(Event::<T>::CreateNftType(sender, max_nft_index));
			Ok(())
		}

		/// Create Nft type, if use_supper_owner, the caller must be super owner or root
		#[pallet::weight(50_000_000)]
		pub fn create_nft(origin: OriginFor<T>, nft_index: u128, uri: Vec<u8>, owner: T::AccountId) -> DispatchResult {
			let sender = ensure_signed(origin.clone())?;
			ensure!(nft_index != 0 && nft_index <= <LastNftTypeIndex<T>>::get(), Error::<T>::NftTypeNotExist);

			// owner judgement
			if  <UseSuperOwner<T>>::get() {
				// must be owner or root
				if sender != <SuperOwner<T>>::get() && Some(sender.clone()) != <NftOwner<T>>::get(nft_index) {
					T::ForceOrigin::ensure_origin(origin.clone())?;
				}
			}

			if Some(sender) != <NftOwner<T>>::get(nft_index) {
				T::ForceOrigin::ensure_origin(origin.clone())?;
			}
			 
			return match <LastNftIndex<T>>::get(nft_index){
				Some(max_nft_index) => {
					// change nft owner
					<NftItemOwner<T>>::insert(nft_index, max_nft_index+1, owner.clone());

					// change balance
					let count = if < BalanceCount<T>>::contains_key(owner.clone(), nft_index) {
						<BalanceCount<T>>::get(owner.clone(), nft_index)
					}else{
						0
					};
					<BalanceCount<T>>::insert(owner.clone(), nft_index, count+1);
					// set uri
					<NftUri<T>>::insert(nft_index, max_nft_index+1, uri.clone());
					// change last nft
					<LastNftIndex<T>>::insert(nft_index, max_nft_index+1);
					Self::deposit_event(Event::<T>::CreateNft(nft_index, uri, owner));
					Ok(())
				},
				None=>{
					Err(Error::<T>::Unknown.into())
				}
			};
		}
		/*
			pub(super) type LastNftIndex<T: Config> = StorageMap<_, Twox64Concat, u128, u128>;
			pub(super) type NftItemOwner<T: Config> = StorageDoubleMap<_, Blake2_128Concat, u128, Blake2_128Concat, u128, T::AccountId, ValueQuery>;
			pub(super) type BalanceCount<T: Config> = StorageDoubleMap<_, Blake2_128Concat, T::AccountId, Blake2_128Concat, u128, u128, ValueQuery>;
			pub(super) type NftUri<T: Config> = StorageDoubleMap<_, Blake2_128Concat, u128, Blake2_128Concat, u128, Vec<u8>, ValueQuery>;
		*/
		/// Create Nft type, if use_supper_owner, the caller must be super owner or root
		#[pallet::weight(50_000_000)]
		pub fn translate(origin: OriginFor<T>, nft_type_index: u128, nft_index: u128, new_owner: T::AccountId) -> DispatchResult {
			let sender = ensure_signed(origin.clone())?;
			// check nft exist
			if ! <NftItemOwner<T>>::contains_key(nft_type_index, nft_index) {
				Err(Error::<T>::NftNotExist.into())
			}else {
				let owner_ori = <NftItemOwner<T>>::get(nft_type_index, nft_index);
				// check owner
				ensure!(sender == owner_ori, BadOrigin );
				// change owner
				<NftItemOwner<T>>::insert(nft_type_index, nft_index, new_owner.clone());
				<BalanceCount<T>>::insert(owner_ori.clone(), nft_type_index, <BalanceCount<T>>::get(owner_ori.clone(), nft_type_index) - 1);

				let new_count = if <BalanceCount<T>>::contains_key(new_owner.clone(), nft_type_index) {
					<BalanceCount<T>>::get(new_owner.clone(), nft_type_index)
				}else{
					0u128
				};
				<BalanceCount<T>>::insert(new_owner.clone(), nft_type_index, new_count+1);
				Self::deposit_event(Event::<T>::Translate(nft_type_index, nft_index, new_owner));
				Ok(())
			}
			
		}
	}
}
