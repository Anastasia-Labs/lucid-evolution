import {
  Address,
  PaymentKeyHash,
  RewardAddress,
  StakeKeyHash,
} from "@evolution-sdk/core-types";
import * as TxBuilder from "../TxBuilder.js";
import { Effect, pipe } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { ERROR_MESSAGE, TxBuilderError } from "../../Errors.js";
import { validateAddressDetails } from "./TxUtils.js";
import { TxConfig } from "./Service.js";

export const addSignerError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ Signer: ${cause} }` });

export const addSigner = (address: Address | RewardAddress) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const addressDetails = yield* validateAddressDetails(
      address,
      config.lucidConfig,
    );

    const credential =
      addressDetails.type === "Reward"
        ? yield* pipe(
            Effect.fromNullable(addressDetails.stakeCredential),
            Effect.orElseFail(() =>
              addSignerError(ERROR_MESSAGE.MISSING_STAKE_CREDENTIAL),
            ),
          )
        : yield* pipe(
            Effect.fromNullable(addressDetails.paymentCredential),
            Effect.orElseFail(() =>
              addSignerError(ERROR_MESSAGE.MISSING_PAYMENT_CREDENTIAL),
            ),
          );

    if (credential.type === "Script")
      yield* addSignerError(ERROR_MESSAGE.SCRIPT_CREDENTIAL_NOT_ALLOWED);

    return credential.hash;
  }).pipe(Effect.flatMap((keyHash) => addSignerKey(keyHash)));

/** Add a payment or stake key hash as a required signer of the transaction. */
export const addSignerKey = (keyHash: PaymentKeyHash | StakeKeyHash) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    config.txBuilder.add_required_signer(CML.Ed25519KeyHash.from_hex(keyHash));
  });
