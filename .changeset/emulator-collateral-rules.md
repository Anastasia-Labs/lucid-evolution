---
"@lucid-evolution/provider": patch
---

The emulator now rejects under-collateralised transactions as the ledger does. A transaction with redeemers must have collateral inputs (at most `maxCollateralInputs`), its collateral inputs minus the collateral return must hold only ADA and cover `collateralPercentage` of the fee, and `total_collateral`, when present, must equal that balance (`NoCollateralInputs`, `TooManyCollateralInputs`, `CollateralContainsNonADA`, `InsufficientCollateral`, `IncorrectTotalCollateralField`). Lucid's completion now fails with a clear error on insufficient collateral rather than producing such a transaction.
