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
    - [🚨 CRITICAL EFFECT PATTERNS 🚨](#-critical-effect-patterns-)
      - [ABSOLUTELY FORBIDDEN: try-catch in Effect.gen](#absolutely-forbidden-try-catch-in-effectgen)
      - [MANDATORY: Return Yield Pattern for Errors](#mandatory-return-yield-pattern-for-errors)
    - [Use const keyword over function keyword](#use-const-keyword-over-function-keyword)
    - [Pattern Matching](#pattern-matching)
    - [ABSOLUTELY FORBIDDEN: Type Assertions](#absolutely-forbidden-type-assertions)
    - [ABSOLUTELY FORBIDDEN: any type](#absolutely-forbidden-any-type)
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
    - [Union Types](#union-types)
  - [Function Structure](#function-structure)
    - [Effect-based Functions](#effect-based-functions)
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
    - [Bidirectional Transformations](#bidirectional-transformations)
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

Inside `Calculator.ts`, you define Effect-based functions:

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
```

Usage patterns:

```ts
// For Effect-based functions
import { divide } from "my-package/Calculator";
divide(1, 0);
// For module import
import { Calculator } from "my-package";
Calculator.divide(1, 0);
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

- `is*` - Predicate functions that return boolean values (isEmpty)

## Coding Practices

### 🚨 CRITICAL EFFECT PATTERNS 🚨

#### ABSOLUTELY FORBIDDEN: try-catch in Effect.gen

NEVER use `try-catch` blocks inside `Effect.gen` generators!

- Effect generators handle errors through the Effect type system, not JavaScript exceptions
- Use `Effect.tryPromise`, `Effect.try`, or proper Effect error handling instead
- CRITICAL: This will cause runtime errors and break Effect's error handling

```ts
// ❌ FORBIDDEN - Never do this in Effect.gen
Effect.gen(function* () {
  try {
    const result = yield* someEffect;
  } catch (error) {
    // This will never be reached and breaks Effect semantics
  }
});

// ✅ CORRECT - Use Effect's built-in error handling
Effect.gen(function* () {
  const result = yield* Effect.result(someEffect);
  if (result._tag === "Failure") {
    // Handle error case properly
  }
});
```

#### MANDATORY: Return Yield Pattern for Errors

ALWAYS use `return yield*` when yielding errors or interrupts in Effect.gen!

- When yielding `Effect.fail`, `Effect.interrupt`, or other terminal effects, always use `return yield*`
- This makes it clear that the generator function terminates at that point

```ts
// ✅ CORRECT - Always use return yield* for errors
Effect.gen(function* () {
  if (someCondition) {
    return yield* Effect.fail(new KeyHashError({ message: "error" }));
  }

  if (shouldInterrupt) {
    return yield* Effect.interrupt;
  }

  // Continue with normal flow...
  const result = yield* someOtherEffect;
  return result;
});

// ❌ WRONG - Missing return keyword
Effect.gen(function* () {
  if (someCondition) {
    yield* Effect.fail("error message"); // Unreachable code after error!
  }
});
```

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

### ABSOLUTELY FORBIDDEN: Type Assertions

NEVER use `as never`, `as any`, or `as unknown` type assertions!

- These break TypeScript's type safety and hide real type errors
- Always fix the underlying type issues instead of masking them

```ts
// ❌ FORBIDDEN - Never do any of these
const value = something as any;
const value = something as never;
const value = something as unknown;
```

**CORRECT APPROACH:** Fix the actual type mismatch by:

- Using proper generic type parameters
- Importing correct types
- Using proper Effect constructors and combinators
- Adjusting function signatures to match usage
- Use `satisfies` operator when you need to ensure an object conforms to a specific type

### ABSOLUTELY FORBIDDEN: any type

NEVER use `any` type as it defeats the purpose of TypeScript's type system!

- Use `unknown` instead of `any` to enforce type checking
- Use `unknown` when you need to accept any type but still want to enforce type checking later
- Always fix the underlying type issues instead of using `any`

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

1. Create constants for validation constraints
2. Define schemas using these constants
3. Define classes using Schema.TaggedClass

See the detailed examples in the Class-based Constructors section below.

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
```

### Constructors

#### Class-based Constructors

- Use `Schema.TaggedClass` for defining type-safe classes that serve as both types and runtime validators
- Class constructors automatically validate input parameters against their schema definition
- Class names should be PascalCase and match their schema name

```ts
import { Schema, Data } from "effect";
import * as HeaderBody from "./HeaderBody.js";
import * as KesSignature from "./KesSignature.js";

/**
 * Error class for Header operations
 *
 * @since 2.0.0
 * @category errors
 */
export class HeaderError extends Data.TaggedError("HeaderError")<{
  message?: string;
  cause?: unknown;
}> {}

/**
 * Header implementation using HeaderBody and KesSignature
 *
 * CDDL: header = [header_body, body_signature : kes_signature]
 *
 * @since 2.0.0
 * @category model
 */
export class Header extends Schema.TaggedClass<Header>()("Header", {
  headerBody: HeaderBody.HeaderBody,
  bodySignature: KesSignature.KesSignature,
}) {}

// Usage:
// Creating an instance will automatically validate the input against the schema
const header = new Header({
  headerBody: new HeaderBody.HeaderBody({
    /* ... */
  }),
  bodySignature: KesSignature.KesSignature.make("valid_kes_signature..."),
}); // Valid - creates instance

// This will throw a validation error if the input doesn't match the schema
const invalid = new Header({
  headerBody: "invalid", // Error - not a HeaderBody instance
  bodySignature: "invalid", // Error - not a KesSignature instance
});
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
export const getNetworkId = (address: Address): number => {
  switch (address._tag) {
    case "BaseAddress":
      return BaseAddress.getNetworkId(address);
    case "EnterpriseAddress":
      return EnterpriseAddress.getNetworkId(address);
    // other cases
  }
};
```

## Function Structure

### Effect-based Functions

Provide Effect-based functions for operations that may fail:

```ts
// Effect-based version that returns errors in the Effect channel
export const operation = (input: InputType): Effect.Effect<Result, ErrorType> =>
  Effect.fnUntraced(function* (input) {
    // implementation that yields errors
  });
```

## Error Handling

### Standardized Error Classes

**MANDATORY: Use TaggedError Pattern for All Error Classes**

All error classes MUST follow the standardized `Data.TaggedError` pattern with consistent property structure:

```ts
// ✅ CORRECT - Standardized error class pattern
export class KeyHashError extends Data.TaggedError("KeyHashError")<{
  message?: string;
  cause?: unknown;
}> {}

export class PolicyIdError extends Data.TaggedError("PolicyIdError")<{
  message?: string;
  cause?: unknown;
}> {}
```

**Required Properties:**

- `message?: string` - Optional human-readable error description
- `cause?: unknown` - Optional underlying error or exception that caused this error

**Rationale**: This pattern ensures:

- **Consistency** across all error types in the codebase
- **Interoperability** with Effect-TS error handling patterns
- **Debuggability** through consistent cause chaining
- **Type Safety** with proper discriminated union support

```ts
// ❌ FORBIDDEN - Custom error structures
export class CustomError extends Data.TaggedError("CustomError")<{
  reason: string; // Don't use 'reason' instead of 'message'
  details: object; // Don't use custom property names
}> {}

// ❌ FORBIDDEN - Missing cause property
export class IncompleteError extends Data.TaggedError("IncompleteError")<{
  message?: string;
  // Missing cause?: unknown
}> {}
```

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

### Example Code Standards

**MANDATORY: Use Codec Utility Functions in Examples**

All JSDoc examples and documentation code snippets MUST use the `Codec` utility functions instead of direct `Schema.encode`/`Schema.decode` operations:

- ✅ **CORRECT**: Use `Codec.Encode.bytes()`, `Codec.Decode.hex()`, etc.
- ❌ **FORBIDDEN**: Direct `Schema.encodeSync()`, `Schema.decodeUnknownSync()`, etc.

**Rationale**: The `Codec` utilities provide consistent error mapping to custom error types and standardized API patterns across all modules.

```ts
// ✅ CORRECT - Use Codec utilities in examples
/**
 * @example
 * import { KeyHash } from "@evolution-sdk/experimental";
 *
 * const bytes = new Uint8Array(28);
 * const keyHash = KeyHash.Codec.Decode.bytes(bytes);
 * const hexString = KeyHash.Codec.Encode.hex(keyHash);
 */

// ❌ FORBIDDEN - Never use direct Schema operations in examples
/**
 * @example
 * import { KeyHash, Schema } from "@evolution-sdk/experimental";
 *
 * const keyHash = Schema.decodeUnknownSync(KeyHash.BytesSchema)(bytes); // DON'T DO THIS
 */
```

## Implementation Patterns

The implementation pattern defines common operations using Schema-based transformations and encoding/decoding utilities. This pattern provides:

- A consistent API across different data structures
- Standardized serialization and deserialization
- Type-safe encoding/decoding operations
- Bidirectional transformations that can be composed with encoding and decoding combinators

### Bidirectional Transformations

The key benefit of `Schema.compose` and `Schema.transform` is that they define bidirectional transformations between types. Once you define transformation schemas, you can compose them with various encoding and decoding combinators to create utilities for different use cases. This approach ensures consistency and reduces code duplication.

### Example

```ts
// Define the core branded type
export const KeyHash = Hash28.HexSchema.pipe(
  Schema.brand("KeyHash"),
).annotations({
  identifier: "KeyHash",
});

export type KeyHash = typeof KeyHash.Type;

// Define transformation schemas for different input formats
// These schemas establish bidirectional mappings between raw data and typed objects
export const BytesSchema = Schema.compose(
  Hash28.BytesHexTransformer, // Uint8Array -> hex string
  KeyHash, // hex string -> KeyHash
).annotations({
  identifier: "KeyHash.Bytes",
});

export const HexSchema = Schema.compose(
  Hash28.HexSchema, // string -> hex string
  KeyHash, // hex string -> KeyHash
).annotations({
  identifier: "KeyHash.Hex",
});

// Create comprehensive codec utilities with custom error mapping
// Uses createEncoders function to generate all encoding/decoding variants
export const Codec = createEncoders(
  {
    bytes: BytesSchema,
    hex: HexSchema,
  },
  KeyHashError,
);

// This automatically generates:
// - Synchronous utilities (throw custom error on failure)
export const Encode = Codec.Encode; // { bytes: (KeyHash) => Uint8Array, hex: (KeyHash) => string }
export const Decode = Codec.Decode; // { bytes: (unknown) => KeyHash, hex: (unknown) => KeyHash }

// - Effect-based utilities (return Effect with custom error)
export const EncodeEffect = Codec.EncodeEffect; // { bytes: (KeyHash) => Effect<Uint8Array, KeyHashError> }
export const DecodeEffect = Codec.DecodeEffect; // { hex: (unknown) => Effect<KeyHash, KeyHashError> }

// - Either-based utilities (return Either with custom error)
export const EncodeEither = Codec.EncodeEither; // { bytes: (KeyHash) => Either<Uint8Array, KeyHashError> }
export const DecodeEither = Codec.DecodeEither; // { hex: (unknown) => Either<KeyHash, KeyHashError> }
```

**Key advantages of this pattern:**

1. **Consistent Error Handling**: All encoding/decoding operations map to the same custom error type
2. **Multiple Operation Modes**: Synchronous (throws), Effect-based, and Either-based variants
3. **Type Safety**: Full TypeScript inference across all generated utilities
4. **Reusable Pattern**: The `createEncoders` function can be used across all modules
5. **Bidirectional Schemas**: `Schema.compose` creates reversible transformations
6. **Custom Error Context**: Errors include descriptive messages and original cause

## Dependencies

### Peer Dependency Usage

Use peer dependencies for shared libraries to prevent bundling conflicts and provide flexibility.

### Semantic Versioning

Follow `major.minor.patch` versioning to clearly communicate changes and prevent breaking changes.
