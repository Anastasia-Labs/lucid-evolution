import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
type CostModel = Record<string, number>;

export type CostModels = Record<PlutusVersion, CostModel>;

export type ProtocolParameters = {
  minFeeA: number;
  minFeeB: number;
  maxTxSize: number;
  maxValSize: number;
  keyDeposit: bigint;
  poolDeposit: bigint;
  drepDeposit: bigint;
  govActionDeposit: bigint;
  priceMem: number;
  priceStep: number;
  maxTxExMem: bigint;
  maxTxExSteps: bigint;
  coinsPerUtxoByte: bigint;
  collateralPercentage: number;
  maxCollateralInputs: number;
  minFeeRefScriptCostPerByte: number;
  costModels: CostModels;
};

export type Slot = number;

export interface Provider {
  getProtocolParameters(): Promise<ProtocolParameters>;
  /** Query UTxOs by address or payment credential. */
  getUtxos(addressOrCredential: Address | Credential): Promise<UTxO[]>;
  /** Query UTxOs by address or payment credential filtered by a specific unit. */
  getUtxosWithUnit(
    addressOrCredential: Address | Credential,
    unit: Unit,
  ): Promise<UTxO[]>;
  /** Query a UTxO by a unit. It needs to be an NFT (or optionally the entire supply in one UTxO). */
  getUtxoByUnit(unit: Unit): Promise<UTxO>;
  /** Query UTxOs by the output reference (tx hash and index). */
  getUtxosByOutRef(outRefs: Array<OutRef>): Promise<UTxO[]>;
  getDelegation(rewardAddress: RewardAddress): Promise<Delegation>;
  getDatum(datumHash: DatumHash): Promise<Datum>;
  awaitTx(txHash: TxHash, checkInterval?: number): Promise<boolean>;
  submitTx(tx: Transaction): Promise<TxHash>;
  evaluateTx(
    tx: Transaction,
    additionalUTxOs?: UTxO[],
  ): Promise<EvalRedeemer[]>;
}

export type EvalRedeemer = {
  ex_units: {
    mem: number;
    steps: number;
  };
  redeemer_index: number;
  redeemer_tag: string;
};

export type Credential = {
  type: "Key" | "Script";
  hash: KeyHash | ScriptHash;
};

/** Concatenation of policy id and asset name in Hex. */
export type Unit = string;
export type Assets = Record<Unit | "lovelace", bigint>;
export type ScriptType = "Native" | PlutusVersion;
export type PlutusVersion = "PlutusV1" | "PlutusV2" | "PlutusV3";

/** Hex */
export type PolicyId = string;

export type Script = { type: ScriptType; script: string };

export type Validator =
  | MintingPolicy
  | SpendingValidator
  | CertificateValidator
  | WithdrawalValidator
  | VoteValidator
  | ProposeValidator;

export type MintingPolicy = Script;
export type SpendingValidator = Script;
export type CertificateValidator = Script;
export type WithdrawalValidator = Script;
export type VoteValidator = Script;
export type ProposeValidator = Script;

/** Bech32 */
export type Address = string;
/** Bech32 */
export type RewardAddress = string;
/** Hex */
export type PaymentKeyHash = string;
/** Hex */
export type StakeKeyHash = string;
/** Hex */
export type KeyHash = string | PaymentKeyHash | StakeKeyHash;
/** Hex */
export type VrfKeyHash = string;
/** Hex */
export type ScriptHash = string;
/** Hex */
export type TxHash = string;
/** Bech32 */
export type PoolId = string;
/** Hex */
export type Datum = string;
/**
 * **hash** adds the datum hash to the output.
 *
 * **asHash** hashes the datum and adds the datum hash to the output and the datum to the witness set.
 *
 * **inline** adds the datum to the output.
 *
 * **scriptRef** will add any script to the output.
 *
 * You can either specify **hash**, **asHash** or **inline**, only one option is allowed.
 */
export type OutputData = {
  hash?: DatumHash;
  asHash?: Datum;
  inline?: Datum;
  scriptRef?: Script;
};
/** Hex */
export type DatumHash = string;
/** Hex (Redeemer is only PlutusData, same as Datum) */
export type Redeemer = string; // Plutus Data (same as Datum)
/** TODO docs  */
export type RedeemerBuilder =
  | {
      kind: "selected";
      makeRedeemer: (inputIndices: bigint[]) => Redeemer;
      inputs: UTxO[];
    }
  | {
      kind: "self";
      makeRedeemer: (inputIndex: bigint) => Redeemer;
      inputs?: UTxO[];
    };
export type Lovelace = bigint;
export type Label = number;
/** Hex */
export type TransactionWitnesses = string;
/** Hex */
export type Transaction = string;
/** Bech32 */
export type PrivateKey = string;
/** Bech32 */
export type PublicKey = string;
/** Hex */
export type ScriptRef = string;
/** Hex */
export type Payload = string;

export type UTxO = OutRef & TxOutput;
export type OutRef = { txHash: TxHash; outputIndex: number };
export type TxOutput = {
  address: Address;
  assets: Assets;
  datumHash?: DatumHash | null;
  datum?: Datum | null;
  scriptRef?: Script | null;
};

