import type { Provider } from "@lucid-evolution/core-types";
import { KupmiosError } from "../src/index.js";
import { expect, test } from "vitest";

const notImplemented = async (): Promise<never> => {
  throw new Error("not implemented");
};

/**
 * Compile-time fixture for third-party providers that implement the interface
 * that predates optional provider capabilities.
 */
const legacyProvider: Provider = {
  getProtocolParameters: notImplemented,
  getUtxos: async () => [],
  getUtxosWithUnit: async () => [],
  getUtxoByUnit: notImplemented,
  getUtxosByOutRef: async () => [],
  getDelegation: async () => ({ poolId: null, rewards: 0n }),
  getDatum: notImplemented,
  awaitTx: async () => true,
  submitTx: async () => "0".repeat(64),
  evaluateTx: async () => [],
};

test("legacy providers remain structurally compatible", () => {
  expect(legacyProvider.awaitTx).toBeTypeOf("function");
});

test("the legacy KupmiosError constructor remains source-compatible", () => {
  const cause = new Error("legacy failure");
  const error = new KupmiosError({ cause });

  expect(error).toBeInstanceOf(Error);
  expect(error.cause).toBe(cause);
  expect(error._tag).toBe("KupmiosError");
});
