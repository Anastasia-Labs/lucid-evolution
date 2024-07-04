import { Native, Script } from "@lucid-evolution/core-types";
import * as S from "@effect/schema/Schema";
import { CML } from "./core.js";

/**
 * Converts a Native type (cardano-cli JSON script syntax) to CML.NativeScript.
 *
 * Native type follows the standard described in the
 * {@link https://github.com/IntersectMBO/cardano-node/blob/1.26.1-with-cardano-cli/doc/reference/simple-scripts.md#json-script-syntax JSON script syntax documentation}.
 */
export const toCMLNativeScript = (native: Native): CML.NativeScript => {
  switch (native.type) {
    case "sig":
      return CML.NativeScript.new_script_pubkey(
        CML.Ed25519KeyHash.from_hex(native.keyHash),
      );
    case "before":
      return CML.NativeScript.new_script_invalid_hereafter(BigInt(native.slot));
    case "after":
      return CML.NativeScript.new_script_invalid_before(BigInt(native.slot));
    case "all": {
      const nativeList = CML.NativeScriptList.new();
      native.scripts.map((script) => nativeList.add(toCMLNativeScript(script)));
      return CML.NativeScript.new_script_all(nativeList);
    }
    case "any": {
      const nativeList = CML.NativeScriptList.new();
      native.scripts.map((script) => nativeList.add(toCMLNativeScript(script)));
      return CML.NativeScript.new_script_any(nativeList);
    }
    case "atLeast": {
      const nativeList = CML.NativeScriptList.new();
      native.scripts.map((script) => nativeList.add(toCMLNativeScript(script)));
      return CML.NativeScript.new_script_n_of_k(
        BigInt(native.required),
        nativeList,
      );
    }
  }
};

/**
 * Builds a Script from Native type (cardano-cli JSON script syntax).
 *
 * Native type follows the standard described in the
 * {@link https://github.com/IntersectMBO/cardano-node/blob/1.26.1-with-cardano-cli/doc/reference/simple-scripts.md#json-script-syntax JSON script syntax documentation}.
 */
export const scriptFromNative = (native: Native): Script => {
  return {
    type: "Native",
    script: toCMLNativeScript(native).to_cbor_hex(),
  };
};

/**
 * Represents a CML JSON script syntax
 */
export type CMLNative =
  | {
      ScriptPubkey: {
        ed25519_key_hash: string;
      };
    }
  | {
      ScriptInvalidBefore: { before: number };
    }
  | {
      ScriptInvalidHereafter: { after: number };
    }
  | {
      ScriptAll: {
        native_scripts: ReadonlyArray<CMLNative>;
      };
    }
  | {
      ScriptAny: {
        native_scripts: ReadonlyArray<CMLNative>;
      };
    }
  | {
      ScriptNOfK: {
        n: number;
        native_scripts: ReadonlyArray<CMLNative>;
      };
    };

/**
 * Schema definition for CMLNative type using effect schema
 */
const CMLNativeSchema: S.Schema<CMLNative> = S.Union(
  S.Struct({
    ScriptPubkey: S.Struct({
      ed25519_key_hash: S.String,
    }),
  }),
  S.Struct({
    ScriptInvalidBefore: S.Struct({
      before: S.Number,
    }),
  }),
  S.Struct({
    ScriptInvalidHereafter: S.Struct({
      after: S.Number,
    }),
  }),
  S.Struct({
    ScriptAll: S.Struct({
      native_scripts: S.Array(S.suspend(() => CMLNativeSchema)),
    }),
  }),
  S.Struct({
    ScriptAny: S.Struct({
      native_scripts: S.Array(S.suspend(() => CMLNativeSchema)),
    }),
  }),
  S.Struct({
    ScriptNOfK: S.Struct({
      n: S.Number,
      native_scripts: S.Array(S.suspend(() => CMLNativeSchema)),
    }),
  }),
);

/**
 * Parses a CMLNative type from an unknown input using effect schema.
 * This function is useful for decoding unknown data to CMLNative from a file or an API.
 *
 *  @throws {ParseError} - Throws a ParseError if the input does not conform to the schema.
 */
export const parseCMLNative = S.decodeUnknownSync(CMLNativeSchema);

/**
 * Builds a Script from CMLNative script type.
 *
 */
export const scriptFromCMLNative = (cmlNative: CMLNative): Script => {
  return {
    type: "Native",
    script: CML.NativeScript.from_json(JSON.stringify(cmlNative)).to_cbor_hex(),
  };
};
