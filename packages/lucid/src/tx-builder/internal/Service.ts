import { Context, Effect } from "effect";
import { TxBuilderConfig } from "../TxBuilder.js";

export class TxConfig extends Context.Tag("TxConfig")<
  TxConfig,
  {
    readonly config: TxBuilderConfig;
  }
>() {}
