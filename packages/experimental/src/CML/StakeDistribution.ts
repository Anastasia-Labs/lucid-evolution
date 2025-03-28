import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type StakeDistribution = CML.StakeDistribution;

export class StakeDistributionError extends Data.TaggedError("StakeDistributionError")<{
  message?: string;
}> {}

/**
 * Method free of StakeDistribution
 * 
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 *   const result = yield* StakeDistribution.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.StakeDistribution): Effect.Effect<void, StakeDistributionError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new StakeDistributionError({
          message: `StakeDistribution.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDistribution.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDistribution.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.StakeDistribution): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of StakeDistribution
 * 
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 *   const result = yield* StakeDistribution.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.StakeDistribution): Effect.Effect<Uint8Array, StakeDistributionError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new StakeDistributionError({
          message: `StakeDistribution.toCborBytes failed StakeDistribution is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDistribution.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDistribution.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.StakeDistribution): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of StakeDistribution
 * 
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeDistribution.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.StakeDistribution.from_cbor_bytes(cborBytes),
    catch: () => new StakeDistributionError({
      message: `StakeDistribution.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls StakeDistribution.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDistribution.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDistribution.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of StakeDistribution
 * 
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 *   const result = yield* StakeDistribution.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.StakeDistribution): Effect.Effect<string, StakeDistributionError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new StakeDistributionError({
          message: `StakeDistribution.toCborHex failed StakeDistribution is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDistribution.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDistribution.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.StakeDistribution): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of StakeDistribution
 * 
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeDistribution.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.StakeDistribution.from_cbor_hex(cborBytes),
    catch: () => new StakeDistributionError({
      message: `StakeDistribution.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls StakeDistribution.fromCborHex without Effect wrapper
 * 
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDistribution.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDistribution.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Static method newSingleKey of StakeDistribution
 * 
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeDistribution.newSingleKey( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newSingleKey = Effect.fn(function* (stakeholderId: CML.StakeholderId) {
  return yield* Effect.try({
    try: () => CML.StakeDistribution.new_single_key(stakeholderId),
    catch: () => new StakeDistributionError({
      message: `StakeDistribution.newSingleKey failed with parameters: ${stakeholderId} (StakeholderId). `,
    }),
  });
});

/**
 * Unsafely calls StakeDistribution.newSingleKey without Effect wrapper
 * 
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDistribution.unsafeNewSingleKey( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDistribution.unsafeNewSingleKey failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewSingleKey = (stakeholderId: CML.StakeholderId) =>
  Effect.runSync(newSingleKey(stakeholderId));

/**
 * Static method newBootstrapEra of StakeDistribution
 * 
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeDistribution.newBootstrapEra();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newBootstrapEra = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.StakeDistribution.new_bootstrap_era(),
    catch: () => new StakeDistributionError({
      message: `StakeDistribution.newBootstrapEra failed Hint: Not all StakeDistribution instances can be stringified.`,
    }),
  });
});

/**
 * Unsafely calls StakeDistribution.newBootstrapEra without Effect wrapper
 * 
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDistribution.unsafeNewBootstrapEra();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDistribution.unsafeNewBootstrapEra failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewBootstrapEra = () =>
  Effect.runSync(newBootstrapEra());

/**
 * Method kind of StakeDistribution
 * 
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 *   const result = yield* StakeDistribution.kind(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (instance: CML.StakeDistribution): Effect.Effect<CML.StakeDistributionKind, StakeDistributionError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new StakeDistributionError({
          message: `StakeDistribution.kind failed `,
        }),
    })
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 * 
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDistribution.unsafeKind(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDistribution.unsafeKind failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKind = (instance: CML.StakeDistribution): CML.StakeDistributionKind =>
  Effect.runSync(kind(instance));

/**
 * Method asSingleKey of StakeDistribution
 * 
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 *   const result = yield* StakeDistribution.asSingleKey(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asSingleKey = Effect.fn(
  (instance: CML.StakeDistribution): Effect.Effect<CML.StakeholderId | undefined, StakeDistributionError> =>
    Effect.try({
      try: () => instance.as_single_key(),
      catch: () =>
        new StakeDistributionError({
          message: `StakeDistribution.asSingleKey failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asSingleKey without Effect wrapper
 * 
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDistribution.unsafeAsSingleKey(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDistribution.unsafeAsSingleKey failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsSingleKey = (instance: CML.StakeDistribution): CML.StakeholderId | undefined =>
  Effect.runSync(asSingleKey(instance));
