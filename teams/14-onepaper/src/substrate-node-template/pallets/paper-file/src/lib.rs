#![cfg_attr(not(feature = "std"), no_std)]

use frame_support::{
	decl_module, decl_event,dispatch,transactional,
	traits::{Currency, ExistenceRequirement::{KeepAlive},tokens::WithdrawReasons},
};
use frame_system::{ensure_root};

type BalanceOf<T> = <<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;

pub trait Config: frame_system::Config {

	type Event: From<Event<Self>> + Into<<Self as frame_system::Config>::Event>;

	type Currency: Currency<Self::AccountId>;
}

decl_event!(
	pub enum Event<T> where AccountId = <T as frame_system::Config>::AccountId, Balance = BalanceOf<T> {
		Reward(AccountId,Balance),
		Deduct(AccountId,Balance),
	}
);

decl_module! {
	/// Nicks module declaration.
	pub struct Module<T: Config> for enum Call where origin: T::Origin {
		fn deposit_event() = default;

		#[weight = 0]
		#[transactional]
		pub fn reward(origin,value: BalanceOf<T>,who: T::AccountId) -> dispatch::DispatchResult {
			//ensure_root(origin)?;
			T::Currency::deposit_creating(&who, value);
			Self::deposit_event(RawEvent::Reward(who,value));
			Ok(())
		}
		#[weight = 0]
		pub fn deduct(origin,value: BalanceOf<T>,who: T::AccountId) -> dispatch::DispatchResult {
			//ensure_root(origin)?;
			T::Currency::withdraw(&who, value,WithdrawReasons::FEE,KeepAlive)?;
			Self::deposit_event(RawEvent::Deduct(who,value));
			Ok(())
		}
	}
}
