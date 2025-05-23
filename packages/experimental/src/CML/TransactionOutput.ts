/**
 * @since 2.0.0
 */
import { Data, Effect, Inspectable, Schema } from "effect";
import { Bytes } from "../index.js";
import * as CBOR from "../CBOR.js";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * CDDL specs (Shelley era)
 * Shelley transaction output format: [address, amount, ?datum_hash]
 *
 * @since 2.0.0
 * @category schemas
 */
export class ShelleyTransactionOutput
  extends Schema.TaggedClass<ShelleyTransactionOutput>(
    "ShelleyTransactionOutput",
  )("ShelleyTransactionOutput", {
    address: Schema.Uint8Array,
    amount: Schema.BigInt,
    datumHash: Schema.optional(Schema.Uint8Array),
  }) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "ShelleyTransactionOutput",
      address: this.address,
      amount: this.amount,
      datumHash: this.datumHash,
    };
  }
}

/**
 * CDDL specs (Babbage era)
 * Babbage format transaction output: {0: address, 1: value, ?2: datum_option, ?3: script_ref}
 *
 * @since 2.0.0
 * @category schemas
 */
export class BabbageTransactionOutput
  extends Schema.TaggedClass<BabbageTransactionOutput>(
    "BabbageTransactionOutput",
  )("BabbageTransactionOutput", {
    address: Schema.Uint8Array,
    value: Schema.BigInt,
    datumOption: Schema.optional(Schema.Uint8Array),
    scriptRef: Schema.optional(Schema.Uint8Array),
  }) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "BabbageTransactionOutput",
      address: this.address,
      value: this.value,
      datumOption: this.datumOption,
      scriptRef: this.scriptRef,
    };
  }
}

/**
 * CDDL specs (Conway era)
 * transaction_output = shelley_transaction_output / babbage_transaction_output
 *
 * value = coin / [coin, multiasset<positive_coin>]
 * coin = uint
 */

/**
 * Transaction output union type matching CDDL: shelley_transaction_output / babbage_transaction_output
 *
 * @since 2.0.0
 * @category schemas
 */
export const TransactionOutput = Schema.Union(
  ShelleyTransactionOutput,
  BabbageTransactionOutput,
);

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
  cause?: unknown;
}> {}

/**
 * Check if the given value is a valid TransactionOutput
 *
 * @example
 * import { TransactionOutput, Address, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const addressBytes = Bytes.fromHexOrThrow("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251");
 * const effect = Address.fromBytes(addressBytes);
 * const address = Effect.runSync(effect);
 * const transactionOutput = TransactionOutput.makeOrThrow(address, 1000000n);
 * const isValid = TransactionOutput.isTransactionOutput(transactionOutput);
 * assert(isValid === true);
 *
 * @since 2.0.0
 * @category predicates
 */
export const isTransactionOutput = Schema.is(TransactionOutput);

/**
 * Create a Babbage TransactionOutput
 *
 * @example
 * import { TransactionOutput, Bytes } from "@lucid-evolution/experimental";
 *
 * const addressBytes = Bytes.fromHexOrThrow("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251");
 * const effect = Address.fromBytes(addressBytes);
 * const address = Effect.runSync(effect);
 * const output = TransactionOutput.makeBabbageOrThrow(address, 2000000n);
 *
 * @category constructors
 */
const makeBabbageOrThrow = (
  address: Uint8Array,
  value: bigint,
  datumOption?: Uint8Array,
  scriptRef?: Uint8Array,
): BabbageTransactionOutput => {
  if (value < 0n) {
    throw new TransactionOutputError({
      message: `TransactionOutput value must be non-negative, got: ${value}`,
    });
  }
  return new BabbageTransactionOutput(
    { address, value, datumOption, scriptRef },
    { disableValidation: true },
  );
};

/**
 * Create a Shelley TransactionOutput (most common use case)
 *
 * @example
 * import { TransactionOutput, Address, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * const addressBytes = Bytes.fromHexOrThrow("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251");
 * const effect = Address.fromBytes(addressBytes);
 * const address = Effect.runSync(effect);
 * const output = TransactionOutput.makeShelleyOrThrow(address, 1000000n);
 *
 * @category constructors
 */
export const makeShelleyOrThrow = (
  address: Uint8Array,
  amount: bigint,
  datumHash?: Uint8Array,
): ShelleyTransactionOutput => {
  // validation logic
  return new ShelleyTransactionOutput(
    { address, amount, datumHash },
    { disableValidation: true },
  );
};

