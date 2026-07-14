import { Effect } from "effect";
import {
  Assets,
  BuildTxWithRedeemer,
  OutRef,
  PolicyId,
  Redeemer,
  RedeemerBuilder,
  RedeemerContext,
  RedeemerPurpose,
  RedeemerTag,
  RewardAddress,
  TxOutput,
  UTxO,
  WithdrawalEntry,
} from "@lucid-evolution/core-types";
import {
  coreToOutRef,
  coreToTxOutput,
  fromCMLRedeemerTag,
} from "@lucid-evolution/utils";
import { CML } from "../../core.js";
import { TxBuilderError } from "../../Errors.js";
import type { TxBuilderConfig } from "../TxBuilder.js";

export type BuildTxRedeemer = Redeemer | RedeemerBuilder | BuildTxWithRedeemer;

export type DelayedRedeemer = RedeemerBuilder | BuildTxWithRedeemer;

export type WitnessPurposeKey =
  | { readonly tag: "spend"; readonly input: OutRef }
  | { readonly tag: "mint"; readonly policyId: PolicyId }
  | { readonly tag: "withdraw"; readonly rewardAddress: RewardAddress }
  | { readonly tag: "publish"; readonly index: bigint }
  | { readonly tag: "propose"; readonly index: bigint }
  | { readonly tag: "propose"; readonly proposalKey: string }
  | { readonly tag: "vote"; readonly index: bigint }
  | { readonly tag: "vote"; readonly voterKey: string };

export type PendingRedeemer = Readonly<{
  id: number;
  actionId: number;
  source: DelayedRedeemer;
  purposeKey: WitnessPurposeKey;
}>;

export type CanonicalRedeemerInfo = Readonly<{
  txBody: CML.TransactionBody;
  inputs: ReadonlyArray<UTxO>;
  referenceInputs: ReadonlyArray<UTxO>;
  outputs: ReadonlyArray<TxOutput>;
  mint: Readonly<Assets>;
  withdrawals: RedeemerContext["withdrawals"];
  redeemers: ReadonlyArray<RedeemerPurpose>;
  inputIndex: (input: OutRef) => bigint | undefined;
  outputIndex: (predicate: (output: TxOutput) => boolean) => bigint | undefined;
  withdrawalIndex: (rewardAddress: RewardAddress) => bigint | undefined;
  mintPolicyIndex: (policyId: PolicyId) => bigint | undefined;
  redeemerIndex: (purpose: RedeemerPurpose) => bigint | undefined;
  purposeByKey: ReadonlyMap<string, RedeemerPurpose>;
}>;

export type CanonicalRedeemerEntry = Readonly<{
  tag: RedeemerTag;
  index: bigint;
  data: CML.PlutusData;
  exUnits: CML.ExUnits;
  sortKey: Uint8Array;
}>;

export type RedeemerBuilderCache = Map<number, Map<string, Redeemer>>;

