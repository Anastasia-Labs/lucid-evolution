import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { Lucid } from "../mod.js";
import { Config } from "./types.js";
import { makeTx } from "./MakeTx.js";

export function TxBuilder(lucid: Lucid) {
  const config: Config = {
    lucid,
    txBuilder: CML.TransactionBuilder.new(lucid.txBuilderConfig),
    inputUTxOs: [],
    scripts: new Map(),
    programs: [],
  };
  return makeTx(config);
}
