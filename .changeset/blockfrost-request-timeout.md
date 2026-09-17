---
"@lucid-evolution/provider": patch
---

Blockfrost requests now abort after a configurable `requestTimeoutMs` (default 30 seconds) instead of waiting for the runtime's socket timeout, five minutes under Node. Pass `new Blockfrost(url, projectId, { requestTimeoutMs })` to change it.
