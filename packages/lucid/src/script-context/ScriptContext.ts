import {
  Data,
  type Data as PlutusData,
  slotToBeginUnixTime,
} from "@lucid-evolution/plutus";
import { Effect } from "effect";
import type { Credential, SlotConfig, UTxO } from "@lucid-evolution/core-types";
import {
  fromScriptRef,
  getAddressDetails,
  utxoToTransactionOutput,
  validatorToScriptHash,
} from "@lucid-evolution/utils";
import { CML } from "../core.js";
import {
  buildCanonicalRedeemerInfo,
  canonicalRedeemerEntries,
  type CanonicalRedeemerEntry,
  type CanonicalRedeemerInfo,
} from "../tx-builder/internal/RedeemerContext.js";
import { ScriptPurposeData } from "./Schema.js";
import type {
  AddressData,
  ChangedParametersData,
  ConstitutionData,
  CredentialData,
  DRepData,
  DelegateeData,
  GovernanceActionData,
  GovernanceActionIdData,
  MintValueData,
  POSIXTimeRangeData,
  ProposalProcedureData,
  ProtocolVersionData,
  ScriptContextData,
  ScriptInfoData,
  StakingCredentialData,
  TxCertData,
  TxInInfoData,
  TxInfoData,
  TxOutData,
  TxOutRefData,
  ValueData,
  VoteData,
  VoterData,
} from "./Schema.js";

export type ScriptContextOptions = {
  resolvedInputs?: ReadonlyArray<UTxO>;
  slotConfig?: SlotConfig;
};

export type ScriptContext = ScriptContextData;
export type ScriptPurpose = ScriptPurposeData;

type AssetMap =
  | CML.MultiAsset
  | CML.Mint
  | {
      keys(): CML.PolicyIdList;
      get_assets(
        key: CML.ScriptHash,
      ): CML.MapAssetNameToCoin | CML.MapAssetNameToNonZeroInt64 | undefined;
    };

type PlutusDataValue = PlutusData;

const slotToPosixTime = (
  slot: bigint,
  slotConfig: SlotConfig | undefined,
): bigint => {
  if (!slotConfig || slotConfig.slotLength === 0) {
    throw new Error(
      "ScriptContext translation requires a valid slotConfig to translate the transaction validity interval.",
    );
  }
  return BigInt(slotToBeginUnixTime(Number(slot), slotConfig));
};

const toArray = <T>(
  list: { len(): number; get(index: number): T } | undefined,
) => {
  const result: T[] = [];
  if (!list) return result;
  for (let index = 0; index < list.len(); index++) {
    result.push(list.get(index));
  }
  return result;
};

const byteLength = (hex: string): number => hex.length / 2;

const compareByteArrayHex = (left: string, right: string): number => {
  const leftLength = byteLength(left);
  const rightLength = byteLength(right);
  const sharedLength = Math.min(leftLength, rightLength);
  for (let index = 0; index < sharedLength; index++) {
    const leftByte = parseInt(left.slice(index * 2, index * 2 + 2), 16);
    const rightByte = parseInt(right.slice(index * 2, index * 2 + 2), 16);
    if (leftByte !== rightByte) return leftByte - rightByte;
  }
  return leftLength - rightLength;
};

const compareBigInt = (left: bigint, right: bigint): number =>
  left < right ? -1 : left > right ? 1 : 0;

const sortedMap = <K, V>(
  entries: ReadonlyArray<readonly [K, V]>,
  compareKey: (left: K, right: K) => number,
): Map<K, V> =>
  new Map([...entries].sort(([left], [right]) => compareKey(left, right)));

const datumFromPlutusData = (data: CML.PlutusData): PlutusDataValue =>
  Data.from(data.to_cbor_hex());

const txOutRefFromCml = (input: CML.TransactionInput): TxOutRefData => ({
  txOutRefId: input.transaction_id().to_hex(),
  txOutRefIdx: input.index(),
});

const compareTxOutRef = (left: TxOutRefData, right: TxOutRefData): number =>
  compareByteArrayHex(left.txOutRefId, right.txOutRefId) ||
  compareBigInt(left.txOutRefIdx, right.txOutRefIdx);

const credentialFromCml = (credential: CML.Credential): CredentialData => {
  const pubKey = credential.as_pub_key();
  if (pubKey) return { PubKeyCredential: [pubKey.to_hex()] };
  const script = credential.as_script();
  if (script) return { ScriptCredential: [script.to_hex()] };
  throw new Error("Unsupported credential in ScriptContext translation.");
};

const credentialFromCore = (credential: Credential): CredentialData =>
  credential.type === "Key"
    ? { PubKeyCredential: [credential.hash] }
    : { ScriptCredential: [credential.hash] };

const credentialFromRewardAddress = (
  rewardAddress: CML.RewardAddress,
): CredentialData => credentialFromCml(rewardAddress.payment());

