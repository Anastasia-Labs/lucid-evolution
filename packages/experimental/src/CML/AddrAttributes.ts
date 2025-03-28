import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type AddrAttributes = CML.AddrAttributes;

export class AddrAttributesError extends Data.TaggedError(
  "AddrAttributesError",
)<{
  message?: string;
}> {}

/**
 * Method free of AddrAttributes
 *
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddrAttributes instance
 * const instance = ... ;
 *   const result = yield* AddrAttributes.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.AddrAttributes): Effect.Effect<void, AddrAttributesError> =>
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
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AddrAttributes instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddrAttributes.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddrAttributes.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.AddrAttributes): void =>
  Effect.runSync(free(instance));

/**
 * Static method newBootstrapEra of AddrAttributes
 *
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AddrAttributes.newBootstrapEra( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newBootstrapEra = Effect.fn(function* (
  hdap: CML.HDAddressPayload,
  protocolMagic: CML.ProtocolMagic,
) {
  return yield* Effect.try({
    try: () => CML.AddrAttributes.new_bootstrap_era(hdap, protocolMagic),
    catch: () =>
      new AddrAttributesError({
        message: `AddrAttributes.newBootstrapEra failed with parameters: ${hdap} (HDAddressPayload), ${protocolMagic} (ProtocolMagic). Hint: Not all AddrAttributes instances can be stringified.`,
      }),
  });
});

/**
 * Unsafely calls AddrAttributes.newBootstrapEra without Effect wrapper
 *
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddrAttributes.unsafeNewBootstrapEra( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddrAttributes.unsafeNewBootstrapEra failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewBootstrapEra = (
  hdap: CML.HDAddressPayload,
  protocolMagic: CML.ProtocolMagic,
) => Effect.runSync(newBootstrapEra(hdap, protocolMagic));

/**
 * Static method newSingleKey of AddrAttributes
 *
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AddrAttributes.newSingleKey( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newSingleKey = Effect.fn(function* (
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
});

/**
 * Unsafely calls AddrAttributes.newSingleKey without Effect wrapper
 *
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddrAttributes.unsafeNewSingleKey( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddrAttributes.unsafeNewSingleKey failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewSingleKey = (
  pubk: CML.Bip32PublicKey,
  hdap: CML.HDAddressPayload | undefined,
  protocolMagic: CML.ProtocolMagic,
) => Effect.runSync(newSingleKey(pubk, hdap, protocolMagic));

/**
 * Method toCborBytes of AddrAttributes
 *
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddrAttributes instance
 * const instance = ... ;
 *   const result = yield* AddrAttributes.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.AddrAttributes,
  ): Effect.Effect<Uint8Array, AddrAttributesError> =>
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
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AddrAttributes instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddrAttributes.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddrAttributes.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.AddrAttributes): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of AddrAttributes
 *
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AddrAttributes.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.AddrAttributes.from_cbor_bytes(cborBytes),
    catch: () =>
      new AddrAttributesError({
        message: `AddrAttributes.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls AddrAttributes.fromCborBytes without Effect wrapper
 *
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddrAttributes.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddrAttributes.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of AddrAttributes
 *
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddrAttributes instance
 * const instance = ... ;
 *   const result = yield* AddrAttributes.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.AddrAttributes): Effect.Effect<string, AddrAttributesError> =>
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
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AddrAttributes instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddrAttributes.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddrAttributes.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.AddrAttributes): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of AddrAttributes
 *
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AddrAttributes.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.AddrAttributes.from_cbor_hex(cborBytes),
    catch: () =>
      new AddrAttributesError({
        message: `AddrAttributes.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls AddrAttributes.fromCborHex without Effect wrapper
 *
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddrAttributes.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddrAttributes.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method setStakeDistribution of AddrAttributes
 *
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddrAttributes instance
 * const instance = ... ;
 *   const result = yield* AddrAttributes.setStakeDistribution(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setStakeDistribution = Effect.fn(
  (
    instance: CML.AddrAttributes,
    stakeDistribution: CML.StakeDistribution,
  ): Effect.Effect<void, AddrAttributesError> =>
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
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AddrAttributes instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddrAttributes.unsafeSetStakeDistribution(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddrAttributes.unsafeSetStakeDistribution failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetStakeDistribution = (
  instance: CML.AddrAttributes,
  stakeDistribution: CML.StakeDistribution,
): void => Effect.runSync(setStakeDistribution(instance, stakeDistribution));

/**
 * Method stakeDistribution of AddrAttributes
 *
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddrAttributes instance
 * const instance = ... ;
 *   const result = yield* AddrAttributes.stakeDistribution(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const stakeDistribution = Effect.fn(
  (
    instance: CML.AddrAttributes,
  ): Effect.Effect<CML.StakeDistribution | undefined, AddrAttributesError> =>
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
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AddrAttributes instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddrAttributes.unsafeStakeDistribution(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddrAttributes.unsafeStakeDistribution failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeStakeDistribution = (
  instance: CML.AddrAttributes,
): CML.StakeDistribution | undefined =>
  Effect.runSync(stakeDistribution(instance));

/**
 * Method setDerivationPath of AddrAttributes
 *
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddrAttributes instance
 * const instance = ... ;
 *   const result = yield* AddrAttributes.setDerivationPath(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setDerivationPath = Effect.fn(
  (
    instance: CML.AddrAttributes,
    derivationPath: CML.HDAddressPayload,
  ): Effect.Effect<void, AddrAttributesError> =>
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
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AddrAttributes instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddrAttributes.unsafeSetDerivationPath(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddrAttributes.unsafeSetDerivationPath failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetDerivationPath = (
  instance: CML.AddrAttributes,
  derivationPath: CML.HDAddressPayload,
): void => Effect.runSync(setDerivationPath(instance, derivationPath));

/**
 * Method derivationPath of AddrAttributes
 *
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddrAttributes instance
 * const instance = ... ;
 *   const result = yield* AddrAttributes.derivationPath(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const derivationPath = Effect.fn(
  (
    instance: CML.AddrAttributes,
  ): Effect.Effect<CML.HDAddressPayload | undefined, AddrAttributesError> =>
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
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AddrAttributes instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddrAttributes.unsafeDerivationPath(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddrAttributes.unsafeDerivationPath failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeDerivationPath = (
  instance: CML.AddrAttributes,
): CML.HDAddressPayload | undefined => Effect.runSync(derivationPath(instance));

/**
 * Method setProtocolMagic of AddrAttributes
 *
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddrAttributes instance
 * const instance = ... ;
 *   const result = yield* AddrAttributes.setProtocolMagic(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setProtocolMagic = Effect.fn(
  (
    instance: CML.AddrAttributes,
    protocolMagic: CML.ProtocolMagic,
  ): Effect.Effect<void, AddrAttributesError> =>
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
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AddrAttributes instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddrAttributes.unsafeSetProtocolMagic(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddrAttributes.unsafeSetProtocolMagic failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetProtocolMagic = (
  instance: CML.AddrAttributes,
  protocolMagic: CML.ProtocolMagic,
): void => Effect.runSync(setProtocolMagic(instance, protocolMagic));

/**
 * Method protocolMagic of AddrAttributes
 *
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddrAttributes instance
 * const instance = ... ;
 *   const result = yield* AddrAttributes.protocolMagic(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const protocolMagic = Effect.fn(
  (
    instance: CML.AddrAttributes,
  ): Effect.Effect<CML.ProtocolMagic | undefined, AddrAttributesError> =>
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
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AddrAttributes instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddrAttributes.unsafeProtocolMagic(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddrAttributes.unsafeProtocolMagic failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeProtocolMagic = (
  instance: CML.AddrAttributes,
): CML.ProtocolMagic | undefined => Effect.runSync(protocolMagic(instance));

/**
 * Static method _new of AddrAttributes
 *
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AddrAttributes._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
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
 * @example
 * import { AddrAttributes } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddrAttributes.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddrAttributes.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());
