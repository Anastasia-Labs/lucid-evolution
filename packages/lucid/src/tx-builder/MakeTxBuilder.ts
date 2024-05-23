import { CML } from "../core.js";
import { LucidConfig } from "../lucid-evolution/LucidEvolution.js";
import { TxBuilderConfig, OutputDatum } from "./types.js";
import * as Read from "./internal/Read.js";
import {
  Address,
  Assets,
  Lovelace,
  PoolId,
  Redeemer,
  RewardAddress,
  Script,
  UTxO,
} from "@lucid-evolution/core-types";
import * as Collect from "./internal/Collect.js";
import * as Attach from "./internal/Attach.js";
import * as Pay from "./internal/Pay.js";
import * as Mint from "./internal/Mint.js";
import * as Interval from "./internal/Interval.js";
import * as Signer from "./internal/Signer.js";
import * as Stake from "./internal/Stake.js";
import * as Pool from "./internal/Pool.js";
import { completeTxBuilder } from "./internal/CompleteTxBuilder.js";
import { TxSignBuilder } from "../tx-sign-builder/MakeTxSign.js";
import { TransactionError } from "../Errors.js";
import { Either } from "effect/Either";
import { Effect } from "effect/Effect";

export type TxBuilder = {
  readFrom: (utxos: UTxO[]) => TxBuilder;
  collectFrom: (utxos: UTxO[], redeemer?: string | undefined) => TxBuilder;
  pay: {
    ToAddress: (address: string, assets: Assets) => TxBuilder;
    ToAddressWithData: (
      address: string,
      outputDatum: OutputDatum,
      assets?: Assets | undefined,
      scriptRef?: Script | undefined,
    ) => TxBuilder;
    ToContract: (
      address: string,
      outputDatum: OutputDatum,
      assets?: Assets | undefined,
      scriptRef?: Script | undefined,
    ) => TxBuilder;
  };
  addSigner: (address: Address) => TxBuilder;
  registerStake: (rewardAddress: RewardAddress) => TxBuilder;
  deRegisterStake: (
    rewardAddress: RewardAddress,
    redeemer?: string,
  ) => TxBuilder;
  withdraw: (
    rewardAddress: RewardAddress,
    amount: Lovelace,
    redeemer?: string,
  ) => TxBuilder;
  mintAssets: (assets: Assets, redeemer?: string | undefined) => TxBuilder;
  validFrom: (unixTime: number) => TxBuilder;
  validTo: (unixTime: number) => TxBuilder;
  delegateTo: (
    rewardAddress: RewardAddress,
    poolId: PoolId,
    redeemer?: Redeemer,
  ) => TxBuilder;
  attach: {
    Script: (script: Script) => TxBuilder;
    SpendingValidator: (spendingValidator: Script) => TxBuilder;
    MintingPolicy: (mintingPolicy: Script) => TxBuilder;
    CertificateValidator: (certValidator: Script) => TxBuilder;
    WithdrawalValidator: (withdrawalValidator: Script) => TxBuilder;
  };
  complete: () => Promise<TxSignBuilder>;
  completeProgram: () => Effect<TxSignBuilder, TransactionError>;
  completeSafe: () => Promise<Either<TxSignBuilder, TransactionError>>;
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
      utxos.map((utxo) => {
        if (utxo.scriptRef) {
          const scriptKeyValue = Attach.attachScript(utxo.scriptRef);
          config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
        }
      });
      const program = Read.readFrom(config, utxos);
      config.programs.push(program);
      return txBuilder;
    },
    collectFrom: (utxos: UTxO[], redeemer?: string | undefined) => {
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
        assets?: Assets,
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
      ToContract: (
        address: string,
        outputDatum: OutputDatum,
        assets?: Assets,
        scriptRef?: Script | undefined,
      ) => {
        const program = Pay.payToContract(
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
    addSigner: (address: Address) => {
      const program = Signer.addSigner(config, address);
      config.programs.push(program);
      return txBuilder;
    },
    registerStake: (rewardAddress: RewardAddress) => {
      const program = Stake.registerStake(config, rewardAddress);
      config.programs.push(program);
      return txBuilder;
    },
    deRegisterStake: (rewardAddress: RewardAddress, redeemer?: string) => {
      const program = Stake.deRegisterStake(config, rewardAddress, redeemer);
      config.programs.push(program);
      return txBuilder;
    },
    withdraw: (
      rewardAddress: RewardAddress,
      amount: Lovelace,
      redeemer?: string,
    ) => {
      const program = Stake.withdraw(config, rewardAddress, amount, redeemer);
      config.programs.push(program);
      return txBuilder;
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
    delegateTo: (
      rewardAddress: RewardAddress,
      poolId: PoolId,
      redeemer?: Redeemer,
    ) => {
      const program = Pool.delegateTo(config, rewardAddress, poolId, redeemer);
      config.programs.push(program);
      return txBuilder;
    },
    attach: {
      Script: (script: Script) => {
        const scriptKeyValue = Attach.attachScript(script);
        config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
        return txBuilder;
      },
      SpendingValidator: (spendingValidator: Script) => {
        const scriptKeyValue =
          Attach.attachSpendingValidator(spendingValidator);
        config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
        return txBuilder;
      },
      MintingPolicy: (mintingPolicy: Script) => {
        const scriptKeyValue = Attach.attachMintingPolicy(mintingPolicy);
        config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
        return txBuilder;
      },
      CertificateValidator: (certValidator: Script) => {
        const scriptKeyValue = Attach.attachCertificateValidator(certValidator);
        config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
        return txBuilder;
      },
      WithdrawalValidator: (withdrawalValidator: Script) => {
        const scriptKeyValue =
          Attach.attachWithdrawalValidator(withdrawalValidator);
        config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
        return txBuilder;
      },
    },
    complete: () => completeTxBuilder(config).unsafeRun(),
    completeProgram: () => completeTxBuilder(config).program(),
    completeSafe: () => completeTxBuilder(config).safeRun(),
    config: () => config,
  };
  return txBuilder;
}
