import {
  Address,
  Assets,
  Credential,
  Datum,
  DatumHash,
  Delegation,
  EvalRedeemer,
  OutRef,
  PolicyId,
  ProtocolParameters,
  Provider,
  RewardAddress,
  RewardAccountState,
  Script,
  Transaction,
  TransactionStatus,
  TransactionStatusOptions,
  TxHash,
  Unit,
  UTxO,
} from "@lucid-evolution/core-types";
import { applyDoubleCborEncoding, fromUnit } from "@lucid-evolution/utils";
import { Schema as S } from "effect";
import { Cause, Effect, Exit, pipe, Array as _Array, Schedule } from "effect";
import * as Ogmios from "./internal/ogmios.js";
import * as Kupo from "./internal/kupo.js";
import * as HttpUtils from "./internal/HttpUtils.js";
import { FetchHttpClient } from "@effect/platform";
import { KupmiosError, toKupmiosError } from "./errors.js";

export { KupmiosError } from "./errors.js";

const catchProviderError =
  (protocol: "kupo" | "ogmios", operation: string) =>
  <A, E, R>(
    effect: Effect.Effect<A, E, R>,
  ): Effect.Effect<A, KupmiosError, R> =>
    Effect.catchAll(effect, (cause) =>
      Effect.fail(toKupmiosError(cause, protocol, operation)),
    );

const runProviderEffect = async <A>(
  effect: Effect.Effect<A, unknown, never>,
  protocol: "kupo" | "ogmios",
  operation: string,
  signal?: AbortSignal,
): Promise<A> => {
  const exit = await Effect.runPromiseExit(effect, { signal });
  if (Exit.isSuccess(exit)) return exit.value;

  if (signal?.aborted) {
    throw new KupmiosError({
      protocol,
      operation,
      kind: "aborted",
      retryable: false,
      cause: signal.reason ?? Cause.squash(exit.cause),
    });
  }

  throw toKupmiosError(Cause.squash(exit.cause), protocol, operation);
};

/**
 * Provides support for interacting with both Kupo and Ogmios APIs.
 *
 * @example Using Local URLs (No Authentication):
 * ```typescript
 * const kupmios = new Kupmios(
 *   "http://localhost:1442", // Kupo API URL
 *   "http://localhost:1337"  // Ogmios API URL
 * );
 * ```
 *
 * @example Using Authenticated URLs (No Custom Headers):
 * ```typescript
 * const kupmios = new Kupmios(
 *   "https://dmtr_kupoXXX.preprod-v2.kupo-m1.demeter.run", // Kupo Authenticated URL
 *   "https://dmtr_ogmiosXXX.preprod-v6.ogmios-m1.demeter.run" // Ogmios Authenticated URL
 * );
 * ```
 *
 * @example Using Public URLs with Custom Headers:
 * ```typescript
 * const kupmios = new Kupmios(
 *   "https://preprod-v2.kupo-m1.demeter.run", // Kupo API URL
 *   "https://preprod-v6.ogmios-m1.demeter.run", // Ogmios API URL
 *   {
 *     kupoHeader: { "dmtr-api-key": "dmtr_kupoXXX" }, // Custom header for Kupo
 *     ogmiosHeader: { "dmtr-api-key": "dmtr_ogmiosXXX" } // Custom header for Ogmios
 *   }
 * );
 */
export class Kupmios implements Provider {
  private readonly kupoUrl: string;
  private readonly ogmiosUrl: string;
  private readonly headers?: {
    readonly ogmiosHeader?: Record<string, string>;
    readonly kupoHeader?: Record<string, string>;
  };

  constructor(
    kupoUrl: string,
    ogmiosUrl: string,
    headers?: {
      ogmiosHeader?: Record<string, string>;
      kupoHeader?: Record<string, string>;
    },
  ) {
    this.kupoUrl = kupoUrl;
    this.ogmiosUrl = ogmiosUrl;
    this.headers = headers;
  }

