---
"@lucid-evolution/uplc": minor
---

Add `eval_builtin_raw`, which evaluates one builtin applied to constant arguments exactly as the pinned evaluator does for a Plutus V3 script at a given protocol version (9 to 12). Arguments and the result cross as flat-encoded constants, and BLS12-381 points (and lists of them) as their compressed bytes. The result says whether the builtin returned a value, how it failed (not available at that protocol version, arguments rejected before costing, or failed after costing), and what the machine charges for the application under Plutus' default Plutus V3 cost model. `eval_program_raw` and `uplc_build_info` are unchanged.
