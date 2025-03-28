import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type SingleInputBuilder = CML.SingleInputBuilder;

export class SingleInputBuilderError extends Data.TaggedError(
  "SingleInputBuilderError",
)<{
  message?: string;
}> {}

/**
 * Method free of SingleInputBuilder
 *
 * @example
 * import { SingleInputBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleInputBuilder instance
 * const instance = ... ;
 *   const result = yield* SingleInputBuilder.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.SingleInputBuilder,
  ): Effect.Effect<void, SingleInputBuilderError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new SingleInputBuilderError({
          message: `SingleInputBuilder.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { SingleInputBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SingleInputBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleInputBuilder.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleInputBuilder.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.SingleInputBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of SingleInputBuilder
 *
 * @example
 * import { SingleInputBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* SingleInputBuilder._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  input: CML.TransactionInput,
  utxoInfo: CML.TransactionOutput,
) {
  return yield* Effect.try({
    try: () => CML.SingleInputBuilder.new(input, utxoInfo),
    catch: () =>
      new SingleInputBuilderError({
        message: `SingleInputBuilder._new failed with parameters: ${input} (TransactionInput), ${utxoInfo} (TransactionOutput). `,
      }),
  });
});

/**
 * Unsafely calls SingleInputBuilder._new without Effect wrapper
 *
 * @example
 * import { SingleInputBuilder } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleInputBuilder.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleInputBuilder.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (
  input: CML.TransactionInput,
  utxoInfo: CML.TransactionOutput,
) => Effect.runSync(_new(input, utxoInfo));

/**
 * Static method fromTransactionUnspentOutput of SingleInputBuilder
 *
 * @example
 * import { SingleInputBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* SingleInputBuilder.fromTransactionUnspentOutput( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromTransactionUnspentOutput = Effect.fn(function* (
  utxo: CML.TransactionUnspentOutput,
) {
  return yield* Effect.try({
    try: () => CML.SingleInputBuilder.from_transaction_unspent_output(utxo),
    catch: () =>
      new SingleInputBuilderError({
        message: `SingleInputBuilder.fromTransactionUnspentOutput failed with parameters: ${utxo} (TransactionUnspentOutput). `,
      }),
  });
});

/**
 * Unsafely calls SingleInputBuilder.fromTransactionUnspentOutput without Effect wrapper
 *
 * @example
 * import { SingleInputBuilder } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleInputBuilder.unsafeFromTransactionUnspentOutput( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleInputBuilder.unsafeFromTransactionUnspentOutput failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromTransactionUnspentOutput = (
  utxo: CML.TransactionUnspentOutput,
) => Effect.runSync(fromTransactionUnspentOutput(utxo));

/**
 * Method paymentKey of SingleInputBuilder
 *
 * @example
 * import { SingleInputBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleInputBuilder instance
 * const instance = ... ;
 *   const result = yield* SingleInputBuilder.paymentKey(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const paymentKey = Effect.fn(
  (
    instance: CML.SingleInputBuilder,
  ): Effect.Effect<CML.InputBuilderResult, SingleInputBuilderError> =>
    Effect.try({
      try: () => instance.payment_key(),
      catch: () =>
        new SingleInputBuilderError({
          message: `SingleInputBuilder.paymentKey failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.paymentKey without Effect wrapper
 *
 * @example
 * import { SingleInputBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SingleInputBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleInputBuilder.unsafePaymentKey(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleInputBuilder.unsafePaymentKey failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafePaymentKey = (
  instance: CML.SingleInputBuilder,
): CML.InputBuilderResult => Effect.runSync(paymentKey(instance));

/**
 * Method nativeScript of SingleInputBuilder
 *
 * @example
 * import { SingleInputBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleInputBuilder instance
 * const instance = ... ;
 *   const result = yield* SingleInputBuilder.nativeScript(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const nativeScript = Effect.fn(
  (
    instance: CML.SingleInputBuilder,
    _nativeScript: CML.NativeScript,
    witnessInfo: CML.NativeScriptWitnessInfo,
  ): Effect.Effect<CML.InputBuilderResult, SingleInputBuilderError> =>
    Effect.try({
      try: () => instance.native_script(_nativeScript, witnessInfo),
      catch: () =>
        new SingleInputBuilderError({
          message: `SingleInputBuilder.nativeScript failed with parameters: ${_nativeScript} (NativeScript), ${witnessInfo} (NativeScriptWitnessInfo). `,
        }),
    }),
);

/**
 * Unsafely calls instance.nativeScript without Effect wrapper
 *
 * @example
 * import { SingleInputBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SingleInputBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleInputBuilder.unsafeNativeScript(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleInputBuilder.unsafeNativeScript failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeNativeScript = (
  instance: CML.SingleInputBuilder,
  _nativeScript: CML.NativeScript,
  witnessInfo: CML.NativeScriptWitnessInfo,
): CML.InputBuilderResult =>
  Effect.runSync(nativeScript(instance, _nativeScript, witnessInfo));

/**
 * Method plutusScript of SingleInputBuilder
 *
 * @example
 * import { SingleInputBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleInputBuilder instance
 * const instance = ... ;
 *   const result = yield* SingleInputBuilder.plutusScript(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const plutusScript = Effect.fn(
  (
    instance: CML.SingleInputBuilder,
    partialWitness: CML.PartialPlutusWitness,
    requiredSigners: CML.Ed25519KeyHashList,
    datum: CML.PlutusData,
  ): Effect.Effect<CML.InputBuilderResult, SingleInputBuilderError> =>
    Effect.try({
      try: () => instance.plutus_script(partialWitness, requiredSigners, datum),
      catch: () =>
        new SingleInputBuilderError({
          message: `SingleInputBuilder.plutusScript failed with parameters: ${partialWitness} (PartialPlutusWitness), ${requiredSigners} (Ed25519KeyHashList), ${datum} (PlutusData). `,
        }),
    }),
);

/**
 * Unsafely calls instance.plutusScript without Effect wrapper
 *
 * @example
 * import { SingleInputBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SingleInputBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleInputBuilder.unsafePlutusScript(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleInputBuilder.unsafePlutusScript failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafePlutusScript = (
  instance: CML.SingleInputBuilder,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
  datum: CML.PlutusData,
): CML.InputBuilderResult =>
  Effect.runSync(
    plutusScript(instance, partialWitness, requiredSigners, datum),
  );

/**
 * Method plutusScriptInlineDatum of SingleInputBuilder
 *
 * @example
 * import { SingleInputBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleInputBuilder instance
 * const instance = ... ;
 *   const result = yield* SingleInputBuilder.plutusScriptInlineDatum(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const plutusScriptInlineDatum = Effect.fn(
  (
    instance: CML.SingleInputBuilder,
    partialWitness: CML.PartialPlutusWitness,
    requiredSigners: CML.Ed25519KeyHashList,
  ): Effect.Effect<CML.InputBuilderResult, SingleInputBuilderError> =>
    Effect.try({
      try: () =>
        instance.plutus_script_inline_datum(partialWitness, requiredSigners),
      catch: () =>
        new SingleInputBuilderError({
          message: `SingleInputBuilder.plutusScriptInlineDatum failed with parameters: ${partialWitness} (PartialPlutusWitness), ${requiredSigners} (Ed25519KeyHashList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.plutusScriptInlineDatum without Effect wrapper
 *
 * @example
 * import { SingleInputBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SingleInputBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleInputBuilder.unsafePlutusScriptInlineDatum(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleInputBuilder.unsafePlutusScriptInlineDatum failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafePlutusScriptInlineDatum = (
  instance: CML.SingleInputBuilder,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
): CML.InputBuilderResult =>
  Effect.runSync(
    plutusScriptInlineDatum(instance, partialWitness, requiredSigners),
  );