export const redeemerContextError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ RedeemerContext: ${cause} }` });

export const isRedeemerBuilder = (
  redeemer: BuildTxRedeemer | undefined,
): redeemer is RedeemerBuilder =>
  typeof redeemer === "object" &&
  redeemer !== null &&
  "kind" in redeemer &&
  (redeemer.kind === "selected" || redeemer.kind === "self");

export const isBuildTxWithRedeemer = (
  redeemer: BuildTxRedeemer | undefined,
): redeemer is BuildTxWithRedeemer => typeof redeemer === "function";

export const isDelayedRedeemer = (
  redeemer: BuildTxRedeemer | undefined,
): redeemer is DelayedRedeemer =>
  isRedeemerBuilder(redeemer) || isBuildTxWithRedeemer(redeemer);

export const cloneAssets = (assets: Assets): Assets => ({ ...assets });

export const cloneUTxO = (utxo: UTxO): UTxO => ({
  ...utxo,
  assets: cloneAssets(utxo.assets),
  scriptRef: utxo.scriptRef ? { ...utxo.scriptRef } : utxo.scriptRef,
});

export const cloneUTxOs = (utxos: UTxO[]): UTxO[] => utxos.map(cloneUTxO);

export const cloneRedeemerBuilder = (
  redeemerBuilder: RedeemerBuilder,
  selfInputs?: UTxO[],
): RedeemerBuilder =>
  redeemerBuilder.kind === "selected"
    ? {
        kind: "selected",
        makeRedeemer: redeemerBuilder.makeRedeemer,
        inputs: cloneUTxOs(redeemerBuilder.inputs),
      }
    : {
        kind: "self",
        makeRedeemer: redeemerBuilder.makeRedeemer,
        inputs: selfInputs
          ? cloneUTxOs(selfInputs)
          : redeemerBuilder.inputs
            ? cloneUTxOs(redeemerBuilder.inputs)
            : undefined,
      };

export const cloneRedeemerInput = (
  redeemer: BuildTxRedeemer | undefined,
  selfInputs?: UTxO[],
): BuildTxRedeemer | undefined =>
  isRedeemerBuilder(redeemer)
    ? cloneRedeemerBuilder(redeemer, selfInputs)
    : redeemer;

export const outRefKey = (outRef: OutRef): string =>
  `${outRef.txHash}#${outRef.outputIndex}`;

export const witnessPurposeKey = (purposeKey: WitnessPurposeKey): string => {
  switch (purposeKey.tag) {
    case "spend":
      return `spend:${outRefKey(purposeKey.input)}`;
    case "mint":
      return `mint:${purposeKey.policyId}`;
    case "withdraw":
      return `withdraw:${purposeKey.rewardAddress}`;
    case "publish":
      return `${purposeKey.tag}:${purposeKey.index}`;
    case "propose":
      return "proposalKey" in purposeKey
        ? `propose:proposal:${purposeKey.proposalKey}`
        : `propose:${purposeKey.index}`;
    case "vote":
      return "voterKey" in purposeKey
        ? `vote:voter:${purposeKey.voterKey}`
        : `vote:${purposeKey.index}`;
  }
};

export const purposeToWitnessKey = (
  purpose: RedeemerPurpose,
): WitnessPurposeKey => {
  switch (purpose.tag) {
    case "spend":
      return { tag: "spend", input: purpose.input };
    case "mint":
      return { tag: "mint", policyId: purpose.policyId };
    case "withdraw":
      return { tag: "withdraw", rewardAddress: purpose.rewardAddress };
    case "publish":
      return { tag: purpose.tag, index: purpose.index };
    case "propose":
      return purpose.proposalKey
        ? { tag: "propose", proposalKey: purpose.proposalKey }
        : { tag: "propose", index: purpose.index };
    case "vote":
      return purpose.voterKey
        ? { tag: "vote", voterKey: purpose.voterKey }
        : { tag: "vote", index: purpose.index };
  }
};

export const registerPendingRedeemer = (
  config: TxBuilderConfig,
  pending: PendingRedeemer,
) =>
  Effect.gen(function* () {
    const key = witnessPurposeKey(pending.purposeKey);
    if (config.witnessRegistry.has(key)) {
      yield* redeemerContextError(`Duplicate script witness purpose: ${key}`);
    }
    config.witnessRegistry.add(key);
    config.pendingRedeemers.push(pending);
  });

const findResolvedInput = (
  outRef: OutRef,
  candidates: ReadonlyArray<UTxO>,
): UTxO | undefined => {
  const key = outRefKey(outRef);
  let best: UTxO | undefined;
  let bestScore = -1;
  for (const candidate of candidates) {
    if (outRefKey(candidate) !== key) continue;
    const score = resolvedUtxoCompletenessScore(candidate);
    if (score > bestScore) {
      best = candidate;
      bestScore = score;
    }
  }
  return best;
};

const resolvedUtxoCompletenessScore = (utxo: UTxO): number =>
  (utxo.datum ? 4 : 0) + (utxo.scriptRef ? 2 : 0) + (utxo.datumHash ? 1 : 0);

