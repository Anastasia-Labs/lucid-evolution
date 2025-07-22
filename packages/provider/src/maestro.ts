import { CML } from "./core.js";
import {
  Address,
  Assets,
  Credential,
  Datum,
  DatumHash,
  Delegation,
  EvalRedeemer,
  Json,
  OutRef,
  ProtocolParameters,
  Provider,
  RewardAddress,
  Transaction,
  TxHash,
  Unit,
  UTxO,
} from "@evolution-sdk/core-types";
import packageJson from "../package.json" with { type: "json" };
import {
  applyDoubleCborEncoding,
  scriptFromNative,
  utxoToCore,
} from "@evolution-sdk/utils";
import { fromHex } from "@evolution-sdk/core-utils";

export type MaestroSupportedNetworks = "Mainnet" | "Preprod" | "Preview";

export interface MaestroConfig {
  network: MaestroSupportedNetworks;
  apiKey: string;
  turboSubmit?: boolean; // Read about paid turbo transaction submission feature at https://docs-v1.gomaestro.org/docs/Dapp%20Platform/Turbo%20Transaction.
}

// FY8uMdjKfGwdZJcCj0y4I0j0OJTx0xfD
export class Maestro implements Provider {
  url: string;
  apiKey: string;
  turboSubmit: boolean;

  constructor({ network, apiKey, turboSubmit = false }: MaestroConfig) {
    this.url = `https://${network}.gomaestro-api.org/v1`;
    this.apiKey = apiKey;
    this.turboSubmit = turboSubmit;
  }

  async getProtocolParameters(): Promise<ProtocolParameters> {
    const timestampedResult = await fetch(`${this.url}/protocol-parameters`, {
      headers: this.commonHeaders(),
    }).then((res) => res.json());
    const result = timestampedResult.data;
    // Decimal numbers in Maestro are given as ratio of two numbers represented by string of format "firstNumber/secondNumber".
    const decimalFromRationalString = (str: string): number => {
      const forwardSlashIndex = str.indexOf("/");
      return (
        parseInt(str.slice(0, forwardSlashIndex)) /
        parseInt(str.slice(forwardSlashIndex + 1))
      );
    };
    return {
      minFeeA: parseInt(result.min_fee_coefficient),
      minFeeB: parseInt(result.min_fee_constant.ada.lovelace),
      maxTxSize: parseInt(result.max_transaction_size.bytes),
      maxValSize: parseInt(result.max_value_size.bytes),
      keyDeposit: BigInt(result.stake_credential_deposit.ada.lovelace),
      poolDeposit: BigInt(result.stake_pool_deposit.ada.lovelace),
      drepDeposit: BigInt(result.delegate_representative_deposit.ada.lovelace),
      govActionDeposit: BigInt(result.governance_action_deposit.ada.lovelace),
      priceMem: decimalFromRationalString(
        result.script_execution_prices.memory,
      ),
      priceStep: decimalFromRationalString(result.script_execution_prices.cpu),
      maxTxExMem: BigInt(result.max_execution_units_per_transaction.memory),
      maxTxExSteps: BigInt(result.max_execution_units_per_transaction.cpu),
      coinsPerUtxoByte: BigInt(result.min_utxo_deposit_coefficient),
      collateralPercentage: parseInt(result.collateral_percentage),
      maxCollateralInputs: parseInt(result.max_collateral_inputs),
      minFeeRefScriptCostPerByte: parseInt(
        result.min_fee_reference_scripts.base,
      ),
      costModels: {
        PlutusV1: Object.fromEntries(
          result.plutus_cost_models.plutus_v1.map(
            (value: number, index: number) => [index.toString(), value],
          ),
        ),
        PlutusV2: Object.fromEntries(
          result.plutus_cost_models.plutus_v2.map(
            (value: number, index: number) => [index.toString(), value],
          ),
        ),
        PlutusV3: Object.fromEntries(
          result.plutus_cost_models.plutus_v3.map(
            (value: number, index: number) => [index.toString(), value],
          ),
        ),
      },
    };
  }

  private async getUtxosInternal(
    addressOrCredential: Address | Credential,
    unit?: Unit,
  ): Promise<UTxO[]> {
    const queryPredicate = (() => {
      if (typeof addressOrCredential === "string") {
        return "/addresses/" + addressOrCredential;
      }
      let credentialBech32Query = "/addresses/cred/";
      credentialBech32Query +=
        addressOrCredential.type === "Key"
          ? CML.Ed25519KeyHash.from_hex(addressOrCredential.hash).to_bech32(
              "addr_vkh",
            )
          : CML.ScriptHash.from_hex(addressOrCredential.hash).to_bech32(
              "addr_shared_vkh",
            );
      return credentialBech32Query;
    })();
    const qparams = new URLSearchParams({
      count: "100",
      ...(unit && { asset: unit }),
    });
    const result: MaestroUtxos = await this.getAllPagesData(
      async (qry: string) =>
        await fetch(qry, {
          headers: this.requireAmountsAsStrings(this.commonHeaders()),
        }),
      `${this.url}${queryPredicate}/utxos`,
      qparams,
      "Location: getUtxosInternal. Error: Could not fetch UTxOs from Maestro",
    );
    return result.map(this.maestroUtxoToUtxo);
  }

