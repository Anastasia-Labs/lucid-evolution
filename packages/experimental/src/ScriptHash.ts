import { Effect, Schema, Data } from "effect";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";
import { HexStringSchema } from "./Combinator.js";
import * as SerdeImpl from "./SerdeImpl.js";

/**
 * The length in bytes of a ScriptHash.
 *
 * @since 2.0.0
 * @category constants
 */
export const SCRIPTHASH_BYTES_LENGTH = 28;

/**
 * The length in hex characters of a ScriptHash.
 *
 * @since 2.0.0
 * @category constants
 */
export const SCRIPTHASH_HEX_LENGTH = 56;

/**
 * Error class for ScriptHash related operations
 * Extends TaggedError for better error handling and categorization
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new ScriptHash.ScriptHashError({ message: "Invalid script hash" });
 * assert(error.message === "Invalid script hash");
 *
 * @since 2.0.0
 * @category errors
 */
export class ScriptHashError extends Data.TaggedError("ScriptHashError")<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Schema for validating ScriptHash hex strings with proper length.
 *
 * @since 2.0.0
 * @category schemas
 */
const ScriptHashHexString = HexStringSchema.pipe(
  Schema.length(SCRIPTHASH_HEX_LENGTH),
).annotations({
  message: (issue) =>
    `must be ${SCRIPTHASH_HEX_LENGTH} characters, got: ${issue.actual}.`,
});

/**
 * Schema for ScriptHash representing a script hash credential.
 * Follows CIP-0019 binary representation.
 *
 * @since 2.0.0
 * @category schemas
 */
export class ScriptHash extends Schema.TaggedClass<ScriptHash>()("ScriptHash", {
  hash: ScriptHashHexString,
}) {}

/**
 * Convert a ScriptHash to CBOR bytes.
 *
 * @example
 * import { ScriptHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const scriptHash = ScriptHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const bytes = ScriptHash.toCBORBytes(scriptHash);
 * assert(bytes instanceof Uint8Array);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toCBORBytes: SerdeImpl.ToCBORBytes<ScriptHash> = (scriptHash) => {
  const hashBytes = Bytes.fromHexOrThrow(scriptHash.hash);
  return CBOR.encodeOrThrow(hashBytes);
};

/**
 * Convert a ScriptHash to CBOR hex string.
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const scriptHash = ScriptHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const hex = ScriptHash.toCBOR(scriptHash);
 * assert(hex.startsWith("581c"));
 * assert(hex.includes("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"));
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toCBOR: SerdeImpl.ToCBOR<ScriptHash> = (scriptHash) => {
  const bytes = toCBORBytes(scriptHash);
  return Bytes.toHexOrThrow(bytes);
};

/**
 * Create a ScriptHash from a CBOR hex string.
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const cborHex = "581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
 * const scriptHashEffect = ScriptHash.fromCBOR(cborHex);
 * const scriptHash = Effect.runSync(scriptHashEffect);
 * assert(scriptHash._tag === "ScriptHash");
 * assert(scriptHash.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBOR: SerdeImpl.FromCBOR<
  ScriptHash,
  CBOR.CBORError | Bytes.BytesError | ScriptHashError
> = Effect.fn(function* (cborHex) {
  const scriptHash = yield* CBOR.decodeHex(cborHex);
  return yield* fromBytes(scriptHash);
});

/**
 * Create a ScriptHash from a CBOR hex string, throws on error.
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const scriptHash = ScriptHash.fromCBOROrThrow("581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * assert(scriptHash._tag === "ScriptHash");
 * assert(scriptHash.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBOROrThrow = (cborHex: string) => {
  const bytes = CBOR.decodeHexOrThrow(cborHex);
  return fromBytesOrThrow(bytes);
};

/**
 * Create a ScriptHash from CBOR bytes.
 *
 * @example
 * import { ScriptHash, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const scriptHashEffect = ScriptHash.fromCBORBytes(bytes);
 * const scriptHash = Effect.runSync(scriptHashEffect);
 * assert(scriptHash._tag === "ScriptHash");
 * assert(scriptHash.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBORBytes: SerdeImpl.FromCBORBytes<
  ScriptHash,
  CBOR.CBORError | ScriptHashError
> = Effect.fn(function* (cborBytes) {
  const hashBytes = yield* CBOR.decode(cborBytes);
  return yield* fromBytes(hashBytes);
});

/**
 * Create a ScriptHash from CBOR bytes, throws on error.
 *
 * @example
 * import { ScriptHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const scriptHash = ScriptHash.fromCBORBytesOrThrow(bytes);
 * assert(scriptHash._tag === "ScriptHash");
 * assert(scriptHash.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBORBytesOrThrow = (bytes: Uint8Array) =>
  Effect.runSync(fromCBORBytes(bytes));

/**
 * Create a ScriptHash directly from bytes.
 *
 * @example
 * import { ScriptHash, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const scriptHashEffect = ScriptHash.fromBytes(bytes);
 * const scriptHash = Effect.runSync(scriptHashEffect);
 * assert(scriptHash._tag === "ScriptHash");
 * assert(scriptHash.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromBytes: SerdeImpl.FromBytes<ScriptHash, ScriptHashError> =
  Effect.fnUntraced(function* (bytes) {
    if (bytes.length !== SCRIPTHASH_BYTES_LENGTH) {
      return yield* new ScriptHashError({
        message: `ScriptHash must be ${SCRIPTHASH_BYTES_LENGTH} bytes long, got: ${bytes.length}.`,
      });
    }
    const hash = Bytes.toHexOrThrow(bytes);
    return new ScriptHash({ hash }, { disableValidation: true });
  });

/**
 * Create a ScriptHash directly from bytes, throws on error.
 *
 * @example
 * import { ScriptHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const scriptHash = ScriptHash.fromBytesOrThrow(bytes);
 * assert(scriptHash._tag === "ScriptHash");
 * assert(scriptHash.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromBytesOrThrow = (bytes: Uint8Array) => {
  if (bytes.length !== SCRIPTHASH_BYTES_LENGTH) {
    throw new ScriptHashError({
      message: `ScriptHash must be ${SCRIPTHASH_BYTES_LENGTH} bytes long.`,
    });
  }
  const hash = Bytes.toHexOrThrow(bytes);
  return new ScriptHash({ hash }, { disableValidation: true });
};

/**
 * Convert a ScriptHash to bytes.
 *
 * @example
 * import { ScriptHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const scriptHash = ScriptHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const bytes = ScriptHash.toBytes(scriptHash);
 * assert(bytes instanceof Uint8Array);
 * assert(bytes.length === 28);
 * assert(Bytes.toHexOrThrow(bytes) === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category transformation
 */