export const resolveCanonicalInputs = (
  tx: CML.Transaction,
  candidates: ReadonlyArray<UTxO>,
): Effect.Effect<UTxO[], TxBuilderError> =>
  Effect.gen(function* () {
    const bodyInputs = tx.body().inputs();
    const inputs: UTxO[] = [];
    for (let i = 0; i < bodyInputs.len(); i++) {
      const outRef = coreToOutRef(bodyInputs.get(i));
      const resolved = findResolvedInput(outRef, candidates);
      if (!resolved) {
        yield* redeemerContextError(
          `Could not resolve transaction input ${outRefKey(outRef)}`,
        );
        continue;
      }
      inputs.push(cloneUTxO(resolved));
    }
    return inputs;
  });

export const resolveCanonicalReferenceInputs = (
  tx: CML.Transaction,
  candidates: ReadonlyArray<UTxO>,
): Effect.Effect<UTxO[], TxBuilderError> =>
  Effect.gen(function* () {
    const bodyInputs = tx.body().reference_inputs();
    const inputs: UTxO[] = [];
    if (!bodyInputs) return inputs;
    for (let i = 0; i < bodyInputs.len(); i++) {
      const outRef = coreToOutRef(bodyInputs.get(i));
      const resolved = findResolvedInput(outRef, candidates);
      if (!resolved) {
        yield* redeemerContextError(
          `Could not resolve reference input ${outRefKey(outRef)}`,
        );
        continue;
      }
      inputs.push(cloneUTxO(resolved));
    }
    return inputs;
  });

const deriveOutputs = (body: CML.TransactionBody): TxOutput[] => {
  const outputs = body.outputs();
  const result: TxOutput[] = [];
  for (let i = 0; i < outputs.len(); i++) {
    result.push(coreToTxOutput(outputs.get(i)));
  }
  return result;
};

const deriveMint = (body: CML.TransactionBody): Assets => {
  const mint = body.mint();
  const assets: Assets = {};
  if (!mint) return assets;
  const policies = mint.keys();
  for (let i = 0; i < policies.len(); i++) {
    const policy = policies.get(i);
    const policyId = policy.to_hex();
    const policyAssets = mint.get_assets(policy)!;
    const assetNames = policyAssets.keys();
    for (let j = 0; j < assetNames.len(); j++) {
      const assetName = assetNames.get(j);
      const quantity = policyAssets.get(assetName)!;
      if (quantity !== 0n) {
        assets[policyId + assetName.to_js_value()] = quantity;
      }
    }
  }
  return assets;
};

const deriveMintPolicyIds = (body: CML.TransactionBody): PolicyId[] => {
  const mint = body.mint();
  if (!mint) return [];
  const policies = mint.keys();
  const result: PolicyId[] = [];
  for (let i = 0; i < policies.len(); i++) {
    result.push(policies.get(i).to_hex());
  }
  return result;
};

const deriveWithdrawals = (
  body: CML.TransactionBody,
): RedeemerContext["withdrawals"] => {
  const withdrawals = body.withdrawals();
  if (!withdrawals) return [];
  const rewardAddresses = withdrawals.keys();
  const result: WithdrawalEntry[] = [];
  for (let i = 0; i < rewardAddresses.len(); i++) {
    const rewardAddress = rewardAddresses.get(i);
    result.push({
      rewardAddress: rewardAddress.to_address().to_bech32(undefined),
      amount: withdrawals.get(rewardAddress)!,
    });
  }
  return result;
};

const redeemerKeyBytes = (tag: CML.RedeemerTag, index: bigint): Uint8Array =>
  CML.RedeemerKey.new(tag, index).to_canonical_cbor_bytes();

const cmlVoterKey = (voter: CML.Voter): string => voter.to_canonical_cbor_hex();

const cmlProposalKey = (proposal: CML.ProposalProcedure): string =>
  proposal.to_canonical_cbor_hex();