  getUtxos(addressOrCredential: Address | Credential): Promise<UTxO[]> {
    return this.getUtxosInternal(addressOrCredential);
  }

  getUtxosWithUnit(
    addressOrCredential: Address | Credential,
    unit: Unit,
  ): Promise<UTxO[]> {
    return this.getUtxosInternal(addressOrCredential, unit);
  }

  async getUtxoByUnit(unit: Unit): Promise<UTxO> {
    const timestampedAddressesResponse = await fetch(
      `${this.url}/assets/${unit}/addresses?count=2`,
      { headers: this.commonHeaders() },
    );
    const timestampedAddresses = await timestampedAddressesResponse.json();
    if (!timestampedAddressesResponse.ok) {
      if (timestampedAddresses.message) {
        throw new Error(timestampedAddresses.message);
      }
      throw new Error(
        "Location: getUtxoByUnit. Error: Couldn't perform query. Received status code: " +
          timestampedAddressesResponse.status,
      );
    }
    const addressesWithAmount = timestampedAddresses.data;
    if (addressesWithAmount.length === 0) {
      throw new Error("Location: getUtxoByUnit. Error: Unit not found.");
    }
    if (addressesWithAmount.length > 1) {
      throw new Error(
        "Location: getUtxoByUnit. Error: Unit needs to be an NFT or only held by one address.",
      );
    }

    const address = addressesWithAmount[0].address;

    const utxos = await this.getUtxosWithUnit(address, unit);

    if (utxos.length > 1) {
      throw new Error(
        "Location: getUtxoByUnit. Error: Unit needs to be an NFT or only held by one address.",
      );
    }

    return utxos[0];
  }

