import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type PoolParams = CML.PoolParams;

export class PoolParamsError extends Data.TaggedError("PoolParamsError")<{
  message?: string;
}> {}

/**
 * Method free of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 *   const result = yield* PoolParams.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.PoolParams): Effect.Effect<void, PoolParamsError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.PoolParams): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 *   const result = yield* PoolParams.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.PoolParams): Effect.Effect<Uint8Array, PoolParamsError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.toCborBytes failed PoolParams is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.PoolParams): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 *   const result = yield* PoolParams.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.PoolParams): Effect.Effect<Uint8Array, PoolParamsError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.toCanonicalCborBytes failed PoolParams is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.PoolParams): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PoolParams.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PoolParams.from_cbor_bytes(cborBytes),
    catch: () => new PoolParamsError({
      message: `PoolParams.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls PoolParams.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 *   const result = yield* PoolParams.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.PoolParams): Effect.Effect<string, PoolParamsError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.toCborHex failed PoolParams is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.PoolParams): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 *   const result = yield* PoolParams.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.PoolParams): Effect.Effect<string, PoolParamsError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.toCanonicalCborHex failed PoolParams is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.PoolParams): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PoolParams.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.PoolParams.from_cbor_hex(cborBytes),
    catch: () => new PoolParamsError({
      message: `PoolParams.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls PoolParams.fromCborHex without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 *   const result = yield* PoolParams.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.PoolParams): Effect.Effect<string, PoolParamsError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.toJson failed PoolParams is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.PoolParams): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 *   const result = yield* PoolParams.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.PoolParams): Effect.Effect<any, PoolParamsError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.toJsValue failed PoolParams is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.PoolParams): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PoolParams.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.PoolParams.from_json(json),
    catch: () => new PoolParamsError({
      message: `PoolParams.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls PoolParams.fromJson without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method operator of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 *   const result = yield* PoolParams.operator(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const operator = Effect.fn(
  (instance: CML.PoolParams): Effect.Effect<CML.Ed25519KeyHash, PoolParamsError> =>
    Effect.try({
      try: () => instance.operator(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.operator failed `,
        }),
    })
);

/**
 * Unsafely calls instance.operator without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafeOperator(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafeOperator failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeOperator = (instance: CML.PoolParams): CML.Ed25519KeyHash =>
  Effect.runSync(operator(instance));

/**
 * Method vrfKeyhash of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 *   const result = yield* PoolParams.vrfKeyhash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const vrfKeyhash = Effect.fn(
  (instance: CML.PoolParams): Effect.Effect<CML.VRFKeyHash, PoolParamsError> =>
    Effect.try({
      try: () => instance.vrf_keyhash(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.vrfKeyhash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.vrfKeyhash without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafeVrfKeyhash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafeVrfKeyhash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeVrfKeyhash = (instance: CML.PoolParams): CML.VRFKeyHash =>
  Effect.runSync(vrfKeyhash(instance));

/**
 * Method pledge of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 *   const result = yield* PoolParams.pledge(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const pledge = Effect.fn(
  (instance: CML.PoolParams): Effect.Effect<bigint, PoolParamsError> =>
    Effect.try({
      try: () => instance.pledge(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.pledge failed `,
        }),
    })
);

/**
 * Unsafely calls instance.pledge without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafePledge(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafePledge failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePledge = (instance: CML.PoolParams): bigint =>
  Effect.runSync(pledge(instance));

/**
 * Method cost of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 *   const result = yield* PoolParams.cost(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const cost = Effect.fn(
  (instance: CML.PoolParams): Effect.Effect<bigint, PoolParamsError> =>
    Effect.try({
      try: () => instance.cost(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.cost failed `,
        }),
    })
);

/**
 * Unsafely calls instance.cost without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafeCost(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafeCost failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCost = (instance: CML.PoolParams): bigint =>
  Effect.runSync(cost(instance));

/**
 * Method margin of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 *   const result = yield* PoolParams.margin(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const margin = Effect.fn(
  (instance: CML.PoolParams): Effect.Effect<CML.UnitInterval, PoolParamsError> =>
    Effect.try({
      try: () => instance.margin(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.margin failed `,
        }),
    })
);

/**
 * Unsafely calls instance.margin without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafeMargin(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafeMargin failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMargin = (instance: CML.PoolParams): CML.UnitInterval =>
  Effect.runSync(margin(instance));

/**
 * Method rewardAccount of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 *   const result = yield* PoolParams.rewardAccount(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const rewardAccount = Effect.fn(
  (instance: CML.PoolParams): Effect.Effect<CML.RewardAddress, PoolParamsError> =>
    Effect.try({
      try: () => instance.reward_account(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.rewardAccount failed `,
        }),
    })
);

/**
 * Unsafely calls instance.rewardAccount without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafeRewardAccount(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafeRewardAccount failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeRewardAccount = (instance: CML.PoolParams): CML.RewardAddress =>
  Effect.runSync(rewardAccount(instance));

/**
 * Method poolOwners of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 *   const result = yield* PoolParams.poolOwners(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const poolOwners = Effect.fn(
  (instance: CML.PoolParams): Effect.Effect<CML.Ed25519KeyHashList, PoolParamsError> =>
    Effect.try({
      try: () => instance.pool_owners(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.poolOwners failed `,
        }),
    })
);

/**
 * Unsafely calls instance.poolOwners without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafePoolOwners(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafePoolOwners failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePoolOwners = (instance: CML.PoolParams): CML.Ed25519KeyHashList =>
  Effect.runSync(poolOwners(instance));

/**
 * Method relays of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 *   const result = yield* PoolParams.relays(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const relays = Effect.fn(
  (instance: CML.PoolParams): Effect.Effect<CML.RelayList, PoolParamsError> =>
    Effect.try({
      try: () => instance.relays(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.relays failed `,
        }),
    })
);

/**
 * Unsafely calls instance.relays without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafeRelays(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafeRelays failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeRelays = (instance: CML.PoolParams): CML.RelayList =>
  Effect.runSync(relays(instance));

/**
 * Method poolMetadata of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 *   const result = yield* PoolParams.poolMetadata(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const poolMetadata = Effect.fn(
  (instance: CML.PoolParams): Effect.Effect<CML.PoolMetadata | undefined, PoolParamsError> =>
    Effect.try({
      try: () => instance.pool_metadata(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.poolMetadata failed `,
        }),
    })
);

/**
 * Unsafely calls instance.poolMetadata without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolParams instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafePoolMetadata(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafePoolMetadata failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePoolMetadata = (instance: CML.PoolParams): CML.PoolMetadata | undefined =>
  Effect.runSync(poolMetadata(instance));

/**
 * Static method _new of PoolParams
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PoolParams._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (operator: CML.Ed25519KeyHash, vrfKeyhash: CML.VRFKeyHash, pledge: bigint, cost: bigint, margin: CML.UnitInterval, rewardAccount: CML.RewardAddress, poolOwners: CML.Ed25519KeyHashList, relays: CML.RelayList, poolMetadata: CML.PoolMetadata) {
  return yield* Effect.try({
    try: () => CML.PoolParams.new(operator, vrfKeyhash, pledge, cost, margin, rewardAccount, poolOwners, relays, poolMetadata),
    catch: () => new PoolParamsError({
      message: `PoolParams._new failed with parameters: ${operator} (Ed25519KeyHash), ${vrfKeyhash} (VRFKeyHash), ${pledge}, ${cost}, ${margin} (UnitInterval), ${rewardAccount} (RewardAddress), ${poolOwners} (Ed25519KeyHashList), ${relays} (RelayList), ${poolMetadata} (PoolMetadata). `,
    }),
  });
});

/**
 * Unsafely calls PoolParams._new without Effect wrapper
 * 
 * @example
 * import { PoolParams } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolParams.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolParams.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (operator: CML.Ed25519KeyHash, vrfKeyhash: CML.VRFKeyHash, pledge: bigint, cost: bigint, margin: CML.UnitInterval, rewardAccount: CML.RewardAddress, poolOwners: CML.Ed25519KeyHashList, relays: CML.RelayList, poolMetadata: CML.PoolMetadata) =>
  Effect.runSync(_new(operator, vrfKeyhash, pledge, cost, margin, rewardAccount, poolOwners, relays, poolMetadata));
