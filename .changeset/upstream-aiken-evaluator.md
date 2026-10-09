---
"@lucid-evolution/uplc": patch
---

Update the Aiken evaluator to unreleased Aiken `main` after 1.1.24, plus aiken-lang/aiken#1456. Evaluation is faster in five ways:

- The CEK machine itself is faster.
- Each transaction's script context is built, and its spent inputs are resolved, once per transaction instead of once per redeemer.
- Recently decoded scripts are kept across calls in a bounded cache. It holds up to 64 scripts and 256 KiB of serialised scripts, about 64 MB at most once decoded.
- `Data` values are shared between script contexts and builtins instead of copied.
- Builtins with constant cost no longer measure the size of their arguments. Scripts that pass large `Data` values to builtins such as `chooseData`, `unConstrData` or `sndPair` evaluate much faster.

On 108 real Midgard transactions, `eval_phase_two_raw` is about 2.3x faster than the previous unreleased build. Results and ex-units are unchanged.

If an earlier call trapped while the script cache was in use, later calls skip the cache instead of failing.

One error message changes: evaluating a Plutus V1 script without a V1 cost model now names `PlutusV1` instead of `PlutusV2`.
