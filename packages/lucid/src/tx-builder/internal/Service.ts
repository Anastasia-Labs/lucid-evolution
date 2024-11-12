import { Context, Effect } from "effect";
import { TxBuilderConfig } from "../TxBuilder.js";

export class TxConfig extends Context.Tag("TxConfig")<
  TxConfig,
  {
    readonly config: TxBuilderConfig;
  }
>() {}

// const makeTxConfig : TxBuilderConfig  = {
//   lucidConfig: lucidConfig,
//   txBuilder: CML.TransactionBuilder.new(lucidConfig.txbuilderconfig),
//   walletInputs: [],
//   collectedInputs: [],
//   readInputs: [],
//   consumedInputs: [],
//   totalOutputAssets: {},
//   payToOutputs: [],
//   mintedAssets: {},
//   scripts: new Map(),
//   programs: [],
//   partialPrograms: new Map(),
//   minFee: undefined,
// };