/**
 * Smart constructor that creates the appropriate output type based on parameters
 *
 * @example
 * import { TransactionOutput, Bytes } from "@lucid-evolution/experimental";
 *
 * const addressBytes = Bytes.fromHexOrThrow("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251");
 * const effect = Address.fromBytes(addressBytes);
 * const address = Effect.runSync(effect);
 * const output = TransactionOutput.makeOrThrow(address, 1000000n);
 *
 * @category constructors
 */
const makeOrThrow = (
  address: Uint8Array,
  amount: bigint,
  options?: {
    datumHash?: Uint8Array;
    datumOption?: Uint8Array;
    scriptRef?: Uint8Array;
  },
): Schema.Schema.Type<typeof TransactionOutput> => {
  if (options?.datumOption || options?.scriptRef) {
    return makeBabbageOrThrow(
      address,
      amount,
      options.datumOption,
      options.scriptRef,
    );
  } else {
    return makeShelleyOrThrow(address, amount, options?.datumHash);
  }
};

// /**
//  * Method address of TransactionOutput
//  *
//  * @since 2.0.0
//  * @category Methods
//  */
// export const address: (
//   instance: CML.TransactionOutput,
// ) => Effect.Effect<CML.Address, TransactionOutputError> = Effect.fn(
//   (instance: CML.TransactionOutput) =>
//     Effect.try({
//       try: () => instance.address(),
//       catch: () =>
//         new TransactionOutputError({
//           message: `TransactionOutput.address failed `,
//         }),
//     }),
// );

// /**
//  * Unsafely calls instance.address without Effect wrapper
//  *
//  * @since 2.0.0
//  * @category MethodsUnsafe
//  */
// export const addressUnsafe = (instance: CML.TransactionOutput): CML.Address =>
//   Effect.runSync(address(instance));

// /**
//  * Method amount of TransactionOutput
//  *
//  * @since 2.0.0
//  * @category Methods
//  */
// export const amount: (
//   instance: CML.TransactionOutput,
// ) => Effect.Effect<CML.Value, TransactionOutputError> = Effect.fn(
//   (instance: CML.TransactionOutput) =>
//     Effect.try({
//       try: () => instance.amount(),
//       catch: () =>
//         new TransactionOutputError({
//           message: `TransactionOutput.amount failed `,
//         }),
//     }),
// );

// /**
//  * Unsafely calls instance.amount without Effect wrapper
//  *
//  * @since 2.0.0
//  * @category MethodsUnsafe
//  */
// export const amountUnsafe = (instance: CML.TransactionOutput): CML.Value =>
//   Effect.runSync(amount(instance));

// /**
//  * Update the amount in a transaction output
//  *
//  * @example
//  * import { TransactionOutput, Address } from "@lucid-evolution/experimental";
//  * import { Effect } from "effect";
//  * import assert from "assert";
//  *
//  * const address = Address.fromBech32OrThrow("addr1...");
//  * const output = TransactionOutput.makeOrThrow({ address, amount: 1000000n });
//  *
//  * const updatedOutputEffect = TransactionOutput.setAmount(output, 2000000n);
//  * const updatedOutput = Effect.runSync(updatedOutputEffect);
//  *
//  * assert(updatedOutput.amount === 2000000n);
//  *
//  * @since 2.0.0
//  * @category modifiers
//  */
// export const setAmount = (
//   output: TransactionOutput,
//   newAmount: bigint,
// ): Effect.Effect<TransactionOutput, TransactionOutputError> => {
//   return Effect.succeed(
//     TransactionOutput.make(
//       {
//         address: output.address, // Keep the same address bytes
//         amount: newAmount,
//       },
//       { disableValidation: false }, // Let schema validation handle the non-negative check
//     ),
//   );
// };

// /**
//  * Update the amount in a transaction output, or throw if an error occurs
//  *
//  * @example
//  * import { TransactionOutput, Address } from "@lucid-evolution/experimental";
//  * import assert from "assert";
//  *
//  * const address = Address.fromBech32OrThrow("addr1...");
//  * const output = TransactionOutput.makeOrThrow({ address, amount: 1000000n });
//  *
//  * const updatedOutput = TransactionOutput.setAmountOrThrow(output, 2000000n);
//  *
//  * assert(updatedOutput.amount === 2000000n);
//  *
//  * @since 2.0.0
//  * @category modifiers
//  */
// export const setAmountOrThrow = (
//   output: TransactionOutput,
//   newAmount: bigint,
// ): TransactionOutput => Effect.runSync(setAmount(output, newAmount));

