import { CML, makeReturn } from "../core.js";
import { LucidConfig } from "../lucid-evolution/LucidEvolution.js";
import { OutputDatum } from "./types.js";
import {
  Address,
  Assets,
  Label,
  Lovelace,
  PaymentKeyHash,
  PoolId,
  Redeemer,
  RedeemerBuilder,
  RewardAddress,
  Script,
  ScriptType,
  StakeKeyHash,
  UTxO,
} from "@lucid-evolution/core-types";
import * as Collect from "./internal/Collect.js";
import * as Read from "./internal/Read.js";
import * as Attach from "./internal/Attach.js";
import * as Pay from "./internal/Pay.js";
import * as Mint from "./internal/Mint.js";
import * as Interval from "./internal/Interval.js";
import * as Signer from "./internal/Signer.js";
import * as Stake from "./internal/Stake.js";
import * as Pool from "./internal/Pool.js";
import * as Metadata from "./internal/Metadata.js";
import * as CompleteTxBuilder from "./internal/CompleteTxBuilder.js";
import * as TxSignBuilder from "../tx-sign-builder/TxSignBuilder.js";
import { TransactionError } from "../Errors.js";
import { Either } from "effect/Either";
import { Effect } from "effect";
import { handleRedeemerBuilder } from "./internal/TxUtils.js";

export type TxBuilderConfig = {
  readonly lucidConfig: LucidConfig;
  readonly txBuilder: CML.TransactionBuilder;
  walletInputs: UTxO[];
  collectedInputs: UTxO[];
  readInputs: UTxO[];
  consumedInputs: UTxO[];
  totalOutputAssets: Assets;
  mintedAssets: Assets;
  scripts: Map<string, { type: ScriptType; script: string }>;
  programs: Effect.Effect<void, TransactionError, never>[];
  partialPrograms: Map<
    RedeemerBuilder,
    (redeemer?: string) => Effect.Effect<void, TransactionError, never>
  >;
  minFee: bigint | undefined;
};

export type TxBuilder = {
  readFrom: (utxos: UTxO[]) => TxBuilder;
  collectFrom: (
    utxos: UTxO[],
    redeemer?: string | RedeemerBuilder,
  ) => TxBuilder;
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
  addSigner: (address: Address | RewardAddress) => TxBuilder;
  addSignerKey: (hash: PaymentKeyHash | StakeKeyHash) => TxBuilder;
  registerStake: (rewardAddress: RewardAddress) => TxBuilder;
  deRegisterStake: (
    rewardAddress: RewardAddress,
    redeemer?: string,
  ) => TxBuilder;
  withdraw: (
    rewardAddress: RewardAddress,
    amount: Lovelace,
    redeemer?: string | RedeemerBuilder,
  ) => TxBuilder;
  mintAssets: (
    assets: Assets,
    redeemer?: string | RedeemerBuilder,
  ) => TxBuilder;
  validFrom: (unixTime: number) => TxBuilder;
  validTo: (unixTime: number) => TxBuilder;
  delegateTo: (
    rewardAddress: RewardAddress,
    poolId: PoolId,
    redeemer?: Redeemer,
  ) => TxBuilder;
  attachMetadata: (
    label: Label,
    metadata: Metadata.TransactionMetadata,
  ) => TxBuilder;
  attach: {
    Script: (script: Script) => TxBuilder;
    SpendingValidator: (spendingValidator: Script) => TxBuilder;
    MintingPolicy: (mintingPolicy: Script) => TxBuilder;
    CertificateValidator: (certValidator: Script) => TxBuilder;
    WithdrawalValidator: (withdrawalValidator: Script) => TxBuilder;
  };
  compose: (tx: TxBuilder | null) => TxBuilder;
  setMinFee: (fee: bigint) => TxBuilder;
  complete: (
    options?: CompleteTxBuilder.CompleteOptions,
  ) => Promise<TxSignBuilder.TxSignBuilder>;
  completeProgram: (
    options?: CompleteTxBuilder.CompleteOptions,
  ) => Effect.Effect<TxSignBuilder.TxSignBuilder, TransactionError>;
  completeSafe: (
    options?: CompleteTxBuilder.CompleteOptions,
  ) => Promise<Either<TxSignBuilder.TxSignBuilder, TransactionError>>;
  chainProgram: () => Effect.Effect<
    [UTxO[], UTxO[], TxSignBuilder.TxSignBuilder],
    TransactionError,
    never
  >;
  chain: () => Promise<[UTxO[], UTxO[], TxSignBuilder.TxSignBuilder]>;
  chainSafe: () => Promise<
    Either<[UTxO[], UTxO[], TxSignBuilder.TxSignBuilder], TransactionError>
  >;
  config: () => TxBuilderConfig;
};

