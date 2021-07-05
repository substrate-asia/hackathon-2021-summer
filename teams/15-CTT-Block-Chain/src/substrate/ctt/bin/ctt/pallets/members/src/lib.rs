#![cfg_attr(not(feature = "std"), no_std)]

//! A pallet that implements a storage set on top of a sorted vec and demonstrates performance
//! tradeoffs when using map sets.

use frame_support::{
    codec::{Decode, Encode},
    decl_error, decl_event, decl_module, decl_storage,
    dispatch::DispatchResult,
    ensure,
    traits::{Currency, ExistenceRequirement::KeepAlive, Get, ReservableCurrency},
};
use frame_system::{self as system, ensure_signed};
use primitives::{AuthAccountId, Membership};
use sp_core::sr25519;
use sp_runtime::{
    print,
    traits::{AccountIdConversion, Hash, Verify},
    ModuleId, MultiSignature, RuntimeDebug,
};
use sp_std::cmp::*;
use sp_std::prelude::*;

#[cfg(test)]
mod tests;

type BalanceOf<T> =
    <<T as Trait>::Currency as Currency<<T as frame_system::Trait>::AccountId>>::Balance;

#[derive(Encode, Decode, Clone, Default, RuntimeDebug)]
pub struct AppData<Balance> {
    name: Vec<u8>,
    return_rate: u32,
    stake: Balance,
}

#[derive(Encode, Decode, Clone, RuntimeDebug)]
pub struct StableExchangeData<T: Trait> {
    receiver: T::AccountId,
    amount: BalanceOf<T>,
    redeemed: bool,
}

impl<T: Trait> Default for StableExchangeData<T> {
    fn default() -> Self {
        StableExchangeData {
            receiver: T::AccountId::default(),
            amount: 0.into(),
            redeemed: false,
        }
    }
}

#[derive(Encode, Decode, Clone, Default, PartialEq, RuntimeDebug)]
pub struct ModelExpertAddMemberParams {
    app_id: u32,
    model_id: Vec<u8>,
    kpt_profit_rate: u32,
}

#[derive(Encode, Decode, Clone, Default, PartialEq, RuntimeDebug)]
pub struct ModelExpertDelMemberParams<Account> {
    app_id: u32,
    model_id: Vec<u8>,
    member: Account,
}

#[derive(Encode, Decode, Clone, Default, PartialEq, RuntimeDebug)]
pub struct AppKeyManageParams<Account> {
    admin: AuthAccountId,
    app_id: u32,
    member: Account,
}

#[derive(Encode, Decode, Clone, Default, PartialEq, RuntimeDebug)]
pub struct FinanceMemberParams<Account, Balance> {
    deposit: Balance,
    member: Account,
}

pub trait Trait: system::Trait {
    type Event: From<Event<Self>> + Into<<Self as system::Trait>::Event>;
    type Currency: ReservableCurrency<Self::AccountId>;
    type ModelCreatorCreateBenefit: Get<BalanceOf<Self>>;
    type ModTreasuryModuleId: Get<ModuleId>;
    type MaxFinanceMembers: Get<u32>;
    type MinFinanceMemberDeposit: Get<BalanceOf<Self>>;
}

const MAX_APP_KEYS: usize = 16;

decl_event!(
    pub enum Event<T>
    where
        Balance = BalanceOf<T>,
        <T as frame_system::Trait>::AccountId,
    {
        /// Added a member2222
        MemberAdded(AccountId),
        /// Removed a member
        MemberRemoved(AccountId),
        AppAdminSet(AccountId),
        AppKeysSet(AccountId),
        ModleCreatorAdded(AccountId),
        NewUserBenefitDrpped(AccountId, Balance),
        StableExchanged(AccountId),
        AppRedeemAccountSet(AccountId),
        AppRedeemed(AccountId, AccountId, Balance),
        FinanceMemberDeposit(AccountId),
    }
);

