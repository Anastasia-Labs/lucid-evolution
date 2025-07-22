import { FetchHttpClient, HttpBody, HttpClientError } from "@effect/platform";
import { Effect, pipe, Schema as S } from "effect";
import * as CoreType from "@evolution-sdk/core-types";
import { applyDoubleCborEncoding } from "@evolution-sdk/utils";
import { ParseError } from "effect/ParseResult";
import * as HttpUtils from "./HttpUtils.js";

export const ProtocolParametersSchema = S.Struct({
  pvt_motion_no_confidence: S.Number,
  pvt_committee_normal: S.Number,
  pvt_committee_no_confidence: S.Number,
  pvt_hard_fork_initiation: S.Number,
  pvtpp_security_group: S.Number,
  dvt_motion_no_confidence: S.Number,
  dvt_committee_normal: S.Number,
  dvt_committee_no_confidence: S.Number,
  dvt_update_to_constitution: S.Number,
  dvt_hard_fork_initiation: S.Number,
  dvt_p_p_network_group: S.Number,
  dvt_p_p_economic_group: S.Number,
  dvt_p_p_technical_group: S.Number,
  dvt_p_p_gov_group: S.Number,
  dvt_treasury_withdrawal: S.Number,
  committee_min_size: S.Number,
  committee_max_term_length: S.Number,
  gov_action_lifetime: S.Number,
  gov_action_deposit: S.NumberFromString,
  drep_deposit: S.NumberFromString,
  drep_activity: S.Number,
  min_fee_ref_script_cost_per_byte: S.Number,
  epoch_no: S.Number,
  min_fee_a: S.Number,
  min_fee_b: S.Number,
  max_block_size: S.Number,
  max_tx_size: S.Number,
  max_bh_size: S.Number,
  key_deposit: S.BigInt,
  pool_deposit: S.BigInt,
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
export interface ProtocolParameters
  extends S.Schema.Type<typeof ProtocolParametersSchema> {}

export const AssetSchema = S.Struct({
  policy_id: S.String,
  asset_name: S.NullOr(S.String),
  fingerprint: S.String,
  decimals: S.Number,
  quantity: S.String,
});

export interface Asset extends S.Schema.Type<typeof AssetSchema> {}

const ReferenceScriptSchema = S.Struct({
  hash: S.NullOr(S.String),
  size: S.NullOr(S.Number),
  type: S.NullOr(S.String),
  bytes: S.NullOr(S.String),
  value: S.NullOr(S.Object),
});

export interface ReferenceScript
  extends S.Schema.Type<typeof ReferenceScriptSchema> {}

export const UTxOSchema = S.Struct({
  tx_hash: S.String,
  tx_index: S.Number,
  block_time: S.Number,
  block_height: S.NullOr(S.Number),
  value: S.String,
  datum_hash: S.NullOr(S.String),
  inline_datum: S.NullOr(
    S.Struct({
      bytes: S.String,
      value: S.Object,
    }),
  ),
  reference_script: S.NullOr(ReferenceScriptSchema),
  asset_list: S.NullOr(S.Array(AssetSchema)),
});

export interface UTxO extends S.Schema.Type<typeof UTxOSchema> {}

export const AddressInfoSchema = S.Array(
  S.NullishOr(
    S.Struct({
      address: S.String,
      balance: S.String,
      stake_address: S.NullOr(S.String),
      script_address: S.Boolean,
      utxo_set: S.Array(UTxOSchema),
    }),
  ),
);

export interface AddressInfo extends S.Schema.Type<typeof AddressInfoSchema> {}

export const InputOutputSchema = S.Struct({
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
  reference_script: S.NullOr(ReferenceScriptSchema),
  asset_list: S.Array(AssetSchema),
});

export interface InputOutput extends S.Schema.Type<typeof InputOutputSchema> {}

export const TxInfoSchema = S.Struct({
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
  treasury_donation: S.String,
  deposit: S.String,
  invalid_before: S.NullOr(S.String),
  invalid_after: S.NullOr(S.String),
  collateral_inputs: S.NullOr(S.Array(InputOutputSchema)),
  collateral_output: S.NullOr(InputOutputSchema),
  reference_inputs: S.NullOr(S.Array(InputOutputSchema)),
  inputs: S.Array(InputOutputSchema),
  outputs: S.Array(InputOutputSchema),
  withdrawals: S.NullOr(
    S.Array(
      S.Struct({
        amount: S.String,
        stake_addr: S.String,
      }),
    ),
  ),
  assets_minted: S.NullOr(S.Array(AssetSchema)),
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
  //TODO: add S.Struct
  // https://preprod.koios.rest/#post-/tx_info
  voting_procedures: S.Array(S.Object),
  //TODO: add S.Struct
  // https://preprod.koios.rest/#post-/tx_info
  proposal_procedures: S.Object,
});

export interface TxInfo extends S.Schema.Type<typeof TxInfoSchema> {}

export const TxHashSchema = S.String;

export const AssetAddressSchema = S.Struct({
  payment_address: S.String,
  stake_address: S.NullOr(S.String),
  quantity: S.String,
});

export interface AssetAddress
  extends S.Schema.Type<typeof AssetAddressSchema> {}

//NOTE: account_info schema is not complete
// https://preprod.koios.rest/#post-/account_info
export const AccountInfoSchema = S.Struct({
  delegated_pool: S.NullOr(S.String),
  rewards_available: S.NumberFromString,
});

//NOTE: datum_info schema is not complete
// https://preprod.koios.rest/#post-/datum_info
export const DatumInfo = S.Struct({
  bytes: S.String,
});

export const getHeadersWithToken = (
  token?: string,
  headers: Record<string, string> = {},
): Record<string, string> => {
  if (token) {
    return {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return headers;
};

export const toUTxO = (koiosUTxO: UTxO, address: string): CoreType.UTxO => ({
  txHash: koiosUTxO.tx_hash,
  outputIndex: koiosUTxO.tx_index,
  assets: (() => {
    const a: CoreType.Assets = {};
    if (koiosUTxO.asset_list) {
      koiosUTxO.asset_list.forEach((am: Asset) => {
        a[am.policy_id + am.asset_name] = BigInt(am.quantity);
      });
    }
    a["lovelace"] = BigInt(koiosUTxO.value);
    return a;
  })(),
  address: address,
  datumHash: koiosUTxO.inline_datum
    ? undefined
    : koiosUTxO.datum_hash || undefined,
  datum: koiosUTxO.inline_datum ? koiosUTxO.inline_datum.bytes : undefined,
  scriptRef: toScriptRef(koiosUTxO.reference_script),
});

const toScriptRef = (
  reference_script: ReferenceScript | null,
): CoreType.Script | undefined => {
  if (reference_script && reference_script.bytes && reference_script.type) {
    switch (reference_script.type) {
      case "plutusV1":
        return {
          type: "PlutusV1" as const,
          script: applyDoubleCborEncoding(reference_script.bytes),
        };
      case "plutusV2":
        return {
          type: "PlutusV2" as const,
          script: applyDoubleCborEncoding(reference_script.bytes),
        };
      case "plutusV3":
        return {
          type: "PlutusV3" as const,
          script: applyDoubleCborEncoding(reference_script.bytes),
        };
      default:
        return undefined;
    }
  }
};

export const getUtxosEffect = (
  baseUrl: string,
  addressOrCredential: CoreType.Address | CoreType.Credential,
  headers: Record<string, string> | undefined,
): Effect.Effect<
  CoreType.UTxO[],
  | string
  | HttpBody.HttpBodyError
  | HttpClientError.HttpClientError
  | ParseError,
  never
> => {
  const url = `${baseUrl}/address_info`;
  const body = {
    _addresses: [addressOrCredential],
  };
  const schema = AddressInfoSchema;
  const result = pipe(
    Effect.if(typeof addressOrCredential === "string", {
      onFalse: () =>
        Effect.fail("Credential Type is not supported in Koios yet."),
      onTrue: () => HttpUtils.makePostAsJson(url, body, schema, headers),
    }),
    Effect.map(([result]) =>
      result
        ? result.utxo_set.map((koiosUtxo) => toUTxO(koiosUtxo, result.address))
        : [],
    ),
    Effect.provide(FetchHttpClient.layer),
  );
  return result;
};
