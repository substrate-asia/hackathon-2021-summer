# pansub-backend

## Packages
```
npm install
```

## test.js [test purpose]
Launch test
```
node test.js
```

It will launch one ipfs node in app, and provide upload file api for adding new files.

## index.js

Install ipfs on mac
```
wget https://dist.ipfs.io/go-ipfs/v0.9.0/go-ipfs_v0.9.0_darwin-amd64.tar.gz && tar -xvzf go-ipfs_v0.9.0_darwin-amd64.tar.gz && cd go-ipfs && bash install.sh
```

Init local ipfs node
```
ipfs init
```

Launch local ipfs node
```
ipfs daemon
```

Launch backend
```
node index.js
```

### API

list files
```
localhost:4000/listfiles
```

upload
```
param:uploader
localhost:4000/upload
```

userfiles
```
localhost:4000/userfiles/:accountId
```

fileinfo
```
localhost:4000/fileinfo/:hash

:hash : hash value stored in contract
```