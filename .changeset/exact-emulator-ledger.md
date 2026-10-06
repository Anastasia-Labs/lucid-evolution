---
"@lucid-evolution/provider": patch
---

Make every emulator query and block agree with a scan of `emulator.ledger` again, however the ledger is edited. `ledger` and `transactionHistory` are plain own enumerable records once more, so `structuredClone`, spreading the emulator, `Object.defineProperty`, assigning `undefined` to an entry and sharing one record between emulators behave as they did before the indexed ledger. Editing a UTxO in place (its address, its assets, or swapping `utxo`) is seen by the next query, and a `pending` entry written into `transactionHistory` by hand is confirmed by the next block. Queries stay fast while only the emulator writes to the ledger; after a caller reads or replaces `emulator.ledger`, queries and blocks scan the record as they used to.
