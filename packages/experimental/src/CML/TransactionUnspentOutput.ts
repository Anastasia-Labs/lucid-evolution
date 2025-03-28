import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type TransactionUnspentOutput = CML.TransactionUnspentOutput;

export class TransactionUnspentOutputError extends Data.TaggedError("TransactionUnspentOutputError")<{
  message?: string;
}> {}

/**
 * Method free of TransactionUnspentOutput
 * 
 * @example
 * import { TransactionUnspentOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionUnspentOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionUnspentOutput.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.TransactionUnspentOutput): Effect.Effect<void, TransactionUnspentOutputError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionUnspentOutputError({
          message: `TransactionUnspentOutput.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { TransactionUnspentOutput } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionUnspentOutput instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionUnspentOutput.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionUnspentOutput.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.TransactionUnspentOutput): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of TransactionUnspentOutput
 * 
 * @example
 * import { TransactionUnspentOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionUnspentOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionUnspentOutput.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.TransactionUnspentOutput): Effect.Effect<Uint8Array, TransactionUnspentOutputError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new TransactionUnspentOutputError({
          message: `TransactionUnspentOutput.toCborBytes failed TransactionUnspentOutput is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { TransactionUnspentOutput } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionUnspentOutput instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionUnspentOutput.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionUnspentOutput.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.TransactionUnspentOutput): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of TransactionUnspentOutput
 * 
 * @example
 * import { TransactionUnspentOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionUnspentOutput.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.TransactionUnspentOutput.from_cbor_bytes(cborBytes),
    catch: () => new TransactionUnspentOutputError({
      message: `TransactionUnspentOutput.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls TransactionUnspentOutput.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { TransactionUnspentOutput } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionUnspentOutput.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionUnspentOutput.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of TransactionUnspentOutput
 * 
 * @example
 * import { TransactionUnspentOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionUnspentOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionUnspentOutput.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.TransactionUnspentOutput): Effect.Effect<string, TransactionUnspentOutputError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new TransactionUnspentOutputError({
          message: `TransactionUnspentOutput.toCborHex failed TransactionUnspentOutput is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { TransactionUnspentOutput } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionUnspentOutput instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionUnspentOutput.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionUnspentOutput.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.TransactionUnspentOutput): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of TransactionUnspentOutput
 * 
 * @example
 * import { TransactionUnspentOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionUnspentOutput.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.TransactionUnspentOutput.from_cbor_hex(cborBytes),
    catch: () => new TransactionUnspentOutputError({
      message: `TransactionUnspentOutput.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls TransactionUnspentOutput.fromCborHex without Effect wrapper
 * 
 * @example
 * import { TransactionUnspentOutput } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionUnspentOutput.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionUnspentOutput.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Static method _new of TransactionUnspentOutput
 * 
 * @example
 * import { TransactionUnspentOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionUnspentOutput._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (input: CML.TransactionInput, output: CML.TransactionOutput) {
  return yield* Effect.try({
    try: () => CML.TransactionUnspentOutput.new(input, output),
    catch: () => new TransactionUnspentOutputError({
      message: `TransactionUnspentOutput._new failed with parameters: ${input} (TransactionInput), ${output} (TransactionOutput). `,
    }),
  });
});

/**
 * Unsafely calls TransactionUnspentOutput._new without Effect wrapper
 * 
 * @example
 * import { TransactionUnspentOutput } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionUnspentOutput.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionUnspentOutput.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (input: CML.TransactionInput, output: CML.TransactionOutput) =>
  Effect.runSync(_new(input, output));

/**
 * Method input of TransactionUnspentOutput
 * 
 * @example
 * import { TransactionUnspentOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionUnspentOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionUnspentOutput.input(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const input = Effect.fn(
  (instance: CML.TransactionUnspentOutput): Effect.Effect<CML.TransactionInput, TransactionUnspentOutputError> =>
    Effect.try({
      try: () => instance.input(),
      catch: () =>
        new TransactionUnspentOutputError({
          message: `TransactionUnspentOutput.input failed `,
        }),
    })
);

/**
 * Unsafely calls instance.input without Effect wrapper
 * 
 * @example
 * import { TransactionUnspentOutput } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionUnspentOutput instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionUnspentOutput.unsafeInput(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionUnspentOutput.unsafeInput failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeInput = (instance: CML.TransactionUnspentOutput): CML.TransactionInput =>
  Effect.runSync(input(instance));

/**
 * Method output of TransactionUnspentOutput
 * 
 * @example
 * import { TransactionUnspentOutput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionUnspentOutput instance
 * const instance = ... ;
 *   const result = yield* TransactionUnspentOutput.output(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const output = Effect.fn(
  (instance: CML.TransactionUnspentOutput): Effect.Effect<CML.TransactionOutput, TransactionUnspentOutputError> =>
    Effect.try({
      try: () => instance.output(),
      catch: () =>
        new TransactionUnspentOutputError({
          message: `TransactionUnspentOutput.output failed `,
        }),
    })
);

/**
 * Unsafely calls instance.output without Effect wrapper
 * 
 * @example
 * import { TransactionUnspentOutput } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionUnspentOutput instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionUnspentOutput.unsafeOutput(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionUnspentOutput.unsafeOutput failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeOutput = (instance: CML.TransactionUnspentOutput): CML.TransactionOutput =>
  Effect.runSync(output(instance));
