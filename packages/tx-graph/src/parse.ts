import type {
  Assets,
  Credential,
  Script,
  Transaction,
} from "@lucid-evolution/core-types";
import {
  coreToOutRef,
  coreToTxOutput,
  fromCMLRedeemerTag,
  getAddressDetails,
} from "@lucid-evolution/utils";
import { CML } from "./core.js";
import type {
  TraceAssets,
  TraceCertificate,
  TraceOutRef,
  TraceRedeemer,
  TraceScriptRef,
  TraceStatus,
  TraceTransaction,
  TraceTxOutput,
  TraceUtxo,
  TraceWithdrawal,
} from "./model.js";

export type TxGraphTransactionInput =
  | Transaction
  | CML.Transaction
  | {
      toCBOR: (options?: { canonical: boolean }) => Transaction;
    }
  | {
      toTransaction: () => CML.Transaction;
    };

export type ParseTransactionOptions = {
  readonly label?: string;
  readonly status?: TraceStatus;
};

export const parseTransaction = (
  input: TxGraphTransactionInput,
  options: ParseTransactionOptions = {},
): TraceTransaction => {
  const tx = normalizeTransaction(input);
  const body = tx.body();
  const hash = CML.hash_transaction(body).to_hex();
  const outputs = parseOutputs(hash, body.outputs());
  const mint = parseMint(body.mint());
  const splitMint = splitMintAssets(mint);
  const auxiliaryDataHash = body.auxiliary_data_hash()?.to_hex();

  return {
    hash,
    label: options.label,
    status: options.status ?? "built",
    cbor: tx.to_cbor_hex(),
    sizeBytes: tx.to_cbor_bytes().length,
    fee: body.fee().toString(),
    validityInterval: {
      validFrom: body.validity_interval_start()?.toString(),
      validTo: body.ttl()?.toString(),
    },
    inputs: parseInputList(body.inputs()),
    referenceInputs: parseInputList(body.reference_inputs()),
    collateralInputs: parseInputList(body.collateral_inputs()),
    collateralReturn: parseOptionalOutput(body.collateral_return()),
    totalCollateral: body.total_collateral()?.toString(),
    outputs,
    mint,
    mintedAssets: splitMint.mintedAssets,
    burnedAssets: splitMint.burnedAssets,
    withdrawals: parseWithdrawals(body.withdrawals()),
    certificates: parseCertificates(body.certs()),
    redeemers: parseRedeemers(tx.witness_set().redeemers()),
    requiredSigners: parseRequiredSigners(body.required_signers()),
    auxiliaryDataHash,
  };
};

export const parseTransactionCbor = (
  cbor: Transaction,
  options: ParseTransactionOptions = {},
): TraceTransaction => parseTransaction(cbor, options);

const normalizeTransaction = (
  input: TxGraphTransactionInput,
): CML.Transaction => {
  if (typeof input === "string") {
    return CML.Transaction.from_cbor_hex(input);
  }
  if (hasToTransaction(input)) {
    return input.toTransaction();
  }
  if (isCmlTransaction(input)) {
    return input;
  }
  if (hasToCBOR(input)) {
    return CML.Transaction.from_cbor_hex(input.toCBOR({ canonical: false }));
  }
  throw new TypeError("Unsupported transaction input");
};

const hasToTransaction = (
  input: unknown,
): input is { toTransaction: () => CML.Transaction } =>
  typeof input === "object" &&
  input !== null &&
  "toTransaction" in input &&
  typeof input.toTransaction === "function";

const hasToCBOR = (
  input: unknown,
): input is { toCBOR: (options?: { canonical: boolean }) => Transaction } =>
  typeof input === "object" &&
  input !== null &&
  "toCBOR" in input &&
  typeof input.toCBOR === "function";

const isCmlTransaction = (input: unknown): input is CML.Transaction =>
  typeof input === "object" &&
  input !== null &&
  "body" in input &&
  "witness_set" in input &&
  typeof input.body === "function" &&
  typeof input.witness_set === "function";

const parseInputList = (
  inputs: CML.TransactionInputList | undefined,
): TraceOutRef[] => {
  if (!inputs) return [];
  const result: TraceOutRef[] = [];
  for (let index = 0; index < inputs.len(); index++) {
    result.push(coreToOutRef(inputs.get(index)));
  }
  return result;
};

