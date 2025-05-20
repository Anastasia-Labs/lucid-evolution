import { Effect, Schema, Data, FastCheck, Inspectable, pipe } from "effect";
import * as CBOR from "./CBOR.js";
import * as Serialization from "./Serialization.js";
import * as Hex from "./Hex.js";
import * as Bytes from "./Bytes.js";

/**
 * The length in bytes of a TransactionHash.
 *
 * @since 2.0.0
 * @category constants
 */
export const TRANSACTIONHASH_BYTES_LENGTH = 32;

/**
 * The length in hex characters of a TransactionHash.
 *
 * @since 2.0.0
 * @category constants
 */
export const TRANSACTIONHASH_HEX_LENGTH = 64;

/**
 * Error class for TransactionHash related operations.
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new TransactionHash.TransactionHashError({ message: "Invalid transaction hash" });
 * assert(error.message === "Invalid transaction hash");
 *
 * @since 2.0.0
 * @category errors
 */
export class TransactionHashError extends Data.TaggedError(
  "TransactionHashError"
)<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

export declare const NominalType: unique symbol;
export interface TransactionHash {
  readonly [NominalType]: unique symbol;
}

/**
 * Schema for TransactionHash.
 *
 * @since 2.0.0
 * @category schemas
 */
export class TransactionHash extends Schema.TaggedClass<TransactionHash>()(
  "TransactionHash",
  {
    hash: Hex.HexString,
  }
) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "TransactionHash",
      hash: this.hash,
    };
  }
}

/**
 * Create a TransactionHash directly from bytes.
 *
 * @example
 * import { TransactionHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const transactionHash = TransactionHash.decodeBytesOrThrow(bytes);
 * assert(transactionHash._tag === "TransactionHash");
 * assert(transactionHash.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 *
 * @since 2.0.0
 * @category constructors
 */
export const decodeBytes: Serialization.FromBytes<
  TransactionHash,
  TransactionHashError
> = (bytes: Uint8Array) =>
  pipe(
    Effect.succeed(bytes),
    Effect.filterOrFail(
      (b) => b.length === TRANSACTIONHASH_BYTES_LENGTH,
      () =>
        new TransactionHashError({
          message: `TransactionHash raw bytes must be ${TRANSACTIONHASH_BYTES_LENGTH} bytes long. Got ${bytes.length}.`,
          reason: "InvalidBytesLength",
        })
    ),
    Effect.map(
      (validLengthBytes) =>
        new TransactionHash(
          { hash: Hex.fromBytes(validLengthBytes) },
          { disableValidation: true }
        )
    )
  );

/**
 * Create a TransactionHash directly from bytes, throws on error.
 *
 * @example
 * import { TransactionHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const transactionHash = TransactionHash.decodeBytesOrThrow(bytes);
 * assert(transactionHash._tag === "TransactionHash");
 * assert(transactionHash.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 *
 * @since 2.0.0
 * @category constructors
 */
export const decodeBytesOrThrow = (bytes: Uint8Array) =>
  Effect.runSync(decodeBytes(bytes));

/**
 * Convert a TransactionHash to bytes.
 *
 * @example
 * import { TransactionHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const transactionHash = TransactionHash.decodeHexOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const bytes = TransactionHash.encodeBytes(transactionHash);
 * assert(bytes instanceof Uint8Array);
 * assert(bytes.length === 32);
 * assert(Bytes.toHexOrThrow(bytes) === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 *
 * @since 2.0.0
 * @category transformation
 */
export const encodeBytes: Serialization.ToBytes<TransactionHash> = (
  transactionHash
) => Hex.toBytes(transactionHash.hash);

