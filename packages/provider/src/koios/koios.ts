import * as S from "@effect/schema/Schema";
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
  Transaction,
  TxHash,
  Unit,
  UTxO,
} from "@lucid-evolution/core-types";
import { fromHex } from "@lucid-evolution/core-utils";
import { applyDoubleCborEncoding, fromUnit } from "@lucid-evolution/utils";
import {
  KoiosAddressInfoSchema,
  KoiosAsset,
  KoiosTxInfoSchema,
  KoiosUTxO,
  KoiosTxInfo,
  ProtocolParametersSchema,
} from "./schema.js";
import { Console, Effect, pipe, Schedule } from "effect";
import { promise } from "effect/Effect";
import { ArrayFormatter } from "@effect/schema";
import { fetchEffect } from "../fetch.js";

/**
 * @description This class supports Koios API v1.1.2.
 */
export class Koios implements Provider {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getProtocolParameters(): Promise<ProtocolParameters> {
    const result = await fetch(`${this.baseUrl}/epoch_params?limit=1`).then(
      (res) => res.json(),
    );
    const param = S.decodeUnknownSync(ProtocolParametersSchema)(result[0]);

    return {
      minFeeA: param.min_fee_a,
      minFeeB: param.min_fee_b,
      maxTxSize: param.max_tx_size,
      maxValSize: param.max_val_size,
      keyDeposit: param.key_deposit,
      poolDeposit: param.pool_deposit,
      priceMem: param.price_mem,
      priceStep: param.price_step,
      maxTxExMem: param.max_tx_ex_mem,
      maxTxExSteps: param.max_tx_ex_steps,
      coinsPerUtxoByte: param.coins_per_utxo_size,
      collateralPercentage: param.collateral_percent,
      maxCollateralInputs: param.max_collateral_inputs,
      costModels: {
        PlutusV1: Object.fromEntries(
          param.cost_models.PlutusV1.map((value, index) => [
            index.toString(),
            value,
          ]),
        ),
        PlutusV2: Object.fromEntries(
          param.cost_models.PlutusV2.map((value, index) => [
            index.toString(),
            value,
          ]),
        ),
      },
    };
  }

