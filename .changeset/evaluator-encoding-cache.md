---
"@lucid-evolution/lucid": patch
---

The built-in evaluator no longer reuses a UTxO's cached encoding when its assets come in a different order, which the output encoding and the script context follow, so ex-units match an uncached evaluation. It also keeps only the encodings its latest request used, so a long-lived `makeAikenEvaluator()` instance no longer grows with every UTxO it has seen.
