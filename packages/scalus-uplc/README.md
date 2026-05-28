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
