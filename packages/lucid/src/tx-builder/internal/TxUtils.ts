import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { CBORHex, OutputDatum } from "../types.js";
import { Effect } from "effect";
import { networkToId } from "@lucid-evolution/utils";
import {
  Address,
  AddressDetails,
  RewardAddress,
} from "@lucid-evolution/core-types";
import { TxBuilderError } from "../../Errors.js";
import { LucidConfig } from "../../lucid-evolution/LucidEvolution.js";
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

//TODO: improve error message, utils is used in different modules
export const toCMLAddress = (
  address: Address | RewardAddress,
  lucidConfig: LucidConfig,
): Effect.Effect<CML.Address, TxBuilderError, never> =>
  Effect.gen(function* ($) {
    const { type } = yield* validateAddressDetails(address, lucidConfig);
    return type === "Byron"
      ? CML.ByronAddress.from_base58(address).to_address()
      : CML.Address.from_bech32(address);
  });

export const toV1 = (script: string) =>
  CML.PlutusScript.from_v1(CML.PlutusV1Script.from_cbor_hex(script));
export const toV2 = (script: string) => {
  // console.log("before");
  const v2 = CML.PlutusV2Script.from_cbor_hex(script);
  // console.log("v2", v2.hash().to_hex());
  return CML.PlutusScript.from_v2(v2);
};

export const toPartial = (script: CML.PlutusScript, redeemer: CBORHex) =>
  CML.PartialPlutusWitness.new(
    CML.PlutusScriptWitness.new_script(script),
    CML.PlutusData.from_cbor_hex(redeemer),
  );

//NOTE: deprecated
// export function toCMLTransactionHash(body: CML.TransactionBody) {
//   const TransactionHash = C.hash_transaction(
//     C.TransactionBody.from_bytes(fromHex(body.to_cbor_hex())),
//   );
//   return CML.TransactionHash.from_hex(TransactionHash.to_hex());
// }

export function isEqual(arr1: Uint8Array, arr2: Uint8Array): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((value, index) => value === arr2[index]);
}

export const makeReturn = <A, E>(program: Effect.Effect<A, E>) => {
  return {
    unsafeRun: () => Effect.runPromise(program),
    safeRun: () => Effect.runPromise(Effect.either(program)),
    program: () => program,
  };
};

export const validateAddressDetails = (
  address: Address | RewardAddress,
  lucidConfig: LucidConfig,
): Effect.Effect<AddressDetails, TxBuilderError, never> =>
  Effect.gen(function* ($) {
    const addressDetails = yield* $(
      Effect.try({
        try: () => getAddressDetails(address),
        catch: (error) =>
          new TxBuilderError({
            cause: "Address",
            message: String(error),
          }),
      }),
    );
    const actualNetworkId = networkToId(lucidConfig.network);
    if (addressDetails.networkId !== actualNetworkId)
      yield* new TxBuilderError({
        cause: "InvalidNetwork",
        message: `Invalid address: ${address}, Expected address with network id ${actualNetworkId}, current network ${lucidConfig.network}`,
      });

    return addressDetails;
  });