export function makeTxBuilder(lucidConfig: LucidConfig): TxBuilder {
  const config: TxBuilderConfig = {
    lucidConfig: lucidConfig,
    txBuilder: CML.TransactionBuilder.new(lucidConfig.txbuilderconfig),
    walletInputs: [],
    collectedInputs: [],
    readInputs: [],
    consumedInputs: [],
    totalOutputAssets: {},
    mintedAssets: {},
    scripts: new Map(),
    programs: [],
    partialPrograms: new Map(),
    minFee: undefined,
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
    collectFrom: (utxos: UTxO[], redeemer?: string | RedeemerBuilder) => {
      const program =
        typeof redeemer === "object"
          ? Collect.collectFromUTxOPartial(config, utxos, redeemer)
          : Collect.collectFromUTxO(config, utxos)(redeemer);
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
    addSigner: (address: Address | RewardAddress) => {
      const program = Signer.addSigner(config, address);
      config.programs.push(program);
      return txBuilder;
    },
    addSignerKey: (hash: PaymentKeyHash | StakeKeyHash) => {
      const program = Signer.addSignerKey(config, hash);
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
      redeemer?: string | RedeemerBuilder,
    ) => {
      const partialProgram = Stake.withdraw(config, rewardAddress, amount);
      handleRedeemerBuilder(config, partialProgram, redeemer);
      return txBuilder;
    },
    mintAssets: (assets: Assets, redeemer?: string | RedeemerBuilder) => {
      const partialProgram = Mint.mintAssets(config, assets);
      handleRedeemerBuilder(config, partialProgram, redeemer);
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
    attachMetadata: (label: Label, metadata: Metadata.TransactionMetadata) => {
      const program = Metadata.attachMetadata(config, label, metadata);
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
    compose: (tx: TxBuilder | null) => {
      config.programs.concat(tx?.config().programs ?? []);
      return txBuilder;
    },
    setMinFee: (fee: bigint) => {
      config.minFee = fee;
      return txBuilder;
    },
    complete: (options?: CompleteTxBuilder.CompleteOptions) =>
      makeReturn(
        CompleteTxBuilder.complete(config, options).pipe(
          Effect.map((result) => result[2]),
        ),
      ).unsafeRun(),
    completeProgram: (options?: CompleteTxBuilder.CompleteOptions) =>
      CompleteTxBuilder.complete(config, options).pipe(
        Effect.map((result) => result[2]),
      ),
    completeSafe: (options?: CompleteTxBuilder.CompleteOptions) =>
      makeReturn(
        CompleteTxBuilder.complete(config, options).pipe(
          Effect.map((result) => result[2]),
        ),
      ).safeRun(),
    chainProgram: (options?: CompleteTxBuilder.CompleteOptions) =>
      CompleteTxBuilder.complete(config, options),
    chain: (options?: CompleteTxBuilder.CompleteOptions) =>
      makeReturn(CompleteTxBuilder.complete(config, options)).unsafeRun(),
    chainSafe: (options?: CompleteTxBuilder.CompleteOptions) =>
      makeReturn(CompleteTxBuilder.complete(config, options)).safeRun(),
    config: () => config,
  };
  return txBuilder;
}
