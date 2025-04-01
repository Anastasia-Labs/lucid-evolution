/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML StakeDistribution class
 *
 * @since 2.0.0
 * @category Types
 */
export type StakeDistribution = CML.StakeDistribution;

/**
 * Error class for StakeDistribution operations
 *
 * This error is thrown when operations on StakeDistribution instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class StakeDistributionError extends Data.TaggedError(
  "StakeDistributionError",
)<{
  message?: string;
}> {}

/**
 * Method free of StakeDistribution
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.StakeDistribution,
) => Effect.Effect<void, StakeDistributionError> = Effect.fn(
  (instance: CML.StakeDistribution) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new StakeDistributionError({
          message: `StakeDistribution.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.StakeDistribution): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of StakeDistribution
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.StakeDistribution,
) => Effect.Effect<Uint8Array, StakeDistributionError> = Effect.fn(
  (instance: CML.StakeDistribution) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new StakeDistributionError({
          message: `StakeDistribution.toCborBytes failed StakeDistribution is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.StakeDistribution,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of StakeDistribution
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.StakeDistribution, StakeDistributionError> = Effect.fn(
  function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.StakeDistribution.from_cbor_bytes(cborBytes),
      catch: () =>
        new StakeDistributionError({
          message: `StakeDistribution.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls StakeDistribution.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.StakeDistribution => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of StakeDistribution
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.StakeDistribution,
) => Effect.Effect<string, StakeDistributionError> = Effect.fn(
  (instance: CML.StakeDistribution) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new StakeDistributionError({
          message: `StakeDistribution.toCborHex failed StakeDistribution is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.StakeDistribution): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of StakeDistribution
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.StakeDistribution, StakeDistributionError> = Effect.fn(
  function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.StakeDistribution.from_cbor_hex(cborBytes),
      catch: () =>
        new StakeDistributionError({
          message: `StakeDistribution.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  },
);

/**
 * Unsafely calls StakeDistribution.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.StakeDistribution =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Static method newSingleKey of StakeDistribution
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newSingleKey: (
  stakeholderId: CML.StakeholderId,
) => Effect.Effect<CML.StakeDistribution, StakeDistributionError> = Effect.fn(
  function* (stakeholderId: CML.StakeholderId) {
    return yield* Effect.try({
      try: () => CML.StakeDistribution.new_single_key(stakeholderId),
      catch: () =>
        new StakeDistributionError({
          message: `StakeDistribution.newSingleKey failed with parameters: ${stakeholderId} (StakeholderId). `,
        }),
    });
  },
);

/**
 * Unsafely calls StakeDistribution.newSingleKey without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newSingleKeyUnsafe = (
  stakeholderId: CML.StakeholderId,
): CML.StakeDistribution => Effect.runSync(newSingleKey(stakeholderId));

/**
 * Static method newBootstrapEra of StakeDistribution
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newBootstrapEra: () => Effect.Effect<
  CML.StakeDistribution,
  StakeDistributionError
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.StakeDistribution.new_bootstrap_era(),
    catch: () =>
      new StakeDistributionError({
        message: `StakeDistribution.newBootstrapEra failed Hint: Not all StakeDistribution instances can be stringified.`,
      }),
  });
});

/**
 * Unsafely calls StakeDistribution.newBootstrapEra without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newBootstrapEraUnsafe = (): CML.StakeDistribution =>
  Effect.runSync(newBootstrapEra());

/**
 * Method kind of StakeDistribution
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind: (
  instance: CML.StakeDistribution,
) => Effect.Effect<CML.StakeDistributionKind, StakeDistributionError> =
  Effect.fn((instance: CML.StakeDistribution) =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new StakeDistributionError({
          message: `StakeDistribution.kind failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (
  instance: CML.StakeDistribution,
): CML.StakeDistributionKind => Effect.runSync(kind(instance));

/**
 * Method asSingleKey of StakeDistribution
 *
 * @since 2.0.0
 * @category Methods
 */
export const asSingleKey: (
  instance: CML.StakeDistribution,
) => Effect.Effect<CML.StakeholderId | undefined, StakeDistributionError> =
  Effect.fn((instance: CML.StakeDistribution) =>
    Effect.try({
      try: () => instance.as_single_key(),
      catch: () =>
        new StakeDistributionError({
          message: `StakeDistribution.asSingleKey failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.asSingleKey without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asSingleKeyUnsafe = (
  instance: CML.StakeDistribution,
): CML.StakeholderId | undefined => Effect.runSync(asSingleKey(instance));
