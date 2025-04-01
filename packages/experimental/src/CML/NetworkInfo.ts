/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML NetworkInfo class
 *
 * @since 2.0.0
 * @category Types
 */
export type NetworkInfo = CML.NetworkInfo;

/**
 * Error class for NetworkInfo operations
 * 
 * This error is thrown when operations on NetworkInfo instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class NetworkInfoError extends Data.TaggedError("NetworkInfoError")<{
  message?: string;
}> {}

/**
 * Method free of NetworkInfo
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.NetworkInfo) => Effect.Effect<void, NetworkInfoError> = Effect.fn(
  (instance: CML.NetworkInfo) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new NetworkInfoError({
          message: `NetworkInfo.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.NetworkInfo): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of NetworkInfo
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (networkId: number, protocolMagic: CML.ProtocolMagic) => Effect.Effect<CML.NetworkInfo, NetworkInfoError> = Effect.fn(function* (networkId: number, protocolMagic: CML.ProtocolMagic) {
  return yield* Effect.try({
    try: () => CML.NetworkInfo.new(networkId, protocolMagic),
    catch: () => new NetworkInfoError({
      message: `NetworkInfo._new failed with parameters: ${networkId}, ${protocolMagic} (ProtocolMagic). `,
    }),
  });
});

/**
 * Unsafely calls NetworkInfo._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (networkId: number, protocolMagic: CML.ProtocolMagic): CML.NetworkInfo =>
  Effect.runSync(_new(networkId, protocolMagic));

/**
 * Method networkId of NetworkInfo
 * 
 * @since 2.0.0
 * @category Methods
 */
export const networkId: (instance: CML.NetworkInfo) => Effect.Effect<number, NetworkInfoError> = Effect.fn(
  (instance: CML.NetworkInfo) =>
    Effect.try({
      try: () => instance.network_id(),
      catch: () =>
        new NetworkInfoError({
          message: `NetworkInfo.networkId failed `,
        }),
    })
);

/**
 * Unsafely calls instance.networkId without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const networkIdUnsafe = (instance: CML.NetworkInfo): number =>
  Effect.runSync(networkId(instance));

/**
 * Method protocolMagic of NetworkInfo
 * 
 * @since 2.0.0
 * @category Methods
 */
export const protocolMagic: (instance: CML.NetworkInfo) => Effect.Effect<CML.ProtocolMagic, NetworkInfoError> = Effect.fn(
  (instance: CML.NetworkInfo) =>
    Effect.try({
      try: () => instance.protocol_magic(),
      catch: () =>
        new NetworkInfoError({
          message: `NetworkInfo.protocolMagic failed `,
        }),
    })
);

/**
 * Unsafely calls instance.protocolMagic without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const protocolMagicUnsafe = (instance: CML.NetworkInfo): CML.ProtocolMagic =>
  Effect.runSync(protocolMagic(instance));

/**
 * Static method testnet of NetworkInfo
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const testnet: () => Effect.Effect<CML.NetworkInfo, NetworkInfoError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.NetworkInfo.testnet(),
    catch: () => new NetworkInfoError({
      message: `NetworkInfo.testnet failed `,
    }),
  });
});

/**
 * Unsafely calls NetworkInfo.testnet without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const testnetUnsafe = (): CML.NetworkInfo =>
  Effect.runSync(testnet());

/**
 * Static method mainnet of NetworkInfo
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const mainnet: () => Effect.Effect<CML.NetworkInfo, NetworkInfoError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.NetworkInfo.mainnet(),
    catch: () => new NetworkInfoError({
      message: `NetworkInfo.mainnet failed `,
    }),
  });
});

/**
 * Unsafely calls NetworkInfo.mainnet without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const mainnetUnsafe = (): CML.NetworkInfo =>
  Effect.runSync(mainnet());

/**
 * Static method preview of NetworkInfo
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const preview: () => Effect.Effect<CML.NetworkInfo, NetworkInfoError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.NetworkInfo.preview(),
    catch: () => new NetworkInfoError({
      message: `NetworkInfo.preview failed `,
    }),
  });
});

/**
 * Unsafely calls NetworkInfo.preview without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const previewUnsafe = (): CML.NetworkInfo =>
  Effect.runSync(preview());

/**
 * Static method preprod of NetworkInfo
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const preprod: () => Effect.Effect<CML.NetworkInfo, NetworkInfoError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.NetworkInfo.preprod(),
    catch: () => new NetworkInfoError({
      message: `NetworkInfo.preprod failed `,
    }),
  });
});

/**
 * Unsafely calls NetworkInfo.preprod without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const preprodUnsafe = (): CML.NetworkInfo =>
  Effect.runSync(preprod());

/**
 * Static method sanchoTestnet of NetworkInfo
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const sanchoTestnet: () => Effect.Effect<CML.NetworkInfo, NetworkInfoError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.NetworkInfo.sancho_testnet(),
    catch: () => new NetworkInfoError({
      message: `NetworkInfo.sanchoTestnet failed `,
    }),
  });
});

/**
 * Unsafely calls NetworkInfo.sanchoTestnet without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const sanchoTestnetUnsafe = (): CML.NetworkInfo =>
  Effect.runSync(sanchoTestnet());