export const toBytes: SerdeImpl.ToBytes<ScriptHash> = (scriptHash) =>
  Bytes.fromHexOrThrow(scriptHash.hash);

/**
 * Construct a ScriptHash from a hex string.
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const hash = "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
 * const scriptHashEffect = ScriptHash.make(hash);
 * const scriptHash = Effect.runSync(scriptHashEffect);
 * assert(scriptHash._tag === "ScriptHash");
 * assert(scriptHash.hash === hash);
 *
 * @since 2.0.0
 * @category constructors
 */
export const make: SerdeImpl.Make<ScriptHash, ScriptHashError> =
  Effect.fnUntraced(function* (hash) {
    if (hash.length !== SCRIPTHASH_HEX_LENGTH) {
      return yield* new ScriptHashError({
        message: `ScriptHash must be ${SCRIPTHASH_HEX_LENGTH} characters long.`,
      });
    }
    if (!Bytes.isHex(hash)) {
      return yield* new ScriptHashError({
        message: `ScriptHash must be a valid hex string.`,
      });
    }
    return new ScriptHash({ hash }, { disableValidation: true });
  });

/**
 * Construct a ScriptHash from a hex string, throws on error.
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const hash = "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
 * const scriptHash = ScriptHash.makeOrThrow(hash);
 * assert(scriptHash._tag === "ScriptHash");
 * assert(scriptHash.hash === hash);
 *
 * @since 2.0.0
 * @category constructors
 */
export const makeOrThrow: SerdeImpl.MakeOrThrow<ScriptHash> = (
  hash: string,
) => {
  if (!Bytes.isHex(hash)) {
    throw new ScriptHashError({
      message: `ScriptHash must be a valid hex string.`,
    });
  }
  if (hash.length !== SCRIPTHASH_HEX_LENGTH) {
    throw new ScriptHashError({
      message: `ScriptHash must be ${SCRIPTHASH_HEX_LENGTH} characters long.`,
    });
  }
  return new ScriptHash({ hash }, { disableValidation: true });
};
