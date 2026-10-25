#!/bin/sh
# Builds the Node.js bindings in src/speed/node and src/size/node.
#
# They are generated with wasm-bindgen's --experimental-reset-state-function,
# which src/recover-from-trap.js needs to recover from a wasm trap. wasm-pack
# cannot pass that flag, so this runs the steps wasm-pack would: cargo,
# wasm-bindgen (the CLI version must match wasm-bindgen in rust/Cargo.lock) and
# wasm-opt with the profile's flags from rust/Cargo.toml.
set -eu

cd "$(dirname "$0")/../rust"

build() {
  profile=$1
  out=../src/$2/node
  opt=$3
  cargo build --lib --target wasm32-unknown-unknown --profile "$profile"
  wasm-bindgen --target nodejs --experimental-reset-state-function \
    --out-dir "$out" "target/wasm32-unknown-unknown/$profile/uplc_tx.wasm"
  wasm-opt "$opt" "$out/uplc_tx_bg.wasm" -o "$out/uplc_tx_bg.wasm"
}

build release speed -O3
build release-size size -Oz