// /**
//  * Create a new TransactionOutput with the specified address and amount
//  *
//  * @example
//  * import { TransactionOutput, Address } from "@lucid-evolution/experimental";
//  * import { Effect } from "effect";
//  * import assert from "assert";
//  *
//  * const address = Address.fromBech32OrThrow("addr1...");
//  * const outputEffect = TransactionOutput.make(address, 1000000n);
//  * const output = Effect.runSync(outputEffect);
//  *
//  * assert(Address.equals(output.address, address));
//  * assert(output.amount === 1000000n);
//  *
//  * @since 2.0.0
//  * @category constructors
//  */
// export const make = (
//   addressBytes: Uint8Array,
//   amount: bigint,
// ): Effect.Effect<TransactionOutput, TransactionOutputError> => {
//   return Effect.succeed(
//     TransactionOutput.make(
//       { address: addressBytes, amount },
//       { disableValidation: false }, // Let schema validation handle the non-negative check
//     ),
//   );
// };

// /**
//  * Method datum of TransactionOutput
//  *
//  * @since 2.0.0
//  * @category Methods
//  */
// export const datum: (
//   instance: CML.TransactionOutput,
// ) => Effect.Effect<CML.DatumOption | undefined, TransactionOutputError> = Effect
//   .fn((instance: CML.TransactionOutput) =>
//     Effect.try({
//       try: () => instance.datum(),
//       catch: () =>
//         new TransactionOutputError({
//           message: `TransactionOutput.datum failed `,
//         }),
//     })
//   );

// /**
//  * Unsafely calls instance.datum without Effect wrapper
//  *
//  * @since 2.0.0
//  * @category MethodsUnsafe
//  */
// export const datumUnsafe = (
//   instance: CML.TransactionOutput,
// ): CML.DatumOption | undefined => Effect.runSync(datum(instance));

// /**
//  * Method datumHash of TransactionOutput
//  *
//  * @since 2.0.0
//  * @category Methods
//  */
// export const datumHash: (
//   instance: CML.TransactionOutput,
// ) => Effect.Effect<CML.DatumHash | undefined, TransactionOutputError> = Effect
//   .fn((instance: CML.TransactionOutput) =>
//     Effect.try({
//       try: () => instance.datum_hash(),
//       catch: () =>
//         new TransactionOutputError({
//           message: `TransactionOutput.datumHash failed `,
//         }),
//     })
//   );

// /**
//  * Unsafely calls instance.datumHash without Effect wrapper
//  *
//  * @since 2.0.0
//  * @category MethodsUnsafe
//  */
// export const datumHashUnsafe = (
//   instance: CML.TransactionOutput,
// ): CML.DatumHash | undefined => Effect.runSync(datumHash(instance));

// /**
//  * Method scriptRef of TransactionOutput
//  *
//  * @since 2.0.0
//  * @category Methods
//  */
// export const scriptRef: (
//   instance: CML.TransactionOutput,
// ) => Effect.Effect<CML.Script | undefined, TransactionOutputError> = Effect.fn(
//   (instance: CML.TransactionOutput) =>
//     Effect.try({
//       try: () => instance.script_ref(),
//       catch: () =>
//         new TransactionOutputError({
//           message: `TransactionOutput.scriptRef failed `,
//         }),
//     }),
// );

// /**
//  * Unsafely calls instance.scriptRef without Effect wrapper
//  *
//  * @since 2.0.0
//  * @category MethodsUnsafe
//  */
// export const scriptRefUnsafe = (
//   instance: CML.TransactionOutput,
// ): CML.Script | undefined => Effect.runSync(scriptRef(instance));

