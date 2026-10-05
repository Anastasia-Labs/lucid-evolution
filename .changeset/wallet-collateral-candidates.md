---
"@lucid-evolution/core-types": patch
"@lucid-evolution/wallet": patch
"@lucid-evolution/lucid": patch
---

Add an optional `getCollateral()` to `Wallet`. When a wallet provides it, transaction completion selects collateral only from the UTxOs it returns; an empty list fails instead of falling back to the wallet's other UTxOs. A wallet created with `selectWallet.fromAPI` provides it when the CIP-30 wallet implements `getCollateral`.
