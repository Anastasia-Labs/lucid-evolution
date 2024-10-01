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
} from "@lucid-evolution/core-types";
import { applyDoubleCborEncoding, fromUnit } from "@lucid-evolution/utils";
import * as S from "@effect/schema/Schema";
import { Effect, pipe, Array as _Array, Schedule, Data } from "effect";
import {
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import { NoSuchElementException, TimeoutException } from "effect/Cause";
import { HttpClientError } from "@effect/platform/HttpClientError";
import { ArrayFormatter } from "@effect/schema";
import { HttpBodyError } from "@effect/platform/HttpBody";
import * as Ogmios from "./internal/ogmios.js";
import * as Kupo from "./internal/kupo.js";

export class KupmiosError extends Data.TaggedError("KupmiosError")<{
  cause?: unknown;
}> {
  get message() {
    return `${JSON.stringify(this.cause)}`;
  }
}

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
    const schema = Ogmios.JSONRPCSchema(Ogmios.ProtocolParametersSchema);
    const program = fetchOgmiosParse(this.ogmiosUrl, data, schema).pipe(
      Effect.flatMap((response) =>
        "error" in response
          ? Effect.fail(response)
          : Effect.succeed(response.result),
      ),
      Effect.timeout(10_000),
      Effect.catchAll((cause) => new KupmiosError({ cause })),
    );
    const result: Ogmios.ProtocolParameters = await Effect.runPromise(program);
    return toProtocolParameters(result);
  }

  async getUtxos(addressOrCredential: Address | Credential): Promise<UTxO[]> {
    const isAddress = typeof addressOrCredential === "string";
    const queryPredicate = isAddress
      ? addressOrCredential
      : addressOrCredential.hash;
    const pattern = `${this.kupoUrl}/matches/${queryPredicate}${isAddress ? "" : "/*"}?unspent`;
    const schema = S.Array(Kupo.UTxOSchema);
    const program = fetchKupoParse(pattern, schema).pipe(
      Effect.flatMap((u) => kupmiosUtxosToUtxos(this.kupoUrl, u)),
      Effect.timeout(10_000),
      Effect.catchAll((cause) => new KupmiosError({ cause })),
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
    const schema = S.Array(Kupo.UTxOSchema);
    const program = fetchKupoParse(pattern, schema).pipe(
      Effect.flatMap((u) => kupmiosUtxosToUtxos(this.kupoUrl, u)),
      Effect.timeout(10_000),
      Effect.catchAll((cause) => new KupmiosError({ cause })),
    );
    const utxos: UTxO[] = await Effect.runPromise(program);
    return utxos;
  }

  async getUtxoByUnit(unit: Unit): Promise<UTxO> {
    const { policyId, assetName } = fromUnit(unit);
    const pattern = `${this.kupoUrl}/matches/${policyId}.${assetName ? `${assetName}` : "*"}?unspent`;
    const schema = S.Array(Kupo.UTxOSchema);
    const program = fetchKupoParse(pattern, schema).pipe(
      Effect.flatMap((u) => kupmiosUtxosToUtxos(this.kupoUrl, u)),
      Effect.timeout(10_000),
      Effect.catchAll((cause) => new KupmiosError({ cause })),
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
    const schema = S.Array(Kupo.UTxOSchema);
    const program = Effect.forEach(queryHashes, (txHash) =>
      fetchKupoParse(mkPattern(txHash), schema).pipe(
        Effect.flatMap((u) => kupmiosUtxosToUtxos(this.kupoUrl, u)),
        Effect.timeout(10_000),
        Effect.catchAll((cause) => new KupmiosError({ cause })),
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
    const schema = Ogmios.JSONRPCSchema(Ogmios.Delegation);
    const program = fetchOgmiosParse(this.ogmiosUrl, data, schema).pipe(
      Effect.flatMap((response) =>
        "error" in response
          ? Effect.fail(response)
          : Effect.succeed(response.result),
      ),
      Effect.timeout(10_000),
      Effect.catchAll((cause) => new KupmiosError({ cause })),
    );
    const result = await Effect.runPromise(program);
    const delegation = result ? Object.values(result)[0] : null;

    return {
      poolId: delegation?.delegate?.id || null,
      rewards: BigInt(delegation?.rewards?.ada?.lovelace || 0),
    };
  }

  async getDatum(datumHash: DatumHash): Promise<Datum> {
    const pattern = `${this.kupoUrl}/datums/${datumHash}`;
    const schema = Kupo.DatumSchema;
    const program = fetchKupoParse(pattern, schema).pipe(
      Effect.timeout(10_000),
      Effect.flatMap(Effect.fromNullable),
      Effect.catchAll((cause) => new KupmiosError({ cause })),
    );
    const result = await Effect.runPromise(program);
    return result.datum;
  }

  async awaitTx(txHash: TxHash, checkInterval = 20000): Promise<boolean> {
    const pattern = `${this.kupoUrl}/matches/*@${txHash}`;
    const schema = S.Array(Kupo.UTxOSchema).annotations({
      identifier: "Array<KupmiosSchema.KupoUTxO>",
    });

    const program = fetchKupoParse(pattern, schema).pipe(
      Effect.repeat({
        schedule: Schedule.exponential(checkInterval),
        until: (result) => result.length > 0,
      }),
      Effect.timeout(160_000),
      Effect.catchAll((cause) => new KupmiosError({ cause })),
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
    const schema = Ogmios.JSONRPCSchema(
      S.Struct({
        transaction: S.Struct({
          id: S.String,
        }),
      }),
    );
    const program = fetchOgmiosParse(this.ogmiosUrl, data, schema).pipe(
      Effect.flatMap((response) =>
        "error" in response ? Effect.fail(response) : Effect.succeed(response),
      ),
      Effect.timeout(10_000),
      Effect.catchAll((cause) => new KupmiosError({ cause })),
    );
    const { result } = await Effect.runPromise(program);
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
    const program = fetchOgmiosParse(this.ogmiosUrl, data, schema).pipe(
      Effect.flatMap((response) =>
        "error" in response
          ? Effect.fail(response)
          : Effect.succeed(response.result),
      ),
      Effect.timeout(10_000),
      Effect.catchAll((cause) => new KupmiosError({ cause })),
    );
    const result = await Effect.runPromise(program);

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
): Effect.Effect<
  string | undefined,
  | HttpClientError
  | ArrayFormatter.Issue[]
  | TimeoutException
  | NoSuchElementException
> =>
  Effect.gen(function* () {
    if (datum_type === "inline" && datum_hash) {
      const pattern = `${kupoUrl}/datums/${datum_hash}`;
      const schema = Kupo.DatumSchema;
      const policy = Schedule.addDelay(
        Schedule.recurs(10), // Retry for a maximum of 10 times
        () => "10 millis" // Add a delay of 10 milliseconds between retries
      )
      return yield* Effect.retry(fetchKupoParse(pattern, schema), policy).pipe(
        Effect.flatMap(Effect.fromNullable),
        Effect.map((result) => result.datum),
        Effect.timeout(10_000),
      );
    } else return undefined;
  });

const getScriptEffect = (
  kupoUrl: string,
  script_hash: Kupo.UTxO["script_hash"],
): Effect.Effect<
  Script | undefined,
  | HttpClientError
  | ArrayFormatter.Issue[]
  | TimeoutException
  | NoSuchElementException
> =>
  Effect.gen(function* () {
    if (script_hash) {
      const pattern = `${kupoUrl}/scripts/${script_hash}`;
      const schema = Kupo.ScriptSchema;
      const policy = Schedule.addDelay(
        Schedule.recurs(10), // Retry for a maximum of 10 times
        () => "10 millis" // Add a delay of 10 milliseconds between retries
      )
      return yield* pipe(
        Effect.retry(fetchKupoParse(pattern, schema), policy),
        Effect.flatMap(Effect.fromNullable),
        Effect.timeout(10_000),
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

const fetchOgmiosParse = <A, I, R>(
  url: string | URL,
  data: unknown,
  schema: S.Schema<A, I, R>,
): Effect.Effect<
  A,
  HttpClientError | HttpBodyError | ArrayFormatter.Issue[],
  R
> =>
  pipe(
    HttpClientRequest.post(url),
    HttpClientRequest.jsonBody(data),
    Effect.flatMap(HttpClient.fetch),
    HttpClientResponse.json,
    Effect.flatMap(S.decodeUnknown(schema)),
    Effect.catchTag("ParseError", (e) =>
      Effect.fail(ArrayFormatter.formatErrorSync(e)),
    ),
    // Effect.scoped
  );

const fetchKupoParse = <A, I, R>(
  url: string | URL,
  schema: S.Schema<A, I, R>,
): Effect.Effect<A, HttpClientError | ArrayFormatter.Issue[], R> =>
  pipe(
    HttpClientRequest.get(url),
    HttpClient.fetchOk,
    HttpClientResponse.json,
    Effect.flatMap(S.decodeUnknown(schema, { onExcessProperty: "error" })),
    Effect.catchTag("ParseError", (e) =>
      Effect.fail(ArrayFormatter.formatErrorSync(e)),
    ),
    // Effect.scoped
  );

const kupmiosUtxosToUtxos = (
  kupoURL: string,
  utxos: ReadonlyArray<Kupo.UTxO>,
): Effect.Effect<
  UTxO[],
  | HttpClientError
  | ArrayFormatter.Issue[]
  | TimeoutException
  | NoSuchElementException
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
