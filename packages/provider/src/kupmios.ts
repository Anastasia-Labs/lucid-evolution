import {
  Address,
  Assets,
  Credential,
  Datum,
  DatumHash,
  Delegation,
  EvalRedeemer,
  OutRef,
  ProtocolParameters,
  Provider,
  RewardAddress,
  Script,
  Transaction,
  TxHash,
  Unit,
  UTxO,
} from "@evolution-sdk/core-types";
import { applyDoubleCborEncoding, fromUnit } from "@evolution-sdk/utils";
import { Schema as S } from "effect";
import { Effect, pipe, Array as _Array, Schedule, Data } from "effect";
import * as Ogmios from "./internal/ogmios.js";
import * as Kupo from "./internal/kupo.js";
import * as HttpUtils from "./internal/HttpUtils.js";
import { FetchHttpClient } from "@effect/platform";

export class KupmiosError extends Data.TaggedError("KupmiosError")<{
  cause?: unknown;
}> {
  get message() {
    return `${this.cause}`;
  }
}

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
    const schema = Ogmios.JSONRPCSchema(Ogmios.ProtocolParametersSchema);
    const { result } = await pipe(
      HttpUtils.makePostAsJson(
        this.ogmiosUrl,
        data,
        schema,
        this.headers?.ogmiosHeader,
      ),
      Effect.timeout(10_000),
      Effect.catchAll((cause) => new KupmiosError({ cause })),
      Effect.provide(FetchHttpClient.layer),
      Effect.runPromise,
    );
    return toProtocolParameters(result);
  }

  async getUtxos(addressOrCredential: Address | Credential): Promise<UTxO[]> {
    const isAddress = typeof addressOrCredential === "string";
    const queryPredicate = isAddress
      ? addressOrCredential
      : addressOrCredential.hash;
    const pattern = `${this.kupoUrl}/matches/${queryPredicate}${isAddress ? "" : "/*"}?unspent`;
    const schema = S.Array(Kupo.UTxOSchema);
    const utxos = await pipe(
      HttpUtils.makeGet(pattern, schema, this.headers?.kupoHeader),
      Effect.flatMap((u) => kupmiosUtxosToUtxos(this.kupoUrl, u)),
      Effect.timeout(10_000),
      Effect.catchAll((cause) => new KupmiosError({ cause })),
      Effect.provide(FetchHttpClient.layer),
      Effect.runPromise,
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
    const utxos = await pipe(
      HttpUtils.makeGet(pattern, schema, this.headers?.kupoHeader),
      Effect.flatMap((u) => kupmiosUtxosToUtxos(this.kupoUrl, u)),
      Effect.timeout(10_000),
      Effect.catchAll((cause) => new KupmiosError({ cause })),
      Effect.provide(FetchHttpClient.layer),
      Effect.runPromise,
    );
    return utxos;
  }

  async getUtxoByUnit(unit: Unit): Promise<UTxO> {
    const { policyId, assetName } = fromUnit(unit);
    const pattern = `${this.kupoUrl}/matches/${policyId}.${assetName ? `${assetName}` : "*"}?unspent`;
    const schema = S.Array(Kupo.UTxOSchema);
    const utxos = await pipe(
      HttpUtils.makeGet(pattern, schema, this.headers?.kupoHeader),
      Effect.flatMap((u) => kupmiosUtxosToUtxos(this.kupoUrl, u)),
      Effect.timeout(10_000),
      Effect.catchAll((cause) => new KupmiosError({ cause })),
      Effect.provide(FetchHttpClient.layer),
      Effect.runPromise,
    );
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
        Effect.flatMap((u) => kupmiosUtxosToUtxos(this.kupoUrl, u)),
        Effect.timeout(10_000),
        Effect.catchAll((cause) => new KupmiosError({ cause })),
      ),
    );
    const utxos: UTxO[][] = await Effect.runPromise(
      pipe(program, Effect.provide(FetchHttpClient.layer)),
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

  async getDelegation(rewardAddress: RewardAddress): Promise<Delegation> {
    const data = {
      jsonrpc: "2.0",
      method: "queryLedgerState/rewardAccountSummaries",
      params: { keys: [rewardAddress] },
      id: null,
    };
    const schema = Ogmios.JSONRPCSchema(Ogmios.Delegation);
    const { result } = await pipe(
      HttpUtils.makePostAsJson(
        this.ogmiosUrl,
        data,
        schema,
        this.headers?.ogmiosHeader,
      ),
      Effect.provide(FetchHttpClient.layer),
      Effect.timeout(10_000),
      Effect.catchAll((cause) => new KupmiosError({ cause })),
      Effect.runPromise,
    );
    const delegation = result ? Object.values(result)[0] : null;

    return {
      poolId: delegation?.delegate?.id || null,
      rewards: BigInt(delegation?.rewards?.ada?.lovelace || 0),
    };
  }

  async getDatum(datumHash: DatumHash): Promise<Datum> {
    const pattern = `${this.kupoUrl}/datums/${datumHash}`;
    const schema = Kupo.DatumSchema;
    const result = await pipe(
      HttpUtils.makeGet(pattern, schema, this.headers?.kupoHeader),
      Effect.provide(FetchHttpClient.layer),
      Effect.timeout(10_000),
      Effect.flatMap(Effect.fromNullable),
      Effect.catchAll((cause) => new KupmiosError({ cause })),
      Effect.runPromise,
    );
    return result.datum;
  }

  async awaitTx(txHash: TxHash, checkInterval = 20000): Promise<boolean> {
    const pattern = `${this.kupoUrl}/matches/*@${txHash}?unspent`;
    const schema = S.Array(Kupo.UTxOSchema).annotations({
      identifier: "Array<KupmiosSchema.KupoUTxO>",
    });

    const result = await pipe(
      HttpUtils.makeGet(pattern, schema, this.headers?.kupoHeader),
      Effect.provide(FetchHttpClient.layer),
      Effect.repeat({
        schedule: Schedule.exponential(checkInterval),
        until: (result) => result.length > 0,
      }),
      Effect.timeout(160_000),
      Effect.catchAll((cause) => new KupmiosError({ cause })),
      Effect.as(true),
      Effect.runPromise,
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
    const schema = Ogmios.JSONRPCSchema(
      S.Struct({
        transaction: S.Struct({
          id: S.String,
        }),
      }),
    );
    const { result } = await pipe(
      HttpUtils.makePostAsJson(
        this.ogmiosUrl,
        data,
        schema,
        this.headers?.ogmiosHeader,
      ),
      Effect.provide(FetchHttpClient.layer),
      Effect.timeout(10_000),
      Effect.catchAll((cause) => new KupmiosError({ cause })),
      Effect.runPromise,
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
    const schema = Ogmios.JSONRPCSchema(S.Array(Ogmios.RedeemerSchema));

    // Perform the request and handle the response
    const { result } = await pipe(
      HttpUtils.makePostAsJson(
        this.ogmiosUrl,
        data,
        schema,
        this.headers?.ogmiosHeader,
      ),
      Effect.provide(FetchHttpClient.layer),
      Effect.timeout(10_000),
      Effect.catchAll((cause) => new KupmiosError({ cause })),
      Effect.runPromise,
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
      PlutusV1: Object.fromEntries(
        result.plutusCostModels["plutus:v1"].map((value, index) => [
          index.toString(),
          value,
        ]),
      ),
      PlutusV2: Object.fromEntries(
        result.plutusCostModels["plutus:v2"].map((value, index) => [
          index.toString(),
          value,
        ]),
      ),
      PlutusV3: Object.fromEntries(
        result.plutusCostModels["plutus:v3"].map((value, index) => [
          index.toString(),
          value,
        ]),
      ),
    },
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
