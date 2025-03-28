import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type SpendingData = CML.SpendingData;

export class SpendingDataError extends Data.TaggedError("SpendingDataError")<{
  message?: string;
}> {}

/**
 * Method free of SpendingData
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SpendingData instance
 * const instance = ... ;
 *   const result = yield* SpendingData.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.SpendingData): Effect.Effect<void, SpendingDataError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new SpendingDataError({
          message: `SpendingData.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SpendingData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SpendingData.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SpendingData.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.SpendingData): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of SpendingData
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SpendingData instance
 * const instance = ... ;
 *   const result = yield* SpendingData.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.SpendingData): Effect.Effect<Uint8Array, SpendingDataError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new SpendingDataError({
          message: `SpendingData.toCborBytes failed SpendingData is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SpendingData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SpendingData.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SpendingData.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.SpendingData): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of SpendingData
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* SpendingData.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.SpendingData.from_cbor_bytes(cborBytes),
    catch: () =>
      new SpendingDataError({
        message: `SpendingData.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls SpendingData.fromCborBytes without Effect wrapper
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SpendingData.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SpendingData.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of SpendingData
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SpendingData instance
 * const instance = ... ;
 *   const result = yield* SpendingData.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.SpendingData): Effect.Effect<string, SpendingDataError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new SpendingDataError({
          message: `SpendingData.toCborHex failed SpendingData is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SpendingData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SpendingData.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SpendingData.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.SpendingData): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of SpendingData
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* SpendingData.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.SpendingData.from_cbor_hex(cborBytes),
    catch: () =>
      new SpendingDataError({
        message: `SpendingData.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls SpendingData.fromCborHex without Effect wrapper
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SpendingData.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SpendingData.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Static method newSpendingDataPubKey of SpendingData
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* SpendingData.newSpendingDataPubKey( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newSpendingDataPubKey = Effect.fn(function* (
  pubkey: CML.Bip32PublicKey,
) {
  return yield* Effect.try({
    try: () => CML.SpendingData.new_spending_data_pub_key(pubkey),
    catch: () =>
      new SpendingDataError({
        message: `SpendingData.newSpendingDataPubKey failed with parameters: ${pubkey} (Bip32PublicKey). `,
      }),
  });
});

/**
 * Unsafely calls SpendingData.newSpendingDataPubKey without Effect wrapper
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SpendingData.unsafeNewSpendingDataPubKey( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SpendingData.unsafeNewSpendingDataPubKey failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewSpendingDataPubKey = (pubkey: CML.Bip32PublicKey) =>
  Effect.runSync(newSpendingDataPubKey(pubkey));

/**
 * Static method newSpendingDataScript of SpendingData
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* SpendingData.newSpendingDataScript( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newSpendingDataScript = Effect.fn(function* (
  script: CML.ByronScript,
) {
  return yield* Effect.try({
    try: () => CML.SpendingData.new_spending_data_script(script),
    catch: () =>
      new SpendingDataError({
        message: `SpendingData.newSpendingDataScript failed with parameters: ${script} (ByronScript). `,
      }),
  });
});

/**
 * Unsafely calls SpendingData.newSpendingDataScript without Effect wrapper
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SpendingData.unsafeNewSpendingDataScript( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SpendingData.unsafeNewSpendingDataScript failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewSpendingDataScript = (script: CML.ByronScript) =>
  Effect.runSync(newSpendingDataScript(script));

/**
 * Static method newSpendingDataRedeem of SpendingData
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* SpendingData.newSpendingDataRedeem( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newSpendingDataRedeem = Effect.fn(function* (
  redeem: CML.PublicKey,
) {
  return yield* Effect.try({
    try: () => CML.SpendingData.new_spending_data_redeem(redeem),
    catch: () =>
      new SpendingDataError({
        message: `SpendingData.newSpendingDataRedeem failed with parameters: ${redeem} (PublicKey). `,
      }),
  });
});

/**
 * Unsafely calls SpendingData.newSpendingDataRedeem without Effect wrapper
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SpendingData.unsafeNewSpendingDataRedeem( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SpendingData.unsafeNewSpendingDataRedeem failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewSpendingDataRedeem = (redeem: CML.PublicKey) =>
  Effect.runSync(newSpendingDataRedeem(redeem));

/**
 * Method kind of SpendingData
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SpendingData instance
 * const instance = ... ;
 *   const result = yield* SpendingData.kind(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (
    instance: CML.SpendingData,
  ): Effect.Effect<CML.SpendingDataKind, SpendingDataError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new SpendingDataError({
          message: `SpendingData.kind failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SpendingData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SpendingData.unsafeKind(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SpendingData.unsafeKind failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKind = (instance: CML.SpendingData): CML.SpendingDataKind =>
  Effect.runSync(kind(instance));

/**
 * Method asSpendingDataPubKey of SpendingData
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SpendingData instance
 * const instance = ... ;
 *   const result = yield* SpendingData.asSpendingDataPubKey(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asSpendingDataPubKey = Effect.fn(
  (
    instance: CML.SpendingData,
  ): Effect.Effect<CML.Bip32PublicKey | undefined, SpendingDataError> =>
    Effect.try({
      try: () => instance.as_spending_data_pub_key(),
      catch: () =>
        new SpendingDataError({
          message: `SpendingData.asSpendingDataPubKey failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asSpendingDataPubKey without Effect wrapper
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SpendingData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SpendingData.unsafeAsSpendingDataPubKey(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SpendingData.unsafeAsSpendingDataPubKey failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsSpendingDataPubKey = (
  instance: CML.SpendingData,
): CML.Bip32PublicKey | undefined =>
  Effect.runSync(asSpendingDataPubKey(instance));

/**
 * Method asSpendingDataScript of SpendingData
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SpendingData instance
 * const instance = ... ;
 *   const result = yield* SpendingData.asSpendingDataScript(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asSpendingDataScript = Effect.fn(
  (
    instance: CML.SpendingData,
  ): Effect.Effect<CML.ByronScript | undefined, SpendingDataError> =>
    Effect.try({
      try: () => instance.as_spending_data_script(),
      catch: () =>
        new SpendingDataError({
          message: `SpendingData.asSpendingDataScript failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asSpendingDataScript without Effect wrapper
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SpendingData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SpendingData.unsafeAsSpendingDataScript(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SpendingData.unsafeAsSpendingDataScript failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsSpendingDataScript = (
  instance: CML.SpendingData,
): CML.ByronScript | undefined =>
  Effect.runSync(asSpendingDataScript(instance));

/**
 * Method asSpendingDataRedeem of SpendingData
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SpendingData instance
 * const instance = ... ;
 *   const result = yield* SpendingData.asSpendingDataRedeem(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asSpendingDataRedeem = Effect.fn(
  (
    instance: CML.SpendingData,
  ): Effect.Effect<CML.PublicKey | undefined, SpendingDataError> =>
    Effect.try({
      try: () => instance.as_spending_data_redeem(),
      catch: () =>
        new SpendingDataError({
          message: `SpendingData.asSpendingDataRedeem failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asSpendingDataRedeem without Effect wrapper
 *
 * @example
 * import { SpendingData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SpendingData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SpendingData.unsafeAsSpendingDataRedeem(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SpendingData.unsafeAsSpendingDataRedeem failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsSpendingDataRedeem = (
  instance: CML.SpendingData,
): CML.PublicKey | undefined => Effect.runSync(asSpendingDataRedeem(instance));
