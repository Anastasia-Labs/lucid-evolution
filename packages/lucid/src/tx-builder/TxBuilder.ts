import { CML, makeReturn } from "../core.js";
import { LucidConfig } from "../lucid-evolution/LucidEvolution.js";
import { OutputDatum } from "./types.js";
import {
  Address,
  Anchor,
  Assets,
  BuildTxWithRedeemer,
  DRep,
  GovernanceActionId,
  GovernanceProposal,
  GovernanceVote,
  GovernanceVoter,
  Label,
  Lovelace,
  PaymentKeyHash,
  PolicyId,
  PoolId,
  PoolParams,
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
import * as GovernanceAction from "./internal/GovernanceAction.js";
import * as Metadata from "./internal/Metadata.js";
import * as Treasury from "./internal/Treasury.js";
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

type CertificateRedeemer = Redeemer | BuildTxWithRedeemer;
type GovernanceRedeemer = Redeemer | BuildTxWithRedeemer;

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
  governanceVoteWitnessKeys: string[];
  governanceProposalWitnessIndices: bigint[];
  governanceProposalCount: bigint;
  certificateIndex: bigint;
  treasuryDonation: Treasury.TreasuryDonation | undefined;
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
  governanceVoteWitnessKeys: [],
  governanceProposalWitnessIndices: [],
  governanceProposalCount: 0n,
  certificateIndex: 0n,
  treasuryDonation: undefined,
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

const clonePoolParams = (poolParams: PoolParams): PoolParams => ({
  ...poolParams,
  owners: [...poolParams.owners],
  relays: poolParams.relays.map((relay) => ({ ...relay })),
});

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

const withCertificateIndex = (
  program: Effect.Effect<void, TransactionError, TxConfig>,
) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    yield* program;
    config.certificateIndex += 1n;
  });

const replayCertificateWithDelayedRedeemer = (
  actionId: number,
  pendingIds: readonly number[],
  witnessRewardAddress: RewardAddress,
  redeemer: BuildTxWithRedeemer,
  makeProgram: (
    redeemer?: Redeemer,
  ) => Effect.Effect<void, TransactionError, TxConfig>,
  currentRedeemers: ReadonlyMap<number, Redeemer>,
) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const addressDetails = yield* validateAddressDetails(
      witnessRewardAddress,
      config.lucidConfig,
    );
    const stakeCredential = addressDetails.stakeCredential;
    if (!stakeCredential || stakeCredential.type !== "Script") {
      yield* txActionError(
        "Delayed certificate redeemer requires a Plutus certificate witness",
      );
      return;
    }
    const script = config.scripts.get(stakeCredential.hash);
    const pendingId = pendingIds[0];
    const delayedRedeemer = redeemerFor(currentRedeemers, pendingId);
    if (!script) {
      yield* makeProgram(delayedRedeemer);
      return;
    }
    if (!isPlutusScriptType(script.type)) {
      yield* txActionError(
        "Delayed certificate redeemer requires a Plutus certificate witness",
      );
    }
    yield* registerPendingRedeemer(config, {
      id: pendingId,
      actionId,
      source: redeemer,
      purposeKey: { tag: "publish", index: config.certificateIndex },
    });
    yield* withCertificateIndex(makeProgram(delayedRedeemer));
  });

const recordCertificateAction = (
  config: TxBuilderConfig,
  kind: string,
  makeProgram: (
    redeemer?: Redeemer,
  ) => Effect.Effect<void, TransactionError, TxConfig>,
  redeemer?: CertificateRedeemer,
  witnessRewardAddress?: RewardAddress,
) => {
  const redeemerSnapshot = cloneRedeemerInput(redeemer);
  const isDelayed = isBuildTxWithRedeemer(redeemerSnapshot);
  recordAction(config, isDelayed ? 1 : 0, (id, pendingIds) =>
    makeAction(
      id,
      kind,
      pendingIds,
      isDelayed,
      (actionId, actionPendingIds) => (currentRedeemers) =>
        isDelayed
          ? replayCertificateWithDelayedRedeemer(
              actionId,
              actionPendingIds,
              witnessRewardAddress!,
              redeemerSnapshot,
              makeProgram,
              currentRedeemers,
            )
          : withCertificateIndex(
              makeProgram(redeemerSnapshot as Redeemer | undefined),
            ),
    ),
  );
  if (!isDelayed) {
    config.programs.push(
      withCertificateIndex(
        makeProgram(redeemerSnapshot as Redeemer | undefined),
      ),
    );
  }
};

