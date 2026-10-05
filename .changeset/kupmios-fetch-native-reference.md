---
"@lucid-evolution/provider": patch
---

Add `KupmiosOptions.fetchImpl`, the `fetch` a `Kupmios` instance uses for its Kupo and Ogmios requests. It receives the provider's abort signal. Without it, requests use the global `fetch` as before.
