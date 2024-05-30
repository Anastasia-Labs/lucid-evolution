import { Effect, Scope } from "effect";
import { addAssets, assetsToValue, toScriptRef } from "@lucid-evolution/utils";
import { Address, Assets, Script } from "@lucid-evolution/core-types";
import { OutputDatum } from "../types.js";
import * as TxBuilder from "../TxBuilder.js";
import { CML } from "../../core.js";
import { toCMLAddress, toDatumOption } from "./TxUtils.js";
import { TxBuilderError, TxBuilderErrorCause } from "../../Errors.js";

export const payError = (cause: TxBuilderErrorCause, message?: string) =>
  new TxBuilderError({ cause, module: "Pay", message });

/** Pay to a public key or native script address. */
export const payToAddress = (
  config: TxBuilder.TxBuilderConfig,
  address: Address,
  assets: Assets,
) =>
  Effect.gen(function* () {
    config.totalOutputAssets = addAssets(config.totalOutputAssets, assets);
    const outputBuilder = CML.TransactionOutputBuilder.new()
      .with_address(yield* toCMLAddress(address, config.lucidConfig))
      .next();

    if (Object.keys(assets).length == 0)
      yield* payError(
        "EmptyAssets",
        "Attempting to pay to an address with an empty assets object",
      );

    if (assets["lovelace"]) {
      config.txBuilder.add_output(
        outputBuilder.with_value(assetsToValue(assets)).build(),
      );
    } else {
      // If no lovelace, add output with asset and minimum required coin
      config.txBuilder.add_output(
        outputBuilder
          .with_asset_and_min_required_coin(
            assetsToValue(assets).multi_asset(),
            config.lucidConfig.protocolParameters.coinsPerUtxoByte,
          )
          .build(),
      );
    }
  });

/** Pay to a public key or native script address with datum or scriptRef. */
export const payToAddressWithData = (
  config: TxBuilder.TxBuilderConfig,
  address: Address,
  outputDatum: OutputDatum,
  assets?: Assets,
  scriptRef?: Script,
) =>
  Effect.gen(function* () {
    //TODO: Test with datumhash
    const outputBuilder = buildBaseOutput(address, outputDatum, scriptRef);
    if (assets) {
      config.totalOutputAssets = addAssets(config.totalOutputAssets, assets);
      if (Object.keys(assets).length == 0)
        yield* payError(
          "EmptyAssets",
          "Attempting to pay to an address with an empty assets object",
        );
      if (assets["lovelace"]) {
        config.txBuilder.add_output(
          outputBuilder.with_value(assetsToValue(assets)).build(),
        );
      } else {
        // If no lovelace, add output with asset and minimum required coin
        config.txBuilder.add_output(
          outputBuilder
            .with_asset_and_min_required_coin(
              assetsToValue(assets).multi_asset(),
              config.lucidConfig.protocolParameters.coinsPerUtxoByte,
            )
            .build(),
        );
      }
    } else {
      // No assets provided, add output with empty multi-asset and minimum required coin
      config.txBuilder.add_output(
        outputBuilder
          .with_asset_and_min_required_coin(
            CML.MultiAsset.new(),
            config.lucidConfig.protocolParameters.coinsPerUtxoByte,
          )
          .build(),
      );
    }
  });

/** Pay to a plutus script address with datum or scriptRef. */
export const payToContract = (
  config: TxBuilder.TxBuilderConfig,
  address: Address,
  outputDatum: OutputDatum,
  assets?: Assets,
  scriptRef?: Script,
) =>
  Effect.gen(function* () {
    if (!outputDatum.value)
      yield* payError(
        "Datum",
        "No datum set. Script output becomes unspendable without datum.",
      );
    return yield* payToAddressWithData(
      config,
      address,
      outputDatum,
      assets,
      scriptRef,
    );
  });

const buildBaseOutput = (
  address: Address,
  outputDatum: OutputDatum,
  scriptRef: Script | undefined,
) => {
  const baseBuilder = CML.TransactionOutputBuilder.new()
    .with_address(CML.Address.from_bech32(address))
    .with_data(toDatumOption(outputDatum));

  return scriptRef
    ? baseBuilder.with_reference_script(toScriptRef(scriptRef)).next()
    : baseBuilder.next();
};
