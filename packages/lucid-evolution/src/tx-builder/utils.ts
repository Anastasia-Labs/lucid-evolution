import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { C } from "lucid-cardano";
import { CBORHex, OutputDatum } from "./types.js";
import { Effect } from "effect";
import { fromHex } from "@lucid-evolution/core-utils";
import { networkToId } from "@lucid-evolution/utils";
import { Address, RewardAddress } from "@lucid-evolution/core-types";
import { TxRunTimeError, NetworkError } from "../Errors.js";
import { LucidConfig } from "../lucid-evolution/LucidEvolution.js";
import { getAddressDetails } from "@lucid-evolution/utils";

export const toDatumOption = (outputDatum: OutputDatum): CML.DatumOption => {
  switch (outputDatum.kind) {
    case "hash":
      return CML.DatumOption.new_hash(
        CML.DatumHash.from_hex(outputDatum.value),
      );
    case "asHash": {
      const plutusData = CML.PlutusData.from_cbor_hex(outputDatum.value);
      return CML.DatumOption.new_hash(CML.hash_plutus_data(plutusData));
    }
    case "inline": {
      const plutusData = CML.PlutusData.from_cbor_hex(outputDatum.value);
      return CML.DatumOption.new_datum(plutusData);
    }
  }
};

export const addressFromWithNetworkCheck = (
  address: Address | RewardAddress,
  lucidConfig: LucidConfig,
): Effect.Effect<CML.Address, TxRunTimeError | NetworkError, never> => {
  const program = Effect.gen(function* ($) {
    const { type, networkId } = yield* $(
      Effect.try({
        try: () => getAddressDetails(address),
        catch: (e) =>
          new TxRunTimeError({
            message: `${addressFromWithNetworkCheck.name} , ${String(e)}`,
          }),
      }),
    );
    const actualNetworkId = networkToId(lucidConfig.network);
    if (networkId !== actualNetworkId) {
      yield* $(
        Effect.fail(
          new NetworkError({
            message: `Invalid address: ${address}, Expected address with network id ${actualNetworkId}, current network ${lucidConfig.network}`,
          }),
        ),
      );
    }
    return type === "Byron"
      ? CML.ByronAddress.from_base58(address).to_address()
      : CML.Address.from_bech32(address);
  });
  return program;
};

export const toV1 = (script: string) =>
  CML.PlutusScript.from_v1(CML.PlutusV1Script.from_cbor_hex(script));
export const toV2 = (script: string) =>
  CML.PlutusScript.from_v2(CML.PlutusV1Script.from_cbor_hex(script));

export const toPartial = (script: CML.PlutusScript, redeemer: CBORHex) =>
  CML.PartialPlutusWitness.new(
    CML.PlutusScriptWitness.new_script(script),
    CML.PlutusData.from_cbor_hex(redeemer),
  );

export function toCMLTransactionHash(body: CML.TransactionBody) {
  const TransactionHash = C.hash_transaction(
    C.TransactionBody.from_bytes(fromHex(body.to_cbor_hex())),
  );
  return CML.TransactionHash.from_hex(TransactionHash.to_hex());
}

export function isEqual(arr1: Uint8Array, arr2: Uint8Array): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((value, index) => value === arr2[index]);
}
