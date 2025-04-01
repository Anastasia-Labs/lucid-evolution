/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionOutput class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionOutput = CML.TransactionOutput;

/**
 * Error class for TransactionOutput operations
 *
 * This error is thrown when operations on TransactionOutput instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionOutputError extends Data.TaggedError(
  "TransactionOutputError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionOutput.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.TransactionOutput,
  ): Effect.Effect<void, TransactionOutputError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionOutput): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionOutput._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  address: CML.Address,
  amount: CML.Value,
  datumOption: CML.DatumOption,
  scriptReference: CML.Script,
) {
  return yield* Effect.try({
    try: () =>
      CML.TransactionOutput.new(address, amount, datumOption, scriptReference),
    catch: () =>
      new TransactionOutputError({
        message: `TransactionOutput._new failed with parameters: ${address} (Address), ${amount} (Value), ${datumOption} (DatumOption), ${scriptReference} (Script). `,
      }),
  });
});

/**
 * Unsafely calls TransactionOutput._new without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  address: CML.Address,
  amount: CML.Value,
  datumOption: CML.DatumOption,
  scriptReference: CML.Script,
) => Effect.runSync(_new(address, amount, datumOption, scriptReference));

/**
 * Method address of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionOutput.address(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const address = Effect.fn(
  (
    instance: CML.TransactionOutput,
  ): Effect.Effect<CML.Address, TransactionOutputError> =>
    Effect.try({
      try: () => instance.address(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.address failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.address without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.addressUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.addressUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addressUnsafe = (instance: CML.TransactionOutput): CML.Address =>
  Effect.runSync(address(instance));

/**
 * Method amount of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionOutput.amount(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const amount = Effect.fn(
  (
    instance: CML.TransactionOutput,
  ): Effect.Effect<CML.Value, TransactionOutputError> =>
    Effect.try({
      try: () => instance.amount(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.amount failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.amount without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.amountUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.amountUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const amountUnsafe = (instance: CML.TransactionOutput): CML.Value =>
  Effect.runSync(amount(instance));

/**
 * Method setAmount of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionOutput.setAmount(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setAmount = Effect.fn(
  (
    instance: CML.TransactionOutput,
    amount: CML.Value,
  ): Effect.Effect<void, TransactionOutputError> =>
    Effect.try({
      try: () => instance.set_amount(amount),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.setAmount failed with parameters: ${amount} (Value). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setAmount without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.setAmountUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.setAmountUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setAmountUnsafe = (
  instance: CML.TransactionOutput,
  amount: CML.Value,
): void => Effect.runSync(setAmount(instance, amount));

/**
 * Method datum of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionOutput.datum(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const datum = Effect.fn(
  (
    instance: CML.TransactionOutput,
  ): Effect.Effect<CML.DatumOption | undefined, TransactionOutputError> =>
    Effect.try({
      try: () => instance.datum(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.datum failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.datum without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.datumUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.datumUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const datumUnsafe = (
  instance: CML.TransactionOutput,
): CML.DatumOption | undefined => Effect.runSync(datum(instance));

/**
 * Method datumHash of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionOutput.datumHash(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const datumHash = Effect.fn(
  (
    instance: CML.TransactionOutput,
  ): Effect.Effect<CML.DatumHash | undefined, TransactionOutputError> =>
    Effect.try({
      try: () => instance.datum_hash(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.datumHash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.datumHash without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.datumHashUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.datumHashUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const datumHashUnsafe = (
  instance: CML.TransactionOutput,
): CML.DatumHash | undefined => Effect.runSync(datumHash(instance));

/**
 * Method scriptRef of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionOutput.scriptRef(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const scriptRef = Effect.fn(
  (
    instance: CML.TransactionOutput,
  ): Effect.Effect<CML.Script | undefined, TransactionOutputError> =>
    Effect.try({
      try: () => instance.script_ref(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.scriptRef failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.scriptRef without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.scriptRefUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.scriptRefUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const scriptRefUnsafe = (
  instance: CML.TransactionOutput,
): CML.Script | undefined => Effect.runSync(scriptRef(instance));

/**
 * Method toCborBytes of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionOutput.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.TransactionOutput,
  ): Effect.Effect<Uint8Array, TransactionOutputError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.toCborBytes failed TransactionOutput is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.TransactionOutput,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionOutput.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.TransactionOutput,
  ): Effect.Effect<Uint8Array, TransactionOutputError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.toCanonicalCborBytes failed TransactionOutput is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.TransactionOutput,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionOutput.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.TransactionOutput.from_cbor_bytes(cborBytes),
    catch: () =>
      new TransactionOutputError({
        message: `TransactionOutput.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls TransactionOutput.fromCborBytes without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionOutput.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.TransactionOutput,
  ): Effect.Effect<string, TransactionOutputError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.toCborHex failed TransactionOutput is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.TransactionOutput): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionOutput.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (
    instance: CML.TransactionOutput,
  ): Effect.Effect<string, TransactionOutputError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.toCanonicalCborHex failed TransactionOutput is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.TransactionOutput,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionOutput.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.TransactionOutput.from_cbor_hex(cborBytes),
    catch: () =>
      new TransactionOutputError({
        message: `TransactionOutput.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls TransactionOutput.fromCborHex without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionOutput.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.TransactionOutput,
  ): Effect.Effect<string, TransactionOutputError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.toJson failed TransactionOutput is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.TransactionOutput): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionOutput.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.TransactionOutput,
  ): Effect.Effect<any, TransactionOutputError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.toJsValue failed TransactionOutput is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.TransactionOutput): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionOutput.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.TransactionOutput.from_json(json),
    catch: () =>
      new TransactionOutputError({
        message: `TransactionOutput.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls TransactionOutput.fromJson without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Static method newAlonzoFormatTxOut of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionOutput.newAlonzoFormatTxOut( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newAlonzoFormatTxOut = Effect.fn(function* (
  alonzoFormatTxOut: CML.AlonzoFormatTxOut,
) {
  return yield* Effect.try({
    try: () =>
      CML.TransactionOutput.new_alonzo_format_tx_out(alonzoFormatTxOut),
    catch: () =>
      new TransactionOutputError({
        message: `TransactionOutput.newAlonzoFormatTxOut failed with parameters: ${alonzoFormatTxOut} (AlonzoFormatTxOut). `,
      }),
  });
});

/**
 * Unsafely calls TransactionOutput.newAlonzoFormatTxOut without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.newAlonzoFormatTxOutUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.newAlonzoFormatTxOutUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newAlonzoFormatTxOutUnsafe = (
  alonzoFormatTxOut: CML.AlonzoFormatTxOut,
) => Effect.runSync(newAlonzoFormatTxOut(alonzoFormatTxOut));

/**
 * Static method newConwayFormatTxOut of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionOutput.newConwayFormatTxOut( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newConwayFormatTxOut = Effect.fn(function* (
  conwayFormatTxOut: CML.ConwayFormatTxOut,
) {
  return yield* Effect.try({
    try: () =>
      CML.TransactionOutput.new_conway_format_tx_out(conwayFormatTxOut),
    catch: () =>
      new TransactionOutputError({
        message: `TransactionOutput.newConwayFormatTxOut failed with parameters: ${conwayFormatTxOut} (ConwayFormatTxOut). `,
      }),
  });
});

/**
 * Unsafely calls TransactionOutput.newConwayFormatTxOut without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.newConwayFormatTxOutUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.newConwayFormatTxOutUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newConwayFormatTxOutUnsafe = (
  conwayFormatTxOut: CML.ConwayFormatTxOut,
) => Effect.runSync(newConwayFormatTxOut(conwayFormatTxOut));

/**
 * Method kind of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionOutput.kind(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (
    instance: CML.TransactionOutput,
  ): Effect.Effect<CML.TransactionOutputKind, TransactionOutputError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.kind failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.kindUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.kindUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (
  instance: CML.TransactionOutput,
): CML.TransactionOutputKind => Effect.runSync(kind(instance));

/**
 * Method asAlonzoFormatTxOut of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionOutput.asAlonzoFormatTxOut(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asAlonzoFormatTxOut = Effect.fn(
  (
    instance: CML.TransactionOutput,
  ): Effect.Effect<CML.AlonzoFormatTxOut | undefined, TransactionOutputError> =>
    Effect.try({
      try: () => instance.as_alonzo_format_tx_out(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.asAlonzoFormatTxOut failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asAlonzoFormatTxOut without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.asAlonzoFormatTxOutUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.asAlonzoFormatTxOutUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asAlonzoFormatTxOutUnsafe = (
  instance: CML.TransactionOutput,
): CML.AlonzoFormatTxOut | undefined =>
  Effect.runSync(asAlonzoFormatTxOut(instance));

/**
 * Method asConwayFormatTxOut of TransactionOutput
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionOutput.asConwayFormatTxOut(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asConwayFormatTxOut = Effect.fn(
  (
    instance: CML.TransactionOutput,
  ): Effect.Effect<CML.ConwayFormatTxOut | undefined, TransactionOutputError> =>
    Effect.try({
      try: () => instance.as_conway_format_tx_out(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.asConwayFormatTxOut failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asConwayFormatTxOut without Effect wrapper
 *
 * @example
 * import { TransactionOutput } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutput instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutput.asConwayFormatTxOutUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutput.asConwayFormatTxOutUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asConwayFormatTxOutUnsafe = (
  instance: CML.TransactionOutput,
): CML.ConwayFormatTxOut | undefined =>
  Effect.runSync(asConwayFormatTxOut(instance));
