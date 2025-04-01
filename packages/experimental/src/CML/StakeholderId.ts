/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML StakeholderId class
 *
 * @since 2.0.0
 * @category Types
 */
export type StakeholderId = CML.StakeholderId;

/**
 * Error class for StakeholderId operations
 *
 * This error is thrown when operations on StakeholderId instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class StakeholderIdError extends Data.TaggedError("StakeholderIdError")<{
  message?: string;
}> {}

/**
 * Method free of StakeholderId
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.StakeholderId,
) => Effect.Effect<void, StakeholderIdError> = Effect.fn(
  (instance: CML.StakeholderId) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new StakeholderIdError({
          message: `StakeholderId.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.StakeholderId): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of StakeholderId
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32: (
  instance: CML.StakeholderId,
  prefix: string,
) => Effect.Effect<string, StakeholderIdError> = Effect.fn(
  (instance: CML.StakeholderId, prefix: string) =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new StakeholderIdError({
          message: `StakeholderId.toBech32 failed with parameters: ${prefix}. StakeholderId is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (
  instance: CML.StakeholderId,
  prefix: string,
): string => Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of StakeholderId
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.StakeholderId, StakeholderIdError> = Effect.fn(
  function* (bech32Str: string) {
    return yield* Effect.try({
      try: () => CML.StakeholderId.from_bech32(bech32Str),
      catch: () =>
        new StakeholderIdError({
          message: `StakeholderId.fromBech32 failed with parameters: ${bech32Str}. `,
        }),
    });
  },
);

/**
 * Unsafely calls StakeholderId.fromBech32 without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string): CML.StakeholderId =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of StakeholderId
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (
  instance: CML.StakeholderId,
) => Effect.Effect<Uint8Array, StakeholderIdError> = Effect.fn(
  (instance: CML.StakeholderId) =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new StakeholderIdError({
          message: `StakeholderId.toRawBytes failed StakeholderId is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.StakeholderId): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of StakeholderId
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.StakeholderId, StakeholderIdError> = Effect.fn(
  function* (bytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.StakeholderId.from_raw_bytes(bytes),
      catch: () =>
        new StakeholderIdError({
          message: `StakeholderId.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls StakeholderId.fromRawBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array): CML.StakeholderId =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of StakeholderId
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (
  instance: CML.StakeholderId,
) => Effect.Effect<string, StakeholderIdError> = Effect.fn(
  (instance: CML.StakeholderId) =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new StakeholderIdError({
          message: `StakeholderId.toHex failed StakeholderId is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.StakeholderId): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of StakeholderId
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (
  input: string,
) => Effect.Effect<CML.StakeholderId, StakeholderIdError> = Effect.fn(
  function* (input: string) {
    return yield* Effect.try({
      try: () => CML.StakeholderId.from_hex(input),
      catch: () =>
        new StakeholderIdError({
          message: `StakeholderId.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
        }),
    });
  },
);

/**
 * Unsafely calls StakeholderId.fromHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string): CML.StakeholderId =>
  Effect.runSync(fromHex(input));

/**
 * Static method _new of StakeholderId
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  pubk: CML.Bip32PublicKey,
) => Effect.Effect<CML.StakeholderId, StakeholderIdError> = Effect.fn(
  function* (pubk: CML.Bip32PublicKey) {
    return yield* Effect.try({
      try: () => CML.StakeholderId.new(pubk),
      catch: () =>
        new StakeholderIdError({
          message: `StakeholderId._new failed with parameters: ${pubk} (Bip32PublicKey). `,
        }),
    });
  },
);

/**
 * Unsafely calls StakeholderId._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (pubk: CML.Bip32PublicKey): CML.StakeholderId =>
  Effect.runSync(_new(pubk));
