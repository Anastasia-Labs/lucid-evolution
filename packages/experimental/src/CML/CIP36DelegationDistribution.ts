import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type CIP36DelegationDistribution = CML.CIP36DelegationDistribution;

export class CIP36DelegationDistributionError extends Data.TaggedError("CIP36DelegationDistributionError")<{
  message?: string;
}> {}

/**
 * Method free of CIP36DelegationDistribution
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 *   const result = yield* CIP36DelegationDistribution.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.CIP36DelegationDistribution): Effect.Effect<void, CIP36DelegationDistributionError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP36DelegationDistributionError({
          message: `CIP36DelegationDistribution.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationDistribution.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationDistribution.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.CIP36DelegationDistribution): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CIP36DelegationDistribution
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 *   const result = yield* CIP36DelegationDistribution.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.CIP36DelegationDistribution): Effect.Effect<Uint8Array, CIP36DelegationDistributionError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CIP36DelegationDistributionError({
          message: `CIP36DelegationDistribution.toCborBytes failed CIP36DelegationDistribution is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationDistribution.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationDistribution.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.CIP36DelegationDistribution): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of CIP36DelegationDistribution
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 *   const result = yield* CIP36DelegationDistribution.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.CIP36DelegationDistribution): Effect.Effect<Uint8Array, CIP36DelegationDistributionError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new CIP36DelegationDistributionError({
          message: `CIP36DelegationDistribution.toCanonicalCborBytes failed CIP36DelegationDistribution is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationDistribution.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationDistribution.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.CIP36DelegationDistribution): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of CIP36DelegationDistribution
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP36DelegationDistribution.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.CIP36DelegationDistribution.from_cbor_bytes(cborBytes),
    catch: () => new CIP36DelegationDistributionError({
      message: `CIP36DelegationDistribution.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls CIP36DelegationDistribution.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationDistribution.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationDistribution.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CIP36DelegationDistribution
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 *   const result = yield* CIP36DelegationDistribution.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.CIP36DelegationDistribution): Effect.Effect<string, CIP36DelegationDistributionError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CIP36DelegationDistributionError({
          message: `CIP36DelegationDistribution.toCborHex failed CIP36DelegationDistribution is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationDistribution.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationDistribution.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.CIP36DelegationDistribution): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of CIP36DelegationDistribution
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 *   const result = yield* CIP36DelegationDistribution.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.CIP36DelegationDistribution): Effect.Effect<string, CIP36DelegationDistributionError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new CIP36DelegationDistributionError({
          message: `CIP36DelegationDistribution.toCanonicalCborHex failed CIP36DelegationDistribution is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationDistribution.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationDistribution.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.CIP36DelegationDistribution): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of CIP36DelegationDistribution
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP36DelegationDistribution.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.CIP36DelegationDistribution.from_cbor_hex(cborBytes),
    catch: () => new CIP36DelegationDistributionError({
      message: `CIP36DelegationDistribution.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls CIP36DelegationDistribution.fromCborHex without Effect wrapper
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationDistribution.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationDistribution.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CIP36DelegationDistribution
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 *   const result = yield* CIP36DelegationDistribution.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.CIP36DelegationDistribution): Effect.Effect<string, CIP36DelegationDistributionError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP36DelegationDistributionError({
          message: `CIP36DelegationDistribution.toJson failed CIP36DelegationDistribution is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationDistribution.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationDistribution.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.CIP36DelegationDistribution): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP36DelegationDistribution
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 *   const result = yield* CIP36DelegationDistribution.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.CIP36DelegationDistribution): Effect.Effect<any, CIP36DelegationDistributionError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP36DelegationDistributionError({
          message: `CIP36DelegationDistribution.toJsValue failed CIP36DelegationDistribution is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationDistribution.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationDistribution.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.CIP36DelegationDistribution): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP36DelegationDistribution
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP36DelegationDistribution.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP36DelegationDistribution.from_json(json),
    catch: () => new CIP36DelegationDistributionError({
      message: `CIP36DelegationDistribution.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls CIP36DelegationDistribution.fromJson without Effect wrapper
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationDistribution.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationDistribution.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Static method newWeighted of CIP36DelegationDistribution
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP36DelegationDistribution.newWeighted( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newWeighted = Effect.fn(function* (delegations: CML.CIP36DelegationList) {
  return yield* Effect.try({
    try: () => CML.CIP36DelegationDistribution.new_weighted(delegations),
    catch: () => new CIP36DelegationDistributionError({
      message: `CIP36DelegationDistribution.newWeighted failed with parameters: ${delegations} (CIP36DelegationList). `,
    }),
  });
});

/**
 * Unsafely calls CIP36DelegationDistribution.newWeighted without Effect wrapper
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationDistribution.unsafeNewWeighted( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationDistribution.unsafeNewWeighted failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewWeighted = (delegations: CML.CIP36DelegationList) =>
  Effect.runSync(newWeighted(delegations));

/**
 * Static method newLegacy of CIP36DelegationDistribution
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP36DelegationDistribution.newLegacy( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newLegacy = Effect.fn(function* (legacy: CML.PublicKey) {
  return yield* Effect.try({
    try: () => CML.CIP36DelegationDistribution.new_legacy(legacy),
    catch: () => new CIP36DelegationDistributionError({
      message: `CIP36DelegationDistribution.newLegacy failed with parameters: ${legacy} (PublicKey). `,
    }),
  });
});

/**
 * Unsafely calls CIP36DelegationDistribution.newLegacy without Effect wrapper
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationDistribution.unsafeNewLegacy( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationDistribution.unsafeNewLegacy failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewLegacy = (legacy: CML.PublicKey) =>
  Effect.runSync(newLegacy(legacy));

/**
 * Method kind of CIP36DelegationDistribution
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 *   const result = yield* CIP36DelegationDistribution.kind(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (instance: CML.CIP36DelegationDistribution): Effect.Effect<CML.DelegationDistributionKind, CIP36DelegationDistributionError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new CIP36DelegationDistributionError({
          message: `CIP36DelegationDistribution.kind failed `,
        }),
    })
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationDistribution.unsafeKind(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationDistribution.unsafeKind failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKind = (instance: CML.CIP36DelegationDistribution): CML.DelegationDistributionKind =>
  Effect.runSync(kind(instance));

/**
 * Method asWeighted of CIP36DelegationDistribution
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 *   const result = yield* CIP36DelegationDistribution.asWeighted(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asWeighted = Effect.fn(
  (instance: CML.CIP36DelegationDistribution): Effect.Effect<CML.CIP36DelegationList | undefined, CIP36DelegationDistributionError> =>
    Effect.try({
      try: () => instance.as_weighted(),
      catch: () =>
        new CIP36DelegationDistributionError({
          message: `CIP36DelegationDistribution.asWeighted failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asWeighted without Effect wrapper
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationDistribution.unsafeAsWeighted(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationDistribution.unsafeAsWeighted failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsWeighted = (instance: CML.CIP36DelegationDistribution): CML.CIP36DelegationList | undefined =>
  Effect.runSync(asWeighted(instance));

/**
 * Method asLegacy of CIP36DelegationDistribution
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 *   const result = yield* CIP36DelegationDistribution.asLegacy(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asLegacy = Effect.fn(
  (instance: CML.CIP36DelegationDistribution): Effect.Effect<CML.PublicKey | undefined, CIP36DelegationDistributionError> =>
    Effect.try({
      try: () => instance.as_legacy(),
      catch: () =>
        new CIP36DelegationDistributionError({
          message: `CIP36DelegationDistribution.asLegacy failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asLegacy without Effect wrapper
 * 
 * @example
 * import { CIP36DelegationDistribution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36DelegationDistribution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationDistribution.unsafeAsLegacy(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationDistribution.unsafeAsLegacy failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsLegacy = (instance: CML.CIP36DelegationDistribution): CML.PublicKey | undefined =>
  Effect.runSync(asLegacy(instance));
