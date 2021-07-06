#![cfg_attr(not(feature = "std"), no_std)]

use sp_std::prelude::*;
use sp_runtime::{
	traits::{StaticLookup, Zero}
};
use frame_support::{
	decl_module, decl_event, decl_storage, ensure, decl_error,
	traits::{Currency, EnsureOrigin, ReservableCurrency, OnUnbalanced, Get},
};
use frame_system::ensure_signed;

type BalanceOf<T> = <<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;
type NegativeImbalanceOf<T> = <<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::NegativeImbalance;

pub trait Config: frame_system::Config {
	type Event: From<Event<Self>> + Into<<Self as frame_system::Config>::Event>;

	type Currency: ReservableCurrency<Self::AccountId>;

	type ReservationFee: Get<BalanceOf<Self>>;

	type Slashed: OnUnbalanced<NegativeImbalanceOf<Self>>;

	type ForceOrigin: EnsureOrigin<Self::Origin>;

	type MinLength: Get<usize>;

	type MaxLength: Get<usize>;
}

decl_storage! {
	trait Store for Module<T: Config> as Nicks {
		NameOf: map hasher(twox_64_concat) T::AccountId => Option<(Vec<u8>, BalanceOf<T>)>;

		Records: map hasher(twox_64_concat) Vec<u8> => Option<(T::AccountId)>;
		Ttls: map hasher(twox_64_concat) Vec<u8> => Option<(u64)>;
		ExpiryTimes: map hasher(twox_64_concat) Vec<u8> => Option<(u64)>;

		Hashs: map hasher(twox_64_concat) Vec<u8> => Option<(Vec<u8>)>;
		Addresses: map hasher(twox_64_concat) Vec<u8> => Option<(Vec<u8>)>;
		Texts: map hasher(twox_64_concat) Vec<u8> => Option<(Vec<u8>)>;
	}
}

decl_event!(
	pub enum Event<T> where AccountId = <T as frame_system::Config>::AccountId, Balance = BalanceOf<T> {
		NameChanged(AccountId),
		NameCleared(AccountId, Balance),
	}
);

decl_error! {
	pub enum Error for Module<T: Config> {
		TooShort,
		TooLong,
		Unnamed,
	}
}

decl_module! {
	pub struct Module<T: Config> for enum Call where origin: T::Origin {
		type Error = Error<T>;

		fn deposit_event() = default;

		const ReservationFee: BalanceOf<T> = T::ReservationFee::get();

		const MinLength: u32 = T::MinLength::get() as u32;

		const MaxLength: u32 = T::MaxLength::get() as u32;

		#[weight = 50_000_000]
		fn set_name(origin, name: Vec<u8>) {
			let sender = ensure_signed(origin)?;

			ensure!(name.len() >= T::MinLength::get(), Error::<T>::TooShort);
			ensure!(name.len() <= T::MaxLength::get(), Error::<T>::TooLong);

			let deposit = if let Some((_, deposit)) = <NameOf<T>>::get(&sender) {
				Self::deposit_event(RawEvent::NameChanged(sender.clone()));
				deposit
			} else {
				let deposit = T::ReservationFee::get();
				T::Currency::reserve(&sender, deposit.clone())?;
				Self::deposit_event(RawEvent::NameChanged(sender.clone()));
				deposit
			};

			<NameOf<T>>::insert(&sender, (name, deposit));
		}

		#[weight = 70_000_000]
		fn clear_name(origin) {
			let sender = ensure_signed(origin)?;

			let deposit = <NameOf<T>>::take(&sender).ok_or(Error::<T>::Unnamed)?.1;

			let _ = T::Currency::unreserve(&sender, deposit.clone());

			Self::deposit_event(RawEvent::NameCleared(sender, deposit));
		}

		#[weight = 50_000_000]
		fn set_owner(origin, name: Vec<u8>) {
			let sender = ensure_signed(origin)?;

			<Records<T>>::insert(name, &sender);
		}

		#[weight = 50_000_000]
		fn set_subnode_owner(origin, label: Vec<u8>, name: Vec<u8>) {
			let sender = ensure_signed(origin)?;

			<Records<T>>::insert(name, &sender);
		}

		#[weight = 50_000_000]
		fn set_ttl(origin, node: Vec<u8>, ttl: u64) {
			let sender = ensure_signed(origin)?;

		}

		#[weight = 50_000_000]
		fn set_addr(origin, node: Vec<u8>, cointype: Vec<u8>, value: Vec<u8>) {
			let sender = ensure_signed(origin)?;

		}

		#[weight = 50_000_000]
		fn set_text(origin, node: Vec<u8>, key: Vec<u8>, value: Vec<u8>) {
			let sender = ensure_signed(origin)?;

		}

		#[weight = 50_000_000]
		fn set_contenthash(origin, node: Vec<u8>, hash: Vec<u8>) {
			let sender = ensure_signed(origin)?;

		}

	}
}
