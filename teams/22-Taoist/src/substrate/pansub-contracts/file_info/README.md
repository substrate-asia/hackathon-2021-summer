# FileInfo Module

FileInfo is a module to manager file info.

## Modules

### DAOTemplate
```rust
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
```

## Interfaces

### instance module
instance module.
```bash
type: tx
definition: pub fn new(controller: AccountId) -> Self;
```

### add file info
add file info.
```bash
type: tx
definition: pub fn add_file(&mut self, uploader: AccountId, name: String, size: u64,
                        hash: Hash, meta: BTreeMap<String, String>) -> bool;
```

### list all file info
```bash
type: query
definition: pub fn list_file(&self) -> Vec<FileInfo>;
```

### query file info by index
```bash
type: query
definition: pub fn query_file_by_index(&self, index: u64) -> FileInfo;
```

### query file info by hash
```bash
type: query
definition: pub fn query_file_by_hash(&self, hash: Hash) -> FileInfo;
```

### query file infos by uploader
```bash
type: query
definition: pub fn query_file_by_uploader(&self, uploader: AccountId) -> Vec<FileInfo>;
```