const compareCredential = (
  left: CredentialData,
  right: CredentialData,
): number => {
  const leftPubKey = "PubKeyCredential" in left;
  const rightPubKey = "PubKeyCredential" in right;
  if (leftPubKey !== rightPubKey) return leftPubKey ? 1 : -1;
  const leftHash = leftPubKey
    ? left.PubKeyCredential[0]
    : left.ScriptCredential[0];
  const rightHash = rightPubKey
    ? right.PubKeyCredential[0]
    : right.ScriptCredential[0];
  return compareByteArrayHex(leftHash, rightHash);
};

const stakingCredentialFromAddress = (
  address: CML.Address,
): StakingCredentialData | null => {
  const base = CML.BaseAddress.from_address(address);
  if (base) return { StakingHash: [credentialFromCml(base.stake())] };

  const enterprise = CML.EnterpriseAddress.from_address(address);
  if (enterprise) return null;

  const pointer = CML.PointerAddress.from_address(address);
  if (pointer) {
    throw new Error(
      "Pointer address ScriptContext translation is not supported by the current CML bindings.",
    );
  }

  throw new Error("Unsupported address in ScriptContext translation.");
};

const addressFromCml = (address: CML.Address): AddressData => {
  const details = getAddressDetails(address.to_bech32(undefined));
  if (!details.paymentCredential) {
    throw new Error(
      "ScriptContext transaction outputs cannot use reward addresses.",
    );
  }
  return {
    addressCredential: credentialFromCore(details.paymentCredential),
    addressStakingCredential: stakingCredentialFromAddress(address),
  };
};

const assetNameHex = (assetName: CML.AssetName): string =>
  assetName.to_js_value();

const assetMapToValue = (
  assetMap: AssetMap | undefined,
  ada: bigint | undefined,
): ValueData => {
  const policyEntries: [string, Map<string, bigint>][] = [];
  if (ada !== undefined && ada !== 0n) {
    policyEntries.push(["", new Map([["", ada]])]);
  }
  if (assetMap) {
    for (const policy of toArray(assetMap.keys())) {
      const tokenEntries: [string, bigint][] = [];
      const assets = assetMap.get_assets(policy);
      if (!assets) continue;
      for (const assetName of toArray(assets.keys())) {
        const quantity = assets.get(assetName);
        if (quantity !== undefined && quantity !== 0n) {
          tokenEntries.push([assetNameHex(assetName), quantity]);
        }
      }
      if (tokenEntries.length > 0) {
        policyEntries.push([
          policy.to_hex(),
          sortedMap(tokenEntries, compareByteArrayHex),
        ]);
      }
    }
  }
  return sortedMap(policyEntries, compareByteArrayHex);
};

const valueFromCml = (value: CML.Value): ValueData =>
  assetMapToValue(
    value.has_multiassets() ? value.multi_asset() : undefined,
    value.coin(),
  );

const mintValueFromCml = (mint: CML.Mint | undefined): MintValueData =>
  assetMapToValue(mint, undefined);

const outputDatumFromCml = (
  datum: CML.DatumOption | undefined,
): TxOutData["txOutDatum"] => {
  if (!datum) return "NoOutputDatum" as const;
  const hash = datum.as_hash();
  if (hash) return { OutputDatumHash: [hash.to_hex()] };
  const inline = datum.as_datum();
  if (inline) return { OutputDatum: [datumFromPlutusData(inline)] };
  return "NoOutputDatum" as const;
};

const txOutFromCml = (output: CML.TransactionOutput): TxOutData => {
  const scriptRef = output.script_ref();
  return {
    txOutAddress: addressFromCml(output.address()),
    txOutValue: valueFromCml(output.amount()),
    txOutDatum: outputDatumFromCml(output.datum()),
    txOutReferenceScript: scriptRef
      ? validatorToScriptHash(fromScriptRef(scriptRef))
      : null,
  };
};

const txInInfoFromUtxo = (utxo: UTxO): TxInInfoData => {
  return {
    txInInfoOutRef: {
      txOutRefId: utxo.txHash,
      txOutRefIdx: BigInt(utxo.outputIndex),
    },
    txInInfoResolved: txOutFromCml(utxoToTransactionOutput(utxo)),
  };
};

const dRepFromCml = (dRep: CML.DRep): DRepData => {
  const key = dRep.as_key();
  if (key) return { DRep: [{ PubKeyCredential: [key.to_hex()] }] };
  const script = dRep.as_script();
  if (script) return { DRep: [{ ScriptCredential: [script.to_hex()] }] };
  switch (dRep.kind()) {
    case CML.DRepKind.AlwaysAbstain:
      return "DRepAlwaysAbstain";
    case CML.DRepKind.AlwaysNoConfidence:
      return "DRepAlwaysNoConfidence";
    default:
      throw new Error("Unsupported DRep in ScriptContext translation.");
  }
};

const delegateStake = (pool: CML.Ed25519KeyHash): DelegateeData => ({
  DelegStake: [pool.to_hex()],
});

const delegateVote = (dRep: CML.DRep): DelegateeData => ({
  DelegVote: [dRepFromCml(dRep)],
});

const delegateStakeVote = (
  pool: CML.Ed25519KeyHash,
  dRep: CML.DRep,
): DelegateeData => ({
  DelegStakeVote: [pool.to_hex(), dRepFromCml(dRep)],
});

