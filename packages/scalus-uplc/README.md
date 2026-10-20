# @lucid-evolution/scalus-uplc

Scalus-backed local UPLC evaluator adapter for Lucid Evolution.

```ts
import { Lucid } from "@lucid-evolution/lucid";
import { createScalusEvaluator } from "@lucid-evolution/scalus-uplc";

const lucid = await Lucid(provider, "Mainnet", {
  evaluator: createScalusEvaluator(),
});
```

The configured evaluator is used for local script evaluation. Passing
`localUPLCEval: false` to `complete` still bypasses every local evaluator and
forces provider evaluation.

```ts
const tx = await lucid
  .newTx()
  .collectFrom(utxos, redeemer)
  .complete({ localUPLCEval: false });
```

Lucid validates adapter results against the transaction's expected redeemer
set before applying execution units. Missing, duplicate, or unexpected redeemer
results fail the build instead of partially mutating the transaction builder.

## ScalusEmulator

`ScalusEmulator` is a Lucid provider over the Scalus ledger emulator. On
submission it applies the Cardano ledger rules (fees, value conservation,
minimum ADA, collateral, certificates, validity intervals and more) and runs
every Plutus script. Lucid's own `Emulator` checks few of these rules, so a
transaction that it accepts can still fail on a real network.

### Install

```sh
pnpm add -D @lucid-evolution/scalus-uplc
```

The emulator lives in the `@lucid-evolution/scalus-uplc/emulator` subpath,
which is ESM only. The root export does not load it.

### Manual clock

`new ScalusEmulator(accounts, protocolParameters, treasury?, options?)` takes
the same accounts and treasury as Lucid's `Emulator`. The protocol parameters
have no default. The clock moves only on `awaitSlot` and `awaitBlock`, and
Lucid takes its slot and time from the emulator, as it does from Lucid's
`Emulator`.

```ts
import {
  generateEmulatorAccount,
  Lucid,
  PROTOCOL_PARAMETERS_DEFAULT,
} from "@lucid-evolution/lucid";
import { ScalusEmulator } from "@lucid-evolution/scalus-uplc/emulator";

const account = generateEmulatorAccount({ lovelace: 100_000_000n });
const emulator = new ScalusEmulator([account], PROTOCOL_PARAMETERS_DEFAULT);
const lucid = await Lucid(emulator, "Custom", {
  evaluator: emulator.evaluator,
});
lucid.selectWallet.fromSeed(account.seedPhrase);

const tx = await lucid
  .newTx()
  .pay.ToAddress(account.address, { lovelace: 5_000_000n })
  .complete();
await (await tx.sign.withWallet().complete()).submit();
emulator.awaitBlock();
```

`emulator.evaluator` evaluates scripts against the emulator's own UTxOs,
protocol parameters and clock, so completion and submission agree.
`options.pools` registers pools, by bech32 id, so that tests can delegate to
them.

### Wall clock

`ScalusEmulator.forNetwork(network, { utxos })` follows `Date.now()` and the
slot configuration of `"Mainnet"`, `"Preprod"` or `"Preview"`. Use it for a
test written against a real network: Lucid then builds validity intervals
from the wall clock, and the ledger moves to the current slot before it
evaluates or applies a transaction. `awaitSlot`, `awaitBlock` and
`distributeRewards` throw.

```ts
const emulator = ScalusEmulator.forNetwork("Preprod", { utxos });
const lucid = await Lucid(emulator, "Preprod");
```

The protocol parameters default to the network's Scalus preset.
`protocolParameters(network)` returns that preset as Lucid
`ProtocolParameters`:

```ts
import { protocolParameters } from "@lucid-evolution/scalus-uplc/emulator";

new ScalusEmulator(accounts, protocolParameters("Preprod"));
```

`PROTOCOL_PARAMETERS_DEFAULT` carries older cost models than the live
networks, so script budgets under it can differ from the budgets on chain.

### Errors

A rejected `submitTx` throws a `ScalusEmulatorError`. Its `errorRule` names
the rule that rejected the transaction, for example `FeesOk` or
`ValueNotConserved`, and its message starts with it. `error` holds the Scalus
explanation, and `logs` holds the script traces. Lucid's `submit()` wraps the
error in a `TxSubmitError`; read it from `cause`:

```ts
const result = await signed.submitSafe();
if (result._tag === "Left") {
  const { errorRule } = result.left.cause as ScalusEmulatorError;
}
```

A failing script makes `evaluateTx` and `emulator.evaluator` throw the
`PlutusScriptEvaluationError` of Scalus.

