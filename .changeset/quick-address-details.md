---
"@lucid-evolution/utils": patch
---

`getAddressDetails` parses an address once and dispatches on its kind instead of trying each address type in turn and catching the failures, and it memoizes up to 10,000 results. A first lookup of a bech32 address is several times faster, and a repeat lookup is about 900 times faster. Each call still returns a fresh object, and the output is unchanged for every address type.
