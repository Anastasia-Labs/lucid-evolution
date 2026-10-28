---
"@lucid-evolution/utils": minor
---

`applyParamsToScript` now applies parameters with `apply_params_to_script` from `@lucid-evolution/uplc`, and `@lucid-evolution/utils` no longer depends on `@harmoniclabs/uplc` or `@harmoniclabs/plutus-data`. Each parameter is applied as a data constant holding its `Data.to` encoding. For some parameter shapes this gives different bytes than before, and so a different (correct) script hash:

- Byte strings over 64 bytes are no longer truncated to their first 64 bytes.
- Negative integers are encoded minimally (for example -24 as `37`, not `3817`).
- Integers below -2^64 are now accepted; applying them used to throw.
- Integers whose magnitude takes more than 64 bytes are written in chunks of at most 64 bytes, as `Data.to` writes them.

Parameters of any other shape give the same bytes as before. This relies on `@lucid-evolution/uplc` 0.5.3, in which tag 102 Plutus Data constructors (indexes above 127) decode in the indefinite form.
