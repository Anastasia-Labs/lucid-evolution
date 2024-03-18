import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { LucidConfig } from "../lucid-evolution/MakeLucid.js";
import { Config, OutputDatum } from "./types.js";
import { readFrom } from "./Read.js";
import { Assets, Script, UTxO } from "@anastasia-labs/core-types";
import { collectFromUTxO } from "./Collect.js";
import {
  attachCertificateValidator,
  attachMintingPolicy,
  attachScript,
  attachSpendingValidator,
  attachWithdrawalValidator,
} from "./Attach.js";
import { payToAddress, payToAddressWithData } from "./Pay.js";
import { mintAssets } from "./Mint.js";
import { validFrom, validTo } from "./Interval.js";
import { complete } from "./Complete.js";
import { MkTxComplete } from "../lucid-evolution/MakeTxComplete.js";
import { RunTimeError, TransactionErrors } from "./Errors.js";
import { Either } from "effect/Either";
import { Effect } from "effect/Effect";

export type TxBuilder = {
  readFrom: (utxos: UTxO[]) => TxBuilder;
  collectFrom: (
    config: Config,
    utxos: UTxO[],
    redeemer?: string | undefined,
  ) => TxBuilder;
  payToAddress: (address: string, assets: Assets) => TxBuilder;
  payToAddressWithData: (
    address: string,
    outputDatum: OutputDatum,
    assets: Assets,
    scriptRef?: Script | undefined,
  ) => TxBuilder;
  mintAssets: (assets: Assets, redeemer?: string | undefined) => TxBuilder;
  validFrom: (unixTime: number) => TxBuilder;
  validTo: (unixTime: number) => TxBuilder;
  attachScript: (script: Script) => TxBuilder;
  attachSpendingValidator: (spendingValidator: Script) => TxBuilder;
  attachMintingPolicy: (mintingPolicy: Script) => TxBuilder;
  attachCertificateValidator: (certValidator: Script) => TxBuilder;
  attachWithdrawalValidator: (withdrawalValidator: Script) => TxBuilder;
  complete: () => {
    unsafeRun: () => Promise<MkTxComplete>;
    run: () => Promise<Either<MkTxComplete, TransactionErrors | RunTimeError>>;
    program: () => Effect<
      MkTxComplete,
      TransactionErrors | RunTimeError,
      never
    >;
  };
  config: () => Config;
};

export function makeTxBuilder(lucidConfig: LucidConfig) {
  const config: Config = {
    lucidConfig: lucidConfig,
    txBuilder: CML.TransactionBuilder.new(lucidConfig.txbuilderconfig),
    inputUTxOs: [],
    scripts: new Map(),
    programs: [],
  };
  const makeTx: TxBuilder = {
    readFrom: (utxos: UTxO[]) => {
      const program = readFrom(config, utxos);
      config.programs.push(program);
      return makeTx;
    },
    collectFrom: (
      config: Config,
      utxos: UTxO[],
      redeemer?: string | undefined,
    ) => {
      const program = collectFromUTxO(config, utxos, redeemer);
      config.programs.push(program);
      return makeTx;
    },
    payToAddress: (address: string, assets: Assets) => {
      const program = payToAddress(config, address, assets);
      config.programs.push(program);
      return makeTx;
    },
    payToAddressWithData: (
      address: string,
      outputDatum: OutputDatum,
      assets: Assets,
      scriptRef?: Script | undefined,
    ) => {
      const program = payToAddressWithData(
        config,
        address,
        outputDatum,
        assets,
        scriptRef,
      );
      config.programs.push(program);
      return makeTx;
    },
    mintAssets: (assets: Assets, redeemer?: string | undefined) => {
      const program = mintAssets(config, assets, redeemer);
      config.programs.push(program);
      return makeTx;
    },
    validFrom: (unixTime: number) => {
      const program = validFrom(config, unixTime);
      config.programs.push(program);
      return makeTx;
    },
    validTo: (unixTime: number) => {
      const program = validTo(config, unixTime);
      config.programs.push(program);
      return makeTx;
    },
    attachScript: (script: Script) => {
      const scriptKeyValue = attachScript(config, script);
      config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
      return makeTx;
    },
    attachSpendingValidator: (spendingValidator: Script) => {
      const scriptKeyValue = attachSpendingValidator(config, spendingValidator);
      config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
      return makeTx;
    },
    attachMintingPolicy: (mintingPolicy: Script) => {
      const scriptKeyValue = attachMintingPolicy(config, mintingPolicy);
      config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
      return makeTx;
    },
    attachCertificateValidator: (certValidator: Script) => {
      const scriptKeyValue = attachCertificateValidator(config, certValidator);
      config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
      return makeTx;
    },
    attachWithdrawalValidator: (withdrawalValidator: Script) => {
      const scriptKeyValue = attachWithdrawalValidator(
        config,
        withdrawalValidator,
      );
      config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
      return makeTx;
    },
    complete: () => complete(config),
    config: () => config,
  };
  return makeTx;
}
