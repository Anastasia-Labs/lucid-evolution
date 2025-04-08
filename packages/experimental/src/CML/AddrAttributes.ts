/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML AddrAttributes class
 *
 * @since 2.0.0
 * @category Types
 */
export type AddrAttributes = CML.AddrAttributes;

/**
 * Error class for AddrAttributes operations
 *
 * This error is thrown when operations on AddrAttributes instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class AddrAttributesError extends Data.TaggedError(
  "AddrAttributesError",
)<{
  message?: string;
}> {}

/**
 * Method free of AddrAttributes
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.AddrAttributes,
) => Effect.Effect<void, AddrAttributesError> = Effect.fn(
  (instance: CML.AddrAttributes) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new AddrAttributesError({
          message: `AddrAttributes.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.AddrAttributes): void =>
  Effect.runSync(free(instance));

/**
 * Static method newBootstrapEra of AddrAttributes
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newBootstrapEra: (
  hdap: CML.HDAddressPayload,
  protocolMagic: CML.ProtocolMagic,
) => Effect.Effect<CML.AddrAttributes, AddrAttributesError> = Effect.fn(
  function* (hdap: CML.HDAddressPayload, protocolMagic: CML.ProtocolMagic) {
    return yield* Effect.try({
      try: () => CML.AddrAttributes.new_bootstrap_era(hdap, protocolMagic),
      catch: () =>
        new AddrAttributesError({
          message: `AddrAttributes.newBootstrapEra failed with parameters: ${hdap} (HDAddressPayload), ${protocolMagic} (ProtocolMagic). Hint: Not all AddrAttributes instances can be stringified.`,
        }),
    });
  },
);

/**
 * Unsafely calls AddrAttributes.newBootstrapEra without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newBootstrapEraUnsafe = (
  hdap: CML.HDAddressPayload,
  protocolMagic: CML.ProtocolMagic,
): CML.AddrAttributes => Effect.runSync(newBootstrapEra(hdap, protocolMagic));

/**
 * Static method newSingleKey of AddrAttributes
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newSingleKey: (
  pubk: CML.Bip32PublicKey,
  hdap: CML.HDAddressPayload | undefined,
  protocolMagic: CML.ProtocolMagic,
) => Effect.Effect<CML.AddrAttributes, AddrAttributesError> = Effect.fn(
  function* (
    pubk: CML.Bip32PublicKey,
    hdap: CML.HDAddressPayload | undefined,
    protocolMagic: CML.ProtocolMagic,
  ) {
    return yield* Effect.try({
      try: () => CML.AddrAttributes.new_single_key(pubk, hdap, protocolMagic),
      catch: () =>
        new AddrAttributesError({
          message: `AddrAttributes.newSingleKey failed with parameters: ${pubk} (Bip32PublicKey), ${hdap}, ${protocolMagic} (ProtocolMagic). `,
        }),
    });
  },
);

/**
 * Unsafely calls AddrAttributes.newSingleKey without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newSingleKeyUnsafe = (
  pubk: CML.Bip32PublicKey,
  hdap: CML.HDAddressPayload | undefined,
  protocolMagic: CML.ProtocolMagic,
): CML.AddrAttributes =>
  Effect.runSync(newSingleKey(pubk, hdap, protocolMagic));

/**
 * Method toCborBytes of AddrAttributes
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.AddrAttributes,
) => Effect.Effect<Uint8Array, AddrAttributesError> = Effect.fn(
  (instance: CML.AddrAttributes) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new AddrAttributesError({
          message: `AddrAttributes.toCborBytes failed AddrAttributes is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.AddrAttributes): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of AddrAttributes
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.AddrAttributes, AddrAttributesError> = Effect.fn(
  function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.AddrAttributes.from_cbor_bytes(cborBytes),
      catch: () =>
        new AddrAttributesError({
          message: `AddrAttributes.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls AddrAttributes.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.AddrAttributes => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of AddrAttributes
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.AddrAttributes,
) => Effect.Effect<string, AddrAttributesError> = Effect.fn(
  (instance: CML.AddrAttributes) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new AddrAttributesError({
          message: `AddrAttributes.toCborHex failed AddrAttributes is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.AddrAttributes): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of AddrAttributes
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.AddrAttributes, AddrAttributesError> = Effect.fn(
  function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.AddrAttributes.from_cbor_hex(cborBytes),
      catch: () =>
        new AddrAttributesError({
          message: `AddrAttributes.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  },
);

/**
 * Unsafely calls AddrAttributes.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.AddrAttributes =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method setStakeDistribution of AddrAttributes
 *
 * @since 2.0.0
 * @category Methods
 */
