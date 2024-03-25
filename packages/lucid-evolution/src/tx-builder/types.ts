import { Effect } from "effect";
import { ScriptType, UTxO } from "@lucid-evolution/core-types";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { RunTimeError, TransactionErrors } from "../Errors.js";
import { LucidConfig } from "../lucid-evolution/LucidEvolution.js";

export type TxBuilderConfig = {
  readonly lucidConfig: LucidConfig;
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
