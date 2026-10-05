---
"@lucid-evolution/provider": minor
"@lucid-evolution/lucid": minor
---

Remove Maestro provider (Maestro has shut down its Cardano API).

The `Maestro` class and its `MaestroConfig` / `MaestroSupportedNetworks` types are no longer exported from `@lucid-evolution/provider` or re-exported from `@lucid-evolution/lucid`. Use Blockfrost, Koios, Kupmios or a custom `Provider` instead.
