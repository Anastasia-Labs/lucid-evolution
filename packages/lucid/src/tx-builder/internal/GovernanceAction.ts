import {
  Anchor,
  Credential,
  GovernanceAction,
  GovernanceActionId,
  GovernanceProposal,
  GovernanceVoter,
  GovernanceVote,
  Redeemer,
} from "@lucid-evolution/core-types";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { Effect, pipe } from "effect";
import {
  ERROR_MESSAGE,
  TxBuilderError,
  TransactionError,
} from "../../Errors.js";
import { TxConfig } from "./Service.js";
import { toPartial, toV3, validateAddressDetails } from "./TxUtils.js";
import type { TxBuilderConfig } from "../TxBuilder.js";

export const governanceActionError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ GovernanceAction: ${cause} }` });

const toBigInt = (value: number | bigint): bigint => BigInt(value);

const cloneAnchor = (anchor: Anchor): Anchor => ({ ...anchor });

const cloneCredential = (credential: Credential): Credential => ({
  ...credential,
});

const cloneGovernanceActionId = (
  actionId: GovernanceActionId | null | undefined,
): GovernanceActionId | null | undefined =>
  actionId === undefined || actionId === null
    ? actionId
    : { txHash: actionId.txHash, index: actionId.index };

export const cloneGovernanceVoter = (
  voter: GovernanceVoter,
): GovernanceVoter => {
  switch (voter.type) {
    case "DRep":
    case "ConstitutionalCommittee":
      return {
        type: voter.type,
        credential: cloneCredential(voter.credential),
      };
    case "StakePool":
      return "poolId" in voter
        ? { type: "StakePool", poolId: voter.poolId }
        : { type: "StakePool", hash: voter.hash };
  }
};

export const cloneGovernanceAction = (
  action: GovernanceAction,
): GovernanceAction => {
  switch (action.type) {
    case "ParameterChange":
      return {
        type: "ParameterChange",
        actionId: cloneGovernanceActionId(action.actionId),
        protocolParamUpdate:
          typeof action.protocolParamUpdate === "string"
            ? action.protocolParamUpdate
            : action.protocolParamUpdate.to_cbor_hex(),
        policyHash: action.policyHash,
      };
    case "HardForkInitiation":
      return {
        type: "HardForkInitiation",
        actionId: cloneGovernanceActionId(action.actionId),
        protocolVersion: { ...action.protocolVersion },
      };
    case "TreasuryWithdrawals":
      return {
        type: "TreasuryWithdrawals",
        withdrawals: action.withdrawals.map((withdrawal) => ({
          ...withdrawal,
        })),
        policyHash: action.policyHash,
      };
    case "NoConfidence":
      return {
        type: "NoConfidence",
        actionId: cloneGovernanceActionId(action.actionId),
      };
    case "UpdateCommittee":
      return {
        type: "UpdateCommittee",
        actionId: cloneGovernanceActionId(action.actionId),
        remove: action.remove.map(cloneCredential),
        add: action.add.map((member) => ({
          credential: cloneCredential(member.credential),
          epoch: member.epoch,
        })),
        threshold: { ...action.threshold },
      };
    case "NewConstitution":
      return {
        type: "NewConstitution",
        actionId: cloneGovernanceActionId(action.actionId),
        constitution: {
          anchor: cloneAnchor(action.constitution.anchor),
          scriptHash: action.constitution.scriptHash,
        },
      };
    case "InfoAction":
      return { type: "InfoAction" };
    case "Cbor":
      return { type: "Cbor", cbor: action.cbor };
    case "CML":
      return { type: "Cbor", cbor: action.action.to_cbor_hex() };
  }
};

export const cloneGovernanceProposal = (
  proposal: GovernanceProposal,
): GovernanceProposal => ({
  action: cloneGovernanceAction(proposal.action),
  returnAddress: proposal.returnAddress,
  anchor: cloneAnchor(proposal.anchor),
  deposit: proposal.deposit,
});

export const toCMLAnchor = (anchor: Anchor): CML.Anchor =>
  CML.Anchor.new(
    CML.Url.from_json(JSON.stringify(anchor.url)),
    CML.AnchorDocHash.from_hex(anchor.dataHash),
  );

const toCMLCredential = (credential: Credential): CML.Credential => {
  switch (credential.type) {
    case "Key":
      return CML.Credential.new_pub_key(
        CML.Ed25519KeyHash.from_hex(credential.hash),
      );
    case "Script":
      return CML.Credential.new_script(
        CML.ScriptHash.from_hex(credential.hash),
      );
  }
};

const toCMLScriptHash = (
  scriptHash: string | null | undefined,
): CML.ScriptHash | undefined =>
  scriptHash === undefined || scriptHash === null
    ? undefined
    : CML.ScriptHash.from_hex(scriptHash);

const toCMLGovernanceActionId = (
  actionId: GovernanceActionId | null | undefined,
): CML.GovActionId | undefined =>
  actionId === undefined || actionId === null
    ? undefined
    : CML.GovActionId.new(
        CML.TransactionHash.from_hex(actionId.txHash),
        toBigInt(actionId.index),
      );

const toCMLProtocolParamUpdate = (
  update: CML.ProtocolParamUpdate | string,
): CML.ProtocolParamUpdate =>
  typeof update === "string"
    ? CML.ProtocolParamUpdate.from_cbor_hex(update)
    : update;

const toCMLRewardAddress = (
  rewardAddress: string,
  config: TxBuilderConfig,
): Effect.Effect<CML.RewardAddress, TxBuilderError> =>
  Effect.gen(function* () {
    const addressDetails = yield* pipe(
      validateAddressDetails(rewardAddress, config.lucidConfig),
      Effect.andThen((details) =>
        details.type !== "Reward"
          ? governanceActionError(ERROR_MESSAGE.MISSING_REWARD_TYPE)
          : Effect.succeed(details),
      ),
    );
    const cmlRewardAddress = CML.RewardAddress.from_address(
      CML.Address.from_bech32(addressDetails.address.bech32),
    );
    if (!cmlRewardAddress) {
      yield* governanceActionError(ERROR_MESSAGE.MISSING_REWARD_TYPE);
    }
    return cmlRewardAddress!;
  });

export const toCMLGovernanceAction = (
  action: GovernanceAction,
  config: TxBuilderConfig,
): Effect.Effect<CML.GovAction, TxBuilderError> =>
  Effect.gen(function* () {
    switch (action.type) {
      case "ParameterChange":
        return CML.GovAction.new_parameter_change_action(
          toCMLGovernanceActionId(action.actionId),
          toCMLProtocolParamUpdate(action.protocolParamUpdate),
          toCMLScriptHash(action.policyHash),
        );
      case "HardForkInitiation":
        return CML.GovAction.new_hard_fork_initiation_action(
          toCMLGovernanceActionId(action.actionId),
          CML.ProtocolVersion.new(
            toBigInt(action.protocolVersion.major),
            toBigInt(action.protocolVersion.minor),
          ),
        );
      case "TreasuryWithdrawals": {
        const withdrawals = CML.MapRewardAccountToCoin.new();
        const seen = new Set<string>();
        for (const withdrawal of action.withdrawals) {
          const rewardAddress = yield* toCMLRewardAddress(
            withdrawal.rewardAddress,
            config,
          );
          const rewardAddressKey = rewardAddress
            .to_address()
            .to_bech32(undefined);
          if (seen.has(rewardAddressKey)) {
            yield* governanceActionError(
              `Duplicate treasury withdrawal address: ${withdrawal.rewardAddress}`,
            );
          }
          seen.add(rewardAddressKey);
          withdrawals.insert(rewardAddress, withdrawal.amount);
        }
        return CML.GovAction.new_treasury_withdrawals_action(
          withdrawals,
          toCMLScriptHash(action.policyHash),
        );
      }
      case "NoConfidence":
        return CML.GovAction.new_no_confidence(
          toCMLGovernanceActionId(action.actionId),
        );
      case "UpdateCommittee": {
        const remove = CML.CommitteeColdCredentialList.new();
        for (const credential of action.remove) {
          remove.add(toCMLCredential(credential));
        }
        const add = CML.MapCommitteeColdCredentialToEpoch.new();
        for (const member of action.add) {
          add.insert(
            toCMLCredential(member.credential),
            toBigInt(member.epoch),
          );
        }
        return CML.GovAction.new_update_committee(
          toCMLGovernanceActionId(action.actionId),
          remove,
          add,
          CML.UnitInterval.new(
            toBigInt(action.threshold.numerator),
            toBigInt(action.threshold.denominator),
          ),
        );
      }
      case "NewConstitution":
        return CML.GovAction.new_new_constitution(
          toCMLGovernanceActionId(action.actionId),
          CML.Constitution.new(
            toCMLAnchor(action.constitution.anchor),
            toCMLScriptHash(action.constitution.scriptHash),
          ),
        );
      case "InfoAction":
        return CML.GovAction.new_info_action();
      case "Cbor":
        return CML.GovAction.from_cbor_hex(action.cbor);
      case "CML":
        return action.action;
    }
  });

export const toCMLVoter = (voter: GovernanceVoter): CML.Voter => {
  switch (voter.type) {
    case "DRep":
      return voter.credential.type === "Key"
        ? CML.Voter.new_d_rep_key_hash(
            CML.Ed25519KeyHash.from_hex(voter.credential.hash),
          )
        : CML.Voter.new_d_rep_script_hash(
            CML.ScriptHash.from_hex(voter.credential.hash),
          );
    case "ConstitutionalCommittee":
      return voter.credential.type === "Key"
        ? CML.Voter.new_constitutional_committee_hot_key_hash(
            CML.Ed25519KeyHash.from_hex(voter.credential.hash),
          )
        : CML.Voter.new_constitutional_committee_hot_script_hash(
            CML.ScriptHash.from_hex(voter.credential.hash),
          );
    case "StakePool":
      return CML.Voter.new_staking_pool_key_hash(
        "poolId" in voter
          ? CML.Ed25519KeyHash.from_bech32(voter.poolId)
          : CML.Ed25519KeyHash.from_hex(voter.hash),
      );
  }
};

export const governanceVoterKey = (voter: GovernanceVoter): string =>
  toCMLVoter(voter).to_canonical_cbor_hex();

export const toCMLProposalProcedure = (
  proposal: GovernanceProposal,
  config: TxBuilderConfig,
): Effect.Effect<CML.ProposalProcedure, TxBuilderError> =>
  Effect.gen(function* () {
    return CML.ProposalProcedure.new(
      proposal.deposit ??
        config.lucidConfig.protocolParameters.govActionDeposit,
      yield* toCMLRewardAddress(proposal.returnAddress, config),
      yield* toCMLGovernanceAction(proposal.action, config),
      toCMLAnchor(proposal.anchor),
    );
  });

export const governanceProposalKey = (
  proposal: GovernanceProposal,
  config: TxBuilderConfig,
): Effect.Effect<string, TxBuilderError> =>
  Effect.gen(function* () {
    const proposalProcedure = yield* toCMLProposalProcedure(proposal, config);
    return proposalProcedure.to_canonical_cbor_hex();
  });

const toCMLVote = (vote: GovernanceVote): CML.Vote => {
  switch (vote) {
    case "No":
      return CML.Vote.No;
    case "Yes":
      return CML.Vote.Yes;
    case "Abstain":
      return CML.Vote.Abstain;
  }
};

const voterCredential = (voter: GovernanceVoter): Credential | undefined =>
  voter.type === "StakePool" ? undefined : voter.credential;

export const vote = (
  voter: GovernanceVoter,
  actionId: GovernanceActionId,
  voteChoice: GovernanceVote,
  anchor?: Anchor,
  redeemer?: Redeemer,
): Effect.Effect<void, TransactionError, TxConfig> =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const cmlVoter = toCMLVoter(voter);
    const cmlActionId = toCMLGovernanceActionId(actionId)!;
    const procedure = CML.VotingProcedure.new(
      toCMLVote(voteChoice),
      anchor ? toCMLAnchor(anchor) : undefined,
    );
    let builder = CML.VoteBuilder.new();
    const credential = voterCredential(voter);

    if (!credential || credential.type === "Key") {
      builder = builder.with_vote(cmlVoter, cmlActionId, procedure);
    } else {
      const script = yield* pipe(
        Effect.fromNullable(config.scripts.get(credential.hash)),
        Effect.orElseFail(() =>
          governanceActionError(ERROR_MESSAGE.MISSING_SCRIPT(credential.hash)),
        ),
      );

      if (script.type === "Native") {
        builder = builder.with_native_script_vote(
          cmlVoter,
          cmlActionId,
          procedure,
          CML.NativeScript.from_cbor_hex(script.script),
          CML.NativeScriptWitnessInfo.assume_signature_count(),
        );
      } else {
        if (script.type !== "PlutusV3") {
          yield* governanceActionError(
            "Governance voting scripts must use PlutusV3",
          );
        }
        const voterKey = cmlVoter.to_canonical_cbor_hex();
        if (config.governanceVoteWitnessKeys.includes(voterKey)) {
          yield* governanceActionError(
            "Multiple Plutus voting procedures for the same voter are not supported in one transaction",
          );
        }
        const red = yield* pipe(
          Effect.fromNullable(redeemer),
          Effect.orElseFail(() =>
            governanceActionError(ERROR_MESSAGE.MISSING_REDEEMER),
          ),
        );
        const partial = toPartial(toV3(script.script), red);
        builder = builder.with_plutus_vote(
          cmlVoter,
          cmlActionId,
          procedure,
          partial,
          CML.Ed25519KeyHashList.new(),
          CML.PlutusData.from_cbor_hex(red),
        );
      }
    }

    yield* Effect.try({
      try: () => config.txBuilder.add_vote(builder.build()),
      catch: governanceActionError,
    });
    if (credential?.type === "Script") {
      config.governanceVoteWitnessKeys.push(cmlVoter.to_canonical_cbor_hex());
    }
  });

export const propose = (
  proposal: GovernanceProposal,
  redeemer?: Redeemer,
): Effect.Effect<void, TransactionError, TxConfig> =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const proposalProcedure = yield* toCMLProposalProcedure(proposal, config);
    const proposalIndex = config.governanceProposalCount;
    const govAction = proposalProcedure.gov_action();
    let builder = CML.ProposalBuilder.new();
    const scriptHash = govAction.script_hash()?.to_hex();

    if (!scriptHash) {
      builder = builder.with_proposal(proposalProcedure);
    } else {
      const script = yield* pipe(
        Effect.fromNullable(config.scripts.get(scriptHash)),
        Effect.orElseFail(() =>
          governanceActionError(ERROR_MESSAGE.MISSING_SCRIPT(scriptHash)),
        ),
      );

      if (script.type === "Native") {
        builder = builder.with_native_script_proposal(
          proposalProcedure,
          CML.NativeScript.from_cbor_hex(script.script),
          CML.NativeScriptWitnessInfo.assume_signature_count(),
        );
      } else {
        if (script.type !== "PlutusV3") {
          yield* governanceActionError(
            "Governance proposal scripts must use PlutusV3",
          );
        }
        const red = yield* pipe(
          Effect.fromNullable(redeemer),
          Effect.orElseFail(() =>
            governanceActionError(ERROR_MESSAGE.MISSING_REDEEMER),
          ),
        );
        const partial = toPartial(toV3(script.script), red);
        builder = builder.with_plutus_proposal(
          proposalProcedure,
          partial,
          CML.Ed25519KeyHashList.new(),
          CML.PlutusData.from_cbor_hex(red),
        );
      }
    }

    yield* Effect.try({
      try: () => config.txBuilder.add_proposal(builder.build()),
      catch: governanceActionError,
    });
    config.governanceProposalCount += 1n;
    if (scriptHash) {
      config.governanceProposalWitnessIndices.push(proposalIndex);
    }
  });
