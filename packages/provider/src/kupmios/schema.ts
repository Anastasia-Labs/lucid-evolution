import * as S from "@effect/schema/Schema";
import { Record } from "effect";

export const JSONRPCSchema = <A, I, R>(schema: S.Schema<A, I, R>) =>
  S.extend(
    S.Struct({
      jsonrpc: S.String,
      method: S.String,
      id: S.NullOr(S.Number),
    }),
    S.Union(S.Struct({ result: schema }), S.Struct({ error: S.Object })),
  );

// export type ProtocolParameters = S.Schema.Type<typeof ProtocolParametersSchema>;
export interface ProtocolParameters
  extends S.Schema.Type<typeof ProtocolParametersSchema> {}

const LovelaceAsset = S.Struct({
  lovelace: S.Number,
});

const TupleNumberFromString = S.compose(
  S.split("/"),
  S.Array(S.NumberFromString),
);

export const ProtocolParametersSchema = S.Struct({
  minFeeCoefficient: S.Number,
  minFeeConstant: S.Struct({ ada: LovelaceAsset }),
  maxBlockBodySize: S.Struct({ bytes: S.Number }),
  maxBlockHeaderSize: S.Struct({ bytes: S.Number }),
  maxTransactionSize: S.Struct({ bytes: S.Number }),
  stakeCredentialDeposit: S.Struct({ ada: LovelaceAsset }),
  stakePoolDeposit: S.Struct({ ada: LovelaceAsset }),
  stakePoolRetirementEpochBound: S.Number,
  desiredNumberOfStakePools: S.Number,
  stakePoolPledgeInfluence: TupleNumberFromString,
  monetaryExpansion: TupleNumberFromString,
  treasuryExpansion: TupleNumberFromString,
  minStakePoolCost: S.Struct({ ada: LovelaceAsset }),
  minUtxoDepositConstant: S.Struct({ ada: LovelaceAsset }),
  minUtxoDepositCoefficient: S.Number,
  plutusCostModels: S.Struct({
    "plutus:v1": S.Array(S.Number),
    "plutus:v2": S.Array(S.Number),
  }),
  scriptExecutionPrices: S.Struct({
    memory: TupleNumberFromString,
    cpu: TupleNumberFromString,
  }),
  maxExecutionUnitsPerTransaction: S.Struct({
    memory: S.Number,
    cpu: S.Number,
  }),
  maxExecutionUnitsPerBlock: S.Struct({ memory: S.Number, cpu: S.Number }),
  maxValueSize: S.Struct({ bytes: S.Number }),
  collateralPercentage: S.Number,
  maxCollateralInputs: S.Number,
  version: S.Struct({ major: S.Number, minor: S.Number }),
});

export const KupoValueSchema = S.Struct({
  coins: S.Number,
  assets: S.Record(S.String, S.Number),
});
export interface KupoValue extends S.Schema.Type<typeof KupoValueSchema> {}

export const KupoUTxO = S.Struct({
  transaction_index: S.Number,
  transaction_id: S.String,
  output_index: S.Number,
  address: S.String,
  value: KupoValueSchema,
  datum_hash: S.NullOr(S.String),
  datum_type: S.optional(S.Literal("hash", "inline")),
  script_hash: S.NullOr(S.String),
  created_at: S.Struct({
    slot_no: S.Number,
    header_hash: S.String,
  }),
  spent_at: S.NullOr(
    S.Struct({
      slot_no: S.Number,
      header_hash: S.String,
    }),
  ),
});

export interface KupoUTxO extends S.Schema.Type<typeof KupoUTxO> {}

export const KupoScriptSchema = S.NullOr(
  S.Struct({
    language: S.Literal("native", "plutus:v1", "plutus:v2"),
    script: S.String,
  }),
);
export type KupoScript = S.Schema.Type<typeof KupoScriptSchema>;

export const KupoDatumSchema = S.NullOr(S.Struct({ datum: S.String }));

export type KupoDatum = S.Schema.Type<typeof KupoDatumSchema>;

export const KupoDelegation = S.NullOr(
  S.Record(
    S.String,
    S.Struct({
      delegate: S.Struct({ id: S.String }),
      rewards: S.Struct({ ada: S.Struct({ lovelace: S.Number }) }),
      deposit: S.Struct({ ada: S.Struct({ lovelace: S.Number }) }),
    }),
  ),
);

type Script = {
  language: "plutus:V1" | "plutus:v2" | "plutus:v3";
  cbor: string;
};

export type Value = {
  ada: { lovelace: number };
} & Asset;

export type Asset = Record<string, Record<string, number>>;

export type AdditionalUTxOs = ReadonlyArray<{
  transaction: { id: string };
  index: number;
  address: string;
  value: Value;
  datumHash?: string | null;
  datum?: string | null;
  script: Script;
}>;