decl_storage! {
    trait Store for Module<T: Trait> as Members {
        // Finance Root
        FinanceRoot get(fn finance_root) config(): T::AccountId;

        // Finance members group
        FinanceMembers get(fn finance_members): Vec<T::AccountId>;

        // Finance member deposit records
        FinanceMemberDeposit get(fn finance_member_deposit):
            map hasher(twox_64_concat) T::AccountId => BalanceOf<T>;

        // Investor members, system level
        InvestorMembers get(fn investor_members): Vec<T::AccountId>;

        // app level admin members key is app_id
        AppAdmins get(fn app_admins):
            map hasher(twox_64_concat) u32 => Vec<T::AccountId>;

        // App ID => App Keys
        AppKeys get(fn app_keys):
            map hasher(twox_64_concat) u32 => Vec<T::AccountId>;

        // AppId => AppData
        AppDataMap get(fn app_data_map):
            map hasher(twox_64_concat) u32 => AppData<BalanceOf<T>>;

        // app level platform comment experts, key is app_id, managed by app_admins
        AppPlatformExpertMembers get(fn app_platform_expert_members):
            map hasher(twox_64_concat) u32 => Vec<T::AccountId>;

        // The set of model creators. Stored as a map, key is app_id & model id
        ModelCreators get(fn model_creators):
            map hasher(twox_64_concat) T::Hash => T::AccountId;

        // key is app_id & model_id, this hash is managed by model_creator
        ExpertMembers get(fn expert_memebers):
            map hasher(twox_64_concat) T::Hash => Vec<T::AccountId>;

        // app_id model_id account -> u32
        ExpertMemberProfitRate get(fn expert_member_profit_rate):
            map hasher(twox_64_concat) T::Hash => u32;

        // app_id user_id -> u32 record first time user KPT drop
        NewAccountBenefitRecords get(fn new_account_benifit_records):
            map hasher(twox_64_concat) T::Hash => BalanceOf<T>;

        // app_id cash_receipt ->
        StableExchangeRecords get(fn stable_exchange_records):
            map hasher(twox_64_concat) T::Hash => StableExchangeData<T>;

        // app_id stash account(for redeem receiver)
        AppRedeemAccount get(fn app_redeem_account):
            map hasher(twox_64_concat) u32 => T::AccountId;
    }
}

decl_error! {
    pub enum Error for Module<T: Trait> {
        /// Cannot join as a member because you are already a member
        AlreadyMember,
        /// Cannot give up membership because you are not currently a member
        NotMember,
        NotAppAdmin,
        NotAppIdentity,
        NotModelCreator,
        CallerNotFinanceMemeber,
        CallerNotFinanceRoot,
        MembersLenTooLow,
        BenefitAlreadyDropped,
        NotEnoughFund,
        StableExchangeReceiptExist,
        StableExchangeReceiptNotFound,
        StableRedeemRepeat,
        AppRedeemAcountNotSet,
        StableRedeemAccountNotMatch,
        SignVerifyError,
        AppIdInvalid,
        AuthIdentityNotAppAdmin,
        AppKeysLimitReached,
        AppKeysOnlyOne,
        FinanceMemberSizeOver,
        FinanceMemberDepositTooLow,
        DepositTooSmall,
    }
}

impl<T: Trait> Module<T> {
    fn convert_account(origin: &AuthAccountId) -> T::AccountId {
        let tmp: [u8; 32] = origin.clone().into();
        T::AccountId::decode(&mut &tmp[..]).unwrap_or_default()
    }

    fn verify_sign(pub_key: &AuthAccountId, sign: sr25519::Signature, msg: &[u8]) -> bool {
        let ms: MultiSignature = sign.into();
        ms.verify(msg, &pub_key)
    }

    pub fn is_platform_expert(who: &T::AccountId, app_id: u32) -> bool {
        let members = <AppPlatformExpertMembers<T>>::get(app_id);
        match members.binary_search(who) {
            Ok(_) => true,
            Err(_) => false,
        }
    }

    pub fn is_model_expert(who: &T::AccountId, app_id: u32, model_id: &Vec<u8>) -> bool {
        let key = T::Hashing::hash_of(&(app_id, model_id));
        let members = <ExpertMembers<T>>::get(&key);
        match members.binary_search(who) {
            Ok(_) => true,
            Err(_) => false,
        }
    }

    pub fn is_investor(who: &T::AccountId) -> bool {
        let members = InvestorMembers::<T>::get();
        match members.binary_search(who) {
            Ok(_) => true,
            Err(_) => false,
        }
    }

    pub fn is_model_creator(who: &T::AccountId, app_id: u32, model_id: &Vec<u8>) -> bool {
        let key = T::Hashing::hash_of(&(app_id, model_id));
        <ModelCreators<T>>::contains_key(&key) && <ModelCreators<T>>::get(&key) == *who
    }

    pub fn is_app_admin(who: &T::AccountId, app_id: u32) -> bool {
        let members = <AppAdmins<T>>::get(app_id);

        match members.binary_search(who) {
            // If the search succeeds, the caller is already a member, so just return
            Ok(_index) => true,
            // If the search fails, the caller is not a member, so just return
            Err(_) => false,
        }
    }

