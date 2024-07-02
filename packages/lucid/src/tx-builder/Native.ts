import * as S from "@effect/schema/Schema";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { Script, Native } from "@lucid-evolution/core-types";

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