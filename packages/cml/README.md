# @lucid-evolution/cml

The [cardano-multiplatform-lib](https://github.com/dcSpark/cardano-multiplatform-lib) (CML) WebAssembly build that Lucid Evolution uses. It is vendored here so CML changes can ship together with the code that relies on them.

```ts
import * as CML from "@lucid-evolution/cml";
```

Node resolves the `nodejs` build in `dist/node`; bundlers, browsers and edge runtimes resolve the `bundler` build in `dist/browser`. Both builds share one `.d.ts`.

## Source

`rust/` holds the CML crates behind the `cardano-multiplatform-lib` wasm package (`core`, `crypto`, `chain`, `cip25`, `cip36` and `cml/wasm`), taken from [Anastasia-Labs/cardano-multiplatform-lib](https://github.com/Anastasia-Labs/cardano-multiplatform-lib) at `7950a78`, the source of `@anastasia-labs/cardano-multiplatform-lib-*@6.2.0-1`. The JSON schema generators are left out because the published typings never included their output. Changes made here since then are listed in `CHANGELOG.md`.

## Building

`src/` holds the committed wasm-pack output; CI does not rebuild it. After changing the Rust code, regenerate it with wasm-pack and a Rust toolchain that has the `wasm32-unknown-unknown` target:

```bash
pnpm build-local
pnpm build
```

`build-local` runs wasm-pack with `WASM_BINDGEN_WEAKREF=1`, so CML objects are freed by a `FinalizationRegistry` as well as by `.free()`, matching the published `@anastasia-labs` packages.

The browser build keeps the workspace's `opt-level = "z"`, as upstream does, so bundles stay small (2.9 MB, 0.9 MB gzipped). The Node build is compiled with `opt-level = 3` instead: it is 4.7 MB, and it decodes and encodes Plutus data 2–4× faster.

## License

MIT. See `LICENSE`, `LICENSE-EMURGO` and `LICENSE-IOHK`.
