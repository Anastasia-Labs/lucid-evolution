/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PoolParams class
 *
 * @since 2.0.0
 * @category Types
 */
export type PoolParams = CML.PoolParams;

/**
 * Error class for PoolParams operations
 *
 * This error is thrown when operations on PoolParams instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PoolParamsError extends Data.TaggedError("PoolParamsError")<{
  message?: string;
}> {}

/**
 * Method free of PoolParams
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.PoolParams,
) => Effect.Effect<void, PoolParamsError> = Effect.fn(
  (instance: CML.PoolParams) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PoolParams): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of PoolParams
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.PoolParams,
) => Effect.Effect<Uint8Array, PoolParamsError> = Effect.fn(
  (instance: CML.PoolParams) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.toCborBytes failed PoolParams is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.PoolParams): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of PoolParams
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.PoolParams,
) => Effect.Effect<Uint8Array, PoolParamsError> = Effect.fn(
  (instance: CML.PoolParams) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.toCanonicalCborBytes failed PoolParams is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.PoolParams,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of PoolParams
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.PoolParams, PoolParamsError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.PoolParams.from_cbor_bytes(cborBytes),
    catch: () =>
      new PoolParamsError({
        message: `PoolParams.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls PoolParams.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.PoolParams =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of PoolParams
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.PoolParams,
) => Effect.Effect<string, PoolParamsError> = Effect.fn(
  (instance: CML.PoolParams) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.toCborHex failed PoolParams is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.PoolParams): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of PoolParams
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.PoolParams,
) => Effect.Effect<string, PoolParamsError> = Effect.fn(
  (instance: CML.PoolParams) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.toCanonicalCborHex failed PoolParams is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.PoolParams): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of PoolParams
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.PoolParams, PoolParamsError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.PoolParams.from_cbor_hex(cborBytes),
    catch: () =>
      new PoolParamsError({
        message: `PoolParams.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls PoolParams.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.PoolParams =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of PoolParams
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.PoolParams,
) => Effect.Effect<string, PoolParamsError> = Effect.fn(
  (instance: CML.PoolParams) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.toJson failed PoolParams is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.PoolParams): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of PoolParams
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.PoolParams,
) => Effect.Effect<any, PoolParamsError> = Effect.fn(
  (instance: CML.PoolParams) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.toJsValue failed PoolParams is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.PoolParams): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of PoolParams
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.PoolParams, PoolParamsError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.PoolParams.from_json(json),
    catch: () =>
      new PoolParamsError({
        message: `PoolParams.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls PoolParams.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.PoolParams =>
  Effect.runSync(fromJson(json));

/**
 * Method operator of PoolParams
 *
 * @since 2.0.0
 * @category Methods
 */
