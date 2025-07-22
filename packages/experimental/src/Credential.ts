import { Effect, Schema, Data, FastCheck, ParseResult } from "effect";
import * as KeyHash from "./KeyHash.js";
import * as ScriptHash from "./ScriptHash.js";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";

/**
 * Extends TaggedError for better error handling and categorization
 *
 * @since 2.0.0
 * @category errors
 */

export class CredentialError extends Data.TaggedError("CredentialError")<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Credential schema representing either a key hash or script hash
 * credential = [0, addr_keyhash // 1, script_hash]
 * Used to identify ownership of addresses or stake rights
 *
 * @since 2.0.0
 * @category schemas
 */
export const Credential = Schema.Union(
  Schema.TaggedStruct("KeyHash", {
    hash: KeyHash.KeyHash,
  }),
  Schema.TaggedStruct("ScriptHash", {
    hash: ScriptHash.ScriptHash,
  }),
);

/**
 * Type representing a credential that can be either a key hash or script hash
 * Used in various address formats to identify ownership
 *
 * @since 2.0.0
 * @category model
 */
export type Credential = typeof Credential.Type;

/**
 * Check if the given value is a valid Credential
 *
 * @since 2.0.0
 * @category predicates
 */
export const isCredential = Schema.is(Credential);

/**
 * CDDL schema for Credential as defined in the specification:
 * credential = [0, addr_keyhash // 1, script_hash]
 *
 * @since 2.0.0
 * @category schemas
 */
export const CredentialCDDLSchema = Schema.transformOrFail(
  Schema.Tuple(
    Schema.Literal(0n, 1n),
    Schema.Uint8ArrayFromSelf, // hash bytes
  ),
  Schema.typeSchema(Credential),
  {
    strict: true,
    encode: (toI) =>
      Effect.gen(function* () {
        switch (toI._tag) {
          case "KeyHash": {
            const keyHashBytes = yield* ParseResult.encode(KeyHash.BytesSchema)(
              toI.hash,
            );
            return [0n, keyHashBytes] as const;
          }
          case "ScriptHash": {
            const scriptHashBytes = yield* ParseResult.encode(
              ScriptHash.BytesSchema,
            )(toI.hash);
            return [1n, scriptHashBytes] as const;
          }
        }
      }),
    decode: ([tag, hashBytes]) =>
      Effect.gen(function* () {
        switch (tag) {
          case 0n: {
            const keyHash = yield* ParseResult.decode(KeyHash.BytesSchema)(
              hashBytes,
            );
            return Credential.members[0].make({ hash: keyHash });
          }
          case 1n: {
            const scriptHash = yield* ParseResult.decode(
              ScriptHash.BytesSchema,
            )(hashBytes);
            return Credential.members[1].make({ hash: scriptHash });
          }
        }
      }),
  },
);

export const CBORBytesSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    CBOR.CBORBytesSchema(options), // Uint8Array → CBOR
    CredentialCDDLSchema, // CBOR → Credential
  );

export const CBORHexSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    Bytes.BytesSchema, // string → Uint8Array
    CBORBytesSchema(options), // Uint8Array → Credential
  );

export const Codec = (options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS) => ({
  Encode: {
    cborBytes: Schema.encodeSync(CBORBytesSchema(options)),
    cborHex: Schema.encodeSync(CBORHexSchema(options)),
  },
  Decode: {
    cborBytes: Schema.decodeUnknownSync(CBORBytesSchema(options)),
    cborHex: Schema.decodeUnknownSync(CBORHexSchema(options)),
  },
  EncodeEither: {
    cborBytes: Schema.encodeEither(CBORBytesSchema(options)),
    cborHex: Schema.encodeEither(CBORHexSchema(options)),
  },
  DecodeEither: {
    cborBytes: Schema.decodeEither(CBORBytesSchema(options)),
    cborHex: Schema.decodeEither(CBORHexSchema(options)),
  },
  EncodeEffect: {
    cborBytes: Schema.encode(CBORBytesSchema(options)),
    cborHex: Schema.encode(CBORHexSchema(options)),
  },
  DecodeEffect: {
    cborBytes: Schema.decode(CBORBytesSchema(options)),
    cborHex: Schema.decode(CBORHexSchema(options)),
  },
});

/**
 * Check if two Credential instances are equal.
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: Credential, b: Credential): boolean => {
  return a._tag === b._tag && a.hash === b.hash;
};

/**
 * Generate a random Credential.
 * Randomly selects between generating a KeyHash or ScriptHash credential.
 *
 * @example
 * import { Credential } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(Credential.generator, 20);
 * randomSamples.forEach((credential) => {
 *   assert(credential._tag === "KeyHash" || credential._tag === "ScriptHash");
 *   assert(credential.hash.length === 56);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.oneof(
  FastCheck.record({
    _tag: FastCheck.constant("KeyHash" as const),
    hash: KeyHash.generator,
  }),
  FastCheck.record({
    _tag: FastCheck.constant("ScriptHash" as const),
    hash: ScriptHash.generator,
  }),
);
