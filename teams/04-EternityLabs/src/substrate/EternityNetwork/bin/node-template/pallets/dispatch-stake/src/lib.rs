#![cfg_attr(not(feature = "std"), no_std)]

//! Simple Token Transfer
//! 1. set total supply
//! 2. establish ownership upon configuration of circulating tokens
//! 3. coordinate token transfers with the runtime functions
use frame_support::{
	decl_error, decl_event, decl_module, decl_storage, dispatch::DispatchResult, ensure,
};
use frame_system::ensure_signed;
use codec::{Encode,Decode};
use sp_std::vec::Vec;


pub trait Config: frame_system::Config {
	type Event: From<Event<Self>> + Into<<Self as frame_system::Config>::Event>;
}

#[derive(Encode, Decode, Default, PartialEq, Eq)]
#[cfg_attr(feature = "std", derive(Debug))]
pub struct DispatchsInfo<Benifical,EndBlock,Minstake,MaxNumOfDispatchs,Interval,State>{
	benifical:Benifical,//管理员发起的受益账户. AccountID
	end_block : EndBlock,//当前轮结束调度    u64
	minstake: Minstake,//最小质押量    u64
	max_authority:MaxNumOfDispatchs,//最大的质押节点个数   u64
	interval:Interval,//单次起拍间隔价格     u64
	state : State //是否在竞拍状态    bool
}

pub type DispIndex = u64;

type Benifical<T> = <T as frame_system::Config>::AccountId;
// type Minstake = u64;
// type EndBlock = u64;
// type MaxNumOfDispatchs = u64;
// type Interval = u64;
// type State = bool;

//type AccountIdOf<T> = <T as frame_system::Config>::AccountId;
// type BalancesOf<T> = <pallet_token::Module<T>>::get_balance;
type DispatchsInfoOf<T> = DispatchsInfo<Benifical<T>,u64,u64,u64,u64,bool>;

decl_storage! {
	trait Store for Module<T: Config> as Dispatchstake {
		pub Balances get(fn get_balance): map hasher(blake2_128_concat) T::AccountId => u64;
		pub TotalSupply get(fn total_supply): u64 = 21000000;
		Init get(fn is_init): bool;
		pub Dispatchs get(fn get_dispatch): map hasher(blake2_128_concat) u64 => Option<DispatchsInfoOf<T>>;
		pub StakeAccount get(fn stake_account): map hasher(blake2_128_concat) T::AccountId => (u64,u64);
		pub Dispatchss get(fn get_dsispatch): map hasher(blake2_128_concat) u64 => Vec<DispatchsInfoOf<T>>;
		// Init get(fn is_init): bool;
		pub DispCount get(fn dispatch_count): DispIndex;

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

		/// Initialize the token
		/// transfers the total_supply amout to the caller
		#[weight = 10_000]
		fn init(origin) -> DispatchResult {
			let creator = ensure_signed(origin)?;
			ensure!(!Self::is_init(), <Error<T>>::AlreadyInitialized);
            let benifical:Benifical<T> = creator;//管理员发起的受益账户. AccountID
            let end_block:u64 = 20 ;//当前轮结束调度    u64
            let minstake:u64  = 100;//最小质押量    u64
            let max_authority:u64  = 21;//最大的质押节点个数   u64
            let interval:u64  = 100 ;//单次起拍间隔价格     u64
            let state:bool = true ;//是否在竞拍状态    bool

            <Dispatchs<T>>::insert(1,DispatchsInfo{
                benifical,
                end_block,
                minstake,
                max_authority,
                interval,
                state,
            });

			Init::put(true);
			Ok(())
		}

        #[weight = 10_000]
        fn create_dispatch(_origin,benifical: T::AccountId,end_block:u64,minstake:u64,max_authority:u64,interval:u64,state:bool)->DispatchResult{
            let _sender = ensure_signed(_origin)?;

            let mut index = DispCount::get();
            index = index + 1;
          
            <Dispatchs<T>>::insert(index,DispatchsInfo{
                benifical,
                end_block,
                minstake,
                max_authority,
                interval,
                state,
            });

            <DispCount>::put(index);
            Ok(())
        }

		
	}
}
