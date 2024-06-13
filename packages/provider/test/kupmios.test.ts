import { assert, describe, test } from "vitest";
import { Kupmios, FetchProvider } from "../src/index";
import { JSONRPCSchema, ProtocolParametersSchema } from "../src/kupmios/schema";
import { Effect, Console } from "effect";
import * as S from "@effect/schema/Schema";
import { ProtocolParameters } from "@lucid-evolution/core-types";
import { ArrayFormatter } from "@effect/schema";

describe("Kupmios", () => {
  const kupmios = new Kupmios("http://localhost:1442", "http://localhost:1337");
  test("getProtocolParameters", async () => {
    const pp: ProtocolParameters = await kupmios.getProtocolParameters();
    assert(pp);
  });

  test("getUtxos", async () => {
    const utxos = await kupmios.getUtxos(
      "addr_test1qqwpl7h3g84mhr36wpetk904p7fchx2vst0z696lxk8ujsjyruqwmlsm344gfux3nsj6njyzj3ppvrqtt36cp9xyydzqzumz82",
    );
    assert(utxos);
  });

  test.skip("awaitTx", async () => {
    const isConfirmed: boolean = await kupmios.awaitTx(
      "4811ab0aa878d48616bb753bc4d72a829bcc5ef7d3913e8aa58460105a974f22",
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
      S.decodeUnknown(JSONRPCSchema(ProtocolParametersSchema))(json),
    ),
    Effect.catchTag("ParseError", (e) =>
      Effect.fail(ArrayFormatter.formatErrorSync(e)),
    ),
    Effect.timeout(10000),
    Effect.tap((res) => Console.log(res.result)),
    Effect.runPromise,
  );
});
