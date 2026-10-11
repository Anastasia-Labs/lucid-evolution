---
"@lucid-evolution/utils": patch
---

`drepIDToCredential` rejects CIP-129 DRep IDs whose header byte is not `0x22` (key hash) or `0x23` (script hash). It used to check only the DRep bit and the low two bits, so headers such as `0x20`, `0x32` and `0xa3` were accepted. The error names the ID and the header byte.
