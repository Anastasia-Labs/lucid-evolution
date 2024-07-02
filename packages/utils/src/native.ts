import { CardanoCLINative, Native, Script } from "@lucid-evolution/core-types";
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

export const nativeToCardanoCLINative = (native: Native): CardanoCLINative => {
  switch (native.type) {
    case "ScriptPubKey":
      return { type: "sig", keyHash: native.keyHash };
    case "ScriptInvalidHereafter":
      return { type: "after", slot: native.slot };
    case "ScriptInvalidBefore":
      return { type: "before", slot: native.slot };
    case "ScriptAll": {
      return {
        type: "all",
        scripts: native.scripts.map((script) =>
          nativeToCardanoCLINative(script),
        ),
      };
    }
    case "ScriptAny": {
      return {
        type: "any",
        scripts: native.scripts.map((script) =>
          nativeToCardanoCLINative(script),
        ),
      };
    }
    case "ScriptNOfK": {
      return {
        type: "atLeast",
        required: native.required,
        scripts: native.scripts.map((script) =>
          nativeToCardanoCLINative(script),
        ),
      };
    }
  }
};

export const cardanoCLINativeToNative = (native: CardanoCLINative): Native => {
  switch (native.type) {
    case "sig":
      return { type: "ScriptPubKey", keyHash: native.keyHash };
    case "after":
      return { type: "ScriptInvalidHereafter", slot: native.slot };
    case "before":
      return { type: "ScriptInvalidBefore", slot: native.slot };
    case "all": {
      return {
        type: "ScriptAll",
        scripts: native.scripts.map((script) =>
          cardanoCLINativeToNative(script),
        ),
      };
    }
    case "any": {
      return {
        type: "ScriptAny",
        scripts: native.scripts.map((script) =>
          cardanoCLINativeToNative(script),
        ),
      };
    }
    case "atLeast": {
      return {
        type: "ScriptNOfK",
        required: native.required,
        scripts: native.scripts.map((script) =>
          cardanoCLINativeToNative(script),
        ),
      };
    }
  }
};
