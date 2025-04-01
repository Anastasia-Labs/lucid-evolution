/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML BaseAddress class
 *
 * @since 2.0.0
 * @category Types
 */
export type BaseAddress = CML.BaseAddress;

/**
 * Error class for BaseAddress operations
 *
 * This error is thrown when operations on BaseAddress instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class BaseAddressError extends Data.TaggedError("BaseAddressError")<{
  message?: string;
}> {}

/**
 * Method free of BaseAddress
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.BaseAddress,
) => Effect.Effect<void, BaseAddressError> = Effect.fn(
  (instance: CML.BaseAddress) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new BaseAddressError({
          message: `BaseAddress.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.BaseAddress): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of BaseAddress
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  network: number,
  payment: CML.Credential,
  stake: CML.Credential,
) => Effect.Effect<CML.BaseAddress, BaseAddressError> = Effect.fn(function* (
  network: number,
  payment: CML.Credential,
  stake: CML.Credential,
) {
  return yield* Effect.try({
    try: () => CML.BaseAddress.new(network, payment, stake),
    catch: () =>
      new BaseAddressError({
        message: `BaseAddress._new failed with parameters: ${network}, ${payment} (Credential), ${stake} (Credential). `,
      }),
  });
});

/**
 * Unsafely calls BaseAddress._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  network: number,
  payment: CML.Credential,
  stake: CML.Credential,
): CML.BaseAddress => Effect.runSync(_new(network, payment, stake));

/**
 * Method toAddress of BaseAddress
 *
 * @since 2.0.0
 * @category Methods
 */
export const toAddress: (
  instance: CML.BaseAddress,
) => Effect.Effect<CML.Address, BaseAddressError> = Effect.fn(
  (instance: CML.BaseAddress) =>
    Effect.try({
      try: () => instance.to_address(),
      catch: () =>
        new BaseAddressError({
          message: `BaseAddress.toAddress failed BaseAddress is not valid for Address conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toAddress without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toAddressUnsafe = (instance: CML.BaseAddress): CML.Address =>
  Effect.runSync(toAddress(instance));

/**
 * Static method fromAddress of BaseAddress
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromAddress: (
  address: CML.Address,
) => Effect.Effect<CML.BaseAddress | undefined, BaseAddressError> = Effect.fn(
  function* (address: CML.Address) {
    return yield* Effect.try({
      try: () => CML.BaseAddress.from_address(address),
      catch: () =>
        new BaseAddressError({
          message: `BaseAddress.fromAddress failed with parameters: ${address} (Address). `,
        }),
    });
  },
);

/**
 * Unsafely calls BaseAddress.fromAddress without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromAddressUnsafe = (
  address: CML.Address,
): CML.BaseAddress | undefined => Effect.runSync(fromAddress(address));

/**
 * Method networkId of BaseAddress
 *
 * @since 2.0.0
 * @category Methods
 */
export const networkId: (
  instance: CML.BaseAddress,
) => Effect.Effect<number, BaseAddressError> = Effect.fn(
  (instance: CML.BaseAddress) =>
    Effect.try({
      try: () => instance.network_id(),
      catch: () =>
        new BaseAddressError({
          message: `BaseAddress.networkId failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.networkId without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const networkIdUnsafe = (instance: CML.BaseAddress): number =>
  Effect.runSync(networkId(instance));

/**
 * Method payment of BaseAddress
 *
 * @since 2.0.0
 * @category Methods
 */
export const payment: (
  instance: CML.BaseAddress,
) => Effect.Effect<CML.Credential, BaseAddressError> = Effect.fn(
  (instance: CML.BaseAddress) =>
    Effect.try({
      try: () => instance.payment(),
      catch: () =>
        new BaseAddressError({
          message: `BaseAddress.payment failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.payment without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const paymentUnsafe = (instance: CML.BaseAddress): CML.Credential =>
  Effect.runSync(payment(instance));

/**
 * Method stake of BaseAddress
 *
 * @since 2.0.0
 * @category Methods
 */
export const stake: (
  instance: CML.BaseAddress,
) => Effect.Effect<CML.Credential, BaseAddressError> = Effect.fn(
  (instance: CML.BaseAddress) =>
    Effect.try({
      try: () => instance.stake(),
      catch: () =>
        new BaseAddressError({
          message: `BaseAddress.stake failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.stake without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakeUnsafe = (instance: CML.BaseAddress): CML.Credential =>
  Effect.runSync(stake(instance));