const indexToSafeNumber = (index: bigint): number | undefined => {
  if (index < 0n || index > BigInt(Number.MAX_SAFE_INTEGER)) return undefined;
  return Number(index);
};

export const proposalProcedureForRedeemerIndex = (
  tx: CML.Transaction,
  index: bigint,
): CML.ProposalProcedure | undefined => {
  const proposals = tx.body().proposal_procedures();
  if (!proposals) return undefined;
  const target = indexToSafeNumber(index);
  if (target === undefined) return undefined;

  return target < proposals.len() ? proposals.get(target) : undefined;
};

export const voterForRedeemerIndex = (
  tx: CML.Transaction,
  index: bigint,
): CML.Voter | undefined => {
  const voters = tx.body().voting_procedures()?.keys();
  if (!voters) return undefined;
  const target = indexToSafeNumber(index);
  if (target === undefined) return undefined;

  return target < voters.len() ? voters.get(target) : undefined;
};

export type GovernanceRedeemerNormalization = Readonly<{
  transaction: CML.Transaction;
  builderKeyByLedgerKey: ReadonlyMap<string, CML.RedeemerWitnessKey>;
}>;

const voterIndexByKey = (
  tx: CML.Transaction,
  voterKey: string,
): bigint | undefined => {
  const voters = tx.body().voting_procedures()?.keys();
  if (!voters) return undefined;
  for (let i = 0; i < voters.len(); i++) {
    if (cmlVoterKey(voters.get(i)) === voterKey) return BigInt(i);
  }
  return undefined;
};

const governanceIndex = (
  tx: CML.Transaction,
  tag: RedeemerTag,
  rawIndex: bigint,
  voteWitnessKeys: readonly string[],
  proposalWitnessIndices: readonly bigint[],
): bigint => {
  if (tag !== "vote" && tag !== "propose") return rawIndex;
  const witnessIndex = indexToSafeNumber(rawIndex);
  if (witnessIndex === undefined) {
    throw redeemerContextError(
      `Governance redeemer index ${rawIndex} is outside the safe integer range`,
    );
  }
  if (tag === "propose") {
    if (proposalWitnessIndices.length === 0) return rawIndex;
    const ledgerIndex = proposalWitnessIndices[witnessIndex];
    const proposals = tx.body().proposal_procedures();
    if (
      ledgerIndex === undefined ||
      !proposals ||
      ledgerIndex < 0n ||
      ledgerIndex >= BigInt(proposals.len())
    ) {
      throw redeemerContextError(
        `Unable to map proposing redeemer index ${rawIndex} to a proposal procedure`,
      );
    }
    return ledgerIndex;
  }
  if (voteWitnessKeys.length === 0) return rawIndex;
  const voterKey = voteWitnessKeys[witnessIndex];
  const ledgerIndex = voterKey ? voterIndexByKey(tx, voterKey) : undefined;
  if (ledgerIndex === undefined) {
    throw redeemerContextError(
      `Unable to map voting redeemer index ${rawIndex} to a voter`,
    );
  }
  return ledgerIndex;
};

