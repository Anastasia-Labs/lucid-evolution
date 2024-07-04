import { assert, describe, test } from "vitest";
import { Kupmios, FetchProvider } from "../src/index.js";
import {
  JSONRPCSchema,
  ProtocolParametersSchema,
} from "../src/kupmios/schema.js";
import { Effect, Console } from "effect";
import * as S from "@effect/schema/Schema";
import { ProtocolParameters } from "@lucid-evolution/core-types";
import { ArrayFormatter } from "@effect/schema";
import { exec, spawn } from "node:child_process";
import * as util from "util";
const execPromise = util.promisify(exec);

describe("Kupmios", async () => {
  // Stop devkit
  exec("~/.yaci-devkit/bin/devkit.sh stop &");
  console.log("Stopped devkit");
  // Wait for a delay before starting again (if necessary)
  console.log("waiting 10 seconds");
  await new Promise((resolve) => setTimeout(resolve, 10000)); // 10 seconds delay
  // Start devkit
  exec("~/.yaci-devkit/bin/devkit.sh start create-node -o --start &");
  console.log("Started devkit");
  // Wait for a delay before starting again (if necessary)
  console.log("waiting 30 seconds");
  await new Promise((resolve) => setTimeout(resolve, 30000)); // 30 seconds delay

  const kupmios = new Kupmios("http://localhost:1442", "http://localhost:1337");
  test("getProtocolParameters", async () => {
    const pp: ProtocolParameters = await kupmios.getProtocolParameters();
    assert(pp);
  });

  test("getUtxos", async () => {
    const utxos = await kupmios.getUtxos(
      "addr_test1qzlwg5c3mpr0cz5td0rvr5rvcgf02al05cqgd2wzv7pud6chpzk4elx4jh2f7xtftjrdxddr88wg6sfszu8r3gktpjtqrr00q9"
    );
    console.log(utxos)
    assert(utxos);
  });

  test.skip("awaitTx", async () => {
    const isConfirmed: boolean = await kupmios.awaitTx(
      "4811ab0aa878d48616bb753bc4d72a829bcc5ef7d3913e8aa58460105a974f22"
    );
    assert(isConfirmed);
  });
});

test.skip("fetch", async () => {
  const data = {
    jsonrpc: "2.0",
    method: "queryLedgerState/protocolParameters",
    params: {},
    id: null,
  };
  const request = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  };
  await FetchProvider.fetchEffect("http://localhost:1337", request).pipe(
    Effect.flatMap((json) =>
      S.decodeUnknown(JSONRPCSchema(ProtocolParametersSchema))(json)
    ),
    Effect.catchTag("ParseError", (e) =>
      Effect.fail(ArrayFormatter.formatErrorSync(e))
    ),
    Effect.timeout(10000),
    Effect.tap((res) => Console.log(res.result)),
    Effect.runPromise
  );
});
