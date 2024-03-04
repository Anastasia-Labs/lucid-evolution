import {
  NativeScriptType,
  parseNativeScript,
} from "../src/tx-builder/Native.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { expect, test } from "vitest";

test("test native parsing", () => {
  const script: NativeScriptType = {
    ScriptAny: {
      native_scripts: [
        {
          ScriptNOfK: {
            n: 1,
            native_scripts: [
              {
                ScriptInvalidBefore: {
                  before: 1,
                },
              },
              {
                ScriptPubkey: {
                  ed25519_key_hash:
                    "b861eeadde300385d88aaa98cad0f0ed1f95419bbb9971a0fb7c96fb",
                },
              },
              {
                ScriptPubkey: {
                  ed25519_key_hash:
                    "b862eeadde300385d88aaa98cad0f0ed1f95419bbb9971a0fb7c96fb",
                },
              },
            ],
          },
        },
      ],
    },
  };
  const value = parseNativeScript(script);
  expect(value._tag).toBe("Right");
});