    pub fn is_app_identity(who: &T::AccountId, app_id: u32) -> bool {
        //let test = who.clone().encode().as_slice();
        let members = <AppKeys<T>>::get(app_id);

        match members.binary_search(who) {
            // If the search succeeds, the caller is already a member, so just return
            Ok(_index) => true,
            // If the search fails, the caller is not a member, so just return
            Err(_) => false,
        }
    }

    pub fn model_experts(app_id: u32, model_id: Vec<u8>) -> Vec<T::AccountId> {
        let key = T::Hashing::hash_of(&(app_id, &model_id));
        <ExpertMembers<T>>::get(&key)
    }

    pub fn model_add_expert(key: &T::Hash, new_member: &T::AccountId) {
        let mut members = <ExpertMembers<T>>::get(key);

        match members.binary_search(new_member) {
            // If the search succeeds, the caller is already a member, so just return
            Ok(_) => {}
            // If the search fails, the caller is not a member and we learned the index where
            // they should be inserted
            Err(index) => {
                members.insert(index, new_member.clone());
                <ExpertMembers<T>>::insert(key, members);
            }
        }
    }

    pub fn model_remove_expert(key: &T::Hash, member: &T::AccountId) {
        let mut members = <ExpertMembers<T>>::get(key);

        match members.binary_search(member) {
            // If the search succeeds, the caller is already a member, so just return
            Ok(index) => {
                members.remove(index);
                <ExpertMembers<T>>::insert(key, members);
            }
            // If the search fails, the caller is not a member, so just return
            Err(_) => {}
        }
    }

    pub fn model_creator(app_id: u32, model_id: Vec<u8>) -> T::AccountId {
        let key = T::Hashing::hash_of(&(app_id, &model_id));
        <ModelCreators<T>>::get(&key)
    }

    pub fn is_finance_member(who: &T::AccountId) -> bool {
        <FinanceMembers<T>>::get().contains(who)
    }

    pub fn is_finance_root(who: &T::AccountId) -> bool {
        *who == <FinanceRoot<T>>::get()
    }

    pub fn slash_finance_member(
        member: &T::AccountId,
        receiver: &T::AccountId,
        amount: BalanceOf<T>,
    ) -> DispatchResult {
        let deposit = <FinanceMemberDeposit<T>>::get(member);
        if deposit == 0u32.into() {
            // nothing to do
        } else {
            let slash = min(deposit, amount);
            T::Currency::unreserve(member, slash);
            T::Currency::transfer(member, receiver, slash, KeepAlive)?;
            <FinanceMemberDeposit<T>>::insert(member, deposit - slash);
        }

        Ok(())
    }

    /// return valid finance members (depoist is enough)
    pub fn valid_finance_members() -> Vec<T::AccountId> {
        let min_deposit = T::MinFinanceMemberDeposit::get();
        let members: Vec<T::AccountId> = <FinanceMembers<T>>::get();

        if members.len() == 0 {
            return vec![];
        }

        // read out all deposit
        let mut deposits: Vec<(&T::AccountId, BalanceOf<T>)> = vec![];
        for member in members.iter() {
            deposits.push((member, <FinanceMemberDeposit<T>>::get(member)));
        }

        deposits.sort_by(|a, b| b.1.cmp(&a.1));

        let max = deposits[0];
        if max.1 < min_deposit {
            return vec![];
        }

        let mut pos = 0;
        for deposit in deposits.iter() {
            if deposit.1 < max.1 {
                break;
            }

            pos += 1;
        }

        deposits[..pos]
            .iter()
            .map(|deposit| deposit.0.clone())
            .collect::<Vec<T::AccountId>>()
    }
}

impl<T: Trait> Membership<T::AccountId, T::Hash, BalanceOf<T>> for Module<T> {
    fn is_platform(who: &T::AccountId, app_id: u32) -> bool {
        Self::is_platform_expert(who, app_id)
    }
    fn is_expert(who: &T::AccountId, app_id: u32, model_id: &Vec<u8>) -> bool {
        Self::is_model_expert(who, app_id, model_id)
    }

    fn is_app_admin(who: &T::AccountId, app_id: u32) -> bool {
        Self::is_app_admin(who, app_id)
    }

    fn is_investor(who: &T::AccountId) -> bool {
        Self::is_investor(who)
    }

    fn is_finance_member(who: &T::AccountId) -> bool {
        Self::is_finance_member(who)
    }

    fn set_model_creator(
        key: &T::Hash,
        creator: &T::AccountId,
        is_give_benefit: bool,
    ) -> BalanceOf<T> {
        // this interface is only available form pallet internal (from kp to member invoking)
        <ModelCreators<T>>::insert(key, creator);

        // insert creator into ExpertMembers
        let mut members = <ExpertMembers<T>>::get(key);
        // members should be empty now
        members.push(creator.clone());
        <ExpertMembers<T>>::insert(key, members);

        // give benifit to creator
        let treasury_account: T::AccountId = T::ModTreasuryModuleId::get().into_account();
        print("set_model_creator");

        if is_give_benefit {
            let reward = T::ModelCreatorCreateBenefit::get();
            let _ = T::Currency::transfer(&treasury_account, creator, reward, KeepAlive);
            return reward;
        }

        0u32.into()
    }

