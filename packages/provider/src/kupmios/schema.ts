import * as S from "@effect/schema/Schema";

export const JSONRPCSchema = <A, I, R>(schema: S.Schema<A, I, R>) =>
  S.Struct({
    jsonrpc: S.Literal("2.0"),
    method: S.String,
    result: schema,
    id: S.NullOr(S.Number),
  });

export type ProtocolParameters = S.Schema.Type<typeof ProtocolParametersSchema>;

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
