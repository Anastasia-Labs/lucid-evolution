/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CIP36DelegationDistribution class
 *
 * @since 2.0.0
 * @category Types
 */
export type CIP36DelegationDistribution = CML.CIP36DelegationDistribution;

/**
 * Error class for CIP36DelegationDistribution operations
 *
 * This error is thrown when operations on CIP36DelegationDistribution instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CIP36DelegationDistributionError extends Data.TaggedError(
  "CIP36DelegationDistributionError",
)<{
  message?: string;
}> {}

/**
 * Method free of CIP36DelegationDistribution
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.CIP36DelegationDistribution,
) => Effect.Effect<void, CIP36DelegationDistributionError> = Effect.fn(
  (instance: CML.CIP36DelegationDistribution) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP36DelegationDistributionError({
          message: `CIP36DelegationDistribution.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP36DelegationDistribution): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CIP36DelegationDistribution
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.CIP36DelegationDistribution,
) => Effect.Effect<Uint8Array, CIP36DelegationDistributionError> = Effect.fn(
  (instance: CML.CIP36DelegationDistribution) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CIP36DelegationDistributionError({
          message: `CIP36DelegationDistribution.toCborBytes failed CIP36DelegationDistribution is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.CIP36DelegationDistribution,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of CIP36DelegationDistribution
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.CIP36DelegationDistribution,
) => Effect.Effect<Uint8Array, CIP36DelegationDistributionError> = Effect.fn(
  (instance: CML.CIP36DelegationDistribution) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new CIP36DelegationDistributionError({
          message: `CIP36DelegationDistribution.toCanonicalCborBytes failed CIP36DelegationDistribution is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.CIP36DelegationDistribution,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of CIP36DelegationDistribution
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<
  CML.CIP36DelegationDistribution,
  CIP36DelegationDistributionError
> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.CIP36DelegationDistribution.from_cbor_bytes(cborBytes),
    catch: () =>
      new CIP36DelegationDistributionError({
        message: `CIP36DelegationDistribution.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls CIP36DelegationDistribution.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.CIP36DelegationDistribution => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CIP36DelegationDistribution
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.CIP36DelegationDistribution,
) => Effect.Effect<string, CIP36DelegationDistributionError> = Effect.fn(
  (instance: CML.CIP36DelegationDistribution) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CIP36DelegationDistributionError({
          message: `CIP36DelegationDistribution.toCborHex failed CIP36DelegationDistribution is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
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
  instance: CML.CIP36DelegationDistribution,
): string => Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of CIP36DelegationDistribution
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.CIP36DelegationDistribution,
) => Effect.Effect<string, CIP36DelegationDistributionError> = Effect.fn(
  (instance: CML.CIP36DelegationDistribution) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new CIP36DelegationDistributionError({
          message: `CIP36DelegationDistribution.toCanonicalCborHex failed CIP36DelegationDistribution is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.CIP36DelegationDistribution,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of CIP36DelegationDistribution
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<
  CML.CIP36DelegationDistribution,
  CIP36DelegationDistributionError
> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.CIP36DelegationDistribution.from_cbor_hex(cborBytes),
    catch: () =>
      new CIP36DelegationDistributionError({
        message: `CIP36DelegationDistribution.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls CIP36DelegationDistribution.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (
  cborBytes: string,
): CML.CIP36DelegationDistribution => Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CIP36DelegationDistribution
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.CIP36DelegationDistribution,
) => Effect.Effect<string, CIP36DelegationDistributionError> = Effect.fn(
  (instance: CML.CIP36DelegationDistribution) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP36DelegationDistributionError({
          message: `CIP36DelegationDistribution.toJson failed CIP36DelegationDistribution is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (
  instance: CML.CIP36DelegationDistribution,
): string => Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP36DelegationDistribution
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.CIP36DelegationDistribution,
) => Effect.Effect<any, CIP36DelegationDistributionError> = Effect.fn(
  (instance: CML.CIP36DelegationDistribution) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP36DelegationDistributionError({
          message: `CIP36DelegationDistribution.toJsValue failed CIP36DelegationDistribution is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (
  instance: CML.CIP36DelegationDistribution,
): any => Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP36DelegationDistribution
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<
  CML.CIP36DelegationDistribution,
  CIP36DelegationDistributionError
> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP36DelegationDistribution.from_json(json),
    catch: () =>
      new CIP36DelegationDistributionError({
        message: `CIP36DelegationDistribution.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls CIP36DelegationDistribution.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.CIP36DelegationDistribution =>
  Effect.runSync(fromJson(json));

/**
 * Static method newWeighted of CIP36DelegationDistribution
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newWeighted: (
  delegations: CML.CIP36DelegationList,
) => Effect.Effect<
  CML.CIP36DelegationDistribution,
  CIP36DelegationDistributionError
> = Effect.fn(function* (delegations: CML.CIP36DelegationList) {
  return yield* Effect.try({
    try: () => CML.CIP36DelegationDistribution.new_weighted(delegations),
    catch: () =>
      new CIP36DelegationDistributionError({
        message: `CIP36DelegationDistribution.newWeighted failed with parameters: ${delegations} (CIP36DelegationList). `,
      }),
  });
});

/**
 * Unsafely calls CIP36DelegationDistribution.newWeighted without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newWeightedUnsafe = (
  delegations: CML.CIP36DelegationList,
): CML.CIP36DelegationDistribution => Effect.runSync(newWeighted(delegations));

/**
 * Static method newLegacy of CIP36DelegationDistribution
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newLegacy: (
  legacy: CML.PublicKey,
) => Effect.Effect<
  CML.CIP36DelegationDistribution,
  CIP36DelegationDistributionError
> = Effect.fn(function* (legacy: CML.PublicKey) {
  return yield* Effect.try({
    try: () => CML.CIP36DelegationDistribution.new_legacy(legacy),
    catch: () =>
      new CIP36DelegationDistributionError({
        message: `CIP36DelegationDistribution.newLegacy failed with parameters: ${legacy} (PublicKey). `,
      }),
  });
});

/**
 * Unsafely calls CIP36DelegationDistribution.newLegacy without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newLegacyUnsafe = (
  legacy: CML.PublicKey,
): CML.CIP36DelegationDistribution => Effect.runSync(newLegacy(legacy));

/**
 * Method kind of CIP36DelegationDistribution
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind: (
  instance: CML.CIP36DelegationDistribution,
) => Effect.Effect<
  CML.DelegationDistributionKind,
  CIP36DelegationDistributionError
> = Effect.fn((instance: CML.CIP36DelegationDistribution) =>
  Effect.try({
    try: () => instance.kind(),
    catch: () =>
      new CIP36DelegationDistributionError({
        message: `CIP36DelegationDistribution.kind failed `,
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
  instance: CML.CIP36DelegationDistribution,
): CML.DelegationDistributionKind => Effect.runSync(kind(instance));

/**
 * Method asWeighted of CIP36DelegationDistribution
 *
 * @since 2.0.0
 * @category Methods
 */