export const normalizeGovernanceRedeemerIndices = (
  tx: CML.Transaction,
  voteWitnessKeys: readonly string[],
  proposalWitnessIndices: readonly bigint[],
): GovernanceRedeemerNormalization => {
  const transaction = CML.Transaction.from_cbor_bytes(tx.to_cbor_bytes());
  const ledgerIndexTransaction = CML.Transaction.from_cbor_bytes(
    tx.to_canonical_cbor_bytes(),
  );
  const witnessSet = transaction.witness_set();
  const redeemers = witnessSet.redeemers();
  const builderKeyByLedgerKey = new Map<string, CML.RedeemerWitnessKey>();
  if (!redeemers) return { transaction, builderKeyByLedgerKey };

  const seen = new Set<string>();
  const normalizeKey = (tag: CML.RedeemerTag, index: bigint): bigint => {
    const lucidTag = fromCMLRedeemerTag(tag);
    const normalizedIndex = governanceIndex(
      ledgerIndexTransaction,
      lucidTag,
      index,
      voteWitnessKeys,
      proposalWitnessIndices,
    );
    const ledgerKey = `${lucidTag}:${normalizedIndex}`;
    if (seen.has(ledgerKey)) {
      throw redeemerContextError(
        `Multiple builder redeemers map to ledger purpose ${ledgerKey}`,
      );
    }
    seen.add(ledgerKey);
    builderKeyByLedgerKey.set(
      ledgerKey,
      CML.RedeemerWitnessKey.new(tag, index),
    );
    return normalizedIndex;
  };

  const legacy = redeemers.as_arr_legacy_redeemer();
  if (legacy) {
    const normalized = CML.LegacyRedeemerList.new();
    for (let i = 0; i < legacy.len(); i++) {
      const redeemer = legacy.get(i);
      normalized.add(
        CML.LegacyRedeemer.new(
          redeemer.tag(),
          normalizeKey(redeemer.tag(), redeemer.index()),
          redeemer.data(),
          redeemer.ex_units(),
        ),
      );
    }
    witnessSet.set_redeemers(CML.Redeemers.new_arr_legacy_redeemer(normalized));
    return {
      transaction: CML.Transaction.new(
        transaction.body(),
        witnessSet,
        transaction.is_valid(),
        transaction.auxiliary_data(),
      ),
      builderKeyByLedgerKey,
    };
  }

  const map = redeemers.as_map_redeemer_key_to_redeemer_val();
  if (map) {
    const normalized = CML.MapRedeemerKeyToRedeemerVal.new();
    const keys = map.keys();
    for (let i = 0; i < keys.len(); i++) {
      const key = keys.get(i);
      normalized.insert(
        CML.RedeemerKey.new(key.tag(), normalizeKey(key.tag(), key.index())),
        map.get(key)!,
      );
    }
    witnessSet.set_redeemers(
      CML.Redeemers.new_map_redeemer_key_to_redeemer_val(normalized),
    );
    return {
      transaction: CML.Transaction.new(
        transaction.body(),
        witnessSet,
        transaction.is_valid(),
        transaction.auxiliary_data(),
      ),
      builderKeyByLedgerKey,
    };
  }
  return { transaction, builderKeyByLedgerKey };
};

const compareBytes = (a: Uint8Array, b: Uint8Array): number => {
  if (a.length !== b.length) return a.length - b.length;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
  return 0;
};

export const canonicalRedeemerEntries = (
  redeemers: CML.Redeemers,
): CanonicalRedeemerEntry[] => {
  const entries: CanonicalRedeemerEntry[] = [];

  const legacyRedeemers = redeemers.as_arr_legacy_redeemer();
  if (legacyRedeemers) {
    for (let i = 0; i < legacyRedeemers.len(); i++) {
      const redeemer = legacyRedeemers.get(i);
      const cmlTag = redeemer.tag();
      const index = redeemer.index();
      entries.push({
        tag: fromCMLRedeemerTag(cmlTag),
        index,
        data: redeemer.data(),
        exUnits: redeemer.ex_units(),
        sortKey: redeemerKeyBytes(cmlTag, index),
      });
    }
  }

  const mapRedeemers = redeemers.as_map_redeemer_key_to_redeemer_val();
  if (mapRedeemers) {
    const keys = mapRedeemers.keys();
    for (let i = 0; i < keys.len(); i++) {
      const key = keys.get(i);
      const value = mapRedeemers.get(key)!;
      const cmlTag = key.tag();
      const index = key.index();
      entries.push({
        tag: fromCMLRedeemerTag(cmlTag),
        index,
        data: value.data(),
        exUnits: value.ex_units(),
        sortKey: redeemerKeyBytes(cmlTag, index),
      });
    }
  }

  return entries.sort((left, right) =>
    compareBytes(left.sortKey, right.sortKey),
  );
};

