/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionOutput class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionOutput = CML.TransactionOutput;

/**
 * Error class for TransactionOutput operations
 *
 * This error is thrown when operations on TransactionOutput instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionOutputError extends Data.TaggedError(
  "TransactionOutputError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.TransactionOutput,
) => Effect.Effect<void, TransactionOutputError> = Effect.fn(
  (instance: CML.TransactionOutput) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionOutput): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of TransactionOutput
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  address: CML.Address,
  amount: CML.Value,
  datumOption: CML.DatumOption,
  scriptReference: CML.Script,
) => Effect.Effect<CML.TransactionOutput, TransactionOutputError> = Effect.fn(
  function* (
    address: CML.Address,
    amount: CML.Value,
    datumOption: CML.DatumOption,
    scriptReference: CML.Script,
  ) {
    return yield* Effect.try({
      try: () =>
        CML.TransactionOutput.new(
          address,
          amount,
          datumOption,
          scriptReference,
        ),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput._new failed with parameters: ${address} (Address), ${amount} (Value), ${datumOption} (DatumOption), ${scriptReference} (Script). `,
        }),
    });
  },
);

/**
 * Unsafely calls TransactionOutput._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  address: CML.Address,
  amount: CML.Value,
  datumOption: CML.DatumOption,
  scriptReference: CML.Script,
): CML.TransactionOutput =>
  Effect.runSync(_new(address, amount, datumOption, scriptReference));

/**
 * Method address of TransactionOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const address: (
  instance: CML.TransactionOutput,
) => Effect.Effect<CML.Address, TransactionOutputError> = Effect.fn(
  (instance: CML.TransactionOutput) =>
    Effect.try({
      try: () => instance.address(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.address failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.address without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addressUnsafe = (instance: CML.TransactionOutput): CML.Address =>
  Effect.runSync(address(instance));

/**
 * Method amount of TransactionOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const amount: (
  instance: CML.TransactionOutput,
) => Effect.Effect<CML.Value, TransactionOutputError> = Effect.fn(
  (instance: CML.TransactionOutput) =>
    Effect.try({
      try: () => instance.amount(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.amount failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.amount without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const amountUnsafe = (instance: CML.TransactionOutput): CML.Value =>
  Effect.runSync(amount(instance));

/**
 * Method setAmount of TransactionOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const setAmount: (
  instance: CML.TransactionOutput,
  amount: CML.Value,
) => Effect.Effect<void, TransactionOutputError> = Effect.fn(
  (instance: CML.TransactionOutput, amount: CML.Value) =>
    Effect.try({
      try: () => instance.set_amount(amount),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.setAmount failed with parameters: ${amount} (Value). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setAmount without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setAmountUnsafe = (
  instance: CML.TransactionOutput,
  amount: CML.Value,
): void => Effect.runSync(setAmount(instance, amount));

/**
 * Method datum of TransactionOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const datum: (
  instance: CML.TransactionOutput,
) => Effect.Effect<CML.DatumOption | undefined, TransactionOutputError> =
  Effect.fn((instance: CML.TransactionOutput) =>
    Effect.try({
      try: () => instance.datum(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.datum failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.datum without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const datumUnsafe = (
  instance: CML.TransactionOutput,
): CML.DatumOption | undefined => Effect.runSync(datum(instance));

/**
 * Method datumHash of TransactionOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const datumHash: (
  instance: CML.TransactionOutput,
) => Effect.Effect<CML.DatumHash | undefined, TransactionOutputError> =
  Effect.fn((instance: CML.TransactionOutput) =>
    Effect.try({
      try: () => instance.datum_hash(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.datumHash failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.datumHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const datumHashUnsafe = (
  instance: CML.TransactionOutput,
): CML.DatumHash | undefined => Effect.runSync(datumHash(instance));

/**
 * Method scriptRef of TransactionOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const scriptRef: (
  instance: CML.TransactionOutput,
) => Effect.Effect<CML.Script | undefined, TransactionOutputError> = Effect.fn(
  (instance: CML.TransactionOutput) =>
    Effect.try({
      try: () => instance.script_ref(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.scriptRef failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.scriptRef without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const scriptRefUnsafe = (
  instance: CML.TransactionOutput,
): CML.Script | undefined => Effect.runSync(scriptRef(instance));

/**
 * Method toCborBytes of TransactionOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.TransactionOutput,
) => Effect.Effect<Uint8Array, TransactionOutputError> = Effect.fn(
  (instance: CML.TransactionOutput) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.toCborBytes failed TransactionOutput is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.TransactionOutput,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of TransactionOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.TransactionOutput,
) => Effect.Effect<Uint8Array, TransactionOutputError> = Effect.fn(
  (instance: CML.TransactionOutput) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.toCanonicalCborBytes failed TransactionOutput is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.TransactionOutput,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of TransactionOutput
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.TransactionOutput, TransactionOutputError> = Effect.fn(
  function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.TransactionOutput.from_cbor_bytes(cborBytes),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls TransactionOutput.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.TransactionOutput => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of TransactionOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.TransactionOutput,
) => Effect.Effect<string, TransactionOutputError> = Effect.fn(
  (instance: CML.TransactionOutput) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.toCborHex failed TransactionOutput is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.TransactionOutput): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of TransactionOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.TransactionOutput,
) => Effect.Effect<string, TransactionOutputError> = Effect.fn(
  (instance: CML.TransactionOutput) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.toCanonicalCborHex failed TransactionOutput is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.TransactionOutput,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of TransactionOutput
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.TransactionOutput, TransactionOutputError> = Effect.fn(
  function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.TransactionOutput.from_cbor_hex(cborBytes),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  },
);

/**
 * Unsafely calls TransactionOutput.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.TransactionOutput =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of TransactionOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.TransactionOutput,
) => Effect.Effect<string, TransactionOutputError> = Effect.fn(
  (instance: CML.TransactionOutput) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.toJson failed TransactionOutput is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.TransactionOutput): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of TransactionOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.TransactionOutput,
) => Effect.Effect<any, TransactionOutputError> = Effect.fn(
  (instance: CML.TransactionOutput) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.toJsValue failed TransactionOutput is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.TransactionOutput): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of TransactionOutput
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.TransactionOutput, TransactionOutputError> = Effect.fn(
  function* (json: string) {
    return yield* Effect.try({
      try: () => CML.TransactionOutput.from_json(json),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  },
);

/**
 * Unsafely calls TransactionOutput.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.TransactionOutput =>
  Effect.runSync(fromJson(json));

/**
 * Static method newAlonzoFormatTxOut of TransactionOutput
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newAlonzoFormatTxOut: (
  alonzoFormatTxOut: CML.AlonzoFormatTxOut,
) => Effect.Effect<CML.TransactionOutput, TransactionOutputError> = Effect.fn(
  function* (alonzoFormatTxOut: CML.AlonzoFormatTxOut) {
    return yield* Effect.try({
      try: () =>
        CML.TransactionOutput.new_alonzo_format_tx_out(alonzoFormatTxOut),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.newAlonzoFormatTxOut failed with parameters: ${alonzoFormatTxOut} (AlonzoFormatTxOut). `,
        }),
    });
  },
);

/**
 * Unsafely calls TransactionOutput.newAlonzoFormatTxOut without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newAlonzoFormatTxOutUnsafe = (
  alonzoFormatTxOut: CML.AlonzoFormatTxOut,
): CML.TransactionOutput =>
  Effect.runSync(newAlonzoFormatTxOut(alonzoFormatTxOut));

/**
 * Static method newConwayFormatTxOut of TransactionOutput
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newConwayFormatTxOut: (
  conwayFormatTxOut: CML.ConwayFormatTxOut,
) => Effect.Effect<CML.TransactionOutput, TransactionOutputError> = Effect.fn(
  function* (conwayFormatTxOut: CML.ConwayFormatTxOut) {
    return yield* Effect.try({
      try: () =>
        CML.TransactionOutput.new_conway_format_tx_out(conwayFormatTxOut),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.newConwayFormatTxOut failed with parameters: ${conwayFormatTxOut} (ConwayFormatTxOut). `,
        }),
    });
  },
);

/**
 * Unsafely calls TransactionOutput.newConwayFormatTxOut without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newConwayFormatTxOutUnsafe = (
  conwayFormatTxOut: CML.ConwayFormatTxOut,
): CML.TransactionOutput =>
  Effect.runSync(newConwayFormatTxOut(conwayFormatTxOut));

/**
 * Method kind of TransactionOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind: (
  instance: CML.TransactionOutput,
) => Effect.Effect<CML.TransactionOutputKind, TransactionOutputError> =
  Effect.fn((instance: CML.TransactionOutput) =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.kind failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (
  instance: CML.TransactionOutput,
): CML.TransactionOutputKind => Effect.runSync(kind(instance));

/**
 * Method asAlonzoFormatTxOut of TransactionOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const asAlonzoFormatTxOut: (
  instance: CML.TransactionOutput,
) => Effect.Effect<CML.AlonzoFormatTxOut | undefined, TransactionOutputError> =
  Effect.fn((instance: CML.TransactionOutput) =>
    Effect.try({
      try: () => instance.as_alonzo_format_tx_out(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.asAlonzoFormatTxOut failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.asAlonzoFormatTxOut without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asAlonzoFormatTxOutUnsafe = (
  instance: CML.TransactionOutput,
): CML.AlonzoFormatTxOut | undefined =>
  Effect.runSync(asAlonzoFormatTxOut(instance));

/**
 * Method asConwayFormatTxOut of TransactionOutput
 *
 * @since 2.0.0
 * @category Methods
 */
export const asConwayFormatTxOut: (
  instance: CML.TransactionOutput,
) => Effect.Effect<CML.ConwayFormatTxOut | undefined, TransactionOutputError> =
  Effect.fn((instance: CML.TransactionOutput) =>
    Effect.try({
      try: () => instance.as_conway_format_tx_out(),
      catch: () =>
        new TransactionOutputError({
          message: `TransactionOutput.asConwayFormatTxOut failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.asConwayFormatTxOut without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asConwayFormatTxOutUnsafe = (
  instance: CML.TransactionOutput,
): CML.ConwayFormatTxOut | undefined =>
  Effect.runSync(asConwayFormatTxOut(instance));
