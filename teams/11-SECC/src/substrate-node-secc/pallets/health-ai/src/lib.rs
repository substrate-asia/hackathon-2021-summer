#![cfg_attr(not(feature = "std"), no_std)]

use codec::{Decode, Encode};
use serde::{Deserialize, Deserializer, Serialize};
use sp_std::vec::Vec;

pub use pallet::*;

#[cfg(test)]
mod mock;

#[cfg(test)]
mod tests;

#[cfg(feature = "runtime-benchmarks")]
mod benchmarking;

#[derive(Debug, Serialize, Deserialize, Encode, Decode, Default, Clone, PartialEq)]
///绑定对象信息
pub struct PersonInfo<RelationType> {
    #[serde(deserialize_with = "de_string_to_bytes")]
    name: Vec<u8>,
    //姓名
    #[serde(deserialize_with = "de_string_to_bytes")]
    id_card: Vec<u8>,
    //身份证号码
    relation_type: RelationType,
    //亲属关系
    height: u16,
    //身高 mm
    weight: u16,
    //体重 g
    #[serde(deserialize_with = "de_string_to_bytes")]
    chronic: Vec<u8>, //慢性病
}

pub fn de_string_to_bytes<'de, D>(de: D) -> Result<Vec<u8>, D::Error>
    where D: Deserializer<'de> {
    let s: &str = Deserialize::deserialize(de)?;
    Ok(s.as_bytes().to_vec())
}

#[frame_support::pallet]
pub mod pallet {
    use frame_support::pallet_prelude::*;
    use frame_system::ensure_root;
    use frame_system::pallet_prelude::*;
    use sp_std::str;

    use super::*;

    /// Configure the pallet by specifying the parameters and types on which it depends.
    #[pallet::config]
    pub trait Config: frame_system::Config {
        /// 关系 1:本人 2:父亲 3:母亲 3:岳父 4:岳母 9:其他 因为亲属关系太多，就不用枚举了，前后端约定即可
        type RelationType: Parameter + Member + Default + Copy;
        /// Because this pallet emits events, it depends on the runtime's definition of an event.
        type Event: From<Event<Self>> + IsType<<Self as frame_system::Config>::Event>;
    }

    #[pallet::pallet]
    #[pallet::generate_store(pub (super) trait Store)]
    pub struct Pallet<T>(_);


    #[pallet::storage]
    #[pallet::getter(fn relation_persion)]
    /// 账户和亲属关联关系
    pub type Relations<T: Config> = StorageDoubleMap<_, Twox64Concat, T::AccountId, Twox64Concat, T::RelationType, PersonInfo<T::RelationType>>;
    #[pallet::storage]
    #[pallet::getter(fn ac_relation_persion)]
    /// 账户绑定亲属列表
    pub type AcRelations<T: Config> = StorageMap<_, Twox64Concat, T::AccountId, Vec<PersonInfo<T::RelationType>>>;
    #[pallet::storage]
    #[pallet::getter(fn chronic_taboo)]
    /// 慢性病禁忌菜品
    pub type ChronicTaboos<T: Config> = StorageMap<_, Twox64Concat, u16, Vec<u8>>;

    #[pallet::event]
    #[pallet::metadata(T::AccountId = "AccountId")]
    #[pallet::generate_deposit(pub (super) fn deposit_event)]
    pub enum Event<T: Config> {
        /// 帐号绑定亲属信息成功. [who, PersonInfo]
        RelationStored(T::AccountId, T::RelationType, PersonInfo<T::RelationType>),
        /// 帐号解除绑定亲属信息. [who, RelationType]
        RelationUnbind(T::AccountId, T::RelationType),
        /// 绑定慢性病禁忌菜品. [Chronic, TabooFoods]
        ChronicTabooFoodsStored(u16, Vec<u8>),
        /// 移除慢性病禁忌菜品. [Chronic]
        ChronicTabooFoodsRemoved(u16),
    }

    // Errors inform users that something went wrong.
    #[pallet::error]
    pub enum Error<T> {
        /// 没有绑定关系
        NoSuchRelation,
        /// 存储越界
        StorageOverflow,
        /// json格式数据转换异常
        JsonParamError,
        /// 帐号没有绑定亲属关系
        RelationIsNotStored,
        /// 不是root
        IsNotRoot,
        /// 没有慢性病禁忌菜品
        NoSuchTabooFoods,
    }

    #[pallet::hooks]
    impl<T: Config> Hooks<BlockNumberFor<T>> for Pallet<T> {}

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        /// 绑定亲属信息 struct方式
        #[pallet::weight(300_000 + T::DbWeight::get().writes(3))]
        pub fn bind(origin: OriginFor<T>, relation_type: T::RelationType, mut ps_info: PersonInfo<T::RelationType>) -> DispatchResultWithPostInfo {
            let sender = ensure_signed(origin)?;
            ps_info.relation_type = relation_type;
            Relations::<T>::insert(&sender, &relation_type, &ps_info);
            let members = Relations::<T>::iter_prefix_values(&sender).collect::<Vec<_>>();
            AcRelations::<T>::insert(&sender, members);
            // 发布绑定成功事件
            Self::deposit_event(Event::RelationStored(sender, relation_type, ps_info));
            Ok(().into())
        }

        /// 解除绑定亲属信息
        #[pallet::weight(50_000 + T::DbWeight::get().writes(5))]
        pub fn unbind(origin: OriginFor<T>, relation_type: T::RelationType) -> DispatchResultWithPostInfo {
            let sender = ensure_signed(origin)?;
            ensure!(Relations::<T>::contains_key(&sender,&relation_type), Error::<T>::NoSuchRelation);

            Relations::<T>::remove(&sender, &relation_type);
            let members = Relations::<T>::iter_prefix_values(&sender).collect::<Vec<_>>();
            AcRelations::<T>::insert(&sender, members);
            // 发布解除绑定事件
            Self::deposit_event(Event::RelationUnbind(sender, relation_type));
            Ok(().into())
        }

        /// 保存慢性病禁忌菜品 root用户
        #[pallet::weight(200_000 + T::DbWeight::get().writes(2))]
        pub fn save_taboo_foods(origin: OriginFor<T>, chronic: u16, food: Vec<u8>) -> DispatchResultWithPostInfo {
            // let sender = ensure_signed(origin)?;
            // 只有root可以保持
            ensure_root(origin)?;
            ChronicTaboos::<T>::insert(&chronic, &food);
            // 发布慢性病和禁忌菜品关联
            Self::deposit_event(Event::ChronicTabooFoodsStored(chronic, food));
            Ok(().into())
        }

        /// 删除慢性病禁忌菜品 root用户
        #[pallet::weight(200_000 + T::DbWeight::get().writes(2))]
        pub fn remove_taboo_foods(origin: OriginFor<T>, chronic: u16) -> DispatchResultWithPostInfo {
            // let sender = ensure_signed(origin)?;
            // 只有root可以保持
            ensure_root(origin)?;
            ensure!(ChronicTaboos::<T>::contains_key(&chronic), Error::<T>::NoSuchTabooFoods);
            ChronicTaboos::<T>::remove(&chronic);
            // 发布慢性病和禁忌菜品关联
            Self::deposit_event(Event::ChronicTabooFoodsRemoved(chronic));
            Ok(().into())
        }
    }
}

impl<T: Config> Pallet<T> {
    /// 账户是否绑定种亲属关系
    pub fn relation_stored(owner: &T::AccountId, relation_type: &T::RelationType) -> bool {
        return Relations::<T>::contains_key(owner, relation_type);
    }
}

