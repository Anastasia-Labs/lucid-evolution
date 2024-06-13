import { Effect, Schedule } from "effect";

Effect.gen(function* () {
  yield* Effect.log("Welcome to the Effect Playground!");
  const value = [1];
  return value;
}).pipe(
  Effect.repeat({
    schedule: Schedule.exponential(1000),
    until: (value) => value.length > 1,
  }),
  Effect.timeout("5 seconds"),
  Effect.runPromise,
);
