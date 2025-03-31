/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Bip32PrivateKey class
 *
 * @since 2.0.0
 * @category Types
 */
export type Bip32PrivateKey = CML.Bip32PrivateKey;

/**
 * Error class for Bip32PrivateKey operations
 * 
 * This error is thrown when operations on Bip32PrivateKey instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class Bip32PrivateKeyError extends Data.TaggedError("Bip32PrivateKeyError")<{
  message?: string;
}> {}

/**
 * Method free of Bip32PrivateKey
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Bip32PrivateKey instance
 * const instance = ... ;
 *   const result = yield* Bip32PrivateKey.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Bip32PrivateKey): Effect.Effect<void, Bip32PrivateKeyError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new Bip32PrivateKeyError({
          message: `Bip32PrivateKey.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Bip32PrivateKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PrivateKey.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PrivateKey.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Bip32PrivateKey): void =>
  Effect.runSync(free(instance));

/**
 * Method derive of Bip32PrivateKey
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Bip32PrivateKey instance
 * const instance = ... ;
 *   const result = yield* Bip32PrivateKey.derive(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const derive = Effect.fn(
  (instance: CML.Bip32PrivateKey, index: number): Effect.Effect<CML.Bip32PrivateKey, Bip32PrivateKeyError> =>
    Effect.try({
      try: () => instance.derive(index),
      catch: () =>
        new Bip32PrivateKeyError({
          message: `Bip32PrivateKey.derive failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.derive without Effect wrapper
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Bip32PrivateKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PrivateKey.deriveUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PrivateKey.deriveUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const deriveUnsafe = (instance: CML.Bip32PrivateKey, index: number): CML.Bip32PrivateKey =>
  Effect.runSync(derive(instance, index));

/**
 * Static method from_128Xprv of Bip32PrivateKey
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Bip32PrivateKey.from_128Xprv( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const from_128Xprv = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Bip32PrivateKey.from_128_xprv(bytes),
    catch: () => new Bip32PrivateKeyError({
      message: `Bip32PrivateKey.from_128Xprv failed with parameters: ${bytes}. `,
    }),
  });
});

/**
 * Unsafely calls Bip32PrivateKey.from_128Xprv without Effect wrapper
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PrivateKey.from_128XprvUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PrivateKey.from_128XprvUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const from_128XprvUnsafe = (bytes: Uint8Array) =>
  Effect.runSync(from_128Xprv(bytes));

/**
 * Method to_128Xprv of Bip32PrivateKey
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Bip32PrivateKey instance
 * const instance = ... ;
 *   const result = yield* Bip32PrivateKey.to_128Xprv(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const to_128Xprv = Effect.fn(
  (instance: CML.Bip32PrivateKey): Effect.Effect<Uint8Array, Bip32PrivateKeyError> =>
    Effect.try({
      try: () => instance.to_128_xprv(),
      catch: () =>
        new Bip32PrivateKeyError({
          message: `Bip32PrivateKey.to_128Xprv failed Bip32PrivateKey is not valid for Uint8Array conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.to_128Xprv without Effect wrapper
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Bip32PrivateKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PrivateKey.to_128XprvUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PrivateKey.to_128XprvUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const to_128XprvUnsafe = (instance: CML.Bip32PrivateKey): Uint8Array =>
  Effect.runSync(to_128Xprv(instance));

/**
 * Static method generateEd25519Bip32 of Bip32PrivateKey
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Bip32PrivateKey.generateEd25519Bip32();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const generateEd25519Bip32 = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.Bip32PrivateKey.generate_ed25519_bip32(),
    catch: () => new Bip32PrivateKeyError({
      message: `Bip32PrivateKey.generateEd25519Bip32 failed `,
    }),
  });
});

/**
 * Unsafely calls Bip32PrivateKey.generateEd25519Bip32 without Effect wrapper
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PrivateKey.generateEd25519Bip32Unsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PrivateKey.generateEd25519Bip32Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const generateEd25519Bip32Unsafe = () =>
  Effect.runSync(generateEd25519Bip32());

/**
 * Method toRawKey of Bip32PrivateKey
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Bip32PrivateKey instance
 * const instance = ... ;
 *   const result = yield* Bip32PrivateKey.toRawKey(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawKey = Effect.fn(
  (instance: CML.Bip32PrivateKey): Effect.Effect<CML.PrivateKey, Bip32PrivateKeyError> =>
    Effect.try({
      try: () => instance.to_raw_key(),
      catch: () =>
        new Bip32PrivateKeyError({
          message: `Bip32PrivateKey.toRawKey failed Bip32PrivateKey is not valid for PrivateKey conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toRawKey without Effect wrapper
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Bip32PrivateKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PrivateKey.toRawKeyUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PrivateKey.toRawKeyUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawKeyUnsafe = (instance: CML.Bip32PrivateKey): CML.PrivateKey =>
  Effect.runSync(toRawKey(instance));

/**
 * Method toPublic of Bip32PrivateKey
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Bip32PrivateKey instance
 * const instance = ... ;
 *   const result = yield* Bip32PrivateKey.toPublic(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toPublic = Effect.fn(
  (instance: CML.Bip32PrivateKey): Effect.Effect<CML.Bip32PublicKey, Bip32PrivateKeyError> =>
    Effect.try({
      try: () => instance.to_public(),
      catch: () =>
        new Bip32PrivateKeyError({
          message: `Bip32PrivateKey.toPublic failed Bip32PrivateKey is not valid for Bip32PublicKey conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toPublic without Effect wrapper
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Bip32PrivateKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PrivateKey.toPublicUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PrivateKey.toPublicUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toPublicUnsafe = (instance: CML.Bip32PrivateKey): CML.Bip32PublicKey =>
  Effect.runSync(toPublic(instance));

/**
 * Static method fromRawBytes of Bip32PrivateKey
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Bip32PrivateKey.fromRawBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Bip32PrivateKey.from_raw_bytes(bytes),
    catch: () => new Bip32PrivateKeyError({
      message: `Bip32PrivateKey.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Bip32PrivateKey.fromRawBytes without Effect wrapper
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PrivateKey.fromRawBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PrivateKey.fromRawBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toRawBytes of Bip32PrivateKey
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Bip32PrivateKey instance
 * const instance = ... ;
 *   const result = yield* Bip32PrivateKey.toRawBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.Bip32PrivateKey): Effect.Effect<Uint8Array, Bip32PrivateKeyError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new Bip32PrivateKeyError({
          message: `Bip32PrivateKey.toRawBytes failed Bip32PrivateKey is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Bip32PrivateKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PrivateKey.toRawBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PrivateKey.toRawBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.Bip32PrivateKey): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromBech32 of Bip32PrivateKey
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Bip32PrivateKey.fromBech32( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.Bip32PrivateKey.from_bech32(bech32Str),
    catch: () => new Bip32PrivateKeyError({
      message: `Bip32PrivateKey.fromBech32 failed with parameters: ${bech32Str}. `,
    }),
  });
});

/**
 * Unsafely calls Bip32PrivateKey.fromBech32 without Effect wrapper
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PrivateKey.fromBech32Unsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PrivateKey.fromBech32Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toBech32 of Bip32PrivateKey
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Bip32PrivateKey instance
 * const instance = ... ;
 *   const result = yield* Bip32PrivateKey.toBech32(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (instance: CML.Bip32PrivateKey): Effect.Effect<string, Bip32PrivateKeyError> =>
    Effect.try({
      try: () => instance.to_bech32(),
      catch: () =>
        new Bip32PrivateKeyError({
          message: `Bip32PrivateKey.toBech32 failed Bip32PrivateKey is not valid for string conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Bip32PrivateKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PrivateKey.toBech32Unsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PrivateKey.toBech32Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (instance: CML.Bip32PrivateKey): string =>
  Effect.runSync(toBech32(instance));

/**
 * Static method fromBip39Entropy of Bip32PrivateKey
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Bip32PrivateKey.fromBip39Entropy( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBip39Entropy = Effect.fn(function* (entropy: Uint8Array, password: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Bip32PrivateKey.from_bip39_entropy(entropy, password),
    catch: () => new Bip32PrivateKeyError({
      message: `Bip32PrivateKey.fromBip39Entropy failed with parameters: ${entropy}, ${password}. `,
    }),
  });
});

/**
 * Unsafely calls Bip32PrivateKey.fromBip39Entropy without Effect wrapper
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PrivateKey.fromBip39EntropyUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PrivateKey.fromBip39EntropyUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBip39EntropyUnsafe = (entropy: Uint8Array, password: Uint8Array) =>
  Effect.runSync(fromBip39Entropy(entropy, password));

/**
 * Method chaincode of Bip32PrivateKey
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Bip32PrivateKey instance
 * const instance = ... ;
 *   const result = yield* Bip32PrivateKey.chaincode(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const chaincode = Effect.fn(
  (instance: CML.Bip32PrivateKey): Effect.Effect<Uint8Array, Bip32PrivateKeyError> =>
    Effect.try({
      try: () => instance.chaincode(),
      catch: () =>
        new Bip32PrivateKeyError({
          message: `Bip32PrivateKey.chaincode failed `,
        }),
    })
);

/**
 * Unsafely calls instance.chaincode without Effect wrapper
 * 
 * @example
 * import { Bip32PrivateKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Bip32PrivateKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PrivateKey.chaincodeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PrivateKey.chaincodeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const chaincodeUnsafe = (instance: CML.Bip32PrivateKey): Uint8Array =>
  Effect.runSync(chaincode(instance));