const replayVoteWithDelayedRedeemer = (
  actionId: number,
  pendingIds: readonly number[],
  voter: GovernanceVoter,
  redeemer: BuildTxWithRedeemer,
  makeProgram: (
    redeemer?: Redeemer,
  ) => Effect.Effect<void, TransactionError, TxConfig>,
  currentRedeemers: ReadonlyMap<number, Redeemer>,
) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    if (voter.type === "StakePool" || voter.credential.type !== "Script") {
      yield* txActionError(
        "Delayed vote redeemer requires a Plutus vote witness",
      );
      return;
    }

    const script = config.scripts.get(voter.credential.hash);
    const pendingId = pendingIds[0];
    const delayedRedeemer = redeemerFor(currentRedeemers, pendingId);
    if (!script) {
      yield* makeProgram(delayedRedeemer);
      return;
    }
    if (script.type === "Native") {
      yield* makeProgram(undefined);
      return;
    }
    yield* registerPendingRedeemer(config, {
      id: pendingId,
      actionId,
      source: redeemer,
      purposeKey: {
        tag: "vote",
        voterKey: GovernanceAction.governanceVoterKey(voter),
      },
    });
    yield* makeProgram(delayedRedeemer);
  });

const recordVoteAction = (
  config: TxBuilderConfig,
  voter: GovernanceVoter,
  actionId: GovernanceActionId,
  voteChoice: GovernanceVote,
  anchor?: Anchor,
  redeemer?: GovernanceRedeemer,
) => {
  const voterSnapshot = GovernanceAction.cloneGovernanceVoter(voter);
  const actionIdSnapshot = {
    txHash: actionId.txHash,
    index: actionId.index,
  };
  const anchorSnapshot = anchor ? { ...anchor } : undefined;
  const redeemerSnapshot = cloneRedeemerInput(redeemer);
  const isDelayed = isBuildTxWithRedeemer(redeemerSnapshot);
  const makeProgram = (resolvedRedeemer?: Redeemer) =>
    GovernanceAction.vote(
      voterSnapshot,
      actionIdSnapshot,
      voteChoice,
      anchorSnapshot,
      resolvedRedeemer,
    );

  recordAction(config, isDelayed ? 1 : 0, (id, pendingIds) =>
    makeAction(
      id,
      "vote",
      pendingIds,
      isDelayed,
      (replayActionId, actionPendingIds) => (currentRedeemers) =>
        isDelayed
          ? replayVoteWithDelayedRedeemer(
              replayActionId,
              actionPendingIds,
              voterSnapshot,
              redeemerSnapshot,
              makeProgram,
              currentRedeemers,
            )
          : makeProgram(redeemerSnapshot as Redeemer | undefined),
    ),
  );

  if (!isDelayed) {
    config.programs.push(makeProgram(redeemerSnapshot as Redeemer | undefined));
  }
};

const replayProposalWithDelayedRedeemer = (
  actionId: number,
  pendingIds: readonly number[],
  proposal: GovernanceProposal,
  redeemer: BuildTxWithRedeemer,
  makeProgram: (
    redeemer?: Redeemer,
  ) => Effect.Effect<void, TransactionError, TxConfig>,
  currentRedeemers: ReadonlyMap<number, Redeemer>,
) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const govAction = yield* GovernanceAction.toCMLGovernanceAction(
      proposal.action,
      config,
    );
    const scriptHash = govAction.script_hash()?.to_hex();
    if (!scriptHash) {
      yield* txActionError(
        "Delayed proposal redeemer requires a Plutus proposal witness",
      );
      return;
    }

    const script = config.scripts.get(scriptHash);
    const pendingId = pendingIds[0];
    const delayedRedeemer = redeemerFor(currentRedeemers, pendingId);
    if (!script) {
      yield* makeProgram(delayedRedeemer);
      return;
    }
    if (script.type === "Native") {
      yield* makeProgram(undefined);
      return;
    }
    yield* registerPendingRedeemer(config, {
      id: pendingId,
      actionId,
      source: redeemer,
      purposeKey: {
        tag: "propose",
        proposalKey: yield* GovernanceAction.governanceProposalKey(
          proposal,
          config,
        ),
      },
    });
    yield* makeProgram(delayedRedeemer);
  });