// /**
//  * Convert TransactionOutput to CBOR bytes
//  * Internal helper function used by toCBOR
//  *
//  * @example
//  * import { TransactionOutput, Address, Bytes } from "@lucid-evolution/experimental";
//  * import assert from "assert";
//  *
//  * const address = Address.fromBech32OrThrow("addr1...");
//  * const transactionOutput = TransactionOutput.makeOrThrow({
//  *   address,
//  *   amount: 1000000n
//  * });
//  *
//  * const cborBytes = TransactionOutput.toCBORBytes(transactionOutput);
//  * // Verify the bytes are correct by converting back to hex
//  * const hexString = Bytes.toHexOrThrow(cborBytes);
//  * assert(hexString.startsWith("82"));  // Array of 2 elements in CBOR
//  *
//  * @since 2.0.0
//  * @category encoding/decoding
//  */
// const toCBORBytes: SerdeImpl.ToCBORBytes<TransactionOutput> = (
//   transactionOutput,
// ) => {
//   // According to CDDL: transaction_output = [address, amount : coin]
//   // where coin = uint
//   return CBOR.encodeOrThrow([
//     transactionOutput.address, // Already raw bytes
//     transactionOutput.amount,
//   ]);
// };

// /**
//  * CBOR diagnostic notation for TransactionOutput (Shelley era):
//  * transaction_output = [address, amount]
//  *
//  * CBOR hex for TransactionOutput:
//  * [ h'address_bytes', amount_uint ]
//  *
//  * Convert TransactionOutput to CBOR hex encoding
//  * Uses a pre-configured CBOR encoder for better performance
//  *
//  * @example
//  * import { TransactionOutput, Address } from "@lucid-evolution/experimental";
//  * import assert from "assert";
//  *
//  * const address = Address.fromBech32OrThrow("addr1...");
//  * const transactionOutput = TransactionOutput.makeOrThrow({
//  *   address,
//  *   amount: 1000000n
//  * });
//  *
//  * const cbor = TransactionOutput.toCBOR(transactionOutput);
//  * assert(cbor.startsWith("82"));  // Array of 2 elements in CBOR
//  *
//  * @since 2.0.0
//  * @category encoding/decoding
//  */
// export const toCBOR: SerdeImpl.ToCBOR<TransactionOutput> = (
//   transactionOutput,
// ) => Bytes.toHexOrThrow(toCBORBytes(transactionOutput));

// /**
//  * Decode CBOR bytes to a TransactionOutput
//  * Internal helper function used by fromCBOR
//  *
//  * @example
//  * import { TransactionOutput, Bytes } from "@lucid-evolution/experimental";
//  * import { Effect } from "effect";
//  * import assert from "assert";
//  *
//  * const bytes = Bytes.fromHexOrThrow("8258390001..."); // CBOR encoded [address, amount]
//  * const transactionOutputEffect = TransactionOutput.fromCBORBytes(bytes);
//  * const transactionOutput = Effect.runSync(transactionOutputEffect);
//  * assert(transactionOutput.address instanceof Uint8Array);
//  * assert(typeof transactionOutput.amount === "bigint");
//  *
//  * @since 2.0.0
//  * @category encoding/decoding
//  */
// export const fromCBORBytes: SerdeImpl.FromCBORBytes<
//   TransactionOutput,
//   CBOR.CBORError | TransactionOutputError
// > = Effect.fnUntraced(function* (bytes) {
//   // CBOR decode should give us [addressBytes, amount] where amount is uint (coin)
//   const decoded: [Uint8Array, bigint] = yield* CBOR.decode(bytes);

//   if (!Array.isArray(decoded) || decoded.length !== 2) {
//     return yield* Effect.fail(
//       new TransactionOutputError({
//         message: "Invalid TransactionOutput CBOR: expected array of length 2",
//       }),
//     );
//   }

//   const [addressBytes, amount] = decoded;

//   return TransactionOutput.make({
//     address: addressBytes,
//     amount,
//   }, { disableValidation: true });
// });

// /**
//  * Decode a CBOR hex string to a TransactionOutput
//  *
//  * @example
//  * import { TransactionOutput } from "@lucid-evolution/experimental";
//  * import { Effect } from "effect";
//  * import assert from "assert";
//  *
//  * const cborHex = "8258390001..."; // CBOR hex for [address, amount]
//  * const transactionOutputEffect = TransactionOutput.fromCBOR(cborHex);
//  * const transactionOutput = Effect.runSync(transactionOutputEffect);
//  * assert(Address.isAddress(transactionOutput.address));
//  * assert(typeof transactionOutput.amount === "bigint");
//  *
//  * @since 2.0.0
//  * @category encoding/decoding
//  */
// export const fromCBOR: SerdeImpl.FromCBOR<
//   TransactionOutput,
//   | CBOR.CBORError
//   | TransactionOutputError
//   | Bytes.BytesError
// > = Effect.fn(function* (cborHex) {
//   const bytes = yield* Bytes.fromHex(cborHex);
//   return yield* fromCBORBytes(bytes);
// });

