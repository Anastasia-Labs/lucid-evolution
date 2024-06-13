import { Effect, Layer, pipe } from "effect";
import { HelloContract, User } from "./specs/services";
import * as HelloEndpoints from "./specs/hello.js";

const program = pipe(
  HelloEndpoints.depositFunds,
  Effect.provide(Layer.mergeAll(User.layer, HelloContract.layer)),
);
const exit = await Effect.runPromiseExit(program);
console.log(exit);
