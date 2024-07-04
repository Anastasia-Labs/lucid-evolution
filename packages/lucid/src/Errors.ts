import { Data, Effect } from "effect";

export const ERROR_MESSAGE = {
  MULTIPLE_POLICIES:
    "Only one policy id allowed. You can chain multiple mintAssets functions together if you need to mint assets with different policy ids. ",
  EMPTY_UTXO:
    "UTxO array is empty. If a Tx has been recently submitted, consider waiting for chain sync",
  MISSING_WALLET:
    "Please ensure that it has been properly configured and initialized",
  MISSING_REDEEMER: "redeemer can not be undefined",
};

export type TxBuilderErrorCause =
  | "UPLCEval"
  | "BuildEvaluation"
  | "Build"
  | "Datum"
  | "NotFound"
  | "Provider"
  | "EmptyUTXO"
  | "EmptyAssets"
  | "MissingCollateral"
  | "MultiplePolicies"
  | "InvalidNetwork"
  | "InvalidMetadata"
  | "MissingWallet"
  | "MissingScript"
  | "MissingPolicy"
  | "MissingRedeemer"
  | "MissingStakeCredential"
  | "Address"
  | "InvalidCredential";
export type TxBuilderErrorModule =
  | "Attach"
  | "Collect"
  | "Governance"
  | "Interval"
  | "Mint"
  | "Pay"
  | "Read"
  | "Signer"
  | "Stake"
  | "Pool"
  | "Complete";
export class TxBuilderError extends Data.TaggedError("TxBuilderError")<{
  readonly cause: TxBuilderErrorCause;
  readonly module?: TxBuilderErrorModule;
  readonly message?: string;
}> {}
export type TransactionError = RunTimeError | TxBuilderError;

export type TxSignerErrorCause = "MissingWallet" | "Signature";
export type TxSignerErrorModule = "Sign" | "Complete";
export class TxSignerError extends Data.TaggedError("TxSignerError")<{
  readonly cause: TxSignerErrorCause;
  readonly module: TxSignerErrorModule;
  readonly message?: string;
}> {}
export type TransactionSignError = RunTimeError | TxSignerError;

export type TxSubmitErrorModule = "Submit";
export class TxSubmitError extends Data.TaggedError("TxSubmitError")<{
  readonly cause: string;
  readonly module: TxSubmitErrorModule;
  readonly message?: string;
}> {}

//NOTE: RunTimeError is used to catch all unexpected errors primarly from CML library
export class RunTimeError extends Data.TaggedError("RunTimeError")<{
  message: string;
}> {}

//TODO: maybe use UnknownException instead of RunTimeError
export const makeRunTimeError = (
  error: unknown,
): Effect.Effect<never, RunTimeError> => {
  return new RunTimeError({
    message: JSON.stringify(String(error)),
  });
};
