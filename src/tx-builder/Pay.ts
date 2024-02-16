import { Effect, pipe } from "effect";
import { Address, Assets, Script, assetsToValue, toScriptRef } from "../mod.js";
import { Config, OutputDatum } from "./types.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { addressFromWithNetworkCheck, toDatumOption } from "./utils.js";
import { makeTx } from "./MakeTx.js";

/** Pay to a public key or native script address. */
export const payToAddress =
  (config: Config) => (address: Address, assets: Assets) => {
    const program = Effect.gen(function* ($) {
      const output = CML.TransactionOutput.new(
        yield* $(addressFromWithNetworkCheck(address, config.lucid)),
        assetsToValue(assets)
      );
      config.txBuilder.add_output(CML.SingleOutputBuilderResult.new(output));
    });
    config.programs.push(program);
    return makeTx(config);
  };

/** Pay to a public key or native script address with datum or scriptRef. */
export const payToAddressWithData =
  (config: Config) =>
  (
    address: Address,
    outputDatum: OutputDatum,
    assets: Assets,
    scriptRef?: Script
  ) => {
    const program = Effect.gen(function* ($) {
      const output = CML.TransactionOutput.new(
        yield* $(addressFromWithNetworkCheck(address, config.lucid)),
        assetsToValue(assets),
        toDatumOption(outputDatum),
        scriptRef ? toScriptRef(scriptRef) : undefined
      );
      config.txBuilder.add_output(CML.SingleOutputBuilderResult.new(output));
    });
    config.programs.push(program);
    return makeTx(config);
  };
