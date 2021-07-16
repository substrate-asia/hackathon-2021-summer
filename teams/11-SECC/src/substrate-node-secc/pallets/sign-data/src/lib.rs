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
///手环数据对象
pub struct WristbandInfo {
    #[serde(deserialize_with = "de_string_to_bytes")]
    data_id: Vec<u8>,
    //第三方系统数据id
    #[serde(deserialize_with = "de_string_to_bytes")]
    device_no: Vec<u8>,
    //设备编号
    heart_rate: u8,
    //心率
    #[serde(deserialize_with = "de_string_to_bytes")]
    data_time: Vec<u8>,
    //数据产生时间
}

#[derive(Debug, Serialize, Deserialize, Encode, Decode, Default, Clone, PartialEq)]
///睡眠报告数据
pub struct SleepReportInfo {
    #[serde(deserialize_with = "de_string_to_bytes")]
    data_id: Vec<u8>,
    //第三方系统数据id
    #[serde(deserialize_with = "de_string_to_bytes")]
    device_no: Vec<u8>,
    //设备编号
    deep_sleep: u8,
    //深睡时长
    light_sleep: u8,
    //浅睡时长
    #[serde(deserialize_with = "de_string_to_bytes")]
    data_time: Vec<u8>,
    //数据产生时间
}


#[derive(Debug, Serialize, Deserialize, Encode, Decode, Default, Clone, PartialEq)]
///睡眠体征数据
pub struct SleepSignInfo {
    #[serde(deserialize_with = "de_string_to_bytes")]
    data_id: Vec<u8>,
    //第三方系统数据id
    #[serde(deserialize_with = "de_string_to_bytes")]
    device_no: Vec<u8>,
    //设备编号
    heart_rate: u8,
    //心率
    breath_rate: u8,
    //呼吸率
    #[serde(deserialize_with = "de_string_to_bytes")]
    data_time: Vec<u8>,
    //数据产生时间
}

pub fn de_string_to_bytes<'de, D>(de: D) -> Result<Vec<u8>, D::Error>
    where D: Deserializer<'de> {
    let s: &str = Deserialize::deserialize(de)?;
    Ok(s.as_bytes().to_vec())
}

#[frame_support::pallet]
pub mod pallet {
    use frame_support::pallet_prelude::*;
    use frame_system::pallet_prelude::*;
    use sp_std::str;

    use super::*;

    /// Configure the pallet by specifying the parameters and types on which it depends.
    #[pallet::config]
    pub trait Config: frame_system::Config + pallet_health_ai::Config {
        /// 设备类型 1:手环 2:床垫 3:血糖仪 4:血压计 5:体温计 6:跌倒报警 7:电子围栏 8:其他
        type DeviceType: Parameter + Member + Default + Copy;
        /// 关系 1:本人 2:父亲 3:母亲 3:岳父 4:岳母 9:其他 因为亲属关系太多，就不用枚举了，前后端约定即可
        // type RelationType: Parameter + Member + Default + Copy;
        /// Because this pallet emits events, it depends on the runtime's definition of an event.
        type Event: From<Event<Self>> + IsType<<Self as frame_system::Config>::Event>;
    }

    #[pallet::pallet]
    #[pallet::generate_store(pub (super) trait Store)]
    pub struct Pallet<T>(_);


    #[pallet::storage]
    #[pallet::getter(fn owned_devices)]
    /// 账户和设备关联关系 DeviceType u8
    pub type OwnedDevices<T: Config> = StorageDoubleMap<_, Twox64Concat, (T::AccountId, T::RelationType), Twox64Concat, T::DeviceType, Vec<u8>>;

    #[pallet::storage]
    #[pallet::getter(fn ac_owned_devices)]
    /// 账户绑定的设备数据
    pub type AcOwnedDevices<T: Config> = StorageMap<_, Twox64Concat, (T::AccountId, T::RelationType), Vec<(T::DeviceType, Vec<u8>)>>;

    #[pallet::storage]
    #[pallet::getter(fn wristband_infos)]
    /// 手环数据 data_id
    pub type WristbandInfos<T: Config> = StorageMap<_, Twox64Concat, Vec<u8>, (WristbandInfo, T::BlockNumber)>;

