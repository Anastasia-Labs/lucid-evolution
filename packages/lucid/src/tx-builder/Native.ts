import * as S from "@effect/schema/Schema";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { Script } from "@lucid-evolution/core-types";

//TODO: move to another package
export type NativeScriptType =
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
        native_scripts: ReadonlyArray<NativeScriptType>;
      };
    }
  | {
      ScriptAny: {
        native_scripts: ReadonlyArray<NativeScriptType>;
      };
    }
  | {
      ScriptNOfK: {
        n: number;
        native_scripts: ReadonlyArray<NativeScriptType>;
      };
    };

const NativeScriptSchema: S.Schema<NativeScriptType> = S.Union(
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
      native_scripts: S.Array(S.suspend(() => NativeScriptSchema)),
    }),
  }),
  S.Struct({
    ScriptAny: S.Struct({
      native_scripts: S.Array(S.suspend(() => NativeScriptSchema)),
    }),
  }),
  S.Struct({
    ScriptNOfK: S.Struct({
      n: S.Number,
      native_scripts: S.Array(S.suspend(() => NativeScriptSchema)),
    }),
  }),
);

export const parseNativeScript = S.decodeUnknownEither(NativeScriptSchema);

// TODO: Add Native Schema

// https://github.com/IntersectMBO/cardano-node/blob/1.26.1-with-cardano-cli/doc/reference/simple-scripts.md#time-locking
export type Native =
  | { type: "sig"; keyHash: string }
  | { type: "before"; slot: number }
  | { type: "after"; slot: number }
  | { type: "all"; scripts: ReadonlyArray<Native> }
  | { type: "any"; scripts: ReadonlyArray<Native> }
  | { type: "atLeast"; required: number; scripts: ReadonlyArray<Native> };

export const toNativeScript = (native: Native) => {
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
      native.scripts.map((script) => nativeList.add(toNativeScript(script)));
      return CML.NativeScript.new_script_all(nativeList);
    }
    case "any": {
      const nativeList = CML.NativeScriptList.new();
      native.scripts.map((script) => nativeList.add(toNativeScript(script)));
      return CML.NativeScript.new_script_any(nativeList);
    }
    case "atLeast": {
      const nativeList = CML.NativeScriptList.new();
      native.scripts.map((script) => nativeList.add(toNativeScript(script)));
      return CML.NativeScript.new_script_n_of_k(
        BigInt(native.required),
        nativeList,
      );
    }
  }
};

export const nativeJSFromJson = (native: Native): Script => {
  return {
    type: "Native",
    script: toNativeScript(native).to_cbor_hex(),
  };
};
