---
"@lucid-evolution/scalus-uplc": minor
---

Add `ScalusEmulator`, a Lucid provider over the Scalus ledger emulator, in the ESM-only subpath `@lucid-evolution/scalus-uplc/emulator`. Unlike Lucid's `Emulator`, it applies the ledger rules and runs every Plutus script on submission, and a rejection throws a `ScalusEmulatorError` whose `errorRule` names the rule. `new ScalusEmulator(accounts, protocolParameters)` keeps a manual clock that Lucid follows; `ScalusEmulator.forNetwork(network, { utxos })` follows the wall clock of a real network. `emulator.evaluator` evaluates against the same ledger, and `protocolParameters(network)` returns a network's Scalus preset. The subpath also resolves under TypeScript's `node` module resolution.
