---
"@lucid-evolution/lucid": patch
---

Coin selection in `complete()` now counts certificate and proposal deposits (stake registration, combined registration and delegation, DRep registration, pool registration, governance proposals) and credits deposit refunds and reward withdrawals. Before, it selected inputs for the outputs and the fee only, so a registration whose deposit was larger than the selected inputs failed with `UTxO Balance Insufficient` even when the wallet held enough, and a deregistration or withdrawal selected more inputs than it needed. A transaction whose refunds or withdrawals cover everything still spends one wallet input.
