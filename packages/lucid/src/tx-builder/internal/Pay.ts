import { Effect } from "effect";
import { assetsToValue, toScriptRef } from "@lucid-evolution/utils";
import { Address, Assets, Script } from "@lucid-evolution/core-types";
import { OutputDatum, TxBuilderConfig } from "../types.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { addressFromWithNetworkCheck, toDatumOption } from "../utils.js";

/** Pay to a public key or native script address. */
export const payToAddress = (
  config: TxBuilderConfig,
  address: Address,
  assets: Assets,
) => {
  const program = Effect.gen(function* ($) {
    const output = CML.TransactionOutput.new(
      yield* $(addressFromWithNetworkCheck(address, config.lucidConfig)),
      assetsToValue(assets),
    );
    config.txBuilder.add_output(CML.SingleOutputBuilderResult.new(output));
  });
  return program;
};

/** Pay to a public key or native script address with datum or scriptRef. */
export const payToAddressWithData = (
  config: TxBuilderConfig,
  address: Address,
  outputDatum: OutputDatum,
  assets: Assets,
  scriptRef?: Script,
) => {
  const program = Effect.gen(function* ($) {
    const output = CML.TransactionOutput.new(
      yield* $(addressFromWithNetworkCheck(address, config.lucidConfig)),
      assetsToValue(assets),
      toDatumOption(outputDatum),
      scriptRef ? toScriptRef(scriptRef) : undefined,
    );
    config.txBuilder.add_output(CML.SingleOutputBuilderResult.new(output));
  });
  return program;
};

/** Pay to a plutus script address with datum or scriptRef. */
export const payToContract = (
  config: TxBuilderConfig,
  address: Address,
  outputDatum: OutputDatum,
  assets: Assets,
  scriptRef?: Script,
) => {
  return payToAddressWithData(config, address, outputDatum, assets, scriptRef);
};
