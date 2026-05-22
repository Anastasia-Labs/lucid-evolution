import { CML, makeReturn } from "../core.js";
import { LucidConfig } from "../lucid-evolution/LucidEvolution.js";
import { OutputDatum } from "./types.js";
import {
  Address,
  Anchor,
  Assets,
  BuildTxWithRedeemer,
  DRep,
  Label,
  Lovelace,
  PaymentKeyHash,
  PolicyId,
  PoolId,
  Redeemer,
  RedeemerBuilder,
  RewardAddress,
  Script,
  ScriptType,
  StakeKeyHash,
  TxOutput,
  UTxO,
} from "@lucid-evolution/core-types";
import { Data } from "@lucid-evolution/plutus";
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
import {
  handleRedeemerBuilder,
  validateAddressDetails,
} from "./internal/TxUtils.js";
import { addAssets, paymentCredentialOf } from "@lucid-evolution/utils";
import { TxConfig } from "./internal/Service.js";
import {
  BuildTxRedeemer,
  cloneAssets,
  cloneRedeemerInput,
  cloneUTxO,
  cloneUTxOs,
  isBuildTxWithRedeemer,
  isDelayedRedeemer,
  isRedeemerBuilder,
  PendingRedeemer,
  registerPendingRedeemer,
} from "./internal/RedeemerContext.js";
import { TxBuilderError } from "../Errors.js";

export type TxAction = {
  readonly id: number;
  readonly kind: string;
  readonly pendingIds: readonly number[];
  readonly hasDelayedRedeemer: boolean;
  readonly replay: (
    currentRedeemers: ReadonlyMap<number, Redeemer>,
  ) => Effect.Effect<void, TransactionError, TxConfig>;
  readonly cloneWithIds: (id: number, pendingIds: number[]) => TxAction;
};

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
  actions: TxAction[];
  nextActionId: number;
  pendingRedeemers: PendingRedeemer[];
  witnessRegistry: Set<string>;
  minFee: bigint | undefined;
};