const deriveRedeemerPurposes = (
  tx: CML.Transaction,
  inputs: ReadonlyArray<UTxO>,
  mintPolicyIds: ReadonlyArray<PolicyId>,
  withdrawals: RedeemerContext["withdrawals"],
): Effect.Effect<RedeemerPurpose[], TxBuilderError> =>
  Effect.gen(function* () {
    const redeemers = tx.witness_set().redeemers();
    if (!redeemers) return [];
    const entries = canonicalRedeemerEntries(redeemers);
    const purposes: RedeemerPurpose[] = [];
    const finalKeys = new Set<string>();

    for (let i = 0; i < entries.length; i++) {
      const { tag, index } = entries[i];
      const redeemerListIndex = BigInt(i);
      const duplicateKey = `${tag}:${index}`;
      if (finalKeys.has(duplicateKey)) {
        yield* redeemerContextError(
          `Duplicate final redeemer purpose: ${duplicateKey}`,
        );
      }
      finalKeys.add(duplicateKey);

      switch (tag) {
        case "spend": {
          const input = inputs[Number(index)];
          if (!input) {
            yield* redeemerContextError(
              `Spend redeemer index ${index} is not present in tx inputs`,
            );
          }
          purposes.push({
            tag,
            index,
            input: {
              txHash: input.txHash,
              outputIndex: input.outputIndex,
            },
            redeemerListIndex,
          });
          break;
        }
        case "mint": {
          const policyId = mintPolicyIds[Number(index)];
          if (!policyId) {
            yield* redeemerContextError(
              `Mint redeemer index ${index} is not present in tx mint policies`,
            );
          }
          purposes.push({ tag, index, policyId, redeemerListIndex });
          break;
        }
        case "withdraw": {
          const withdrawal = withdrawals[Number(index)];
          if (!withdrawal) {
            yield* redeemerContextError(
              `Withdraw redeemer index ${index} is not present in withdrawals`,
            );
          }
          purposes.push({
            tag,
            index,
            rewardAddress: withdrawal.rewardAddress,
            redeemerListIndex,
          });
          break;
        }
        case "publish":
          purposes.push({ tag, index, redeemerListIndex });
          break;
        case "propose": {
          const proposal = proposalProcedureForRedeemerIndex(tx, index);
          purposes.push({
            tag,
            index,
            proposalKey: proposal ? cmlProposalKey(proposal) : undefined,
            redeemerListIndex,
          });
          break;
        }
        case "vote": {
          const voter = voterForRedeemerIndex(tx, index);
          purposes.push({
            tag,
            index,
            voterKey: voter ? cmlVoterKey(voter) : undefined,
            redeemerListIndex,
          });
          break;
        }
      }
    }
    return purposes;
  });

