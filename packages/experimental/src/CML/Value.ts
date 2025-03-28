import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Value = CML.Value;

export class ValueError extends Data.TaggedError("ValueError")<{
  message?: string;
}> {}

/**
 * Method free of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Value instance
 * const instance = ... ;
 *   const result = yield* Value.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Value): Effect.Effect<void, ValueError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ValueError({
          message: `Value.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Value instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Value): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Value instance
 * const instance = ... ;
 *   const result = yield* Value.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.Value): Effect.Effect<Uint8Array, ValueError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ValueError({
          message: `Value.toCborBytes failed Value is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Value instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.Value): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Value instance
 * const instance = ... ;
 *   const result = yield* Value.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.Value): Effect.Effect<Uint8Array, ValueError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ValueError({
          message: `Value.toCanonicalCborBytes failed Value is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Value instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.Value): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Value.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Value.from_cbor_bytes(cborBytes),
    catch: () =>
      new ValueError({
        message: `Value.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls Value.fromCborBytes without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Value instance
 * const instance = ... ;
 *   const result = yield* Value.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.Value): Effect.Effect<string, ValueError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ValueError({
          message: `Value.toCborHex failed Value is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Value instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.Value): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Value instance
 * const instance = ... ;
 *   const result = yield* Value.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.Value): Effect.Effect<string, ValueError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ValueError({
          message: `Value.toCanonicalCborHex failed Value is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Value instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.Value): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Value.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Value.from_cbor_hex(cborBytes),
    catch: () =>
      new ValueError({
        message: `Value.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls Value.fromCborHex without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Value instance
 * const instance = ... ;
 *   const result = yield* Value.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.Value): Effect.Effect<string, ValueError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ValueError({
          message: `Value.toJson failed Value is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Value instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.Value): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Value instance
 * const instance = ... ;
 *   const result = yield* Value.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.Value): Effect.Effect<any, ValueError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ValueError({
          message: `Value.toJsValue failed Value is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Value instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.Value): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Value.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Value.from_json(json),
    catch: () =>
      new ValueError({
        message: `Value.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls Value.fromJson without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Static method fromCoin of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Value.fromCoin( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCoin = Effect.fn(function* (coin: bigint) {
  return yield* Effect.try({
    try: () => CML.Value.from_coin(coin),
    catch: () =>
      new ValueError({
        message: `Value.fromCoin failed with parameters: ${coin}. `,
      }),
  });
});

/**
 * Unsafely calls Value.fromCoin without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeFromCoin( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeFromCoin failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCoin = (coin: bigint) => Effect.runSync(fromCoin(coin));

/**
 * Static method _new of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Value._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  coin: bigint,
  multiasset: CML.MultiAsset,
) {
  return yield* Effect.try({
    try: () => CML.Value.new(coin, multiasset),
    catch: () =>
      new ValueError({
        message: `Value._new failed with parameters: ${coin}, ${multiasset} (MultiAsset). `,
      }),
  });
});

/**
 * Unsafely calls Value._new without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (coin: bigint, multiasset: CML.MultiAsset) =>
  Effect.runSync(_new(coin, multiasset));

/**
 * Method coin of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Value instance
 * const instance = ... ;
 *   const result = yield* Value.coin(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const coin = Effect.fn(
  (instance: CML.Value): Effect.Effect<bigint, ValueError> =>
    Effect.try({
      try: () => instance.coin(),
      catch: () =>
        new ValueError({
          message: `Value.coin failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.coin without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Value instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeCoin(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeCoin failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCoin = (instance: CML.Value): bigint =>
  Effect.runSync(coin(instance));

/**
 * Method multiAsset of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Value instance
 * const instance = ... ;
 *   const result = yield* Value.multiAsset(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const multiAsset = Effect.fn(
  (instance: CML.Value): Effect.Effect<CML.MultiAsset, ValueError> =>
    Effect.try({
      try: () => instance.multi_asset(),
      catch: () =>
        new ValueError({
          message: `Value.multiAsset failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.multiAsset without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Value instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeMultiAsset(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeMultiAsset failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMultiAsset = (instance: CML.Value): CML.MultiAsset =>
  Effect.runSync(multiAsset(instance));

/**
 * Static method zero of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Value.zero();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const zero = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.Value.zero(),
    catch: () =>
      new ValueError({
        message: `Value.zero failed `,
      }),
  });
});

/**
 * Unsafely calls Value.zero without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeZero();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeZero failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeZero = () => Effect.runSync(zero());

/**
 * Method isZero of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Value instance
 * const instance = ... ;
 *   const result = yield* Value.isZero(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const isZero = Effect.fn(
  (instance: CML.Value): Effect.Effect<boolean, ValueError> =>
    Effect.try({
      try: () => instance.is_zero(),
      catch: () =>
        new ValueError({
          message: `Value.isZero failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.isZero without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Value instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeIsZero(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeIsZero failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeIsZero = (instance: CML.Value): boolean =>
  Effect.runSync(isZero(instance));

/**
 * Method hasMultiassets of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Value instance
 * const instance = ... ;
 *   const result = yield* Value.hasMultiassets(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const hasMultiassets = Effect.fn(
  (instance: CML.Value): Effect.Effect<boolean, ValueError> =>
    Effect.try({
      try: () => instance.has_multiassets(),
      catch: () =>
        new ValueError({
          message: `Value.hasMultiassets failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.hasMultiassets without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Value instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeHasMultiassets(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeHasMultiassets failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeHasMultiassets = (instance: CML.Value): boolean =>
  Effect.runSync(hasMultiassets(instance));

/**
 * Method checkedAdd of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Value instance
 * const instance = ... ;
 *   const result = yield* Value.checkedAdd(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const checkedAdd = Effect.fn(
  (instance: CML.Value, rhs: CML.Value): Effect.Effect<CML.Value, ValueError> =>
    Effect.try({
      try: () => instance.checked_add(rhs),
      catch: () =>
        new ValueError({
          message: `Value.checkedAdd failed with parameters: ${rhs} (Value). `,
        }),
    }),
);

/**
 * Unsafely calls instance.checkedAdd without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Value instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeCheckedAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeCheckedAdd failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCheckedAdd = (
  instance: CML.Value,
  rhs: CML.Value,
): CML.Value => Effect.runSync(checkedAdd(instance, rhs));

/**
 * Method checkedSub of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Value instance
 * const instance = ... ;
 *   const result = yield* Value.checkedSub(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const checkedSub = Effect.fn(
  (instance: CML.Value, rhs: CML.Value): Effect.Effect<CML.Value, ValueError> =>
    Effect.try({
      try: () => instance.checked_sub(rhs),
      catch: () =>
        new ValueError({
          message: `Value.checkedSub failed with parameters: ${rhs} (Value). `,
        }),
    }),
);

/**
 * Unsafely calls instance.checkedSub without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Value instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeCheckedSub(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeCheckedSub failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCheckedSub = (
  instance: CML.Value,
  rhs: CML.Value,
): CML.Value => Effect.runSync(checkedSub(instance, rhs));

/**
 * Method clampedSub of Value
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Value instance
 * const instance = ... ;
 *   const result = yield* Value.clampedSub(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const clampedSub = Effect.fn(
  (instance: CML.Value, rhs: CML.Value): Effect.Effect<CML.Value, ValueError> =>
    Effect.try({
      try: () => instance.clamped_sub(rhs),
      catch: () =>
        new ValueError({
          message: `Value.clampedSub failed with parameters: ${rhs} (Value). `,
        }),
    }),
);

/**
 * Unsafely calls instance.clampedSub without Effect wrapper
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Value instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Value.unsafeClampedSub(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Value.unsafeClampedSub failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeClampedSub = (
  instance: CML.Value,
  rhs: CML.Value,
): CML.Value => Effect.runSync(clampedSub(instance, rhs));