  async getUtxos(addressOrCredential: Address | Credential): Promise<UTxO[]> {
    if (typeof addressOrCredential === "string") {
      const body = {
        _addresses: [addressOrCredential],
      };
      const result = await fetch(`${this.baseUrl}/address_info`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      }).then((res: Response) => res.json());
      const parsedResult = S.decodeUnknownSync(KoiosAddressInfoSchema)(
        result,
      )[0];
      return parsedResult
        ? parsedResult.utxo_set.map((koiosUTXO) =>
            toUTxO(koiosUTXO, parsedResult.address),
          )
        : [];
    } else {
      throw Error("getUtxos by Credential Type is not supported in Koios yet.");
    }
  }

  async getUtxosWithUnit(
    addressOrCredential: Address | Credential,
    unit: Unit,
  ): Promise<UTxO[]> {
    if (typeof addressOrCredential === "string") {
      const utxos = await this.getUtxos(addressOrCredential);
      if (utxos && utxos.length > 0) {
        return utxos.filter((utxo): utxo is UTxO => {
          const keys = Object.keys(utxo.assets);
          return keys.length > 0 && keys.includes(unit);
        });
      } else {
        return [];
      }
    } else {
      throw Error(
        "getUtxosWithUnit by Credential Type is not supported in Koios yet.",
      );
    }
  }

  async getUtxoByUnit(unit: Unit): Promise<UTxO> {
    let { policyId, assetName } = fromUnit(unit);
    assetName = String(assetName);
    const assetAddresses = await fetch(
      `${this.baseUrl}/asset_addresses?_asset_policy=${policyId}&_asset_name=${assetName}`,
    ).then((res: Response) => res.json());
    if (Array.isArray(assetAddresses) && assetAddresses.length > 0) {
      if (assetAddresses.length > 1) {
        throw new Error("Unit needs to be an NFT or only held by one address.");
      }
      const utxos: UTxO[] = await this.getUtxos(
        assetAddresses[0].payment_address,
      );
      const result = utxos.find<UTxO>((utxo): utxo is UTxO => {
        const keys = Object.keys(utxo.assets);
        return keys.length > 0 && keys.includes(unit);
      });
      if (result) {
        return result;
      }
    }
    throw new Error("Unit not found.");
  }

  async getUtxosByOutRef(outRefs: OutRef[]): Promise<UTxO[]> {
    const utxos = [];
    const body = {
      _tx_hashes: [...new Set(outRefs.map((outRef) => outRef.txHash))],
    };
    const result = await fetch(`${this.baseUrl}/tx_info`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    }).then((res: Response) => res.json());

    const parsedResult = S.decodeUnknownSync(S.Array(KoiosTxInfoSchema))(
      result,
    )[0];

    if (parsedResult) {
      return parsedResult.outputs.map((koiosInputOutput) =>
        toUTxO(
          {
            tx_hash: koiosInputOutput.tx_hash,
            tx_index: koiosInputOutput.tx_index,
            block_height: null,
            value: koiosInputOutput.value,
            datum_hash: koiosInputOutput.datum_hash,
            inline_datum: koiosInputOutput.inline_datum,
            reference_script: koiosInputOutput.reference_script,
            //NOTE: Koios api returns collateral_output like  asset_list: "[]", instead of asset_list: []
            asset_list:
              typeof koiosInputOutput.asset_list === "string"
                ? []
                : koiosInputOutput.asset_list,
          },
          koiosInputOutput.payment_addr.bech32,
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
    const result = await fetch(`${this.baseUrl}/account_info`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    }).then((res: Response) => res.json());
    if (Array.isArray(result) && result.length > 0) {
      return {
        poolId: result[0].delegated_pool || null,
        rewards: BigInt(result[0].rewards_available),
      };
    } else {
      throw new Error("No Delegation Found by Reward Address");
    }
  }

  async getDatum(datumHash: DatumHash): Promise<Datum> {
    const body = {
      _datum_hashes: [datumHash],
    };
    const datum = await fetch(`${this.baseUrl}/datum_info`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    }).then((res: Response) => res.json());
    if (Array.isArray(datum) && datum.length > 0) {
      return datum[0].bytes;
    } else {
      throw new Error("No Datum Found by Datum Hash");
    }
  }

  awaitTx(txHash: TxHash, checkInterval = 20000) {
    const body = {
      _tx_hashes: [txHash],
    };
    const request = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    };
    const program = pipe(
      fetchEffect(`${this.baseUrl}/tx_info`, request),
      Effect.flatMap((json) =>
        S.decodeUnknown(S.Array(KoiosTxInfoSchema), { errors: "first" })(json),
      ),
      Effect.catchTag("ParseError", (e) =>
        Effect.fail(ArrayFormatter.formatErrorSync(e)),
      ),
      Effect.repeat({
        schedule: Schedule.exponential(checkInterval),
        until: (result) => result.length > 0,
      }),
      Effect.timeout("160 seconds"),
      Effect.orDie,
      Effect.as(true),
    );
    //TODO: add Effect.timeout test with 10 mins

    return Effect.runPromise(program);
  }

  async submitTx(tx: Transaction): Promise<TxHash> {
    const result = await fetch(`${this.baseUrl}/submittx`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/cbor",
      },
      method: "POST",
      body: fromHex(tx),
    }).then((res: Response) => res.json());
    const TxHashSchema = S.String;
    const isTxHash = S.is(TxHashSchema);
    if (!isTxHash(result)) {
      throw new Error(JSON.stringify(result));
    }
    return result;
  }
}

const toUTxO = (koiosUTxO: KoiosUTxO, address: string): UTxO => ({
  txHash: koiosUTxO.tx_hash,
  outputIndex: koiosUTxO.tx_index,
  assets: (() => {
    const a: Assets = {};
    if (koiosUTxO.asset_list) {
      koiosUTxO.asset_list.forEach((am: KoiosAsset) => {
        a[am.policy_id + am.asset_name] = BigInt(am.quantity);
      });
    }
    a["lovelace"] = BigInt(koiosUTxO.value);
    return a;
  })(),
  address: address,
  datumHash: koiosUTxO.inline_datum ? undefined : koiosUTxO.datum_hash,
  datum: koiosUTxO.inline_datum ? koiosUTxO.inline_datum.bytes : undefined,
  scriptRef: koiosUTxO.reference_script
    ? koiosUTxO.reference_script.type == "plutusV1"
      ? {
          type: "PlutusV1",
          script: applyDoubleCborEncoding(koiosUTxO.reference_script.bytes),
        }
      : {
          type: "PlutusV2",
          script: applyDoubleCborEncoding(koiosUTxO.reference_script.bytes),
        }
    : undefined,
});
