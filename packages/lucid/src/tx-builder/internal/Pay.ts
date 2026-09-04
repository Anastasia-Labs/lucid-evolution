import { Effect, Scope } from "effect";
import {
  addAssets,
  assetsToValue,
  coreToTxOutput,
  toScriptRef,
  valueToAssets,
} from "@lucid-evolution/utils";
import { Address, Assets, Script } from "@lucid-evolution/core-types";
import { OutputDatum } from "../types.js";
import * as TxBuilder from "../TxBuilder.js";
import { CML } from "../../core.js";
import { withCMLScope } from "@lucid-evolution/core-utils";
import { toCMLAddress } from "./TxUtils.js";
import { ERROR_MESSAGE, TxBuilderError } from "../../Errors.js";
import { TxConfig } from "./Service.js";

export const payError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ Pay: ${cause} }` });

/** Pay to a public key or native script address. */
export const payToAddress = (
  // config: TxBuilder.TxBuilderConfig,
  address: Address,
  assets: Assets,
) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const cmlAddress = yield* toCMLAddress(address, config.lucidConfig);
    const outputBuilder = withCMLScope((own) =>
      own(
        own(CML.TransactionOutputBuilder.new()).with_address(own(cmlAddress)),
      ).next(),
    );

    if (Object.keys(assets).length == 0) {
      outputBuilder.free();
      yield* payError(ERROR_MESSAGE.EMPTY_ASSETS);
    }

    addOutput(config, outputBuilder, assets);
  });

/** Builds the output, records it, and frees the builder. */
const addOutput = (
  config: TxBuilder.TxBuilderConfig,
  outputBuilder: CML.TransactionOutputAmountBuilder,
  assets: Assets,
): void =>
  withCMLScope((own) => {
    own(outputBuilder);
    const value = own(assetsToValue(assets));
    let outputResult = own(
      own(
        outputBuilder.with_asset_and_min_required_coin(
          own(value.multi_asset()),
          config.lucidConfig.protocolParameters.coinsPerUtxoByte,
        ),
      ).build(),
    );

    const setLovelaces = assets["lovelace"];
    if (setLovelaces) {
      const minLovelace = own(own(outputResult.output()).amount()).coin();
      if (setLovelaces > minLovelace) {
        outputResult = own(own(outputBuilder.with_value(value)).build());
      }
    }
    const output = own(outputResult.output());
    // Keep track of actual total output value
    config.totalOutputAssets = addAssets(
      config.totalOutputAssets,
      valueToAssets(own(output.amount())),
    );
    config.payToOutputs = [...config.payToOutputs, coreToTxOutput(output)];
    config.txBuilder.add_output(outputResult);
  });

/** Pay to a public key or native script address with datum or scriptRef. */
export const ToAddressWithData = (
  address: Address,
  outputDatum?: OutputDatum,
  assets?: Assets,
  scriptRef?: Script,
) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    //TODO: Test with datumhash
    const outputBuilder = buildBaseOutput(address, outputDatum, scriptRef);

    assets ??= {};
    addOutput(config, outputBuilder, assets);
  });

/** Pay to a plutus script address with datum or scriptRef. */
export const ToContract = (
  address: Address,
  outputDatum?: OutputDatum,
  assets?: Assets,
  scriptRef?: Script,
) => ToAddressWithData(address, outputDatum, assets, scriptRef);

/** The returned amount builder belongs to the caller. */
export const buildBaseOutput = (
  address: Address,
  outputDatum?: OutputDatum,
  scriptRef?: Script,
): CML.TransactionOutputAmountBuilder =>
  withCMLScope((own) => {
    let baseBuilder: CML.TransactionOutputBuilder;
    const addressBuilder = own(
      own(CML.TransactionOutputBuilder.new()).with_address(
        own(CML.Address.from_bech32(address)),
      ),
    );
    if (outputDatum) {
      if (outputDatum.value.trim() === "") {
        throw new Error(
          "datum value is missing. Please provide a non-empty cbor hex data.",
        );
      }
      switch (outputDatum.kind) {
        case "hash": {
          const datumOption = own(
            CML.DatumOption.new_hash(
              own(CML.DatumHash.from_hex(outputDatum.value)),
            ),
          );
          baseBuilder = own(addressBuilder.with_data(datumOption));
          break;
        }
        case "asHash": {
          const plutusData = own(
            CML.PlutusData.from_cbor_hex(outputDatum.value),
          );
          baseBuilder = own(addressBuilder.with_communication_data(plutusData));
          break;
        }
        case "inline": {
          const plutusData = own(
            CML.PlutusData.from_cbor_hex(outputDatum.value),
          );
          const datumOption = own(CML.DatumOption.new_datum(plutusData));
          baseBuilder = own(addressBuilder.with_data(datumOption));
          break;
        }
        default:
          throw new Error(`Unknown outputDatum: ${outputDatum}`);
      }
    } else {
      baseBuilder = addressBuilder;
    }

    return scriptRef
      ? own(
          baseBuilder.with_reference_script(own(toScriptRef(scriptRef))),
        ).next()
      : baseBuilder.next();
  });
