import * as S from "@effect/schema/Schema";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { Script } from "@lucid-evolution/core-types";

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

const NativeScriptSchema: S.Schema<NativeScriptType> = S.union(
  S.struct({
    ScriptPubkey: S.struct({
      ed25519_key_hash: S.string,
    }),
  }),
  S.struct({
    ScriptInvalidBefore: S.struct({
      before: S.number,
    }),
  }),
  S.struct({
    ScriptInvalidHereafter: S.struct({
      after: S.number,
    }),
  }),
  S.struct({
    ScriptAll: S.struct({
      native_scripts: S.array(S.suspend(() => NativeScriptSchema)),
    }),
  }),
  S.struct({
    ScriptAny: S.struct({
      native_scripts: S.array(S.suspend(() => NativeScriptSchema)),
    }),
  }),
  S.struct({
    ScriptNOfK: S.struct({
      n: S.number,
      native_scripts: S.array(S.suspend(() => NativeScriptSchema)),
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
