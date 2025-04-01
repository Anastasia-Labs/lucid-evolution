/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ConwayFormatTxOut class
 *
 * @since 2.0.0
 * @category Types
 */
export type ConwayFormatTxOut = CML.ConwayFormatTxOut;

/**
 * Error class for ConwayFormatTxOut operations
 *
 * This error is thrown when operations on ConwayFormatTxOut instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ConwayFormatTxOutError extends Data.TaggedError(
  "ConwayFormatTxOutError",
)<{
  message?: string;
}> {}

/**
 * Method free of ConwayFormatTxOut
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatTxOut.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.ConwayFormatTxOut,
  ): Effect.Effect<void, ConwayFormatTxOutError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ConwayFormatTxOutError({
          message: `ConwayFormatTxOut.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatTxOut.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatTxOut.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ConwayFormatTxOut): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ConwayFormatTxOut
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatTxOut.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.ConwayFormatTxOut,
  ): Effect.Effect<Uint8Array, ConwayFormatTxOutError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ConwayFormatTxOutError({
          message: `ConwayFormatTxOut.toCborBytes failed ConwayFormatTxOut is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatTxOut.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatTxOut.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.ConwayFormatTxOut,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ConwayFormatTxOut
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatTxOut.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.ConwayFormatTxOut,
  ): Effect.Effect<Uint8Array, ConwayFormatTxOutError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ConwayFormatTxOutError({
          message: `ConwayFormatTxOut.toCanonicalCborBytes failed ConwayFormatTxOut is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatTxOut.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatTxOut.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.ConwayFormatTxOut,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ConwayFormatTxOut
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ConwayFormatTxOut.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ConwayFormatTxOut.from_cbor_bytes(cborBytes),
    catch: () =>
      new ConwayFormatTxOutError({
        message: `ConwayFormatTxOut.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls ConwayFormatTxOut.fromCborBytes without Effect wrapper
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatTxOut.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatTxOut.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ConwayFormatTxOut
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatTxOut.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.ConwayFormatTxOut,
  ): Effect.Effect<string, ConwayFormatTxOutError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ConwayFormatTxOutError({
          message: `ConwayFormatTxOut.toCborHex failed ConwayFormatTxOut is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatTxOut.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatTxOut.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ConwayFormatTxOut): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ConwayFormatTxOut
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatTxOut.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (
    instance: CML.ConwayFormatTxOut,
  ): Effect.Effect<string, ConwayFormatTxOutError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ConwayFormatTxOutError({
          message: `ConwayFormatTxOut.toCanonicalCborHex failed ConwayFormatTxOut is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatTxOut.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatTxOut.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.ConwayFormatTxOut,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ConwayFormatTxOut
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ConwayFormatTxOut.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ConwayFormatTxOut.from_cbor_hex(cborBytes),
    catch: () =>
      new ConwayFormatTxOutError({
        message: `ConwayFormatTxOut.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls ConwayFormatTxOut.fromCborHex without Effect wrapper
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatTxOut.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatTxOut.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ConwayFormatTxOut
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatTxOut.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.ConwayFormatTxOut,
  ): Effect.Effect<string, ConwayFormatTxOutError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ConwayFormatTxOutError({
          message: `ConwayFormatTxOut.toJson failed ConwayFormatTxOut is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatTxOut.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatTxOut.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ConwayFormatTxOut): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ConwayFormatTxOut
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatTxOut.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.ConwayFormatTxOut,
  ): Effect.Effect<any, ConwayFormatTxOutError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ConwayFormatTxOutError({
          message: `ConwayFormatTxOut.toJsValue failed ConwayFormatTxOut is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatTxOut.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatTxOut.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ConwayFormatTxOut): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ConwayFormatTxOut
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ConwayFormatTxOut.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ConwayFormatTxOut.from_json(json),
    catch: () =>
      new ConwayFormatTxOutError({
        message: `ConwayFormatTxOut.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls ConwayFormatTxOut.fromJson without Effect wrapper
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatTxOut.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatTxOut.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method address of ConwayFormatTxOut
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatTxOut.address(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const address = Effect.fn(
  (
    instance: CML.ConwayFormatTxOut,
  ): Effect.Effect<CML.Address, ConwayFormatTxOutError> =>
    Effect.try({
      try: () => instance.address(),
      catch: () =>
        new ConwayFormatTxOutError({
          message: `ConwayFormatTxOut.address failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.address without Effect wrapper
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatTxOut.addressUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatTxOut.addressUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addressUnsafe = (instance: CML.ConwayFormatTxOut): CML.Address =>
  Effect.runSync(address(instance));

/**
 * Method amount of ConwayFormatTxOut
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatTxOut.amount(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const amount = Effect.fn(
  (
    instance: CML.ConwayFormatTxOut,
  ): Effect.Effect<CML.Value, ConwayFormatTxOutError> =>
    Effect.try({
      try: () => instance.amount(),
      catch: () =>
        new ConwayFormatTxOutError({
          message: `ConwayFormatTxOut.amount failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.amount without Effect wrapper
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatTxOut.amountUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatTxOut.amountUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const amountUnsafe = (instance: CML.ConwayFormatTxOut): CML.Value =>
  Effect.runSync(amount(instance));

/**
 * Method setDatumOption of ConwayFormatTxOut
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatTxOut.setDatumOption(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setDatumOption = Effect.fn(
  (
    instance: CML.ConwayFormatTxOut,
    datumOption: CML.DatumOption,
  ): Effect.Effect<void, ConwayFormatTxOutError> =>
    Effect.try({
      try: () => instance.set_datum_option(datumOption),
      catch: () =>
        new ConwayFormatTxOutError({
          message: `ConwayFormatTxOut.setDatumOption failed with parameters: ${datumOption} (DatumOption). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setDatumOption without Effect wrapper
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatTxOut.setDatumOptionUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatTxOut.setDatumOptionUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setDatumOptionUnsafe = (
  instance: CML.ConwayFormatTxOut,
  datumOption: CML.DatumOption,
): void => Effect.runSync(setDatumOption(instance, datumOption));

/**
 * Method datumOption of ConwayFormatTxOut
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatTxOut.datumOption(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const datumOption = Effect.fn(
  (
    instance: CML.ConwayFormatTxOut,
  ): Effect.Effect<CML.DatumOption | undefined, ConwayFormatTxOutError> =>
    Effect.try({
      try: () => instance.datum_option(),
      catch: () =>
        new ConwayFormatTxOutError({
          message: `ConwayFormatTxOut.datumOption failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.datumOption without Effect wrapper
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatTxOut.datumOptionUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatTxOut.datumOptionUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const datumOptionUnsafe = (
  instance: CML.ConwayFormatTxOut,
): CML.DatumOption | undefined => Effect.runSync(datumOption(instance));

/**
 * Method setScriptReference of ConwayFormatTxOut
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatTxOut.setScriptReference(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setScriptReference = Effect.fn(
  (
    instance: CML.ConwayFormatTxOut,
    scriptReference: CML.Script,
  ): Effect.Effect<void, ConwayFormatTxOutError> =>
    Effect.try({
      try: () => instance.set_script_reference(scriptReference),
      catch: () =>
        new ConwayFormatTxOutError({
          message: `ConwayFormatTxOut.setScriptReference failed with parameters: ${scriptReference} (Script). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setScriptReference without Effect wrapper
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatTxOut.setScriptReferenceUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatTxOut.setScriptReferenceUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setScriptReferenceUnsafe = (
  instance: CML.ConwayFormatTxOut,
  scriptReference: CML.Script,
): void => Effect.runSync(setScriptReference(instance, scriptReference));

/**
 * Method scriptReference of ConwayFormatTxOut
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatTxOut.scriptReference(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const scriptReference = Effect.fn(
  (
    instance: CML.ConwayFormatTxOut,
  ): Effect.Effect<CML.Script | undefined, ConwayFormatTxOutError> =>
    Effect.try({
      try: () => instance.script_reference(),
      catch: () =>
        new ConwayFormatTxOutError({
          message: `ConwayFormatTxOut.scriptReference failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.scriptReference without Effect wrapper
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConwayFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatTxOut.scriptReferenceUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatTxOut.scriptReferenceUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const scriptReferenceUnsafe = (
  instance: CML.ConwayFormatTxOut,
): CML.Script | undefined => Effect.runSync(scriptReference(instance));

/**
 * Static method _new of ConwayFormatTxOut
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ConwayFormatTxOut._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  address: CML.Address,
  amount: CML.Value,
) {
  return yield* Effect.try({
    try: () => CML.ConwayFormatTxOut.new(address, amount),
    catch: () =>
      new ConwayFormatTxOutError({
        message: `ConwayFormatTxOut._new failed with parameters: ${address} (Address), ${amount} (Value). `,
      }),
  });
});

/**
 * Unsafely calls ConwayFormatTxOut._new without Effect wrapper
 *
 * @example
 * import { ConwayFormatTxOut } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatTxOut._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatTxOut._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (address: CML.Address, amount: CML.Value) =>
  Effect.runSync(_new(address, amount));
