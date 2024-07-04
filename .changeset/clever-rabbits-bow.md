---
"@lucid-evolution/core-types": patch
"@lucid-evolution/lucid": patch
"@lucid-evolution/utils": patch
---

-
- remove nativeFromJson and nativeJSFromJSon, use scriptFromNative instead
- add scriptFromCMLNative for CML Native type
- add parseCMLNative
- remove native.ts from lucid package
- reallocate native.test.ts file to utils package