// /**
//  * Decode CBOR bytes to a TransactionOutput, throws on error.
//  *
//  * @example
//  * import { TransactionOutput, Bytes } from "@lucid-evolution/experimental";
//  * import assert from "assert";
//  *
//  * const bytes = Bytes.fromHexOrThrow("8258390001..."); // CBOR for [address, amount]
//  * const transactionOutput = TransactionOutput.fromCBORBytesOrThrow(bytes);
//  * assert(Address.isAddress(transactionOutput.address));
//  * assert(typeof transactionOutput.amount === "bigint");
//  *
//  * @since 2.0.0
//  * @category encoding/decoding
//  */
// export const fromCBORBytesOrThrow: SerdeImpl.FromCBORBytesOrThrow<
//   TransactionOutput
// > = (bytes) => Effect.runSync(fromCBORBytes(bytes));

// /**
//  * Decode a CBOR hex string to a TransactionOutput, throws on error.
//  *
//  * @example
//  * import { TransactionOutput } from "@lucid-evolution/experimental";
//  * import assert from "assert";
//  *
//  * const cborHex = "8258390001..."; // CBOR hex for [address, amount]
//  * const transactionOutput = TransactionOutput.fromCBOROrThrow(cborHex);
//  * assert(Address.isAddress(transactionOutput.address));
//  * assert(typeof transactionOutput.amount === "bigint");
//  *
//  * @since 2.0.0
//  * @category encoding/decoding
//  */
// export const fromCBOROrThrow: SerdeImpl.FromCBOROrThrow<TransactionOutput> = (
//   cborHex: string,
// ) => {
//   const bytes = Bytes.fromHexOrThrow(cborHex);
//   return fromCBORBytesOrThrow(bytes);
// };

// /**
//  * Check if two TransactionOutput instances are equal.
//  *
//  * @example
//  * import { TransactionOutput, Address } from "@lucid-evolution/experimental";
//  * import assert from "assert";
//  *
//  * const address = Address.fromBech32OrThrow("addr1...");
//  *
//  * const output1 = TransactionOutput.makeOrThrow({ address, amount: 1000000n });
//  * const output2 = TransactionOutput.makeOrThrow({ address, amount: 1000000n });
//  * const output3 = TransactionOutput.makeOrThrow({ address, amount: 2000000n });
//  *
//  * assert(TransactionOutput.equals(output1, output2) === true);
//  * assert(TransactionOutput.equals(output1, output3) === false);
//  *
//  * @since 2.0.0
//  * @category equality
//  */
// export const equals = (a: TransactionOutput, b: TransactionOutput): boolean => {
//   return (
//     a._tag === b._tag &&
//     a.amount === b.amount &&
//     a.address.length === b.address.length &&
//     a.address.every((byte, i) => byte === b.address[i])
//   );
// };

// /**
//  * Static method newAlonzoFormatTxOut of TransactionOutput
//  *
//  * @since 2.0.0
//  * @category Constructors
//  */
// export const newAlonzoFormatTxOut: (
//   alonzoFormatTxOut: CML.AlonzoFormatTxOut,
// ) => Effect.Effect<CML.TransactionOutput, TransactionOutputError> = Effect.fn(
//   function* (alonzoFormatTxOut: CML.AlonzoFormatTxOut) {
//     return yield* Effect.try({
//       try: () =>
//         CML.TransactionOutput.new_alonzo_format_tx_out(alonzoFormatTxOut),
//       catch: () =>
//         new TransactionOutputError({
//           message:
//             `TransactionOutput.newAlonzoFormatTxOut failed with parameters: ${alonzoFormatTxOut} (AlonzoFormatTxOut). `,
//         }),
//     });
//   },
// );

// /**
//  * Unsafely calls TransactionOutput.newAlonzoFormatTxOut without Effect wrapper
//  *
//  * @since 2.0.0
//  * @category ConstructorsUnsafe
//  */
// export const newAlonzoFormatTxOutUnsafe = (
//   alonzoFormatTxOut: CML.AlonzoFormatTxOut,
// ): CML.TransactionOutput =>
//   Effect.runSync(newAlonzoFormatTxOut(alonzoFormatTxOut));

