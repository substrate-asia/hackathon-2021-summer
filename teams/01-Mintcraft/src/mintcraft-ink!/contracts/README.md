# ink! code

This folder contains a set of contracts for ink!.

## Preparation

For building the smart contracts found in this folder you will need to have [`cargo-contract`](https://github.com/paritytech/cargo-contract) installed.

```bash
cargo install cargo-contract --force
```

We use the `--force` to update to the most recent `cargo-contract` version.

## Build contract and generate the contracts metadata

To build and generate the contracts Wasm file, navigate to the root of the smart contract and run the following command:

`cargo contract build`

You should now have an optimized `<contract-name>.wasm` file, a `metadata.json` file and a `<contract-name>.contract` file in the `target` folder of your contract.
The `.contract` file combines the Wasm and metadata into one file and can be used for deployment.
