import { Effect, Schema, Data, FastCheck, Inspectable } from "effect";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";
import { HexStringSchema } from "./Combinator.js";
import * as SerdeImpl from "./SerdeImpl.js";

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
 * Error class for TransactionHash related operations
 * Extends TaggedError for better error handling and categorization
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
  "TransactionHashError",
)<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Schema for validating TransactionHash hex strings with proper length.
 *
 * @since 2.0.0
 * @category schemas
 */
const TransactionHashHexString = HexStringSchema.pipe(
  Schema.length(TRANSACTIONHASH_HEX_LENGTH),
).annotations({
  message: (issue) =>
    `must be ${TRANSACTIONHASH_HEX_LENGTH} characters, got: ${issue.actual}.`,
});

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
    hash: TransactionHashHexString,
  },
) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "TransactionHash",
      hash: this.hash,
    };
  }
}

/**
 * Convert a TransactionHash to CBOR bytes.
 *
 * @example
 * import { TransactionHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const transactionHash = TransactionHash.makeOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const bytes = TransactionHash.toCBORBytes(transactionHash);
 * assert(bytes instanceof Uint8Array);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toCBORBytes: SerdeImpl.ToCBORBytes<TransactionHash> = (
  transactionHash,
) => {
  const hashBytes = Bytes.fromHexOrThrow(transactionHash.hash);
  return CBOR.encodeOrThrow(hashBytes);
};

/**
 * Convert a TransactionHash to CBOR hex string.
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const transactionHash = TransactionHash.makeOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const hex = TransactionHash.toCBOR(transactionHash);
 * assert(hex.startsWith("5820"));
 * assert(hex.includes("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819"));
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toCBOR: SerdeImpl.ToCBOR<TransactionHash> = (transactionHash) => {
  const bytes = toCBORBytes(transactionHash);
  return Bytes.toHexOrThrow(bytes);
};

/**
 * Create a TransactionHash from a CBOR hex string.
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const cborHex = "5820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819";
 * const transactionHashEffect = TransactionHash.fromCBOR(cborHex);
 * const transactionHash = Effect.runSync(transactionHashEffect);
 * assert(transactionHash._tag === "TransactionHash");
 * assert(transactionHash.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBOR: SerdeImpl.FromCBOR<
  TransactionHash,
  CBOR.CBORError | Bytes.BytesError | TransactionHashError
> = Effect.fn(function* (cborHex) {
  const transactionHash = yield* CBOR.decodeHex(cborHex);
  return yield* fromBytes(transactionHash);
});

/**
 * Create a TransactionHash from a CBOR hex string, throws on error.
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const transactionHash = TransactionHash.fromCBOROrThrow("5820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * assert(transactionHash._tag === "TransactionHash");
 * assert(transactionHash.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBOROrThrow = (cborHex: string) => {
  const bytes = CBOR.decodeHexOrThrow(cborHex);
  return fromBytesOrThrow(bytes);
};

/**
 * Create a TransactionHash from CBOR bytes.
 *
 * @example
 * import { TransactionHash, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("5820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const transactionHashEffect = TransactionHash.fromCBORBytes(bytes);
 * const transactionHash = Effect.runSync(transactionHashEffect);
 * assert(transactionHash._tag === "TransactionHash");
 * assert(transactionHash.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBORBytes: SerdeImpl.FromCBORBytes<
  TransactionHash,
  CBOR.CBORError | TransactionHashError
> = Effect.fn(function* (cborBytes) {
  const hashBytes = yield* CBOR.decode(cborBytes);
  return yield* fromBytes(hashBytes);
});

/**
 * Create a TransactionHash from CBOR bytes, throws on error.
 *
 * @example
 * import { TransactionHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("5820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const transactionHash = TransactionHash.fromCBORBytesOrThrow(bytes);
 * assert(transactionHash._tag === "TransactionHash");
 * assert(transactionHash.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBORBytesOrThrow = (bytes: Uint8Array) =>
  Effect.runSync(fromCBORBytes(bytes));

/**
 * Create a TransactionHash directly from bytes.
 *
 * @example
 * import { TransactionHash, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const transactionHashEffect = TransactionHash.fromBytes(bytes);
 * const transactionHash = Effect.runSync(transactionHashEffect);
 * assert(transactionHash._tag === "TransactionHash");
 * assert(transactionHash.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromBytes: SerdeImpl.FromBytes<
  TransactionHash,
  TransactionHashError
> = Effect.fnUntraced(function* (bytes) {
  if (bytes.length !== TRANSACTIONHASH_BYTES_LENGTH) {
    return yield* new TransactionHashError({
      message: `TransactionHash must be ${TRANSACTIONHASH_BYTES_LENGTH} bytes long, got: ${bytes.length}.`,
    });
  }
  const hash = Bytes.toHexOrThrow(bytes);
  return new TransactionHash({ hash }, { disableValidation: true });
});

/**
 * Create a TransactionHash directly from bytes, throws on error.
 *
 * @example
 * import { TransactionHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const transactionHash = TransactionHash.fromBytesOrThrow(bytes);
 * assert(transactionHash._tag === "TransactionHash");
 * assert(transactionHash.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromBytesOrThrow = (bytes: Uint8Array) => {
  if (bytes.length !== TRANSACTIONHASH_BYTES_LENGTH) {
    throw new TransactionHashError({
      message: `TransactionHash must be ${TRANSACTIONHASH_BYTES_LENGTH} bytes long.`,
    });
  }
  const hash = Bytes.toHexOrThrow(bytes);
  return new TransactionHash({ hash }, { disableValidation: true });
};

/**
 * Convert a TransactionHash to bytes.
 *
 * @example
 * import { TransactionHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const transactionHash = TransactionHash.makeOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const bytes = TransactionHash.toBytes(transactionHash);
 * assert(bytes instanceof Uint8Array);
 * assert(bytes.length === 32);
 * assert(Bytes.toHexOrThrow(bytes) === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 *
 * @since 2.0.0
 * @category transformation
 */