const txActionError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ TxAction: ${cause} }` });

const makeAction = (
  id: number,
  kind: string,
  pendingIds: number[],
  hasDelayedRedeemer: boolean,
  makeReplay: (id: number, pendingIds: number[]) => TxAction["replay"],
): TxAction => ({
  id,
  kind,
  pendingIds,
  hasDelayedRedeemer,
  replay: makeReplay(id, pendingIds),
  cloneWithIds: (nextId, nextPendingIds) =>
    makeAction(nextId, kind, nextPendingIds, hasDelayedRedeemer, makeReplay),
});

const recordAction = (
  config: TxBuilderConfig,
  pendingCount: number,
  make: (id: number, pendingIds: number[]) => TxAction,
) => {
  const id = config.nextActionId++;
  const pendingIds = Array.from({ length: pendingCount }, () => {
    const pendingId = config.nextActionId;
    config.nextActionId++;
    return pendingId;
  });
  config.actions.push(make(id, pendingIds));
};

const replayAction = (
  action: TxAction,
  currentRedeemers: ReadonlyMap<number, Redeemer>,
) => action.replay(currentRedeemers);

export const replayTxActions = (
  actions: ReadonlyArray<TxAction>,
  currentRedeemers: ReadonlyMap<number, Redeemer> = new Map(),
) =>
  Effect.gen(function* () {
    for (const action of actions) {
      yield* replayAction(action, currentRedeemers);
    }
  });

export const hasDelayedActions = (config: TxBuilderConfig): boolean =>
  config.actions.some((action) => action.hasDelayedRedeemer);

export const makeTxBuilderConfig = (
  lucidConfig: LucidConfig,
  source?: TxBuilderConfig,
): TxBuilderConfig => ({
  lucidConfig,
  txBuilder: CML.TransactionBuilder.new(lucidConfig.txbuilderconfig),
  walletInputs: [],
  collectedInputs: [],
  readInputs: [],
  consumedInputs: [],
  totalOutputAssets: {},
  payToOutputs: [],
  mintedAssets: source ? cloneAssets(source.mintedAssets) : {},
  scripts: source ? new Map(source.scripts) : new Map(),
  programs: [],
  partialPrograms: new Map(),
  actions: [],
  nextActionId: source?.nextActionId ?? 0,
  pendingRedeemers: [],
  witnessRegistry: new Set(),
  minFee: source?.minFee,
});

export const makeReplayConfig = (source: TxBuilderConfig): TxBuilderConfig =>
  makeTxBuilderConfig(source.lucidConfig, source);

const redeemerFor = (
  currentRedeemers: ReadonlyMap<number, Redeemer>,
  pendingId: number,
): Redeemer => currentRedeemers.get(pendingId) ?? Data.void();

const isPlutusScriptType = (scriptType: ScriptType | undefined): boolean =>
  scriptType !== undefined && scriptType !== "Native";

const spendScriptType = (
  config: TxBuilderConfig,
  utxo: UTxO,
): ScriptType | undefined => {
  const credential = paymentCredentialOf(utxo.address);
  if (credential.type !== "Script") return undefined;
  return config.scripts.get(credential.hash)?.type;
};

const hasMissingSpendScript = (
  config: TxBuilderConfig,
  utxo: UTxO,
): boolean => {
  const credential = paymentCredentialOf(utxo.address);
  return credential.type === "Script" && !config.scripts.has(credential.hash);
};

const replayCollectWithDelayedRedeemer = (
  actionId: number,
  pendingIds: readonly number[],
  utxos: UTxO[],
  redeemer: RedeemerBuilder | BuildTxWithRedeemer,
  currentRedeemers: ReadonlyMap<number, Redeemer>,
) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    let plutusWitnessCount = 0;

    if (isRedeemerBuilder(redeemer) && redeemer.kind === "selected") {
      const pendingId = pendingIds[0];
      const delayedRedeemer = redeemerFor(currentRedeemers, pendingId);
      for (const utxo of utxos) {
        if (isPlutusScriptType(spendScriptType(config, utxo))) {
          plutusWitnessCount++;
          yield* registerPendingRedeemer(config, {
            id: pendingId,
            actionId,
            source: redeemer,
            purposeKey: {
              tag: "spend",
              input: { txHash: utxo.txHash, outputIndex: utxo.outputIndex },
            },
          });
        }
      }
      if (plutusWitnessCount === 0) {
        if (utxos.some((utxo) => hasMissingSpendScript(config, utxo))) {
          yield* Collect.collectFromUTxO(cloneUTxOs(utxos))(delayedRedeemer);
          return;
        }
        yield* txActionError(
          "Delayed collectFrom redeemer requires at least one Plutus spend witness",
        );
      }
      yield* Collect.collectFromUTxO(cloneUTxOs(utxos))(delayedRedeemer);
      return;
    }

    for (let index = 0; index < utxos.length; index++) {
      const utxo = utxos[index];
      const hasPlutusWitness = isPlutusScriptType(
        spendScriptType(config, utxo),
      );
      if (!hasPlutusWitness) {
        yield* Collect.collectFromUTxO([cloneUTxO(utxo)])();
        continue;
      }

      plutusWitnessCount++;
      const pendingId = pendingIds[index];
      yield* registerPendingRedeemer(config, {
        id: pendingId,
        actionId,
        source: redeemer,
        purposeKey: {
          tag: "spend",
          input: { txHash: utxo.txHash, outputIndex: utxo.outputIndex },
        },
      });
      yield* Collect.collectFromUTxO([cloneUTxO(utxo)])(
        redeemerFor(currentRedeemers, pendingId),
      );
    }

    if (plutusWitnessCount === 0) {
      yield* txActionError(
        "Delayed collectFrom redeemer requires at least one Plutus spend witness",
      );
    }
  });

const mintPolicyId = (assets: Assets): PolicyId => {
  const unit = Object.keys(assets)[0];
  return unit === "lovelace" ? "" : unit.slice(0, 56);
};

const cloneOutputDatum = (
  outputDatum: OutputDatum | undefined,
): OutputDatum | undefined => (outputDatum ? { ...outputDatum } : undefined);

const preserveSelfRedeemerBuilderInputs = (
  redeemer: BuildTxRedeemer | undefined,
  inputs: UTxO[],
) => {
  if (isRedeemerBuilder(redeemer) && redeemer.kind === "self") {
    redeemer.inputs = cloneUTxOs(inputs);
  }
};

const replayMintWithDelayedRedeemer = (
  actionId: number,
  pendingIds: readonly number[],
  assets: Assets,
  redeemer: RedeemerBuilder | BuildTxWithRedeemer,
  currentRedeemers: ReadonlyMap<number, Redeemer>,
) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    if (isRedeemerBuilder(redeemer) && redeemer.kind === "self") {
      yield* txActionError(
        "RedeemerBuilder self is only valid for collectFrom",
      );
    }
    const policyId = mintPolicyId(assets);
    const script = config.scripts.get(policyId);
    if (!script) {
      yield* Mint.mintAssets(cloneAssets(assets))();
      return;
    }
    if (!isPlutusScriptType(script.type)) {
      yield* txActionError(
        "Delayed mintAssets redeemer requires a Plutus mint witness",
      );
    }
    const pendingId = pendingIds[0];
    yield* registerPendingRedeemer(config, {
      id: pendingId,
      actionId,
      source: redeemer,
      purposeKey: { tag: "mint", policyId },
    });
    yield* Mint.mintAssets(cloneAssets(assets))(
      redeemerFor(currentRedeemers, pendingId),
    );
  });

const replayWithdrawWithDelayedRedeemer = (
  actionId: number,
  pendingIds: readonly number[],
  rewardAddress: RewardAddress,
  amount: Lovelace,
  redeemer: RedeemerBuilder | BuildTxWithRedeemer,
  currentRedeemers: ReadonlyMap<number, Redeemer>,
) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    if (isRedeemerBuilder(redeemer) && redeemer.kind === "self") {
      yield* txActionError(
        "RedeemerBuilder self is only valid for collectFrom",
      );
    }
    const addressDetails = yield* validateAddressDetails(
      rewardAddress,
      config.lucidConfig,
    );
    const stakeCredential = addressDetails.stakeCredential;
    if (!stakeCredential || stakeCredential.type !== "Script") {
      yield* txActionError(
        "Delayed withdraw redeemer requires a Plutus withdrawal witness",
      );
      return;
    }
    const script = config.scripts.get(stakeCredential.hash);
    if (!script) {
      yield* Stake.withdraw(
        rewardAddress,
        amount,
      )(redeemerFor(currentRedeemers, pendingIds[0]));
      return;
    }
    if (!isPlutusScriptType(script.type)) {
      yield* txActionError(
        "Delayed withdraw redeemer requires a Plutus withdrawal witness",
      );
    }
    const pendingId = pendingIds[0];
    yield* registerPendingRedeemer(config, {
      id: pendingId,
      actionId,
      source: redeemer,
      purposeKey: { tag: "withdraw", rewardAddress },
    });
    yield* Stake.withdraw(
      rewardAddress,
      amount,
    )(redeemerFor(currentRedeemers, pendingId));
  });

export type TxBuilder = {
  readFrom: (utxos: UTxO[]) => TxBuilder;
  collectFrom: (
    utxos: UTxO[],
    redeemer?: Redeemer | RedeemerBuilder | BuildTxWithRedeemer,
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
    redeemer?: Redeemer | RedeemerBuilder | BuildTxWithRedeemer,
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
    redeemer?: Redeemer | RedeemerBuilder | BuildTxWithRedeemer,
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
  const config = makeTxBuilderConfig(lucidConfig);
  const configLayer = Layer.succeed(TxConfig, { config });
  const txBuilder: TxBuilder = {
    readFrom: (utxos: UTxO[]) => {
      const snapshot = cloneUTxOs(utxos);
      snapshot.map((utxo) => {
        if (utxo.scriptRef) {
          const scriptKeyValue = Attach.attachScript(utxo.scriptRef);
          config.scripts.set(scriptKeyValue.key, scriptKeyValue.value);
        }
      });
      recordAction(config, 0, (id, pendingIds) =>
        makeAction(
          id,
          "readFrom",
          pendingIds,
          false,
          () => () => Read.readFrom(cloneUTxOs(snapshot)),
        ),
      );
      const program = Read.readFrom(cloneUTxOs(snapshot));
      config.programs.push(program);
      return txBuilder;
    },
    collectFrom: (utxos: UTxO[], redeemer?: BuildTxRedeemer) => {
      const snapshot = cloneUTxOs(utxos);
      const redeemerSnapshot = cloneRedeemerInput(redeemer, snapshot);
      preserveSelfRedeemerBuilderInputs(redeemer, snapshot);
      const isDelayed = isDelayedRedeemer(redeemerSnapshot);
      const pendingCount = isDelayed
        ? isBuildTxWithRedeemer(redeemerSnapshot) ||
          (isRedeemerBuilder(redeemerSnapshot) &&
            redeemerSnapshot.kind === "self")
          ? snapshot.length
          : 1
        : 0;
      recordAction(config, pendingCount, (id, pendingIds) =>
        makeAction(
          id,
          "collectFrom",
          pendingIds,
          isDelayed,
          (actionId, actionPendingIds) => (currentRedeemers) =>
            isDelayed
              ? replayCollectWithDelayedRedeemer(
                  actionId,
                  actionPendingIds,
                  snapshot,
                  redeemerSnapshot,
                  currentRedeemers,
                )
              : Collect.collectFromUTxO(cloneUTxOs(snapshot))(
                  redeemerSnapshot as Redeemer | undefined,
                ),
        ),
      );
      const program = isRedeemerBuilder(redeemerSnapshot)
        ? Collect.collectFromUTxOPartial(snapshot, redeemerSnapshot)
        : isBuildTxWithRedeemer(redeemerSnapshot)
          ? undefined
          : Collect.collectFromUTxO(cloneUTxOs(snapshot))(redeemerSnapshot);
      if (program) config.programs.push(program);
      return txBuilder;
    },
    pay: {
      ToAddress: (address: string, assets: Assets) => {
        const snapshot = cloneAssets(assets);
        recordAction(config, 0, (id, pendingIds) =>
          makeAction(
            id,
            "pay.ToAddress",
            pendingIds,
            false,
            () => () => Pay.payToAddress(address, cloneAssets(snapshot)),
          ),
        );
        const program = Pay.payToAddress(address, cloneAssets(snapshot));
        config.programs.push(program);
        return txBuilder;
      },
      ToAddressWithData: (
        address: string,
        outputDatum?: OutputDatum,
        assets?: Assets,
        scriptRef?: Script | undefined,
      ) => {
        const assetsSnapshot = assets ? cloneAssets(assets) : undefined;
        const scriptRefSnapshot = scriptRef ? { ...scriptRef } : undefined;
        const outputDatumSnapshot = cloneOutputDatum(outputDatum);
        const program = Pay.ToAddressWithData(
          address,
          outputDatumSnapshot,
          assetsSnapshot,
          scriptRefSnapshot,
        );
        recordAction(config, 0, (id, pendingIds) =>
          makeAction(
            id,
            "pay.ToAddressWithData",
            pendingIds,
            false,
            () => () =>
              Pay.ToAddressWithData(
                address,
                cloneOutputDatum(outputDatumSnapshot),
                assetsSnapshot ? cloneAssets(assetsSnapshot) : undefined,
                scriptRefSnapshot ? { ...scriptRefSnapshot } : undefined,
              ),
          ),
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
        const assetsSnapshot = assets ? cloneAssets(assets) : undefined;
        const scriptRefSnapshot = scriptRef ? { ...scriptRef } : undefined;
        const outputDatumSnapshot = cloneOutputDatum(outputDatum);
        recordAction(config, 0, (id, pendingIds) =>
          makeAction(
            id,
            "pay.ToContract",
            pendingIds,
            false,
            () => () =>
              Pay.ToContract(
                address,
                cloneOutputDatum(outputDatumSnapshot),
                assetsSnapshot ? cloneAssets(assetsSnapshot) : undefined,
                scriptRefSnapshot ? { ...scriptRefSnapshot } : undefined,
              ),
          ),
        );
        const program = Pay.ToContract(
          address,
          outputDatumSnapshot,
          assetsSnapshot,
          scriptRefSnapshot,
        );
        config.programs.push(program);
        return txBuilder;
      },
    },
    addSigner: (address: Address | RewardAddress) => {
      recordAction(config, 0, (id, pendingIds) =>
        makeAction(
          id,
          "addSigner",
          pendingIds,
          false,
          () => () => Signer.addSigner(address),
        ),
      );
      const program = Signer.addSigner(address);
      config.programs.push(program);
      return txBuilder;
    },
    addSignerKey: (keyHash: PaymentKeyHash | StakeKeyHash) => {
      recordAction(config, 0, (id, pendingIds) =>
        makeAction(
          id,
          "addSignerKey",
          pendingIds,
          false,
          () => () => Signer.addSignerKey(keyHash),
        ),
      );
      const program = Signer.addSignerKey(keyHash);
      config.programs.push(program);
      return txBuilder;
    },
    registerStake: (rewardAddress: RewardAddress) => {
      recordAction(config, 0, (id, pendingIds) =>
        makeAction(
          id,
          "registerStake",
          pendingIds,
          false,
          () => () => Stake.registerStake(rewardAddress),
        ),
      );
      const program = Stake.registerStake(rewardAddress);
      config.programs.push(program);
      return txBuilder;
    },
    register: {
      Stake: (rewardAddress: RewardAddress) => {
        recordAction(config, 0, (id, pendingIds) =>
          makeAction(
            id,
            "register.Stake",
            pendingIds,
            false,
            () => () => Stake.registerStake(rewardAddress),
          ),
        );
        const program = Stake.registerStake(rewardAddress);
        config.programs.push(program);
        return txBuilder;
      },
      DRep: (
        rewardAddress: RewardAddress,
        anchor?: Anchor,
        redeemer?: string,
      ) => {
        recordAction(config, 0, (id, pendingIds) =>
          makeAction(
            id,
            "register.DRep",
            pendingIds,
            false,
            () => () =>
              Governance.registerDRep(rewardAddress, anchor, redeemer),
          ),
        );
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
      recordAction(config, 0, (id, pendingIds) =>
        makeAction(
          id,
          "deRegisterStake",
          pendingIds,
          false,
          () => () => Stake.deRegisterStake(rewardAddress, redeemer),
        ),
      );
      const program = Stake.deRegisterStake(rewardAddress, redeemer);
      config.programs.push(program);
      return txBuilder;
    },
    deregister: {
      Stake: (rewardAddress: RewardAddress, redeemer?: string) => {
        recordAction(config, 0, (id, pendingIds) =>
          makeAction(
            id,
            "deregister.Stake",
            pendingIds,
            false,
            () => () => Stake.deRegisterStake(rewardAddress, redeemer),
          ),
        );
        const program = Stake.deRegisterStake(rewardAddress, redeemer);
        config.programs.push(program);
        return txBuilder;
      },
      DRep: (rewardAddress: RewardAddress, redeemer?: string) => {
        recordAction(config, 0, (id, pendingIds) =>
          makeAction(
            id,
            "deregister.DRep",
            pendingIds,
            false,
            () => () => Governance.deregisterDRep(rewardAddress, redeemer),
          ),
        );
        const program = Governance.deregisterDRep(rewardAddress, redeemer);
        config.programs.push(program);
        return txBuilder;
      },
    },
    withdraw: (
      rewardAddress: RewardAddress,
      amount: Lovelace,
      redeemer?: BuildTxRedeemer,
    ) => {
      const redeemerSnapshot = cloneRedeemerInput(redeemer);
      const isDelayed = isDelayedRedeemer(redeemerSnapshot);
      recordAction(config, isDelayed ? 1 : 0, (id, pendingIds) =>
        makeAction(
          id,
          "withdraw",
          pendingIds,
          isDelayed,
          (actionId, actionPendingIds) => (currentRedeemers) =>
            isDelayed
              ? replayWithdrawWithDelayedRedeemer(
                  actionId,
                  actionPendingIds,
                  rewardAddress,
                  amount,
                  redeemerSnapshot,
                  currentRedeemers,
                )
              : Stake.withdraw(
                  rewardAddress,
                  amount,
                )(redeemerSnapshot as Redeemer | undefined),
        ),
      );
      const partialProgram = Stake.withdraw(rewardAddress, amount);
      //TODO: improve function workflow
      if (isBuildTxWithRedeemer(redeemerSnapshot)) {
        return txBuilder;
      }
      handleRedeemerBuilder(config, partialProgram, redeemerSnapshot);
      return txBuilder;
    },
    mintAssets: (assets: Assets, redeemer?: BuildTxRedeemer) => {
      const assetsSnapshot = cloneAssets(assets);
      const redeemerSnapshot = cloneRedeemerInput(redeemer);
      const isDelayed = isDelayedRedeemer(redeemerSnapshot);
      config.mintedAssets = addAssets(config.mintedAssets, assetsSnapshot);
      recordAction(config, isDelayed ? 1 : 0, (id, pendingIds) =>
        makeAction(
          id,
          "mintAssets",
          pendingIds,
          isDelayed,
          (actionId, actionPendingIds) => (currentRedeemers) =>
            isDelayed
              ? replayMintWithDelayedRedeemer(
                  actionId,
                  actionPendingIds,
                  assetsSnapshot,
                  redeemerSnapshot,
                  currentRedeemers,
                )
              : Mint.mintAssets(cloneAssets(assetsSnapshot))(
                  redeemerSnapshot as Redeemer | undefined,
                ),
        ),
      );
      const partialProgram = Mint.mintAssets(cloneAssets(assetsSnapshot));
      //TODO: improve function workflow
      if (isBuildTxWithRedeemer(redeemerSnapshot)) {
        return txBuilder;
      }
      handleRedeemerBuilder(config, partialProgram, redeemerSnapshot);
      return txBuilder;
    },
    validFrom: (unixTime: number) => {
      recordAction(config, 0, (id, pendingIds) =>
        makeAction(
          id,
          "validFrom",
          pendingIds,
          false,
          () => () => Interval.validFrom(unixTime),
        ),
      );
      const program = Interval.validFrom(unixTime);
      config.programs.push(program);
      return txBuilder;
    },
    validTo: (unixTime: number) => {
      recordAction(config, 0, (id, pendingIds) =>
        makeAction(
          id,
          "validTo",
          pendingIds,
          false,
          () => () => Interval.validTo(unixTime),
        ),
      );
      const program = Interval.validTo(unixTime);
      config.programs.push(program);
      return txBuilder;
    },
    delegateTo: (
      rewardAddress: RewardAddress,
      poolId: PoolId,
      redeemer?: Redeemer,
    ) => {
      recordAction(config, 0, (id, pendingIds) =>
        makeAction(
          id,
          "delegateTo",
          pendingIds,
          false,
          () => () => Pool.delegateTo(rewardAddress, poolId, redeemer),
        ),
      );
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
        recordAction(config, 0, (id, pendingIds) =>
          makeAction(
            id,
            "delegate.ToPool",
            pendingIds,
            false,
            () => () => Pool.delegateTo(rewardAddress, poolId, redeemer),
          ),
        );
        const program = Pool.delegateTo(rewardAddress, poolId, redeemer);
        config.programs.push(program);
        return txBuilder;
      },

      VoteToDRep: (
        rewardAddress: RewardAddress,
        drep: DRep,
        redeemer?: Redeemer,
      ) => {
        recordAction(config, 0, (id, pendingIds) =>
          makeAction(
            id,
            "delegate.VoteToDRep",
            pendingIds,
            false,
            () => () =>
              Governance.delegateVoteToDRep(rewardAddress, drep, redeemer),
          ),
        );
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
        recordAction(config, 0, (id, pendingIds) =>
          makeAction(
            id,
            "delegate.VoteToPoolAndDRep",
            pendingIds,
            false,
            () => () =>
              Governance.delegateVoteToPoolAndDRep(
                rewardAddress,
                poolId,
                drep,
                redeemer,
              ),
          ),
        );
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
        recordAction(config, 0, (id, pendingIds) =>
          makeAction(
            id,
            "registerAndDelegate.ToPool",
            pendingIds,
            false,
            () => () =>
              Governance.registerAndDelegateToPool(
                rewardAddress,
                poolId,
                redeemer,
              ),
          ),
        );
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
        recordAction(config, 0, (id, pendingIds) =>
          makeAction(
            id,
            "registerAndDelegate.ToDRep",
            pendingIds,
            false,
            () => () =>
              Governance.registerAndDelegateToDRep(
                rewardAddress,
                drep,
                redeemer,
              ),
          ),
        );
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
        recordAction(config, 0, (id, pendingIds) =>
          makeAction(
            id,
            "registerAndDelegate.ToPoolAndDRep",
            pendingIds,
            false,
            () => () =>
              Governance.registerAndDelegateToPoolAndDRep(
                rewardAddress,
                poolId,
                drep,
                redeemer,
              ),
          ),
        );
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
      recordAction(config, 0, (id, pendingIds) =>
        makeAction(
          id,
          "updateDRep",
          pendingIds,
          false,
          () => () => Governance.updateDRep(rewardAddress, anchor, redeemer),
        ),
      );
      const program = Governance.updateDRep(rewardAddress, anchor, redeemer);
      config.programs.push(program);
      return txBuilder;
    },
    authCommitteeHot: (
      coldAddress: RewardAddress,
      hotAddress: RewardAddress,
      redeemer?: Redeemer,
    ) => {
      recordAction(config, 0, (id, pendingIds) =>
        makeAction(
          id,
          "authCommitteeHot",
          pendingIds,
          false,
          () => () =>
            Governance.authCommitteeHot(coldAddress, hotAddress, redeemer),
        ),
      );
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
      recordAction(config, 0, (id, pendingIds) =>
        makeAction(
          id,
          "resignCommitteeHot",
          pendingIds,
          false,
          () => () =>
            Governance.resignCommitteeHot(coldAddress, anchor, redeemer),
        ),
      );
      const program = Governance.resignCommitteeHot(
        coldAddress,
        anchor,
        redeemer,
      );
      config.programs.push(program);
      return txBuilder;
    },
    attachMetadata: (label: Label, metadata: Metadata.TransactionMetadata) => {
      const metadataSnapshot = Metadata.cloneTransactionMetadata(metadata);
      recordAction(config, 0, (id, pendingIds) =>
        makeAction(
          id,
          "attachMetadata",
          pendingIds,
          false,
          () => () =>
            Metadata.attachMetadata(
              label,
              Metadata.cloneTransactionMetadata(metadataSnapshot),
            ),
        ),
      );
      const program = Metadata.attachMetadata(
        label,
        Metadata.cloneTransactionMetadata(metadataSnapshot),
      );
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
        config.scripts = new Map([...config.scripts, ...rawConfig.scripts]);
        for (const childAction of rawConfig.actions) {
          recordAction(
            config,
            childAction.pendingIds.length,
            (id, pendingIds) => childAction.cloneWithIds(id, pendingIds),
          );
        }
        config.mintedAssets = addAssets(
          config.mintedAssets,
          rawConfig.mintedAssets,
        );
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
    config: () => {
      const replayConfig = makeReplayConfig(config);
      return pipe(
        Effect.gen(function* () {
          if (hasDelayedActions(config)) {
            yield* txActionError(
              ".config() cannot replay RedeemerBuilder or BuildTxWithRedeemer actions; use complete()/chain() instead",
            );
          }
          yield* replayTxActions(config.actions);
          return replayConfig;
        }),
        Effect.provide(Layer.succeed(TxConfig, { config: replayConfig })),
        Effect.runPromise,
      );
    },
    lucidConfig: () => config.lucidConfig,
    getPrograms: () => config.programs,
  };
  return txBuilder;
}
