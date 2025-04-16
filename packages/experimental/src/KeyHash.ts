import { Effect, Schema, Data } from "effect";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";
import { HexStringSchema } from "./Combinator.js";

/**
 * The length in bytes of a KeyHash.
 *
 * @since 2.0.0
 * @category constants
 */
export const KEYHASH_BYTES_LENGTH = 28;

/**
 * The length in hex characters of a KeyHash.
 *
 * @since 2.0.0
 * @category constants
 */
export const KEYHASH_HEX_LENGTH = 56;

/**
 * Error class for KeyHash related operations.
 *
 * @example
 * import { KeyHash} from "@lucid-evolution/experimental";
 * const error = new KeyHash.KeyHashError({ message: "Invalid key hash" });
 *
 * @since 2.0.0
 * @category errors
 */
export class KeyHashError extends Data.TaggedError("KeyHashError")<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Schema for validating KeyHash hex strings with proper length.
 *
 * @since 2.0.0
 * @category schemas
 */
const KeyHashHexString = HexStringSchema.pipe(
  Schema.length(KEYHASH_HEX_LENGTH),
).annotations({
  message: (issue) =>
    `must be ${KEYHASH_HEX_LENGTH} characters, got: ${issue.actual}.`,
});

/**
 * Schema for KeyHash representing a verification key hash.
 * Follows CIP-0019 binary representation.
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
 * const keyHash = KeyHash.makeOrThrow({
 *   hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"
 * });
 *
 * @since 2.0.0
 * @category schemas
 */
export class KeyHash extends Schema.TaggedClass<KeyHash>()("KeyHash", {
  hash: KeyHashHexString,
}) {}

type ToCBORBytes<T> = (value: T) => Uint8Array;

