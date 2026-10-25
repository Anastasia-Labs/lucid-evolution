---
"@lucid-evolution/uplc": patch
---

`rotateByteString` now runs in time linear in the length of its argument for every rotation amount. Before, rotating by a small negative amount took time quadratic in the length: about 16 s for a 128 KiB byte string. Results, ex-units and errors are unchanged.