export const setStakeDistribution: (
  instance: CML.AddrAttributes,
  stakeDistribution: CML.StakeDistribution,
) => Effect.Effect<void, AddrAttributesError> = Effect.fn(
  (instance: CML.AddrAttributes, stakeDistribution: CML.StakeDistribution) =>
    Effect.try({
      try: () => instance.set_stake_distribution(stakeDistribution),
      catch: () =>
        new AddrAttributesError({
          message: `AddrAttributes.setStakeDistribution failed with parameters: ${stakeDistribution} (StakeDistribution). Hint: Not all AddrAttributes instances can be stringified.`,
        }),
    }),
);

/**
 * Unsafely calls instance.setStakeDistribution without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setStakeDistributionUnsafe = (
  instance: CML.AddrAttributes,
  stakeDistribution: CML.StakeDistribution,
): void => Effect.runSync(setStakeDistribution(instance, stakeDistribution));

/**
 * Method stakeDistribution of AddrAttributes
 *
 * @since 2.0.0
 * @category Methods
 */
export const stakeDistribution: (
  instance: CML.AddrAttributes,
) => Effect.Effect<CML.StakeDistribution | undefined, AddrAttributesError> =
  Effect.fn((instance: CML.AddrAttributes) =>
    Effect.try({
      try: () => instance.stake_distribution(),
      catch: () =>
        new AddrAttributesError({
          message: `AddrAttributes.stakeDistribution failed Hint: Not all AddrAttributes instances can be stringified.`,
        }),
    }),
  );

/**
 * Unsafely calls instance.stakeDistribution without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakeDistributionUnsafe = (
  instance: CML.AddrAttributes,
): CML.StakeDistribution | undefined =>
  Effect.runSync(stakeDistribution(instance));

/**
 * Method setDerivationPath of AddrAttributes
 *
 * @since 2.0.0
 * @category Methods
 */
export const setDerivationPath: (
  instance: CML.AddrAttributes,
  derivationPath: CML.HDAddressPayload,
) => Effect.Effect<void, AddrAttributesError> = Effect.fn(
  (instance: CML.AddrAttributes, derivationPath: CML.HDAddressPayload) =>
    Effect.try({
      try: () => instance.set_derivation_path(derivationPath),
      catch: () =>
        new AddrAttributesError({
          message: `AddrAttributes.setDerivationPath failed with parameters: ${derivationPath} (HDAddressPayload). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setDerivationPath without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setDerivationPathUnsafe = (
  instance: CML.AddrAttributes,
  derivationPath: CML.HDAddressPayload,
): void => Effect.runSync(setDerivationPath(instance, derivationPath));

/**
 * Method derivationPath of AddrAttributes
 *
 * @since 2.0.0
 * @category Methods
 */
export const derivationPath: (
  instance: CML.AddrAttributes,
) => Effect.Effect<CML.HDAddressPayload | undefined, AddrAttributesError> =
  Effect.fn((instance: CML.AddrAttributes) =>
    Effect.try({
      try: () => instance.derivation_path(),
      catch: () =>
        new AddrAttributesError({
          message: `AddrAttributes.derivationPath failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.derivationPath without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const derivationPathUnsafe = (
  instance: CML.AddrAttributes,
): CML.HDAddressPayload | undefined => Effect.runSync(derivationPath(instance));

/**
 * Method setProtocolMagic of AddrAttributes
 *
 * @since 2.0.0
 * @category Methods
 */
export const setProtocolMagic: (
  instance: CML.AddrAttributes,
  protocolMagic: CML.ProtocolMagic,
) => Effect.Effect<void, AddrAttributesError> = Effect.fn(
  (instance: CML.AddrAttributes, protocolMagic: CML.ProtocolMagic) =>
    Effect.try({
      try: () => instance.set_protocol_magic(protocolMagic),
      catch: () =>
        new AddrAttributesError({
          message: `AddrAttributes.setProtocolMagic failed with parameters: ${protocolMagic} (ProtocolMagic). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setProtocolMagic without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setProtocolMagicUnsafe = (
  instance: CML.AddrAttributes,
  protocolMagic: CML.ProtocolMagic,
): void => Effect.runSync(setProtocolMagic(instance, protocolMagic));

/**
 * Method protocolMagic of AddrAttributes
 *
 * @since 2.0.0
 * @category Methods
 */
export const protocolMagic: (
  instance: CML.AddrAttributes,
) => Effect.Effect<CML.ProtocolMagic | undefined, AddrAttributesError> =
  Effect.fn((instance: CML.AddrAttributes) =>
    Effect.try({
      try: () => instance.protocol_magic(),
      catch: () =>
        new AddrAttributesError({
          message: `AddrAttributes.protocolMagic failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.protocolMagic without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const protocolMagicUnsafe = (
  instance: CML.AddrAttributes,
): CML.ProtocolMagic | undefined => Effect.runSync(protocolMagic(instance));

/**
 * Static method _new of AddrAttributes
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.AddrAttributes,
  AddrAttributesError
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.AddrAttributes.new(),
    catch: () =>
      new AddrAttributesError({
        message: `AddrAttributes._new failed `,
      }),
  });
});

/**
 * Unsafely calls AddrAttributes._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.AddrAttributes => Effect.runSync(_new());
