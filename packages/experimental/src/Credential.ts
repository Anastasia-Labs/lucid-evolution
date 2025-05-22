import { Effect, Schema, Data, FastCheck, pipe, ParseResult } from "effect";
import * as KeyHash from "./KeyHash.js";
import * as ScriptHash from "./ScriptHash.js";
import * as CBOR from "./CBOR.js";
import * as Serialization from "./Serialization.js";
import * as Hex from "./Hex.js";

/**
 * Extends TaggedError for better error handling and categorization
 *
 * @since 2.0.0
 * @category errors
 */

class CredentialError extends Data.TaggedError("CredentialError")<{
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
const Credential = Schema.Union(KeyHash.KeyHash, ScriptHash.ScriptHash);

/**
 * Type representing a credential that can be either a key hash or script hash
 * Used in various address formats to identify ownership
 *
 * @since 2.0.0
 * @category model
 */
type Credential = typeof Credential.Type;

/**
 * Check if the given value is a valid Credential
 *
 * @example
 * import { Credential , KeyHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const credential = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const isValid = Credential.isCredential(credential);
 * assert(isValid === true);
 *
 * @since 2.0.0
 * @category predicates
 */
const isCredential = Schema.is(Credential);

const CredentialFromCBORBytes = Schema.transformOrFail(
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
            CBOR.encodeAsBytesOrThrow([0, Hex.toBytes(toA.hash)])
          );
        case "ScriptHash":
          return ParseResult.succeed(
            CBOR.encodeAsBytesOrThrow([1, Hex.toBytes(toA.hash)])
          );
      }
    },
    decode: (fromI, options, ast, fromA) =>
      pipe(
        CBOR.decodeBytes(fromA),
        Effect.mapError((e) => new ParseResult.Type(ast, fromA, e.message)),
        Effect.flatMap((a) =>
          ParseResult.decode(
            Schema.Tuple(Schema.Literal(0, 1), Schema.Uint8ArrayFromSelf).annotations({
              identifier: "CredentialTuple",
            })
          )(a)
        ),
        Effect.flatMap(([tag, bytesDecoded]) =>
          Effect.gen(function* () {
            switch (tag) {
              case 0:
                return yield* ParseResult.decode(KeyHash.KeyHashFromUint8Array)(
                  bytesDecoded
                );
              case 1:
                return yield* ParseResult.decode(
                  ScriptHash.ScriptHashFromUint8Array
                )(bytesDecoded);
            }
          })
        )
      ),
  }
);

const CredentialFromCBORHex = Schema.transformOrFail(
  Hex.HexString.pipe(Schema.typeSchema).annotations({
    identifier: "CBORHex",
  }),
  Credential,
  {
    strict: true,
    encode: (toI, options, ast, toA) =>
      pipe(
        ParseResult.encode(CredentialFromCBORBytes)(toA),
        Effect.map(Hex.fromBytes)
      ),
    decode: (fromA, options, ast) =>
      pipe(Hex.toBytes(fromA), ParseResult.decode(CredentialFromCBORBytes)),
  }
);

/**
 * Check if two Credential instances are equal.
 *
 * @example
 * import { Credential, KeyHash, ScriptHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const keyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const sameKeyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const scriptHash = ScriptHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * assert(Credential.equals(keyHash, sameKeyHash) === true);
 * assert(Credential.equals(keyHash, scriptHash) === false);
 *
 * @since 2.0.0
 * @category equality
 */
const equals = (a: Credential, b: Credential): boolean => {
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
const generator = FastCheck.oneof(KeyHash.generator, ScriptHash.generator);

export {
  Credential,
  CredentialError,
  CredentialFromCBORBytes,
  CredentialFromCBORHex,
  isCredential,
  equals,
  generator,
};