### Differences from Lucid's Emulator

- It applies the ledger rules on submission and runs the Plutus scripts.
- It has no `ledger`, `mempool`, `chain`, `datumTable` or
  `transactionHistory`. Use `addUtxo(utxo)` to put a UTxO into the ledger,
  `snapshot()` to branch the emulator, and `scalus` to reach the wrapped
  Scalus emulator.
- A transaction is applied at once: `getTransactionStatus` never reports
  `pending`, and `awaitTx` does not move the clock.
- `awaitTx` resolves `false` for a hash that the emulator never applied.
  Lucid's `Emulator` resolves `true`.
- `getUtxosByOutRef` returns the UTxOs in ledger order, as Blockfrost and
  Kupmios do. Lucid's `Emulator` keeps the request order.
- A treasury donation reaches the treasury at the next epoch boundary.
- `getProtocolParameters` sets `protocolMajorVersion` to 11 when the given
  parameters have none, and it never returns `protocolMinorVersion`: Scalus
  has no such parameter.
- For a UTxO with a `datumHash` and its `datum`, `addUtxo` stores the datum
  for `getDatum`, and throws if the datum does not match the hash.
- A Scalus PlutusV4 reference script makes the UTxO query throw, because
  Lucid has no PlutusV4 script type.

### Lucid's emulator tests on ScalusEmulator

`pnpm --filter @lucid-evolution/lucid test:scalus-emulator` runs the emulator
tests of `packages/lucid` and `packages/provider` against ScalusEmulator: every
test file that constructs an `Emulator`, directly or through the emulator
service of `packages/lucid/test/emulator`. A new such file runs too, unless
the `excludedFiles` of `packages/lucid/vitest.scalus-emulator.config.ts` gives
a reason. Only `emulator-ledger-compat.test.ts` and
`emulator-ledger-index.test.ts` of the provider are left out: they test the
internals of Lucid's `Emulator`.
Run `pnpm build` at the root of the repository first: the shims import the
dist of this package and of `@lucid-evolution/provider`. CI does not run this
suite, so run it by hand. The tables list the tests that the run excludes,
and why.

API surface: the test uses an internal of Lucid's `Emulator`.

| Test                                                                                                     | Internal          |
| -------------------------------------------------------------------------------------------------------- | ----------------- |
| `TxSignBuilder ScriptContexts match serialized ledger ScriptContexts for complex transactions`           | reads `chain`     |
| `Emulator should register and then deregister stake address`                                             | reads `chain`     |
| `Emulator should register script stake address with redeemer`                                            | reads `chain`     |
| `BuildTxWithRedeemer emulator integration builds a complex transaction from the final canonical context` | reads `chain`     |
| `Emulator Get Reward Account distinguishes registration state` (provider)                                | writes `chain`    |
| `Emulator submit tx` (provider)                                                                          | replaces `ledger` |

Ledger rules: Scalus rejects, by a rule of the real ledger, what Lucid's
`Emulator` accepts. A test in this package or in
`packages/lucid/test/scalus-emulator.test.ts` asserts each `errorRule`.

