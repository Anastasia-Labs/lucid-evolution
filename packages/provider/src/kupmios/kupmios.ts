import {
  Address,
  Assets,
  Credential,
  Datum,
  DatumHash,
  Delegation,
  OutRef,
  ProtocolParameters,
  Provider,
  RewardAddress,
  Script,
  Transaction,
  TxHash,
  Unit,
  UTxO,
} from "@lucid-evolution/core-types";
import { fromUnit } from "@lucid-evolution/utils";
import { fetchEffect } from "../fetch.js";
import * as S from "@effect/schema/Schema";
import { Effect, pipe, Array as _Array, Schedule, Data } from "effect";
import * as KupmiosSchema from "./schema.js";
import {
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import { NoSuchElementException, TimeoutException } from "effect/Cause";
import { ParseError } from "@effect/schema/ParseResult";
import { HttpClientError } from "@effect/platform/HttpClientError";
import { HttpBodyError } from "@effect/platform/HttpBody";

export class KupmiosError extends Data.TaggedError("KupmiosError")<{
  cause?: unknown;
  message?: string;
}> {}

const kupmiosError = (cause?: unknown, method?: string) =>
  new KupmiosError({
    cause,
    message: `${method} failed: ${JSON.stringify(cause)}`,
  });

export class Kupmios implements Provider {
  kupoUrl: string;
  ogmiosUrl: string;

  /**
   * @param kupoUrl: http(s)://localhost:1442
   * @param ogmiosUrl: http(s)://localhost:1337
   */
  constructor(kupoUrl: string, ogmiosUrl: string) {
    this.kupoUrl = kupoUrl;
    this.ogmiosUrl = ogmiosUrl;
  }

  async getProtocolParameters(): Promise<ProtocolParameters> {
    const data = {
      jsonrpc: "2.0",
      method: "queryLedgerState/protocolParameters",
      params: {},
      id: null,
    };
    const schema = KupmiosSchema.JSONRPCSchema(
      KupmiosSchema.ProtocolParametersSchema,
    );
    const program = fetchOgmiosParse(this.ogmiosUrl, data, schema).pipe(
      Effect.flatMap((response) =>
        "error" in response
          ? kupmiosError(response.error)
          : Effect.succeed(response.result),
      ),
      Effect.timeout(10_000),
      Effect.catchAll(kupmiosError),
    );
    const result: KupmiosSchema.ProtocolParameters =
      await Effect.runPromise(program);
    return toProtocolParameters(result);
  }

  async getUtxos(addressOrCredential: Address | Credential): Promise<UTxO[]> {
    const isAddress = typeof addressOrCredential === "string";
    const queryPredicate = isAddress
      ? addressOrCredential
      : addressOrCredential.hash;
    const pattern = `${this.kupoUrl}/matches/${queryPredicate}${isAddress ? "" : "/*"}?unspent`;
    const schema = S.Array(KupmiosSchema.KupoUTxO);
    const program = fetchKupoParse(pattern, schema).pipe(
      Effect.flatMap((u) => kupmiosUtxosToUtxos(this.kupoUrl, u)),
      Effect.timeout(10_000),
      Effect.catchAll(kupmiosError),
    );
    const utxos: UTxO[] = await Effect.runPromise(program);
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
    const schema = S.Array(KupmiosSchema.KupoUTxO);
    const program = fetchKupoParse(pattern, schema).pipe(
      Effect.flatMap((u) => kupmiosUtxosToUtxos(this.kupoUrl, u)),
      Effect.timeout(10_000),
      Effect.catchAll(kupmiosError),
    );
    const utxos: UTxO[] = await Effect.runPromise(program);
    return utxos;
  }

  async getUtxoByUnit(unit: Unit): Promise<UTxO> {
    const { policyId, assetName } = fromUnit(unit);
    const pattern = `${this.kupoUrl}/matches/${policyId}.${assetName ? `${assetName}` : "*"}?unspent`;
    const schema = S.Array(KupmiosSchema.KupoUTxO);
    const program = fetchKupoParse(pattern, schema).pipe(
      Effect.flatMap((u) => kupmiosUtxosToUtxos(this.kupoUrl, u)),
      Effect.timeout(10_000),
      Effect.catchAll(kupmiosError),
    );
    const utxos: UTxO[] = await Effect.runPromise(program);
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
    const schema = S.Array(KupmiosSchema.KupoUTxO);
    const program = Effect.forEach(queryHashes, (txHash) =>
      fetchKupoParse(mkPattern(txHash), schema).pipe(
        Effect.flatMap((u) => kupmiosUtxosToUtxos(this.kupoUrl, u)),
        Effect.timeout(10_000),
        Effect.catchAll(kupmiosError),
      ),
    );
    const utxos: UTxO[][] = await Effect.runPromise(program);

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
    const schema = KupmiosSchema.JSONRPCSchema(KupmiosSchema.KupoDelegation);
    const program = fetchOgmiosParse(this.ogmiosUrl, data, schema).pipe(
      Effect.flatMap((response) =>
        "error" in response
          ? kupmiosError(response.error)
          : Effect.succeed(response.result),
      ),
      Effect.timeout(10_000),
      Effect.catchAll(kupmiosError),
    );
    const result = await Effect.runPromise(program);
    const delegation = result ? Object.values(result)[0] : null;

    return {
      poolId: delegation?.delegate?.id || null,
      rewards: BigInt(delegation?.rewards?.ada?.lovelace || 0),
    };
  }

  //TODO: add data validation
  async getDatum(datumHash: DatumHash): Promise<Datum> {
    const program = fetchEffect(`${this.kupoUrl}/datums/${datumHash}`);
    const result = await Effect.runPromise(program);
    if (!result || !result.datum) {
      throw new Error(`No datum found for datum hash: ${datumHash}`);
    }
    return result.datum;
  }

  async awaitTx(txHash: TxHash, checkInterval = 20000): Promise<boolean> {
    const pattern = `${this.kupoUrl}/matches/*@${txHash}?unspent`;
    const schema = S.Array(KupmiosSchema.KupoUTxO).annotations({
      identifier: "Array<KupmiosSchema.KupoUTxO>",
    });

    const program = fetchKupoParse(pattern, schema).pipe(
      Effect.repeat({
        schedule: Schedule.exponential(checkInterval),
        until: (result) => result.length > 0,
      }),
      Effect.timeout(160_000),
      Effect.catchAll(kupmiosError),
      Effect.as(true),
    );
    return await Effect.runPromise(program);
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
    const schema = KupmiosSchema.JSONRPCSchema(
      S.Struct({
        transaction: S.Struct({
          id: S.String,
        }),
      }),
    );
    const program = fetchOgmiosParse(this.ogmiosUrl, data, schema).pipe(
      Effect.flatMap((response) =>
        "error" in response
          ? Effect.fail(response.error)
          : Effect.succeed(response),
      ),
      Effect.timeout(10_000),
      Effect.catchAll((cause) => kupmiosError(cause, "submitTx")),
    );
    const { result } = await Effect.runPromise(program);
    return result.transaction.id;
  }
}

const getDatumEffect = (
  kupoUrl: string,
  datum_type: KupmiosSchema.KupoUTxO["datum_type"],
  datum_hash: KupmiosSchema.KupoUTxO["datum_hash"],
): Effect.Effect<
  string | null,
  HttpClientError | ParseError | TimeoutException | NoSuchElementException
> =>
  Effect.gen(function* () {
    if (datum_type === "inline" && datum_hash) {
      const pattern = `${kupoUrl}/datums/${datum_hash}`;
      const schema = KupmiosSchema.KupoDatumSchema;
      return yield* fetchKupoParse(pattern, schema).pipe(
        Effect.flatMap(Effect.fromNullable),
        Effect.map((result) => result.datum),
        Effect.timeout(10_000),
      );
    } else return null;
  });

const getScriptEffect = (
  kupoUrl: string,
  script_hash: KupmiosSchema.KupoUTxO["script_hash"],
) =>
  Effect.gen(function* () {
    if (script_hash) {
      const pattern = `${kupoUrl}/scripts/${script_hash}`;
      const schema = KupmiosSchema.KupoScriptSchema;
      return yield* pipe(
        fetchKupoParse(pattern, schema),
        Effect.flatMap(Effect.fromNullable),
        Effect.timeout(10_000),
        Effect.map(({ language, script }) => {
          switch (language) {
            case "native":
              return { type: "Native", script } satisfies Script;
            case "plutus:v1":
              return { type: "PlutusV1", script } satisfies Script;
            case "plutus:v2":
              return { type: "PlutusV2", script } satisfies Script;
          }
        }),
      );
    } else return null;
  });

const toAssets = (value: KupmiosSchema.KupoUTxO["value"]): Assets => {
  const assets: Assets = { lovelace: BigInt(value.coins) };
  for (const unit of Object.keys(value.assets)) {
    assets[unit.replace(".", "")] = BigInt(value.assets[unit]);
  }
  return assets;
};

const toProtocolParameters = (
  result: KupmiosSchema.ProtocolParameters,
): ProtocolParameters => {
  return {
    minFeeA: result.minFeeCoefficient,
    minFeeB: result.minFeeConstant.ada.lovelace,
    maxTxSize: result.maxTransactionSize.bytes,
    maxValSize: result.maxValueSize.bytes,
    keyDeposit: BigInt(result.stakeCredentialDeposit.ada.lovelace),
    poolDeposit: BigInt(result.stakePoolDeposit.ada.lovelace),
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
    },
  };
};

