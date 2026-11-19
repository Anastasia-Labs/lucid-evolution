import {
  Address,
  Credential,
  Datum,
  DatumHash,
  Delegation,
  EvalRedeemer,
  OutRef,
  ProtocolParameters,
  Provider,
  RewardAddress,
  RewardAccountState,
  Transaction,
  TxHash,
  Unit,
  UTxO,
} from "@lucid-evolution/core-types";
import * as _Nexus from "./internal/nexus.js";
import * as _Ogmios from "./internal/ogmios.js";
import { Data, Effect, pipe, Schedule, Schema as S } from "effect";
import { FetchHttpClient } from "@effect/platform";

export class NexusError extends Data.TaggedError("NexusError")<{
  cause?: unknown;
}> {
  get message() {
    return `${this.cause}`;
  }
}

export type NexusSupportedNetworks = "Mainnet" | "Preprod" | "Preview";

export interface NexusConfig {
  /** API key issued for your application, sent as the `X-Api-Key` header. */
  apiKey: string;
  network: NexusSupportedNetworks;
  /** Defaults to `https://nexus.gerowallet.io`. */
  baseUrl?: string;
}

const DEFAULT_BASE_URL = "https://nexus.gerowallet.io";
const PAGE_SIZE = 100;
const OUT_REF_BATCH_SIZE = 100;
/** Per-page timeout for paginated UTxO reads (full pages can be heavy). */
const PAGINATED_TIMEOUT = 30_000;

/**
 * Provides support for interacting with the Nexus API — Gero Wallet's Cardano
 * data provider.
 *
 * @example Using the Mainnet API:
 * ```typescript
 * const nexus = new Nexus({
 *   apiKey: "<your-api-key>",
 *   network: "Mainnet",
 * });
 * ```
 *
 * @example Using the Preprod API:
 * ```typescript
 * const nexus = new Nexus({
 *   apiKey: "<your-api-key>",
 *   network: "Preprod",
 * });
 * ```
 *
 * @example Using a custom deployment (e.g. self-hosted or staging):
 * ```typescript
 * const nexus = new Nexus({
 *   apiKey: "<your-api-key>",
 *   network: "Preview",
 *   baseUrl: "https://nexus.staging.gerowallet.io",
 * });
 * ```
 */
export class Nexus implements Provider {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly network: _Nexus.NexusNetwork;

