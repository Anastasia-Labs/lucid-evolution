import { Native, Script } from "@lucid-evolution/core-types";
import { CML } from "./core.js";

export const toNativeScript = (native: Native) => {
  switch (native.type) {
    case "ScriptPubKey":
      return CML.NativeScript.new_script_pubkey(
        CML.Ed25519KeyHash.from_hex(native.keyHash),
      );
    case "ScriptInvalidHereafter":
      return CML.NativeScript.new_script_invalid_hereafter(BigInt(native.slot));
    case "ScriptInvalidBefore":
      return CML.NativeScript.new_script_invalid_before(BigInt(native.slot));
    case "ScriptAll": {
      const nativeList = CML.NativeScriptList.new();
      native.scripts.map((script) => nativeList.add(toNativeScript(script)));
      return CML.NativeScript.new_script_all(nativeList);
    }
    case "ScriptAny": {
      const nativeList = CML.NativeScriptList.new();
      native.scripts.map((script) => nativeList.add(toNativeScript(script)));
      return CML.NativeScript.new_script_any(nativeList);
    }
    case "ScriptNOfK": {
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
