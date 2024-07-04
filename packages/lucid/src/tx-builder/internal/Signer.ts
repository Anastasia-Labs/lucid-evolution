import {
  Address,
  PaymentKeyHash,
  RewardAddress,
  StakeKeyHash,
} from "@lucid-evolution/core-types";
import * as TxBuilder from "../TxBuilder.js";
import { Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { TxBuilderError, TxBuilderErrorCause } from "../../Errors.js";
import { validateAddressDetails } from "./TxUtils.js";

export const addSignerError = (cause: TxBuilderErrorCause, message?: string) =>
  new TxBuilderError({ cause, module: "Signer", message });

export const addSigner = (
  config: TxBuilder.TxBuilderConfig,
  address: Address | RewardAddress,
) =>
  Effect.gen(function* () {
    const addressDetails = yield* validateAddressDetails(
      address,
      config.lucidConfig,
    );
    if (!addressDetails.paymentCredential && !addressDetails.stakeCredential)
      yield* addSignerError(
        "NotFound",
        "undefined paymentCredential and stakeCredential",
      );

    const credential =
      addressDetails.type === "Reward"
        ? addressDetails.stakeCredential!
        : addressDetails.paymentCredential!;

    if (credential.type === "Script")
      yield* addSignerError(
        "InvalidCredential",
        "Only key hashes are allowed as signers.",
      );

    return credential.hash;
  }).pipe(Effect.flatMap((keyHash) => addSignerKey(config, keyHash)));

/** Add a payment or stake key hash as a required signer of the transaction. */
export const addSignerKey = (
  config: TxBuilder.TxBuilderConfig,
  keyHash: PaymentKeyHash | StakeKeyHash,
) =>
  Effect.gen(function* () {
    config.txBuilder.add_required_signer(CML.Ed25519KeyHash.from_hex(keyHash));
  });
