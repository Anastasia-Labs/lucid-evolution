/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML DatumOption class
 *
 * @since 2.0.0
 * @category Types
 */
export type DatumOption = CML.DatumOption;

/**
 * Error class for DatumOption operations
 * 
 * This error is thrown when operations on DatumOption instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class DatumOptionError extends Data.TaggedError("DatumOptionError")<{
  message?: string;
}> {}

/**
 * Method free of DatumOption
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 *   const result = yield* DatumOption.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.DatumOption): Effect.Effect<void, DatumOptionError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DatumOption.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumOption.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.DatumOption): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of DatumOption
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 *   const result = yield* DatumOption.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.DatumOption): Effect.Effect<Uint8Array, DatumOptionError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.toCborBytes failed DatumOption is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DatumOption.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumOption.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.DatumOption): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of DatumOption
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 *   const result = yield* DatumOption.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.DatumOption): Effect.Effect<Uint8Array, DatumOptionError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.toCanonicalCborBytes failed DatumOption is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DatumOption.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumOption.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.DatumOption): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of DatumOption
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* DatumOption.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.DatumOption.from_cbor_bytes(cborBytes),
    catch: () => new DatumOptionError({
      message: `DatumOption.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls DatumOption.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DatumOption.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumOption.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of DatumOption
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 *   const result = yield* DatumOption.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.DatumOption): Effect.Effect<string, DatumOptionError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.toCborHex failed DatumOption is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DatumOption.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumOption.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.DatumOption): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of DatumOption
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 *   const result = yield* DatumOption.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.DatumOption): Effect.Effect<string, DatumOptionError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.toCanonicalCborHex failed DatumOption is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DatumOption.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumOption.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.DatumOption): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of DatumOption
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* DatumOption.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.DatumOption.from_cbor_hex(cborBytes),
    catch: () => new DatumOptionError({
      message: `DatumOption.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls DatumOption.fromCborHex without Effect wrapper
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DatumOption.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumOption.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of DatumOption
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 *   const result = yield* DatumOption.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.DatumOption): Effect.Effect<string, DatumOptionError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.toJson failed DatumOption is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DatumOption.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumOption.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.DatumOption): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of DatumOption
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 *   const result = yield* DatumOption.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.DatumOption): Effect.Effect<any, DatumOptionError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.toJsValue failed DatumOption is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DatumOption.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumOption.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.DatumOption): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of DatumOption
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* DatumOption.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.DatumOption.from_json(json),
    catch: () => new DatumOptionError({
      message: `DatumOption.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls DatumOption.fromJson without Effect wrapper
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DatumOption.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumOption.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Static method newHash of DatumOption
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* DatumOption.newHash( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newHash = Effect.fn(function* (datumHash: CML.DatumHash) {
  return yield* Effect.try({
    try: () => CML.DatumOption.new_hash(datumHash),
    catch: () => new DatumOptionError({
      message: `DatumOption.newHash failed with parameters: ${datumHash} (DatumHash). `,
    }),
  });
});

/**
 * Unsafely calls DatumOption.newHash without Effect wrapper
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DatumOption.newHashUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumOption.newHashUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newHashUnsafe = (datumHash: CML.DatumHash) =>
  Effect.runSync(newHash(datumHash));

/**
 * Static method newDatum of DatumOption
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* DatumOption.newDatum( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newDatum = Effect.fn(function* (datum: CML.PlutusData) {
  return yield* Effect.try({
    try: () => CML.DatumOption.new_datum(datum),
    catch: () => new DatumOptionError({
      message: `DatumOption.newDatum failed with parameters: ${datum} (PlutusData). `,
    }),
  });
});

/**
 * Unsafely calls DatumOption.newDatum without Effect wrapper
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DatumOption.newDatumUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumOption.newDatumUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newDatumUnsafe = (datum: CML.PlutusData) =>
  Effect.runSync(newDatum(datum));

/**
 * Method kind of DatumOption
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 *   const result = yield* DatumOption.kind(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (instance: CML.DatumOption): Effect.Effect<CML.DatumOptionKind, DatumOptionError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.kind failed `,
        }),
    })
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DatumOption.kindUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumOption.kindUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.DatumOption): CML.DatumOptionKind =>
  Effect.runSync(kind(instance));

/**
 * Method asHash of DatumOption
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 *   const result = yield* DatumOption.asHash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asHash = Effect.fn(
  (instance: CML.DatumOption): Effect.Effect<CML.DatumHash | undefined, DatumOptionError> =>
    Effect.try({
      try: () => instance.as_hash(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.asHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asHash without Effect wrapper
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DatumOption.asHashUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumOption.asHashUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asHashUnsafe = (instance: CML.DatumOption): CML.DatumHash | undefined =>
  Effect.runSync(asHash(instance));

/**
 * Method asDatum of DatumOption
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 *   const result = yield* DatumOption.asDatum(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asDatum = Effect.fn(
  (instance: CML.DatumOption): Effect.Effect<CML.PlutusData | undefined, DatumOptionError> =>
    Effect.try({
      try: () => instance.as_datum(),
      catch: () =>
        new DatumOptionError({
          message: `DatumOption.asDatum failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asDatum without Effect wrapper
 * 
 * @example
 * import { DatumOption } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a DatumOption instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = DatumOption.asDatumUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumOption.asDatumUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asDatumUnsafe = (instance: CML.DatumOption): CML.PlutusData | undefined =>
  Effect.runSync(asDatum(instance));
