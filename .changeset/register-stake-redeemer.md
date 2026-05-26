---
"@lucid-evolution/lucid": patch
"@lucid-evolution/provider": patch
---

Add optional certificate redeemer support to `registerStake` and `register.Stake`, using witnessed registration certificates when a redeemer is supplied while preserving the existing witnessless registration path otherwise.

The emulator now recognizes witnessed stake registration certificates when validating certificate witnesses.
