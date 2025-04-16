import { Effect, Schema, Data } from "effect";
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
 * import { Credential } from "@lucid-evolution/experimental";
 *
 * const credential = { _tag: "KeyHash", hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f" };
 * const isValid = Credential.isCredential(credential);
 * // Returns true if credential is valid
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
 * import { Credential, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * const credential = { _tag: "KeyHash", hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f" };
 * const cborBytesEffect = Credential.toCBORBytes(credential);
 * const cborBytes = Effect.runSync(cborBytesEffect);
 * // Returns Uint8Array representing the CBOR encoding of the credential
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
const toCBORBytes: (
  credential: Credential,
) => Effect.Effect<Uint8Array, CBOR.CBORError> = Effect.fnUntraced(
  function* (credential) {
    switch (credential._tag) {
      case "KeyHash":
        return yield* CBOR.encode([0, Bytes.fromHexOrThrow(credential.hash)]);
      case "ScriptHash":
        return yield* CBOR.encode([1, Bytes.fromHexOrThrow(credential.hash)]);
    }
  },
);

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
 * import { Credential } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * const scriptHashCredential = {
 *   _tag: "ScriptHash",
 *   hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"
 * } as const;
 *
 * const cborHexEffect = Credential.toCBOR(scriptHashCredential);
 * const cborHex = Effect.runSync(cborHexEffect);
 * // Returns "8201581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toCBOR =
  // : (
  //   credential: Credential,
  // ) => Effect.Effect<string, CBOR.CBORError> =
  (credential: Credential) =>
    Effect.map(toCBORBytes(credential), (bytes) => Bytes.toHex!(bytes));

/**
 * Decode CBOR bytes to a Credential
 * Internal helper function used by fromCBOR
 *
 * @param bytes - The CBOR bytes to decode
 * @returns The decoded Credential or an error
 *
 * @example
 * import { Credential, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * const bytes = Bytes.fromHexOrThrow("8201581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const credentialEffect = Credential.fromCBORBytes(bytes);
 * const credential = Effect.runSync(credentialEffect);
 * // Returns a KeyHash credential
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBORBytes =
  // : (
  //   bytes: Uint8Array
  // ) => Effect.Effect<Credential, CBOR.CBORError | CredentialError>
  Effect.fnUntraced(function* (bytes) {
    const [tag, bytesDecoded]: [number, Uint8Array] = yield* CBOR.decode(bytes);
    switch (tag) {
      case 0:
        return yield* KeyHash.fromBytes(bytesDecoded);
      case 1:
        return ScriptHash.fromBytes(bytesDecoded);
      default:
        return yield* new CredentialError({
          message: `Invalid credential tag: ${tag}`,
        });
    }
  });

/**
 * Decode a CBOR hex string to a Credential
 *
 * @param cborHex - The CBOR hex string to decode
 * @returns The decoded Credential or an error
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * const cborHex = "8200581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
 * const credentialEffect = Credential.fromCBOR(cborHex);
 * const credential = Effect.runSync(credentialEffect);
 * // Returns a KeyHash credential
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBOR =
  // : (
  //   cborHex: string
  // ) => Effect.Effect<Credential, CBOR.CBORError | CredentialError> =
  (cborHex: string) => fromCBORBytes(Bytes.fromHexOrThrow(cborHex));