const txCertFromCml = (certificate: CML.Certificate): TxCertData => {
  const stakeRegistration = certificate.as_stake_registration();
  if (stakeRegistration) {
    return {
      TxCertRegStaking: [
        credentialFromCml(stakeRegistration.stake_credential()),
        null,
      ],
    };
  }

  const stakeDeregistration = certificate.as_stake_deregistration();
  if (stakeDeregistration) {
    return {
      TxCertUnRegStaking: [
        credentialFromCml(stakeDeregistration.stake_credential()),
        null,
      ],
    };
  }

  const stakeDelegation = certificate.as_stake_delegation();
  if (stakeDelegation) {
    return {
      TxCertDelegStaking: [
        credentialFromCml(stakeDelegation.stake_credential()),
        delegateStake(stakeDelegation.pool()),
      ],
    };
  }

  const regCert = certificate.as_reg_cert();
  if (regCert) {
    return {
      TxCertRegStaking: [credentialFromCml(regCert.stake_credential()), null],
    };
  }

  const unregCert = certificate.as_unreg_cert();
  if (unregCert) {
    return {
      TxCertUnRegStaking: [
        credentialFromCml(unregCert.stake_credential()),
        null,
      ],
    };
  }

  const voteDelegCert = certificate.as_vote_deleg_cert();
  if (voteDelegCert) {
    return {
      TxCertDelegStaking: [
        credentialFromCml(voteDelegCert.stake_credential()),
        delegateVote(voteDelegCert.d_rep()),
      ],
    };
  }

  const stakeVoteDelegCert = certificate.as_stake_vote_deleg_cert();
  if (stakeVoteDelegCert) {
    return {
      TxCertDelegStaking: [
        credentialFromCml(stakeVoteDelegCert.stake_credential()),
        delegateStakeVote(
          stakeVoteDelegCert.pool(),
          stakeVoteDelegCert.d_rep(),
        ),
      ],
    };
  }

  const stakeRegDelegCert = certificate.as_stake_reg_deleg_cert();
  if (stakeRegDelegCert) {
    return {
      TxCertRegDeleg: [
        credentialFromCml(stakeRegDelegCert.stake_credential()),
        delegateStake(stakeRegDelegCert.pool()),
        stakeRegDelegCert.deposit(),
      ],
    };
  }

  const voteRegDelegCert = certificate.as_vote_reg_deleg_cert();
  if (voteRegDelegCert) {
    return {
      TxCertRegDeleg: [
        credentialFromCml(voteRegDelegCert.stake_credential()),
        delegateVote(voteRegDelegCert.d_rep()),
        voteRegDelegCert.deposit(),
      ],
    };
  }

  const stakeVoteRegDelegCert = certificate.as_stake_vote_reg_deleg_cert();
  if (stakeVoteRegDelegCert) {
    return {
      TxCertRegDeleg: [
        credentialFromCml(stakeVoteRegDelegCert.stake_credential()),
        delegateStakeVote(
          stakeVoteRegDelegCert.pool(),
          stakeVoteRegDelegCert.d_rep(),
        ),
        stakeVoteRegDelegCert.deposit(),
      ],
    };
  }

  const regDrepCert = certificate.as_reg_drep_cert();
  if (regDrepCert) {
    return {
      TxCertRegDRep: [
        credentialFromCml(regDrepCert.drep_credential()),
        regDrepCert.deposit(),
      ],
    };
  }

  const updateDrepCert = certificate.as_update_drep_cert();
  if (updateDrepCert) {
    return {
      TxCertUpdateDRep: [credentialFromCml(updateDrepCert.drep_credential())],
    };
  }

  const unregDrepCert = certificate.as_unreg_drep_cert();
  if (unregDrepCert) {
    return {
      TxCertUnRegDRep: [
        credentialFromCml(unregDrepCert.drep_credential()),
        unregDrepCert.deposit(),
      ],
    };
  }

  const poolRegistration = certificate.as_pool_registration();
  if (poolRegistration) {
    const poolParams = poolRegistration.pool_params();
    return {
      TxCertPoolRegister: [
        poolParams.operator().to_hex(),
        poolParams.vrf_keyhash().to_hex(),
      ],
    };
  }

  const poolRetirement = certificate.as_pool_retirement();
  if (poolRetirement) {
    return {
      TxCertPoolRetire: [
        poolRetirement.pool().to_hex(),
        poolRetirement.epoch(),
      ],
    };
  }

  const authCommitteeHotCert = certificate.as_auth_committee_hot_cert();
  if (authCommitteeHotCert) {
    return {
      TxCertAuthHotCommittee: [
        credentialFromCml(authCommitteeHotCert.committee_cold_credential()),
        credentialFromCml(authCommitteeHotCert.committee_hot_credential()),
      ],
    };
  }

  const resignCommitteeColdCert = certificate.as_resign_committee_cold_cert();
  if (resignCommitteeColdCert) {
    return {
      TxCertResignColdCommittee: [
        credentialFromCml(resignCommitteeColdCert.committee_cold_credential()),
      ],
    };
  }

  throw new Error("Unsupported certificate in ScriptContext translation.");
};