  async getUtxosByOutRef(outRefs: OutRef[]): Promise<UTxO[]> {
    const qry = `${this.url}/transactions/outputs`;
    const body = JSON.stringify(
      outRefs.map(({ txHash, outputIndex }) => `${txHash}#${outputIndex}`),
    );
    const utxos = await this.getAllPagesData<MaestroUtxo>(
      async (qry: string) =>
        await fetch(qry, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...this.requireAmountsAsStrings(this.commonHeaders()),
          },
          body: body,
        }),
      qry,
      new URLSearchParams({}),
      "Location: getUtxosByOutRef. Error: Could not fetch UTxOs by references from Maestro",
    );
    return utxos.map(this.maestroUtxoToUtxo);
  }

  async getDelegation(rewardAddress: RewardAddress): Promise<Delegation> {
    const timestampedResultResponse = await fetch(
      `${this.url}/accounts/${rewardAddress}`,
      { headers: this.commonHeaders() },
    );
    if (!timestampedResultResponse.ok) {
      return { poolId: null, rewards: 0n };
    }
    const timestampedResult = await timestampedResultResponse.json();
    const result = timestampedResult.data;
    return {
      poolId: result.delegated_pool || null,
      rewards: BigInt(result.rewards_available),
    };
  }

  async getDatum(datumHash: DatumHash): Promise<Datum> {
    const timestampedResultResponse = await fetch(
      `${this.url}/datums/${datumHash}`,
      {
        headers: this.commonHeaders(),
      },
    );
    if (!timestampedResultResponse.ok) {
      if (timestampedResultResponse.status === 404) {
        throw new Error(`No datum found for datum hash: ${datumHash}`);
      } else {
        throw new Error(
          "Location: getDatum. Error: Couldn't successfully perform query. Received status code: " +
            timestampedResultResponse.status,
        );
      }
    }
    const timestampedResult = await timestampedResultResponse.json();
    return timestampedResult.data.bytes;
  }

  awaitTx(txHash: TxHash, checkInterval = 3000): Promise<boolean> {
    return new Promise((res) => {
      const confirmation = setInterval(async () => {
        const isConfirmedResponse = await fetch(
          `${this.url}/transactions/${txHash}/cbor`,
          {
            headers: this.commonHeaders(),
          },
        );
        if (isConfirmedResponse.ok) {
          await isConfirmedResponse.json();
          clearInterval(confirmation);
          await new Promise((res) => setTimeout(() => res(1), 1000));
          return res(true);
        }
      }, checkInterval);
    });
  }

  async submitTx(tx: Transaction): Promise<TxHash> {
    let queryUrl = `${this.url}/txmanager`;
    queryUrl += this.turboSubmit ? "/turbosubmit" : "";
    const response = await fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/cbor",
        Accept: "text/plain",
        ...this.commonHeaders(),
      },
      body: fromHex(tx),
    });
    const result = await response.text();
    if (!response.ok) {
      if (response.status === 400) throw new Error(result);
      else {
        throw new Error(
          "Could not submit transaction. Received status code: " +
            response.status,
        );
      }
    }
    return result;
  }

  private commonHeaders() {
    return { "api-key": this.apiKey, lucid };
  }

  private requireAmountsAsStrings(obj: { "api-key": string; lucid: string }) {
    return { ...obj, "amounts-as-strings": "true" };
  }

  private maestroUtxoToUtxo(result: MaestroUtxo): UTxO {
    return {
      txHash: result.tx_hash,
      outputIndex: result.index,
      assets: (() => {
        const a: Assets = {};
        result.assets.forEach((am) => {
          a[am.unit] = BigInt(am.amount);
        });
        return a;
      })(),
      address: result.address,
      datumHash: result.datum
        ? result.datum.type == "inline"
          ? undefined
          : result.datum.hash
        : undefined,
      datum: result.datum?.bytes,
      scriptRef: toScriptRef(result.reference_script),
    };
  }
  private async getAllPagesData<T>(
    getResponse: (qry: string) => Promise<Response>,
    qry: string,
    paramsGiven: URLSearchParams,
    errorMsg: string,
  ): Promise<Array<T>> {
    let nextCursor = null;
    let result: Array<T> = [];
    while (true) {
      if (nextCursor !== null) {
        paramsGiven.set("cursor", nextCursor);
      }
      const response = await getResponse(`${qry}?` + paramsGiven);
      const pageResult = await response.json();
      if (!response.ok) {
        throw new Error(
          `${errorMsg}. Received status code: ${response.status}`,
        );
      }
      nextCursor = pageResult.next_cursor;
      result = result.concat(pageResult.data as Array<T>);
      if (nextCursor == null) break;
    }
    return result;
  }

  async evaluateTx(
    tx: Transaction,
    additionalUTxOs?: UTxO[], // for tx chaining
  ): Promise<EvalRedeemer[]> {
    // Transform UTxOs to the Maestro format
    const additionalMaestroUTxOs = (additionalUTxOs || []).map((utxo) => ({
      tx_hash: utxo.txHash,
      index: utxo.outputIndex,
      txout_cbor: utxoToCore(utxo).output().to_cbor_hex(),
    }));

    // Prepare payload
    const payload = {
      cbor: tx,
      additional_utxos: additionalMaestroUTxOs,
    };

    // Perform fetch request
    const res = await fetch(`${this.url}/transactions/evaluate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": this.apiKey,
      },
      body: JSON.stringify(payload),
    });

    // Handle non-ok responses
    if (!res.ok) {
      const body = await res.text();
      console.error("Response error:", JSON.stringify(res));
      throw new Error(`Evaluate transaction failed: ${body}`);
    }

    // Parse and return result
    const result = await res.json();
    return result as EvalRedeemer[];
  }
}

const toScriptRef = (reference_script: MaestroScript | undefined) => {
  if (reference_script && reference_script.bytes) {
    switch (reference_script.type) {
      case "native":
        return scriptFromNative(reference_script.json);
      case "plutusv1":
        return {
          type: "PlutusV1" as const,
          script: applyDoubleCborEncoding(reference_script.bytes),
        };
      case "plutusv2":
        return {
          type: "PlutusV2" as const,
          script: applyDoubleCborEncoding(reference_script.bytes),
        };
      case "plutusv3":
        return {
          type: "PlutusV3" as const,
          script: applyDoubleCborEncoding(reference_script.bytes),
        };
      default:
        return undefined;
    }
  }
};

type MaestroDatumOptionType = "hash" | "inline";

type MaestroDatumOption = {
  type: MaestroDatumOptionType;
  hash: string;
  bytes?: string; // Hex encoded datum CBOR bytes (`null` if datum type is `hash` and corresponding datum bytes have not been seen on-chain).
  json?: Json;
};

type MaestroScriptType = "native" | "plutusv1" | "plutusv2" | "plutusv3";

type MaestroScript = {
  hash: string;
  type: MaestroScriptType;
  bytes?: string; // Script bytes (`null` if `native` script).
  json?: Json;
};

type MaestroAsset = {
  unit: string;
  amount: string;
};

type MaestroUtxo = {
  tx_hash: TxHash;
  index: number;
  assets: Array<MaestroAsset>;
  address: Address;
  datum?: MaestroDatumOption;
  reference_script?: MaestroScript;
  // Other fields such as `slot` & `txout_cbor` are ignored.
};

type MaestroUtxos = Array<MaestroUtxo>;

const lucid = packageJson.version; // Lucid version
