import { CML, makeReturn } from "../core.js";
import { LucidConfig } from "../evolution-sdk/LucidEvolution.js";
import { OutputDatum } from "./types.js";
import {
  Address,
  Anchor,
  Assets,
  DRep,
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
  TxOutput,
  Unit,
  UTxO,
} from "@evolution-sdk/core-types";
import * as Collect from "./internal/Collect.js";
import * as Read from "./internal/Read.js";
import * as Attach from "./internal/Attach.js";
import * as Pay from "./internal/Pay.js";
import * as Mint from "./internal/Mint.js";
import * as Interval from "./internal/Interval.js";
import * as Signer from "./internal/Signer.js";
import * as Stake from "./internal/Stake.js";
import * as Pool from "./internal/Pool.js";
import * as Governance from "./internal/Governance.js";
import * as Metadata from "./internal/Metadata.js";
import * as CompleteTxBuilder from "./internal/CompleteTxBuilder.js";
import * as TxSignBuilder from "../tx-sign-builder/TxSignBuilder.js";
import { TransactionError } from "../Errors.js";
import { Either } from "effect/Either";
import { Effect, Layer, pipe } from "effect";
import { handleRedeemerBuilder } from "./internal/TxUtils.js";
import { addAssets } from "@evolution-sdk/utils";
import { TxConfig } from "./internal/Service.js";

