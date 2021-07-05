/*
Filename  : article.rs
Author	  : Gordon Wang
Created At: 2021.06.10
*/

#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;
use uuid::Uuid;

#[ink::contract]
mod article {
    #[cfg(not(feature = "ink-as-dependency"))]
    use ink_storage::{
        collections::HashMap as StorageHashMap,
        lazy::Lazy,
    };

    /// A article contract.
    #[ink(storage)]
    pub struct article {
        //map: StorageHashMap<id, article_struct>,
        id: String,
        title: String,
        intro: String,
        hkcCode: String,
        status: i32,
        creator: String,
        contentHash: String
    }

    // Event emitted when an article created
    #[ink(event)]
    pub struct Created {
        #[ink(topic)]
        creator: String,
        #[ink(topic)]
        title: String,
    }

    // Event emitted when an article updated
    #[ink(event)]
    pub struct Updated {
        #[ink(topic)]
        creator: String,
        #[ink(topic)]
        title: String,
    }

    // Event emitted when an article deleted
    #[ink(event)]
    pub struct Deleted {
        #[ink(topic)]
        creator: String,
        #[ink(topic)]
        title: String,
    }
    
    /// The article error types.
    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        /// Returned if creator is invalid.
        InvalidCreator,
    }

    /// The article result type.
    pub type Result<T> = core::result::Result<T, Error>;

    impl article {
        /// Creates a new article contract with the specified initial supply.
        #[ink(constructor)]
        pub fn create(title: String, intro: String, hkcCode: String, creator: String, contentHash: String) -> Self {
            let my_uuid = Uuid::new_v4()?;

            let instance = Self {
                id: my_uuid,
                title: title,
                intro: intro,
                hkcCode: hkcCode,
                status: 1,
                creator,
                contentHash: contentHash,
            };

            Self::env().emit_event(Created {
                creator,
                title,
            });
            instance
        }

        #[ink(message)]
        pub fn update(&mut self, title: String, intro: String, hkcCode: String, contentHash: String) -> Result<()> {
            let owner = self.env().caller();
            self.allowances.insert((owner, spender), value);

            if "" != title  {
                self.title = title;
            }
            if "" != intro  {
                self.intro = intro;
            }
            if "" != hkcCode  {
                self.hkcCode = hkcCode;
            }
            if "" != contentHash  {
                self.contentHash = contentHash;
            }

            self.env().emit_event(Updated {
                self.creator,
                title,
            });
            Ok(())
        }

        #[ink(message)]
        pub fn delete(&mut self, id: String) -> Result<()> {
            self.env().emit_event(Deleted {
                creator,
                title,
            });
            Ok(())
        }
    }
}
