---
"@lucid-evolution/uplc": patch
---

`eval_program_raw` evaluates deeply nested `Data` arguments without exhausting the stack. Arguments are decoded straight into the evaluator's own `Data`, whose decoding, comparison, serialisation and release never recurse, instead of through pallas' recursive `PlutusData`, so an argument nested 100,000 levels deep evaluates like any other, in both the speed and size builds. Arguments are now decoded as Plutus' `decodeData` decodes them: a byte string with a chunk of more than 64 bytes, a big integer tag outside the head of its own byte, or a tag 102 constructor that is not a pair of an index and fields is refused as an invalid argument, as it can never be Data on chain. Results and ex-units are otherwise unchanged.
