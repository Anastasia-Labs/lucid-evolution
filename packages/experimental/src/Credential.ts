import { Effect, Schema, Data, FastCheck, pipe } from "effect";
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
export const isCredential = Schema.is(Credential);

/**
 * Convert credential to CBOR bytes
 * Internal helper function used by toCBOR
 *
 * @example
 * import { Credential, Bytes, KeyHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const keyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const cborBytes = Credential.encodeCBORBytes(keyHash);
 * // Verify the bytes are correct by converting back to hex
 * const hexString = Bytes.toHexOrThrow(cborBytes);
 * assert(hexString.startsWith("82"));  // Array of 2 elements in CBOR
 * assert(hexString.includes("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"));
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const encodeCBORBytes: Serialization.ToCBORBytes<Credential> = (
  credential
) => {
  switch (credential._tag) {
    case "KeyHash":
      return CBOR.encodeAsBytesOrThrow([0, Hex.toBytes(credential.hash)]);
    case "ScriptHash":
      return CBOR.encodeAsBytesOrThrow([1, Hex.toBytes(credential.hash)]);
  }
};

/**
 * CBOR diagnostic notation for Credential:
 * credential = [0, addr_keyhash // 1, script_hash]
 *
 * CBOR hex for ScriptHash:
 * [ 1, h'c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f' ]
 *
 * CBOR hex for KeyHash:
 * [ 0, h'c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f' ]
 *
 * Convert credential to CBOR hex encoding
 * Uses a pre-configured CBOR encoder for better performance
 *
 * @example
 * import { Credential, ScriptHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const scriptHashCredential = ScriptHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const cbor = Credential.encodeCBORHex(scriptHashCredential);
 * assert(cbor === "8201581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const encodeCBORHex: Serialization.ToCBOR<Credential> = (credential) =>
  Hex.fromBytes(encodeCBORBytes(credential));

/**
 * Decode CBOR bytes to a Credential
 * Internal helper function used by fromCBOR
 *
 * @example
 * import { Credential, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("8201581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const credential = Credential.decodeCBORBytesOrThrow(bytes);
 * assert(credential._tag === "ScriptHash");
 * assert(credential.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeCBORBytes: Serialization.FromCBORBytes<
  Credential,
  CredentialError
> = (maybeCBORBytes: Uint8Array) =>
  Effect.gen(function* () {
    const [tag, bytesDecoded]: [number, Uint8Array] =
      yield* CBOR.decodeBytes(maybeCBORBytes);
    switch (tag) {
      case 0:
        return yield* KeyHash.decodeBytes(bytesDecoded);
      case 1:
        return yield* ScriptHash.decodeBytes(bytesDecoded);
      default:
        return yield* new CredentialError({
          message: `Invalid credential tag: ${tag}`,
        });
    }
  }).pipe(
    Effect.catchAll((error) => new CredentialError({ message: error.message }))
  );

/**
 * Decode a CBOR hex string to a Credential
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const cborHex = "8200581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
 * const credential = Credential.decodeCBORHexOrThrow(cborHex);
 * assert(credential._tag === "KeyHash");
 * assert(credential.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeCBORHex: Serialization.FromCBOR<
  string,
  Credential,
  CredentialError
> = (maybeHex) =>
  pipe(
    Hex.decode(maybeHex),
    Effect.mapError((e) => new CredentialError({ message: e.message })),
    Effect.map((hex) => Hex.toBytes(hex)),
    Effect.flatMap((bytes) => decodeCBORBytes(bytes))
  );

/**
 * Decode a CBOR hex string to a Credential, throws on error.
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const cborHex = "8200581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
 * const credential = Credential.decodeCBORHexOrThrow(cborHex);
 * assert(credential._tag === "KeyHash");
 * assert(credential.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeCBORHexOrThrow: Serialization.FromCBOROrThrow<
  string,
  Credential
> = (cborHex) => Effect.runSync(decodeCBORHex(cborHex));

/**
 * Decode CBOR bytes to a Credential, throws on error.
 *
 * @example
 * import { Credential, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("8201581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const credential = Credential.decodeCBORBytesOrThrow(bytes);
 * assert(credential._tag === "ScriptHash");
 * assert(credential.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeCBORBytesOrThrow: Serialization.FromCBORBytesOrThrow<
  Credential
> = (bytes) => Effect.runSync(decodeCBORBytes(bytes));

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
  KeyHash.generator,
  ScriptHash.generator
);
