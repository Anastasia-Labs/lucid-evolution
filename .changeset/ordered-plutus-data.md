---
"@lucid-evolution/lucid": patch
---

Keep the original encoding of Plutus data when a transaction is completed or serialized canonically. Canonical CBOR sorts Plutus maps, which changed datum hashes, inline datums and the redeemer values scripts see. Inline datums, witness datums and redeemer data whose value would change now keep their original bytes; all other parts of the transaction are still canonical.

Delayed redeemers with `setMinFee` now build their bootstrap draft with zero ex-units, so the maximum transaction budget no longer has to fit in the explicit fee before the real redeemers are evaluated.
