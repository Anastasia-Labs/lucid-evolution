import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { LucidConfig } from "../lucid-evolution/LucidEvolution.js";
import { TxBuilderConfig, OutputDatum } from "./types.js";
import * as Read from "./internal/Read.js";
import { Assets, Script, UTxO } from "@lucid-evolution/core-types";
import * as Collect from "./internal/Collect.js";
import * as Attach from "./internal/Attach.js";
import * as Pay from "./internal/Pay.js";
import * as Mint from "./internal/Mint.js";
import * as Interval from "./internal/Interval.js";
import { completeTxBuilder } from "./CompleteTxBuilder.js";
import { TxSignBuilder } from "../tx-sign-builder/MakeTxSign.js";
import { RunTimeError, TransactionErrors } from "../Errors.js";
import { Either } from "effect/Either";
import { Effect } from "effect/Effect";

export type TxBuilder = {
  readFrom: (utxos: UTxO[]) => TxBuilder;
  collectFrom: (
    config: TxBuilderConfig,
    utxos: UTxO[],
    redeemer?: string | undefined,
  ) => TxBuilder;
  pay: {
    ToAddress: (address: string, assets: Assets) => TxBuilder;
    ToAddressWithData: (
      address: string,
      outputDatum: OutputDatum,
      assets: Assets,
      scriptRef?: Script | undefined,
    ) => TxBuilder;
  };
  mintAssets: (assets: Assets, redeemer?: string | undefined) => TxBuilder;
  validFrom: (unixTime: number) => TxBuilder;
  validTo: (unixTime: number) => TxBuilder;
  attach: {
    Script: (script: Script) => TxBuilder;
    SpendingValidator: (spendingValidator: Script) => TxBuilder;
    MintingPolicy: (mintingPolicy: Script) => TxBuilder;
    CertificateValidator: (certValidator: Script) => TxBuilder;
    WithdrawalValidator: (withdrawalValidator: Script) => TxBuilder;
  };
  complete: () => {
    unsafeRun: () => Promise<TxSignBuilder>;
    safeRun: () => Promise<
      Either<TxSignBuilder, TransactionErrors | RunTimeError>
    >;
    program: () => Effect<TxSignBuilder, TransactionErrors | RunTimeError>;
  };
  config: () => TxBuilderConfig;
};

export function makeTxBuilder(lucidConfig: LucidConfig): TxBuilder {
  const config: TxBuilderConfig = {
    lucidConfig: lucidConfig,
    txBuilder: CML.TransactionBuilder.new(lucidConfig.txbuilderconfig),
    inputUTxOs: [],
    scripts: new Map(),
    programs: [],
  };
  const txBuilder: TxBuilder = {
    readFrom: (utxos: UTxO[]) => {
      const program = Read.readFrom(config, utxos);
      config.programs.push(program);
      return txBuilder;
    },
    collectFrom: (
      config: TxBuilderConfig,
      utxos: UTxO[],
      redeemer?: string | undefined,
    ) => {
      const program = Collect.collectFromUTxO(config, utxos, redeemer);
      config.programs.push(program);
      return txBuilder;
    },
    pay: {
      ToAddress: (address: string, assets: Assets) => {
        const program = Pay.payToAddress(config, address, assets);
        config.programs.push(program);
        return txBuilder;
      },
      ToAddressWithData: (
        address: string,
        outputDatum: OutputDatum,
        assets: Assets,
        scriptRef?: Script | undefined,
      ) => {
        const program = Pay.payToAddressWithData(
          config,
          address,
          outputDatum,
          assets,
          scriptRef,
        );
        config.programs.push(program);
        return txBuilder;
      },
    },
    mintAssets: (assets: Assets, redeemer?: string | undefined) => {
      const program = Mint.mintAssets(config, assets, redeemer);
      config.programs.push(program);
      return txBuilder;
    },
    validFrom: (unixTime: number) => {
      const program = Interval.validFrom(config, unixTime);
      config.programs.push(program);
      return txBuilder;
    },
    validTo: (unixTime: number) => {
      const program = Interval.validTo(config, unixTime);
      config.programs.push(program);
      return txBuilder;
    },
    attach: {
      Script: (script: Script) => {
        const scriptKeyValue = Attach.attachScript(config, script);
        config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
        return txBuilder;
      },
      SpendingValidator: (spendingValidator: Script) => {
        const scriptKeyValue = Attach.attachSpendingValidator(
          config,
          spendingValidator,
        );
        config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
        return txBuilder;
      },
      MintingPolicy: (mintingPolicy: Script) => {
        const scriptKeyValue = Attach.attachMintingPolicy(
          config,
          mintingPolicy,
        );
        config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
        return txBuilder;
      },
      CertificateValidator: (certValidator: Script) => {
        const scriptKeyValue = Attach.attachCertificateValidator(
          config,
          certValidator,
        );
        config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
        return txBuilder;
      },
      WithdrawalValidator: (withdrawalValidator: Script) => {
        const scriptKeyValue = Attach.attachWithdrawalValidator(
          config,
          withdrawalValidator,
        );
        config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
        return txBuilder;
      },
    },
    complete: () => completeTxBuilder(config),
    config: () => config,
  };
  return txBuilder;
}
