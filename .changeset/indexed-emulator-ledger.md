---
"@lucid-evolution/provider": patch
---

Speed up the emulator. UTxO queries no longer enumerate the ledger record or parse every address, and keep returning results in ledger order. Blocks no longer enumerate the ledger or the transaction history. Reference script hashes are computed once per script. `submitTx` frees every CML object it creates, uses sets for its witness checks, and no longer reads a freed key list when it verifies a native script supplied through a script reference, which used to fail with "null pointer passed to rust". Direct edits to `emulator.ledger` (adding, replacing or deleting entries, setting `spent`, or assigning a new record) are still honoured.
