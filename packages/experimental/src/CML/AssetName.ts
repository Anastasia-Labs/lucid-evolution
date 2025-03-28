import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type AssetName = CML.AssetName;

export class AssetNameError extends Data.TaggedError("AssetNameError")<{
  message?: string;
}> {}

/**
 * Method free of AssetName
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AssetName instance
 * const instance = ... ;
 *   const result = yield* AssetName.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.AssetName): Effect.Effect<void, AssetNameError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AssetName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AssetName.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetName.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.AssetName): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of AssetName
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AssetName instance
 * const instance = ... ;
 *   const result = yield* AssetName.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.AssetName): Effect.Effect<Uint8Array, AssetNameError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.toCborBytes failed AssetName is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AssetName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AssetName.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetName.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.AssetName): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of AssetName
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AssetName instance
 * const instance = ... ;
 *   const result = yield* AssetName.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.AssetName): Effect.Effect<Uint8Array, AssetNameError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.toCanonicalCborBytes failed AssetName is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AssetName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AssetName.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetName.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.AssetName): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of AssetName
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AssetName.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.AssetName.from_cbor_bytes(cborBytes),
    catch: () => new AssetNameError({
      message: `AssetName.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls AssetName.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AssetName.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetName.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of AssetName
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AssetName instance
 * const instance = ... ;
 *   const result = yield* AssetName.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.AssetName): Effect.Effect<string, AssetNameError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.toCborHex failed AssetName is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AssetName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AssetName.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetName.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.AssetName): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of AssetName
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AssetName instance
 * const instance = ... ;
 *   const result = yield* AssetName.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.AssetName): Effect.Effect<string, AssetNameError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.toCanonicalCborHex failed AssetName is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AssetName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AssetName.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetName.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.AssetName): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of AssetName
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AssetName.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.AssetName.from_cbor_hex(cborBytes),
    catch: () => new AssetNameError({
      message: `AssetName.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls AssetName.fromCborHex without Effect wrapper
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AssetName.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetName.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of AssetName
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AssetName instance
 * const instance = ... ;
 *   const result = yield* AssetName.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.AssetName): Effect.Effect<string, AssetNameError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.toJson failed AssetName is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AssetName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AssetName.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetName.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.AssetName): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of AssetName
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AssetName instance
 * const instance = ... ;
 *   const result = yield* AssetName.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.AssetName): Effect.Effect<any, AssetNameError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.toJsValue failed AssetName is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AssetName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AssetName.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetName.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.AssetName): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of AssetName
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AssetName.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.AssetName.from_json(json),
    catch: () => new AssetNameError({
      message: `AssetName.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls AssetName.fromJson without Effect wrapper
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AssetName.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetName.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Static method fromStr of AssetName
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AssetName.fromStr( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromStr = Effect.fn(function* (utf8Str: string) {
  return yield* Effect.try({
    try: () => CML.AssetName.from_str(utf8Str),
    catch: () => new AssetNameError({
      message: `AssetName.fromStr failed with parameters: ${utf8Str}. Hint: Not all AssetName instances can be stringified.`,
    }),
  });
});

/**
 * Unsafely calls AssetName.fromStr without Effect wrapper
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AssetName.unsafeFromStr( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetName.unsafeFromStr failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromStr = (utf8Str: string) =>
  Effect.runSync(fromStr(utf8Str));

/**
 * Method toStr of AssetName
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AssetName instance
 * const instance = ... ;
 *   const result = yield* AssetName.toStr(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toStr = Effect.fn(
  (instance: CML.AssetName): Effect.Effect<string, AssetNameError> =>
    Effect.try({
      try: () => instance.to_str(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.toStr failed AssetName is not valid for string conversion. Hint: Not all AssetName instances can be stringified.`,
        }),
    })
);

/**
 * Unsafely calls instance.toStr without Effect wrapper
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AssetName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AssetName.unsafeToStr(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetName.unsafeToStr failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToStr = (instance: CML.AssetName): string =>
  Effect.runSync(toStr(instance));

/**
 * Method toRawBytes of AssetName
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AssetName instance
 * const instance = ... ;
 *   const result = yield* AssetName.toRawBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.AssetName): Effect.Effect<Uint8Array, AssetNameError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.toRawBytes failed AssetName is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AssetName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AssetName.unsafeToRawBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetName.unsafeToRawBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToRawBytes = (instance: CML.AssetName): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of AssetName
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AssetName.fromRawBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.AssetName.from_raw_bytes(bytes),
    catch: () => new AssetNameError({
      message: `AssetName.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls AssetName.fromRawBytes without Effect wrapper
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AssetName.unsafeFromRawBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetName.unsafeFromRawBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromRawBytes = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of AssetName
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AssetName instance
 * const instance = ... ;
 *   const result = yield* AssetName.toHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.AssetName): Effect.Effect<string, AssetNameError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.toHex failed AssetName is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    })
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AssetName instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AssetName.unsafeToHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetName.unsafeToHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToHex = (instance: CML.AssetName): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of AssetName
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AssetName.fromHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.AssetName.from_hex(input),
    catch: () => new AssetNameError({
      message: `AssetName.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
    }),
  });
});

/**
 * Unsafely calls AssetName.fromHex without Effect wrapper
 * 
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AssetName.unsafeFromHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetName.unsafeFromHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromHex = (input: string) =>
  Effect.runSync(fromHex(input));
