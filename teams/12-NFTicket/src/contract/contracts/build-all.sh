#!/usr/bin/env bash

set -eu

cargo +nightly contract build --manifest-path offline_template/Cargo.toml
cargo +nightly contract build --manifest-path online_template/Cargo.toml
cargo +nightly contract build --manifest-path offline_template/offline_meeting/Cargo.toml
cargo +nightly contract build --manifest-path online_template/online_meeting/Cargo.toml
cargo +nightly contract build