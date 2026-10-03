---
"@lucid-evolution/provider": patch
---

Report the protocol version from Koios, Kupmios and Maestro.

`ProtocolParameters.protocolMajorVersion` was set only by Blockfrost and the emulator, so a build on
any other provider left it `undefined`. Anything costing scripts then had to guess the protocol
version, and a guess is wrong for any chain not on the version it assumes.

No new requests: all three already fetch the field and dropped it on the floor. Koios decodes
`protocol_major` / `protocol_minor`, Ogmios decodes `version: { major, minor }`, and Maestro returns
`version` in the same response.
