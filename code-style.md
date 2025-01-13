# Code Style Guide

- Each package should have a single, well-defined responsibility to ensure clarity and maintainability.
- Common logic, utilities, and types should be isolated in dedicated shared packages for reuse.
- Functionality tied to a specific platform or library should be isolated in its own package.

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

## Support ESM Modern typescript convention, CJS for legacy and minimum support

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

A basic `package.json` should look like the following

```json
{
  "name": "@your-entity/your-package-name",
  "version": "0.0.0",
  "description": "",
  "main": "./dist/esm/index.js",
  "types": "./dist/types/index.d.ts",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/types/index.d.ts",
      "require": "./dist/cjs/index.js",
      "import": "./dist/esm/index.js"
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

## Naming Conventions

- Variables: camelCase
- Functions: camelCase
- Classes: PascalCase
- Modules: PascalCase
- Files: PascalCase
- Constants: UPPER_SNAKE_CASE
- Private members: \_prefixedCamelCase
- Do not use I as a prefix for interface names.

## null vs undefined

- Use undefined. Do not use null.

## Class vs Functions

- Do not use classes, use function closures instead.

## Type Annotations

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

## Use const keyword over function keyword

### Example

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

Reasoning:

- `const` declarations are block-scoped
- Prevents accidental reassignment
- Consistent with modern JavaScript practices

## Prefer ternary operator over if-else when possible

### Example:

```typescript
// Instead of using if-else:
const getResult = (condition: boolean): string => {
  if (condition) {
    return "value1";
  } else {
    return "value2";
  }
};

// Use ternary operator:
const getResult = (condition: boolean): string =>
  condition ? "value1" : "value2";
```

## Flags

More than 2 related Boolean properties on a type should be turned into an union type flag.

### Example

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

## Peer Dependency Usage

Use peer dependencies for shared libraries to prevent bundling conflicts and provide flexibility.

## Semantic Versioning

Follow `major.minor.patch` versioning to clearly communicate changes and prevent breaking changes.

## Code Structure

- The code structure should follow the principles of modularity, reusability, and ease of testing.
- Modules should be organized by functionality and purpose.
- Module types should be defined at the top of the file.
- Package names should describe their purpose and scope clearly

### Example Structure

```
packages/
  my-package/
      Calculator.ts
      index.ts
```

### Example Code

Inside `Calculator.ts`, you define Effect-based functions and functions known to be safe:

```ts
import { Effect } from "effect";

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

Inside `Calculator.ts`, you define unsafe functions adding the `unsafe` prefix:

```ts
// Divide two numbers without using Effect, with error handling for division by zero
export const unsafeDivide = (self: number, that: number): number =>
  Effect.runSync(divide(self, that));
```

```ts
// For Effect-based functions
import { divide } from "my-package/Calculator";
divide(1, 0);
// For unsafe functions
import { unsafeDivide } from "my-package/Calculator";
unsafeDivide(1, 0);
// For module import
import { Calculator } from "my-package";
Calculator.divide(1, 0);
Calculator.unsafeDivide(1, 0);
```

## Pattern Matching
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
      throw new Error(`Exhaustive check failed: Unhandled case '${network}' encountered.`);
  }
};
```

## Code Formatting

Formatting is handled by Prettier CLI.

## Function Comments

Comments should be the foundation of library documentation.
Each function must contain the following:

1. A concise description of the function's purpose
2. An example of function usage with @example tag. The example must include the import statement
3. The version when the function was introduced using @since tag

```ts
/**
 * Sums two numbers
 *
 * @example
 * import { sum } from "my-package/Calculator";
 * sum(1, 2) // 3
 * 
 * @since 1.0.0
 */
export const sum = (self: number, that: number): number => self + that;
```

## Testing Requirements

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

## Error Handling

### Error Messages

- Provide clear error messages (`message` field)
- Consider adding helpful context:
  - Input values that caused the error
  - Potential solutions or remediation steps

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
          message: `Cannot parse input ${input}. Check if the input is valid JSON.`,
          cause: unknown,
        }),
      ),
  });
```

### Generic vs Specific Errors

- Use generic error types (like `CalculatorError`) as the default approach. Generic errors provide more flexibility and reduce code complexity
- Only create specific error types (like `DivideByZeroError`) when strictly necessary
- Keep error types consistent within a domain
- Prefer using generic error types like `CalculatorError` over specific ones like `DivideByZeroError`

```ts
import { Data, Effect } from "effect";

class CalculatorError extends Data.TaggedError("CalculatorError")<{
  message?: string;
}> {}

const divide = (
  a: number,
  b: number,
): Effect.Effect<number, CalculatorError, never> =>
  b === 0
    ? Effect.fail(
        new CalculatorError({
          message: `Cannot divide ${a} by zero`,
        }),
      )
    : Effect.succeed(a / b);

Effect.runSync(divide(1, 0));
```

```ts
import { Data, Effect } from "effect";

class DivideByZeroError extends Data.TaggedError("DivideByZeroError")<{
  message: string;
}> {}

const divide = (
  a: number,
  b: number,
): Effect.Effect<number, DivideByZeroError, never> =>
  b === 0
    ? Effect.fail(
        new DivideByZeroError({
          message: `Cannot divide ${a} by zero`,
        }),
      )
    : Effect.succeed(a / b);
Effect.runSync(divide(1, 0));
```
