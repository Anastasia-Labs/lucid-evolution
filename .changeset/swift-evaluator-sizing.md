---
"@lucid-evolution/uplc": patch
---

Update the Aiken evaluator to 1.1.24. It no longer measures the size of arguments to builtins whose cost is constant, so scripts that pass large `Data` values to builtins such as `chooseData`, `unConstrData` or `sndPair` evaluate much faster. Results, ex-units and errors are unchanged.
