import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type NativeScriptKind = CML.NativeScriptKind;

export const ScriptPubkey = CML.NativeScriptKind.ScriptPubkey;
export const ScriptAll = CML.NativeScriptKind.ScriptAll;
export const ScriptAny = CML.NativeScriptKind.ScriptAny;
export const ScriptNOfK = CML.NativeScriptKind.ScriptNOfK;
export const ScriptInvalidBefore = CML.NativeScriptKind.ScriptInvalidBefore;
export const ScriptInvalidHereafter =
  CML.NativeScriptKind.ScriptInvalidHereafter;

/**
 * Get all values of the NativeScriptKind enum
 *
 * @example
 * import { NativeScriptKind } from "@lucid-evolution/experimental";
 *
 * const allValues = NativeScriptKind.values();
 * console.log(allValues);
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.NativeScriptKind> => [
  CML.NativeScriptKind.ScriptPubkey,
  CML.NativeScriptKind.ScriptAll,
  CML.NativeScriptKind.ScriptAny,
  CML.NativeScriptKind.ScriptNOfK,
  CML.NativeScriptKind.ScriptInvalidBefore,
  CML.NativeScriptKind.ScriptInvalidHereafter,
];

/**
 * Convert NativeScriptKind enum value to string
 *
 * @example
 * import { NativeScriptKind } from "@lucid-evolution/experimental";
 *
 * const name = NativeScriptKind.toString(CML.NativeScriptKind.ScriptPubkey);
 * console.log(name); // "ScriptPubkey"
 *
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.NativeScriptKind): string => {
  switch (value) {
    case CML.NativeScriptKind.ScriptPubkey:
      return "ScriptPubkey";
    case CML.NativeScriptKind.ScriptAll:
      return "ScriptAll";
    case CML.NativeScriptKind.ScriptAny:
      return "ScriptAny";
    case CML.NativeScriptKind.ScriptNOfK:
      return "ScriptNOfK";
    case CML.NativeScriptKind.ScriptInvalidBefore:
      return "ScriptInvalidBefore";
    case CML.NativeScriptKind.ScriptInvalidHereafter:
      return "ScriptInvalidHereafter";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to NativeScriptKind enum value
 *
 * @example
 * import { NativeScriptKind } from "@lucid-evolution/experimental";
 *
 * const value = NativeScriptKind.fromString("ScriptPubkey");
 * console.log(value); // Some(CML.NativeScriptKind.ScriptPubkey)
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.NativeScriptKind | undefined => {
  switch (str) {
    case "ScriptPubkey":
      return CML.NativeScriptKind.ScriptPubkey;
    case "ScriptAll":
      return CML.NativeScriptKind.ScriptAll;
    case "ScriptAny":
      return CML.NativeScriptKind.ScriptAny;
    case "ScriptNOfK":
      return CML.NativeScriptKind.ScriptNOfK;
    case "ScriptInvalidBefore":
      return CML.NativeScriptKind.ScriptInvalidBefore;
    case "ScriptInvalidHereafter":
      return CML.NativeScriptKind.ScriptInvalidHereafter;
    default:
      return undefined;
  }
};
