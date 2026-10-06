---
"@lucid-evolution/provider": patch
---

The emulator now rejects under-collateralised transactions as the ledger does. A transaction with redeemers must have collateral inputs (at most `maxCollateralInputs`), its collateral inputs minus the collateral return must hold only ADA and cover `collateralPercentage` of the fee, `total_collateral`, when present, must equal that balance, and a collateral return must hold at least its minimum ADA (`NoCollateralInputs`, `TooManyCollateralInputs`, `CollateralContainsNonADA`, `InsufficientCollateral`, `IncorrectTotalCollateralField`, `BabbageOutputTooSmallUTxO`). Lucid's completion now fails with a clear error on insufficient collateral rather than producing such a transaction.