  async getProtocolParameters(): Promise<ProtocolParameters> {
    const data = {
      jsonrpc: "2.0",
      method: "queryLedgerState/protocolParameters",
      params: {},
      id: null,
    };
    const schema = Ogmios.JSONRPCResponseSchema(
      S.Record({ key: S.String, value: S.Unknown }),
    );
    const response = await runProviderEffect(
      pipe(
        HttpUtils.makePostAsJsonResponse(
          this.ogmiosUrl,
          data,
          schema,
          this.headers?.ogmiosHeader,
        ),
        Effect.timeout(10_000),
        catchProviderError("ogmios", "queryLedgerState/protocolParameters"),
        Effect.provide(FetchHttpClient.layer),
      ),
      "ogmios",
      "queryLedgerState/protocolParameters",
    );
    const result = Ogmios.getJSONRPCResult(
      response.body,
      data.method,
      response,
    );
    const protocolParameters = S.decodeUnknownSync(
      Ogmios.ProtocolParametersSchema,
    )(Ogmios.normalizeProtocolParameters(result));
    return toProtocolParameters(protocolParameters);
  }

  async getTreasury(): Promise<bigint> {
    const data = {
      jsonrpc: "2.0",
      method: "queryLedgerState/treasuryAndReserves",
      params: {},
      id: null,
    };
    const schema = Ogmios.JSONRPCResponseSchema(
      Ogmios.TreasuryAndReservesSchema,
    );
    const response = await runProviderEffect(
      pipe(
        HttpUtils.makePostAsJsonResponse(
          this.ogmiosUrl,
          data,
          schema,
          this.headers?.ogmiosHeader,
        ),
        Effect.timeout(10_000),
        catchProviderError("ogmios", "queryLedgerState/treasuryAndReserves"),
        Effect.provide(FetchHttpClient.layer),
      ),
      "ogmios",
      "queryLedgerState/treasuryAndReserves",
    );
    const result = Ogmios.getJSONRPCResult(
      response.body,
      data.method,
      response,
    );
    return Ogmios.lovelaceAmountToBigInt(result.treasury.ada.lovelace);
  }

  async getUtxos(addressOrCredential: Address | Credential): Promise<UTxO[]> {
    const isAddress = typeof addressOrCredential === "string";
    const queryPredicate = isAddress
      ? addressOrCredential
      : addressOrCredential.hash;
    const pattern = `${this.kupoUrl}/matches/${queryPredicate}${isAddress ? "" : "/*"}?unspent`;
    const schema = S.Array(Kupo.UTxOSchema);
    const utxos = await runProviderEffect(
      pipe(
        HttpUtils.makeGet(pattern, schema, this.headers?.kupoHeader),
        Effect.flatMap((u) =>
          kupmiosUtxosToUtxos(this.kupoUrl, u, this.headers?.kupoHeader),
        ),
        Effect.timeout(10_000),
        catchProviderError("kupo", "getUtxos"),
        Effect.provide(FetchHttpClient.layer),
      ),
      "kupo",
      "getUtxos",
    );
    return utxos;
  }

  async getUtxosWithUnit(
    addressOrCredential: Address | Credential,
    unit: Unit,
  ): Promise<UTxO[]> {
    const isAddress = typeof addressOrCredential === "string";
    const queryPredicate = isAddress
      ? addressOrCredential
      : addressOrCredential.hash;
    const { policyId, assetName } = fromUnit(unit);
    const pattern = `${this.kupoUrl}/matches/${queryPredicate}${isAddress ? "" : "/*"}?unspent&policy_id=${policyId}${assetName ? `&asset_name=${assetName}` : ""}`;
    const schema = S.Array(Kupo.UTxOSchema);
    const utxos = await runProviderEffect(
      pipe(
        HttpUtils.makeGet(pattern, schema, this.headers?.kupoHeader),
        Effect.flatMap((u) =>
          kupmiosUtxosToUtxos(this.kupoUrl, u, this.headers?.kupoHeader),
        ),
        Effect.timeout(10_000),
        catchProviderError("kupo", "getUtxosWithUnit"),
        Effect.provide(FetchHttpClient.layer),
      ),
      "kupo",
      "getUtxosWithUnit",
    );
    // Kupo's asset_name query parameter cannot represent an empty asset name.
    // Keep the Provider method's exact-unit contract when the policy filter is
    // necessarily broader than the requested unit.
    return utxos.filter((utxo) => (utxo.assets[unit] ?? 0n) > 0n);
  }