// /**
//  * Static method newConwayFormatTxOut of TransactionOutput
//  *
//  * @since 2.0.0
//  * @category Constructors
//  */
// export const newConwayFormatTxOut: (
//   conwayFormatTxOut: CML.ConwayFormatTxOut,
// ) => Effect.Effect<CML.TransactionOutput, TransactionOutputError> = Effect.fn(
//   function* (conwayFormatTxOut: CML.ConwayFormatTxOut) {
//     return yield* Effect.try({
//       try: () =>
//         CML.TransactionOutput.new_conway_format_tx_out(conwayFormatTxOut),
//       catch: () =>
//         new TransactionOutputError({
//           message:
//             `TransactionOutput.newConwayFormatTxOut failed with parameters: ${conwayFormatTxOut} (ConwayFormatTxOut). `,
//         }),
//     });
//   },
// );

// /**
//  * Unsafely calls TransactionOutput.newConwayFormatTxOut without Effect wrapper
//  *
//  * @since 2.0.0
//  * @category ConstructorsUnsafe
//  */
// export const newConwayFormatTxOutUnsafe = (
//   conwayFormatTxOut: CML.ConwayFormatTxOut,
// ): CML.TransactionOutput =>
//   Effect.runSync(newConwayFormatTxOut(conwayFormatTxOut));

// /**
//  * Method kind of TransactionOutput
//  *
//  * @since 2.0.0
//  * @category Methods
//  */
// export const kind: (
//   instance: CML.TransactionOutput,
// ) => Effect.Effect<CML.TransactionOutputKind, TransactionOutputError> = Effect
//   .fn((instance: CML.TransactionOutput) =>
//     Effect.try({
//       try: () => instance.kind(),
//       catch: () =>
//         new TransactionOutputError({
//           message: `TransactionOutput.kind failed `,
//         }),
//     })
//   );

// /**
//  * Unsafely calls instance.kind without Effect wrapper
//  *
//  * @since 2.0.0
//  * @category MethodsUnsafe
//  */
// export const kindUnsafe = (
//   instance: CML.TransactionOutput,
// ): CML.TransactionOutputKind => Effect.runSync(kind(instance));

// /**
//  * Method asAlonzoFormatTxOut of TransactionOutput
//  *
//  * @since 2.0.0
//  * @category Methods
//  */
// export const asAlonzoFormatTxOut: (
//   instance: CML.TransactionOutput,
// ) => Effect.Effect<CML.AlonzoFormatTxOut | undefined, TransactionOutputError> =
//   Effect.fn((instance: CML.TransactionOutput) =>
//     Effect.try({
//       try: () => instance.as_alonzo_format_tx_out(),
//       catch: () =>
//         new TransactionOutputError({
//           message: `TransactionOutput.asAlonzoFormatTxOut failed `,
//         }),
//     })
//   );

// /**
//  * Unsafely calls instance.asAlonzoFormatTxOut without Effect wrapper
//  *
//  * @since 2.0.0
//  * @category MethodsUnsafe
//  */
// export const asAlonzoFormatTxOutUnsafe = (
//   instance: CML.TransactionOutput,
// ): CML.AlonzoFormatTxOut | undefined =>
//   Effect.runSync(asAlonzoFormatTxOut(instance));

// /**
//  * Method asConwayFormatTxOut of TransactionOutput
//  *
//  * @since 2.0.0
//  * @category Methods
//  */
// export const asConwayFormatTxOut: (
//   instance: CML.TransactionOutput,
// ) => Effect.Effect<CML.ConwayFormatTxOut | undefined, TransactionOutputError> =
//   Effect.fn((instance: CML.TransactionOutput) =>
//     Effect.try({
//       try: () => instance.as_conway_format_tx_out(),
//       catch: () =>
//         new TransactionOutputError({
//           message: `TransactionOutput.asConwayFormatTxOut failed `,
//         }),
//     })
//   );

// /**
//  * Unsafely calls instance.asConwayFormatTxOut without Effect wrapper
//  *
//  * @since 2.0.0
//  * @category MethodsUnsafe
//  */
// export const asConwayFormatTxOutUnsafe = (
//   instance: CML.TransactionOutput,
// ): CML.ConwayFormatTxOut | undefined =>
//   Effect.runSync(asConwayFormatTxOut(instance));
