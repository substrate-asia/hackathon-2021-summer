# pansub-contracts
contracts for pansub, using [ink! 3.0.0.0-rc3](https://github.com/paritytech/ink/tree/v3.0.0-rc3).

## install cargo-contract
reference [here](https://substrate.dev/substrate-contracts-workshop/#/0/setup).

### rust

```
rustup component add rust-src --toolchain nightly
rustup target add wasm32-unknown-unknown --toolchain stable
```

### binaryen
As a pre-requisite for the tool you need to install the [binaryen](https://github.com/WebAssembly/binaryen) package, which is used to optimize the WebAssembly bytecode of the contract.

binaryen version **must be >=99**.

### cargo-contract
Please **use version 0.11**!  
```
cargo install cargo-contract --vers ^0.11 --force --locked
```

## compile contracts
### single contract
```bash
cargo +nightly contract build
```

### all contracts
```
./build.sh
```
the ABI, wasm, and contract files are copied in `./release` dir.

## install by polkadot.js apps
visit [polkadot.js apps](https://polkadot.js.org/apps/), and connect pansub node.
then `Develpoer`->`Contract`->`upload WASM`.