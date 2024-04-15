import {
  Address,
  PaymentKeyHash,
  RewardAddress,
  StakeKeyHash,
} from "@lucid-evolution/core-types";
import { TxBuilderConfig } from "../types.js";
import { getAddressDetails } from "@lucid-evolution/utils";
import { Effect, pipe } from "effect";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { TxBuilderError, TxBuilderErrorCause } from "../../Errors.js";

export const addSignerError = (cause: TxBuilderErrorCause, message?: string) =>
  new TxBuilderError({ cause, module: "Signer", message });

export const addSigner = (
  config: TxBuilderConfig,
  address: Address | RewardAddress,
) => {
  const program = Effect.gen(function* ($) {
    const addressDetails = getAddressDetails(address);
    if (!addressDetails.paymentCredential && !addressDetails.stakeCredential)
      yield* $(
        addSignerError(
          "NotFound",
          "undefined paymentCredential and stakeCredential",
        ),
      );

    const credential =
      addressDetails.type === "Reward"
        ? addressDetails.stakeCredential!
        : addressDetails.paymentCredential!;

    if (credential.type === "Script")
      yield* $(
        addSignerError(
          "InvalidCredential",
          "Only key hashes are allowed as signers.",
        ),
      );

    return credential.hash;
  });
  return pipe(
    program,
    Effect.flatMap((keyHash) => addSignerKey(config, keyHash)),
  );
};

/** Add a payment or stake key hash as a required signer of the transaction. */
export const addSignerKey = (
  config: TxBuilderConfig,
  keyHash: PaymentKeyHash | StakeKeyHash,
) => {
  const program = Effect.gen(function* ($) {
    config.txBuilder.add_required_signer(CML.Ed25519KeyHash.from_hex(keyHash));
  });
  return program;
};
