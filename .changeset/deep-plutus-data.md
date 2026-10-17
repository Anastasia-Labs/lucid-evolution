---
"@lucid-evolution/cml": patch
"@lucid-evolution/plutus": patch
---

Handle deeply nested Plutus data with iterative CBOR and ownership operations in the Node and browser CML builds and in Data.from/Data.to. Shallow data keeps a recursive fast path, and Data.from/Data.to now decode and encode common datums without crossing into WASM. Preserve encoding choices, map ordering and duplicate-key behavior, with public API coverage at depth 10,000.
