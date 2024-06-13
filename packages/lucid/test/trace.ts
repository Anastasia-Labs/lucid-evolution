import { Effect, Layer, pipe } from "effect";
import * as StakeEndpoints from "./specs/stake.js";
import * as HelloEndpoints from "./specs/hello.js";
import { HelloContract, User } from "./specs/services.js";
import { NodeSdk } from "@effect/opentelemetry";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

const NodeSdkLive = NodeSdk.layer(() => ({
  resource: { serviceName: "Transaction" },
  spanProcessor: new BatchSpanProcessor(new OTLPTraceExporter()),
}));

const program = Effect.all([
  HelloEndpoints.depositFunds,
  HelloEndpoints.collectFunds,
]).pipe(Effect.provide(Layer.mergeAll(User.layer, HelloContract.layer)));
await Effect.runPromise(program);