  constructor({ apiKey, network, baseUrl = DEFAULT_BASE_URL }: NexusConfig) {
    this.apiKey = apiKey;
    this.network = _Nexus.NETWORK_MAP[network];
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  private get headers(): Record<string, string> {
    return { "X-Api-Key": this.apiKey };
  }

  private url(
    path: string,
    query: Record<string, string | number | undefined> = {},
  ): string {
    const url = new URL(this.baseUrl + path);
    url.searchParams.set("network", this.network);
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
    return url.toString();
  }

  async getProtocolParameters(): Promise<ProtocolParameters> {
    const url = this.url("/api/epoch/latest/parameters");
    const result = await pipe(
      _Nexus.makeGet(url, _Nexus.ProtocolParametersSchema, this.headers),
      // Allows for dependency injection and easier testing
      Effect.provide(FetchHttpClient.layer),
      Effect.timeout(10_000),
      Effect.map(_Nexus.toProtocolParameters),
      Effect.catchAllCause((cause) => new NexusError({ cause })),
      Effect.runPromise,
    );
    return result;
  }

  async getUtxos(addressOrCredential: Address | Credential): Promise<UTxO[]> {
    return typeof addressOrCredential === "string"
      ? this.paginateUtxos((page) =>
          this.url(
            `/api/addresses/${encodeURIComponent(addressOrCredential)}/utxos`,
            { page, pageSize: PAGE_SIZE },
          ),
        )
      : this.paginateUtxos((page) =>
          this.url(
            `/api/addresses/cred/${encodeURIComponent(addressOrCredential.hash)}/utxos`,
            { page, pageSize: PAGE_SIZE },
          ),
        );
  }

  async getUtxosWithUnit(
    addressOrCredential: Address | Credential,
    unit: Unit,
  ): Promise<UTxO[]> {
    if (typeof addressOrCredential === "string") {
      return this.paginateUtxos((page) =>
        this.url(
          `/api/addresses/${encodeURIComponent(addressOrCredential)}/utxos/${encodeURIComponent(unit)}`,
          { page, pageSize: PAGE_SIZE },
        ),
      );
    }
    // Nexus has no credential+asset endpoint; filter the credential's utxos client-side.
    const utxos = await this.getUtxos(addressOrCredential);
    return utxos.filter((utxo) => utxo.assets[unit] !== undefined);
  }

  async getUtxoByUnit(unit: Unit): Promise<UTxO> {
    const url = this.url(`/api/assets/${encodeURIComponent(unit)}/utxos`, {
      page: 1,
      pageSize: PAGE_SIZE,
    });
    const utxos = await pipe(
      _Nexus.makeGet(url, S.Array(_Nexus.AddressUtxoSchema), this.headers),
      // Allows for dependency injection and easier testing
      Effect.provide(FetchHttpClient.layer),
      Effect.timeout(10_000),
      // The primary backend already returns unspent-only UTxOs, but this filter
      // guards against a fallback provider returning spent entries mixed in.
      Effect.map((dtos) => dtos.filter((dto) => dto.spent !== true)),
      Effect.catchAllCause((cause) => new NexusError({ cause })),
      Effect.runPromise,
    );
    if (utxos.length === 0) throw new Error("Unit not found");
    if (utxos.length > 1) {
      throw new Error("Unit needs to be an NFT or only held by one address.");
    }
    const located = utxos[0]!;
    // The asset endpoint locates the out-ref but may omit datum/reference-script
    // enrichment; the out-ref endpoint always carries the full output, so fetch
    // the complete UTxO through it.
    const [utxo] = await this.getUtxosByOutRef([
      { txHash: located.txHash, outputIndex: located.txIndex },
    ]);
    return utxo ?? _Nexus.toUTxO(located);
  }

  async getUtxosByOutRef(outRefs: OutRef[]): Promise<UTxO[]> {
    const url = this.url("/api/transactions/utxos");
    const utxos: UTxO[] = [];
    for (let i = 0; i < outRefs.length; i += OUT_REF_BATCH_SIZE) {
      const chunk = outRefs.slice(i, i + OUT_REF_BATCH_SIZE);
      const body = chunk.map((outRef) => ({
        txHash: outRef.txHash,
        outputIndex: outRef.outputIndex,
      }));
      const dtos = await pipe(
        _Nexus.makePostAsJson(
          url,
          body,
          S.Array(_Nexus.OutRefUtxoSchema),
          this.headers,
        ),
        // Allows for dependency injection and easier testing
        Effect.provide(FetchHttpClient.layer),
        Effect.timeout(10_000),
        Effect.catchAllCause((cause) => new NexusError({ cause })),
        Effect.runPromise,
      );
      utxos.push(...dtos.map(_Nexus.toUTxOFromOutRef));
    }
    return utxos.filter((utxo) =>
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
    const url = this.url(
      `/api/account/${encodeURIComponent(rewardAddress)}/info`,
    );
    const result = await pipe(
      _Nexus.getOptionalJson(url, _Nexus.AccountInfoSchema, this.headers),
      // Allows for dependency injection and easier testing
      Effect.provide(FetchHttpClient.layer),
      Effect.timeout(10_000),
      Effect.map(
        (dto): RewardAccountState =>
          dto
            ? _Nexus.toRewardAccountState(dto)
            : { registered: false, poolId: null, rewards: 0n },
      ),
      Effect.catchAllCause((cause) => new NexusError({ cause })),
      Effect.runPromise,
    );
    return result;
  }

  async getDelegation(rewardAddress: RewardAddress): Promise<Delegation> {
    const { poolId, rewards } = await this.getRewardAccount(rewardAddress);
    return { poolId, rewards };
  }

  async getDatum(datumHash: DatumHash): Promise<Datum> {
    const url = this.url(`/api/scripts/datum/${encodeURIComponent(datumHash)}`);
    const result = await pipe(
      _Nexus.makeGet(url, _Nexus.DatumSchema, this.headers),
      // Allows for dependency injection and easier testing
      Effect.provide(FetchHttpClient.layer),
      Effect.flatMap((dto) =>
        dto.cbor
          ? Effect.succeed(dto.cbor)
          : Effect.fail(`No datum found for datum hash: ${datumHash}`),
      ),
      Effect.timeout(10_000),
      Effect.catchAllCause((cause) => new NexusError({ cause })),
      Effect.runPromise,
    );
    return result;
  }

  async awaitTx(txHash: TxHash, checkInterval = 3000): Promise<boolean> {
    const url = this.url(`/api/transactions/${encodeURIComponent(txHash)}`);
    const result = await pipe(
      _Nexus.getOptionalJson(url, S.Unknown, this.headers),
      // Any non-404 failure (auth, 5xx, network) fails the repeat immediately
      // instead of being retried away — it must propagate, never be swallowed.
      Effect.repeat({
        schedule: Schedule.spaced(checkInterval),
        until: (tx) => tx !== null,
      }),
      // Allows for dependency injection and easier testing
      Effect.provide(FetchHttpClient.layer),
      Effect.timeout(160_000),
      Effect.as(true),
      Effect.catchAllCause((cause) => new NexusError({ cause })),
      Effect.runPromise,
    );
    return result;
  }

  async submitTx(tx: Transaction): Promise<TxHash> {
    const url = this.url("/api/transactions/submit");
    const result = await pipe(
      _Nexus.makePostText(url, tx, this.headers),
      // Allows for dependency injection and easier testing
      Effect.provide(FetchHttpClient.layer),
      Effect.timeout(10_000),
      Effect.map((text) => text.trim().replace(/^"|"$/g, "")),
      Effect.catchAllCause((cause) => new NexusError({ cause })),
      Effect.runPromise,
    );
    return result;
  }

  async evaluateTx(
    tx: Transaction,
    additionalUTxOs?: UTxO[],
  ): Promise<EvalRedeemer[]> {
    const url = this.url("/api/transactions/evaluate");
    const body = {
      cbor: tx,
      additionalUtxoSet: additionalUTxOs?.length
        ? _Ogmios.toOgmiosUTxOs(additionalUTxOs)
        : null,
    };
    const result = await pipe(
      _Nexus.makePostAsJson(
        url,
        body,
        S.Array(_Nexus.RedeemerEvalSchema),
        this.headers,
      ),
      // Allows for dependency injection and easier testing
      Effect.provide(FetchHttpClient.layer),
      Effect.timeout(10_000),
      Effect.map(_Nexus.toEvalRedeemers),
      Effect.catchAllCause((cause) => new NexusError({ cause })),
      Effect.runPromise,
    );
    return result;
  }

  private async paginateUtxos(
    urlForPage: (page: number) => string,
  ): Promise<UTxO[]> {
    const utxos: UTxO[] = [];
    for (let page = 1; ; page++) {
      const batch = await pipe(
        _Nexus.makeGet(
          urlForPage(page),
          S.Array(_Nexus.AddressUtxoSchema),
          this.headers,
        ),
        // Allows for dependency injection and easier testing
        Effect.provide(FetchHttpClient.layer),
        // The timeout applies PER PAGE (this pipeline runs once per page), with
        // a larger budget than single-request calls: a full 100-UTxO page with
        // inline datums and reference scripts is a heavy response.
        Effect.timeout(PAGINATED_TIMEOUT),
        Effect.catchAllCause((cause) => new NexusError({ cause })),
        Effect.runPromise,
      );
      utxos.push(...batch.map(_Nexus.toUTxO));
      if (batch.length !== PAGE_SIZE) break;
    }
    return utxos;
  }
}
