import { Effect, Schema, Data, FastCheck, pipe, ParseResult } from "effect";
import * as KeyHash from "./KeyHash.js";
import * as ScriptHash from "./ScriptHash.js";
import * as CBOR from "./CBOR.js";
import * as Hex from "./Hex.js";

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
export const Credential = Schema.Union(KeyHash.KeyHash, ScriptHash.ScriptHash);

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

export const CBORBytes = Schema.transformOrFail(
  Schema.Uint8ArrayFromSelf.annotations({
    identifier: "CBORBytes",
  }),
  Credential,
  {
    strict: true,
    encode: (toI, options, ast, toA) => {
      switch (toA._tag) {
        case "KeyHash":
          return ParseResult.succeed(
            CBOR.encodeAsBytesOrThrow([0, Hex.toBytes(toA.hash)]),
          );
        case "ScriptHash":
          return ParseResult.succeed(
            CBOR.encodeAsBytesOrThrow([1, Hex.toBytes(toA.hash)]),
          );
      }
    },
    decode: (fromI, options, ast, fromA) =>
      pipe(
        CBOR.decodeBytes(fromA),
        Effect.mapError((e) => new ParseResult.Type(ast, fromA, e.message)),
        Effect.flatMap((a) =>
          ParseResult.decode(
            Schema.Tuple(
              Schema.Literal(0, 1),
              Schema.Uint8ArrayFromSelf,
            ).annotations({
              identifier: "CredentialTuple",
            }),
          )(a),
        ),
        Effect.flatMap(([tag, bytesDecoded]) =>
          Effect.gen(function* () {
            switch (tag) {
              case 0:
                return yield* ParseResult.decode(KeyHash.Bytes)(bytesDecoded);
              case 1:
                return yield* ParseResult.decode(ScriptHash.Bytes)(
                  bytesDecoded,
                );
            }
          }),
        ),
      ),
  },
);

export const CBORHex = Schema.transformOrFail(
  Hex.HexString.pipe(Schema.typeSchema).annotations({
    identifier: "CBORHex",
  }),
  Credential,
  {
    strict: true,
    encode: (toI, options, ast, toA) =>
      pipe(ParseResult.encode(CBORBytes)(toA), Effect.map(Hex.fromBytes)),
    decode: (fromA, options, ast) =>
      pipe(Hex.toBytes(fromA), ParseResult.decode(CBORBytes)),
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
  KeyHash.generator,
  ScriptHash.generator,
);
