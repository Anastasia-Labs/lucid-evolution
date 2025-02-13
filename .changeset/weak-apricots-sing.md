---
"@lucid-evolution/lucid": patch
---

Added Math.ceil to round up floating-point fee calculations before converting to BigInt. This fixes an issue where BigInt was being created from non-integer values, which could lead to runtime errors.