export const asWeighted: (
  instance: CML.CIP36DelegationDistribution,
) => Effect.Effect<
  CML.CIP36DelegationList | undefined,
  CIP36DelegationDistributionError
> = Effect.fn((instance: CML.CIP36DelegationDistribution) =>
  Effect.try({
    try: () => instance.as_weighted(),
    catch: () =>
      new CIP36DelegationDistributionError({
        message: `CIP36DelegationDistribution.asWeighted failed `,
      }),
  }),
);

/**
 * Unsafely calls instance.asWeighted without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asWeightedUnsafe = (
  instance: CML.CIP36DelegationDistribution,
): CML.CIP36DelegationList | undefined => Effect.runSync(asWeighted(instance));

/**
 * Method asLegacy of CIP36DelegationDistribution
 *
 * @since 2.0.0
 * @category Methods
 */
export const asLegacy: (
  instance: CML.CIP36DelegationDistribution,
) => Effect.Effect<
  CML.PublicKey | undefined,
  CIP36DelegationDistributionError
> = Effect.fn((instance: CML.CIP36DelegationDistribution) =>
  Effect.try({
    try: () => instance.as_legacy(),
    catch: () =>
      new CIP36DelegationDistributionError({
        message: `CIP36DelegationDistribution.asLegacy failed `,
      }),
  }),
);

/**
 * Unsafely calls instance.asLegacy without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asLegacyUnsafe = (
  instance: CML.CIP36DelegationDistribution,
): CML.PublicKey | undefined => Effect.runSync(asLegacy(instance));
