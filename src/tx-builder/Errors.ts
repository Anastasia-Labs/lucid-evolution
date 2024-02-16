import { Data, Effect } from "effect";
import { NoSuchElementException } from "effect/Cause";

export class MissingDatumError {
  readonly _tag = "NoUTXOsInScriptError";
}

export class InvalidDatumError {
  readonly _tag = "InvalidDatumError";
}

export class DatumOfError {
  readonly _tag = "DatumOfError";
}

export class GetUTxosCoreError {
  readonly _tag = "GetUTxosCoreError";
}

export class WalletAddressError {
  readonly _tag = "WalletAddressError";
}

export class RunTimeError extends Data.TaggedError("RunTimeError")<{
  message: {
    cause: string;
    stack: string;
  };
}> {}

export class TxRunTimeError extends Data.TaggedError("TxRunTimeError")<{
  message: string;
}> {}

export class NetworkError extends Data.TaggedError("NetworkError")<{
  message: string;
}> {}

export type TransactionErrors =
  | MissingDatumError
  | InvalidDatumError
  | DatumOfError
  | GetUTxosCoreError
  | WalletAddressError
  | TxRunTimeError
  | NetworkError
  | NoSuchElementException;

export const makeRunTimeError = (
  error: unknown
): Effect.Effect<never, RunTimeError> => {
  const isError = error instanceof Error;
  return new RunTimeError({
    message: {
      cause: isError ? `${error.message}` : String(error),
      stack: isError ? `${error.stack}` : "",
    },
  });
};
