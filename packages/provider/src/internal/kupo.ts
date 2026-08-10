import { Schema as S } from "effect";

const QuantitySchema = S.Union(
  S.Number.pipe(S.filter(Number.isSafeInteger)),
  S.String.pipe(S.pattern(/^\d+$/)),
);

export const ValueSchema = S.Struct({
  coins: QuantitySchema,
  assets: S.Record({ key: S.String, value: QuantitySchema }),
});
export interface Value extends S.Schema.Type<typeof ValueSchema> {}

const PointSchema = S.Struct({
  slot_no: S.Number,
  header_hash: S.String,
});

export const ScriptSchema = S.NullOr(
  S.Struct({
    language: S.Literal("native", "plutus:v1", "plutus:v2", "plutus:v3"),
    script: S.String,
  }),
);
export type Script = S.Schema.Type<typeof ScriptSchema>;

const UTxOFields = {
  transaction_index: S.Number,
  transaction_id: S.String,
  output_index: S.Number,
  address: S.String,
  value: ValueSchema,
  datum_hash: S.NullOr(S.String),
  datum_type: S.optional(S.Literal("hash", "inline")),
  script_hash: S.NullOr(S.String),
  created_at: PointSchema,
  spent_at: S.NullOr(PointSchema),
};

export const UTxOSchema = S.Struct(UTxOFields);

export interface UTxO extends S.Schema.Type<typeof UTxOSchema> {}

export const ResolvedUTxOSchema = S.Struct({
  ...UTxOFields,
  datum: S.NullOr(S.String),
  script: ScriptSchema,
});

export interface ResolvedUTxO
  extends S.Schema.Type<typeof ResolvedUTxOSchema> {}

export const DatumSchema = S.NullOr(S.Struct({ datum: S.String }));

export type Datum = S.Schema.Type<typeof DatumSchema>;

export const DelegationSchema = S.NullOr(
  S.Record({
    key: S.String,
    value: S.Struct({
      delegate: S.Struct({ id: S.String }),
      rewards: S.Struct({ ada: S.Struct({ lovelace: S.Number }) }),
      deposit: S.Struct({ ada: S.Struct({ lovelace: S.Number }) }),
    }),
  }),
);
