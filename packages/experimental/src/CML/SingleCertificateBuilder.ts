import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type SingleCertificateBuilder = CML.SingleCertificateBuilder;

export class SingleCertificateBuilderError extends Data.TaggedError("SingleCertificateBuilderError")<{
  message?: string;
}> {}

/**
 * Method free of SingleCertificateBuilder
 * 
 * @example
 * import { SingleCertificateBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleCertificateBuilder instance
 * const instance = ... ;
 *   const result = yield* SingleCertificateBuilder.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.SingleCertificateBuilder): Effect.Effect<void, SingleCertificateBuilderError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new SingleCertificateBuilderError({
          message: `SingleCertificateBuilder.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { SingleCertificateBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleCertificateBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleCertificateBuilder.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleCertificateBuilder.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.SingleCertificateBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of SingleCertificateBuilder
 * 
 * @example
 * import { SingleCertificateBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* SingleCertificateBuilder._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (cert: CML.Certificate) {
  return yield* Effect.try({
    try: () => CML.SingleCertificateBuilder.new(cert),
    catch: () => new SingleCertificateBuilderError({
      message: `SingleCertificateBuilder._new failed with parameters: ${cert} (Certificate). `,
    }),
  });
});

/**
 * Unsafely calls SingleCertificateBuilder._new without Effect wrapper
 * 
 * @example
 * import { SingleCertificateBuilder } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleCertificateBuilder.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleCertificateBuilder.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (cert: CML.Certificate) =>
  Effect.runSync(_new(cert));

/**
 * Method skipWitness of SingleCertificateBuilder
 * 
 * @example
 * import { SingleCertificateBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleCertificateBuilder instance
 * const instance = ... ;
 *   const result = yield* SingleCertificateBuilder.skipWitness(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const skipWitness = Effect.fn(
  (instance: CML.SingleCertificateBuilder): Effect.Effect<CML.CertificateBuilderResult, SingleCertificateBuilderError> =>
    Effect.try({
      try: () => instance.skip_witness(),
      catch: () =>
        new SingleCertificateBuilderError({
          message: `SingleCertificateBuilder.skipWitness failed `,
        }),
    })
);

/**
 * Unsafely calls instance.skipWitness without Effect wrapper
 * 
 * @example
 * import { SingleCertificateBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleCertificateBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleCertificateBuilder.unsafeSkipWitness(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleCertificateBuilder.unsafeSkipWitness failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSkipWitness = (instance: CML.SingleCertificateBuilder): CML.CertificateBuilderResult =>
  Effect.runSync(skipWitness(instance));

/**
 * Method paymentKey of SingleCertificateBuilder
 * 
 * @example
 * import { SingleCertificateBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleCertificateBuilder instance
 * const instance = ... ;
 *   const result = yield* SingleCertificateBuilder.paymentKey(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const paymentKey = Effect.fn(
  (instance: CML.SingleCertificateBuilder): Effect.Effect<CML.CertificateBuilderResult, SingleCertificateBuilderError> =>
    Effect.try({
      try: () => instance.payment_key(),
      catch: () =>
        new SingleCertificateBuilderError({
          message: `SingleCertificateBuilder.paymentKey failed `,
        }),
    })
);

/**
 * Unsafely calls instance.paymentKey without Effect wrapper
 * 
 * @example
 * import { SingleCertificateBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleCertificateBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleCertificateBuilder.unsafePaymentKey(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleCertificateBuilder.unsafePaymentKey failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePaymentKey = (instance: CML.SingleCertificateBuilder): CML.CertificateBuilderResult =>
  Effect.runSync(paymentKey(instance));

/**
 * Method nativeScript of SingleCertificateBuilder
 * 
 * @example
 * import { SingleCertificateBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleCertificateBuilder instance
 * const instance = ... ;
 *   const result = yield* SingleCertificateBuilder.nativeScript(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const nativeScript = Effect.fn(
  (instance: CML.SingleCertificateBuilder, _nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo): Effect.Effect<CML.CertificateBuilderResult, SingleCertificateBuilderError> =>
    Effect.try({
      try: () => instance.native_script(_nativeScript, witnessInfo),
      catch: () =>
        new SingleCertificateBuilderError({
          message: `SingleCertificateBuilder.nativeScript failed with parameters: ${_nativeScript} (NativeScript), ${witnessInfo} (NativeScriptWitnessInfo). `,
        }),
    })
);

/**
 * Unsafely calls instance.nativeScript without Effect wrapper
 * 
 * @example
 * import { SingleCertificateBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleCertificateBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleCertificateBuilder.unsafeNativeScript(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleCertificateBuilder.unsafeNativeScript failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeNativeScript = (instance: CML.SingleCertificateBuilder, _nativeScript: CML.NativeScript, witnessInfo: CML.NativeScriptWitnessInfo): CML.CertificateBuilderResult =>
  Effect.runSync(nativeScript(instance, _nativeScript, witnessInfo));

/**
 * Method plutusScript of SingleCertificateBuilder
 * 
 * @example
 * import { SingleCertificateBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleCertificateBuilder instance
 * const instance = ... ;
 *   const result = yield* SingleCertificateBuilder.plutusScript(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const plutusScript = Effect.fn(
  (instance: CML.SingleCertificateBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList): Effect.Effect<CML.CertificateBuilderResult, SingleCertificateBuilderError> =>
    Effect.try({
      try: () => instance.plutus_script(partialWitness, requiredSigners),
      catch: () =>
        new SingleCertificateBuilderError({
          message: `SingleCertificateBuilder.plutusScript failed with parameters: ${partialWitness} (PartialPlutusWitness), ${requiredSigners} (Ed25519KeyHashList). `,
        }),
    })
);

/**
 * Unsafely calls instance.plutusScript without Effect wrapper
 * 
 * @example
 * import { SingleCertificateBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleCertificateBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleCertificateBuilder.unsafePlutusScript(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleCertificateBuilder.unsafePlutusScript failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePlutusScript = (instance: CML.SingleCertificateBuilder, partialWitness: CML.PartialPlutusWitness, requiredSigners: CML.Ed25519KeyHashList): CML.CertificateBuilderResult =>
  Effect.runSync(plutusScript(instance, partialWitness, requiredSigners));
