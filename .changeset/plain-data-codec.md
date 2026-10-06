---
"@lucid-evolution/plutus": patch
---

`Data.to` and `Data.from` encode and decode Plutus data in JavaScript instead of building a CML object per node, which was quadratic in nesting depth. They are 8 to 60 times faster and return byte-identical CBOR and identical values, in both node and canonical formats, including CML's map key ordering and deduplication. Input the JavaScript codec does not reproduce exactly (malformed values, unusual CBOR, maps with repeated keys) still goes through CML, so results and error messages are unchanged.
