---
"@lucid-evolution/cml": minor
"@lucid-evolution/core-types": minor
"@lucid-evolution/core-utils": minor
"@lucid-evolution/experimental": minor
"@lucid-evolution/lucid": minor
"@lucid-evolution/plutus": minor
"@lucid-evolution/provider": minor
"@lucid-evolution/sign_data": minor
"@lucid-evolution/tx-graph": minor
"@lucid-evolution/utils": minor
"@lucid-evolution/wallet": minor
---

Vendor cardano-multiplatform-lib as `@lucid-evolution/cml` and depend on it instead of `@anastasia-labs/cardano-multiplatform-lib-nodejs` and `-browser`. The API is unchanged, and the wasm shadow stack is raised to 16 MiB so deeply nested Plutus data decodes. Import CML from `@lucid-evolution/lucid` (or `@lucid-evolution/cml`): objects created by a separately installed `@anastasia-labs` CML belong to another wasm instance and cannot be passed to Lucid.