  async getUtxosWithPolicy(
    addressOrCredential: Address | Credential,
    policyId: PolicyId,
  ): Promise<UTxO[]> {
    if (!/^[0-9a-f]{56}$/i.test(policyId)) {
      throw new TypeError(
        "policyId must be a 56-character hexadecimal string.",
      );
    }
    const normalizedPolicyId = policyId.toLowerCase();
    const isAddress = typeof addressOrCredential === "string";
    const queryPredicate = isAddress
      ? addressOrCredential
      : addressOrCredential.hash;
    const pattern = `${this.kupoUrl}/matches/${queryPredicate}${isAddress ? "" : "/*"}?unspent&policy_id=${normalizedPolicyId}`;
    const schema = S.Array(Kupo.UTxOSchema);
    return runProviderEffect(
      pipe(
        HttpUtils.makeGet(pattern, schema, this.headers?.kupoHeader),
        Effect.flatMap((utxos) =>
          kupmiosUtxosToUtxos(this.kupoUrl, utxos, this.headers?.kupoHeader),
        ),
        Effect.timeout(10_000),
        catchProviderError("kupo", "getUtxosWithPolicy"),
        Effect.provide(FetchHttpClient.layer),
      ),
      "kupo",
      "getUtxosWithPolicy",
    );
  }

  async getUtxoByUnit(unit: Unit): Promise<UTxO> {
    const { policyId, assetName } = fromUnit(unit);
    const pattern = `${this.kupoUrl}/matches/${policyId}.${assetName ?? ""}?unspent`;
    const schema = S.Array(Kupo.UTxOSchema);
    const utxos = await runProviderEffect(
      pipe(
        HttpUtils.makeGet(pattern, schema, this.headers?.kupoHeader),
        Effect.flatMap((u) =>
          kupmiosUtxosToUtxos(this.kupoUrl, u, this.headers?.kupoHeader),
        ),
        Effect.timeout(10_000),
        catchProviderError("kupo", "getUtxoByUnit"),
        Effect.provide(FetchHttpClient.layer),
      ),
      "kupo",
      "getUtxoByUnit",
    );
    if (utxos.length === 0) {
      throw new Error("Unit not found.");
    }
    if (utxos.length > 1) {
      throw new Error("Unit needs to be an NFT or only held by one address.");
    }

    return utxos[0];
  }

  async getUtxosByOutRef(outRefs: Array<OutRef>): Promise<UTxO[]> {
    const queryHashes: TxHash[] = [
      ...new Set(outRefs.map((outRef) => outRef.txHash)),
    ];
    const mkPattern = (txHash: string) =>
      `${this.kupoUrl}/matches/*@${txHash}?unspent`;
    const schema = S.Array(Kupo.UTxOSchema);
    const program = Effect.forEach(queryHashes, (txHash) =>
      pipe(
        HttpUtils.makeGet(mkPattern(txHash), schema, this.headers?.kupoHeader),
        Effect.flatMap((u) =>
          kupmiosUtxosToUtxos(this.kupoUrl, u, this.headers?.kupoHeader),
        ),
        Effect.timeout(10_000),
        catchProviderError("kupo", "getUtxosByOutRef"),
      ),
    );
    const utxos: UTxO[][] = await runProviderEffect(
      pipe(program, Effect.provide(FetchHttpClient.layer)),
      "kupo",
      "getUtxosByOutRef",
    );

    return _Array
      .flatten(utxos)
      .filter((utxo) =>
        outRefs.some(
          (outRef) =>
            utxo.txHash === outRef.txHash &&
            utxo.outputIndex === outRef.outputIndex,
        ),
      );
  }