const govActionIdFromCml = (
  actionId: CML.GovActionId | undefined,
): GovernanceActionIdData | null =>
  actionId
    ? {
        gaidTxId: actionId.transaction_id().to_hex(),
        gaidGovActionIx: actionId.gov_action_index(),
      }
    : null;

const compareGovActionId = (
  left: GovernanceActionIdData,
  right: GovernanceActionIdData,
): number =>
  compareByteArrayHex(left.gaidTxId, right.gaidTxId) ||
  compareBigInt(left.gaidGovActionIx, right.gaidGovActionIx);

const protocolVersionFromCml = (
  version: CML.ProtocolVersion,
): ProtocolVersionData => ({
  pvMajor: version.major(),
  pvMinor: version.minor(),
});

const constitutionFromCml = (
  constitution: CML.Constitution,
): ConstitutionData => ({
  constitutionScript: constitution.script_hash()?.to_hex() ?? null,
});

const rationalFromUnitInterval = (interval: CML.UnitInterval) =>
  [interval.start(), interval.end()] as [bigint, bigint];

const rationalFromCml = (rational: CML.Rational | CML.SubCoin) =>
  [rational.numerator(), rational.denominator()] as [bigint, bigint];

const executionUnitsFromCml = (units: CML.ExUnits) =>
  [units.mem(), units.steps()] as [bigint, bigint];

const executionPricesFromCml = (prices: CML.ExUnitPrices) =>
  [
    rationalFromCml(prices.mem_price()),
    rationalFromCml(prices.step_price()),
  ] as [ReturnType<typeof rationalFromCml>, ReturnType<typeof rationalFromCml>];

const protocolParamUpdateFromCml = (
  update: CML.ProtocolParamUpdate,
): ChangedParametersData => {
  const entries: [bigint, PlutusDataValue][] = [];
  const add = (index: number, value: PlutusDataValue | undefined) => {
    if (value !== undefined) entries.push([BigInt(index), value]);
  };
  const addUnitInterval = (
    index: number,
    value: CML.UnitInterval | undefined,
  ) => add(index, value ? rationalFromUnitInterval(value) : undefined);

  add(0, update.minfee_a());
  add(1, update.minfee_b());
  add(2, update.max_block_body_size());
  add(3, update.max_transaction_size());
  add(4, update.max_block_header_size());
  add(5, update.key_deposit());
  add(6, update.pool_deposit());
  add(7, update.maximum_epoch());
  add(8, update.n_opt());
  add(
    9,
    update.pool_pledge_influence() &&
      rationalFromCml(update.pool_pledge_influence()!),
  );
  addUnitInterval(10, update.expansion_rate());
  addUnitInterval(11, update.treasury_growth_rate());
  add(16, update.min_pool_cost());
  add(17, update.ada_per_utxo_byte());
  if (update.cost_models_for_script_languages()) {
    throw new Error(
      "Protocol parameter cost model updates are not yet supported in ScriptContext translation.",
    );
  }
  add(
    19,
    update.execution_costs() &&
      executionPricesFromCml(update.execution_costs()!),
  );
  add(
    20,
    update.max_tx_ex_units() &&
      executionUnitsFromCml(update.max_tx_ex_units()!),
  );
  add(
    21,
    update.max_block_ex_units() &&
      executionUnitsFromCml(update.max_block_ex_units()!),
  );
  add(22, update.max_value_size());
  add(23, update.collateral_percentage());
  add(24, update.max_collateral_inputs());
  const poolVotingThresholds = update.pool_voting_thresholds();
  add(
    25,
    poolVotingThresholds && [
      rationalFromUnitInterval(poolVotingThresholds.motion_no_confidence()),
      rationalFromUnitInterval(poolVotingThresholds.committee_normal()),
      rationalFromUnitInterval(poolVotingThresholds.committee_no_confidence()),
      rationalFromUnitInterval(poolVotingThresholds.hard_fork_initiation()),
      rationalFromUnitInterval(
        poolVotingThresholds.security_relevant_parameter_voting_threshold(),
      ),
    ],
  );
  const dRepVotingThresholds = update.d_rep_voting_thresholds();
  add(
    26,
    dRepVotingThresholds && [
      rationalFromUnitInterval(dRepVotingThresholds.motion_no_confidence()),
      rationalFromUnitInterval(dRepVotingThresholds.committee_normal()),
      rationalFromUnitInterval(dRepVotingThresholds.committee_no_confidence()),
      rationalFromUnitInterval(dRepVotingThresholds.update_constitution()),
      rationalFromUnitInterval(dRepVotingThresholds.hard_fork_initiation()),
      rationalFromUnitInterval(dRepVotingThresholds.pp_network_group()),
      rationalFromUnitInterval(dRepVotingThresholds.pp_economic_group()),
      rationalFromUnitInterval(dRepVotingThresholds.pp_technical_group()),
      rationalFromUnitInterval(dRepVotingThresholds.pp_governance_group()),
      rationalFromUnitInterval(dRepVotingThresholds.treasury_withdrawal()),
    ],
  );
  add(27, update.min_committee_size());
  add(28, update.committee_term_limit());
  add(29, update.governance_action_validity_period());
  add(30, update.governance_action_deposit());
  add(31, update.d_rep_deposit());
  add(32, update.d_rep_inactivity_period());
  add(
    33,
    update.min_fee_ref_script_cost_per_byte() &&
      rationalFromCml(update.min_fee_ref_script_cost_per_byte()!),
  );

  return sortedMap(entries, compareBigInt) as ChangedParametersData;
};

