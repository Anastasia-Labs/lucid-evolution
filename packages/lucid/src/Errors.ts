import { Data, Effect } from "effect";

export class MissingDatumError {
  readonly _tag = "NoUTXOsInScriptError";
}

export class InvalidDatumError {
  readonly _tag = "InvalidDatumError";
}

export class UPLCEvalError extends Data.TaggedError("UPLCPhase2Error")<{
  readonly message: string;
}> {}

export class DatumError extends Data.TaggedError("DatumError")<{
  readonly message: string;
}> {}

export class NotFoundError extends Data.TaggedError("NotFoundError")<{
  readonly message: string;
}> {}

export class ProviderError extends Data.TaggedError("ProviderError")<{
  readonly message: string;
}> {}

export class EmptyArrayError extends Data.TaggedError("EmptyArrayError")<{
  message?: string;
}> {}
export class EmptyUTXOArrayError extends Data.TaggedError(
  "EmptyUTXOArrayError",
)<{
  message: string;
}> {}

export const makeEmptyUTXOArrayError = () =>
  new EmptyUTXOArrayError({
    message:
      "UTxO array is empty. If a Tx has been recently submitted, consider waiting for chain sync",
  });

export class SignerError extends Data.TaggedError("SignerError")<{
  message: string;
}> {}

export class MintError extends Data.TaggedError("MintError")<{
  message: string;
}> {}

export const makeMintError = () =>
  new MintError({
    message:
      "Only one policy id allowed. You can chain multiple mintAssets functions together if you need to mint assets with different policy ids. ",
  });

//NOTE: RunTimeError is used to catch all unexpected errors primarly from CML library
export class RunTimeError extends Data.TaggedError("RunTimeError")<{
  message: {
    cause: string;
    stack: string | undefined;
  };
}> {}

export class TxRunTimeError extends Data.TaggedError("TxRunTimeError")<{
  message: string;
}> {}

export class NetworkError extends Data.TaggedError("NetworkError")<{
  message: string;
}> {}

export class WalletError extends Data.TaggedError("WalletError")<{
  message: string;
}> {}

export type TransactionError =
  | MissingDatumError
  | InvalidDatumError
  | DatumError
  | ProviderError
  | TxRunTimeError
  | NetworkError
  | MintError
  | SignerError
  | EmptyArrayError
  | EmptyUTXOArrayError
  | UPLCEvalError
  | NotFoundError
  | RunTimeError;

export type TransactionSignError = RunTimeError | NotFoundError | WalletError;

export const makeRunTimeError = (
  error: unknown,
): Effect.Effect<never, RunTimeError> => {
  const isError = error instanceof Error;
  return new RunTimeError({
    message: {
      cause: isError ? `${error.message}` : String(error),
      stack: isError ? `${error.stack}` : undefined,
    },
  });
};