export const toBytes: SerdeImpl.ToBytes<TransactionHash> = (transactionHash) =>
  Bytes.fromHexOrThrow(transactionHash.hash);

/**
 * Construct a TransactionHash from a hex string.
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const hash = "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819";
 * const transactionHashEffect = TransactionHash.make(hash);
 * const transactionHash = Effect.runSync(transactionHashEffect);
 * assert(transactionHash._tag === "TransactionHash");
 * assert(transactionHash.hash === hash);
 *
 * @since 2.0.0
 * @category constructors
 */
export const make: SerdeImpl.Make<TransactionHash, TransactionHashError> =
  Effect.fnUntraced(function* (hash) {
    if (!Bytes.isHex(hash)) {
      return yield* new TransactionHashError({
        message: `TransactionHash must be a valid hex string.`,
      });
    }
    if (hash.length !== TRANSACTIONHASH_HEX_LENGTH) {
      return yield* new TransactionHashError({
        message: `TransactionHash must be ${TRANSACTIONHASH_HEX_LENGTH} characters long.`,
      });
    }
    return new TransactionHash({ hash }, { disableValidation: true });
  });

/**
 * Construct a TransactionHash from a hex string, throws on error.
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const hash = "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819";
 * const transactionHash = TransactionHash.makeOrThrow(hash);
 * assert(transactionHash._tag === "TransactionHash");
 * assert(transactionHash.hash === hash);
 *
 * @since 2.0.0
 * @category constructors
 */
export const makeOrThrow: SerdeImpl.MakeOrThrow<TransactionHash> = (
  hash: string,
) => {
  if (!Bytes.isHex(hash)) {
    throw new TransactionHashError({
      message: `TransactionHash must be a valid hex string.`,
    });
  }
  if (hash.length !== TRANSACTIONHASH_HEX_LENGTH) {
    throw new TransactionHashError({
      message: `TransactionHash must be ${TRANSACTIONHASH_HEX_LENGTH} characters long.`,
    });
  }
  return new TransactionHash({ hash }, { disableValidation: true });
};

/**
 * Check if two TransactionHashes are equal.
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const hash1 = TransactionHash.makeOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const hash2 = TransactionHash.makeOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const hash3 = TransactionHash.makeOrThrow("dc97057e0949d9676e55b69f28fcb2dccb8002583a4ad761f1dbfb985f36085c");
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
 * Generate a random TransactionHash using FastCheck.
 *
 * This is useful for testing purposes.
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
}).map((bytes) => fromBytesOrThrow(bytes));