const parseOutputs = (
  txHash: string,
  outputs: CML.TransactionOutputList,
): TraceUtxo[] => {
  const result: TraceUtxo[] = [];
  for (let index = 0; index < outputs.len(); index++) {
    result.push({
      txHash,
      outputIndex: index,
      ...parseTxOutput(outputs.get(index)),
      resolution: "resolved",
      tags: [],
    });
  }
  return result;
};

const parseOptionalOutput = (
  output: CML.TransactionOutput | undefined,
): TraceTxOutput | undefined => (output ? parseTxOutput(output) : undefined);

const parseTxOutput = (output: CML.TransactionOutput): TraceTxOutput => {
  const txOutput = coreToTxOutput(output);
  const credentials = credentialsOf(txOutput.address);
  return {
    address: txOutput.address,
    paymentCredential: credentials.paymentCredential,
    stakeCredential: credentials.stakeCredential,
    assets: traceAssets(txOutput.assets),
    datumHash: txOutput.datumHash ?? undefined,
    datum: txOutput.datum ?? undefined,
    scriptRef: txOutput.scriptRef
      ? traceScriptRef(txOutput.scriptRef)
      : undefined,
  };
};

const credentialsOf = (
  address: string,
): {
  paymentCredential?: Credential;
  stakeCredential?: Credential;
} => {
  try {
    const { paymentCredential, stakeCredential } = getAddressDetails(address);
    return {
      paymentCredential: paymentCredential ?? undefined,
      stakeCredential: stakeCredential ?? undefined,
    };
  } catch {
    return {};
  }
};

const traceAssets = (assets: Assets): TraceAssets => {
  const result: TraceAssets = {};
  for (const unit of Object.keys(assets).sort()) {
    result[unit] = assets[unit].toString();
  }
  return result;
};

const traceScriptRef = (script: Script): TraceScriptRef => ({
  type: script.type,
  hash: scriptHash(script),
  sizeBytes: script.script.length / 2,
});

const scriptHash = (script: Script): string | undefined => {
  try {
    switch (script.type) {
      case "Native":
        return CML.NativeScript.from_cbor_hex(script.script).hash().to_hex();
      case "PlutusV1":
        return CML.PlutusScript.from_v1(
          CML.PlutusV1Script.from_cbor_hex(script.script),
        )
          .hash()
          .to_hex();
      case "PlutusV2":
        return CML.PlutusScript.from_v2(
          CML.PlutusV2Script.from_cbor_hex(script.script),
        )
          .hash()
          .to_hex();
      case "PlutusV3":
        return CML.PlutusScript.from_v3(
          CML.PlutusV3Script.from_cbor_hex(script.script),
        )
          .hash()
          .to_hex();
    }
  } catch {
    return undefined;
  }
};

const parseMint = (mint: CML.Mint | undefined): TraceAssets => {
  const assets: Assets = {};
  if (!mint) return {};
  const policies = mint.keys();
  for (let policyIndex = 0; policyIndex < policies.len(); policyIndex++) {
    const policy = policies.get(policyIndex);
    const policyId = policy.to_hex();
    const policyAssets = mint.get_assets(policy);
    if (!policyAssets) continue;
    const assetNames = policyAssets.keys();
    for (let assetIndex = 0; assetIndex < assetNames.len(); assetIndex++) {
      const assetName = assetNames.get(assetIndex);
      const quantity = policyAssets.get(assetName);
      if (quantity === undefined || quantity === 0n) continue;
      assets[policyId + assetName.to_js_value()] = quantity;
    }
  }
  return traceAssets(assets);
};

const splitMintAssets = (
  mint: TraceAssets,
): {
  mintedAssets: TraceAssets;
  burnedAssets: TraceAssets;
} => {
  const mintedAssets: TraceAssets = {};
  const burnedAssets: TraceAssets = {};
  for (const unit of Object.keys(mint).sort()) {
    const quantity = BigInt(mint[unit]);
    if (quantity > 0n) {
      mintedAssets[unit] = quantity.toString();
    } else if (quantity < 0n) {
      burnedAssets[unit] = (-quantity).toString();
    }
  }
  return { mintedAssets, burnedAssets };
};