export const buildCanonicalRedeemerInfo = (
  tx: CML.Transaction,
  resolvedInputs: ReadonlyArray<UTxO>,
): Effect.Effect<CanonicalRedeemerInfo, TxBuilderError> =>
  Effect.gen(function* () {
    const canonicalTx = CML.Transaction.from_cbor_bytes(
      tx.to_canonical_cbor_bytes(),
    );
    const txBody = canonicalTx.body();
    const inputs = yield* resolveCanonicalInputs(canonicalTx, resolvedInputs);
    const referenceInputs = yield* resolveCanonicalReferenceInputs(
      canonicalTx,
      resolvedInputs,
    );
    const outputs = deriveOutputs(txBody);
    const mint = deriveMint(txBody);
    const mintPolicyIds = deriveMintPolicyIds(txBody);
    const withdrawals = deriveWithdrawals(txBody);
    const redeemers = yield* deriveRedeemerPurposes(
      canonicalTx,
      inputs,
      mintPolicyIds,
      withdrawals,
    );

    const inputIndices = new Map<string, bigint>();
    inputs.forEach((input, index) => {
      inputIndices.set(outRefKey(input), BigInt(index));
    });

    const withdrawalIndices = new Map<RewardAddress, bigint>();
    withdrawals.forEach((withdrawal, index) => {
      withdrawalIndices.set(withdrawal.rewardAddress, BigInt(index));
    });

    const mintPolicyIndices = new Map<PolicyId, bigint>();
    mintPolicyIds.forEach((policyId, index) => {
      mintPolicyIndices.set(policyId, BigInt(index));
    });

    const purposeByKey = new Map<string, RedeemerPurpose>();
    const redeemerIndices = new Map<string, bigint>();
    redeemers.forEach((purpose) => {
      const key = witnessPurposeKey(purposeToWitnessKey(purpose));
      purposeByKey.set(key, purpose);
      if (purpose.tag === "vote" && purpose.voterKey) {
        purposeByKey.set(`vote:${purpose.index}`, purpose);
      }
      if (purpose.tag === "propose" && purpose.proposalKey) {
        purposeByKey.set(`propose:${purpose.index}`, purpose);
      }
      if (purpose.redeemerListIndex !== undefined) {
        redeemerIndices.set(key, purpose.redeemerListIndex);
        if (purpose.tag === "vote" && purpose.voterKey) {
          redeemerIndices.set(
            `vote:${purpose.index}`,
            purpose.redeemerListIndex,
          );
        }
        if (purpose.tag === "propose" && purpose.proposalKey) {
          redeemerIndices.set(
            `propose:${purpose.index}`,
            purpose.redeemerListIndex,
          );
        }
      }
    });

    return {
      txBody,
      inputs,
      referenceInputs,
      outputs,
      mint,
      withdrawals,
      redeemers,
      inputIndex: (input: OutRef) => inputIndices.get(outRefKey(input)),
      outputIndex: (predicate: (output: TxOutput) => boolean) => {
        const index = outputs.findIndex(predicate);
        return index === -1 ? undefined : BigInt(index);
      },
      withdrawalIndex: (rewardAddress: RewardAddress) =>
        withdrawalIndices.get(rewardAddress),
      mintPolicyIndex: (policyId: PolicyId) => mintPolicyIndices.get(policyId),
      redeemerIndex: (purpose: RedeemerPurpose) =>
        redeemerIndices.get(witnessPurposeKey(purposeToWitnessKey(purpose))),
      purposeByKey,
    };
  });

export const contextForPurpose = (
  info: CanonicalRedeemerInfo,
  ownPurpose: RedeemerPurpose,
): RedeemerContext => ({
  txBody: info.txBody,
  inputs: info.inputs,
  referenceInputs: info.referenceInputs,
  outputs: info.outputs,
  mint: info.mint,
  withdrawals: info.withdrawals,
  redeemers: info.redeemers,
  ownPurpose,
  inputIndex: info.inputIndex,
  outputIndex: info.outputIndex,
  withdrawalIndex: info.withdrawalIndex,
  mintPolicyIndex: info.mintPolicyIndex,
  redeemerIndex: info.redeemerIndex,
});

const pendingGroups = (
  pendingRedeemers: ReadonlyArray<PendingRedeemer>,
): Map<number, PendingRedeemer[]> => {
  const groups = new Map<number, PendingRedeemer[]>();
  for (const pending of pendingRedeemers) {
    const group = groups.get(pending.id);
    if (group) group.push(pending);
    else groups.set(pending.id, [pending]);
  }
  return groups;
};

const memoizedRedeemerBuilderResult = (
  cache: RedeemerBuilderCache | undefined,
  pendingId: number,
  signature: string,
  makeRedeemer: () => Redeemer,
): Redeemer => {
  if (!cache) return makeRedeemer();
  let pendingCache = cache.get(pendingId);
  if (!pendingCache) {
    pendingCache = new Map();
    cache.set(pendingId, pendingCache);
  }

  const cached = pendingCache.get(signature);
  if (cached !== undefined) return cached;

  const redeemer = makeRedeemer();
  pendingCache.set(signature, redeemer);
  return redeemer;
};

const selectedSignature = (indices: readonly bigint[]): string =>
  `selected:${indices.map((index) => index.toString()).join(",")}`;

