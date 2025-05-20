---
title: Pointer.ts
nav_order: 300
parent: Modules
---

## Pointer overview

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [predicates](#predicates)
  - [isPointer](#ispointer)
- [schemas](#schemas)
  - [Pointer (class)](#pointer-class)
    - [[Inspectable.NodeInspectSymbol] (method)](#inspectablenodeinspectsymbol-method)

---

# constructors

## make

Create a new Pointer instance

**Signature**

```ts
export declare const make: (slot: Natural.Natural, txIndex: Natural.Natural, certIndex: Natural.Natural) => Pointer
```

**Example**

```ts
import { Pointer, Natural } from "@lucid-evolution/experimental"
import assert from "assert"

const pointer = Pointer.make(Natural.makeOrThrow(1), Natural.makeOrThrow(2), Natural.makeOrThrow(3))
assert(pointer instanceof Pointer.Pointer)
```

Added in v2.0.0

# predicates

## isPointer

Check if the given value is a valid Pointer

**Signature**

```ts
export declare const isPointer: (u: unknown, overrideOptions?: ParseOptions | number) => u is Pointer
```

**Example**

```ts
import { Pointer, Natural } from "@lucid-evolution/experimental"
import assert from "assert"

const pointer = Pointer.make(Natural.makeOrThrow(1), Natural.makeOrThrow(2), Natural.makeOrThrow(3))
const isValid = Pointer.isPointer(pointer)
assert(isValid === true)
```

Added in v2.0.0

# schemas

## Pointer (class)

Schema for pointer to a stake registration certificate
Contains slot, transaction index, and certificate index information

**Signature**

```ts
export declare class Pointer
```

Added in v2.0.0

### [Inspectable.NodeInspectSymbol] (method)

**Signature**

```ts
;[Inspectable.NodeInspectSymbol]()
```
