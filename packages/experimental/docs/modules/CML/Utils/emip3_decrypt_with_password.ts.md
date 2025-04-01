---
title: CML/Utils/emip3_decrypt_with_password.ts
nav_order: 255
parent: Modules
---

## emip3_decrypt_with_password overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [Emip3DecryptWithPasswordError (class)](#emip3decryptwithpassworderror-class)
- [Functions](#functions)
  - [emip3DecryptWithPassword](#emip3decryptwithpassword)
- [FunctionsUnsafe](#functionsunsafe)
  - [emip3DecryptWithPasswordUnsafe](#emip3decryptwithpasswordunsafe)

---

# Errors

## Emip3DecryptWithPasswordError (class)

Error class for emip3_decrypt_with_password function

This error is thrown when the emip3_decrypt_with_password function fails.

**Signature**

```ts
export declare class Emip3DecryptWithPasswordError
```

Added in v2.0.0

# Functions

## emip3DecryptWithPassword

Wrapper for the emip3_decrypt_with_password function

**Signature**

```ts
export declare const emip3DecryptWithPassword: (
  password: string,
  data: string
) => Effect.Effect<string, Emip3DecryptWithPasswordError>
```

Added in v2.0.0

# FunctionsUnsafe

## emip3DecryptWithPasswordUnsafe

Unsafely calls emip3_decrypt_with_password function without Effect wrapper

**Signature**

```ts
export declare const emip3DecryptWithPasswordUnsafe: (password: string, data: string) => string
```

Added in v2.0.0
