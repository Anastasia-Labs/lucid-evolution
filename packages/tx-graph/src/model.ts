import type {
  Credential,
  Datum,
  DatumHash,
  RedeemerTag,
  RewardAddress,
  ScriptHash,
  ScriptType,
  Transaction,
  TxHash,
  Unit,
} from "@lucid-evolution/core-types";

export type TraceAmount = string;

export type TraceAssets = Record<Unit | "lovelace", TraceAmount>;

export type TraceOutRef = {
  readonly txHash: TxHash;
  readonly outputIndex: number;
};

export type TraceStatus =
  | "built"
  | "signed"
  | "submitted"
  | "confirmed"
  | "failed";

export type TraceScriptRef = {
  readonly type: ScriptType;
  readonly hash?: ScriptHash;
  readonly sizeBytes: number;
};

export type TraceTxOutput = {
  readonly address: string;
  readonly paymentCredential?: Credential;
  readonly stakeCredential?: Credential;
  readonly assets: TraceAssets;
  readonly datumHash?: DatumHash;
  readonly datum?: Datum;
  readonly scriptRef?: TraceScriptRef;
};

export type TraceUtxo = TraceOutRef &
  TraceTxOutput & {
    readonly resolution: "resolved" | "unresolved" | "genesis";
    readonly unresolvedReason?: string;
    readonly tags: string[];
  };

export type TraceRedeemer = {
  readonly tag: RedeemerTag;
  readonly index: TraceAmount;
  readonly redeemerListIndex: number;
  readonly data: string;
  readonly exUnits: {
    readonly mem: TraceAmount;
    readonly steps: TraceAmount;
  };
};

export type TraceEvaluationRedeemer = {
  readonly tag: RedeemerTag;
  readonly redeemerIndex: number;
  readonly exUnits: {
    readonly mem: TraceAmount;
    readonly steps: TraceAmount;
  };
};

export type TraceWithdrawal = {
  readonly rewardAddress: RewardAddress;
  readonly amount: TraceAmount;
};

export type TraceCertificate = {
  readonly index: number;
  readonly kind: number;
  readonly kindName: string;
  readonly cbor?: string;
};

export type TraceValidityInterval = {
  readonly validFrom?: TraceAmount;
  readonly validTo?: TraceAmount;
};

export type TraceTransaction = {
  readonly hash: TxHash;
  readonly label?: string;
  readonly status: TraceStatus;
  readonly failureMessage?: string;
  readonly cbor: Transaction;
  readonly sizeBytes: number;
  readonly fee: TraceAmount;
  readonly validityInterval: TraceValidityInterval;
  readonly inputs: TraceOutRef[];
  readonly referenceInputs: TraceOutRef[];
  readonly collateralInputs: TraceOutRef[];
  readonly collateralReturn?: TraceTxOutput;
  readonly totalCollateral?: TraceAmount;
  readonly outputs: TraceUtxo[];
  readonly mint: TraceAssets;
  readonly mintedAssets: TraceAssets;
  readonly burnedAssets: TraceAssets;
  readonly withdrawals: TraceWithdrawal[];
  readonly certificates: TraceCertificate[];
  readonly redeemers: TraceRedeemer[];
  readonly evaluation?: TraceEvaluationRedeemer[];
  readonly requiredSigners: string[];
  readonly auxiliaryDataHash?: string;
};

export type TraceEdgeKind =
  | "spends"
  | "reads"
  | "collateral"
  | "collateralReturn"
  | "produces"
  | "mints"
  | "burns"
  | "withdraws"
  | "certifies"
  | "requiresSigner";

export type TraceEdge = {
  readonly kind: TraceEdgeKind;
  readonly from: string;
  readonly to: string;
};

export type TraceWarning = {
  readonly code: string;
  readonly message: string;
  readonly txHash?: TxHash;
  readonly outRef?: TraceOutRef;
};

export type TraceAliases = {
  readonly assets: Record<string, string>;
  readonly addresses: Record<string, string>;
};

export type TxGraphTrace = {
  readonly version: 1;
  readonly createdAt?: string;
  readonly transactions: TraceTransaction[];
  readonly utxos: Record<string, TraceUtxo>;
  readonly edges: TraceEdge[];
  readonly warnings: TraceWarning[];
  readonly aliases: TraceAliases;
};
