---
"@lucid-evolution/provider": patch
---

Emulator: reject a transaction whose reference inputs overlap its inputs the way the ledger does. Protocol major versions 9 and 10 refuse any overlap (`BabbageNonDisjointRefInputs`); from major version 11 the overlap is refused only when the transaction runs a PlutusV3 script (`ReferenceInputsNotDisjointFromInputs`), since the check is part of building the PlutusV3 script context. The protocol version comes from `protocolParameters.protocolMajorVersion`, defaulting to 11 when unset.
