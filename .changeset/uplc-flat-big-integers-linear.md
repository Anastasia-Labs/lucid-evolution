---
"@lucid-evolution/uplc": patch
---

Flat-encoding and decoding a large integer constant now takes time linear in its size. Before, both were quadratic: about 0.3 s to encode and 0.4 s to decode a 64 KiB integer, against about 2 ms and 1 ms now. This applies to programs, script parameters and `eval_builtin_raw` arguments and results. Results, ex-units and errors are unchanged. The fix is in `pallas-codec`, patched to `colll78/pallas` until a release includes it (txpipe/pallas#839).
