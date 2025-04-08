/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Value class
 *
 * @since 2.0.0
 * @category Types
 */
export type Value = CML.Value;

/**
 * Error class for Value operations
 *
 * This error is thrown when operations on Value instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ValueError extends Data.TaggedError("ValueError")<{
  message?: string;
}> {}

/**
 * Method free of Value
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.Value) => Effect.Effect<void, ValueError> =
  Effect.fn((instance: CML.Value) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Value): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Value
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.Value,
) => Effect.Effect<Uint8Array, ValueError> = Effect.fn((instance: CML.Value) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Value): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Value
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.Value,
) => Effect.Effect<Uint8Array, ValueError> = Effect.fn((instance: CML.Value) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Value): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Value
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Value, ValueError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.Value =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Value
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.Value,
) => Effect.Effect<string, ValueError> = Effect.fn((instance: CML.Value) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Value): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Value
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.Value,
) => Effect.Effect<string, ValueError> = Effect.fn((instance: CML.Value) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Value): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Value
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Value, ValueError> = Effect.fn(function* (
  cborBytes: string,
) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.Value =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Value
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.Value,
) => Effect.Effect<string, ValueError> = Effect.fn((instance: CML.Value) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Value): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Value
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.Value,
) => Effect.Effect<any, ValueError> = Effect.fn((instance: CML.Value) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Value): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Value
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.Value, ValueError> =
  Effect.fn(function* (json: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.Value =>
  Effect.runSync(fromJson(json));

/**
 * Static method fromCoin of Value
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCoin: (coin: bigint) => Effect.Effect<CML.Value, ValueError> =
  Effect.fn(function* (coin: bigint) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCoinUnsafe = (coin: bigint): CML.Value =>
  Effect.runSync(fromCoin(coin));

/**
 * Static method _new of Value
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  coin: bigint,
  multiasset: CML.MultiAsset,
) => Effect.Effect<CML.Value, ValueError> = Effect.fn(function* (
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  coin: bigint,
  multiasset: CML.MultiAsset,
): CML.Value => Effect.runSync(_new(coin, multiasset));

/**
 * Method coin of Value
 *
 * @since 2.0.0
 * @category Methods
 */
export const coin: (instance: CML.Value) => Effect.Effect<bigint, ValueError> =
  Effect.fn((instance: CML.Value) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const coinUnsafe = (instance: CML.Value): bigint =>
  Effect.runSync(coin(instance));

/**
 * Method multiAsset of Value
 *
 * @since 2.0.0
 * @category Methods
 */
export const multiAsset: (
  instance: CML.Value,
) => Effect.Effect<CML.MultiAsset, ValueError> = Effect.fn(
  (instance: CML.Value) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const multiAssetUnsafe = (instance: CML.Value): CML.MultiAsset =>
  Effect.runSync(multiAsset(instance));

/**
 * Static method zero of Value
 *
 * @since 2.0.0
 * @category Constructors
 */
export const zero: () => Effect.Effect<CML.Value, ValueError> = Effect.fn(
  function* () {
    return yield* Effect.try({
      try: () => CML.Value.zero(),
      catch: () =>
        new ValueError({
          message: `Value.zero failed `,
        }),
    });
  },
);

/**
 * Unsafely calls Value.zero without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const zeroUnsafe = (): CML.Value => Effect.runSync(zero());

/**
 * Method isZero of Value
 *
 * @since 2.0.0
 * @category Methods
 */
export const isZero: (
  instance: CML.Value,
) => Effect.Effect<boolean, ValueError> = Effect.fn((instance: CML.Value) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const isZeroUnsafe = (instance: CML.Value): boolean =>
  Effect.runSync(isZero(instance));

/**
 * Method hasMultiassets of Value
 *
 * @since 2.0.0
 * @category Methods
 */
export const hasMultiassets: (
  instance: CML.Value,
) => Effect.Effect<boolean, ValueError> = Effect.fn((instance: CML.Value) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const hasMultiassetsUnsafe = (instance: CML.Value): boolean =>
  Effect.runSync(hasMultiassets(instance));

/**
 * Method checkedAdd of Value
 *
 * @since 2.0.0
 * @category Methods
 */
export const checkedAdd: (
  instance: CML.Value,
  rhs: CML.Value,
) => Effect.Effect<CML.Value, ValueError> = Effect.fn(
  (instance: CML.Value, rhs: CML.Value) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const checkedAddUnsafe = (
  instance: CML.Value,
  rhs: CML.Value,
): CML.Value => Effect.runSync(checkedAdd(instance, rhs));

/**
 * Method checkedSub of Value
 *
 * @since 2.0.0
 * @category Methods
 */
export const checkedSub: (
  instance: CML.Value,
  rhs: CML.Value,
) => Effect.Effect<CML.Value, ValueError> = Effect.fn(
  (instance: CML.Value, rhs: CML.Value) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const checkedSubUnsafe = (
  instance: CML.Value,
  rhs: CML.Value,
): CML.Value => Effect.runSync(checkedSub(instance, rhs));

/**
 * Method clampedSub of Value
 *
 * @since 2.0.0
 * @category Methods
 */
export const clampedSub: (
  instance: CML.Value,
  rhs: CML.Value,
) => Effect.Effect<CML.Value, ValueError> = Effect.fn(
  (instance: CML.Value, rhs: CML.Value) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const clampedSubUnsafe = (
  instance: CML.Value,
  rhs: CML.Value,
): CML.Value => Effect.runSync(clampedSub(instance, rhs));
