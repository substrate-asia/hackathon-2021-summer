# PanSub Node

### Setup
[Rust development environment](https://substrate.dev/docs/en/knowledgebase/getting-started).


### Build

Checkout code
```bash
git clone --recursive https://github.com/TeamTaoist/pansub-node.git
cd pansub-node
cargo build
```

### Connect Node

If you are using Polkadot JS Apps to connect pansub node, please fill the config in `Settings>Developer`.
```js
{
    "Address": "MultiAddress", 
    "LookupSource": "MultiAddress"
}
```
