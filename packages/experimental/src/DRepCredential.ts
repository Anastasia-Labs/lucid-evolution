/**
 * DRep Credential module - provides an alias for Credential specialized for DRep usage.
 *
 * In Cardano, drep_credential = credential, representing the same credential structure
 * but used specifically for delegation representatives (DReps).
 *
 * @since 2.0.0
 */

import * as Credential from "./Credential.js";

/**
 * Error class for DRepCredential operations - re-exports CredentialError.
 *
 * @example
 * import { DRepCredential } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new DRepCredential.DRepCredentialError({ message: "Invalid DRep credential" });
 *
 * @since 2.0.0
 * @category errors
 */
export const DRepCredentialError = Credential.CredentialError;

/**
 * DRepCredential schema - alias for the Credential schema.
 * drep_credential = credential
 *
 * @since 2.0.0
 * @category schemas
 */
export const DRepCredential = Credential.Credential;

/**
 * Type representing a DRep credential - alias for Credential type.
 *
 * @example
 * import { DRepCredential, KeyHash } from "@lucid-evolution/experimental";
 *
 * const keyHash = new KeyHash.KeyHash({ hash: "1234567890123456789012345678901234567890123456789012345678901234" });
 * const drepCredential: DRepCredential = keyHash;
 *
 * @since 2.0.0
 * @category model
 */
export type DRepCredential = Credential.Credential;

/**
 * Re-exported utilities from Credential module.
 *
 * @since 2.0.0
 */
export const isCredential = Credential.isCredential;
export const equals = Credential.equals;
export const generator = Credential.generator;
export const Codec = Credential.Codec;

/**
 * CBOR encoding/decoding schemas.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = Credential.CBORBytesSchema;
export const CBORHexSchema = Credential.CBORHexSchema;
