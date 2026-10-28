---
"@lucid-evolution/uplc": patch
---

Plutus Data constructors in the general form (CBOR tag 102, used for constructor indexes above 127) now decode as Plutus decodes them. The index and fields may be a definite list of exactly two elements or an indefinite list of two elements and a break; any other length is an error. Before, the list length was not checked and the break of the indefinite form was left unread, so a list, map or constructor holding such a constructor ended at that break. This applies to `apply_params_to_script` parameters and to datums and redeemers in the transactions given to `eval_phase_two_raw`; `eval_program_raw` arguments already decoded this way. The fix is in `pallas-primitives`, patched to `colll78/pallas` until a release includes it.