    fn transfer_model_owner(key: &T::Hash, new_owner: &T::AccountId) {
        let owner = <ModelCreators<T>>::get(key);
        // set new owner
        <ModelCreators<T>>::insert(key, &new_owner);
        // remove owner from expert members
        Self::model_remove_expert(key, &owner);
        // add new member
        Self::model_add_expert(key, new_owner);
    }

    fn is_model_creator(who: &T::AccountId, app_id: u32, model_id: &Vec<u8>) -> bool {
        Self::is_model_creator(who, app_id, model_id)
    }

    // only used for app register
    fn config_app_admin(who: &T::AccountId, app_id: u32) {
        let mut members = <AppAdmins<T>>::get(app_id);
        members.push(who.clone());
        <AppAdmins<T>>::insert(app_id, members);
    }

    // only used for app register
    fn config_app_key(who: &T::AccountId, app_id: u32) {
        let mut members = <AppKeys<T>>::get(app_id);
        members.push(who.clone());
        <AppKeys<T>>::insert(app_id, members);
    }

    fn config_app_setting(app_id: u32, rate: u32, name: Vec<u8>, stake: BalanceOf<T>) {
        <AppDataMap<T>>::insert(
            app_id,
            &AppData {
                return_rate: rate,
                name,
                stake,
            },
        );
    }

    fn get_app_setting(app_id: u32) -> (u32, Vec<u8>, BalanceOf<T>) {
        let setting = <AppDataMap<T>>::get(app_id);
        (setting.return_rate, setting.name, setting.stake)
    }

    fn is_valid_app(app_id: u32) -> bool {
        <AppDataMap<T>>::contains_key(app_id)
    }

    fn is_valid_app_key(app_id: u32, app_key: &T::AccountId) -> bool {
        Self::is_app_identity(app_key, app_id)
    }

    fn valid_finance_members() -> Vec<T::AccountId> {
        Self::valid_finance_members()
    }

    fn slash_finance_member(
        member: &T::AccountId,
        receiver: &T::AccountId,
        amount: BalanceOf<T>,
    ) -> DispatchResult {
        Self::slash_finance_member(member, receiver, amount)
    }
}