export type TxBuilderConfig = {
  readonly lucidConfig: LucidConfig;
  readonly txBuilder: CML.TransactionBuilder;
  walletInputs: UTxO[];
  collectedInputs: UTxO[];
  readInputs: UTxO[];
  consumedInputs: UTxO[];
  totalOutputAssets: Assets;
  payToOutputs: TxOutput[];
  mintedAssets: Assets;
  scripts: Map<string, { type: ScriptType; script: string }>;
  programs: Effect.Effect<void, TransactionError, TxConfig>[];
  partialPrograms: Map<
    RedeemerBuilder,
    (redeemer?: string) => Effect.Effect<void, TransactionError, TxConfig>
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
    /**
     * Creates an output that lock funds to a target address, with optional parameters for attaching a datum, assets, and a reference script.
     *
     * **Warning:** When working with Plutus V1 or V2 contracts, omitting the `outputDatum` can result in a permanently locked UTXO.
     *
     * @example
     * ```ts
     * const refScript: Script = {
     *   type: "PlutusV3",
     *   script: "450100002499",
     *  };
     *
     * const signBuilder = await user
     *   .newTx()
     *   .pay.ToAddressWithData(
     *     "addr1q98wl3hnya9l94rt58ky533deyqe9t8zz5n9su26k8e5g23yar4q0adtaax9q9g0kphpv2ws7vxqwu6ln6pqx7j29nfqsfy9mg",
     *     {
     *       kind: "inline",
     *       value: "d8799f44deadbeefff",
     *     },
     *     { lovelace: 10_000_000n },
     *     refScript
     *   )
     *   .complete();
     * ```
     */
    ToAddressWithData: (
      address: string,
      outputDatum?: OutputDatum,
      assets?: Assets | undefined,
      scriptRef?: Script | undefined,
    ) => TxBuilder;
    /**
     * Creates an output that lock funds to a target address, with optional parameters for attaching a datum, assets, and a reference script.
     *
     * **Warning:** When working with Plutus V1 or V2 contracts, omitting the `outputDatum` can result in a permanently locked UTXO.
     *
     * @example
     * ```ts
     * const refScript: Script = {
     *   type: "PlutusV3",
     *   script: "450100002499",
     *  };
     *
     * const signBuilder = await user
     *   .newTx()
     *   .pay.ToContract(
     *     "addr1q98wl3hnya9l94rt58ky533deyqe9t8zz5n9su26k8e5g23yar4q0adtaax9q9g0kphpv2ws7vxqwu6ln6pqx7j29nfqsfy9mg",
     *     {
     *       kind: "inline",
     *       value: "d8799f44deadbeefff",
     *     },
     *     { lovelace: 10_000_000n },
     *     refScript
     *   )
     *   .complete();
     * ```
     */
    ToContract: (
      address: string,
      outputDatum?: OutputDatum,
      assets?: Assets | undefined,
      scriptRef?: Script | undefined,
    ) => TxBuilder;
  };
  addSigner: (address: Address | RewardAddress) => TxBuilder;
  addSignerKey: (keyHash: PaymentKeyHash | StakeKeyHash) => TxBuilder;
  /**
   * NOTE: Deprecate in future version
   */
  registerStake: (rewardAddress: RewardAddress) => TxBuilder;
  /**
   * NOTE: Deprecate in future version
   */
  deRegisterStake: (
    rewardAddress: RewardAddress,
    redeemer?: string,
  ) => TxBuilder;
  withdraw: (
    rewardAddress: RewardAddress,
    amount: Lovelace,
    redeemer?: string | RedeemerBuilder,
  ) => TxBuilder;
  register: {
    Stake: (rewardAddress: RewardAddress) => TxBuilder;
    DRep: (
      rewardAddress: RewardAddress,
      anchor?: Anchor,
      redeemer?: string,
    ) => TxBuilder;
  };
  deregister: {
    Stake: (rewardAddress: RewardAddress, redeemer?: string) => TxBuilder;
    DRep: (rewardAddress: RewardAddress, redeemer?: string) => TxBuilder;
  };
  mintAssets: (
    assets: Assets,
    redeemer?: string | RedeemerBuilder,
  ) => TxBuilder;
  validFrom: (unixTime: number) => TxBuilder;
  validTo: (unixTime: number) => TxBuilder;
  /**
   * NOTE: Deprecate in future version
   */
  delegateTo: (
    rewardAddress: RewardAddress,
    poolId: PoolId,
    redeemer?: Redeemer,
  ) => TxBuilder;
  delegate: {
    ToPool: (
      rewardAddress: RewardAddress,
      poolId: PoolId,
      redeemer?: Redeemer,
    ) => TxBuilder;
    VoteToDRep: (
      rewardAddress: RewardAddress,
      drep: DRep,
      redeemer?: Redeemer,
    ) => TxBuilder;
    VoteToPoolAndDRep: (
      rewardAddress: RewardAddress,
      poolId: PoolId,
      drep: DRep,
      redeemer?: Redeemer,
    ) => TxBuilder;
  };
  registerAndDelegate: {
    ToPool: (
      rewardAddress: RewardAddress,
      poolId: PoolId,
      redeemer?: Redeemer,
    ) => TxBuilder;
    ToDRep: (
      rewardAddress: RewardAddress,
      drep: DRep,
      redeemer?: Redeemer,
    ) => TxBuilder;
    ToPoolAndDRep: (
      rewardAddress: RewardAddress,
      poolId: PoolId,
      drep: DRep,
      redeemer?: Redeemer,
    ) => TxBuilder;
  };
  updateDRep: (
    rewardAddress: RewardAddress,
    anchor?: Anchor,
    redeemer?: Redeemer,
  ) => TxBuilder;
  authCommitteeHot: (
    coldAddress: RewardAddress,
    hotAddress: RewardAddress,
  ) => TxBuilder;
  resignCommitteeHot: (
    coldAddress: RewardAddress,
    anchor?: Anchor,
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
    VoteValidator: (voteValidator: Script) => TxBuilder;
    ProposeValidator: (proposeValidator: Script) => TxBuilder;
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
  chainProgram: (
    options?: CompleteTxBuilder.CompleteOptions,
  ) => Effect.Effect<
    [UTxO[], UTxO[], TxSignBuilder.TxSignBuilder],
    TransactionError,
    never
  >;
  chain: (
    options?: CompleteTxBuilder.CompleteOptions,
  ) => Promise<[UTxO[], UTxO[], TxSignBuilder.TxSignBuilder]>;
  chainSafe: (
    options?: CompleteTxBuilder.CompleteOptions,
  ) => Promise<
    Either<[UTxO[], UTxO[], TxSignBuilder.TxSignBuilder], TransactionError>
  >;
  /**
   * **Warning:** This method executes all programs and mutates the TxBuilder state.
   *
   * Calling `.complete()` after executing this function will lead to unexpected behavior.
   *
   * It is recommended to call `.config()` only for debugging purposes
   */
  config: () => Promise<TxBuilderConfig>;
  /**
   * Returns the raw TxBuilderConfig
   */
  rawConfig: () => TxBuilderConfig;
  /**
   * Returns the current lucid instance configuration
   */
  lucidConfig: () => LucidConfig;
  /**
   * Returns the current txbuilder programs
   */
  getPrograms: () => Effect.Effect<void, TransactionError, TxConfig>[];
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
    payToOutputs: [],
    mintedAssets: {},
    scripts: new Map(),
    programs: [],
    partialPrograms: new Map(),
    minFee: undefined,
  };
  const configLayer = Layer.succeed(TxConfig, { config });
  const txBuilder: TxBuilder = {
    readFrom: (utxos: UTxO[]) => {
      utxos.map((utxo) => {
        if (utxo.scriptRef) {
          const scriptKeyValue = Attach.attachScript(utxo.scriptRef);
          config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
        }
      });
      const program = Read.readFrom(utxos);
      config.programs.push(program);
      return txBuilder;
    },
    collectFrom: (utxos: UTxO[], redeemer?: string | RedeemerBuilder) => {
      const program =
        typeof redeemer === "object"
          ? Collect.collectFromUTxOPartial(utxos, redeemer)
          : Collect.collectFromUTxO(utxos)(redeemer);
      config.programs.push(program);
      return txBuilder;
    },
    pay: {
      ToAddress: (address: string, assets: Assets) => {
        const program = Pay.payToAddress(address, assets);
        config.programs.push(program);
        return txBuilder;
      },
      ToAddressWithData: (
        address: string,
        outputDatum?: OutputDatum,
        assets?: Assets,
        scriptRef?: Script | undefined,
      ) => {
        const program = Pay.ToAddressWithData(
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
        outputDatum?: OutputDatum,
        assets?: Assets,
        scriptRef?: Script | undefined,
      ) => {
        const program = Pay.ToContract(address, outputDatum, assets, scriptRef);
        config.programs.push(program);
        return txBuilder;
      },
    },
    addSigner: (address: Address | RewardAddress) => {
      const program = Signer.addSigner(address);
      config.programs.push(program);
      return txBuilder;
    },
    addSignerKey: (keyHash: PaymentKeyHash | StakeKeyHash) => {
      const program = Signer.addSignerKey(keyHash);
      config.programs.push(program);
      return txBuilder;
    },
    registerStake: (rewardAddress: RewardAddress) => {
      const program = Stake.registerStake(rewardAddress);
      config.programs.push(program);
      return txBuilder;
    },
    register: {
      Stake: (rewardAddress: RewardAddress) => {
        const program = Stake.registerStake(rewardAddress);
        config.programs.push(program);
        return txBuilder;
      },
      DRep: (
        rewardAddress: RewardAddress,
        anchor?: Anchor,
        redeemer?: string,
      ) => {
        const program = Governance.registerDRep(
          rewardAddress,
          anchor,
          redeemer,
        );
        config.programs.push(program);
        return txBuilder;
      },
    },
    deRegisterStake: (rewardAddress: RewardAddress, redeemer?: string) => {
      const program = Stake.deRegisterStake(rewardAddress, redeemer);
      config.programs.push(program);
      return txBuilder;
    },
    deregister: {
      Stake: (rewardAddress: RewardAddress, redeemer?: string) => {
        const program = Stake.deRegisterStake(rewardAddress, redeemer);
        config.programs.push(program);
        return txBuilder;
      },
      DRep: (rewardAddress: RewardAddress, redeemer?: string) => {
        const program = Governance.deregisterDRep(rewardAddress, redeemer);
        config.programs.push(program);
        return txBuilder;
      },
    },
    withdraw: (
      rewardAddress: RewardAddress,
      amount: Lovelace,
      redeemer?: string | RedeemerBuilder,
    ) => {
      const partialProgram = Stake.withdraw(rewardAddress, amount);
      //TODO: improve function workflow
      handleRedeemerBuilder(config, partialProgram, redeemer);
      return txBuilder;
    },
    mintAssets: (assets: Assets, redeemer?: string | RedeemerBuilder) => {
      config.mintedAssets = addAssets(config.mintedAssets, assets);
      const partialProgram = Mint.mintAssets(assets);
      //TODO: improve function workflow
      handleRedeemerBuilder(config, partialProgram, redeemer);
      return txBuilder;
    },
    validFrom: (unixTime: number) => {
      const program = Interval.validFrom(unixTime);
      config.programs.push(program);
      return txBuilder;
    },
    validTo: (unixTime: number) => {
      const program = Interval.validTo(unixTime);
      config.programs.push(program);
      return txBuilder;
    },
    delegateTo: (
      rewardAddress: RewardAddress,
      poolId: PoolId,
      redeemer?: Redeemer,
    ) => {
      const program = Pool.delegateTo(rewardAddress, poolId, redeemer);
      config.programs.push(program);
      return txBuilder;
    },
    delegate: {
      ToPool: (
        rewardAddress: RewardAddress,
        poolId: PoolId,
        redeemer?: Redeemer,
      ) => {
        const program = Pool.delegateTo(rewardAddress, poolId, redeemer);
        config.programs.push(program);
        return txBuilder;
      },

      VoteToDRep: (
        rewardAddress: RewardAddress,
        drep: DRep,
        redeemer?: Redeemer,
      ) => {
        const program = Governance.delegateVoteToDRep(
          rewardAddress,
          drep,
          redeemer,
        );
        config.programs.push(program);
        return txBuilder;
      },

      VoteToPoolAndDRep: (
        rewardAddress: RewardAddress,
        poolId: PoolId,
        drep: DRep,
        redeemer?: Redeemer,
      ) => {
        const program = Governance.delegateVoteToPoolAndDRep(
          rewardAddress,
          poolId,
          drep,
          redeemer,
        );
        config.programs.push(program);
        return txBuilder;
      },
    },
    registerAndDelegate: {
      ToPool: (
        rewardAddress: RewardAddress,
        poolId: PoolId,
        redeemer?: Redeemer,
      ) => {
        const program = Governance.registerAndDelegateToPool(
          rewardAddress,
          poolId,
          redeemer,
        );
        config.programs.push(program);
        return txBuilder;
      },
      ToDRep: (
        rewardAddress: RewardAddress,
        drep: DRep,
        redeemer?: Redeemer,
      ) => {
        const program = Governance.registerAndDelegateToDRep(
          rewardAddress,
          drep,
          redeemer,
        );
        config.programs.push(program);
        return txBuilder;
      },
      ToPoolAndDRep: (
        rewardAddress: RewardAddress,
        poolId: PoolId,
        drep: DRep,
        redeemer?: Redeemer,
      ) => {
        const program = Governance.registerAndDelegateToPoolAndDRep(
          rewardAddress,
          poolId,
          drep,
          redeemer,
        );
        config.programs.push(program);
        return txBuilder;
      },
    },
    updateDRep: (
      rewardAddress: RewardAddress,
      anchor?: Anchor,
      redeemer?: Redeemer,
    ) => {
      const program = Governance.updateDRep(rewardAddress, anchor, redeemer);
      config.programs.push(program);
      return txBuilder;
    },
    authCommitteeHot: (
      coldAddress: RewardAddress,
      hotAddress: RewardAddress,
      redeemer?: Redeemer,
    ) => {
      const program = Governance.authCommitteeHot(
        coldAddress,
        hotAddress,
        redeemer,
      );
      config.programs.push(program);
      return txBuilder;
    },
    resignCommitteeHot: (
      coldAddress: RewardAddress,
      anchor?: Anchor,
      redeemer?: Redeemer,
    ) => {
      const program = Governance.resignCommitteeHot(
        coldAddress,
        anchor,
        redeemer,
      );
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
      VoteValidator: (voteValidator: Script) => {
        const scriptKeyValue = Attach.attachVoteValidator(voteValidator);
        config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
        return txBuilder;
      },
      ProposeValidator: (proposeValidator: Script) => {
        const scriptKeyValue = Attach.attachProposeValidator(proposeValidator);
        config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
        return txBuilder;
      },
    },
    compose: (tx: TxBuilder | null) => {
      if (tx) {
        const rawConfig = tx.rawConfig();
        config.programs = [...config.programs, ...tx.getPrograms()];
        config.scripts = new Map([...config.scripts, ...rawConfig.scripts]);
        config.mintedAssets = Object.entries({
          ...config.mintedAssets,
          ...rawConfig.mintedAssets,
        }).reduce<Assets>((acc, [key, value]) => {
          acc[key as Unit | "lovelace"] =
            (config.mintedAssets[key as Unit | "lovelace"] || 0n) +
            BigInt(value);
          return acc;
        }, {});
      }
      return txBuilder;
    },
    setMinFee: (fee: bigint) => {
      config.minFee = fee;
      return txBuilder;
    },
    complete: (options?: CompleteTxBuilder.CompleteOptions) =>
      makeReturn(
        pipe(
          CompleteTxBuilder.complete(options),
          Effect.provide(configLayer),
          Effect.map((result) => result[2]),
        ),
      ).unsafeRun(),
    completeProgram: (options?: CompleteTxBuilder.CompleteOptions) =>
      pipe(
        CompleteTxBuilder.complete(options),
        Effect.provide(configLayer),
        Effect.map((result) => result[2]),
      ),
    completeSafe: (options?: CompleteTxBuilder.CompleteOptions) =>
      makeReturn(
        pipe(
          CompleteTxBuilder.complete(options),
          Effect.provide(configLayer),
          Effect.map((result) => result[2]),
        ),
      ).safeRun(),
    chainProgram: (options?: CompleteTxBuilder.CompleteOptions) =>
      pipe(CompleteTxBuilder.complete(options), Effect.provide(configLayer)),
    chain: (options?: CompleteTxBuilder.CompleteOptions) =>
      makeReturn(
        pipe(CompleteTxBuilder.complete(options), Effect.provide(configLayer)),
      ).unsafeRun(),
    chainSafe: (options?: CompleteTxBuilder.CompleteOptions) =>
      makeReturn(
        pipe(CompleteTxBuilder.complete(options), Effect.provide(configLayer)),
      ).safeRun(),
    rawConfig: () => config,
    config: () =>
      pipe(
        Effect.gen(function* () {
          yield* Effect.all(config.programs);
          return config;
        }),
        Effect.provide(configLayer),
        Effect.runPromise,
      ),
    lucidConfig: () => config.lucidConfig,
    getPrograms: () => config.programs,
  };
  return txBuilder;
}
