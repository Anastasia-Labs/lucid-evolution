/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML RewardAddress class
 *
 * @since 2.0.0
 * @category Types
 */
export type RewardAddress = CML.RewardAddress;

/**
 * Error class for RewardAddress operations
 * 
 * This error is thrown when operations on RewardAddress instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class RewardAddressError extends Data.TaggedError("RewardAddressError")<{
  message?: string;
}> {}

/**
 * Method free of RewardAddress
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.RewardAddress) => Effect.Effect<void, RewardAddressError> = Effect.fn(
  (instance: CML.RewardAddress) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RewardAddressError({
          message: `RewardAddress.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.RewardAddress): void =>
  Effect.runSync(free(instance));

/**
 * Method toJson of RewardAddress
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.RewardAddress) => Effect.Effect<string, RewardAddressError> = Effect.fn(
  (instance: CML.RewardAddress) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new RewardAddressError({
          message: `RewardAddress.toJson failed RewardAddress is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.RewardAddress): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of RewardAddress
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.RewardAddress) => Effect.Effect<any, RewardAddressError> = Effect.fn(
  (instance: CML.RewardAddress) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new RewardAddressError({
          message: `RewardAddress.toJsValue failed RewardAddress is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.RewardAddress): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of RewardAddress
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.RewardAddress, RewardAddressError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.RewardAddress.from_json(json),
    catch: () => new RewardAddressError({
      message: `RewardAddress.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls RewardAddress.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.RewardAddress =>
  Effect.runSync(fromJson(json));

/**
 * Static method _new of RewardAddress
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (network: number, payment: CML.Credential) => Effect.Effect<CML.RewardAddress, RewardAddressError> = Effect.fn(function* (network: number, payment: CML.Credential) {
  return yield* Effect.try({
    try: () => CML.RewardAddress.new(network, payment),
    catch: () => new RewardAddressError({
      message: `RewardAddress._new failed with parameters: ${network}, ${payment} (Credential). `,
    }),
  });
});

/**
 * Unsafely calls RewardAddress._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (network: number, payment: CML.Credential): CML.RewardAddress =>
  Effect.runSync(_new(network, payment));

/**
 * Method toAddress of RewardAddress
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toAddress: (instance: CML.RewardAddress) => Effect.Effect<CML.Address, RewardAddressError> = Effect.fn(
  (instance: CML.RewardAddress) =>
    Effect.try({
      try: () => instance.to_address(),
      catch: () =>
        new RewardAddressError({
          message: `RewardAddress.toAddress failed RewardAddress is not valid for Address conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toAddress without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toAddressUnsafe = (instance: CML.RewardAddress): CML.Address =>
  Effect.runSync(toAddress(instance));

/**
 * Static method fromAddress of RewardAddress
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromAddress: (address: CML.Address) => Effect.Effect<CML.RewardAddress | undefined, RewardAddressError> = Effect.fn(function* (address: CML.Address) {
  return yield* Effect.try({
    try: () => CML.RewardAddress.from_address(address),
    catch: () => new RewardAddressError({
      message: `RewardAddress.fromAddress failed with parameters: ${address} (Address). `,
    }),
  });
});

/**
 * Unsafely calls RewardAddress.fromAddress without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromAddressUnsafe = (address: CML.Address): CML.RewardAddress | undefined =>
  Effect.runSync(fromAddress(address));

/**
 * Method networkId of RewardAddress
 * 
 * @since 2.0.0
 * @category Methods
 */
export const networkId: (instance: CML.RewardAddress) => Effect.Effect<number, RewardAddressError> = Effect.fn(
  (instance: CML.RewardAddress) =>
    Effect.try({
      try: () => instance.network_id(),
      catch: () =>
        new RewardAddressError({
          message: `RewardAddress.networkId failed `,
        }),
    })
);

/**
 * Unsafely calls instance.networkId without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const networkIdUnsafe = (instance: CML.RewardAddress): number =>
  Effect.runSync(networkId(instance));

/**
 * Method payment of RewardAddress
 * 
 * @since 2.0.0
 * @category Methods
 */
export const payment: (instance: CML.RewardAddress) => Effect.Effect<CML.Credential, RewardAddressError> = Effect.fn(
  (instance: CML.RewardAddress) =>
    Effect.try({
      try: () => instance.payment(),
      catch: () =>
        new RewardAddressError({
          message: `RewardAddress.payment failed `,
        }),
    })
);

/**
 * Unsafely calls instance.payment without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const paymentUnsafe = (instance: CML.RewardAddress): CML.Credential =>
  Effect.runSync(payment(instance));