  async getRewardAccount(
    rewardAddress: RewardAddress,
  ): Promise<RewardAccountState> {
    const data = {
      jsonrpc: "2.0",
      method: "queryLedgerState/rewardAccountSummaries",
      params: { keys: [rewardAddress] },
      id: null,
    };
    const schema = Ogmios.JSONRPCResponseSchema(Ogmios.Delegation);
    const response = await runProviderEffect(
      pipe(
        HttpUtils.makePostAsJsonResponse(
          this.ogmiosUrl,
          data,
          schema,
          this.headers?.ogmiosHeader,
        ),
        Effect.provide(FetchHttpClient.layer),
        Effect.timeout(10_000),
        catchProviderError("ogmios", "queryLedgerState/rewardAccountSummaries"),
      ),
      "ogmios",
      "queryLedgerState/rewardAccountSummaries",
    );
    const result = Ogmios.getJSONRPCResult(
      response.body,
      data.method,
      response,
    );

    return toRewardAccountState(result);
  }

  async getDelegation(rewardAddress: RewardAddress): Promise<Delegation> {
    const { poolId, rewards } = await this.getRewardAccount(rewardAddress);
    return { poolId, rewards };
  }

  async getDatum(datumHash: DatumHash): Promise<Datum> {
    const pattern = `${this.kupoUrl}/datums/${datumHash}`;
    const schema = Kupo.DatumSchema;
    const result = await runProviderEffect(
      pipe(
        HttpUtils.makeGet(pattern, schema, this.headers?.kupoHeader),
        Effect.provide(FetchHttpClient.layer),
        Effect.timeout(10_000),
        Effect.flatMap(Effect.fromNullable),
        catchProviderError("kupo", "getDatum"),
      ),
      "kupo",
      "getDatum",
    );
    return result.datum;
  }

  async getTransactionStatus(
    txHash: TxHash,
    options: TransactionStatusOptions = {},
  ): Promise<TransactionStatus> {
    const pattern = `${this.kupoUrl}/matches/*@${txHash}`;
    const schema = S.Array(Kupo.UTxOSchema).annotations({
      identifier: "Array<KupmiosSchema.KupoUTxO>",
    });
    const matches = await runProviderEffect(
      pipe(
        HttpUtils.makeGet(pattern, schema, this.headers?.kupoHeader),
        Effect.timeout(10_000),
        catchProviderError("kupo", "getTransactionStatus"),
        Effect.provide(FetchHttpClient.layer),
      ),
      "kupo",
      "getTransactionStatus",
      options.signal,
    );

    if (matches.length === 0) return { status: "not_found", txHash };

    const createdAt = matches[0].created_at;
    return {
      status: "confirmed",
      txHash,
      confirmation: {
        txHash,
        blockHash: createdAt.header_hash,
        slot: createdAt.slot_no,
      },
    };
  }

  async awaitTx(txHash: TxHash, checkInterval = 20000): Promise<boolean> {
    const pattern = `${this.kupoUrl}/matches/*@${txHash}`;
    const schema = S.Array(Kupo.UTxOSchema).annotations({
      identifier: "Array<KupmiosSchema.KupoUTxO>",
    });

    const result = await runProviderEffect(
      pipe(
        HttpUtils.makeGet(pattern, schema, this.headers?.kupoHeader),
        Effect.provide(FetchHttpClient.layer),
        Effect.repeat({
          schedule: Schedule.exponential(checkInterval),
          until: (result) => result.length > 0,
        }),
        Effect.timeout(160_000),
        catchProviderError("kupo", "awaitTx"),
        Effect.as(true),
      ),
      "kupo",
      "awaitTx",
    );
    return result;
  }

  async submitTx(cbor: Transaction): Promise<TxHash> {
    const data = {
      jsonrpc: "2.0",
      method: "submitTransaction",
      params: {
        transaction: { cbor: cbor },
      },
      id: null,
    };
    const schema = Ogmios.JSONRPCResponseSchema(
      S.Struct({
        transaction: S.Struct({
          id: S.String,
        }),
      }),
    );
    const response = await runProviderEffect(
      pipe(
        HttpUtils.makePostAsJsonResponse(
          this.ogmiosUrl,
          data,
          schema,
          this.headers?.ogmiosHeader,
        ),
        Effect.provide(FetchHttpClient.layer),
        Effect.timeout(10_000),
        catchProviderError("ogmios", "submitTransaction"),
      ),
      "ogmios",
      "submitTransaction",
    );
    const result = Ogmios.getJSONRPCResult(
      response.body,
      data.method,
      response,
    );
    return result.transaction.id;
  }

