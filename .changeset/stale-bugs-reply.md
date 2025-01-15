---
"@lucid-evolution/lucid": patch
---

Previously, readFrom directly used TxBuilderConfig as input, which contradicted the builder design, where all TxBuilder modules are effect types and depend on TxConfig as Context. This mismatch led to conflicts with the compose API.

To resolve this, TxConfig is now passed via dependency injection, aligning readFrom with the effect-driven architecture of the TxBuilder modules.
