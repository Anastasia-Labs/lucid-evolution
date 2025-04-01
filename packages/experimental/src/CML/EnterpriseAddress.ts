/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML EnterpriseAddress class
 *
 * @since 2.0.0
 * @category Types
 */
export type EnterpriseAddress = CML.EnterpriseAddress;

/**
 * Error class for EnterpriseAddress operations
 *
 * This error is thrown when operations on EnterpriseAddress instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class EnterpriseAddressError extends Data.TaggedError(
  "EnterpriseAddressError",
)<{
  message?: string;
}> {}

/**
 * Method free of EnterpriseAddress
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.EnterpriseAddress,
) => Effect.Effect<void, EnterpriseAddressError> = Effect.fn(
  (instance: CML.EnterpriseAddress) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new EnterpriseAddressError({
          message: `EnterpriseAddress.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.EnterpriseAddress): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of EnterpriseAddress
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  network: number,
  payment: CML.Credential,
) => Effect.Effect<CML.EnterpriseAddress, EnterpriseAddressError> = Effect.fn(
  function* (network: number, payment: CML.Credential) {
    return yield* Effect.try({
      try: () => CML.EnterpriseAddress.new(network, payment),
      catch: () =>
        new EnterpriseAddressError({
          message: `EnterpriseAddress._new failed with parameters: ${network}, ${payment} (Credential). `,
        }),
    });
  },
);

/**
 * Unsafely calls EnterpriseAddress._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  network: number,
  payment: CML.Credential,
): CML.EnterpriseAddress => Effect.runSync(_new(network, payment));

/**
 * Method toAddress of EnterpriseAddress
 *
 * @since 2.0.0
 * @category Methods
 */
export const toAddress: (
  instance: CML.EnterpriseAddress,
) => Effect.Effect<CML.Address, EnterpriseAddressError> = Effect.fn(
  (instance: CML.EnterpriseAddress) =>
    Effect.try({
      try: () => instance.to_address(),
      catch: () =>
        new EnterpriseAddressError({
          message: `EnterpriseAddress.toAddress failed EnterpriseAddress is not valid for Address conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toAddress without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toAddressUnsafe = (instance: CML.EnterpriseAddress): CML.Address =>
  Effect.runSync(toAddress(instance));

/**
 * Static method fromAddress of EnterpriseAddress
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromAddress: (
  address: CML.Address,
) => Effect.Effect<CML.EnterpriseAddress | undefined, EnterpriseAddressError> =
  Effect.fn(function* (address: CML.Address) {
    return yield* Effect.try({
      try: () => CML.EnterpriseAddress.from_address(address),
      catch: () =>
        new EnterpriseAddressError({
          message: `EnterpriseAddress.fromAddress failed with parameters: ${address} (Address). `,
        }),
    });
  });

/**
 * Unsafely calls EnterpriseAddress.fromAddress without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromAddressUnsafe = (
  address: CML.Address,
): CML.EnterpriseAddress | undefined => Effect.runSync(fromAddress(address));

/**
 * Method networkId of EnterpriseAddress
 *
 * @since 2.0.0
 * @category Methods
 */
export const networkId: (
  instance: CML.EnterpriseAddress,
) => Effect.Effect<number, EnterpriseAddressError> = Effect.fn(
  (instance: CML.EnterpriseAddress) =>
    Effect.try({
      try: () => instance.network_id(),
      catch: () =>
        new EnterpriseAddressError({
          message: `EnterpriseAddress.networkId failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.networkId without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const networkIdUnsafe = (instance: CML.EnterpriseAddress): number =>
  Effect.runSync(networkId(instance));

/**
 * Method payment of EnterpriseAddress
 *
 * @since 2.0.0
 * @category Methods
 */
export const payment: (
  instance: CML.EnterpriseAddress,
) => Effect.Effect<CML.Credential, EnterpriseAddressError> = Effect.fn(
  (instance: CML.EnterpriseAddress) =>
    Effect.try({
      try: () => instance.payment(),
      catch: () =>
        new EnterpriseAddressError({
          message: `EnterpriseAddress.payment failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.payment without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const paymentUnsafe = (
  instance: CML.EnterpriseAddress,
): CML.Credential => Effect.runSync(payment(instance));