const recordProposalAction = (
  config: TxBuilderConfig,
  proposal: GovernanceProposal,
  redeemer?: GovernanceRedeemer,
) => {
  const proposalSnapshot = GovernanceAction.cloneGovernanceProposal(proposal);
  const redeemerSnapshot = cloneRedeemerInput(redeemer);
  const isDelayed = isBuildTxWithRedeemer(redeemerSnapshot);
  const makeProgram = (resolvedRedeemer?: Redeemer) =>
    GovernanceAction.propose(proposalSnapshot, resolvedRedeemer);

  recordAction(config, isDelayed ? 1 : 0, (id, pendingIds) =>
    makeAction(
      id,
      "propose",
      pendingIds,
      isDelayed,
      (replayActionId, actionPendingIds) => (currentRedeemers) =>
        isDelayed
          ? replayProposalWithDelayedRedeemer(
              replayActionId,
              actionPendingIds,
              proposalSnapshot,
              redeemerSnapshot,
              makeProgram,
              currentRedeemers,
            )
          : makeProgram(redeemerSnapshot as Redeemer | undefined),
    ),
  );

  if (!isDelayed) {
    config.programs.push(makeProgram(redeemerSnapshot as Redeemer | undefined));
  }
};

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
  registerStake: (
    rewardAddress: RewardAddress,
    redeemer?: CertificateRedeemer,
  ) => TxBuilder;
  /**
   * NOTE: Deprecate in future version
   */
  deRegisterStake: (
    rewardAddress: RewardAddress,
    redeemer?: CertificateRedeemer,
  ) => TxBuilder;
  withdraw: (
    rewardAddress: RewardAddress,
    amount: Lovelace,
    redeemer?: Redeemer | RedeemerBuilder | BuildTxWithRedeemer,
  ) => TxBuilder;
  register: {
    Stake: (
      rewardAddress: RewardAddress,
      redeemer?: CertificateRedeemer,
    ) => TxBuilder;
    DRep: (
      rewardAddress: RewardAddress,
      anchor?: Anchor,
      redeemer?: CertificateRedeemer,
    ) => TxBuilder;
    Pool: (poolParams: PoolParams) => TxBuilder;
  };
  deregister: {
    Stake: (
      rewardAddress: RewardAddress,
      redeemer?: CertificateRedeemer,
    ) => TxBuilder;
    DRep: (
      rewardAddress: RewardAddress,
      redeemer?: CertificateRedeemer,
    ) => TxBuilder;
  };
  retire: {
    Pool: (poolId: PoolId, epoch: number | bigint) => TxBuilder;
  };
  mintAssets: (
    assets: Assets,
    redeemer?: Redeemer | RedeemerBuilder | BuildTxWithRedeemer,
  ) => TxBuilder;
  donateToTreasury: (
    donation: Lovelace,
    currentTreasuryValue?: Lovelace,
  ) => TxBuilder;
  validFrom: (unixTime: number) => TxBuilder;
  validTo: (unixTime: number) => TxBuilder;
  /**
   * NOTE: Deprecate in future version
   */
  delegateTo: (
    rewardAddress: RewardAddress,
    poolId: PoolId,
    redeemer?: CertificateRedeemer,
  ) => TxBuilder;
  delegate: {
    ToPool: (
      rewardAddress: RewardAddress,
      poolId: PoolId,
      redeemer?: CertificateRedeemer,
    ) => TxBuilder;
    VoteToDRep: (
      rewardAddress: RewardAddress,
      drep: DRep,
      redeemer?: CertificateRedeemer,
    ) => TxBuilder;
    VoteToPoolAndDRep: (
      rewardAddress: RewardAddress,
      poolId: PoolId,
      drep: DRep,
      redeemer?: CertificateRedeemer,
    ) => TxBuilder;
  };
  registerAndDelegate: {
    ToPool: (
      rewardAddress: RewardAddress,
      poolId: PoolId,
      redeemer?: CertificateRedeemer,
    ) => TxBuilder;
    ToDRep: (
      rewardAddress: RewardAddress,
      drep: DRep,
      redeemer?: CertificateRedeemer,
    ) => TxBuilder;
    ToPoolAndDRep: (
      rewardAddress: RewardAddress,
      poolId: PoolId,
      drep: DRep,
      redeemer?: CertificateRedeemer,
    ) => TxBuilder;
  };
  updateDRep: (
    rewardAddress: RewardAddress,
    anchor?: Anchor,
    redeemer?: CertificateRedeemer,
  ) => TxBuilder;
  vote: (
    voter: GovernanceVoter,
    actionId: GovernanceActionId,
    vote: GovernanceVote,
    anchor?: Anchor,
    redeemer?: GovernanceRedeemer,
  ) => TxBuilder;
  propose: (
    proposal: GovernanceProposal,
    redeemer?: GovernanceRedeemer,
  ) => TxBuilder;
  authCommitteeHot: (
    coldAddress: RewardAddress,
    hotAddress: RewardAddress,
    redeemer?: CertificateRedeemer,
  ) => TxBuilder;
  resignCommitteeHot: (
    coldAddress: RewardAddress,
    anchor?: Anchor,
    redeemer?: CertificateRedeemer,
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
    registerStake: (
      rewardAddress: RewardAddress,
      redeemer?: CertificateRedeemer,
    ) => {
      recordCertificateAction(
        config,
        "registerStake",
        (resolvedRedeemer) =>
          Stake.registerStake(rewardAddress, resolvedRedeemer),
        redeemer,
        rewardAddress,
      );
      return txBuilder;
    },
    register: {
      Stake: (rewardAddress: RewardAddress, redeemer?: CertificateRedeemer) => {
        recordCertificateAction(
          config,
          "register.Stake",
          (resolvedRedeemer) =>
            Stake.registerStake(rewardAddress, resolvedRedeemer),
          redeemer,
          rewardAddress,
        );
        return txBuilder;
      },
      DRep: (
        rewardAddress: RewardAddress,
        anchor?: Anchor,
        redeemer?: CertificateRedeemer,
      ) => {
        recordCertificateAction(
          config,
          "register.DRep",
          (resolvedRedeemer) =>
            Governance.registerDRep(rewardAddress, anchor, resolvedRedeemer),
          redeemer,
          rewardAddress,
        );
        return txBuilder;
      },
      Pool: (poolParams: PoolParams) => {
        const snapshot = clonePoolParams(poolParams);
        recordAction(config, 0, (id, pendingIds) =>
          makeAction(
            id,
            "register.Pool",
            pendingIds,
            false,
            () => () =>
              withCertificateIndex(
                Pool.registerPool(clonePoolParams(snapshot)),
              ),
          ),
        );
        config.programs.push(
          withCertificateIndex(Pool.registerPool(clonePoolParams(snapshot))),
        );
        return txBuilder;
      },
    },
    deRegisterStake: (
      rewardAddress: RewardAddress,
      redeemer?: CertificateRedeemer,
    ) => {
      recordCertificateAction(
        config,
        "deRegisterStake",
        (resolvedRedeemer) =>
          Stake.deRegisterStake(rewardAddress, resolvedRedeemer),
        redeemer,
        rewardAddress,
      );
      return txBuilder;
    },
    deregister: {
      Stake: (rewardAddress: RewardAddress, redeemer?: CertificateRedeemer) => {
        recordCertificateAction(
          config,
          "deregister.Stake",
          (resolvedRedeemer) =>
            Stake.deRegisterStake(rewardAddress, resolvedRedeemer),
          redeemer,
          rewardAddress,
        );
        return txBuilder;
      },
      DRep: (rewardAddress: RewardAddress, redeemer?: CertificateRedeemer) => {
        recordCertificateAction(
          config,
          "deregister.DRep",
          (resolvedRedeemer) =>
            Governance.deregisterDRep(rewardAddress, resolvedRedeemer),
          redeemer,
          rewardAddress,
        );
        return txBuilder;
      },
    },
    retire: {
      Pool: (poolId: PoolId, epoch: number | bigint) => {
        const epochSnapshot = BigInt(epoch);
        recordAction(config, 0, (id, pendingIds) =>
          makeAction(
            id,
            "retire.Pool",
            pendingIds,
            false,
            () => () =>
              withCertificateIndex(Pool.retirePool(poolId, epochSnapshot)),
          ),
        );
        config.programs.push(
          withCertificateIndex(Pool.retirePool(poolId, epochSnapshot)),
        );
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
    donateToTreasury: (donation: Lovelace, currentTreasuryValue?: Lovelace) => {
      const donationSnapshot = BigInt(donation);
      const currentTreasuryValueSnapshot =
        currentTreasuryValue === undefined
          ? undefined
          : BigInt(currentTreasuryValue);
      recordAction(config, 0, (id, pendingIds) =>
        makeAction(
          id,
          "donateToTreasury",
          pendingIds,
          false,
          () => () =>
            Treasury.donateToTreasury(
              donationSnapshot,
              currentTreasuryValueSnapshot,
            ),
        ),
      );
      config.programs.push(
        Treasury.donateToTreasury(
          donationSnapshot,
          currentTreasuryValueSnapshot,
        ),
      );
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
      redeemer?: CertificateRedeemer,
    ) => {
      recordCertificateAction(
        config,
        "delegateTo",
        (resolvedRedeemer) =>
          Pool.delegateTo(rewardAddress, poolId, resolvedRedeemer),
        redeemer,
        rewardAddress,
      );
      return txBuilder;
    },
    delegate: {
      ToPool: (
        rewardAddress: RewardAddress,
        poolId: PoolId,
        redeemer?: CertificateRedeemer,
      ) => {
        recordCertificateAction(
          config,
          "delegate.ToPool",
          (resolvedRedeemer) =>
            Pool.delegateTo(rewardAddress, poolId, resolvedRedeemer),
          redeemer,
          rewardAddress,
        );
        return txBuilder;
      },

      VoteToDRep: (
        rewardAddress: RewardAddress,
        drep: DRep,
        redeemer?: CertificateRedeemer,
      ) => {
        recordCertificateAction(
          config,
          "delegate.VoteToDRep",
          (resolvedRedeemer) =>
            Governance.delegateVoteToDRep(
              rewardAddress,
              drep,
              resolvedRedeemer,
            ),
          redeemer,
          rewardAddress,
        );
        return txBuilder;
      },

      VoteToPoolAndDRep: (
        rewardAddress: RewardAddress,
        poolId: PoolId,
        drep: DRep,
        redeemer?: CertificateRedeemer,
      ) => {
        recordCertificateAction(
          config,
          "delegate.VoteToPoolAndDRep",
          (resolvedRedeemer) =>
            Governance.delegateVoteToPoolAndDRep(
              rewardAddress,
              poolId,
              drep,
              resolvedRedeemer,
            ),
          redeemer,
          rewardAddress,
        );
        return txBuilder;
      },
    },
    registerAndDelegate: {
      ToPool: (
        rewardAddress: RewardAddress,
        poolId: PoolId,
        redeemer?: CertificateRedeemer,
      ) => {
        recordCertificateAction(
          config,
          "registerAndDelegate.ToPool",
          (resolvedRedeemer) =>
            Governance.registerAndDelegateToPool(
              rewardAddress,
              poolId,
              resolvedRedeemer,
            ),
          redeemer,
          rewardAddress,
        );
        return txBuilder;
      },
      ToDRep: (
        rewardAddress: RewardAddress,
        drep: DRep,
        redeemer?: CertificateRedeemer,
      ) => {
        recordCertificateAction(
          config,
          "registerAndDelegate.ToDRep",
          (resolvedRedeemer) =>
            Governance.registerAndDelegateToDRep(
              rewardAddress,
              drep,
              resolvedRedeemer,
            ),
          redeemer,
          rewardAddress,
        );
        return txBuilder;
      },
      ToPoolAndDRep: (
        rewardAddress: RewardAddress,
        poolId: PoolId,
        drep: DRep,
        redeemer?: CertificateRedeemer,
      ) => {
        recordCertificateAction(
          config,
          "registerAndDelegate.ToPoolAndDRep",
          (resolvedRedeemer) =>
            Governance.registerAndDelegateToPoolAndDRep(
              rewardAddress,
              poolId,
              drep,
              resolvedRedeemer,
            ),
          redeemer,
          rewardAddress,
        );
        return txBuilder;
      },
    },
    updateDRep: (
      rewardAddress: RewardAddress,
      anchor?: Anchor,
      redeemer?: CertificateRedeemer,
    ) => {
      recordCertificateAction(
        config,
        "updateDRep",
        (resolvedRedeemer) =>
          Governance.updateDRep(rewardAddress, anchor, resolvedRedeemer),
        redeemer,
        rewardAddress,
      );
      return txBuilder;
    },
    vote: (
      voter: GovernanceVoter,
      actionId: GovernanceActionId,
      vote: GovernanceVote,
      anchor?: Anchor,
      redeemer?: GovernanceRedeemer,
    ) => {
      recordVoteAction(config, voter, actionId, vote, anchor, redeemer);
      return txBuilder;
    },
    propose: (proposal: GovernanceProposal, redeemer?: GovernanceRedeemer) => {
      recordProposalAction(config, proposal, redeemer);
      return txBuilder;
    },
    authCommitteeHot: (
      coldAddress: RewardAddress,
      hotAddress: RewardAddress,
      redeemer?: CertificateRedeemer,
    ) => {
      recordCertificateAction(
        config,
        "authCommitteeHot",
        (resolvedRedeemer) =>
          Governance.authCommitteeHot(
            coldAddress,
            hotAddress,
            resolvedRedeemer,
          ),
        redeemer,
        coldAddress,
      );
      return txBuilder;
    },
    resignCommitteeHot: (
      coldAddress: RewardAddress,
      anchor?: Anchor,
      redeemer?: CertificateRedeemer,
    ) => {
      recordCertificateAction(
        config,
        "resignCommitteeHot",
        (resolvedRedeemer) =>
          Governance.resignCommitteeHot(coldAddress, anchor, resolvedRedeemer),
        redeemer,
        coldAddress,
      );
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
