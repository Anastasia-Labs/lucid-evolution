import { Effect, Schema, Data, FastCheck, pipe, ParseResult } from "effect";
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
 * Used to identify ownership of addresses or stake rights
 *
 * @since 2.0.0
 * @category schemas
 */
//TODO: make it Schema.TaggedClass
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

export const CBORBytesSchema = Schema.transformOrFail(
  Schema.Uint8ArrayFromSelf.annotations({
    identifier: "CBORBytes",
  }),
  Schema.typeSchema(Credential),
  {
    strict: true,
    encode: (_, __, ___, toA) => {
      switch (toA._tag) {
        case "KeyHash":
          return ParseResult.succeed(
            CBOR.Encode().bytes([0, Bytes.Decode.hex(toA)]),
          );
        case "ScriptHash":
          return ParseResult.succeed(
            CBOR.Encode().bytes([1, Bytes.Decode.hex(toA.hash)]),
          );
      }
    },
    decode: (_, __, ___, fromA) =>
      pipe(
        ParseResult.decode(
          CBOR.makeCBORBytesSchema(
            Schema.Tuple(Schema.Literal(0, 1), Schema.Uint8ArrayFromSelf),
          ),
        )(fromA),
        Effect.flatMap(([tag, bytes]) =>
          Effect.gen(function* () {
            switch (tag) {
              case 0:
                return yield* ParseResult.succeed({
                  _tag: "KeyHash" as const,
                  hash: KeyHash.Decode.bytes(bytes),
                });
              case 1:
                return yield* ParseResult.succeed({
                  _tag: "ScriptHash" as const,
                  hash: ScriptHash.Decode.bytes(bytes),
                });
            }
          }),
        ),
      ),
  },
);

export const CBORHexSchema = Schema.transformOrFail(
  Schema.typeSchema(Bytes.HexSchema),
  Credential,
  {
    strict: true,
    encode: (_, __, ___, toA) =>
      pipe(
        ParseResult.encode(CBORBytesSchema)(toA),
        Effect.map(Bytes.Encode.hex),
      ),
    decode: (fromA) =>
      pipe(Bytes.Decode.hex(fromA), ParseResult.decode(CBORBytesSchema)),
  },
);

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
 * import { Credential } from "@lucid-evolution/experimental";
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

/**
 * Synchronous encoding utilities for enterprise address.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  cborHex: Schema.encodeSync(CBORHexSchema),
  cborBytes: Schema.encodeSync(CBORBytesSchema),
};

/**
 * Synchronous decoding utilities for enterprise address.
 *
 @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  cborHex: Schema.decodeUnknownSync(CBORHexSchema),
  cborBytes: Schema.decodeUnknownSync(CBORBytesSchema),
};

/**
 * Either encoding utilities for enterprise address.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  cborHex: Schema.encodeEither(CBORHexSchema),
  cborBytes: Schema.encodeEither(CBORBytesSchema),
};

/**
 * Either decoding utilities for enterprise address.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  cborHex: Schema.decodeUnknownEither(CBORHexSchema),
  cborBytes: Schema.decodeUnknownEither(CBORBytesSchema),
};
