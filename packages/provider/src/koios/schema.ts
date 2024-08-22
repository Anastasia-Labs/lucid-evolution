import * as S from "@effect/schema/Schema";

export const ProtocolParametersSchema = S.Struct({
  epoch_no: S.Number,
  min_fee_a: S.Number,
  min_fee_b: S.Number,
  max_block_size: S.Number,
  max_tx_size: S.Number,
  max_bh_size: S.Number,
  key_deposit: S.BigInt,
  pool_deposit: S.BigInt,
  drep_deposit: S.BigInt,
  gov_action_deposit: S.BigInt,
  max_epoch: S.Number,
  optimal_pool_count: S.Number,
  influence: S.Number,
  monetary_expand_rate: S.Number,
  treasury_growth_rate: S.Number,
  decentralisation: S.Number,
  extra_entropy: S.NullOr(S.String),
  protocol_major: S.Number,
  protocol_minor: S.Number,
  min_utxo_value: S.String,
  min_pool_cost: S.String,
  nonce: S.String,
  block_hash: S.NullOr(S.String),
  cost_models: S.Struct({
    PlutusV1: S.Array(S.Number),
    PlutusV2: S.Array(S.Number),
    PlutusV3: S.Array(S.Number),
  }),
  price_mem: S.Number,
  price_step: S.Number,
  max_tx_ex_mem: S.BigIntFromNumber,
  max_tx_ex_steps: S.BigIntFromNumber,
  max_block_ex_mem: S.Number,
  max_block_ex_steps: S.Number,
  max_val_size: S.Number,
  collateral_percent: S.Number,
  max_collateral_inputs: S.Number,
  coins_per_utxo_size: S.BigInt,
});
export type ProtocolParameters = S.Schema.Type<typeof ProtocolParametersSchema>;

export const KoiosAssetSchema = S.Struct({
  policy_id: S.String,
  asset_name: S.NullOr(S.String),
  fingerprint: S.String,
  decimals: S.Number,
  quantity: S.String,
});

export type KoiosAsset = S.Schema.Type<typeof KoiosAssetSchema>;

export const KoiosUTxOSchema = S.Struct({
  tx_hash: S.String,
  tx_index: S.Number,
  block_height: S.NullOr(S.Number),
  value: S.String,
  datum_hash: S.NullOr(S.String),
  inline_datum: S.NullOr(
    S.Struct({
      bytes: S.String,
      value: S.Object,
    }),
  ),
  reference_script: S.NullOr(
    S.Struct({
      hash: S.String,
      size: S.Number,
      type: S.String,
      bytes: S.String,
      value: S.NullOr(S.Object),
    }),
  ),
  asset_list: S.NullOr(S.Array(KoiosAssetSchema)),
});

export type KoiosUTxO = S.Schema.Type<typeof KoiosUTxOSchema>;

export const KoiosAddressInfoSchema = S.Array(
  S.NullishOr(
    S.Struct({
      address: S.String,
      balance: S.String,
      stake_address: S.NullOr(S.String),
      script_address: S.Boolean,
      utxo_set: S.Array(KoiosUTxOSchema),
    }),
  ),
);

export type KoiosAddressInfo = S.Schema.Type<typeof KoiosAddressInfoSchema>;

export const KoiosInputOutputSchema = S.Struct({
  payment_addr: S.Struct({
    bech32: S.String,
    cred: S.String,
  }),
  stake_addr: S.NullOr(S.String),
  tx_hash: S.String,
  tx_index: S.Number,
  value: S.String,
  datum_hash: S.NullOr(S.String),
  inline_datum: S.NullOr(
    S.Struct({
      bytes: S.String,
      value: S.Object,
    }),
  ),
  reference_script: S.NullOr(
    S.Struct({
      hash: S.String,
      size: S.Number,
      type: S.String,
      bytes: S.String,
      value: S.NullOr(S.Object),
    }),
  ),
  asset_list: S.Union(S.Array(KoiosAssetSchema), S.String),
});

export type KoiosInputOutput = S.Schema.Type<typeof KoiosInputOutputSchema>;

export const KoiosTxInfoSchema = S.Struct({
  tx_hash: S.String,
  block_hash: S.String,
  block_height: S.Number,
  epoch_no: S.Number,
  epoch_slot: S.Number,
  absolute_slot: S.Number,
  tx_timestamp: S.Number,
  tx_block_index: S.Number,
  tx_size: S.Number,
  total_output: S.String,
  fee: S.String,
  deposit: S.String,
  invalid_before: S.NullOr(S.String),
  invalid_after: S.NullOr(S.String),
  collateral_inputs: S.NullOr(S.Array(KoiosInputOutputSchema)),
  collateral_output: S.NullOr(KoiosInputOutputSchema),
  reference_inputs: S.NullOr(S.Array(KoiosInputOutputSchema)),
  inputs: S.Array(KoiosInputOutputSchema),
  outputs: S.Array(KoiosInputOutputSchema),
  withdrawals: S.NullOr(
    S.Array(
      S.Struct({
        amount: S.String,
        stake_addr: S.String,
      }),
    ),
  ),
  assets_minted: S.NullOr(S.Array(KoiosAssetSchema)),
  metadata: S.NullOr(S.Object),
  certificates: S.NullOr(
    S.Array(
      S.Struct({
        index: S.Number,
        type: S.String,
        info: S.NullOr(S.Object),
      }),
    ),
  ),
  native_scripts: S.NullOr(
    S.Array(
      S.Struct({
        script_hash: S.String,
        script_json: S.Object,
      }),
    ),
  ),
  plutus_contracts: S.NullOr(
    S.Array(
      S.Struct({
        address: S.String,
        spends_input: S.NullOr(
          S.Struct({
            tx_hash: S.String,
            tx_index: S.Number,
          }),
        ),
        script_hash: S.String,
        bytecode: S.String,
        size: S.Number,
        valid_contract: S.Boolean,
        input: S.Struct({
          redeemer: S.Struct({
            purpose: S.Literal("spend", "mint", "cert", "reward"),
            fee: S.String,
            unit: S.Struct({
              steps: S.String,
              mem: S.String,
            }),
            datum: S.Struct({
              hash: S.NullOr(S.String),
              value: S.NullOr(S.Object),
            }),
          }),
          datum: S.Struct({
            hash: S.NullOr(S.String),
            value: S.NullOr(S.Object),
          }),
        }),
      }),
    ),
  ),
});

export type KoiosTxInfo = S.Schema.Type<typeof KoiosTxInfoSchema>;