  async evaluateTx(
    tx: Transaction,
    additionalUTxOs?: UTxO[],
  ): Promise<EvalRedeemer[]> {
    // Prepare request data
    const data = {
      jsonrpc: "2.0",
      method: "evaluateTransaction",
      params: {
        transaction: { cbor: tx },
        additionalUtxo: Ogmios.toOgmiosUTxOs(additionalUTxOs),
      },
      id: null,
    };

    // Define the schema
    const schema = Ogmios.JSONRPCResponseSchema(S.Array(Ogmios.RedeemerSchema));

    // Perform the request and handle the response
    const response = await runProviderEffect(
      pipe(
        HttpUtils.makePostAsJsonResponse(
          this.ogmiosUrl,
          data,
          schema,
          this.headers?.ogmiosHeader,
        ),
        Effect.provide(FetchHttpClient.layer),
        Effect.timeout(10_000),
        catchProviderError("ogmios", "evaluateTransaction"),
      ),
      "ogmios",
      "evaluateTransaction",
    );
    const result = Ogmios.getJSONRPCResult(
      response.body,
      data.method,
      response,
    );

    const evalRedeemers: EvalRedeemer[] = result.map((item) => ({
      ex_units: {
        mem: item.budget.memory,
        steps: item.budget.cpu,
      },
      redeemer_index: item.validator.index,
      redeemer_tag: item.validator.purpose,
    }));

    return evalRedeemers;
  }
}

const getDatumEffect = (
  kupoUrl: string,
  datum_type: Kupo.UTxO["datum_type"],
  datum_hash: Kupo.UTxO["datum_hash"],
  kupoHeader?: Record<string, string>,
) =>
  Effect.gen(function* () {
    if (datum_type === "inline" && datum_hash) {
      const pattern = `${kupoUrl}/datums/${datum_hash}`;
      const schema = Kupo.DatumSchema;
      return yield* pipe(
        HttpUtils.makeGet(pattern, schema, kupoHeader),
        Effect.flatMap(Effect.fromNullable),
        Effect.map((result) => result.datum),
        Effect.retry(
          Schedule.compose(Schedule.exponential(50), Schedule.recurs(5)),
        ),
        Effect.timeout(5_000),
      );
    } else return undefined;
  });

const getScriptEffect = (
  kupoUrl: string,
  script_hash: Kupo.UTxO["script_hash"],
  kupoHeader?: Record<string, string>,
) =>
  Effect.gen(function* () {
    if (script_hash) {
      const pattern = `${kupoUrl}/scripts/${script_hash}`;
      const schema = Kupo.ScriptSchema;
      return yield* pipe(
        HttpUtils.makeGet(pattern, schema, kupoHeader),
        Effect.flatMap(Effect.fromNullable),
        Effect.retry(
          Schedule.compose(Schedule.exponential(50), Schedule.recurs(5)),
        ),
        Effect.timeout(5_000),
        Effect.map(({ language, script }) => {
          switch (language) {
            case "native":
              return {
                type: "Native",
                script: script,
              } satisfies Script;
            case "plutus:v1":
              return {
                type: "PlutusV1",
                script: applyDoubleCborEncoding(script),
              } satisfies Script;
            case "plutus:v2":
              return {
                type: "PlutusV2",
                script: applyDoubleCborEncoding(script),
              } satisfies Script;
            case "plutus:v3":
              return {
                type: "PlutusV3",
                script: applyDoubleCborEncoding(script),
              } satisfies Script;
          }
        }),
      );
    } else return undefined;
  });