const parseWithdrawals = (
  withdrawals: CML.MapRewardAccountToCoin | undefined,
): TraceWithdrawal[] => {
  if (!withdrawals) return [];
  const result: TraceWithdrawal[] = [];
  const rewardAccounts = withdrawals.keys();
  for (let index = 0; index < rewardAccounts.len(); index++) {
    const rewardAccount = rewardAccounts.get(index);
    const amount = withdrawals.get(rewardAccount);
    if (amount === undefined) continue;
    result.push({
      rewardAddress: rewardAccount.to_address().to_bech32(undefined),
      amount: amount.toString(),
    });
  }
  return result;
};

const parseCertificates = (
  certificates: CML.CertificateList | undefined,
): TraceCertificate[] => {
  if (!certificates) return [];
  const result: TraceCertificate[] = [];
  for (let index = 0; index < certificates.len(); index++) {
    const certificate = certificates.get(index);
    const kind = certificate.kind();
    result.push({
      index,
      kind,
      kindName: certificateKindName(kind),
      cbor: cborHex(certificate),
    });
  }
  return result;
};

const certificateKindName = (kind: number): string => {
  for (const [name, value] of Object.entries(CML.CertificateKind)) {
    if (typeof value === "number" && value === kind) return name;
  }
  return `Unknown(${kind})`;
};

const parseRequiredSigners = (
  signers: CML.Ed25519KeyHashList | undefined,
): string[] => {
  if (!signers) return [];
  const result: string[] = [];
  for (let index = 0; index < signers.len(); index++) {
    result.push(signers.get(index).to_hex());
  }
  return result;
};

const parseRedeemers = (
  redeemers: CML.Redeemers | undefined,
): TraceRedeemer[] => {
  if (!redeemers) return [];
  return canonicalRedeemerEntries(redeemers).map((entry, redeemerListIndex) => ({
    tag: fromCMLRedeemerTag(entry.tag),
    index: entry.index.toString(),
    redeemerListIndex,
    data: entry.data.to_cbor_hex(),
    exUnits: {
      mem: entry.exUnits.mem().toString(),
      steps: entry.exUnits.steps().toString(),
    },
  }));
};

type CanonicalRedeemerEntry = {
  readonly tag: CML.RedeemerTag;
  readonly index: bigint;
  readonly data: CML.PlutusData;
  readonly exUnits: CML.ExUnits;
  readonly sortKey: Uint8Array;
};

const canonicalRedeemerEntries = (
  redeemers: CML.Redeemers,
): CanonicalRedeemerEntry[] => {
  const entries: CanonicalRedeemerEntry[] = [];
  const legacyRedeemers = redeemers.as_arr_legacy_redeemer();
  if (legacyRedeemers) {
    for (let index = 0; index < legacyRedeemers.len(); index++) {
      const redeemer = legacyRedeemers.get(index);
      const tag = redeemer.tag();
      const redeemerIndex = redeemer.index();
      entries.push({
        tag,
        index: redeemerIndex,
        data: redeemer.data(),
        exUnits: redeemer.ex_units(),
        sortKey: redeemerKeyBytes(tag, redeemerIndex),
      });
    }
  }

  const mapRedeemers = redeemers.as_map_redeemer_key_to_redeemer_val();
  if (mapRedeemers) {
    const keys = mapRedeemers.keys();
    for (let index = 0; index < keys.len(); index++) {
      const key = keys.get(index);
      const value = mapRedeemers.get(key);
      if (!value) continue;
      const tag = key.tag();
      const redeemerIndex = key.index();
      entries.push({
        tag,
        index: redeemerIndex,
        data: value.data(),
        exUnits: value.ex_units(),
        sortKey: redeemerKeyBytes(tag, redeemerIndex),
      });
    }
  }

  return entries.sort((left, right) =>
    compareBytes(left.sortKey, right.sortKey),
  );
};

const redeemerKeyBytes = (
  tag: CML.RedeemerTag,
  index: bigint,
): Uint8Array => CML.RedeemerKey.new(tag, index).to_canonical_cbor_bytes();

const compareBytes = (left: Uint8Array, right: Uint8Array): number => {
  if (left.length !== right.length) return left.length - right.length;
  for (let index = 0; index < left.length; index++) {
    if (left[index] !== right[index]) return left[index] - right[index];
  }
  return 0;
};

const cborHex = (value: { to_cbor_hex?: () => string }): string | undefined => {
  try {
    return value.to_cbor_hex?.();
  } catch {
    return undefined;
  }
};