/**
 * Convert a KeyHash to CBOR bytes.
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
 * const keyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const bytes = KeyHash.toCBORBytes(keyHash);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toCBORBytes: ToCBORBytes<KeyHash> = (keyHash) => {
  const hashBytes = Bytes.fromHexOrThrow(keyHash.hash);
  return CBOR.encodeOrThrow(hashBytes);
};

type ToCBOR<T> = (value: T) => string;

/**
 * Convert a KeyHash to CBOR hex string.
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
 * const keyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const hex = KeyHash.toCBOR(keyHash);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toCBOR: ToCBOR<KeyHash> = (keyHash) => {
  const bytes = toCBORBytes(keyHash);
  return Bytes.toHexOrThrow(bytes);
};

type FromCBOR<Output, Error> = (
  cborHex: string,
) => Effect.Effect<Output, Error>;

/**
 * Create a KeyHash from a CBOR hex string.
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * const cborHex = "581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
 * const keyHash = Effect.runSync(KeyHash.fromCBOR(cborHex));
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBOR: FromCBOR<
  KeyHash,
  CBOR.CBORError | Bytes.BytesError | KeyHashError
> = Effect.fn(function* (cborHex) {
  const keyHash = yield* CBOR.decodeHex(cborHex);
  return yield* fromBytes(keyHash);
});

/**
 * Create a KeyHash from a CBOR hex string, throws on error.
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
 * const keyHash = KeyHash.fromCBOROrThrow("581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBOROrThrow = (cborHex: string) => {
  const bytes = CBOR.decodeHexOrThrow(cborHex);
  return fromBytesOrThrow(bytes);
};

type FromCBORBytes<Output, Error> = (
  cborBytes: Uint8Array,
) => Effect.Effect<Output, Error>;

/**
 * Create a KeyHash from CBOR bytes.
 *
 * @example
 * import { KeyHash, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * const bytes = Bytes.fromHexOrThrow("581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const keyHash = Effect.runSync(KeyHash.fromCBORBytes(bytes));
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBORBytes: FromCBORBytes<
  KeyHash,
  CBOR.CBORError | KeyHashError
> = Effect.fn(function* (cborBytes) {
  const hashBytes = yield* CBOR.decode(cborBytes);
  return yield* fromBytes(hashBytes);
});

/**
 * Create a KeyHash from CBOR bytes, throws on error.
 *
 * @example
 * import { KeyHash, Bytes } from "@lucid-evolution/experimental";
 * const bytes = Bytes.fromHexOrThrow("581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const keyHash = KeyHash.fromCBORBytesOrThrow(bytes);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBORBytesOrThrow = (bytes: Uint8Array) =>
  Effect.runSync(fromCBORBytes(bytes));

type FromBytes<Output, Error> = (
  bytes: Uint8Array,
) => Effect.Effect<Output, Error>;

/**
 * Create a KeyHash directly from bytes.
 *
 * @example
 * import { KeyHash, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * const bytes = Bytes.fromHexOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const keyHash = Effect.runSync(KeyHash.fromBytes(bytes));
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromBytes: FromBytes<KeyHash, KeyHashError> = Effect.fn(
  function* (bytes) {
    if (bytes.length !== KEYHASH_BYTES_LENGTH) {
      return yield* new KeyHashError({
        message: `KeyHash must be ${KEYHASH_BYTES_LENGTH} bytes long, got: ${bytes.length}.`,
      });
    }
    const hash = Bytes.toHexOrThrow(bytes);
    return new KeyHash({ hash }, { disableValidation: true });
  },
);

/**
 * Create a KeyHash directly from bytes, throws on error.
 *
 * @example
 * import { KeyHash , Bytes } from "@lucid-evolution/experimental";
 * const bytes = Bytes.fromHexOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const keyHash = KeyHash.fromBytesOrThrow(bytes);
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromBytesOrThrow = (bytes: Uint8Array) => {
  if (bytes.length !== KEYHASH_BYTES_LENGTH) {
    throw new KeyHashError({
      message: `KeyHash must be ${KEYHASH_BYTES_LENGTH} bytes long.`,
    });
  }
  const hash = Bytes.toHexOrThrow(bytes);
  return new KeyHash({ hash }, { disableValidation: true });
};

type ToBytes<T> = (value: T) => Uint8Array;

/**
 * Convert a KeyHash to bytes.
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
 * const keyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const bytes = KeyHash.toBytes(keyHash);
 *
 * @since 2.0.0
 * @category transformation
 */
export const toBytes: ToBytes<KeyHash> = (keyHash) =>
  Bytes.fromHexOrThrow(keyHash.hash);

type Make<Output, Error> = (hash: string) => Effect.Effect<Output, Error>;

/**
 * Construct a KeyHash from a hex string.
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * const keyHash = Effect.runSync(KeyHash.make("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"));
 *
 * @since 2.0.0
 * @category constructors
 */
export const make: Make<KeyHash, KeyHashError> = Effect.fnUntraced(
  function* (hash) {
    if (hash.length !== KEYHASH_HEX_LENGTH) {
      return yield* new KeyHashError({
        message: `KeyHash must be ${KEYHASH_HEX_LENGTH} characters long.`,
      });
    }
    if (!Bytes.isHex(hash)) {
      return yield* new KeyHashError({
        message: `KeyHash must be a valid hex string.`,
      });
    }
    return new KeyHash({ hash }, { disableValidation: true });
  },
);

type MakeOrThrow<T> = (hash: string) => T;
/**
 * Construct a KeyHash from a hex string, throws on error.
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
 * const keyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category constructors
 */
export const makeOrThrow: MakeOrThrow<KeyHash> = (hash: string) => {
  if (!Bytes.isHex(hash)) {
    throw new KeyHashError({
      message: `KeyHash must be a valid hex string.`,
    });
  }
  if (hash.length !== KEYHASH_HEX_LENGTH) {
    throw new KeyHashError({
      message: `KeyHash must be ${KEYHASH_HEX_LENGTH} characters long.`,
    });
  }
  return new KeyHash({ hash }, { disableValidation: true });
};
