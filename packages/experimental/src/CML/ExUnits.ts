import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ExUnits = CML.ExUnits;

export class ExUnitsError extends Data.TaggedError("ExUnitsError")<{
  message?: string;
}> {}

/**
 * Method free of ExUnits
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *   const result = yield* ExUnits.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ExUnits): Effect.Effect<void, ExUnitsError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnits.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnits.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.ExUnits): void =>
  Effect.runSync(free(instance));

/**
 * Method checkedAdd of ExUnits
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *   const result = yield* ExUnits.checkedAdd(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const checkedAdd = Effect.fn(
  (
    instance: CML.ExUnits,
    other: CML.ExUnits,
  ): Effect.Effect<CML.ExUnits, ExUnitsError> =>
    Effect.try({
      try: () => instance.checked_add(other),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.checkedAdd failed with parameters: ${other} (ExUnits). `,
        }),
    }),
);

/**
 * Unsafely calls instance.checkedAdd without Effect wrapper
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnits.unsafeCheckedAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnits.unsafeCheckedAdd failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCheckedAdd = (
  instance: CML.ExUnits,
  other: CML.ExUnits,
): CML.ExUnits => Effect.runSync(checkedAdd(instance, other));

/**
 * Method toCborBytes of ExUnits
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *   const result = yield* ExUnits.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.ExUnits): Effect.Effect<Uint8Array, ExUnitsError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.toCborBytes failed ExUnits is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnits.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnits.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.ExUnits): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ExUnits
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *   const result = yield* ExUnits.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.ExUnits): Effect.Effect<Uint8Array, ExUnitsError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.toCanonicalCborBytes failed ExUnits is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnits.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnits.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.ExUnits): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ExUnits
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ExUnits.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ExUnits.from_cbor_bytes(cborBytes),
    catch: () =>
      new ExUnitsError({
        message: `ExUnits.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls ExUnits.fromCborBytes without Effect wrapper
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnits.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnits.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ExUnits
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *   const result = yield* ExUnits.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.ExUnits): Effect.Effect<string, ExUnitsError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.toCborHex failed ExUnits is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnits.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnits.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.ExUnits): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ExUnits
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *   const result = yield* ExUnits.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.ExUnits): Effect.Effect<string, ExUnitsError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.toCanonicalCborHex failed ExUnits is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnits.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnits.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.ExUnits): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ExUnits
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ExUnits.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ExUnits.from_cbor_hex(cborBytes),
    catch: () =>
      new ExUnitsError({
        message: `ExUnits.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls ExUnits.fromCborHex without Effect wrapper
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnits.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnits.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ExUnits
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *   const result = yield* ExUnits.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.ExUnits): Effect.Effect<string, ExUnitsError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.toJson failed ExUnits is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnits.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnits.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.ExUnits): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ExUnits
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *   const result = yield* ExUnits.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.ExUnits): Effect.Effect<any, ExUnitsError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.toJsValue failed ExUnits is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnits.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnits.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.ExUnits): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ExUnits
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ExUnits.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ExUnits.from_json(json),
    catch: () =>
      new ExUnitsError({
        message: `ExUnits.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls ExUnits.fromJson without Effect wrapper
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnits.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnits.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method mem of ExUnits
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *   const result = yield* ExUnits.mem(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const mem = Effect.fn(
  (instance: CML.ExUnits): Effect.Effect<bigint, ExUnitsError> =>
    Effect.try({
      try: () => instance.mem(),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.mem failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.mem without Effect wrapper
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnits.unsafeMem(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnits.unsafeMem failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMem = (instance: CML.ExUnits): bigint =>
  Effect.runSync(mem(instance));

/**
 * Method steps of ExUnits
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *   const result = yield* ExUnits.steps(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const steps = Effect.fn(
  (instance: CML.ExUnits): Effect.Effect<bigint, ExUnitsError> =>
    Effect.try({
      try: () => instance.steps(),
      catch: () =>
        new ExUnitsError({
          message: `ExUnits.steps failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.steps without Effect wrapper
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnits instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnits.unsafeSteps(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnits.unsafeSteps failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSteps = (instance: CML.ExUnits): bigint =>
  Effect.runSync(steps(instance));

/**
 * Static method _new of ExUnits
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ExUnits._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (mem: bigint, steps: bigint) {
  return yield* Effect.try({
    try: () => CML.ExUnits.new(mem, steps),
    catch: () =>
      new ExUnitsError({
        message: `ExUnits._new failed with parameters: ${mem}, ${steps}. `,
      }),
  });
});

/**
 * Unsafely calls ExUnits._new without Effect wrapper
 *
 * @example
 * import { ExUnits } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnits.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnits.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (mem: bigint, steps: bigint) =>
  Effect.runSync(_new(mem, steps));