const treasuryWithdrawalsFromCml = (
  withdrawals: CML.MapRewardAccountToCoin,
): Map<CredentialData, bigint> => {
  const entries = toArray(withdrawals.keys()).map(
    (rewardAddress) =>
      [
        credentialFromRewardAddress(rewardAddress),
        withdrawals.get(rewardAddress)!,
      ] as const,
  );
  return sortedMap(entries, compareCredential);
};

const committeeCredentialsFromCml = (
  credentials: CML.CommitteeColdCredentialList,
): CredentialData[] =>
  toArray(credentials).map((credential) => credentialFromCml(credential));

const committeeCredentialMapFromCml = (
  credentials: CML.MapCommitteeColdCredentialToEpoch,
): Map<CredentialData, bigint> => {
  const entries = toArray(credentials.keys()).map(
    (credential) =>
      [credentialFromCml(credential), credentials.get(credential)!] as const,
  );
  return sortedMap(entries, compareCredential);
};

const governanceActionFromCml = (
  action: CML.GovAction,
): GovernanceActionData => {
  const parameterChange = action.as_parameter_change_action();
  if (parameterChange) {
    return {
      ParameterChange: [
        govActionIdFromCml(parameterChange.action_id()),
        protocolParamUpdateFromCml(parameterChange.update()),
        parameterChange.policy_hash()?.to_hex() ?? null,
      ],
    };
  }

  const hardFork = action.as_hard_fork_initiation_action();
  if (hardFork) {
    return {
      HardForkInitiation: [
        govActionIdFromCml(hardFork.action_id()),
        protocolVersionFromCml(hardFork.version()),
      ],
    };
  }

  const treasuryWithdrawals = action.as_treasury_withdrawals_action();
  if (treasuryWithdrawals) {
    return {
      TreasuryWithdrawals: [
        treasuryWithdrawalsFromCml(treasuryWithdrawals.withdrawal()),
        treasuryWithdrawals.policy_hash()?.to_hex() ?? null,
      ],
    };
  }

  const noConfidence = action.as_no_confidence();
  if (noConfidence) {
    return {
      NoConfidence: [govActionIdFromCml(noConfidence.action_id())],
    };
  }

  const updateCommittee = action.as_update_committee();
  if (updateCommittee) {
    return {
      UpdateCommittee: [
        govActionIdFromCml(updateCommittee.action_id()),
        committeeCredentialsFromCml(updateCommittee.cold_credentials()),
        committeeCredentialMapFromCml(updateCommittee.credentials()),
        rationalFromUnitInterval(updateCommittee.unit_interval()),
      ],
    };
  }

  const newConstitution = action.as_new_constitution();
  if (newConstitution) {
    return {
      NewConstitution: [
        govActionIdFromCml(newConstitution.action_id()),
        constitutionFromCml(newConstitution.constitution()),
      ],
    };
  }

  if (action.kind() === CML.GovActionKind.InfoAction) {
    return "InfoAction";
  }

  throw new Error(
    "Unsupported governance action in ScriptContext translation.",
  );
};

const proposalProcedureFromCml = (
  proposal: CML.ProposalProcedure,
): ProposalProcedureData => ({
  ppDeposit: proposal.deposit(),
  ppReturnAddr: credentialFromRewardAddress(proposal.reward_account()),
  ppGovernanceAction: governanceActionFromCml(proposal.gov_action()),
});

const voterFromCml = (voter: CML.Voter): VoterData => {
  switch (voter.kind()) {
    case CML.VoterKind.ConstitutionalCommitteeHotKeyHash:
      return {
        CommitteeVoter: [
          {
            PubKeyCredential: [
              voter.as_constitutional_committee_hot_key_hash()!.to_hex(),
            ],
          },
        ],
      };
    case CML.VoterKind.ConstitutionalCommitteeHotScriptHash:
      return {
        CommitteeVoter: [
          {
            ScriptCredential: [
              voter.as_constitutional_committee_hot_script_hash()!.to_hex(),
            ],
          },
        ],
      };
    case CML.VoterKind.DRepKeyHash:
      return {
        DRepVoter: [
          { PubKeyCredential: [voter.as_d_rep_key_hash()!.to_hex()] },
        ],
      };
    case CML.VoterKind.DRepScriptHash:
      return {
        DRepVoter: [
          { ScriptCredential: [voter.as_d_rep_script_hash()!.to_hex()] },
        ],
      };
    case CML.VoterKind.StakingPoolKeyHash:
      return { StakePoolVoter: [voter.as_staking_pool_key_hash()!.to_hex()] };
    default:
      throw new Error("Unsupported voter in ScriptContext translation.");
  }
};

