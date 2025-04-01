/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PointerAddress class
 *
 * @since 2.0.0
 * @category Types
 */
export type PointerAddress = CML.PointerAddress;

/**
 * Error class for PointerAddress operations
 *
 * This error is thrown when operations on PointerAddress instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PointerAddressError extends Data.TaggedError(
  "PointerAddressError",
)<{
  message?: string;
}> {}

/**
 * Method free of PointerAddress
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.PointerAddress,
) => Effect.Effect<void, PointerAddressError> = Effect.fn(
  (instance: CML.PointerAddress) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PointerAddressError({
          message: `PointerAddress.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PointerAddress): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of PointerAddress
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  network: number,
  payment: CML.Credential,
  stake: CML.Pointer,
) => Effect.Effect<CML.PointerAddress, PointerAddressError> = Effect.fn(
  function* (network: number, payment: CML.Credential, stake: CML.Pointer) {
    return yield* Effect.try({
      try: () => CML.PointerAddress.new(network, payment, stake),
      catch: () =>
        new PointerAddressError({
          message: `PointerAddress._new failed with parameters: ${network}, ${payment} (Credential), ${stake} (Pointer). `,
        }),
    });
  },
);

/**
 * Unsafely calls PointerAddress._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  network: number,
  payment: CML.Credential,
  stake: CML.Pointer,
): CML.PointerAddress => Effect.runSync(_new(network, payment, stake));

/**
 * Method toAddress of PointerAddress
 *
 * @since 2.0.0
 * @category Methods
 */
export const toAddress: (
  instance: CML.PointerAddress,
) => Effect.Effect<CML.Address, PointerAddressError> = Effect.fn(
  (instance: CML.PointerAddress) =>
    Effect.try({
      try: () => instance.to_address(),
      catch: () =>
        new PointerAddressError({
          message: `PointerAddress.toAddress failed PointerAddress is not valid for Address conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toAddress without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toAddressUnsafe = (instance: CML.PointerAddress): CML.Address =>
  Effect.runSync(toAddress(instance));

/**
 * Static method fromAddress of PointerAddress
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromAddress: (
  address: CML.Address,
) => Effect.Effect<CML.PointerAddress | undefined, PointerAddressError> =
  Effect.fn(function* (address: CML.Address) {
    return yield* Effect.try({
      try: () => CML.PointerAddress.from_address(address),
      catch: () =>
        new PointerAddressError({
          message: `PointerAddress.fromAddress failed with parameters: ${address} (Address). `,
        }),
    });
  });

/**
 * Unsafely calls PointerAddress.fromAddress without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromAddressUnsafe = (
  address: CML.Address,
): CML.PointerAddress | undefined => Effect.runSync(fromAddress(address));

/**
 * Method networkId of PointerAddress
 *
 * @since 2.0.0
 * @category Methods
 */
export const networkId: (
  instance: CML.PointerAddress,
) => Effect.Effect<number, PointerAddressError> = Effect.fn(
  (instance: CML.PointerAddress) =>
    Effect.try({
      try: () => instance.network_id(),
      catch: () =>
        new PointerAddressError({
          message: `PointerAddress.networkId failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.networkId without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const networkIdUnsafe = (instance: CML.PointerAddress): number =>
  Effect.runSync(networkId(instance));

/**
 * Method payment of PointerAddress
 *
 * @since 2.0.0
 * @category Methods
 */
export const payment: (
  instance: CML.PointerAddress,
) => Effect.Effect<CML.Credential, PointerAddressError> = Effect.fn(
  (instance: CML.PointerAddress) =>
    Effect.try({
      try: () => instance.payment(),
      catch: () =>
        new PointerAddressError({
          message: `PointerAddress.payment failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.payment without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const paymentUnsafe = (instance: CML.PointerAddress): CML.Credential =>
  Effect.runSync(payment(instance));

/**
 * Method stake of PointerAddress
 *
 * @since 2.0.0
 * @category Methods
 */
export const stake: (
  instance: CML.PointerAddress,
) => Effect.Effect<CML.Pointer, PointerAddressError> = Effect.fn(
  (instance: CML.PointerAddress) =>
    Effect.try({
      try: () => instance.stake(),
      catch: () =>
        new PointerAddressError({
          message: `PointerAddress.stake failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.stake without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakeUnsafe = (instance: CML.PointerAddress): CML.Pointer =>
  Effect.runSync(stake(instance));
