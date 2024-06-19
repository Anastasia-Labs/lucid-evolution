import { Data, Effect, pipe } from "effect";

export class FetchError extends Data.TaggedError("FetchError")<{
  readonly message: string;
}> {}

export class ResponseError extends Data.TaggedError("ResponseError")<{
  readonly message: string;
}> {}

export class JsonError extends Data.TaggedError("JsonError")<{
  readonly message: string;
}> {}

export const fetchEffect = (
  input: string | URL | globalThis.Request,
  requestInit?: RequestInit
): Effect.Effect<any, FetchError | ResponseError | JsonError, never> =>
  pipe(
    Effect.tryPromise({
      try: () => fetch(input, requestInit),
      catch: (error) =>
        new FetchError({
          message: `${String(error)}. Please ensure the server is operational or check the validity of the input:${input}.`,
        }),
    }),
    Effect.flatMap((response) =>
      !response.ok
        ? new ResponseError({
            message: `${response.status} ${response.statusText}`,
          })
        : Effect.succeed(response)
    ),
    Effect.flatMap((response) =>
      Effect.tryPromise({
        try: () => response.json(),
        catch: (error) => new JsonError({ message: String(error) }),
      })
    )
  );

// Effect.flatMap((response) =>
//   !response.ok
//     ? Effect.fail(new Error(`${response.status} ${response.statusText}`))
//     : Effect.succeed(response),
// ),
// Effect.flatMap((response) =>
//   Effect.tryPromise({
//     try: () => response.json(),
//     catch: (error) => new Error(String(error)),
//   }),
// ),