    #[pallet::storage]
    #[pallet::getter(fn sleep_report_infos)]
    /// 睡眠报告数据 data_id
    pub type SleepReportInfos<T: Config> = StorageMap<_, Twox64Concat, Vec<u8>, (SleepReportInfo, T::BlockNumber)>;

    #[pallet::storage]
    #[pallet::getter(fn sleep_sign_infos)]
    /// 睡眠体征数据 data_id
    pub type SleepSignInfos<T: Config> = StorageMap<_, Twox64Concat, Vec<u8>, (SleepSignInfo, T::BlockNumber)>;


    #[pallet::storage]
    #[pallet::getter(fn medical_infos)]
    /// 体检报告文件数据存证 file_hash ipfs哈希值 id_card 身份证号
    pub type MedicalInfos<T: Config> = StorageMap<_, Twox64Concat, Vec<u8>, (Vec<u8>, T::BlockNumber)>;

    #[pallet::event]
    #[pallet::metadata(T::AccountId = "AccountId")]
    #[pallet::generate_deposit(pub (super) fn deposit_event)]
    pub enum Event<T: Config> {
        /// 帐号绑定亲属设备成功. [who,relationType,deviceType,sn]
        RelationDeviceStored(T::AccountId, T::RelationType, T::DeviceType, Vec<u8>),
        /// 帐号解绑亲属信息成功. [who,relationType,deviceType]
        RelationDeviceUnbind(T::AccountId, T::RelationType, T::DeviceType),
        /// 手环数据保存成功. [data,blockNumber]
        WristbandInfoStored(WristbandInfo, T::BlockNumber),
        /// 睡眠报告数据保存成功. [data,blockNumber]
        SleepReportInfoStored(SleepReportInfo, T::BlockNumber),
        /// 手环数据保存成功. [data,blockNumber]
        SleepSignInfoStored(SleepSignInfo, T::BlockNumber),
        /// 体检报告文件数据存证成功.[file_hash, id_card, current_block]
        MedicalInfoStored(Vec<u8>, Vec<u8>, T::BlockNumber),
    }

    #[pallet::error]
    pub enum Error<T> {
        /// 空值异常
        NoneValue,
        /// 值越界
        StorageOverflow,
        /// 帐号没有绑定亲属关系
        RelationIsNotStored,
        /// 帐号没有绑定亲属设备
        RelationDeviceIsNotStored,
        /// json格式数据转换异常
        JsonParamError,
        /// 文件已存在
        FileIsStored,
    }

    #[pallet::hooks]
    impl<T: Config> Hooks<BlockNumberFor<T>> for Pallet<T> {}


    #[pallet::call]
    impl<T: Config> Pallet<T> {
        /// 绑定亲属设备
        #[pallet::weight(300_000 + T::DbWeight::get().writes(3))]
        pub fn bind(origin: OriginFor<T>, relation_type: T::RelationType, device_type: T::DeviceType, sn: Vec<u8>) -> DispatchResultWithPostInfo {
            let sender = ensure_signed(origin)?;
            let is_stored = pallet_health_ai::Module::<T>::relation_stored(&sender, &relation_type);
            //  检查是否已经绑定过亲属
            ensure!(is_stored, Error::<T>::RelationIsNotStored);
            OwnedDevices::<T>::insert((&sender, &relation_type), &device_type, &sn);
            let devices = OwnedDevices::<T>::iter_prefix((&sender, &relation_type)).collect::<Vec<_>>();
            AcOwnedDevices::<T>::insert((&sender, &relation_type), devices);
            Self::deposit_event(Event::RelationDeviceStored(sender, relation_type, device_type, sn));
            Ok(().into())
        }

        /// 解除绑定亲属设备
        #[pallet::weight(500_000 + T::DbWeight::get().writes(5))]
        pub fn unbind(origin: OriginFor<T>, relation_type: T::RelationType, device_type: T::DeviceType) -> DispatchResultWithPostInfo {
            let sender = ensure_signed(origin)?;
            ensure!(OwnedDevices::<T>::contains_key((&sender,&relation_type),&device_type), Error::<T>::RelationDeviceIsNotStored);
            OwnedDevices::<T>::remove((&sender, &relation_type), &device_type);
            // 发布解除绑定事件
            Self::deposit_event(Event::RelationDeviceUnbind(sender, relation_type, device_type));
            Ok(().into())
        }

