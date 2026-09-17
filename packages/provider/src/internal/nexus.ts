import {
  HttpClient,
  HttpClientError,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import { Effect, Option, pipe, Schema as S } from "effect";
import * as CoreType from "@lucid-evolution/core-types";
import { applyDoubleCborEncoding } from "@lucid-evolution/utils";

/**
 * Nexus network query values, sent as `?network=` on every request.
 * Mapped from the lucid-style `"Mainnet" | "Preprod" | "Preview"` network name.
 */
export type NexusNetwork =
  | "CARDANO_MAINNET"
  | "CARDANO_PREPROD"
  | "CARDANO_PREVIEW";

export type NexusSupportedNetworks = "Mainnet" | "Preprod" | "Preview";

export const NETWORK_MAP: Record<NexusSupportedNetworks, NexusNetwork> = {
  Mainnet: "CARDANO_MAINNET",
  Preprod: "CARDANO_PREPROD",
  Preview: "CARDANO_PREVIEW",
};

// -----------------------------------------------------------------------------
// HTTP helpers
//
// Nexus surfaces a JSON error envelope on non-2xx responses: `{ error, message? }`.
// We parse it and surface only the envelope's message (never the raw response body)
// via the ResponseError's `description`, which composes cleanly into its `.message`.
// -----------------------------------------------------------------------------

const ErrorEnvelopeSchema = S.Struct({
  error: S.optional(S.String),
  message: S.optional(S.String),
});

export const filterStatusOk = (
  self: HttpClientResponse.HttpClientResponse,
): Effect.Effect<
  HttpClientResponse.HttpClientResponse,
  HttpClientError.ResponseError
> =>
  self.status >= 200 && self.status < 300
    ? Effect.succeed(self)
    : pipe(
        self.json,
        Effect.map((body) => S.decodeUnknownOption(ErrorEnvelopeSchema)(body)),
        Effect.catchAll(() => Effect.succeed(Option.none())),
        Effect.flatMap((envelope) => {
          const description = Option.isSome(envelope)
            ? (envelope.value.message ?? envelope.value.error)
            : undefined;
          return Effect.fail(
            new HttpClientError.ResponseError({
              response: self,
              request: self.request,
              reason: "StatusCode",
              description:
                description ??
                `Nexus request failed with status ${self.status}`,
            }),
          );
        }),
      );

export const makeGet = <A, I>(
  url: string,
  schema: S.Schema<A, I, never>,
  headers: Record<string, string>,
) =>
  pipe(
    HttpClientRequest.get(url),
    HttpClientRequest.setHeaders(headers),
    HttpClient.execute,
    Effect.flatMap(filterStatusOk),
    Effect.flatMap(HttpClientResponse.schemaBodyJson(schema)),
    Effect.scoped,
  );

export const makePostAsJson = <A, I>(
  url: string,
  data: unknown,
  schema: S.Schema<A, I, never>,
  headers: Record<string, string>,
) =>
  pipe(
    HttpClientRequest.post(url),
    HttpClientRequest.setHeaders(headers),
    HttpClientRequest.bodyJson(data),
    Effect.flatMap(HttpClient.execute),
    Effect.flatMap(filterStatusOk),
    Effect.flatMap(HttpClientResponse.schemaBodyJson(schema)),
    Effect.scoped,
  );

export const makePostText = (
  url: string,
  body: string,
  headers: Record<string, string>,
) =>
  pipe(
    HttpClientRequest.post(url),
    HttpClientRequest.setHeaders(headers),
    HttpClientRequest.bodyText(body, "text/plain"),
    HttpClient.execute,
    Effect.flatMap(filterStatusOk),
    Effect.flatMap((response) => response.text),
    Effect.scoped,
  );

/**
 * GET that treats a 404 response as `null` instead of a failure — used for
 * endpoints where "not found" is an expected, meaningful outcome (account info,
 * transaction lookups for `awaitTx`). Any other non-2xx status still fails.
 */
export const getOptionalJson = <A, I>(
  url: string,
  schema: S.Schema<A, I, never>,
  headers: Record<string, string>,
) =>
  pipe(
    HttpClientRequest.get(url),
    HttpClientRequest.setHeaders(headers),
    HttpClient.execute,
    Effect.flatMap((response) =>
      response.status === 404
        ? Effect.succeed(null)
        : pipe(
            filterStatusOk(response),
            Effect.flatMap(HttpClientResponse.schemaBodyJson(schema)),
          ),
    ),
    Effect.scoped,
  );

// -----------------------------------------------------------------------------
// Protocol parameters — GET /api/epoch/latest/parameters
// -----------------------------------------------------------------------------

// NOTE: Nexus serializes missing values as EXPLICIT JSON nulls, not absent
// keys (wire-verified). `S.optional(X)` alone rejects an explicit null, so
// every non-required field below is `S.optional(S.NullOr(X))` — absent and
// null are both accepted and normalized by the mappers.
export const ProtocolParametersSchema = S.Struct({
  minFeeA: S.Number,
  minFeeB: S.Number,
  maxTxSize: S.Number,
  maxValSize: S.String,
  keyDeposit: S.String,
  poolDeposit: S.String,
  drepDeposit: S.optional(S.NullOr(S.Union(S.String, S.Number))),
  govActionDeposit: S.optional(S.NullOr(S.Union(S.String, S.Number))),
  priceMem: S.Number,
  priceStep: S.Number,
  maxTxExMem: S.String,
  maxTxExSteps: S.String,
  coinsPerUtxoSize: S.String,
  collateralPercent: S.Number,
  maxCollateralInputs: S.Number,
  minFeeRefScriptCostPerByte: S.optional(S.NullOr(S.Number)),
  protocolMajorVer: S.optional(S.NullOr(S.Number)),
  protocolMinorVer: S.optional(S.NullOr(S.Number)),
  costModels: S.Record({
    key: S.String,
    value: S.Record({ key: S.String, value: S.Number }),
  }),
}).annotations({ identifier: "NexusProtocolParametersSchema" });

export interface ProtocolParameters
  extends S.Schema.Type<typeof ProtocolParametersSchema> {}

const COST_MODEL_KEY_PATTERN = /plutus[:_\s-]?v?(1|2|3)/i;

/**
 * Normalizes a Nexus cost-model key (`PlutusV1`, `plutusV1`, `PLUTUS_V2`, `plutus:v3`, ...)
 * to the canonical lucid key, or `undefined` if it doesn't match a known Plutus version.
 */
const normalizeCostModelKey = (
  key: string,
): CoreType.PlutusVersion | undefined => {
  const match = COST_MODEL_KEY_PATTERN.exec(key);
  if (!match) return undefined;
  return `PlutusV${match[1]}` as CoreType.PlutusVersion;
};

/**
 * Converts a cost-model object (keyed either by numeric operation index or by
 * op name) into the ordered `number[]` lucid expects: if every key is a numeric
 * string, sort numerically and take the values in that order; otherwise fall
 * back to `Object.values` insertion order.
 */
const costModelToArray = (model: Record<string, number>): number[] => {
  const keys = Object.keys(model);
  const allNumeric = keys.length > 0 && keys.every((key) => /^\d+$/.test(key));
  const orderedKeys = allNumeric
    ? [...keys].sort((a, b) => Number(a) - Number(b))
    : keys;
  return orderedKeys.map((key) => model[key]!);
};

export const toProtocolParameters = (
  dto: ProtocolParameters,
): CoreType.ProtocolParameters => {
  const costModels: Partial<CoreType.CostModels> = {};
  for (const [key, model] of Object.entries(dto.costModels)) {
    const version = normalizeCostModelKey(key);
    if (!version) continue;
    costModels[version] = costModelToArray(model);
  }
  const requiredVersions: CoreType.PlutusVersion[] = [
    "PlutusV1",
    "PlutusV2",
    "PlutusV3",
  ];
  const missing = requiredVersions.filter(
    (version) => !(version in costModels),
  );
  if (missing.length > 0) {
    throw new Error(
      `Nexus protocol parameters are missing cost model(s): ${missing.join(", ")}`,
    );
  }

  return {
    protocolMajorVersion: dto.protocolMajorVer ?? undefined,
    protocolMinorVersion: dto.protocolMinorVer ?? undefined,
    minFeeA: dto.minFeeA,
    minFeeB: dto.minFeeB,
    maxTxSize: dto.maxTxSize,
    maxValSize: Number(dto.maxValSize),
    keyDeposit: BigInt(dto.keyDeposit),
    poolDeposit: BigInt(dto.poolDeposit),
    drepDeposit: BigInt(dto.drepDeposit ?? 0),
    govActionDeposit: BigInt(dto.govActionDeposit ?? 0),
    priceMem: dto.priceMem,
    priceStep: dto.priceStep,
    maxTxExMem: BigInt(dto.maxTxExMem),
    maxTxExSteps: BigInt(dto.maxTxExSteps),
    coinsPerUtxoByte: BigInt(dto.coinsPerUtxoSize),
    collateralPercentage: dto.collateralPercent,
    maxCollateralInputs: dto.maxCollateralInputs,
    minFeeRefScriptCostPerByte: dto.minFeeRefScriptCostPerByte ?? 0,
    costModels: costModels as CoreType.CostModels,
  };
};

// -----------------------------------------------------------------------------
// Address / asset UTxOs — GET .../utxos, GET .../utxos/{unit}, GET /api/assets/{unit}/utxos
// -----------------------------------------------------------------------------

export const InlineDatumSchema = S.Struct({
  bytes: S.optional(S.NullOr(S.String)),
  value: S.optional(S.Unknown),
});

export const ReferenceScriptSchema = S.Struct({
  hash: S.optional(S.NullOr(S.String)),
  size: S.optional(S.NullOr(S.Number)),
  type: S.optional(S.NullOr(S.String)),
  bytes: S.optional(S.NullOr(S.String)),
});
export interface ReferenceScript
  extends S.Schema.Type<typeof ReferenceScriptSchema> {}

export const AssetBalanceSchema = S.Struct({
  unit: S.String,
  quantity: S.String,
  policyId: S.optional(S.NullOr(S.String)),
  assetName: S.optional(S.NullOr(S.String)),
});

export const AddressUtxoSchema = S.Struct({
  txHash: S.String,
  txIndex: S.Number,
  address: S.String,
  stakeAddress: S.optional(S.NullOr(S.String)),
  paymentCred: S.optional(S.NullOr(S.String)),
  /** Lovelace amount as a string. */
  value: S.String,
  datumHash: S.optional(S.NullOr(S.String)),
  inlineDatum: S.optional(S.NullOr(InlineDatumSchema)),
  referenceScript: S.optional(S.NullOr(ReferenceScriptSchema)),
  assets: S.optional(S.NullOr(S.Array(AssetBalanceSchema))),
  spent: S.optional(S.NullOr(S.Boolean)),
}).annotations({ identifier: "NexusAddressUtxoSchema" });

export interface AddressUtxo extends S.Schema.Type<typeof AddressUtxoSchema> {}

const normalizeScriptType = (
  type: string | null | undefined,
): CoreType.ScriptType => {
  const normalized = (type ?? "").toLowerCase();
  if (normalized.includes("v1")) return "PlutusV1";
  if (normalized.includes("v3")) return "PlutusV3";
  if (normalized.includes("native") || normalized.includes("timelock"))
    return "Native";
  return "PlutusV2";
};

/**
 * The out-ref endpoint returns `script_ref` as language-tagged CBOR:
 * `82 0X <script>` where X is 00 → Native, 01 → PlutusV1, 02 → PlutusV2,
 * 03 → PlutusV3 (wire-verified: the discovery UTxO's script_ref starts
 * `8202...`). The tag both selects the script type and must be stripped
 * from the script bytes.
 */
const SCRIPT_REF_LANGUAGE_TAGS: Record<string, CoreType.ScriptType> = {
  "8200": "Native",
  "8201": "PlutusV1",
  "8202": "PlutusV2",
  "8203": "PlutusV3",
};

export const unwrapScriptRef = (cborHex: string): CoreType.Script => {
  const type = SCRIPT_REF_LANGUAGE_TAGS[cborHex.slice(0, 4).toLowerCase()];
  if (type) {
    const script = cborHex.slice(4);
    return {
      type,
      script: type === "Native" ? script : applyDoubleCborEncoding(script),
    };
  }
  // No recognized language prefix — treat the whole string as the script.
  return { type: "PlutusV2", script: applyDoubleCborEncoding(cborHex) };
};

const toScriptRef = (
  referenceScript: ReferenceScript | null | undefined,
): CoreType.Script | undefined => {
  if (referenceScript?.bytes) {
    // Defensive: some backends surface the language-tagged `82 0X ...` CBOR
    // here too — the embedded tag is authoritative when present.
    if (SCRIPT_REF_LANGUAGE_TAGS[referenceScript.bytes.slice(0, 4)]) {
      return unwrapScriptRef(referenceScript.bytes);
    }
    return {
      type: normalizeScriptType(referenceScript.type),
      script: applyDoubleCborEncoding(referenceScript.bytes),
    };
  }
  return undefined;
};

// NOTE: absent-value semantics mirror internal/koios.ts `toUTxO`: datum,
// datumHash, and scriptRef are `undefined` (not null) when absent, so UTxOs
// compare equal (`toStrictEqual`) with the other built-in providers' output.
export const toUTxO = (dto: AddressUtxo): CoreType.UTxO => {
  const assets: CoreType.Assets = { lovelace: BigInt(dto.value) };
  (dto.assets ?? []).forEach((asset) => {
    assets[asset.unit] = BigInt(asset.quantity);
  });
  const datum = dto.inlineDatum?.bytes || undefined;
  return {
    txHash: dto.txHash,
    outputIndex: dto.txIndex,
    address: dto.address,
    assets,
    datumHash: datum ? undefined : dto.datumHash || undefined,
    datum,
    scriptRef: toScriptRef(dto.referenceScript),
  };
};

// -----------------------------------------------------------------------------
// Out-ref UTxOs — POST /api/transactions/utxos
//
// NOTE: unlike the address/asset endpoints above (camelCase), this endpoint's
// response is snake_case — wire-verified fact, not an inconsistency to "fix".
// -----------------------------------------------------------------------------

export const OutRefRequestSchema = S.Struct({
  txHash: S.String,
  outputIndex: S.Number,
});
export interface OutRefRequest
  extends S.Schema.Type<typeof OutRefRequestSchema> {}

export const OutRefAmountSchema = S.Struct({
  unit: S.String,
  quantity: S.String,
  policy_id: S.optional(S.NullOr(S.String)),
  asset_name: S.optional(S.NullOr(S.String)),
});

export const OutRefUtxoSchema = S.Struct({
  tx_hash: S.String,
  output_index: S.Number,
  owner_addr: S.String,
  owner_stake_addr: S.optional(S.NullOr(S.String)),
  amounts: S.optional(S.NullOr(S.Array(OutRefAmountSchema))),
  lovelace_amount: S.optional(S.NullOr(S.Number)),
  data_hash: S.optional(S.NullOr(S.String)),
  /** Inline datum, as CBOR hex. */
  inline_datum: S.optional(S.NullOr(S.String)),
  inline_datum_json: S.optional(S.NullOr(S.Unknown)),
  reference_script_hash: S.optional(S.NullOr(S.String)),
  /** Reference script, as CBOR hex. */
  script_ref: S.optional(S.NullOr(S.String)),
  consumed_by_tx: S.optional(S.NullOr(S.String)),
}).annotations({ identifier: "NexusOutRefUtxoSchema" });

export interface OutRefUtxo extends S.Schema.Type<typeof OutRefUtxoSchema> {}

export const toUTxOFromOutRef = (dto: OutRefUtxo): CoreType.UTxO => {
  const assets: CoreType.Assets = {};
  (dto.amounts ?? []).forEach((amount) => {
    assets[amount.unit] = BigInt(amount.quantity);
  });
  if (assets.lovelace === undefined) {
    assets.lovelace = BigInt(dto.lovelace_amount ?? 0);
  }
  const datum = dto.inline_datum || undefined;
  return {
    txHash: dto.tx_hash,
    outputIndex: dto.output_index,
    address: dto.owner_addr,
    assets,
    datumHash: datum ? undefined : dto.data_hash || undefined,
    datum,
    // script_ref carries the language-tagged `82 0X <script>` CBOR; the tag
    // selects the script type and is stripped by unwrapScriptRef.
    scriptRef: dto.script_ref ? unwrapScriptRef(dto.script_ref) : undefined,
  };
};

// -----------------------------------------------------------------------------
// Account info — GET /api/account/{stakeAddress}/info
// -----------------------------------------------------------------------------

export const AccountInfoSchema = S.Struct({
  stakeAddress: S.optional(S.NullOr(S.String)),
  active: S.optional(S.NullOr(S.Boolean)),
  poolId: S.optional(S.NullOr(S.String)),
  drepId: S.optional(S.NullOr(S.String)),
  withdrawableAmount: S.optional(S.NullOr(S.String)),
  controlledAmount: S.optional(S.NullOr(S.String)),
}).annotations({ identifier: "NexusAccountInfoSchema" });

export interface AccountInfo extends S.Schema.Type<typeof AccountInfoSchema> {}

export const toRewardAccountState = (
  dto: AccountInfo,
): CoreType.RewardAccountState => ({
  registered: dto.active === true,
  poolId: dto.poolId ?? null,
  rewards: BigInt(dto.withdrawableAmount ?? 0),
});

// -----------------------------------------------------------------------------
// Datum — GET /api/scripts/datum/{datumHash}
// -----------------------------------------------------------------------------

export const DatumSchema = S.Struct({
  hash: S.optional(S.NullOr(S.String)),
  cbor: S.optional(S.NullOr(S.String)),
  json: S.optional(S.Unknown),
}).annotations({ identifier: "NexusDatumSchema" });

export interface Datum extends S.Schema.Type<typeof DatumSchema> {}

// -----------------------------------------------------------------------------
// Evaluate — POST /api/transactions/evaluate
// -----------------------------------------------------------------------------

export const RedeemerEvalSchema = S.Struct({
  redeemerTag: S.String,
  index: S.Number,
  exUnits: S.Struct({
    mem: S.Number,
    steps: S.Number,
  }),
}).annotations({ identifier: "NexusRedeemerEvalSchema" });

export interface RedeemerEval
  extends S.Schema.Type<typeof RedeemerEvalSchema> {}

const REDEEMER_TAGS: Record<string, CoreType.RedeemerTag> = {
  spend: "spend",
  mint: "mint",
  publish: "publish",
  certificate: "publish",
  cert: "publish",
  withdraw: "withdraw",
  withdrawal: "withdraw",
  reward: "withdraw",
  vote: "vote",
  voting: "vote",
  propose: "propose",
  proposing: "propose",
};

export const toEvalRedeemers = (
  dtos: readonly RedeemerEval[],
): CoreType.EvalRedeemer[] =>
  dtos.map((dto) => {
    const tag = REDEEMER_TAGS[dto.redeemerTag.toLowerCase()];
    if (!tag) {
      throw new Error(`Unknown redeemer tag from Nexus: ${dto.redeemerTag}`);
    }
    return {
      ex_units: { mem: dto.exUnits.mem, steps: dto.exUnits.steps },
      redeemer_index: dto.index,
      redeemer_tag: tag,
    };
  });