const selfSignature = (index: bigint): string => `self:${index.toString()}`;

export const buildRedeemersFromCanonicalContext = (
  info: CanonicalRedeemerInfo,
  pendingRedeemers: ReadonlyArray<PendingRedeemer>,
  redeemerBuilderCache?: RedeemerBuilderCache,
): Effect.Effect<Map<number, Redeemer>, TxBuilderError> =>
  Effect.gen(function* () {
    const nextRedeemers = new Map<number, Redeemer>();
    for (const [pendingId, group] of pendingGroups(pendingRedeemers)) {
      const source = group[0].source;
      if (isRedeemerBuilder(source)) {
        if (source.kind === "selected") {
          const inputIndices = source.inputs.map((input) =>
            info.inputIndex(input),
          );
          if (inputIndices.some((index) => index === undefined)) {
            yield* redeemerContextError(
              `RedeemerBuilder selected inputs are missing from canonical transaction inputs`,
            );
          }
          const indices = inputIndices as bigint[];
          nextRedeemers.set(
            pendingId,
            memoizedRedeemerBuilderResult(
              redeemerBuilderCache,
              pendingId,
              selectedSignature(indices),
              () => source.makeRedeemer(indices),
            ),
          );
        } else {
          const purposeKey = group[0].purposeKey;
          if (group.length !== 1 || purposeKey.tag !== "spend") {
            yield* redeemerContextError(
              "RedeemerBuilder self is only valid for spend witnesses",
            );
            continue;
          }
          const index = info.inputIndex(purposeKey.input);
          if (index === undefined) {
            yield* redeemerContextError(
              `RedeemerBuilder self input ${outRefKey(purposeKey.input)} is missing from canonical transaction inputs`,
            );
            continue;
          }
          nextRedeemers.set(
            pendingId,
            memoizedRedeemerBuilderResult(
              redeemerBuilderCache,
              pendingId,
              selfSignature(index),
              () => source.makeRedeemer(index),
            ),
          );
        }
      } else {
        if (group.length !== 1) {
          yield* redeemerContextError(
            "BuildTxWithRedeemer expects exactly one canonical script purpose",
          );
        }
        const key = witnessPurposeKey(group[0].purposeKey);
        const ownPurpose = info.purposeByKey.get(key);
        if (!ownPurpose) {
          yield* redeemerContextError(
            `Could not find canonical redeemer purpose for ${key}`,
          );
          continue;
        }
        nextRedeemers.set(
          pendingId,
          source(contextForPurpose(info, ownPurpose)),
        );
      }
    }
    return nextRedeemers;
  });

export const redeemerMapsEqual = (
  a: ReadonlyMap<number, Redeemer>,
  b: ReadonlyMap<number, Redeemer>,
): boolean => {
  if (a.size !== b.size) return false;
  for (const [key, value] of a.entries()) {
    if (b.get(key) !== value) return false;
  }
  return true;
};

export const transactionFixedPointFingerprint = (
  tx: CML.Transaction,
): string => {
  const body = tx.body().to_canonical_cbor_hex();
  const redeemers = tx.witness_set().redeemers();
  const redeemerData: string[] = [];
  const redeemerExUnits: string[] = [];
  if (redeemers) {
    for (const redeemer of canonicalRedeemerEntries(redeemers)) {
      const index = redeemer.index.toString();
      redeemerData.push(
        `${redeemer.tag}:${index}:${redeemer.data.to_canonical_cbor_hex()}`,
      );
      redeemerExUnits.push(
        `${redeemer.tag}:${index}:${redeemer.exUnits.mem()}:${redeemer.exUnits.steps()}`,
      );
    }
  }
  return `${body}|${redeemerData.join(",")}|${redeemerExUnits.join(",")}`;
};

export const normalizeEvalUTxO = ({
  datumHash,
  datum,
  ...rest
}: UTxO): UTxO => ({
  ...rest,
  datumHash,
  datum: datumHash ? undefined : datum,
});