        /// 保存手环心率数据
        #[pallet::weight(200_000 + T::DbWeight::get().writes(2))]
        pub fn save_wristband_info(origin: OriginFor<T>, json: Vec<u8>) -> DispatchResultWithPostInfo {
            let _sender = ensure_signed(origin)?;
            // 只有root可以保存
            // ensure_root(origin)?;
            // 检查json格式是否合法，不合法抛出异常
            let data: WristbandInfo = serde_json::from_slice(&json).map_err(|_| <Error<T>>::JsonParamError)?;
            // 到到数据主键id
            let data_id = &data.data_id;
            // Get the block number from the FRAME System module.
            let current_block = <frame_system::Module<T>>::block_number();
            WristbandInfos::<T>::insert(data_id, (&data, &current_block));
            // 发布绑定成功事件
            Self::deposit_event(Event::WristbandInfoStored(data, current_block));
            Ok(().into())
        }

        // /// 刪除手环心率数据 for test
        // #[pallet::weight(200_000 + T::DbWeight::get().writes(2))]
        // pub fn remove_wristband_info(origin: OriginFor<T>) -> DispatchResultWithPostInfo {
        //     // let sender = ensure_signed(origin)?;
        //     // 只有root可以刪除
        //     ensure_root(origin)?;
        //
        //     WristbandInfos::<T>::remove_all();
        //
        //     Ok(().into())
        // }

        /// 保存睡眠报告数据
        #[pallet::weight(20_000 + T::DbWeight::get().writes(2))]
        pub fn save_sleep_report_info(origin: OriginFor<T>, json: Vec<u8>) -> DispatchResultWithPostInfo {
            let _sender = ensure_signed(origin)?;
            // 只有root可以保存
            // ensure_root(origin)?;
            // 检查json格式是否合法，不合法抛出异常
            let data: SleepReportInfo = serde_json::from_slice(&json).map_err(|_| <Error<T>>::JsonParamError)?;
            // 到到数据主键id
            let data_id = &data.data_id;
            // Get the block number from the FRAME System module.
            let current_block = <frame_system::Module<T>>::block_number();
            SleepReportInfos::<T>::insert(data_id, (&data, &current_block));
            // 发布绑定成功事件
            Self::deposit_event(Event::SleepReportInfoStored(data, current_block));
            Ok(().into())
        }

        /// 保存睡眠体征数据
        #[pallet::weight(20_000 + T::DbWeight::get().writes(2))]
        pub fn save_sleep_sign_info(origin: OriginFor<T>, json: Vec<u8>) -> DispatchResultWithPostInfo {
            let _sender = ensure_signed(origin)?;
            // 只有root可以保存
            // ensure_root(origin)?;
            // 检查json格式是否合法，不合法抛出异常
            let data: SleepSignInfo = serde_json::from_slice(&json).map_err(|_| <Error<T>>::JsonParamError)?;
            // 到到数据主键id
            let data_id = &data.data_id;
            // Get the block number from the FRAME System module.
            let current_block = <frame_system::Module<T>>::block_number();
            SleepSignInfos::<T>::insert(data_id, (&data, &current_block));
            // 发布绑定成功事件
            Self::deposit_event(Event::SleepSignInfoStored(data, current_block));
            Ok(().into())
        }

        /// 体检报告文件数据链上存证
        #[pallet::weight(700_000 + T::DbWeight::get().writes(7))]
        pub fn save_medical_info(origin: OriginFor<T>, file_hash: Vec<u8>, id_card: Vec<u8>) -> DispatchResultWithPostInfo {
            let _sender = ensure_signed(origin)?;
            // 只有root可以保存
            // ensure_root(origin)?;
            let is_stored = Self::file_stored(&file_hash);
            //  体检报告是否已经存在
            ensure!(!is_stored, Error::<T>::FileIsStored);
            // Get the block number from the FRAME System module.
            let current_block = <frame_system::Module<T>>::block_number();
            MedicalInfos::<T>::insert(&file_hash, (&id_card, &current_block));
            // 发布绑定成功事件
            Self::deposit_event(Event::MedicalInfoStored(file_hash, id_card, current_block));
            Ok(().into())
        }
    }
}

impl<T: Config + pallet_health_ai::Config> Pallet<T> {
    /// 体检报告是否已经存在
    pub fn file_stored(file_hash: &Vec<u8>) -> bool {
        return MedicalInfos::<T>::contains_key(file_hash);
    }
}
