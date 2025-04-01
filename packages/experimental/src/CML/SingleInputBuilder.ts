/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML SingleInputBuilder class
 *
 * @since 2.0.0
 * @category Types
 */
export type SingleInputBuilder = CML.SingleInputBuilder;

/**
 * Error class for SingleInputBuilder operations
 * 
 * This error is thrown when operations on SingleInputBuilder instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class SingleInputBuilderError extends Data.TaggedError("SingleInputBuilderError")<{
  message?: string;
}> {}

/**
 * Method free of SingleInputBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.SingleInputBuilder) => Effect.Effect<void, SingleInputBuilderError> = Effect.fn(
  (instance: CML.SingleInputBuilder) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new SingleInputBuilderError({
          message: `SingleInputBuilder.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.SingleInputBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of SingleInputBuilder
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (input: CML.TransactionInput, utxoInfo: CML.TransactionOutput) => Effect.Effect<CML.SingleInputBuilder, SingleInputBuilderError> = Effect.fn(function* (input: CML.TransactionInput, utxoInfo: CML.TransactionOutput) {
  return yield* Effect.try({
    try: () => CML.SingleInputBuilder.new(input, utxoInfo),
    catch: () => new SingleInputBuilderError({
      message: `SingleInputBuilder._new failed with parameters: ${input} (TransactionInput), ${utxoInfo} (TransactionOutput). `,
    }),
  });
});

/**
 * Unsafely calls SingleInputBuilder._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (input: CML.TransactionInput, utxoInfo: CML.TransactionOutput): CML.SingleInputBuilder =>
  Effect.runSync(_new(input, utxoInfo));

/**
 * Static method fromTransactionUnspentOutput of SingleInputBuilder
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromTransactionUnspentOutput: (utxo: CML.TransactionUnspentOutput) => Effect.Effect<CML.SingleInputBuilder, SingleInputBuilderError> = Effect.fn(function* (utxo: CML.TransactionUnspentOutput) {
  return yield* Effect.try({
    try: () => CML.SingleInputBuilder.from_transaction_unspent_output(utxo),
    catch: () => new SingleInputBuilderError({
      message: `SingleInputBuilder.fromTransactionUnspentOutput failed with parameters: ${utxo} (TransactionUnspentOutput). `,
    }),
  });
});

/**
 * Unsafely calls SingleInputBuilder.fromTransactionUnspentOutput without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromTransactionUnspentOutputUnsafe = (utxo: CML.TransactionUnspentOutput): CML.SingleInputBuilder =>
  Effect.runSync(fromTransactionUnspentOutput(utxo));

/**
 * Method paymentKey of SingleInputBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const paymentKey: (instance: CML.SingleInputBuilder) => Effect.Effect<CML.InputBuilderResult, SingleInputBuilderError> = Effect.fn(
  (instance: CML.SingleInputBuilder) =>
    Effect.try({
      try: () => instance.payment_key(),
      catch: () =>
        new SingleInputBuilderError({
          message: `SingleInputBuilder.paymentKey failed `,
        }),
    })
);

/**
 * Unsafely calls instance.paymentKey without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const paymentKeyUnsafe = (instance: CML.SingleInputBuilder): CML.InputBuilderResult =>
  Effect.runSync(paymentKey(instance));

/**
 * Method nativeScript of SingleInputBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const nativeScript: (instance: CML.SingleInputBuilder, _nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo) => Effect.Effect<CML.InputBuilderResult, SingleInputBuilderError> = Effect.fn(
  (instance: CML.SingleInputBuilder, _nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo) =>
    Effect.try({
      try: () => instance.native_script(_nativeScript, witnessInfo),
      catch: () =>
        new SingleInputBuilderError({
          message: `SingleInputBuilder.nativeScript failed with parameters: ${_nativeScript} (NativeScript), ${witnessInfo} (NativeScriptWitnessInfo). `,
        }),
    })
);

/**
 * Unsafely calls instance.nativeScript without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nativeScriptUnsafe = (instance: CML.SingleInputBuilder, _nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo): CML.InputBuilderResult =>
  Effect.runSync(nativeScript(instance, _nativeScript, witnessInfo));

/**
 * Method plutusScript of SingleInputBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const plutusScript: (instance: CML.SingleInputBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList, datum: CML.PlutusData) => Effect.Effect<CML.InputBuilderResult, SingleInputBuilderError> = Effect.fn(
  (instance: CML.SingleInputBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList, datum: CML.PlutusData) =>
    Effect.try({
      try: () => instance.plutus_script(partialWitness, requiredSigners, datum),
      catch: () =>
        new SingleInputBuilderError({
          message: `SingleInputBuilder.plutusScript failed with parameters: ${partialWitness} (PartialPlutusWitness), ${requiredSigners} (Ed25519KeyHashList), ${datum} (PlutusData). `,
        }),
    })
);

/**
 * Unsafely calls instance.plutusScript without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusScriptUnsafe = (instance: CML.SingleInputBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList, datum: CML.PlutusData): CML.InputBuilderResult =>
  Effect.runSync(plutusScript(instance, partialWitness, requiredSigners, datum));

/**
 * Method plutusScriptInlineDatum of SingleInputBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const plutusScriptInlineDatum: (instance: CML.SingleInputBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList) => Effect.Effect<CML.InputBuilderResult, SingleInputBuilderError> = Effect.fn(
  (instance: CML.SingleInputBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList) =>
    Effect.try({
      try: () => instance.plutus_script_inline_datum(partialWitness, requiredSigners),
      catch: () =>
        new SingleInputBuilderError({
          message: `SingleInputBuilder.plutusScriptInlineDatum failed with parameters: ${partialWitness} (PartialPlutusWitness), ${requiredSigners} (Ed25519KeyHashList). `,
        }),
    })
);

/**
 * Unsafely calls instance.plutusScriptInlineDatum without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusScriptInlineDatumUnsafe = (instance: CML.SingleInputBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList): CML.InputBuilderResult =>
  Effect.runSync(plutusScriptInlineDatum(instance, partialWitness, requiredSigners));
