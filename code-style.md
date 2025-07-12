# Code Style Guide

## Table of Contents

- [Code Style Guide](#code-style-guide)
  - [Table of Contents](#table-of-contents)
  - [Package Structure](#package-structure)
    - [Example](#example)
  - [Build Configuration](#build-configuration)
    - [Support ESM Modern typescript convention, CJS for legacy and minimum support](#support-esm-modern-typescript-convention-cjs-for-legacy-and-minimum-support)
  - [Code Organization](#code-organization)
    - [Example Module Structure](#example-module-structure)
    - [Example Code](#example-code)
  - [Naming Conventions](#naming-conventions)
    - [Function Naming Conventions](#function-naming-conventions)
  - [Coding Practices](#coding-practices)
    - [Use const keyword over function keyword](#use-const-keyword-over-function-keyword)
    - [Pattern Matching](#pattern-matching)
    - [Avoid using `any` type](#avoid-using-any-type)
    - [Avoid using `as` type assertion keyword](#avoid-using-as-type-assertion-keyword)
    - [null vs undefined](#null-vs-undefined)
    - [Class vs Functions](#class-vs-functions)
    - [Be careful with equality checks](#be-careful-with-equality-checks)
  - [Type System](#type-system)
    - [Type Annotations](#type-annotations)
    - [Flags](#flags)
    - [Types with Schema](#types-with-schema)
    - [Schema.TaggedClass as Smart Constructors](#schemataggedclass-as-smart-constructors)
    - [Constructors](#constructors)
      - [Class-based Constructors](#class-based-constructors)
      - [Smart Constructors Pattern](#smart-constructors-pattern)
      - [Multiple Constructor Methods](#multiple-constructor-methods)
      - [Constructor Safety Guidelines](#constructor-safety-guidelines)
    - [Union Types](#union-types)
  - [Function Structure](#function-structure)
    - [Safe and Unsafe Variants](#safe-and-unsafe-variants)
  - [Error Handling](#error-handling)
    - [Error Messages](#error-messages)
    - [Error Typing Approaches](#error-typing-approaches)
      - [Guidelines for Choosing Error Types](#guidelines-for-choosing-error-types)
      - [Characteristics of Domain-Specific Error Types](#characteristics-of-domain-specific-error-types)
  - [Testing](#testing)
    - [Requirements](#requirements)
    - [Example](#example-1)
  - [Documentation](#documentation)
    - [Function Comments](#function-comments)
    - [Documentation Categories](#documentation-categories)
  - [Implementation Patterns](#implementation-patterns)
    - [Example](#example-2)
  - [Dependencies](#dependencies)
    - [Peer Dependency Usage](#peer-dependency-usage)
    - [Semantic Versioning](#semantic-versioning)

## Package Structure

- Each package should have a single, well-defined responsibility.
- Common logic, utilities, and types should be isolated in dedicated shared packages for reuse.
- Functionality tied to a specific platform or library should be isolated in its own package.
- Package names should describe their purpose and scope clearly.

### Example

For instance, if you have libraries accomplishing the same task, you should separate them into different packages:

```
packages/
  cml/
    index.ts
  cardano-js/
    index.ts
```

In `cml/index.ts`, you might have:

```ts
import * as CML from "cml-library";

export const add = (a: number, b: number): number => {
  return CML.add(a, b);
};
```

In `cardano-js/index.ts`, you might have:

```ts
import * as CardanoJS from "cardano-js-library";

export const add = (a: number, b: number): number => {
  return CardanoJS.add(a, b);
};
```

## Build Configuration

### Support ESM Modern typescript convention, CJS for legacy and minimum support

Use a Base config `tsconfig.base.json` as follows

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "strict": true,
    "moduleResolution": "node",
    "sourceMap": true
  },
  "files": ["src/index.ts"],
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules", "test"]
}
```

Use a ESM config `tsconfig.esm.json` as follows
Note: `declaration` is set to true in ESM config to generate type definitions for both ESM and CJS
`declarationMap` is set to true in ESM config to generate source maps for type definitions

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "outDir": "./dist/esm",
    "declaration": true,
    "declarationMap": true,
    "declarationDir": "./dist/types"
  }
}
```

Use a CJS config `tsconfig.cjs.json` as follows

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist/cjs",
    "declaration": false
  }
}
```

A comprehensive `package.json` should look like the following, supporting both ESM and CJS formats with proper exports configuration:

```json
{
  "name": "@your-entity/your-package-name",
  "version": "0.0.0",
  "description": "",
  "homepage": "https://github.com/your-organization/your-repo",
  "main": "./dist/esm/index.js",
  "types": "./dist/types/index.d.ts",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/types/index.d.ts",
      "require": "./dist/cjs/index.js",
      "import": "./dist/esm/index.js"
    },
    "./*": {
      "types": "./dist/types/*.d.ts",
      "require": "./dist/cjs/*.js",
      "import": "./dist/esm/*.js"
    },
    "./**/*.js": {
      "types": "./dist/types/*.d.ts",
      "require": "./dist/cjs/*.js",
      "import": "./dist/esm/*.js"
    }
  },
  "files": [
    "dist"
  ],
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "build": "rm -rf dist && tsc --project tsconfig.esm.json && tsc --project tsconfig.cjs.json",
    "test": "vitest run",
    "lint": "tsc --noEmit",
    "clean": "rm -rf .turbo && rm -rf node_modules && rm -rf dist"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  ...
```

## Code Organization

- The code structure should follow the principles of modularity, reusability, and ease of testing.
- Modules should be organized by functionality and purpose.
- Module types should be defined at the top of the file.
- Code formatting is handled by Prettier CLI.

### Example Module Structure

```
packages/
  my-package/
      Calculator.ts
      index.ts
```

### Example Code

Inside `Calculator.ts`, you define Effect-based functions and functions known to be unsafe:

```ts
import { Effect, Data } from "effect";

export class CalculatorError extends Data.TaggedError("CalculatorError")<{
  message?: string;
}> {}

// Sum is a safe function therefore effect is not needed
export const sum = (self: number, that: number): number => self + that;

// Divide two numbers using Effect, with type safe error for division by zero
export const divide = (
  self: number,
  that: number,
): Effect.Effect<number, CalculatorError> =>
  that === 0
    ? Effect.fail(
        new CalculatorError({ message: `Cannot divide ${self} by zero` }),
      )
    : Effect.succeed(self / that);

export const divideOrThrow = (self: number, that: number): number =>
  Effect.runSync(divide(self, that));
```

Inside the same file, you define unsafe functions adding the `unsafe` prefix:

Usage patterns:

```ts
// For Effect-based functions
import { divide } from "my-package/Calculator";
divide(1, 0);
// For unsafe functions
import { divideOrThrow } from "my-package/Calculator";
divideOrThrow(1, 0);
// For module import
import { Calculator } from "my-package";
Calculator.divide(1, 0);
Calculator.divideOrThrow(1, 0);
```

## Naming Conventions

- Variables: camelCase
- Functions: camelCase
- Classes: PascalCase
- Modules: PascalCase
- Files: PascalCase
- Constants: UPPER_SNAKE_CASE
- Private members: \_prefixedCamelCase
- Do not use I as a prefix for interface names.

### Function Naming Conventions

Functions should follow naming patterns for consistency:

For example, serialization functions should be named as follows:

- `is*` - Predicate functions that return boolean values (isValid, isEmpty)
- `from*` - Constructors that create objects from other formats (fromBytes, fromHex, fromCBOR)
- `to*` - Converters that transform objects to other formats (toBytes, toHex, toCBOR)
- `make` - Constructors that create objects from basic inputs
- `*OrThrow` - Versions that throw exceptions instead of returning Effect (makeOrThrow, fromBytesOrThrow)

Example:

```ts
// Effect-based version
export const fromBytes: SerdeImpl.FromBytes<KeyHash, KeyHashError> = /* ... */;

// Throwing version
export const fromBytesOrThrow = (bytes: Uint8Array) => /* ... */;
```

## Coding Practices

### Use const keyword over function keyword

```ts
// Use const
const myFunction = () => {
  // implementation
};

// Don't use function keyword
function myFunction() {
  // implementation
}
```

### Pattern Matching

Use switch statements for pattern matching, and make sure to handle all possible cases including the default case.

```ts
export const toId = <T extends Network>(network: T): 0 | 1 => {
  switch (network) {
    case "Preview":
    case "Preprod":
    case "Custom":
      return 0;
    case "Mainnet":
      return 1;
    default:
      throw new Error(
        `Exhaustive check failed: Unhandled case '${network}' encountered.`,
      );
  }
};
```

### Avoid using `any` type

- Avoid using `any` type as it defeats the purpose of TypeScript's type system.
- Use `unknown` instead of `any` to enforce type checking.
- Use `unknown` when you need to accept any type but still want to enforce type checking later.

### Avoid using `as` type assertion keyword

- Avoid using `as` keyword unless absolutely necessary.
- Instead use `satisfies` operator to ensure that an object conforms to a specific type.

### null vs undefined

- Use undefined. Do not use null.

### Class vs Functions

- Generally, prefer functions over classes with methods and inheritance
- Use Schema.TaggedClass for creating nominal types with runtime validation
- Avoid traditional OOP patterns like deep inheritance hierarchies and complex method interfaces

### Be careful with equality checks

- Use `===` and `!==` for comparing primitive types to ensure strict equality.
- Remember that TypeScript's equality operators compare object references, not their values.
- For deep equality checks on nested objects, consider using Effect's Equal utility.

## Type System

### Type Annotations

- Use `type` for unions and `interface` for opaque types and function signature:

```typescript
type Status = "active" | "inactive" | "pending";

interface User {
  readonly id: number;
  readonly name: string;
  readonly status: Status;
}

interface Repository<T> {
  find(id: string): Promise<T>;
  save(entity: T): Promise<void>;
  delete(id: string): Promise<boolean>;
}
```

### Flags

More than 2 related Boolean properties on a type should be turned into an union type flag.

Instead of:

```ts
interface ModeOptions {
  min: boolean;
  max: boolean;
  average: boolean;
}
```

Use:

```ts
type ModeOptions = {
  mode?: "min" | "max" | "average";
};

// Usage with optional parameter
const calculate = (value: Array<number>, options: ModeOptions = {}) => {
  const { mode = "average" } = options;
  return mode;
  // ... implementation
};
```

### Types with Schema

Use the Effect Schema library consistently for defining types:

1. Create constants for validation constraints:

```ts
export const KEY_LENGTH = 28;
```

2. Define schemas using these constants:

```ts
const KeyHashHexString = HexStringSchema.pipe(
  Schema.length(KEYHASH_HEX_LENGTH),
).annotations({
  message: (issue) =>
    `must be ${KEYHASH_HEX_LENGTH} characters, got: ${issue.actual}.`,
});
```

3. Define classes using Schema.TaggedClass:

```ts
export class KeyHash extends Schema.TaggedClass<KeyHash>()("KeyHash", {
  hash: KeyHashHexString,
}) {}
```

### Schema.TaggedClass as Smart Constructors

Schema.TaggedClass implements the smart constructor pattern found in functional programming languages like Haskell. It provides an alternative to TypeScript's branded types and nominal type techniques, with the following characteristics:

1. **Runtime Validation**: Schema.TaggedClass validates data structures at runtime against a schema, while TypeScript interfaces and branded types are erased at runtime
2. **Encapsulation**: It encapsulates properties and enforces invariants
3. **Construction Control**: It prevents creation of invalid instances
4. **Type Safety**: It provides similar benefits to Haskell's nominal typing in TypeScript's structural type system

In Haskell, types are nominal by default, meaning two types with identical structures but different names are considered completely different types. For example:

```haskell
newtype UserId = UserId Int
newtype ProductId = ProductId Int

-- These are different types despite both wrapping an Int
-- This prevents accidental misuse of one type where another is expected
```

TypeScript, by contrast, uses structural typing where types with the same structure are considered compatible regardless of their names. Branded types in TypeScript (e.g., `type BrandedString = string & { readonly brand: unique symbol }`) attempt to mimic nominal typing at compile time but lack runtime validation.

Schema.TaggedClass provides both compile-time type safety and runtime validation:

```ts
// The class constructor validates input against the schema
try {
  // This will fail if hash doesn't match schema constraints
  const keyHash = new KeyHash({ hash: "invalid" });
} catch (error) {
  // Schema validation error
}

// To bypass validation for pre-validated data:
const keyHash = new KeyHash({ hash: validHash }, { disableValidation: true });
```

The `disableValidation` option should be used with caution:

- **Performance benefit**: Skipping validation improves performance for pre-validated data, which is especially important in hot paths or when creating many instances
- **Usage guidance**: Only use when you have already validated the input data or received it from a trusted source

### Constructors

#### Class-based Constructors

- Use `Schema.TaggedClass` for defining type-safe classes that serve as both types and runtime validators
- Class constructors automatically validate input parameters against their schema definition
- Class names should be PascalCase and match their schema name

```ts
import { Schema } from "effect";

// Define constants for validation requirements
// Sets the expected byte length for a key hash
export const KEYHASH_BYTES_LENGTH = 28;

// Sets the expected hex string length (2 chars per byte)
export const KEYHASH_HEX_LENGTH = 56;

// Define a schema with validation rules
// This creates a specialized schema that validates:
// 1. That the input is a valid hex string (via HexStringSchema)
// 2. That it has exactly the required length
const KeyHashHexString = HexStringSchema.pipe(
  Schema.length(KEYHASH_HEX_LENGTH),
).annotations({
  // Custom error message for validation failures that shows expected vs actual length
  message: (issue) =>
    `must be ${KEYHASH_HEX_LENGTH} characters, got: ${issue.actual}.`,
});

// Define the class using Schema.TaggedClass
// This creates:
// 1. A runtime validator that checks inputs against the schema
// 2. A TypeScript type definition for compile-time type checking
// 3. A discriminated union with _tag: "KeyHash" for pattern matching
export class KeyHash extends Schema.TaggedClass<KeyHash>()("KeyHash", {
  // Define the structure with schema-validated properties
  hash: KeyHashHexString, // Will be validated as a hex string of correct length
}) {}

// Usage:
// Creating an instance will automatically validate the input
// const keyHash = new KeyHash({ hash: "validHexString..." }); // Valid - creates instance
// const invalid = new KeyHash({ hash: "tooShort" }); // Error - fails validation
```

#### Smart Constructors Pattern

Follow these patterns for constructors:

1. **Effect-based factory functions** - Named with `make` or `from*` prefix:

   - Return `Effect.Effect<T, E>` for error handling
   - Use descriptive error types
   - Add comprehensive JSDoc with examples

2. **OrThrow variants** - Named with `*OrThrow` suffix:
   - Throw exceptions instead of returning Effects
   - Simplify usage in contexts where error handling is less critical
   - Reuse logic from Effect-based version when possible

```ts
// Effect-based constructor
/**
 * Construct a KeyHash from a hex string.
 *
 * @example
 * import { KeyHash } from "@evolution-sdk/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const hash = "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
 * const keyHashEffect = KeyHash.make(hash);
 * const keyHash = Effect.runSync(keyHashEffect);
 * assert(keyHash._tag === "KeyHash");
 * assert(keyHash.hash === hash);
 *
 * @since 2.0.0
 * @category constructors
 */
export const make: SerdeImpl.Make<KeyHash, KeyHashError> = Effect.fnUntraced(
  function* (hash) {
    if (hash.length !== KEYHASH_HEX_LENGTH) {
      return yield* new KeyHashError({
        message: `KeyHash must be ${KEYHASH_HEX_LENGTH} characters long.`,
      });
    }
    if (!Bytes.isHex(hash)) {
      return yield* new KeyHashError({
        message: `KeyHash must be a valid hex string.`,
      });
    }
    return new KeyHash({ hash }, { disableValidation: true });
  },
);

// OrThrow variant
/**
 * Construct a KeyHash from a hex string, throws on error.
 *
 * @example
 * import { KeyHash } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const hash = "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
 * const keyHash = KeyHash.makeOrThrow(hash);
 * assert(keyHash._tag === "KeyHash");
 * assert(keyHash.hash === hash);
 *
 * @since 2.0.0
 * @category constructors
 */
export const makeOrThrow: SerdeImpl.MakeOrThrow<KeyHash> = (hash: string) => {
  if (!Bytes.isHex(hash)) {
    throw new KeyHashError({
      message: `KeyHash must be a valid hex string.`,
    });
  }
  if (hash.length !== KEYHASH_HEX_LENGTH) {
    throw new KeyHashError({
      message: `KeyHash must be ${KEYHASH_HEX_LENGTH} characters long.`,
    });
  }
  return new KeyHash({ hash }, { disableValidation: true });
};
```

#### Multiple Constructor Methods

For complex types, provide multiple constructor methods that create objects from different sources:

```ts
// From bytes constructor
export const fromBytes: SerdeImpl.FromBytes<KeyHash, KeyHashError> =
  Effect.fnUntraced(function* (bytes) {
    if (bytes.length !== KEYHASH_BYTES_LENGTH) {
      return yield* new KeyHashError({
        message: `KeyHash must be ${KEYHASH_BYTES_LENGTH} bytes long, got: ${bytes.length}.`,
      });
    }
    const hash = Bytes.toHexOrThrow(bytes);
    return new KeyHash({ hash }, { disableValidation: true });
  });

// From CBOR constructor
export const fromCBOR: SerdeImpl.FromCBOR<
  KeyHash,
  CBOR.CBORError | Bytes.BytesError | KeyHashError
> = Effect.fn(function* (cborHex) {
  const keyHash = yield* CBOR.decodeHex(cborHex);
  return yield* fromBytes(keyHash);
});
```

#### Constructor Safety Guidelines

- Use the `disableValidation: true` option when creating an instance from pre-validated data
- Create constructors for each common input format (string, bytes, CBOR) to support various use cases
- Ensure consistent error handling across all constructors
- Provide thorough validation with descriptive error messages
- Implement comprehensive type safety using Effect interfaces:

```ts
// Define consistent interfaces for constructor functions in SerdeImpl.ts
export interface Make<T, E = never> {
  (input: string): Effect.Effect<T, E, never>;
}

export interface MakeOrThrow<T> {
  (input: string): T;
}

export interface FromBytes<T, E = never> {
  (bytes: Uint8Array): Effect.Effect<T, E, never>;
}

export interface ToBytes<T> {
  (value: T): Uint8Array;
}
```

### Union Types

For union types representing different variants of a concept:

1. Define each variant in its own module
2. Use Schema.Union to combine variants with discriminated unions
3. Use string literal tag fields for discrimination

```ts
// Define the union schema
export const Address = Schema.Union(
  BaseAddress.BaseAddress,
  EnterpriseAddress.EnterpriseAddress,
  /* other variants */
);

// Switch on the discriminant field
export const toBytes = (address: Address) => {
  switch (address._tag) {
    case "BaseAddress":
      return BaseAddress.toBytes(address);
    case "EnterpriseAddress":
      return EnterpriseAddress.toBytes(address);
    // other cases
  }
};
```

## Function Structure

### Safe and Unsafe Variants

Provide both Effect-based and throwing versions of functions:

```ts
// Effect-based version that returns errors in the Effect channel
export const operation: SerdeImpl.Operation<Result, ErrorType> =
  Effect.fnUntraced(function* (input) {
    // implementation that yields errors
  });

// "OrThrow" version that throws errors directly
export const operationOrThrow: SerdeImpl.OperationOrThrow<Result> = (input) => {
  // implementation that throws errors
};
```

## Error Handling

### Error Messages

Error messages should follow these guidelines for clarity and helpfulness:

- **Clarity**: Clearly state what happened (e.g., "Cannot parse input")
- **Context**: Provide relevant context like input values and expected formats
- **Resolution**: Suggest how to fix the issue (e.g., "Check if the input is valid JSON")
- **Alternatives**: When appropriate, suggest alternatives (e.g., "Consider using parseOrDefault instead")

```ts
import { Data, Effect } from "effect";
import { FormatError } from "experimental";

// Implement proper error types
class JSONParseError extends Data.TaggedError("JSONParseError")<{
  cause?: unknown;
  message?: string;
}> {}
const parse = (input: string): Effect.Effect<any, JSONParseError, never> =>
  Effect.try({
    // JSON.parse may throw for bad input
    try: () => JSON.parse(input),
    // remap the error
    catch: (unknown) =>
      new JSONParseError(
        FormatError.make({
          message: `Cannot parse input "${input}". Check if the input is valid JSON. If you don't need validation, consider using tryParse instead.`,
          cause: unknown,
        }),
      ),
  });
```

### Error Typing Approaches

When designing your error handling strategy, choose between these complementary approaches:

- **Generic module errors**: Single error types (like `KeyHashError`) that represent all possible errors from a module
- **Domain-specific errors**: Specialized error types that model specific failure scenarios in your business domain

#### Guidelines for Choosing Error Types

- Use generic module-level errors when:

  - A single error type is sufficient for most user needs
  - The specific error reason can be determined from the error message
  - The error handling strategy is typically the same for all error cases

  ```ts
  // Generic module error example
  export class KeyHashError extends Data.TaggedError("KeyHashError")<{
    message: string;
    cause?: unknown;
  }> {}

  // Usage - different error scenarios use the same type with descriptive messages
  export const fromBytes: SerdeImpl.FromBytes<KeyHash, KeyHashError> =
    Effect.fnUntraced(function* (bytes) {
      if (bytes.length !== KEYHASH_BYTES_LENGTH) {
        return yield* new KeyHashError({
          message: `KeyHash must be ${KEYHASH_BYTES_LENGTH} bytes long, got: ${bytes.length}.`,
        });
      }
      // Other validations use the same error type...
    });
  ```

- Use domain-specific errors when:

  - Different errors require different handling strategies
  - The calling code needs to distinguish between error cases
  - You need to provide specific recovery paths for different error types
  - Business rules and constraints need to be explicitly modeled as error types

  ```ts
  import { Data, Effect } from "effect";

  // Domain-specific error types with relevant contextual information
  export class InsufficientFundsError extends Data.TaggedError(
    "InsufficientFundsError",
  )<{
    available: bigint;
    required: bigint;
    walletId: string;
  }> {}

  export class InvalidAddressError extends Data.TaggedError(
    "InvalidAddressError",
  )<{
    address: string;
    reason: "wrong_network" | "invalid_format" | "checksum_mismatch";
  }> {}

  export class TransactionExpiredError extends Data.TaggedError(
    "TransactionExpiredError",
  )<{
    expiresAt: Date;
    currentTime: Date;
  }> {}

  // Union type for all possible transaction errors
  export type TransactionError =
    | InsufficientFundsError
    | InvalidAddressError
    | TransactionExpiredError;

  // Function that uses domain-specific errors
  export const sendTransaction = (
    tx: Transaction,
  ): Effect.Effect<TransactionId, TransactionError> =>
    Effect.fnUntraced(function* () {
      // Check for sufficient funds
      if (tx.amount > tx.wallet.balance) {
        return yield* new InsufficientFundsError({
          available: tx.wallet.balance,
          required: tx.amount,
          walletId: tx.wallet.id,
        });
      }

      // Validate address
      if (!isValidAddress(tx.recipientAddress)) {
        return yield* new InvalidAddressError({
          address: tx.recipientAddress,
          reason: getAddressInvalidReason(tx.recipientAddress),
        });
      }

      // Check expiration
      if (tx.expiresAt < new Date()) {
        return yield* new TransactionExpiredError({
          expiresAt: tx.expiresAt,
          currentTime: new Date(),
        });
      }

      // Process transaction...
      return yield* Effect.succeed(generateTransactionId());
    });

  // Client code can handle specific error types through pattern matching
  const handleTransaction = (tx: Transaction) =>
    Effect.catchTags(sendTransaction(tx), {
      InsufficientFundsError: (e) =>
        Effect.logError(
          `Not enough funds. Available: ${e.available}, Required: ${e.required}`,
        ),
      InvalidAddressError: (e) =>
        Effect.logError(`Invalid address: ${e.address}. Reason: ${e.reason}`),
      TransactionExpiredError: (e) =>
        Effect.logError(`Transaction expired at ${e.expiresAt.toISOString()}`),
    });
  ```

#### Characteristics of Domain-Specific Error Types

- Provide explicit type information about the specific error condition
- Contain structured data relevant to the particular error scenario
- Enable compile-time checking of error handling completeness
- Support pattern matching on error variants
- Represent business domain constraints and validation rules as types
- Allow for specialized error handling strategies per error type

## Testing

### Requirements

- Unit tests are required for all functions
- Test files must be named `*.test.ts`
- Use `vitest` for testing
- Use `@effect/vitest` for testing Effect-based functions

### Example

```ts
import { expect, test } from "vitest";
import { it, describe } from "@effect/vitest";

test("sum adds two numbers", () => {
  expect(sum(1, 2)).toBe(3);
});

describe("divide handles zero division", () => {
  it.effect("should fail on divide by zero", () =>
    Effect.gen(function* () {
      const result = yield* Effect.flip(divide(1, 0));
      expect(result).toBeInstanceOf(CalculatorError);
    }),
  );
});
```

## Documentation

### Function Comments

Comments should be the foundation of library documentation.
Each function must contain the following:

1. A concise description of the function's purpose
2. An example of function usage with @example tag. The example must include the import statement
3. The version when the function was introduced using @since tag
4. A category tag for grouping related functions

```ts
/**
 * Sums two numbers
 *
 * @example
 * import { sum } from "my-package/Calculator";
 * sum(1, 2) // 3
 *
 * @since 1.0.0
 * @category transformation
 */
export const sum = (self: number, that: number): number => self + that;
```

### Documentation Categories

Every exported function must include comprehensive JSDoc with the following sections:

Categories should be consistently used across the codebase and include:

- `constructors` - For functions that create new instances
- `encoding/decoding` - For serialization/deserialization functions
- `equality` - For comparison functions
- `transformation` - For data transformation functions
- `model` - For type definitions
- `schemas` - For schema definitions
- `errors` - For error classes
- `constants` - For constant values
- `predicates` - For validation functions
- `generators` - For generator functions
- `ordering` - For comparison functions

## Implementation Patterns

The implementation pattern defines interfaces for common operations that can be implemented by multiple types. This pattern is used when:

- A consistent API is needed across different data structures
- Operations should be standardized but implementations vary

### Example

```ts
// Interface definitions in SerdeImpl.ts
export interface FromBytes<T, E = never> {
  (bytes: Uint8Array): Effect.Effect<T, E, never>;
}

export interface ToBytes<T> {
  (value: T): Uint8Array;
}

// Implementation for KeyHash
export const fromBytes: SerdeImpl.FromBytes<KeyHash, KeyHashError> =
  Effect.fnUntraced(function* (bytes) {
    if (bytes.length !== KEYHASH_BYTES_LENGTH) {
      return yield* new KeyHashError({
        message: `KeyHash must be ${KEYHASH_BYTES_LENGTH} bytes long, got: ${bytes.length}.`,
      });
    }
    const hash = Bytes.toHexOrThrow(bytes);
    return new KeyHash({ hash }, { disableValidation: true });
  });

export const toBytes: SerdeImpl.ToBytes<KeyHash> = (keyHash) =>
  Bytes.fromHexOrThrow(keyHash.hash);

// Implementation for PublicKey
export const fromBytes: SerdeImpl.FromBytes<PublicKey, PublicKeyError> =
  Effect.fnUntraced(function* (bytes) {
    // PublicKey-specific implementation
  });

// Generic function using the interfaces
const deserialize = <T, E>(
  bytes: Uint8Array,
  fromBytes: SerdeImpl.FromBytes<T, E>,
): Effect.Effect<T, E> => fromBytes(bytes);
```

## Dependencies

### Peer Dependency Usage

Use peer dependencies for shared libraries to prevent bundling conflicts and provide flexibility.

### Semantic Versioning

Follow `major.minor.patch` versioning to clearly communicate changes and prevent breaking changes.
