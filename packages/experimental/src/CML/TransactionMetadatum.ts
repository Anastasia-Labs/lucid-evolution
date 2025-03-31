/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionMetadatum class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionMetadatum = CML.TransactionMetadatum;

/**
 * Error class for TransactionMetadatum operations
 * 
 * This error is thrown when operations on TransactionMetadatum instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionMetadatumError extends Data.TaggedError("TransactionMetadatumError")<{
  message?: string;
}> {}

/**
 * Method free of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<void, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionMetadatum): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<Uint8Array, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.toCborBytes failed TransactionMetadatum is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.TransactionMetadatum): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionMetadatum.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.TransactionMetadatum.from_cbor_bytes(cborBytes),
    catch: () => new TransactionMetadatumError({
      message: `TransactionMetadatum.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls TransactionMetadatum.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toJson of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<string, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.toJson failed TransactionMetadatum is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.TransactionMetadatum): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsonValue of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.toJsonValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsonValue = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<any, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.to_json_value(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.toJsonValue failed TransactionMetadatum is not valid for any conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJsonValue without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.toJsonValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.toJsonValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonValueUnsafe = (instance: CML.TransactionMetadatum): any =>
  Effect.runSync(toJsonValue(instance));

/**
 * Static method fromJson of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionMetadatum.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.TransactionMetadatum.from_json(json),
    catch: () => new TransactionMetadatumError({
      message: `TransactionMetadatum.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls TransactionMetadatum.fromJson without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Static method newMap of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionMetadatum.newMap( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newMap = Effect.fn(function* (map: CML.MetadatumMap) {
  return yield* Effect.try({
    try: () => CML.TransactionMetadatum.new_map(map),
    catch: () => new TransactionMetadatumError({
      message: `TransactionMetadatum.newMap failed with parameters: ${map} (MetadatumMap). `,
    }),
  });
});

/**
 * Unsafely calls TransactionMetadatum.newMap without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.newMapUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.newMapUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newMapUnsafe = (map: CML.MetadatumMap) =>
  Effect.runSync(newMap(map));

/**
 * Static method newList of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionMetadatum.newList( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newList = Effect.fn(function* (elements: CML.MetadatumList) {
  return yield* Effect.try({
    try: () => CML.TransactionMetadatum.new_list(elements),
    catch: () => new TransactionMetadatumError({
      message: `TransactionMetadatum.newList failed with parameters: ${elements} (MetadatumList). `,
    }),
  });
});

/**
 * Unsafely calls TransactionMetadatum.newList without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.newListUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.newListUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newListUnsafe = (elements: CML.MetadatumList) =>
  Effect.runSync(newList(elements));

/**
 * Static method newInt of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionMetadatum.newInt( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newInt = Effect.fn(function* (int: CML.Int) {
  return yield* Effect.try({
    try: () => CML.TransactionMetadatum.new_int(int),
    catch: () => new TransactionMetadatumError({
      message: `TransactionMetadatum.newInt failed with parameters: ${int} (Int). `,
    }),
  });
});

/**
 * Unsafely calls TransactionMetadatum.newInt without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.newIntUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.newIntUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newIntUnsafe = (int: CML.Int) =>
  Effect.runSync(newInt(int));

/**
 * Static method newBytes of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionMetadatum.newBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.TransactionMetadatum.new_bytes(bytes),
    catch: () => new TransactionMetadatumError({
      message: `TransactionMetadatum.newBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls TransactionMetadatum.newBytes without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.newBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.newBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newBytesUnsafe = (bytes: Uint8Array) =>
  Effect.runSync(newBytes(bytes));

/**
 * Static method newText of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionMetadatum.newText( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newText = Effect.fn(function* (text: string) {
  return yield* Effect.try({
    try: () => CML.TransactionMetadatum.new_text(text),
    catch: () => new TransactionMetadatumError({
      message: `TransactionMetadatum.newText failed with parameters: ${text}. `,
    }),
  });
});

/**
 * Unsafely calls TransactionMetadatum.newText without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.newTextUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.newTextUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newTextUnsafe = (text: string) =>
  Effect.runSync(newText(text));

/**
 * Method kind of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.kind(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<CML.TransactionMetadatumKind, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.kind failed `,
        }),
    })
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.kindUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.kindUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.TransactionMetadatum): CML.TransactionMetadatumKind =>
  Effect.runSync(kind(instance));

/**
 * Method asMap of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.asMap(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asMap = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<CML.MetadatumMap | undefined, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.as_map(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.asMap failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asMap without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.asMapUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.asMapUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asMapUnsafe = (instance: CML.TransactionMetadatum): CML.MetadatumMap | undefined =>
  Effect.runSync(asMap(instance));

/**
 * Method asList of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.asList(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asList = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<CML.MetadatumList | undefined, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.as_list(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.asList failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asList without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.asListUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.asListUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asListUnsafe = (instance: CML.TransactionMetadatum): CML.MetadatumList | undefined =>
  Effect.runSync(asList(instance));

/**
 * Method asInt of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.asInt(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asInt = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<CML.Int | undefined, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.as_int(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.asInt failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asInt without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.asIntUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.asIntUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asIntUnsafe = (instance: CML.TransactionMetadatum): CML.Int | undefined =>
  Effect.runSync(asInt(instance));

/**
 * Method asBytes of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.asBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asBytes = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<Uint8Array | undefined, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.as_bytes(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.asBytes failed Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.asBytes without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.asBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.asBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asBytesUnsafe = (instance: CML.TransactionMetadatum): Uint8Array | undefined =>
  Effect.runSync(asBytes(instance));

/**
 * Method asText of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.asText(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asText = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<string | undefined, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.as_text(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.asText failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asText without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.asTextUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.asTextUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asTextUnsafe = (instance: CML.TransactionMetadatum): string | undefined =>
  Effect.runSync(asText(instance));