const voterRank = (voter: VoterData): number =>
  "CommitteeVoter" in voter ? 0 : "DRepVoter" in voter ? 1 : 2;

const compareVoter = (left: VoterData, right: VoterData): number => {
  const rank = voterRank(left) - voterRank(right);
  if (rank !== 0) return rank;
  if ("StakePoolVoter" in left && "StakePoolVoter" in right) {
    return compareByteArrayHex(left.StakePoolVoter[0], right.StakePoolVoter[0]);
  }
  if ("StakePoolVoter" in left || "StakePoolVoter" in right) return 0;
  const leftCredential =
    "CommitteeVoter" in left ? left.CommitteeVoter[0] : left.DRepVoter[0];
  const rightCredential =
    "CommitteeVoter" in right ? right.CommitteeVoter[0] : right.DRepVoter[0];
  return compareCredential(leftCredential, rightCredential);
};

const voteFromCml = (vote: CML.Vote): VoteData => {
  switch (vote) {
    case CML.Vote.No:
      return "VoteNo";
    case CML.Vote.Yes:
      return "VoteYes";
    case CML.Vote.Abstain:
      return "Abstain";
    default:
      throw new Error("Unsupported vote in ScriptContext translation.");
  }
};

const votingProceduresFromCml = (
  votingProcedures: CML.VotingProcedures | undefined,
): Map<VoterData, Map<GovernanceActionIdData, VoteData>> => {
  if (!votingProcedures) return new Map();
  const voterEntries = toArray(votingProcedures.keys()).map((voter) => {
    const actionMap = votingProcedures.get(voter)!;
    const actionEntries = toArray(actionMap.keys()).map(
      (actionId) =>
        [
          govActionIdFromCml(actionId)!,
          voteFromCml(actionMap.get(actionId)!.vote()),
        ] as const,
    );
    return [
      voterFromCml(voter),
      sortedMap(actionEntries, compareGovActionId),
    ] as const;
  });
  return sortedMap(voterEntries, compareVoter);
};

const validityRangeFromBody = (
  body: CML.TransactionBody,
  slotConfig: SlotConfig | undefined,
): POSIXTimeRangeData => {
  const lowerSlot = body.validity_interval_start();
  const upperSlot = body.ttl();
  return {
    ivFrom: {
      lowerBoundLimit:
        lowerSlot === undefined
          ? "NegInf"
          : {
              Finite: [slotToPosixTime(lowerSlot, slotConfig)],
            },
      lowerBoundClosed: true,
    },
    ivTo: {
      upperBoundLimit:
        upperSlot === undefined
          ? "PosInf"
          : {
              Finite: [slotToPosixTime(upperSlot, slotConfig)],
            },
      upperBoundClosed: upperSlot === undefined,
    },
  };
};

const txCertificatesFromBody = (body: CML.TransactionBody): TxCertData[] =>
  toArray(body.certs()).map(txCertFromCml);

const withdrawalsFromBody = (
  body: CML.TransactionBody,
): Map<CredentialData, bigint> => {
  const withdrawals = body.withdrawals();
  if (!withdrawals) return new Map();
  const entries = toArray(withdrawals.keys()).map(
    (rewardAddress) =>
      [
        credentialFromRewardAddress(rewardAddress),
        withdrawals.get(rewardAddress)!,
      ] as const,
  );
  return sortedMap(entries, compareCredential);
};

const signatoriesFromBody = (body: CML.TransactionBody): string[] =>
  toArray(body.required_signers())
    .map((signatory) => signatory.to_hex())
    .sort(compareByteArrayHex);

const datumMapFromWitnessSet = (
  witnessSet: CML.TransactionWitnessSet,
): Map<string, PlutusDataValue> => {
  const datums = witnessSet.plutus_datums();
  if (!datums) return new Map();
  const entries = toArray(datums).map(
    (datum) =>
      [
        CML.hash_plutus_data(datum).to_hex(),
        datumFromPlutusData(datum),
      ] as const,
  );
  return sortedMap(entries, compareByteArrayHex);
};

const proposalsFromBody = (
  body: CML.TransactionBody,
): ProposalProcedureData[] =>
  toArray(body.proposal_procedures()).map(proposalProcedureFromCml);

const mintPoliciesFromBody = (body: CML.TransactionBody): string[] => {
  const mint = body.mint();
  if (!mint) return [];
  return toArray(mint.keys())
    .map((policy) => policy.to_hex())
    .sort(compareByteArrayHex);
};

const purposeRank = (purpose: ScriptPurposeData): number =>
  "Spending" in purpose
    ? 0
    : "Minting" in purpose
      ? 1
      : "Certifying" in purpose
        ? 2
        : "Rewarding" in purpose
          ? 3
          : "Voting" in purpose
            ? 4
            : 5;

