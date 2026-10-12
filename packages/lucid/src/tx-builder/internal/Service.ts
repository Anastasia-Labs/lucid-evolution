import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import { TxBuilderConfig } from "../TxBuilder.js";

export class TxConfig extends Context.Tag("TxConfig")<
  TxConfig,
  {
    readonly config: TxBuilderConfig;
  }
>() {}
