import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type AlonzoFormatTxOut = CML.AlonzoFormatTxOut;

export class AlonzoFormatTxOutError extends Data.TaggedError(
  "AlonzoFormatTxOutError",
)<{
  message?: string;
}> {}

/**
 * Method free of AlonzoFormatTxOut
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* AlonzoFormatTxOut.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.AlonzoFormatTxOut,
  ): Effect.Effect<void, AlonzoFormatTxOutError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AlonzoFormatTxOut.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AlonzoFormatTxOut.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.AlonzoFormatTxOut): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of AlonzoFormatTxOut
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* AlonzoFormatTxOut.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.AlonzoFormatTxOut,
  ): Effect.Effect<Uint8Array, AlonzoFormatTxOutError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.toCborBytes failed AlonzoFormatTxOut is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AlonzoFormatTxOut.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AlonzoFormatTxOut.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (
  instance: CML.AlonzoFormatTxOut,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of AlonzoFormatTxOut
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* AlonzoFormatTxOut.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.AlonzoFormatTxOut,
  ): Effect.Effect<Uint8Array, AlonzoFormatTxOutError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.toCanonicalCborBytes failed AlonzoFormatTxOut is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AlonzoFormatTxOut.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AlonzoFormatTxOut.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.AlonzoFormatTxOut,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of AlonzoFormatTxOut
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AlonzoFormatTxOut.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.AlonzoFormatTxOut.from_cbor_bytes(cborBytes),
    catch: () =>
      new AlonzoFormatTxOutError({
        message: `AlonzoFormatTxOut.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls AlonzoFormatTxOut.fromCborBytes without Effect wrapper
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AlonzoFormatTxOut.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AlonzoFormatTxOut.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of AlonzoFormatTxOut
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* AlonzoFormatTxOut.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.AlonzoFormatTxOut,
  ): Effect.Effect<string, AlonzoFormatTxOutError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.toCborHex failed AlonzoFormatTxOut is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AlonzoFormatTxOut.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AlonzoFormatTxOut.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.AlonzoFormatTxOut): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of AlonzoFormatTxOut
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* AlonzoFormatTxOut.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (
    instance: CML.AlonzoFormatTxOut,
  ): Effect.Effect<string, AlonzoFormatTxOutError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.toCanonicalCborHex failed AlonzoFormatTxOut is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AlonzoFormatTxOut.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AlonzoFormatTxOut.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (
  instance: CML.AlonzoFormatTxOut,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of AlonzoFormatTxOut
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AlonzoFormatTxOut.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.AlonzoFormatTxOut.from_cbor_hex(cborBytes),
    catch: () =>
      new AlonzoFormatTxOutError({
        message: `AlonzoFormatTxOut.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls AlonzoFormatTxOut.fromCborHex without Effect wrapper
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AlonzoFormatTxOut.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AlonzoFormatTxOut.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of AlonzoFormatTxOut
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* AlonzoFormatTxOut.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.AlonzoFormatTxOut,
  ): Effect.Effect<string, AlonzoFormatTxOutError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.toJson failed AlonzoFormatTxOut is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AlonzoFormatTxOut.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AlonzoFormatTxOut.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.AlonzoFormatTxOut): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of AlonzoFormatTxOut
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* AlonzoFormatTxOut.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.AlonzoFormatTxOut,
  ): Effect.Effect<any, AlonzoFormatTxOutError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.toJsValue failed AlonzoFormatTxOut is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AlonzoFormatTxOut.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AlonzoFormatTxOut.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.AlonzoFormatTxOut): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of AlonzoFormatTxOut
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AlonzoFormatTxOut.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.AlonzoFormatTxOut.from_json(json),
    catch: () =>
      new AlonzoFormatTxOutError({
        message: `AlonzoFormatTxOut.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls AlonzoFormatTxOut.fromJson without Effect wrapper
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AlonzoFormatTxOut.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AlonzoFormatTxOut.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method address of AlonzoFormatTxOut
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* AlonzoFormatTxOut.address(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const address = Effect.fn(
  (
    instance: CML.AlonzoFormatTxOut,
  ): Effect.Effect<CML.Address, AlonzoFormatTxOutError> =>
    Effect.try({
      try: () => instance.address(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.address failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.address without Effect wrapper
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AlonzoFormatTxOut.unsafeAddress(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AlonzoFormatTxOut.unsafeAddress failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddress = (instance: CML.AlonzoFormatTxOut): CML.Address =>
  Effect.runSync(address(instance));

/**
 * Method amount of AlonzoFormatTxOut
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* AlonzoFormatTxOut.amount(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const amount = Effect.fn(
  (
    instance: CML.AlonzoFormatTxOut,
  ): Effect.Effect<CML.Value, AlonzoFormatTxOutError> =>
    Effect.try({
      try: () => instance.amount(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.amount failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.amount without Effect wrapper
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AlonzoFormatTxOut.unsafeAmount(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AlonzoFormatTxOut.unsafeAmount failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAmount = (instance: CML.AlonzoFormatTxOut): CML.Value =>
  Effect.runSync(amount(instance));

/**
 * Method setDatumHash of AlonzoFormatTxOut
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* AlonzoFormatTxOut.setDatumHash(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setDatumHash = Effect.fn(
  (
    instance: CML.AlonzoFormatTxOut,
    datumHash: CML.DatumHash,
  ): Effect.Effect<void, AlonzoFormatTxOutError> =>
    Effect.try({
      try: () => instance.set_datum_hash(datumHash),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.setDatumHash failed with parameters: ${datumHash} (DatumHash). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setDatumHash without Effect wrapper
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AlonzoFormatTxOut.unsafeSetDatumHash(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AlonzoFormatTxOut.unsafeSetDatumHash failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetDatumHash = (
  instance: CML.AlonzoFormatTxOut,
  datumHash: CML.DatumHash,
): void => Effect.runSync(setDatumHash(instance, datumHash));

/**
 * Method datumHash of AlonzoFormatTxOut
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *   const result = yield* AlonzoFormatTxOut.datumHash(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const datumHash = Effect.fn(
  (
    instance: CML.AlonzoFormatTxOut,
  ): Effect.Effect<CML.DatumHash | undefined, AlonzoFormatTxOutError> =>
    Effect.try({
      try: () => instance.datum_hash(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.datumHash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.datumHash without Effect wrapper
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AlonzoFormatTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AlonzoFormatTxOut.unsafeDatumHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AlonzoFormatTxOut.unsafeDatumHash failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeDatumHash = (
  instance: CML.AlonzoFormatTxOut,
): CML.DatumHash | undefined => Effect.runSync(datumHash(instance));

/**
 * Static method _new of AlonzoFormatTxOut
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AlonzoFormatTxOut._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  address: CML.Address,
  amount: CML.Value,
) {
  return yield* Effect.try({
    try: () => CML.AlonzoFormatTxOut.new(address, amount),
    catch: () =>
      new AlonzoFormatTxOutError({
        message: `AlonzoFormatTxOut._new failed with parameters: ${address} (Address), ${amount} (Value). `,
      }),
  });
});

/**
 * Unsafely calls AlonzoFormatTxOut._new without Effect wrapper
 *
 * @example
 * import { AlonzoFormatTxOut } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AlonzoFormatTxOut.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AlonzoFormatTxOut.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (address: CML.Address, amount: CML.Value) =>
  Effect.runSync(_new(address, amount));