const compareScriptPurpose = (
  left: ScriptPurposeData,
  right: ScriptPurposeData,
): number => {
  const rank = purposeRank(left) - purposeRank(right);
  if (rank !== 0) return rank;
  if ("Minting" in left && "Minting" in right) {
    return compareByteArrayHex(left.Minting[0], right.Minting[0]);
  }
  if ("Spending" in left && "Spending" in right) {
    return compareTxOutRef(left.Spending[0], right.Spending[0]);
  }
  if ("Rewarding" in left && "Rewarding" in right) {
    return compareCredential(left.Rewarding[0], right.Rewarding[0]);
  }
  if ("Certifying" in left && "Certifying" in right) {
    return compareBigInt(left.Certifying[0], right.Certifying[0]);
  }
  if ("Voting" in left && "Voting" in right) {
    return compareVoter(left.Voting[0], right.Voting[0]);
  }
  if ("Proposing" in left && "Proposing" in right) {
    return compareBigInt(left.Proposing[0], right.Proposing[0]);
  }
  return 0;
};

const scriptPurposeKey = (purpose: ScriptPurposeData): string =>
  Data.to(purpose, ScriptPurposeData);

const purposeFromRedeemerEntry = (
  entry: CanonicalRedeemerEntry,
  info: CanonicalRedeemerInfo,
  body: CML.TransactionBody,
): ScriptPurposeData => {
  switch (entry.tag) {
    case "spend": {
      const input = info.inputs[Number(entry.index)];
      if (!input) {
        throw new Error(`Spend redeemer index ${entry.index} has no input.`);
      }
      return {
        Spending: [
          {
            txOutRefId: input.txHash,
            txOutRefIdx: BigInt(input.outputIndex),
          },
        ],
      };
    }
    case "mint": {
      const policy = mintPoliciesFromBody(body)[Number(entry.index)];
      if (!policy) {
        throw new Error(`Mint redeemer index ${entry.index} has no policy.`);
      }
      return { Minting: [policy] };
    }
    case "withdraw": {
      const withdrawal = toArray(body.withdrawals()?.keys())[
        Number(entry.index)
      ];
      if (!withdrawal) {
        throw new Error(
          `Withdraw redeemer index ${entry.index} has no withdrawal.`,
        );
      }
      return { Rewarding: [credentialFromRewardAddress(withdrawal)] };
    }
    case "publish": {
      const certificate = body.certs()?.get(Number(entry.index));
      if (!certificate) {
        throw new Error(`Publish redeemer index ${entry.index} has no cert.`);
      }
      return {
        Certifying: [entry.index, txCertFromCml(certificate)],
      };
    }
    case "vote": {
      const voter = toArray(body.voting_procedures()?.keys())[
        Number(entry.index)
      ];
      if (!voter) {
        throw new Error(`Vote redeemer index ${entry.index} has no voter.`);
      }
      return { Voting: [voterFromCml(voter)] };
    }
    case "propose": {
      const proposal = body.proposal_procedures()?.get(Number(entry.index));
      if (!proposal) {
        throw new Error(
          `Propose redeemer index ${entry.index} has no proposal.`,
        );
      }
      return {
        Proposing: [entry.index, proposalProcedureFromCml(proposal)],
      };
    }
  }
};

const redeemersFromWitnessSet = (
  tx: CML.Transaction,
  info: CanonicalRedeemerInfo,
): {
  redeemerMap: Map<ScriptPurposeData, PlutusDataValue>;
  redeemerByPurpose: Map<string, PlutusDataValue>;
  purposesByKey: Map<string, ScriptPurposeData>;
} => {
  const redeemers = tx.witness_set().redeemers();
  if (!redeemers) {
    return {
      redeemerMap: new Map(),
      redeemerByPurpose: new Map(),
      purposesByKey: new Map(),
    };
  }
  const entries = canonicalRedeemerEntries(redeemers).map((entry) => {
    const purpose = purposeFromRedeemerEntry(entry, info, tx.body());
    return [purpose, datumFromPlutusData(entry.data)] as const;
  });
  const sortedEntries = [...entries].sort(([left], [right]) =>
    compareScriptPurpose(left, right),
  );
  const redeemerMap = new Map(sortedEntries);
  const redeemerByPurpose = new Map<string, PlutusDataValue>();
  const purposesByKey = new Map<string, ScriptPurposeData>();
  for (const [purpose, redeemer] of sortedEntries) {
    const key = scriptPurposeKey(purpose);
    redeemerByPurpose.set(key, redeemer);
    purposesByKey.set(key, purpose);
  }
  return { redeemerMap, redeemerByPurpose, purposesByKey };
};

const spendingDatumForPurpose = (
  purpose: TxOutRefData,
  info: CanonicalRedeemerInfo,
  datums: Map<string, PlutusDataValue>,
): PlutusDataValue | null => {
  const input = info.inputs.find(
    (candidate) =>
      candidate.txHash === purpose.txOutRefId &&
      BigInt(candidate.outputIndex) === purpose.txOutRefIdx,
  );
  if (!input) return null;
  if (input.datum) return Data.from(input.datum);
  if (input.datumHash) return datums.get(input.datumHash) ?? null;
  return null;
};

