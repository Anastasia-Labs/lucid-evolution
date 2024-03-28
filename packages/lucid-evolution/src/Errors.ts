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

export class SignerError extends Data.TaggedError("SignerError")<{
  message: string;
}> {}

export class MintError extends Data.TaggedError(
  "Only one policy id allowed. You can chain multiple mintAssets functions together if you need to mint assets with different policy ids. ",
)<{}> {}

export class RunTimeError extends Data.TaggedError("RunTimeError")<{
  message: {
    cause: string;
    // stack: string; TODO: Enable when verbose log is enabled in config
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
  | MintError
  | SignerError
  | NoSuchElementException;

export const makeRunTimeError = (
  error: unknown,
): Effect.Effect<never, RunTimeError> => {
  const isError = error instanceof Error;
  return new RunTimeError({
    message: {
      cause: isError ? `${error.message}` : String(error),
      // stack: isError ? `${error.stack}` : "", TODO: Enable when verbose log is enabled in config
    },
  });
};
