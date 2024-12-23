import { Predicate } from "effect";

export const make = ({
  cause,
  message,
}: {
  message?: string;
  cause?: unknown;
}) => {
  if (!message && !cause) return { message: "Unknown error occurred" };
  if (!message)
    return Predicate.isError(cause)
      ? { message: cause.message, cause }
      : { message: String(cause) };
  if (!cause) return { message };

  const causeStr = Predicate.isError(cause) ? cause.message : String(cause);

  return { message: `${message} | Cause: ${causeStr}`, cause };
};

export const makeFromUnknown = ({ cause }: { cause: unknown }) =>
  Predicate.isError(cause)
    ? { message: cause.message, cause }
    : { message: String(cause) };