/**
 * Convert a TransactionHash to CBOR bytes.
 *
 * @example
 * import { TransactionHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const transactionHash = TransactionHash.decodeHexOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const bytes = TransactionHash.encodeCBORBytes(transactionHash);
 * assert(bytes instanceof Uint8Array);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const encodeCBORBytes: Serialization.ToCBORBytes<TransactionHash> = (
  transactionHash
) => CBOR.encodeAsBytesOrThrow(Hex.toBytes(transactionHash.hash));

/**
 * Convert a TransactionHash to CBOR hex string.
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const transactionHash = TransactionHash.decodeHexOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const hex = TransactionHash.encodeCBORHex(transactionHash);
 * assert(hex.startsWith("5820"));
 * assert(hex.includes("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819"));
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const encodeCBORHex: Serialization.ToCBOR<TransactionHash> = (
  transactionHash
) => Hex.fromBytes(encodeCBORBytes(transactionHash));

/**
 * Create a TransactionHash from a CBOR hex string.
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const cborHex = "5820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819";
 * const transactionHash = TransactionHash.decodeCBORHexOrThrow(cborHex);
 * assert(transactionHash._tag === "TransactionHash");
 * assert(transactionHash.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeCBORHex: Serialization.FromCBOR<
  string,
  TransactionHash,
  TransactionHashError
> = (maybeHex) =>
  pipe(
    Hex.decode(maybeHex),
    Effect.mapError((e) => new TransactionHashError({ message: e.message })),
    Effect.map((hex) => Hex.toBytes(hex)),
    Effect.flatMap((bytes) => decodeCBORBytes(bytes))
  );

/**
 * Create a TransactionHash from a CBOR hex string, throws on error.
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const cborHex = "5820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819";
 * const transactionHash = TransactionHash.decodeCBORHexOrThrow(cborHex);
 * assert(transactionHash._tag === "TransactionHash");
 * assert(transactionHash.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeCBORHexOrThrow: Serialization.FromCBOROrThrow<
  string,
  TransactionHash
> = (cborHex) => Effect.runSync(decodeCBORHex(cborHex));

/**
 * Create a TransactionHash from CBOR bytes.
 *
 * @example
 * import { TransactionHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("5820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const transactionHash = TransactionHash.decodeCBORBytesOrThrow(bytes);
 * assert(transactionHash._tag === "TransactionHash");
 * assert(transactionHash.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeCBORBytes: Serialization.FromCBORBytes<
  TransactionHash,
  TransactionHashError
> = (cborBytes) =>
  pipe(
    CBOR.decodeBytes(cborBytes),
    Effect.mapError(
      () =>
        new TransactionHashError({
          message: `TransactionHash CBOR bytes must be a valid CBOR format. Got ${Bytes.toHexOrThrow(cborBytes)}.`,
          reason: "InvalidCBORFormat",
        })
    ),
    Effect.flatMap((hashBytes) => decodeBytes(hashBytes))
  );

/**
 * Create a TransactionHash from CBOR bytes, throws on error.
 *
 * @example
 * import { TransactionHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("5820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const transactionHash = TransactionHash.decodeCBORBytesOrThrow(bytes);
 * assert(transactionHash._tag === "TransactionHash");
 * assert(transactionHash.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeCBORBytesOrThrow = (bytes: Uint8Array) =>
  Effect.runSync(decodeCBORBytes(bytes));

/**
 * Construct a TransactionHash from a hex string.
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const hash = "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819";
 * const transactionHash = TransactionHash.decodeHexOrThrow(hash);
 * assert(transactionHash._tag === "TransactionHash");
 * assert(transactionHash.hash === hash);
 *
 * @since 2.0.0
 * @category constructors
 */
export const decodeHex: Serialization.Make<TransactionHash, TransactionHashError> = (
  input: string
) =>
  pipe(
    Hex.decode(input),
    Effect.mapError(
      () =>
        new TransactionHashError({
          message: `TransactionHash hex string must be a valid hex string. Got ${input}.`,
          reason: "InvalidHexFormat",
        })
    ),
    Effect.filterOrFail(
      (h) => h.length === TRANSACTIONHASH_HEX_LENGTH,
      (actualHash) =>
        new TransactionHashError({
          message: `TransactionHash hex string must be ${TRANSACTIONHASH_HEX_LENGTH} characters long. Got ${actualHash.length}.`,
          reason: "InvalidHexLength",
        })
    ),
    Effect.map(
      (hex) => new TransactionHash({ hash: hex }, { disableValidation: true })
    )
  );

/**
 * Construct a TransactionHash from a hex string, throws on error.
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const hash = "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819";
 * const transactionHash = TransactionHash.decodeHexOrThrow(hash);
 * assert(transactionHash._tag === "TransactionHash");
 * assert(transactionHash.hash === hash);
 *
 * @since 2.0.0
 * @category constructors
 */
export const decodeHexOrThrow: Serialization.MakeOrThrow<string, TransactionHash> = (
  input
) => Effect.runSync(decodeHex(input));

/**
 * Check if two TransactionHash instances are equal.
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const hash1 = TransactionHash.decodeHexOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const hash2 = TransactionHash.decodeHexOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const hash3 = TransactionHash.decodeHexOrThrow("dc97057e0949d9676e55b69f28fcb2dccb8002583a4ad761f1dbfb985f36085c");
 *
 * assert(TransactionHash.equals(hash1, hash2) === true);
 * assert(TransactionHash.equals(hash1, hash3) === false);
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: TransactionHash, b: TransactionHash): boolean =>
  a.hash === b.hash;

/**
 * Generate a random TransactionHash.
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(TransactionHash.generator, 20);
 * randomSamples.forEach((transactionHash) => {
 *  assert(transactionHash.hash.length === 64);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: TRANSACTIONHASH_BYTES_LENGTH,
  maxLength: TRANSACTIONHASH_BYTES_LENGTH,
}).map((bytes) => decodeBytesOrThrow(bytes));