| Test                                                                                                                                              | `errorRule`             | Real-ledger rule                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `Emulator should successfully delegate to stake pool` (also reads `chain`)                                                                        | `StakeCertificates`     | `DelegateeStakePoolNotRegisteredDELEG`                                                                                                        |
| `Emulator should successfully register, delegate, receive rewards, and withdraw them` (also reads `chain`)                                        | `StakeCertificates`     | `DelegateeStakePoolNotRegisteredDELEG`                                                                                                        |
| `Emulator should successfully register and retire stake pool`                                                                                     | `ValueNotConserved`     | `ValueNotConservedUTxO`: Lucid's retirement takes the pool deposit back in the transaction, but the ledger refunds it at the retirement epoch |
| `Emulator should successfully register, delegate, receive rewards, and withdraw 0 rewards` (expects a failure, which comes before the withdrawal) | `StakeCertificates`     | `DelegateeStakePoolNotRegisteredDELEG`                                                                                                        |
| `emulator evaluator parity delegate to stake pool has the same outcome with Aiken and Scalus evaluators`                                          | `StakeCertificates`     | `DelegateeStakePoolNotRegisteredDELEG`                                                                                                        |
| `emulator evaluator parity register, delegate, receive rewards, and withdraw them has the same outcome with Aiken and Scalus evaluators`          | `StakeCertificates`     | `DelegateeStakePoolNotRegisteredDELEG`                                                                                                        |
| `emulator evaluator parity register, delegate, receive rewards, and withdraw 0 rewards has the same outcome with Aiken and Scalus evaluators`     | `StakeCertificates`     | `DelegateeStakePoolNotRegisteredDELEG`                                                                                                        |
| `emulator evaluator parity register and retire stake pool has the same outcome with Aiken and Scalus evaluators`                                  | `ValueNotConserved`     | `ValueNotConservedUTxO`                                                                                                                       |
| `Emulator collateral checks accepts collateral covering the fee exactly` (provider)                                                               | `InvalidScriptDataHash` | `PPViewHashesDontMatch`: the transaction has redeemers but no script data hash                                                                |
| `Emulator collateral checks accepts a collateral return that leaves enough collateral` (provider)                                                 | `InvalidScriptDataHash` | `PPViewHashesDontMatch`                                                                                                                       |
| `Emulator collateral checks rejects more collateral inputs than maxCollateralInputs` (provider)                                                   | `InvalidScriptDataHash` | `PPViewHashesDontMatch`, before `TooManyCollateralInputs`                                                                                     |
| `Emulator reference inputs overlapping inputs protocol version 11 rejects the overlap when a PlutusV3 script runs` (provider)                     | `InvalidScriptDataHash` | `PPViewHashesDontMatch`                                                                                                                       |
| `Emulator reference inputs overlapping inputs protocol version 11 accepts a PlutusV3 script with disjoint reference inputs` (provider)            | `InvalidScriptDataHash` | `PPViewHashesDontMatch`                                                                                                                       |
| `Emulator reference inputs overlapping inputs an unset protocol version follows the current mainnet rule` (provider)                              | `InvalidScriptDataHash` | `PPViewHashesDontMatch`                                                                                                                       |
| `Emulator reference inputs overlapping inputs protocol version 11 accepts the overlap when no PlutusV3 script runs` (provider)                    | `Datums`                | `UnspendableUTxONoDatumHash`: it spends a PlutusV2 output that has no datum                                                                   |
| `coin selection counts deposits pays the 'registration and pool delegation' deposit from a wallet of 1.5 ADA UTxOs`                               | `StakeCertificates`     | `DelegateeStakePoolNotRegisteredDELEG`                                                                                                        |
| `coin selection counts deposits pays the 'registration with pool and vote deleg…' deposit from a wallet of 1.5 ADA UTxOs`                         | `StakeCertificates`     | `DelegateeStakePoolNotRegisteredDELEG`                                                                                                        |
| `coin selection counts refunds and withdrawals as inputs a reward withdrawal pays toward the outputs`                                             | `StakeCertificates`     | `DelegateeStakePoolNotRegisteredDELEG`                                                                                                        |

Other: the test fails for a reason that neither table above covers.

| Test                                                                                                                                   | Reason                                                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 6 tests of `Emulator collateral checks` that expect a rejection (provider)                                                             | Scalus rejects by the same rule, but names it `FeesOk` (5 tests) or `OutputsHaveNotEnoughCoins` (1 test), not the name in the test                                                                             |
| 2 tests of `Emulator native reference scripts` and `Emulator native scripts from script references` that expect a rejection (provider) | the same rule, named `ScriptFailure`                                                                                                                                                                           |
| `Emulator reference inputs overlapping inputs protocol version 9 rejects the overlap`, and the same for version 10 (provider)          | the same rule, named `NonDisjointInputsAndReferenceInputs`                                                                                                                                                     |
| `Emulator reference inputs overlapping inputs protocol version 8 accepts the overlap` (provider)                                       | Known Scalus issue: Scalus rejects the overlap at protocol version 8, where the ledger allows it                                                                                                               |
| `Emulator Get Protocol Parameters` (provider)                                                                                          | `getProtocolParameters` adds `protocolMajorVersion: 11`                                                                                                                                                        |
| `Emulator evaluate tx` (provider)                                                                                                      | Known Scalus issue: under the cost models of `PROTOCOL_PARAMETERS_DEFAULT`, Scalus costs the sample at 7 850 649 steps and Aiken at 7 849 385; under the live preprod cost models, Scalus also gives 7 849 385 |
| 5 tests of `completion-evaluation.test.ts`                                                                                             | they spy on Lucid's built-in Aiken evaluator, which the run replaces with `emulator.evaluator`                                                                                                                 |
| `Treasury donation builds and submits a treasury donation transaction`                                                                 | Scalus accepts the donation, but the `EPOCH` rule moves it into the treasury at the next epoch boundary, and the test expects it at once                                                                       |
