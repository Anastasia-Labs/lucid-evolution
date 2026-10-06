---
"@lucid-evolution/uplc": minor
"@lucid-evolution/lucid": patch
---

Ship speed-optimized (`-O3`) and size-optimized (`-Oz`) builds of the evaluator wasm. `@lucid-evolution/uplc` resolves to the speed build on Node, Bun and Deno, where script evaluation is about 25-30% faster, and to the size build (944 KB, unchanged) in browser bundles and edge runtimes. Import `@lucid-evolution/uplc/speed` or `@lucid-evolution/uplc/size` to choose one explicitly. Results, ex-units and errors are identical across builds.

Lucid exports `makeAikenEvaluator(uplcModule)` so an instance can use a specific build, e.g. `Lucid(provider, network, { evaluator: makeAikenEvaluator(UPLCSize) })`.