const scriptInfoFromPurpose = (
  purpose: ScriptPurposeData,
  info: CanonicalRedeemerInfo,
  datums: Map<string, PlutusDataValue>,
): ScriptInfoData => {
  if ("Minting" in purpose) return { MintingScript: purpose.Minting };
  if ("Spending" in purpose) {
    return {
      SpendingScript: [
        purpose.Spending[0],
        spendingDatumForPurpose(purpose.Spending[0], info, datums),
      ],
    };
  }
  if ("Rewarding" in purpose) return { RewardingScript: purpose.Rewarding };
  if ("Certifying" in purpose) {
    return { CertifyingScript: purpose.Certifying };
  }
  if ("Voting" in purpose) return { VotingScript: purpose.Voting };
  return { ProposingScript: purpose.Proposing };
};

const txInfoFromTransaction = (
  tx: CML.Transaction,
  info: CanonicalRedeemerInfo,
  slotConfig: SlotConfig | undefined,
  redeemerMap: Map<ScriptPurposeData, PlutusDataValue>,
  txInfoId: string,
): TxInfoData => {
  const body = tx.body();
  return {
    txInfoInputs: info.inputs.map(txInInfoFromUtxo),
    txInfoReferenceInputs: info.referenceInputs.map(txInInfoFromUtxo),
    txInfoOutputs: toArray(body.outputs()).map(txOutFromCml),
    txInfoFee: body.fee(),
    txInfoMint: mintValueFromCml(body.mint()),
    txInfoTxCerts: txCertificatesFromBody(body),
    txInfoWdrl: withdrawalsFromBody(body),
    txInfoValidRange: validityRangeFromBody(body, slotConfig),
    txInfoSignatories: signatoriesFromBody(body),
    txInfoRedeemers: redeemerMap,
    txInfoData: datumMapFromWitnessSet(tx.witness_set()),
    txInfoId,
    txInfoVotes: votingProceduresFromCml(body.voting_procedures()),
    txInfoProposalProcedures: proposalsFromBody(body),
    txInfoCurrentTreasuryAmount: body.current_treasury_value() ?? null,
    txInfoTreasuryDonation: body.donation() ?? null,
  };
};

const canonicalTransaction = (tx: CML.Transaction): CML.Transaction =>
  CML.Transaction.from_cbor_bytes(tx.to_canonical_cbor_bytes());

const canonicalInfo = (
  tx: CML.Transaction,
  resolvedInputs: ReadonlyArray<UTxO>,
): CanonicalRedeemerInfo =>
  Effect.runSync(buildCanonicalRedeemerInfo(tx, resolvedInputs));

export const makeScriptContexts = (
  tx: CML.Transaction,
  options: ScriptContextOptions = {},
): ScriptContextData[] => {
  const txInfoId = CML.hash_transaction(tx.body()).to_hex();
  const canonicalTx = canonicalTransaction(tx);
  const info = canonicalInfo(canonicalTx, options.resolvedInputs ?? []);
  const datums = datumMapFromWitnessSet(canonicalTx.witness_set());
  const { redeemerMap, redeemerByPurpose, purposesByKey } =
    redeemersFromWitnessSet(canonicalTx, info);
  const txInfo = txInfoFromTransaction(
    canonicalTx,
    info,
    options.slotConfig,
    redeemerMap,
    txInfoId,
  );

  return [...purposesByKey.entries()]
    .sort(([, left], [, right]) => compareScriptPurpose(left, right))
    .map(([key, purpose]) => ({
      scriptContextTxInfo: txInfo,
      scriptContextRedeemer: redeemerByPurpose.get(key)!,
      scriptContextScriptInfo: scriptInfoFromPurpose(purpose, info, datums),
    }));
};

export const makeScriptContext = (
  tx: CML.Transaction,
  purpose: ScriptPurposeData,
  options: ScriptContextOptions = {},
): ScriptContextData => {
  const txInfoId = CML.hash_transaction(tx.body()).to_hex();
  const canonicalTx = canonicalTransaction(tx);
  const info = canonicalInfo(canonicalTx, options.resolvedInputs ?? []);
  const datums = datumMapFromWitnessSet(canonicalTx.witness_set());
  const { redeemerMap, redeemerByPurpose, purposesByKey } =
    redeemersFromWitnessSet(canonicalTx, info);
  const key = scriptPurposeKey(purpose);
  const canonicalPurpose = purposesByKey.get(key);
  const redeemer = redeemerByPurpose.get(key);
  if (!canonicalPurpose || redeemer === undefined) {
    throw new Error(
      `No redeemer found for ScriptContext purpose ${JSON.stringify(purpose)}.`,
    );
  }
  return {
    scriptContextTxInfo: txInfoFromTransaction(
      canonicalTx,
      info,
      options.slotConfig,
      redeemerMap,
      txInfoId,
    ),
    scriptContextRedeemer: redeemer,
    scriptContextScriptInfo: scriptInfoFromPurpose(
      canonicalPurpose,
      info,
      datums,
    ),
  };
};
