import { Effect } from "effect";
import { Lucid, ScriptType, UTxO } from "../mod.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { RunTimeError, TransactionErrors } from "./Errors.js";

export type Config = {
  readonly lucid: Lucid;
  readonly txBuilder: CML.TransactionBuilder;
  inputUTxOs?: UTxO[];
  scripts: Map<string, { type: ScriptType; script: string }>;
  programs: Effect.Effect<void, TransactionErrors | RunTimeError, never>[];
};

export type Hash = string;
export type CBORHex = string;
export type OutputDatum =
  | { kind: "hash"; value: Hash }
  | { kind: "asHash"; value: CBORHex }
  | { kind: "inline"; value: CBORHex };
