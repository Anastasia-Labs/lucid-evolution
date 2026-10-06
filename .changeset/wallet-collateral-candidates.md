---
"@lucid-evolution/core-types": minor
"@lucid-evolution/wallet": minor
"@lucid-evolution/lucid": minor
---

Add an optional `getCollateral(amount?)` to `Wallet`, and prefer the wallet's own collateral when completing script transactions. A wallet created with `selectWallet.fromAPI` provides it when the CIP-30 wallet implements `getCollateral`, passing the required amount and returning only candidates in the UTxO override when one is set. Candidates are also limited to `presetWalletInputs` when given. If the wallet returns nothing, its candidates cannot cover the collateral, or the call fails, collateral is selected from the wallet's UTxOs as before. A candidate holding exactly the collateral amount in ADA is used without a collateral return.
