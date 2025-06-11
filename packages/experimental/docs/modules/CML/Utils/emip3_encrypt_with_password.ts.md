---
title: CML/Utils/emip3_encrypt_with_password.ts
nav_order: 261
parent: Modules
---

## emip3_encrypt_with_password overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [Emip3EncryptWithPasswordError (class)](#emip3encryptwithpassworderror-class)
- [Functions](#functions)
  - [emip3EncryptWithPassword](#emip3encryptwithpassword)
- [FunctionsUnsafe](#functionsunsafe)
  - [emip3EncryptWithPasswordUnsafe](#emip3encryptwithpasswordunsafe)

---

# Errors

## Emip3EncryptWithPasswordError (class)

Error class for emip3_encrypt_with_password function

This error is thrown when the emip3_encrypt_with_password function fails.

**Signature**

```ts
export declare class Emip3EncryptWithPasswordError
```

Added in v2.0.0

# Functions

## emip3EncryptWithPassword

Wrapper for the emip3_encrypt_with_password function

**Signature**

```ts
export declare const emip3EncryptWithPassword: (
  password: string,
  salt: string,
  nonce: string,
  data: string
) => Effect.Effect<string, Emip3EncryptWithPasswordError>
```

Added in v2.0.0

# FunctionsUnsafe

## emip3EncryptWithPasswordUnsafe

Unsafely calls emip3_encrypt_with_password function without Effect wrapper

**Signature**

```ts
export declare const emip3EncryptWithPasswordUnsafe: (
  password: string,
  salt: string,
  nonce: string,
  data: string
) => string
```

Added in v2.0.0
