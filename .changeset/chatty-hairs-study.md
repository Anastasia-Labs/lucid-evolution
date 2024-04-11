---
"@lucid-evolution/lucid": patch
"@lucid-evolution/utils": patch
---

Introduced a new function, applyDoubleCborEncoding, which offers double bytestring encoding capability to scripts.
Notably, this function was previously dependent on `lucid-cardano`, but now our package is completely detached from it.
