/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionUnspentOutput class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionUnspentOutput = CML.TransactionUnspentOutput;

/**
 * Error class for TransactionUnspentOutput operations
 *
 * This error is thrown when operations on TransactionUnspentOutput instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionUnspentOutputError extends Data.TaggedError(
  "TransactionUnspentOutputError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionUnspentOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.TransactionUnspentOutput,
) => Effect.Effect<void, TransactionUnspentOutputError> = Effect.fn(
  (instance: CML.TransactionUnspentOutput) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionUnspentOutputError({
          message: `TransactionUnspentOutput.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionUnspentOutput): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of TransactionUnspentOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.TransactionUnspentOutput,
) => Effect.Effect<Uint8Array, TransactionUnspentOutputError> = Effect.fn(
  (instance: CML.TransactionUnspentOutput) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new TransactionUnspentOutputError({
          message: `TransactionUnspentOutput.toCborBytes failed TransactionUnspentOutput is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.TransactionUnspentOutput,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of TransactionUnspentOutput
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<
  CML.TransactionUnspentOutput,
  TransactionUnspentOutputError
> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.TransactionUnspentOutput.from_cbor_bytes(cborBytes),
    catch: () =>
      new TransactionUnspentOutputError({
        message: `TransactionUnspentOutput.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls TransactionUnspentOutput.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.TransactionUnspentOutput => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of TransactionUnspentOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.TransactionUnspentOutput,
) => Effect.Effect<string, TransactionUnspentOutputError> = Effect.fn(
  (instance: CML.TransactionUnspentOutput) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new TransactionUnspentOutputError({
          message: `TransactionUnspentOutput.toCborHex failed TransactionUnspentOutput is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (
  instance: CML.TransactionUnspentOutput,
): string => Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of TransactionUnspentOutput
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<
  CML.TransactionUnspentOutput,
  TransactionUnspentOutputError
> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.TransactionUnspentOutput.from_cbor_hex(cborBytes),
    catch: () =>
      new TransactionUnspentOutputError({
        message: `TransactionUnspentOutput.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls TransactionUnspentOutput.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (
  cborBytes: string,
): CML.TransactionUnspentOutput => Effect.runSync(fromCborHex(cborBytes));

/**
 * Static method _new of TransactionUnspentOutput
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  input: CML.TransactionInput,
  output: CML.TransactionOutput,
) => Effect.Effect<
  CML.TransactionUnspentOutput,
  TransactionUnspentOutputError
> = Effect.fn(function* (
  input: CML.TransactionInput,
  output: CML.TransactionOutput,
) {
  return yield* Effect.try({
    try: () => CML.TransactionUnspentOutput.new(input, output),
    catch: () =>
      new TransactionUnspentOutputError({
        message: `TransactionUnspentOutput._new failed with parameters: ${input} (TransactionInput), ${output} (TransactionOutput). `,
      }),
  });
});

/**
 * Unsafely calls TransactionUnspentOutput._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  input: CML.TransactionInput,
  output: CML.TransactionOutput,
): CML.TransactionUnspentOutput => Effect.runSync(_new(input, output));

/**
 * Method input of TransactionUnspentOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const input: (
  instance: CML.TransactionUnspentOutput,
) => Effect.Effect<CML.TransactionInput, TransactionUnspentOutputError> =
  Effect.fn((instance: CML.TransactionUnspentOutput) =>
    Effect.try({
      try: () => instance.input(),
      catch: () =>
        new TransactionUnspentOutputError({
          message: `TransactionUnspentOutput.input failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.input without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const inputUnsafe = (
  instance: CML.TransactionUnspentOutput,
): CML.TransactionInput => Effect.runSync(input(instance));

/**
 * Method output of TransactionUnspentOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const output: (
  instance: CML.TransactionUnspentOutput,
) => Effect.Effect<CML.TransactionOutput, TransactionUnspentOutputError> =
  Effect.fn((instance: CML.TransactionUnspentOutput) =>
    Effect.try({
      try: () => instance.output(),
      catch: () =>
        new TransactionUnspentOutputError({
          message: `TransactionUnspentOutput.output failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.output without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const outputUnsafe = (
  instance: CML.TransactionUnspentOutput,
): CML.TransactionOutput => Effect.runSync(output(instance));