const fetchOgmiosParse = <A, I, R>(
  url: string | URL,
  data: unknown,
  schema: S.Schema<A, I, R>,
): Effect.Effect<A, HttpClientError | ParseError | HttpBodyError, R> =>
  pipe(
    HttpClientRequest.post(url),
    HttpClientRequest.jsonBody(data),
    Effect.flatMap(HttpClient.fetchOk),
    HttpClientResponse.json,
    Effect.flatMap(S.decodeUnknown(schema)),
    // Effect.catchTag("ParseError", (e) =>
    //   Effect.fail(ArrayFormatter.formatIssueSync(e.issue)),
    // ),
    // Effect.scoped
  );

const fetchKupoParse = <A, I, R>(
  url: string | URL,
  schema: S.Schema<A, I, R>,
): Effect.Effect<A, HttpClientError | ParseError, R> =>
  pipe(
    HttpClientRequest.get(url),
    HttpClient.fetchOk,
    HttpClientResponse.json,
    Effect.flatMap(S.decodeUnknown(schema)),
    // Effect.catchTag("ParseError", (e) =>
    //   Effect.fail(ArrayFormatter.formatIssueSync(e.issue)),
    // ),
    // Effect.scoped
  );

const kupmiosUtxosToUtxos = (
  kupoURL: string,
  utxos: ReadonlyArray<KupmiosSchema.KupoUTxO>,
): Effect.Effect<
  UTxO[],
  HttpClientError | ParseError | TimeoutException | NoSuchElementException
> =>
  Effect.forEach(
    utxos,
    (utxo) => {
      return pipe(
        Effect.all([
          getDatumEffect(kupoURL, utxo.datum_type, utxo.datum_hash),
          getScriptEffect(kupoURL, utxo.script_hash),
        ]),
        Effect.map(
          ([datum, script]): UTxO => ({
            txHash: utxo.transaction_id,
            outputIndex: utxo.output_index,
            address: utxo.address,
            assets: toAssets(utxo.value),
            datumHash: utxo.datum_type === "hash" ? utxo.datum_hash : null,
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
