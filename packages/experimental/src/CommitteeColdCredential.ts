/**
 * Committee Cold Credential module - provides an alias for Credential specialized for committee cold key usage.
 *
 * In Cardano, committee_cold_credential = credential, representing the same credential structure
 * but used specifically for committee cold keys in governance.
 *
 * @since 2.0.0
 */

import * as Credential from "./Credential.js";
import * as CBOR from "./CBOR.js";

/**
 * Error class for CommitteeColdCredential operations - re-exports CredentialError.
 *
 * @example
 * import { CommitteeColdCredential } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new CommitteeColdCredential.CommitteeColdCredentialError({ message: "Invalid committee cold credential" });
 *
 * @since 2.0.0
 * @category errors
 */
export const CommitteeColdCredentialError = Credential.CredentialError;

/**
 * CommitteeColdCredential schema - alias for the Credential schema.
 * committee_cold_credential = credential
 *
 * @since 2.0.0
 * @category schemas
 */
export const CommitteeColdCredential = Credential.Credential;

/**
 * Type representing a committee cold credential - alias for Credential type.
 *
 * @example
 * import { CommitteeColdCredential, KeyHash } from "@evolution-sdk/experimental";
 *
 * const keyHash = new KeyHash.KeyHash({ hash: "1234567890123456789012345678901234567890123456789012345678901234" });
 * const committeeColdCredential: CommitteeColdCredential = keyHash;
 *
 * @since 2.0.0
 * @category model
 */
export type CommitteeColdCredential = Credential.Credential;

/**
 * Re-exported utilities from Credential module.
 *
 * @since 2.0.0
 */
export const isCredential = Credential.isCredential;
export const equals = Credential.equals;
export const generator = Credential.generator;
export const Codec = (options?: CBOR.CodecOptions) => Credential.Codec(options);

/**
 * CBOR encoding/decoding schemas.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = Credential.CBORBytesSchema;
export const CBORHexSchema = Credential.CBORHexSchema;
