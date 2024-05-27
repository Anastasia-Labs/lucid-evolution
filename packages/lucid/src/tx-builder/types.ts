import { Effect } from "effect";
import { Assets, ScriptType, UTxO } from "@lucid-evolution/core-types";
import { CML } from "../core.js";
import { TransactionError } from "../Errors.js";
import { LucidConfig } from "../lucid-evolution/LucidEvolution.js";

export type TxBuilderConfig = {
  readonly lucidConfig: LucidConfig;
  readonly txBuilder: CML.TransactionBuilder;
  collectedInputs: UTxO[];
  readInputs: UTxO[];
  totalOutputAssets: Assets;
  mintedAssets: Assets;
  scripts: Map<string, { type: ScriptType; script: string }>;
  programs: Effect.Effect<void, TransactionError, never>[];
};

export type Hash = string;
export type CBORHex = string;
export type OutputDatum =
  | { kind: "hash"; value: Hash }
  | { kind: "asHash"; value: CBORHex }
  | { kind: "inline"; value: CBORHex };
