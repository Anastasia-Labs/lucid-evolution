import { Network } from "@evolution-sdk/core-types";
import { Data } from "effect";

export const ERROR_MESSAGE = {
  MULTIPLE_POLICIES:
    "MULTIPLE_POLICIES: Only one policy id allowed. You can chain multiple mintAssets functions together if you need to mint assets with different policy ids. ",
  EMPTY_UTXO:
    "EMPTY_UTXO: UTxO array is empty. If a Tx has been recently submitted, consider waiting for chain sync",
  MISSING_WALLET:
    "MISSING_WALLET: please ensure that your wallet has been properly configured and initialized",
  MISSING_REDEEMER: "MISSING_REDEEMER: redeemer can not be undefined",
  DATUM_NOT_SET:
    "DATUM_NOT_SET: Script inputs becomes unspendable without datum.",
  EMPTY_ASSETS:
    "EMPTY_ASSETS: Attempting to pay to an address with an empty assets object",
  MISSING_REWARD_TYPE: "MISSING_REWARD_TYPE: Address type must be Reward type.",
  MISSING_STAKE_CREDENTIAL:
    "MISSING_STAKE_CREDENTIAL: Address does not contain stake credential",
  MISSING_PAYMENT_CREDENTIAL:
    "MISSING_PAYMENT_CREDENTIAL: Address does not contain payment credential",
  INVALID_METADATA: "INVALID_METADATA: metadata is invalid",
  SCRIPT_CREDENTIAL_NOT_ALLOWED:
    "SCRIPT_CREDENTIAL_NOT_ALLOWED: Only verification key credential is allowed",
  INVALID_SCRIPT: "INVALID_SCRIPT: Script is invalid",
  EXPECTED_KEY_HASH: "EXPECTED_KEY_HASH",
  INVALID_NETWORK: (
    address: string,
    actualNetworkId: number,
    network: Network,
  ) =>
    `Invalid address: ${address}, Expected address with network id ${actualNetworkId}, current network ${network}`,
  MISSING_SCRIPT: (hash: string) =>
    `MISSING_SCRIPT: Script not found when building transaction, consider using attach modules. script_hash: ${hash}`,
  MISSING_POLICY: (policyId: string) =>
    `MISSING_POLICY: No policy found, policy_id: ${policyId}`,
} as const;

export class NullableError extends Data.TaggedError("NullableError")<{
  readonly message: string;
}> {}

export class UnauthorizedNetwork extends Data.TaggedError(
  "UnauthorizedNetwork",
)<{
  readonly message: string;
}> {}

export class TxBuilderError extends Data.TaggedError("TxBuilderError")<{
  readonly cause: unknown;
}> {
  get message() {
    return `${this.cause}`;
  }
}
export type TransactionError = RunTimeError | TxBuilderError;

export class TxSignerError extends Data.TaggedError("TxSignerError")<{
  readonly cause: unknown;
}> {
  get message() {
    return `${this.cause}`;
  }
}

export type TransactionSignError = RunTimeError | TxSignerError;

export class TxSubmitError extends Data.TaggedError("TxSubmitError")<{
  readonly cause: unknown;
}> {
  get message() {
    return `${this.cause}`;
  }
}

//NOTE: RunTimeError is used to catch all unexpected errors primarly from CML library
export class RunTimeError extends Data.TaggedError("RunTimeError")<{
  cause: unknown;
}> {
  get message() {
    return `${this.cause}`;
  }
}
