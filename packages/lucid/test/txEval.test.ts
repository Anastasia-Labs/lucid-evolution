import { describe, expect, test } from "vitest";
import { Effect, pipe } from "effect";
import {
  StakeContract,
  MintContract,
  User,
  NetworkConfig,
} from "./specs/services.js";
import * as MultiValidatorEndpoints from "./specs/multi-validators.js";
import { Blockfrost } from "../src/index.js";

describe.sequential("Tx Eval Test", () => {
  test("Blockfrost", async () => {
    const program = pipe(
      MultiValidatorEndpoints.collectFundsInternal,
      Effect.provide(User.layer),
      Effect.provide(StakeContract.layer),
      Effect.provide(MintContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );

    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
    if (exit._tag == "Success") {
      const projectId = process.env.VITE_BLOCKFROST_KEY_PREPROD;
      const client = new Blockfrost(
        process.env.VITE_BLOCKFROST_API_URL_PREPROD!,
        projectId,
      );
      const redeemers = await client.evaluateTx(exit.value.toCBOR());
      expect(Array.from(redeemers).length).greaterThan(0);
    }
  });
});
