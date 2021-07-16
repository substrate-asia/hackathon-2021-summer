#![cfg_attr(not(feature = "std"), no_std)]

/// A module for proof of existence

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
    use frame_support::{
        dispatch::DispatchResultWithPostInfo, 
        pallet_prelude::*,
    };
    use frame_system::pallet_prelude::*;
    use sp_std::vec::Vec;

    #[pallet::config]
    pub trait Config: frame_system::Config {
        /// Because this pallet emits events, it depends on the runtime's definition of an event.
        type Event: From<Event<Self>> + IsType<<Self as frame_system::Config>::Event>;
    }

    // Pallets use events to inform users when important changes are made.
    #[pallet::event]
    #[pallet::metadata(T::AccountId = "AccountId")]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        /// Event emitted when a proof has been claimed. 
        ProofCreated(T::AccountId, Vec<u8>),
        /// Event emitted when a proof is revoked by the owner.
        ProofRevoked(T::AccountId, Vec<u8>),
        /// Event transfered when a proof is tranfered to others.
        ProofTransferred(T::AccountId, T::AccountId, Vec<u8>),
    }

    #[pallet::error]
    pub enum Error<T> {
            /// The proof has already been claimed.
            AlreadyExist,
            /// The claim does not exist, so it cannot be revoked.
            NoSuchProof,
            /// It is claimed by another account, so caller can't revoke it.
            NotOwner,
        }

    #[pallet::pallet]
    #[pallet::generate_store(pub(super) trait Store)]
    pub struct Pallet<T>(_);
    
    #[pallet::storage] 
    pub(super) type Proofs<T: Config> = StorageMap<
         _, 
         Blake2_128Concat, 
         Vec<u8>, 
         (T::AccountId, T::BlockNumber), 
         ValueQuery
         >;

    #[pallet::hooks]
    impl<T: Config> Hooks<BlockNumberFor<T>> for Pallet<T> {}
    
    // Dispatchable functions allows users to interact with the pallet and invoke state changes.
    // These functions materialize as "extrinsics", which are often compared to transactions.
    // Dispatchable functions must be annotated with a weight and must return a DispatchResult.
    #[pallet::call]
    impl<T: Config> Pallet<T> {
        #[pallet::weight(1_000)]
        pub(super) fn create_proof(
            origin: OriginFor<T>,
            proof: Vec<u8>,
        ) -> DispatchResultWithPostInfo {

            // Check that the extrinsic was signed and get the signer.
            let sender = ensure_signed(origin)?;
        
            // Verify that the specified proof has not already been claimed.         
            ensure!(!Proofs::<T>::contains_key(&proof), Error::<T>::AlreadyExist);

            // Get the block number from the FRAME System.
            //let current_block = <frame_system::Module<T>>::block_number();
            let current_block = <frame_system::pallet::Pallet<T>>::block_number();

            // Store the proof with the sender and block number.
            Proofs::<T>::insert(&proof, (&sender, current_block));

            // Emit an event that the claim was created.
            Self::deposit_event(Event::ProofCreated(sender, proof));

            Ok(().into())
        }

        #[pallet::weight(10_000)]
        fn revoke_proof(
            origin: OriginFor<T>,
            proof: Vec<u8>,
        ) -> DispatchResultWithPostInfo {
           
            // Check that the extrinsic was signed and get the signer.
            let sender = ensure_signed(origin)?;

            // Verify that the specified proof has been claimed.
            ensure!(Proofs::<T>::contains_key(&proof), Error::<T>::NoSuchProof);

            // Get owner of the claim.
            let (owner, _) = Proofs::<T>::get(&proof);

            // Verify that sender of the current call is the claim owner.
            ensure!(sender == owner, Error::<T>::NotOwner);

            // Remove claim from storage.
            Proofs::<T>::remove(&proof);

            // Emit an event that the claim was erased.
            Self::deposit_event(Event::ProofRevoked(sender, proof));

            Ok(().into())
        }

        #[pallet::weight(1_000)]
        pub(super) fn transfer_proof(
            origin: OriginFor<T>,
            recipient: T::AccountId,
            proof: Vec<u8>
        ) -> DispatchResultWithPostInfo {

            // Check that the extrinsic was signed and get the signer.
            let sender = ensure_signed(origin)?;
        
            // Verify that the specified proof has already been claimed.         
            ensure!(Proofs::<T>::contains_key(&proof), Error::<T>::AlreadyExist);

            // Get owner of the claim.
            let (owner, _) = Proofs::<T>::get(&proof);

            // Verify that sender of the current call is the claim owner.
            ensure!(sender == owner, Error::<T>::NotOwner);

            // Remove claim from storage.
            Proofs::<T>::remove(&proof);

            // Get the block number from the FRAME System.
            //let current_block = <frame_system::Module<T>>::block_number();
            let current_block = <frame_system::pallet::Pallet<T>>::block_number();

            // Store the proof with the recipient and block number.
            Proofs::<T>::insert(&proof, (&recipient, current_block));
            
            // Delete 
            // Emit an event that the proof was transferred.
            Self::deposit_event(Event::ProofTransferred(sender, recipient, proof));

            Ok(().into())
        }
    } 
}