export const operator: (
  instance: CML.PoolParams,
) => Effect.Effect<CML.Ed25519KeyHash, PoolParamsError> = Effect.fn(
  (instance: CML.PoolParams) =>
    Effect.try({
      try: () => instance.operator(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.operator failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.operator without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const operatorUnsafe = (instance: CML.PoolParams): CML.Ed25519KeyHash =>
  Effect.runSync(operator(instance));

/**
 * Method vrfKeyhash of PoolParams
 *
 * @since 2.0.0
 * @category Methods
 */
export const vrfKeyhash: (
  instance: CML.PoolParams,
) => Effect.Effect<CML.VRFKeyHash, PoolParamsError> = Effect.fn(
  (instance: CML.PoolParams) =>
    Effect.try({
      try: () => instance.vrf_keyhash(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.vrfKeyhash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.vrfKeyhash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const vrfKeyhashUnsafe = (instance: CML.PoolParams): CML.VRFKeyHash =>
  Effect.runSync(vrfKeyhash(instance));

/**
 * Method pledge of PoolParams
 *
 * @since 2.0.0
 * @category Methods
 */
export const pledge: (
  instance: CML.PoolParams,
) => Effect.Effect<bigint, PoolParamsError> = Effect.fn(
  (instance: CML.PoolParams) =>
    Effect.try({
      try: () => instance.pledge(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.pledge failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.pledge without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const pledgeUnsafe = (instance: CML.PoolParams): bigint =>
  Effect.runSync(pledge(instance));

/**
 * Method cost of PoolParams
 *
 * @since 2.0.0
 * @category Methods
 */
export const cost: (
  instance: CML.PoolParams,
) => Effect.Effect<bigint, PoolParamsError> = Effect.fn(
  (instance: CML.PoolParams) =>
    Effect.try({
      try: () => instance.cost(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.cost failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.cost without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const costUnsafe = (instance: CML.PoolParams): bigint =>
  Effect.runSync(cost(instance));

/**
 * Method margin of PoolParams
 *
 * @since 2.0.0
 * @category Methods
 */
export const margin: (
  instance: CML.PoolParams,
) => Effect.Effect<CML.UnitInterval, PoolParamsError> = Effect.fn(
  (instance: CML.PoolParams) =>
    Effect.try({
      try: () => instance.margin(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.margin failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.margin without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const marginUnsafe = (instance: CML.PoolParams): CML.UnitInterval =>
  Effect.runSync(margin(instance));

/**
 * Method rewardAccount of PoolParams
 *
 * @since 2.0.0
 * @category Methods
 */
export const rewardAccount: (
  instance: CML.PoolParams,
) => Effect.Effect<CML.RewardAddress, PoolParamsError> = Effect.fn(
  (instance: CML.PoolParams) =>
    Effect.try({
      try: () => instance.reward_account(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.rewardAccount failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.rewardAccount without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const rewardAccountUnsafe = (
  instance: CML.PoolParams,
): CML.RewardAddress => Effect.runSync(rewardAccount(instance));

/**
 * Method poolOwners of PoolParams
 *
 * @since 2.0.0
 * @category Methods
 */
export const poolOwners: (
  instance: CML.PoolParams,
) => Effect.Effect<CML.Ed25519KeyHashList, PoolParamsError> = Effect.fn(
  (instance: CML.PoolParams) =>
    Effect.try({
      try: () => instance.pool_owners(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.poolOwners failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.poolOwners without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const poolOwnersUnsafe = (
  instance: CML.PoolParams,
): CML.Ed25519KeyHashList => Effect.runSync(poolOwners(instance));

/**
 * Method relays of PoolParams
 *
 * @since 2.0.0
 * @category Methods
 */
export const relays: (
  instance: CML.PoolParams,
) => Effect.Effect<CML.RelayList, PoolParamsError> = Effect.fn(
  (instance: CML.PoolParams) =>
    Effect.try({
      try: () => instance.relays(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.relays failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.relays without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const relaysUnsafe = (instance: CML.PoolParams): CML.RelayList =>
  Effect.runSync(relays(instance));

/**
 * Method poolMetadata of PoolParams
 *
 * @since 2.0.0
 * @category Methods
 */
export const poolMetadata: (
  instance: CML.PoolParams,
) => Effect.Effect<CML.PoolMetadata | undefined, PoolParamsError> = Effect.fn(
  (instance: CML.PoolParams) =>
    Effect.try({
      try: () => instance.pool_metadata(),
      catch: () =>
        new PoolParamsError({
          message: `PoolParams.poolMetadata failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.poolMetadata without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const poolMetadataUnsafe = (
  instance: CML.PoolParams,
): CML.PoolMetadata | undefined => Effect.runSync(poolMetadata(instance));

/**
 * Static method _new of PoolParams
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  operator: CML.Ed25519KeyHash,
  vrfKeyhash: CML.VRFKeyHash,
  pledge: bigint,
  cost: bigint,
  margin: CML.UnitInterval,
  rewardAccount: CML.RewardAddress,
  poolOwners: CML.Ed25519KeyHashList,
  relays: CML.RelayList,
  poolMetadata: CML.PoolMetadata,
) => Effect.Effect<CML.PoolParams, PoolParamsError> = Effect.fn(function* (
  operator: CML.Ed25519KeyHash,
  vrfKeyhash: CML.VRFKeyHash,
  pledge: bigint,
  cost: bigint,
  margin: CML.UnitInterval,
  rewardAccount: CML.RewardAddress,
  poolOwners: CML.Ed25519KeyHashList,
  relays: CML.RelayList,
  poolMetadata: CML.PoolMetadata,
) {
  return yield* Effect.try({
    try: () =>
      CML.PoolParams.new(
        operator,
        vrfKeyhash,
        pledge,
        cost,
        margin,
        rewardAccount,
        poolOwners,
        relays,
        poolMetadata,
      ),
    catch: () =>
      new PoolParamsError({
        message: `PoolParams._new failed with parameters: ${operator} (Ed25519KeyHash), ${vrfKeyhash} (VRFKeyHash), ${pledge}, ${cost}, ${margin} (UnitInterval), ${rewardAccount} (RewardAddress), ${poolOwners} (Ed25519KeyHashList), ${relays} (RelayList), ${poolMetadata} (PoolMetadata). `,
      }),
  });
});

/**
 * Unsafely calls PoolParams._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  operator: CML.Ed25519KeyHash,
  vrfKeyhash: CML.VRFKeyHash,
  pledge: bigint,
  cost: bigint,
  margin: CML.UnitInterval,
  rewardAccount: CML.RewardAddress,
  poolOwners: CML.Ed25519KeyHashList,
  relays: CML.RelayList,
  poolMetadata: CML.PoolMetadata,
): CML.PoolParams =>
  Effect.runSync(
    _new(
      operator,
      vrfKeyhash,
      pledge,
      cost,
      margin,
      rewardAccount,
      poolOwners,
      relays,
      poolMetadata,
    ),
  );