decl_module! {
    pub struct Module<T: Trait> for enum Call where origin: T::Origin {
        fn deposit_event() = default;

        type Error = Error<T>;

        #[weight = 0]
        pub fn add_investor_member(origin, app_id: u32, new_member: T::AccountId) -> DispatchResult {
            let who = ensure_signed(origin)?;

            ensure!(Self::is_valid_app(app_id), Error::<T>::AppIdInvalid);

            // check if who is app admin
            ensure!(Self::is_app_admin(&who, app_id), Error::<T>::NotAppAdmin);

            let mut members = InvestorMembers::<T>::get();
            //ensure!(members.len() < MAX_MEMBERS, Error::<T>::MembershipLimitReached);

            // We don't want to add duplicate members, so we check whether the potential new
            // member is already present in the list. Because the list is always ordered, we can
            // leverage the binary search which makes this check O(log n).
            match members.binary_search(&new_member) {
                // If the search succeeds, the caller is already a member, so just return
                Ok(_) => Err(Error::<T>::AlreadyMember.into()),
                // If the search fails, the caller is not a member and we learned the index where
                // they should be inserted
                Err(index) => {
                    members.insert(index, new_member.clone());
                    InvestorMembers::<T>::put(members);
                    Self::deposit_event(RawEvent::MemberAdded(new_member));
                    Ok(())
                }
            }
        }

        /// Removes a member.
        #[weight = 0]
        pub fn remove_investor_member(origin, app_id: u32, old_member: T::AccountId) -> DispatchResult {
            let who = ensure_signed(origin)?;

            ensure!(Self::is_valid_app(app_id), Error::<T>::AppIdInvalid);
            // check if who is app admin
            ensure!(Self::is_app_admin(&who, app_id), Error::<T>::NotAppAdmin);

            let mut members = InvestorMembers::<T>::get();

            // We have to find out if the member exists in the sorted vec, and, if so, where.
            match members.binary_search(&old_member) {
                // If the search succeeds, the caller is a member, so remove her
                Ok(index) => {
                    members.remove(index);
                    InvestorMembers::<T>::put(members);
                    Self::deposit_event(RawEvent::MemberRemoved(old_member));
                    Ok(())
                },
                // If the search fails, the caller is not a member, so just return
                Err(_) => Err(Error::<T>::NotMember.into()),
            }
        }

        #[weight = 0]
        pub fn add_finance_member(origin, params: FinanceMemberParams<T::AccountId, BalanceOf<T>>, app_user_account: AuthAccountId, app_user_sign: sr25519::Signature) -> DispatchResult {
            let who = ensure_signed(origin)?;

            ensure!(Self::is_finance_root(&who), Error::<T>::CallerNotFinanceRoot);

            let buf = params.encode();
            ensure!(Self::verify_sign(&app_user_account, app_user_sign, &buf), Error::<T>::SignVerifyError);

            let FinanceMemberParams {
                deposit,
                member
            } = params;

            ensure!(deposit >= T::MinFinanceMemberDeposit::get(), Error::<T>::FinanceMemberDepositTooLow);

            let mut members = FinanceMembers::<T>::get();
            ensure!((members.len() as u32) < T::MaxFinanceMembers::get(), Error::<T>::FinanceMemberSizeOver);

            match members.binary_search(&member) {
                // If the search succeeds, the caller is already a member, so just return
                Ok(_) => Err(Error::<T>::AlreadyMember.into()),
                // If the search fails, the caller is not a member and we learned the index where
                // they should be inserted
                Err(index) => {
                    // make sure deposit success
                    T::Currency::reserve(&member, deposit)?;

                    <FinanceMemberDeposit<T>>::insert(&member, deposit);

                    members.insert(index, member.clone());
                    FinanceMembers::<T>::put(members);
                    Self::deposit_event(RawEvent::MemberAdded(member));
                    Ok(())
                }
            }
        }

        /// Removes a member.
        #[weight = 0]
        pub fn remove_finance_member(origin, old_member: T::AccountId) -> DispatchResult {
            let who = ensure_signed(origin)?;

            ensure!(Self::is_finance_root(&who), Error::<T>::CallerNotFinanceRoot);

            let mut members = FinanceMembers::<T>::get();

            // We have to find out if the member exists in the sorted vec, and, if so, where.
            match members.binary_search(&old_member) {
                // If the search succeeds, the caller is a member, so remove her
                Ok(index) => {
                    // unreserve deposit
                    let deposit = <FinanceMemberDeposit<T>>::get(&old_member);
                    T::Currency::unreserve(&old_member, deposit);

                    members.remove(index);
                    FinanceMembers::<T>::put(members);
                    Self::deposit_event(RawEvent::MemberRemoved(old_member));
                    Ok(())
                },
                // If the search fails, the caller is not a member, so just return
                Err(_) => Err(Error::<T>::NotMember.into()),
            }
        }

        #[weight = 0]
        pub fn finance_member_add_deposit(origin, deposit: BalanceOf<T>) -> DispatchResult {
            let who = ensure_signed(origin)?;

            ensure!(deposit > 0u32.into(), Error::<T>::DepositTooSmall);

            T::Currency::reserve(&who, deposit)?;

            <FinanceMemberDeposit<T>>::mutate(&who, |org_deposit| {
                *org_deposit += deposit;
            });

            Self::deposit_event(RawEvent::FinanceMemberDeposit(who));
            Ok(())
        }

        #[weight = 0]
        pub fn add_app_admin(origin, params: AppKeyManageParams<T::AccountId>, sign: sr25519::Signature) -> DispatchResult {
            let who = ensure_signed(origin)?;

            let sign_buf = params.encode();
            let AppKeyManageParams {
                app_id,
                member,
                admin,
            } = params;

            // check if valid app
            ensure!(Self::is_valid_app(app_id), Error::<T>::AppIdInvalid);
            // check if admin member
            ensure!(Self::is_app_admin(&Self::convert_account(&admin), app_id), Error::<T>::NotAppAdmin);
            // check if identity member
            ensure!(Self::is_app_identity(&who, app_id), Error::<T>::NotAppIdentity);

            let mut members = <AppAdmins<T>>::get(app_id);
            // check max length
            ensure!(members.len() < MAX_APP_KEYS, Error::<T>::AppKeysLimitReached);
            // check sign
            ensure!(Self::verify_sign(&admin, sign, &sign_buf), Error::<T>::SignVerifyError);
            // all pass now add
            match members.binary_search(&member) {
                // If the search succeeds, the caller is already a member, so just return
                Ok(_) => Err(Error::<T>::AlreadyMember.into()),
                // If the search fails, the caller is not a member and we learned the index where
                // they should be inserted
                Err(index) => {
                    members.insert(index, member.clone());
                    <AppAdmins<T>>::insert(app_id, members);
                    Self::deposit_event(RawEvent::AppAdminSet(member));
                    Ok(())
                }
            }
        }

         #[weight = 0]
        pub fn remove_app_admin(origin, params: AppKeyManageParams<T::AccountId>, sign: sr25519::Signature) -> DispatchResult {
            let who = ensure_signed(origin)?;

            let sign_buf = params.encode();
            let AppKeyManageParams {
                app_id,
                member,
                admin,
            } = params;

            // check if valid app
            ensure!(Self::is_valid_app(app_id), Error::<T>::AppIdInvalid);
            // check if admin member
            ensure!(Self::is_app_admin(&Self::convert_account(&admin), app_id), Error::<T>::NotAppAdmin);
            // check if identity member
            ensure!(Self::is_app_identity(&who, app_id), Error::<T>::NotAppIdentity);

            let mut members = <AppAdmins<T>>::get(app_id);
            // check max length
            ensure!(members.len() > 1, Error::<T>::AppKeysOnlyOne);
            // check sign
            ensure!(Self::verify_sign(&admin, sign, &sign_buf), Error::<T>::SignVerifyError);
            // all pass now add
            match members.binary_search(&member) {
                // If the search succeeds, the caller is already a member, so just return
                Ok(index) => {
                    members.remove(index);
                    <AppAdmins<T>>::insert(app_id, members);
                    Self::deposit_event(RawEvent::MemberRemoved(member));
                    Ok(())
                },
                // If the search fails, the caller is not a member, so just return
                Err(_) => Err(Error::<T>::NotMember.into()),
            }
        }

        #[weight = 0]
        pub fn add_app_key(origin, params: AppKeyManageParams<T::AccountId>, sign: sr25519::Signature) -> DispatchResult {
            let who = ensure_signed(origin)?;

            let sign_buf = params.encode();
            let AppKeyManageParams {
                app_id,
                member,
                admin,
            } = params;

            // check if valid app
            ensure!(Self::is_valid_app(app_id), Error::<T>::AppIdInvalid);
            // check if admin member
            ensure!(Self::is_app_admin(&Self::convert_account(&admin), app_id), Error::<T>::NotAppAdmin);
            // check if identity member
            ensure!(Self::is_app_identity(&who, app_id), Error::<T>::NotAppIdentity);

            let mut members = <AppKeys<T>>::get(app_id);
            // check max length
            ensure!(members.len() < MAX_APP_KEYS, Error::<T>::AppKeysLimitReached);
            // check sign
            ensure!(Self::verify_sign(&admin, sign, &sign_buf), Error::<T>::SignVerifyError);
            // all pass now add
            match members.binary_search(&member) {
                // If the search succeeds, the caller is already a member, so just return
                Ok(_) => Err(Error::<T>::AlreadyMember.into()),
                // If the search fails, the caller is not a member and we learned the index where
                // they should be inserted
                Err(index) => {
                    members.insert(index, member.clone());
                    <AppKeys<T>>::insert(app_id, members);
                    Self::deposit_event(RawEvent::AppKeysSet(member));
                    Ok(())
                }
            }
        }

         #[weight = 0]
        pub fn remove_app_key(origin, params: AppKeyManageParams<T::AccountId>, sign: sr25519::Signature) -> DispatchResult {
            let who = ensure_signed(origin)?;

            let sign_buf = params.encode();
            let AppKeyManageParams {
                app_id,
                member,
                admin,
            } = params;

            // check if valid app
            ensure!(Self::is_valid_app(app_id), Error::<T>::AppIdInvalid);
            // check if admin member
            ensure!(Self::is_app_admin(&Self::convert_account(&admin), app_id), Error::<T>::NotAppAdmin);
            // check if identity member
            ensure!(Self::is_app_identity(&who, app_id), Error::<T>::NotAppIdentity);

            let mut members = <AppKeys<T>>::get(app_id);
            // check max length
            ensure!(members.len() > 1, Error::<T>::AppKeysOnlyOne);
            // check sign
            ensure!(Self::verify_sign(&admin, sign, &sign_buf), Error::<T>::SignVerifyError);
            // all pass now add
            match members.binary_search(&member) {
                // If the search succeeds, the caller is already a member, so just return
                Ok(index) => {
                    members.remove(index);
                    <AppKeys<T>>::insert(app_id, members);
                    Self::deposit_event(RawEvent::MemberRemoved(member));
                    Ok(())
                },
                // If the search fails, the caller is not a member, so just return
                Err(_) => Err(Error::<T>::NotMember.into()),
            }
        }

        #[weight = 0]
        pub fn add_app_platform_expert_member(origin, app_id: u32, new_member: T::AccountId) -> DispatchResult {
            let who = ensure_signed(origin)?;

            ensure!(Self::is_valid_app(app_id), Error::<T>::AppIdInvalid);

            // check if origin is app_id's admin
            ensure!(Self::is_app_admin(&who, app_id),  Error::<T>::NotAppAdmin);

            let mut members = <AppPlatformExpertMembers<T>>::get(app_id);

            match members.binary_search(&new_member) {
                // If the search succeeds, the caller is already a member, so just return
                Ok(_) => Err(Error::<T>::AlreadyMember.into()),
                // If the search fails, the caller is not a member and we learned the index where
                // they should be inserted
                Err(index) => {
                    members.insert(index, new_member.clone());
                    <AppPlatformExpertMembers<T>>::insert(app_id, members);
                    Self::deposit_event(RawEvent::MemberAdded(new_member));
                    Ok(())
                }
            }
        }

        #[weight = 0]
        pub fn remove_app_platform_expert_member(origin, app_id: u32, old_member: T::AccountId) -> DispatchResult {
            let who = ensure_signed(origin)?;

            ensure!(Self::is_valid_app(app_id), Error::<T>::AppIdInvalid);

            // check if origin is app_id's admin
            ensure!(Self::is_app_admin(&who, app_id),  Error::<T>::NotAppAdmin);

            let mut members = <AppPlatformExpertMembers<T>>::get(app_id);

            match members.binary_search(&old_member) {
                // If the search succeeds, the caller is already a member, so just return
                Ok(index) => {
                    members.remove(index);
                    <AppPlatformExpertMembers<T>>::insert(app_id, members);
                    Self::deposit_event(RawEvent::MemberRemoved(old_member));
                    Ok(())
                },
                // If the search fails, the caller is not a member, so just return
                Err(_) => Err(Error::<T>::NotMember.into()),
            }
        }

        #[weight = 0]
        pub fn add_expert_member(origin, params: ModelExpertAddMemberParams, model_creator: AuthAccountId, model_creator_sign: sr25519::Signature) -> DispatchResult {
            let new_member = ensure_signed(origin)?;

            ensure!(Self::verify_sign(&model_creator, model_creator_sign, &params.encode()), Error::<T>::SignVerifyError);

            let ModelExpertAddMemberParams {
                app_id,
                model_id,
                kpt_profit_rate,
            } = params;

            ensure!(Self::is_valid_app(app_id), Error::<T>::AppIdInvalid);

            // check if model creator valid
            ensure!(Self::is_model_creator(&Self::convert_account(&model_creator), app_id, &model_id), Error::<T>::NotModelCreator);

            let key = T::Hashing::hash_of(&(app_id, &model_id));

            let mut members = <ExpertMembers<T>>::get(&key);

            match members.binary_search(&new_member) {
                // If the search succeeds, the caller is already a member, so just return
                Ok(_) => Err(Error::<T>::AlreadyMember.into()),
                // If the search fails, the caller is not a member and we learned the index where
                // they should be inserted
                Err(index) => {
                    members.insert(index, new_member.clone());
                    <ExpertMembers<T>>::insert(&key, members);

                    // update profit rate store
                    let profit_key = T::Hashing::hash_of(&(app_id, &model_id, &new_member));
                    <ExpertMemberProfitRate<T>>::insert(&profit_key, kpt_profit_rate);

                    Self::deposit_event(RawEvent::MemberAdded(new_member));
                    Ok(())
                }
            }
        }

        #[weight = 0]
        pub fn remove_expert_member(origin,
            params: ModelExpertDelMemberParams<T::AccountId>,
            app_user_account: AuthAccountId,
            app_user_sign: sr25519::Signature,

            auth_server: AuthAccountId,
            auth_sign: sr25519::Signature) -> DispatchResult {

            // this is app server account
            let _who = ensure_signed(origin)?;

            let buf = params.encode();
            ensure!(Self::verify_sign(&app_user_account, app_user_sign, &buf), Error::<T>::SignVerifyError);
            ensure!(Self::verify_sign(&auth_server, auth_sign, &buf), Error::<T>::SignVerifyError);

            let ModelExpertDelMemberParams {
                app_id,
                model_id,
                member,
            } = params;

            ensure!(Self::is_valid_app(app_id), Error::<T>::AppIdInvalid);
            // makre sure auth_server is app admin account
            ensure!(Self::is_app_admin(&Self::convert_account(&auth_server), app_id), Error::<T>::AuthIdentityNotAppAdmin);

            // check the creator authority
            let key = T::Hashing::hash_of(&(app_id, &model_id));
            let creator = <ModelCreators<T>>::get(&key);
            ensure!(creator == Self::convert_account(&app_user_account), Error::<T>::NotModelCreator);

            let mut members = <ExpertMembers<T>>::get(&key);

            match members.binary_search(&member) {
                // If the search succeeds, the caller is already a member, so just return
                Ok(index) => {
                    members.remove(index);
                    <ExpertMembers<T>>::insert(&key, members);
                    Self::deposit_event(RawEvent::MemberRemoved(member));
                    Ok(())
                },
                // If the search fails, the caller is not a member, so just return
                Err(_) => Err(Error::<T>::NotMember.into()),
            }
        }

        #[weight = 0]
        pub fn air_drop_new_user_benefit(origin, app_id: u32, user_id: Vec<u8>,
            receiver: <T as frame_system::Trait>::AccountId, amount: BalanceOf<T>) -> DispatchResult {

            let who = ensure_signed(origin)?;

            ensure!(Self::is_valid_app(app_id), Error::<T>::AppIdInvalid);

            let key = T::Hashing::hash_of(&(app_id, &user_id));

            ensure!(!<NewAccountBenefitRecords<T>>::contains_key(&key), Error::<T>::BenefitAlreadyDropped);

            // make sure sender has enough fund
            let available = T::Currency::free_balance(&who);
            ensure!(available > amount, Error::<T>::NotEnoughFund);

            // start air drop
            let _ = T::Currency::transfer(&who, &receiver, amount, KeepAlive);

            // record it
            <NewAccountBenefitRecords<T>>::insert(&key, amount);

            Self::deposit_event(RawEvent::NewUserBenefitDrpped(receiver, amount));
            Ok(())
        }

        #[weight = 0]
        pub fn stable_exchange(origin, amount: BalanceOf<T>, receiver: T::AccountId, app_id: u32, cash_receipt: Vec<u8>) -> DispatchResult {
            let who = ensure_signed(origin)?;

            ensure!(Self::is_valid_app(app_id), Error::<T>::AppIdInvalid);

            let available = T::Currency::free_balance(&who);
            ensure!(available > amount, Error::<T>::NotEnoughFund);

            let key = T::Hashing::hash_of(&(app_id, &cash_receipt));
            ensure!(!<StableExchangeRecords<T>>::contains_key(&key), Error::<T>::StableExchangeReceiptExist);

            T::Currency::transfer(&who, &receiver, amount, KeepAlive)?;

            <StableExchangeRecords<T>>::insert(&key, StableExchangeData {
                receiver: receiver.clone(),
                amount,
                redeemed: false,
            });

            Self::deposit_event(RawEvent::StableExchanged(receiver));
            Ok(())
        }

        #[weight = 0]
        pub fn stable_redeem(origin, app_id: u32, cash_receipt: Vec<u8>) -> DispatchResult {
            let who = ensure_signed(origin)?;

            ensure!(Self::is_valid_app(app_id), Error::<T>::AppIdInvalid);

            let key = T::Hashing::hash_of(&(app_id, &cash_receipt));
            ensure!(<StableExchangeRecords<T>>::contains_key(&key), Error::<T>::StableExchangeReceiptNotFound);

            // read out records
            let mut record = <StableExchangeRecords<T>>::get(&key);
            ensure!(!record.redeemed, Error::<T>::StableRedeemRepeat);
            ensure!(record.receiver == who, Error::<T>::StableRedeemAccountNotMatch);
            ensure!(<AppRedeemAccount<T>>::contains_key(app_id), Error::<T>::AppRedeemAcountNotSet);

            // read out application store account
            let receiver = <AppRedeemAccount<T>>::get(app_id);

            T::Currency::transfer(&who, &receiver, record.amount, KeepAlive)?;

            // update record
            record.redeemed = true;
            <StableExchangeRecords<T>>::insert(&key, &record);

            Self::deposit_event(RawEvent::AppRedeemed(who, receiver, record.amount));
            Ok(())
        }

        #[weight = 0]
        pub fn set_app_redeem_account(origin, app_id: u32, account: T::AccountId) -> DispatchResult {
            let who = ensure_signed(origin)?;

            ensure!(Self::is_valid_app(app_id), Error::<T>::AppIdInvalid);

            // check if origin is app_id's admin
            ensure!(Self::is_app_admin(&who, app_id),  Error::<T>::NotAppAdmin);

            <AppRedeemAccount<T>>::insert(app_id, &account);

            Self::deposit_event(RawEvent::AppRedeemAccountSet(account));
            Ok(())
        }
    }
}
