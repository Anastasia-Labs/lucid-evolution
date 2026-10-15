# Development Environment Setup

## 1. Enter Development Environment

To start working in the development environment, run the following command:

```bash
nix develop
```

## 2. Build the Rust Project & Generate WASM Files

Before continuing, please note that this step is not part of the CI process. You'll need to run it locally to build the Rust project and generate the required WASM files:

```bash
pnpm build-local
```

## 3. Build the UPLC Package

Once you've completed the previous step, you can build the UPLC package by running:

```
pnpm build
```

## Speed and size builds

The package ships two builds of the evaluator:

- **speed** (`-O3`, ~1.93 MB wasm): faster script evaluation.
- **size** (`-Oz`, ~1.03 MB wasm): smaller download.

`@lucid-evolution/uplc` resolves to the speed build on Node, Bun and Deno, and to the size build in browser bundles and edge runtimes (`browser`, `worker`, `workerd` and `edge-light` export conditions). To pick a variant explicitly, import `@lucid-evolution/uplc/speed` or `@lucid-evolution/uplc/size`.

## Evaluating a program

`eval_program_raw` evaluates a UPLC program applied to `Data` arguments, outside of any transaction. The caller builds whatever arguments the program expects, including its script context.

```ts
import { eval_program_raw } from "@lucid-evolution/uplc";

const result = eval_program_raw(
  programFlat, // Uint8Array: the program, flat-encoded without a CBOR wrapper
  [datum, redeemer, context], // Uint8Array[]: each argument as CBOR-encoded Data
  3, // Plutus version: 1, 2 or 3
  11, // protocol major version: 5 to 11
  costModel, // BigInt64Array: every cost model parameter for this Plutus version
  10_000_000_000n, // CPU budget
  14_000_000n, // memory budget
  true, // charge every step, and stop as soon as the budget runs out
);

result.ok; // whether the program succeeded (for Plutus V3, returned unit)
result.error_kind; // 0 ok, 1 over budget, 2 failed, 3 Plutus V3 result not unit
result.cpu; // bigint
result.mem; // bigint
result.logs; // string[]: the program's traces
```

With `false` as the last argument, steps are charged and the budget is checked every 200 steps as the ledger does. That only changes the cost reported for a program that fails, as the ledger does not charge the steps it took since the budget was last checked; the Haskell evaluator reports the same cost. It throws only when the inputs are malformed or unsupported.

`uplc_build_info()` returns JSON that describes the build: the uplc crate it was built from, the latest protocol version it supports, each Plutus version's cost model length, a digest of what a fixed set of programs evaluate to, and whether those programs give the expected results (`"selfTest": "pass"`).

## Tests

```bash
pnpm test
```

`test/fixtures/programs.json` holds programs with their outcome and cost under Plutus V3 and protocol version 11, as given by the Haskell evaluator (plutus-core 1.71).
