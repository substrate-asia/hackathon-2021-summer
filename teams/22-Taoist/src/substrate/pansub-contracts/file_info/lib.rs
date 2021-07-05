#![cfg_attr(not(feature = "std"), no_std)]

extern crate alloc;
use ink_lang as ink;
pub use self::file_info_manager::FileInfoManager;
pub use self::file_info_manager::FileInfo;

#[ink::contract]
mod file_info_manager {
    use alloc::string::String;
    use ink_prelude::vec::Vec;
    use ink_prelude::collections::BTreeMap;
    use ink_storage::{
        traits::{
            PackedLayout,
            SpreadLayout,
        },
        collections::HashMap as StorageHashMap,
    };

    /// Indicates whether a transaction is already confirmed or needs further confirmations.
    #[derive(scale::Encode, scale::Decode, Clone, SpreadLayout, PackedLayout)]
    #[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
    )]
    pub struct FileInfo {
        // file info index
        pub id: u64,
        pub uploader: AccountId,
        // file name
        pub name: String,
        pub size: u64,
        pub hash: Hash,
        // file meta data
        // like { "dir": "{"xxx": {}}", "copyright": "xxxx" }
        pub meta: BTreeMap<String, String>,
    }

    #[ink(storage)]
    pub struct FileInfoManager {
        controller: AccountId,
        global_index: u64,
        file_info_map: StorageHashMap<u64, FileInfo>,
        file_info_map_by_hash: StorageHashMap<Hash, u64>,
        file_info_map_by_uploader: StorageHashMap<AccountId, Vec<u64>>,
    }

    #[ink(event)]
    pub struct AddFileInfo {
        #[ink(topic)]
        index: u64,
        #[ink(topic)]
        uploader: AccountId,
        #[ink(topic)]
        hash: Hash,
    }

    impl FileInfoManager {
        #[ink(constructor)]
        pub fn new(controller: AccountId) -> Self {
            let instance = Self {
                controller,
                global_index: 0,
                file_info_map: StorageHashMap::new(),
                file_info_map_by_hash: StorageHashMap::new(),
                file_info_map_by_uploader: StorageHashMap::new(),
            };
            instance
        }

        #[ink(message)]
        pub fn add_file(&mut self, uploader: AccountId, name: String, size: u64,
                        hash: Hash, meta: BTreeMap<String, String>) -> bool {
            assert_eq!(self.global_index + 1 > self.global_index, true);
            // let from = self.env().caller();
            self.file_info_map.insert(self.global_index, FileInfo {
                id: self.global_index,
                uploader,
                name: name.clone(),
                size,
                hash,
                meta
            });
            self.file_info_map_by_hash.insert(hash, self.global_index);
            let id_list = self.file_info_map_by_uploader.entry(uploader.clone()).or_insert(Vec::new());
            id_list.push(self.global_index);
            self.env().emit_event(AddFileInfo {
                index: self.global_index,
                uploader,
                hash
            });
            self.global_index += 1;
            true
        }

        #[ink(message)]
        pub fn list_file(&self) -> Vec<FileInfo> {
            let mut temp_vec = Vec::new();
            let mut iter = self.file_info_map.values();
            let mut temp = iter.next();
            while temp.is_some() {
                temp_vec.push(temp.unwrap().clone());
                temp = iter.next();
            }
            temp_vec
        }

        #[ink(message)]
        pub fn query_file_by_index(&self, index: u64) -> FileInfo {
            self.file_info_map.get(&index).unwrap().clone()
        }

        #[ink(message)]
        pub fn query_file_by_hash(&self, hash: Hash) -> FileInfo {
            let index = self.file_info_map_by_hash.get(&hash).unwrap();
            self.file_info_map.get(&index).unwrap().clone()
        }

        #[ink(message)]
        pub fn query_file_by_uploader(&self, uploader: AccountId) -> Vec<FileInfo> {
            let id_list_op = self.file_info_map_by_uploader.get(&uploader);
            let mut result = Vec::new();
            if id_list_op.is_none() {
                return result;
            }
            let id_list = id_list_op.unwrap();
            let mut iter = id_list.into_iter();
            let mut item = iter.next();
            while item.is_some() {
                result.push(self.file_info_map.get(item.unwrap()).unwrap().clone());
                item = iter.next();
            }
            result
        }
    }
}
