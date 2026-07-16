---
"@lucid-evolution/core-types": minor
"@lucid-evolution/lucid": minor
"@lucid-evolution/provider": minor
"@lucid-evolution/wallet": minor
---

Add provider correctness and observation capabilities while preserving existing provider and wallet contracts.

- Filter spent Emulator ledger entries from every public UTxO query and retain Emulator transaction status independently of output consumption.
- Treat an empty wallet UTxO override as authoritative and add `clearUTxOOverride`.
- Expose structured Kupmios and Ogmios errors with transport, HTTP, retry, operation, JSON-RPC, and cause metadata.
- Add provider-neutral reward-account registration state, transaction status and cancellable confirmation waiting, and optional policy-ID UTxO lookup with a portable fallback.
- Keep Kupmios unit queries exact for assets with an empty asset name instead of broadening them into policy queries.
- Use validated per-Lucid-instance slot configuration throughout time conversion, transaction building, evaluation, signing, and script-context construction.
