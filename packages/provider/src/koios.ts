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
  Transaction,
  TxHash,
  Unit,
  UTxO,
} from "@evolution-sdk/core-types";
import { fromHex } from "@evolution-sdk/core-utils";
import { fromUnit } from "@evolution-sdk/utils";
import * as _Koios from "./internal/koios.js";
import * as _Ogmios from "./internal/ogmios.js";
import { Data, Effect, pipe, Schedule, Schema as S } from "effect";
import { FetchHttpClient } from "@effect/platform";
import * as HttpUtils from "./internal/HttpUtils.js";

export class KoiosError extends Data.TaggedError("KoiosError")<{
  cause?: unknown;
}> {
  get message() {
    return `${this.cause}`;
  }
}

/**
 *  Provides support for interacting with the Koios API
 *
 * @example Using the Preprod API URL:
 * ```typescript
 * const koios = new Koios(
 *   "https://preview.koios.rest/api/v1", // Preprod Preview Environment
 *   "optional-bearer-token" // Optional Bearer Token for authentication
 * );
 * ```
 *
 * @example Using the Preprod Stable API URL:
 * ```typescript
 * const koios = new Koios(
 *   "https://preprod.koios.rest/api/v1", // Preprod Stable Environment
 *   "optional-bearer-token" // Optional Bearer Token for authentication
 * );
 * ```
 *
 * @example Using the Mainnet API URL:
 * ```typescript
 * const koios = new Koios(
 *   "https://api.koios.rest/api/v1", // Mainnet Environment
 *   "optional-bearer-token" // Optional Bearer Token for authentication
 * );
 * ```
 *
 */
export class Koios implements Provider {
  private readonly baseUrl: string;
  private readonly token?: string;