export type AddressType =
  | "Base"
  | "Enterprise"
  | "Pointer"
  | "Reward"
  | "Byron";

export type Network = "Mainnet" | "Preview" | "Preprod" | "Custom";

export type AddressDetails = {
  type: AddressType;
  networkId: number;
  address: { bech32: Address; hex: string };
  paymentCredential?: Credential;
  stakeCredential?: Credential;
};

export type Delegation = {
  poolId: PoolId | null;
  rewards: Lovelace;
};

/**
 * A wallet that can be constructed from external data e.g utxos and an address.
 * It doesn't allow you to sign transactions/messages. This needs to be handled separately.
 */
export interface ExternalWallet {
  address: Address;
  utxos?: UTxO[];
  rewardAddress?: RewardAddress;
}

export type SignedMessage = { signature: string; key: string };

export interface Wallet {
  overrideUTxOs(utxos: UTxO[]): void;
  address(): Promise<Address>;
  rewardAddress(): Promise<RewardAddress | null>;
  getUtxos(): Promise<UTxO[]>;
  getUtxosCore(): Promise<Array<CML.TransactionUnspentOutput>>;
  getDelegation(): Promise<Delegation>;
  signTx(tx: CML.Transaction): Promise<CML.TransactionWitnessSet>;
  signMessage(
    address: Address | RewardAddress,
    payload: Payload,
  ): Promise<SignedMessage>;
  submitTx(signedTx: Transaction): Promise<TxHash>;
}

/** JSON object */
// deno-lint-ignore no-explicit-any
export type Json = any;

/** Time in milliseconds */
export type UnixTime = number;

export type PoolParams = {
  poolId: PoolId;
  vrfKeyHash: VrfKeyHash;
  pledge: Lovelace;
  cost: Lovelace;
  margin: number;
  rewardAddress: RewardAddress;
  owners: Array<RewardAddress>;
  relays: Array<Relay>;
  metadataUrl?: string;
};

export type Relay = {
  type: "SingleHostIp" | "SingleHostDomainName" | "MultiHost";
  ipV4?: string;
  ipV6?: string;
  port?: number;
  domainName?: string;
};

/**
 * Represents a cardano-cli JSON script syntax
 *
 * Native type follows the standard described in the
 * {@link https://github.com/IntersectMBO/cardano-node/blob/1.26.1-with-cardano-cli/doc/reference/simple-scripts.md#json-script-syntax JSON script syntax documentation}.
 */
export type Native =
  | { type: "sig"; keyHash: string }
  | { type: "before"; slot: number }
  | { type: "after"; slot: number }
  | { type: "all"; scripts: ReadonlyArray<Native> }
  | { type: "any"; scripts: ReadonlyArray<Native> }
  | { type: "atLeast"; required: number; scripts: ReadonlyArray<Native> };

export type SlotConfig = {
  zeroTime: UnixTime;
  zeroSlot: Slot;
  slotLength: number; // number of milliseconds.
};

export type Exact<T> = T extends infer U ? U : never;

export type Metadata = {
  222: {
    name: string;
    image: string;
    mediaType?: string;
    description?: string;
    files?: {
      name?: string;
      mediaType: string;
      src: string;
    }[];
    [key: string]: Json;
  };
  333: {
    name: string;
    description: string;
    ticker?: string;
    url?: string;
    logo?: string;
    decimals?: number;
    [key: string]: Json;
  };
  444: Metadata["222"] & { decimals?: number };
};

export type DatumJson = {
  int?: number;
  bytes?: string;
  list?: Array<DatumJson>;
  map?: Array<{ k: unknown; v: unknown }>;
  fields?: Array<DatumJson>;
  [constructor: string]: unknown; // number; constructor needs to be simulated like this as optional argument
};

export type Anchor = {
  url: string;
  dataHash: string;
};

export type AlwaysAbstain = {
  __typename: "AlwaysAbstain";
};

export type AlwaysNoConfidence = {
  __typename: "AlwaysNoConfidence";
};

export type DRep = Credential | AlwaysAbstain | AlwaysNoConfidence;

export const isDRepCredential = (deleg: DRep): deleg is Credential =>
  !("__typename" in deleg);

export const isDRepAlwaysAbstain = (deleg: DRep): deleg is AlwaysAbstain =>
  !isDRepCredential(deleg) && deleg.__typename === "AlwaysAbstain";

export const isDRepAlwaysNoConfidence = (
  deleg: DRep,
): deleg is AlwaysNoConfidence =>
  !isDRepCredential(deleg) && deleg.__typename === "AlwaysNoConfidence";

export const toCMLDRep = (drep: DRep): CML.DRep => {
  if (isDRepAlwaysAbstain(drep)) {
    return CML.DRep.new_always_abstain();
  } else if (isDRepAlwaysNoConfidence(drep)) {
    return CML.DRep.new_always_no_confidence();
  } else if (isDRepCredential(drep)) {
    switch (drep.type) {
      case "Key":
        return CML.DRep.new_key(CML.Ed25519KeyHash.from_hex(drep.hash));
      case "Script":
        return CML.DRep.new_script(CML.ScriptHash.from_hex(drep.hash));
      default:
        throw new Error("Invalid DRep type");
    }
  }
  throw new Error("Unsupported");
};