const toAssets = (value: Kupo.UTxO["value"]): Assets => {
  const assets: Assets = { lovelace: BigInt(value.coins) };
  for (const unit of Object.keys(value.assets)) {
    assets[unit.replace(".", "")] = BigInt(value.assets[unit]);
  }
  return assets;
};

const toProtocolParameters = (
  result: Ogmios.ProtocolParameters,
): ProtocolParameters => {
  return {
    minFeeA: result.minFeeCoefficient,
    minFeeB: result.minFeeConstant.ada.lovelace,
    maxTxSize: result.maxTransactionSize.bytes,
    maxValSize: result.maxValueSize.bytes,
    keyDeposit: BigInt(result.stakeCredentialDeposit.ada.lovelace),
    poolDeposit: BigInt(result.stakePoolDeposit.ada.lovelace),
    drepDeposit: BigInt(result.delegateRepresentativeDeposit.ada.lovelace),
    govActionDeposit: BigInt(result.governanceActionDeposit.ada.lovelace),
    priceMem:
      result.scriptExecutionPrices.memory[0] /
      result.scriptExecutionPrices.memory[1],
    priceStep:
      result.scriptExecutionPrices.cpu[0] / result.scriptExecutionPrices.cpu[1],
    maxTxExMem: BigInt(result.maxExecutionUnitsPerTransaction.memory),
    maxTxExSteps: BigInt(result.maxExecutionUnitsPerTransaction.cpu),
    // NOTE: coinsPerUtxoByte is now called utxoCostPerByte:
    // https://github.com/IntersectMBO/cardano-node/pull/4141
    // Ogmios v6.x calls it minUtxoDepositCoefficient according to the following
    // documentation from its protocol parameters data model:
    // https://github.com/CardanoSolutions/ogmios/blob/master/architectural-decisions/accepted/017-api-version-6-major-rewrite.md#protocol-parameters
    coinsPerUtxoByte: BigInt(result.minUtxoDepositCoefficient),
    collateralPercentage: result.collateralPercentage,
    maxCollateralInputs: result.maxCollateralInputs,
    minFeeRefScriptCostPerByte: result.minFeeReferenceScripts.base,
    costModels: {
      PlutusV1: [...result.plutusCostModels["plutus:v1"]],
      PlutusV2: [...result.plutusCostModels["plutus:v2"]],
      PlutusV3: [...result.plutusCostModels["plutus:v3"]],
    },
  };
};

const toRewardAccountState = (
  result: Ogmios.Delegation,
): RewardAccountState => {
  const delegation = result
    ? Array.isArray(result)
      ? result[0]
      : Object.values(result)[0]
    : undefined;
  if (!delegation) {
    return { registered: false, poolId: null, rewards: 0n };
  }

  return {
    registered: true,
    poolId:
      "stakePool" in delegation
        ? delegation.stakePool?.id || null
        : delegation.delegate?.id || null,
    rewards: BigInt(delegation.rewards.ada.lovelace),
  };
};

const kupmiosUtxosToUtxos = (
  kupoURL: string,
  utxos: ReadonlyArray<Kupo.UTxO>,
  kupoHeader?: Record<string, string>,
) =>
  Effect.forEach(
    utxos,
    (utxo) => {
      return pipe(
        Effect.all([
          getDatumEffect(kupoURL, utxo.datum_type, utxo.datum_hash, kupoHeader),
          getScriptEffect(kupoURL, utxo.script_hash, kupoHeader),
        ]),
        Effect.map(
          ([datum, script]): UTxO => ({
            txHash: utxo.transaction_id,
            outputIndex: utxo.output_index,
            address: utxo.address,
            assets: toAssets(utxo.value),
            datumHash: utxo.datum_type === "hash" ? utxo.datum_hash : undefined,
            datum: datum,
            scriptRef: script,
          }),
        ),
      );
    },
    { concurrency: "unbounded" },
  );

const mkWebSocket = async (url: string, data: unknown): Promise<WebSocket> => {
  const client = new WebSocket(url);
  await new Promise((res) => {
    client.addEventListener("open", () => res(1), { once: true });
  });
  client.send(JSON.stringify(data));
  return client;
};
