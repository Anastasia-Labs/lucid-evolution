---
"@lucid-evolution/scalus-uplc": minor
---

Move to Scalus 1.3.0 and evaluate through its CBOR-first API.

Scalus now takes UTxOs as handles and a transaction as hex, so the adapter no longer builds the
CBOR UTxO map itself. That removes the hand-rolled CBOR map writer, the byte comparator, the
double-CBOR script encoder and the asset-to-CML-value conversion, and with them the dependencies on
`@anastasia-labs/cardano-multiplatform-lib-{nodejs,browser}` and `cbor-x`. The adapter is 325 lines
down to 100, and the `browser` field that swapped the two CML builds is no longer needed.

Scalus 1.x is ESM-only, so the adapter loads it with `import()` on the first evaluation. That keeps
the CommonJS build working on every Node version the repository supports, Node 18 included.
