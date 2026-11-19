---
"@lucid-evolution/provider": patch
---

Fix the Koios provider throwing a ParseError in `utxosByOutRef` for transactions with a collateral output. Koios serializes that output's `asset_list` as a JSON-encoded string (`"[]"`) instead of an array, and returns `inline_datum` as `{ bytes: null, value: null }` for outputs carrying a datum hash; both shapes are now accepted and normalized when decoding `tx_info` responses.
