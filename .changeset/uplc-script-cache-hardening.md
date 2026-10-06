---
"@lucid-evolution/uplc": patch
---

Harden the evaluator's decoded-script cache. If an earlier call trapped while the cache was borrowed, later calls now skip the cache instead of panicking with "already borrowed". The memory estimate per script byte is raised from 128 to 256 bytes, above the ~209 bytes measured for adversarial lambda chains, so the 64 MB cap holds. Evaluation results are unchanged.
