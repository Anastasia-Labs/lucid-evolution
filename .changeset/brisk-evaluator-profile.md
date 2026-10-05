---
"@lucid-evolution/uplc": patch
---

Build the evaluator wasm for speed instead of size. Script evaluation is about 25-30% faster, and the wasm grows from 944 KB to 1.77 MB (333 KB to 480 KB gzipped). Results, ex-units and errors are unchanged.
