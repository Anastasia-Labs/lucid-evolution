---
"@lucid-evolution/wallet": patch
"@lucid-evolution/lucid": patch
---

Seed wallets find the keys a transaction needs by looking inputs and collateral up in an index of the wallet's UTxOs instead of scanning every UTxO for every input, and `readFrom` checks for already-read UTxOs the same way. With 5000 wallet UTxOs and 200 inputs, finding the signing keys drops from about 6.3 ms to 1.4 ms.
