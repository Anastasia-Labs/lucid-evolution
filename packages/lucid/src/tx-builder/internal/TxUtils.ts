import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { CBORHex } from "../types.js";
import { Effect, pipe } from "effect";
import { networkToId, getAddressDetails } from "@lucid-evolution/utils";
import {
  Address,
  AddressDetails,
  Redeemer,
  RedeemerBuilder,
  RewardAddress,
  Credential,
} from "@lucid-evolution/core-types";
import { ERROR_MESSAGE, TxBuilderError } from "../../Errors.js";
import { LucidConfig } from "../../lucid-evolution/LucidEvolution.js";
import { TxBuilderConfig } from "../TxBuilder.js";

import * as TxBuilder from "../TxBuilder.js";
import { governanceError } from "./Governance.js";

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

export const handleRedeemerBuilder = (
  config: TxBuilderConfig,
  partialProgram: (
    redeemer?: string | undefined,
  ) => Effect.Effect<void, TxBuilderError, never>,
  redeemer?: string | RedeemerBuilder,
) => {
  if (typeof redeemer === "object") {
    config.partialPrograms.set(redeemer, partialProgram);
  } else {
    const program = partialProgram(redeemer);
    config.programs.push(program);
  }
};

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

export const validateAddressDetails = (
  address: Address | RewardAddress,
  lucidConfig: LucidConfig,
): Effect.Effect<AddressDetails, TxBuilderError, never> =>
  Effect.gen(function* ($) {
    const addressDetails = yield* $(
      Effect.try({
        try: () => getAddressDetails(address),
        catch: (cause) =>
          new TxBuilderError({
            cause,
          }),
      }),
    );
    const actualNetworkId = networkToId(lucidConfig.network);
    if (addressDetails.networkId !== actualNetworkId)
      yield* new TxBuilderError({
        cause: ERROR_MESSAGE.INVALID_NETWORK(
          address,
          actualNetworkId,
          lucidConfig.network,
        ),
      });

    return addressDetails;
  });

export const processStakeCredential = (
  stakeCredential: Credential,
  config: TxBuilder.TxBuilderConfig,
  buildCert: (credential: CML.Credential) => CML.SingleCertificateBuilder,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    switch (stakeCredential.type) {
      case "Key": {
        const credential = CML.Credential.new_pub_key(
          CML.Ed25519KeyHash.from_hex(stakeCredential.hash),
        );
        const certBuilder = buildCert(credential);
        config.txBuilder.add_cert(certBuilder.payment_key());
        break;
      }

      case "Script": {
        const credential = CML.Credential.new_script(
          CML.ScriptHash.from_hex(stakeCredential.hash),
        );
        const certBuilder = buildCert(credential);

        const script = yield* pipe(
          Effect.fromNullable(config.scripts.get(stakeCredential.hash)),
          Effect.orElseFail(() =>
            governanceError(ERROR_MESSAGE.MISSING_SCRIPT(stakeCredential.hash)),
          ),
        );

        const red = yield* pipe(
          Effect.fromNullable(redeemer),
          Effect.orElseFail(() =>
            governanceError(ERROR_MESSAGE.MISSING_REDEEMER),
          ),
        );

        const addPlutusScriptToTx = (scriptVersion: CML.PlutusScript) => {
          config.txBuilder.add_cert(
            certBuilder.plutus_script(
              toPartial(scriptVersion, red),
              CML.Ed25519KeyHashList.new(),
            ),
          );
        };

        switch (script.type) {
          case "PlutusV1":
            addPlutusScriptToTx(toV1(script.script));
            break;

          case "PlutusV2":
            addPlutusScriptToTx(toV2(script.script));
            break;

          case "Native":
            yield* governanceError("NotFound");
            break;
        }
        break;
      }
    }
  });

export const validateAndFetchStakeCredential = (
  rewardAddress: RewardAddress,
  config: TxBuilder.TxBuilderConfig,
): Effect.Effect<Credential, TxBuilderError> =>
  Effect.gen(function* () {
    const addressDetails = yield* pipe(
      validateAddressDetails(rewardAddress, config.lucidConfig),
      Effect.andThen((address) =>
        address.type !== "Reward"
          ? governanceError(ERROR_MESSAGE.MISSING_REWARD_TYPE)
          : Effect.succeed(address),
      ),
    );

    const stakeCredential = yield* pipe(
      Effect.fromNullable(addressDetails.stakeCredential),
      Effect.orElseFail(() =>
        governanceError(ERROR_MESSAGE.MISSING_STAKE_CREDENTIAL),
      ),
    );

    return stakeCredential;
  });
