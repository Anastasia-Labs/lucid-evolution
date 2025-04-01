/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML AlonzoFormatTxOut class
 *
 * @since 2.0.0
 * @category Types
 */
export type AlonzoFormatTxOut = CML.AlonzoFormatTxOut;

/**
 * Error class for AlonzoFormatTxOut operations
 * 
 * This error is thrown when operations on AlonzoFormatTxOut instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class AlonzoFormatTxOutError extends Data.TaggedError("AlonzoFormatTxOutError")<{
  message?: string;
}> {}

/**
 * Method free of AlonzoFormatTxOut
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.AlonzoFormatTxOut) => Effect.Effect<void, AlonzoFormatTxOutError> = Effect.fn(
  (instance: CML.AlonzoFormatTxOut) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.AlonzoFormatTxOut): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of AlonzoFormatTxOut
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.AlonzoFormatTxOut) => Effect.Effect<Uint8Array, AlonzoFormatTxOutError> = Effect.fn(
  (instance: CML.AlonzoFormatTxOut) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.toCborBytes failed AlonzoFormatTxOut is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.AlonzoFormatTxOut): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of AlonzoFormatTxOut
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.AlonzoFormatTxOut) => Effect.Effect<Uint8Array, AlonzoFormatTxOutError> = Effect.fn(
  (instance: CML.AlonzoFormatTxOut) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.toCanonicalCborBytes failed AlonzoFormatTxOut is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.AlonzoFormatTxOut): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of AlonzoFormatTxOut
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.AlonzoFormatTxOut, AlonzoFormatTxOutError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.AlonzoFormatTxOut.from_cbor_bytes(cborBytes),
    catch: () => new AlonzoFormatTxOutError({
      message: `AlonzoFormatTxOut.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls AlonzoFormatTxOut.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.AlonzoFormatTxOut =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of AlonzoFormatTxOut
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.AlonzoFormatTxOut) => Effect.Effect<string, AlonzoFormatTxOutError> = Effect.fn(
  (instance: CML.AlonzoFormatTxOut) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.toCborHex failed AlonzoFormatTxOut is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.AlonzoFormatTxOut): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of AlonzoFormatTxOut
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.AlonzoFormatTxOut) => Effect.Effect<string, AlonzoFormatTxOutError> = Effect.fn(
  (instance: CML.AlonzoFormatTxOut) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.toCanonicalCborHex failed AlonzoFormatTxOut is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.AlonzoFormatTxOut): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of AlonzoFormatTxOut
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.AlonzoFormatTxOut, AlonzoFormatTxOutError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.AlonzoFormatTxOut.from_cbor_hex(cborBytes),
    catch: () => new AlonzoFormatTxOutError({
      message: `AlonzoFormatTxOut.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls AlonzoFormatTxOut.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.AlonzoFormatTxOut =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of AlonzoFormatTxOut
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.AlonzoFormatTxOut) => Effect.Effect<string, AlonzoFormatTxOutError> = Effect.fn(
  (instance: CML.AlonzoFormatTxOut) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.toJson failed AlonzoFormatTxOut is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.AlonzoFormatTxOut): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of AlonzoFormatTxOut
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.AlonzoFormatTxOut) => Effect.Effect<any, AlonzoFormatTxOutError> = Effect.fn(
  (instance: CML.AlonzoFormatTxOut) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.toJsValue failed AlonzoFormatTxOut is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.AlonzoFormatTxOut): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of AlonzoFormatTxOut
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.AlonzoFormatTxOut, AlonzoFormatTxOutError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.AlonzoFormatTxOut.from_json(json),
    catch: () => new AlonzoFormatTxOutError({
      message: `AlonzoFormatTxOut.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls AlonzoFormatTxOut.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.AlonzoFormatTxOut =>
  Effect.runSync(fromJson(json));

/**
 * Method address of AlonzoFormatTxOut
 * 
 * @since 2.0.0
 * @category Methods
 */
export const address: (instance: CML.AlonzoFormatTxOut) => Effect.Effect<CML.Address, AlonzoFormatTxOutError> = Effect.fn(
  (instance: CML.AlonzoFormatTxOut) =>
    Effect.try({
      try: () => instance.address(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.address failed `,
        }),
    })
);

/**
 * Unsafely calls instance.address without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addressUnsafe = (instance: CML.AlonzoFormatTxOut): CML.Address =>
  Effect.runSync(address(instance));

/**
 * Method amount of AlonzoFormatTxOut
 * 
 * @since 2.0.0
 * @category Methods
 */
export const amount: (instance: CML.AlonzoFormatTxOut) => Effect.Effect<CML.Value, AlonzoFormatTxOutError> = Effect.fn(
  (instance: CML.AlonzoFormatTxOut) =>
    Effect.try({
      try: () => instance.amount(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.amount failed `,
        }),
    })
);

/**
 * Unsafely calls instance.amount without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const amountUnsafe = (instance: CML.AlonzoFormatTxOut): CML.Value =>
  Effect.runSync(amount(instance));

/**
 * Method setDatumHash of AlonzoFormatTxOut
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setDatumHash: (instance: CML.AlonzoFormatTxOut, datumHash: CML.DatumHash) => Effect.Effect<void, AlonzoFormatTxOutError> = Effect.fn(
  (instance: CML.AlonzoFormatTxOut, datumHash: CML.DatumHash) =>
    Effect.try({
      try: () => instance.set_datum_hash(datumHash),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.setDatumHash failed with parameters: ${datumHash} (DatumHash). `,
        }),
    })
);

/**
 * Unsafely calls instance.setDatumHash without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setDatumHashUnsafe = (instance: CML.AlonzoFormatTxOut, datumHash: CML.DatumHash): void =>
  Effect.runSync(setDatumHash(instance, datumHash));

/**
 * Method datumHash of AlonzoFormatTxOut
 * 
 * @since 2.0.0
 * @category Methods
 */
export const datumHash: (instance: CML.AlonzoFormatTxOut) => Effect.Effect<CML.DatumHash | undefined, AlonzoFormatTxOutError> = Effect.fn(
  (instance: CML.AlonzoFormatTxOut) =>
    Effect.try({
      try: () => instance.datum_hash(),
      catch: () =>
        new AlonzoFormatTxOutError({
          message: `AlonzoFormatTxOut.datumHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.datumHash without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const datumHashUnsafe = (instance: CML.AlonzoFormatTxOut): CML.DatumHash | undefined =>
  Effect.runSync(datumHash(instance));

/**
 * Static method _new of AlonzoFormatTxOut
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (address: CML.Address, amount: CML.Value) => Effect.Effect<CML.AlonzoFormatTxOut, AlonzoFormatTxOutError> = Effect.fn(function* (address: CML.Address, amount: CML.Value) {
  return yield* Effect.try({
    try: () => CML.AlonzoFormatTxOut.new(address, amount),
    catch: () => new AlonzoFormatTxOutError({
      message: `AlonzoFormatTxOut._new failed with parameters: ${address} (Address), ${amount} (Value). `,
    }),
  });
});

/**
 * Unsafely calls AlonzoFormatTxOut._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (address: CML.Address, amount: CML.Value): CML.AlonzoFormatTxOut =>
  Effect.runSync(_new(address, amount));