  constructor(baseUrl: string, token?: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  async getProtocolParameters(): Promise<ProtocolParameters> {
    const url = `${this.baseUrl}/epoch_params?limit=1`;
    const schema = S.Array(_Koios.ProtocolParametersSchema);
    const bearerToken = this.token
      ? { Authorization: `Bearer ${this.token}` }
      : undefined;
    const [result] = await pipe(
      HttpUtils.makeGet(url, schema, bearerToken),
      // Allows for dependency injection and easier testing
      Effect.provide(FetchHttpClient.layer),
      Effect.timeout(10_000),
      Effect.catchAllCause((cause) => new KoiosError({ cause })),
      Effect.runPromise,
    );

    return {
      minFeeA: result.min_fee_a,
      minFeeB: result.min_fee_b,
      maxTxSize: result.max_tx_size,
      maxValSize: result.max_val_size,
      keyDeposit: result.key_deposit,
      poolDeposit: result.pool_deposit,
      drepDeposit: BigInt(result.drep_deposit),
      govActionDeposit: BigInt(result.gov_action_deposit),
      priceMem: result.price_mem,
      priceStep: result.price_step,
      maxTxExMem: result.max_tx_ex_mem,
      maxTxExSteps: result.max_tx_ex_steps,
      coinsPerUtxoByte: result.coins_per_utxo_size,
      collateralPercentage: result.collateral_percent,
      maxCollateralInputs: result.max_collateral_inputs,
      minFeeRefScriptCostPerByte: result.min_fee_ref_script_cost_per_byte,
      costModels: {
        PlutusV1: Object.fromEntries(
          result.cost_models.PlutusV1.map((value, index) => [
            index.toString(),
            value,
          ]),
        ),
        PlutusV2: Object.fromEntries(
          result.cost_models.PlutusV2.map((value, index) => [
            index.toString(),
            value,
          ]),
        ),
        PlutusV3: Object.fromEntries(
          result.cost_models.PlutusV3.map((value, index) => [
            index.toString(),
            value,
          ]),
        ),
      },
    };
  }

  async getUtxos(addressOrCredential: Address | Credential): Promise<UTxO[]> {
    const bearerToken = this.token
      ? { Authorization: `Bearer ${this.token}` }
      : undefined;

    const result = await pipe(
      _Koios.getUtxosEffect(this.baseUrl, addressOrCredential, bearerToken),
      Effect.timeout(10_000),
      Effect.catchAllCause((cause) => new KoiosError({ cause })),
      Effect.runPromise,
    );
    return result;
  }

  async getUtxosWithUnit(
    addressOrCredential: Address | Credential,
    unit: Unit,
  ): Promise<UTxO[]> {
    const bearerToken = this.token
      ? { Authorization: `Bearer ${this.token}` }
      : undefined;
    const result = await pipe(
      _Koios.getUtxosEffect(this.baseUrl, addressOrCredential, bearerToken),
      Effect.map((utxos) =>
        utxos.filter((utxo) => {
          const keys = Object.keys(utxo.assets);
          return keys.length > 0 && keys.includes(unit);
        }),
      ),
      Effect.timeout(10_000),
      Effect.catchAllCause((cause) => new KoiosError({ cause })),
      Effect.runPromise,
    );
    return result;
  }

  async getUtxoByUnit(unit: Unit): Promise<UTxO> {
    let { policyId, assetName } = fromUnit(unit);
    const url = `${this.baseUrl}/asset_addresses?_asset_policy=${policyId}&_asset_name=${assetName}`;
    const bearerToken = this.token
      ? { Authorization: `Bearer ${this.token}` }
      : undefined;
    const result: UTxO = await pipe(
      HttpUtils.makeGet(url, S.Array(_Koios.AssetAddressSchema), bearerToken),
      // Allows for dependency injection and easier testing
      Effect.provide(FetchHttpClient.layer),
      Effect.flatMap((adresses) =>
        adresses.length === 0
          ? Effect.fail("Unit not found")
          : Effect.succeed(adresses),
      ),
      Effect.flatMap((adresses) =>
        adresses.length > 1
          ? Effect.fail("Unit needs to be an NFT or only held by one address.")
          : Effect.succeed(adresses[0]),
      ),
      Effect.flatMap((address) =>
        _Koios.getUtxosEffect(
          this.baseUrl,
          address.payment_address,
          bearerToken,
        ),
      ),
      Effect.map((utxos) =>
        utxos.filter((utxo) => {
          const keys = Object.keys(utxo.assets);
          return keys.length > 0 && keys.includes(unit);
        }),
      ),
      Effect.flatMap((utxos) =>
        utxos.length > 1
          ? Effect.fail("Unit needs to be an NFT or only held by one address.")
          : Effect.succeed(utxos[0]),
      ),
      Effect.timeout(10_000),
      Effect.catchAllCause((cause) => new KoiosError({ cause })),
      Effect.runPromise,
    );
    return result;
  }

  async getUtxosByOutRef(outRefs: OutRef[]): Promise<UTxO[]> {
    const url = `${this.baseUrl}/tx_info`;
    const body = {
      _tx_hashes: [...new Set(outRefs.map((outRef) => outRef.txHash))],
      _assets: true,
      _scripts: true,
    };
    const schema = S.Array(_Koios.TxInfoSchema);
    const bearerToken = this.token
      ? { Authorization: `Bearer ${this.token}` }
      : undefined;
    const [result] = await pipe(
      HttpUtils.makePostAsJson(url, body, schema, bearerToken),
      // Allows for dependency injection and easier testing
      Effect.provide(FetchHttpClient.layer),
      Effect.timeout(10_000),
      Effect.catchAllCause((cause) => new KoiosError({ cause })),
      Effect.runPromise,
    );

    if (result) {
      const utxos: UTxO[] = result.outputs.map(
        (koiosInputOutput: _Koios.InputOutput) =>
          _Koios.toUTxO(
            {
              tx_hash: koiosInputOutput.tx_hash,
              tx_index: koiosInputOutput.tx_index,
              block_time: 0,
              block_height: result.block_height,
              value: koiosInputOutput.value,
              datum_hash: koiosInputOutput.datum_hash,
              inline_datum: koiosInputOutput.inline_datum,
              reference_script: koiosInputOutput.reference_script,
              asset_list: koiosInputOutput.asset_list,
            } satisfies _Koios.UTxO,
            koiosInputOutput.payment_addr.bech32,
          ),
      );
      return utxos.filter((utxo) =>
        outRefs.some(
          (outRef) =>
            utxo.txHash === outRef.txHash &&
            utxo.outputIndex === outRef.outputIndex,
        ),
      );
    } else {
      return [];
    }
  }

  async getDelegation(rewardAddress: RewardAddress): Promise<Delegation> {
    const body = {
      _stake_addresses: [rewardAddress],
    };
    const url = `${this.baseUrl}/account_info`;
    const bearerToken = this.token
      ? { Authorization: `Bearer ${this.token}` }
      : undefined;
    const result = await pipe(
      HttpUtils.makePostAsJson(
        url,
        body,
        S.Array(_Koios.AccountInfoSchema),
        bearerToken,
      ),
      // Allows for dependency injection and easier testing
      Effect.provide(FetchHttpClient.layer),
      Effect.flatMap((result) =>
        result.length === 0
          ? Effect.fail("No Delegation Found by Reward Address")
          : Effect.succeed(result[0]),
      ),
      Effect.timeout(10_000),
      Effect.catchAllCause((cause) => new KoiosError({ cause })),
      Effect.runPromise,
    );

    return {
      poolId: result.delegated_pool || null,
      rewards: BigInt(result.rewards_available),
    };
  }

  async getDatum(datumHash: DatumHash): Promise<Datum> {
    const url = `${this.baseUrl}/datum_info`;
    const body = {
      _datum_hashes: [datumHash],
    };
    const bearerToken = this.token
      ? { Authorization: `Bearer ${this.token}` }
      : undefined;
    const result = await pipe(
      HttpUtils.makePostAsJson(
        url,
        body,
        S.Array(_Koios.DatumInfo),
        bearerToken,
      ),
      // Allows for dependency injection and easier testing
      Effect.provide(FetchHttpClient.layer),
      Effect.flatMap((result) =>
        result.length === 0
          ? Effect.fail("No Datum Found by Datum Hash")
          : Effect.succeed(result[0]),
      ),
      Effect.timeout(10_000),
      Effect.catchAllCause((cause) => new KoiosError({ cause })),
      Effect.runPromise,
    );
    return result.bytes;
  }

  async awaitTx(txHash: TxHash, checkInterval = 20000): Promise<boolean> {
    const url = `${this.baseUrl}/tx_info`;
    const body = {
      _tx_hashes: [txHash],
    };
    const schema = S.Array(_Koios.TxInfoSchema);
    const bearerToken = this.token
      ? { Authorization: `Bearer ${this.token}` }
      : undefined;
    const result = await pipe(
      HttpUtils.makePostAsJson(url, body, schema, bearerToken),
      Effect.repeat({
        schedule: Schedule.exponential(checkInterval),
        until: (result) => result.length > 0,
      }),
      // Allows for dependency injection and easier testing
      Effect.provide(FetchHttpClient.layer),
      Effect.timeout(160_000),
      Effect.orDie,
      Effect.as(true),
      Effect.runPromise,
    );

    return result;
  }

  async submitTx(tx: Transaction): Promise<TxHash> {
    const url = `${this.baseUrl}/submittx`;
    const body = fromHex(tx);
    const schema = _Koios.TxHashSchema;
    const bearerToken = this.token
      ? { Authorization: `Bearer ${this.token}` }
      : undefined;
    const result = await pipe(
      HttpUtils.makePostAsUint8Array(url, body, schema, bearerToken),
      // Allows for dependency injection and easier testing
      Effect.provide(FetchHttpClient.layer),
      Effect.timeout(10_000),
      Effect.catchAllCause((cause) => new KoiosError({ cause })),
      Effect.runPromise,
    );
    return result;
  }

  async evaluateTx(
    tx: Transaction,
    additionalUTxOs?: UTxO[],
  ): Promise<EvalRedeemer[]> {
    // Prepare request data
    const url = `${this.baseUrl}/ogmios`;
    const body = {
      jsonrpc: "2.0",
      method: "evaluateTransaction",
      params: {
        transaction: { cbor: tx },
        additionalUtxo: _Ogmios.toOgmiosUTxOs(additionalUTxOs),
      },
      id: null,
    };
    const schema = _Ogmios.JSONRPCSchema(S.Array(_Ogmios.RedeemerSchema));
    const bearerToken = this.token
      ? { Authorization: `Bearer ${this.token}` }
      : undefined;

    const { result } = await pipe(
      HttpUtils.makePostAsJson(url, body, schema, bearerToken),
      // Allows for dependency injection and easier testing
      Effect.provide(FetchHttpClient.layer),
      Effect.timeout(10_000),
      Effect.catchAllCause((cause) => new KoiosError({ cause })),
      Effect.runPromise,
    );

    const evalRedeemers = result.map((item) => ({
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
