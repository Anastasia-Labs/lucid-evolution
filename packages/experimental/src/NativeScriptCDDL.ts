import { Schema } from "effect";
import * as CBOR from "./CBOR.js";

/**
 * CDDL schemas for native scripts.
 *
 * These schemas define the CBOR encoding format for native scripts according to the CDDL specification:
 *
 * - script_pubkey = (0, addr_keyhash)
 * - script_all = (1, [* native_script])
 * - script_any = (2, [* native_script])
 * - script_n_of_k = (3, n : int64, [* native_script])
 * - invalid_before = (4, slot_no)
 * - invalid_hereafter = (5, slot_no)
 * - slot_no = uint .size 8
 *
 * @since 2.0.0
 * @category schemas
 */

const ScriptPubKeyCDDL = Schema.Tuple(
  Schema.Literal(0),
  Schema.Uint8ArrayFromSelf,
);

const ScriptAllCDDL = Schema.Tuple(
  Schema.Literal(1),
  Schema.Array(
    Schema.suspend((): Schema.Schema<NativeScriptCDDL> => NativeScriptCDDL),
  ),
);

const ScriptAnyCDDL = Schema.Tuple(
  Schema.Literal(2),
  Schema.Array(
    Schema.suspend((): Schema.Schema<NativeScriptCDDL> => NativeScriptCDDL),
  ),
);

const ScriptNOfKCDDL = Schema.Tuple(
  Schema.Literal(3),
  Schema.BigIntFromSelf,
  Schema.Array(
    Schema.suspend((): Schema.Schema<NativeScriptCDDL> => NativeScriptCDDL),
  ),
);

const InvalidBeforeCDDL = Schema.Tuple(
  Schema.Literal(4),
  Schema.BigIntFromSelf,
);

const InvalidHereafterCDDL = Schema.Tuple(
  Schema.Literal(5),
  Schema.BigIntFromSelf,
);

/**
 * CDDL representation of a native script as a union of tuple types.
 *
 * This type represents the low-level CBOR structure of native scripts,
 * where each variant is encoded as a tagged tuple.
 *
 * @since 2.0.0
 * @category model
 */
export type NativeScriptCDDL =
  | readonly [0, Uint8Array]
  | readonly [1, readonly NativeScriptCDDL[]]
  | readonly [2, readonly NativeScriptCDDL[]]
  | readonly [3, bigint, readonly NativeScriptCDDL[]]
  | readonly [4, bigint]
  | readonly [5, bigint];

/**
 * Schema for NativeScriptCDDL union type.
 *
 * @since 2.0.0
 * @category schemas
 */
export const NativeScriptCDDL = Schema.Union(
  ScriptPubKeyCDDL,
  ScriptAllCDDL,
  ScriptAnyCDDL,
  ScriptNOfKCDDL,
  InvalidBeforeCDDL,
  InvalidHereafterCDDL,
).annotations({
  identifier: "NativeScriptCDDL",
});

/**
 * CBOR decoder for NativeScriptCDDL.
 *
 * @since 2.0.0
 * @category decoders
 */
export const CDDLDecoder = CBOR.DecodeWithSchema(NativeScriptCDDL);
