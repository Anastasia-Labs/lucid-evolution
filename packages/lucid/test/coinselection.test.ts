import { Assets, UTxO } from "@evolution-sdk/core-types";
import { assert, describe, expect, it, test } from "vitest";
import { recursive } from "../src/tx-builder/internal/CompleteTxBuilder.js";
import { sortUTxOs } from "@evolution-sdk/utils";
import { createHash } from "node:crypto";
import { Effect } from "effect";

const sha256 = (input: string) =>
  createHash("sha256").update(input).digest("hex");

const createDummyUTxO = (
  index: number,
  lovelaceAmount: bigint,
  numAssets: number,
): UTxO => ({
  txHash: sha256(index.toString()),
  outputIndex: index,
  assets: createDummyAssets(lovelaceAmount, numAssets),
  datumHash: undefined,
  datum: undefined,
  scriptRef: undefined,
  address: `addr_test${sha256(index.toString())}`,
});

const createDummyAssets = (lovelaceAmount: bigint, numAssets: number) => {
  const assets: Assets = {
    lovelace: lovelaceAmount,
  };
  for (let i = 0; i < numAssets; i++) {
    const assetId = sha256(i.toString());
    const amount = BigInt(i);
    assets[assetId] = amount;
  }
  return assets;
};

describe("coinSelection", () => {
  it("should select largest first , input index_1(9_798_383n) ", async () => {
    const inputs: UTxO[] = [
      createDummyUTxO(0, 5_000_000n, 0),
      createDummyUTxO(1, 9_798_383n, 0),
      createDummyUTxO(2, 3_662_726n, 7),
    ];
    const program = recursive(
      sortUTxOs(inputs),
      { lovelace: 5_000_000n },
      4310n,
    );
    const exit = await Effect.runPromiseExit(program);
    // TODO: try using only one exepect
    expect(exit._tag).toBe("Success");
    if (exit._tag == "Success")
      expect(exit.value).toStrictEqual({
        selected: [inputs[1]],
        burnable: { lovelace: 0n },
      });
  });
  it("should select largest first, and input index_1(5_000_000n), index_2(3_662_726n)", async () => {
    // console.log(selected);
    const inputs: UTxO[] = [
      createDummyUTxO(0, 798_383n, 0),
      createDummyUTxO(1, 5_000_000n, 1),
      createDummyUTxO(2, 3_662_726n, 7),
    ];
    const program = recursive(
      sortUTxOs(inputs),
      { lovelace: 5_900_000n },
      4310n,
    );
    const exit = await Effect.runPromiseExit(program);
    // TODO: try using only one expect
    expect(exit._tag).toBe("Success");
    if (exit._tag == "Success")
      expect(exit.value).toStrictEqual({
        selected: [inputs[1], inputs[2]],
        burnable: { lovelace: 0n },
      });
  });

  it("should select largest first, and input index 1, 0, 2", async () => {
    const inputs: UTxO[] = [
      createDummyUTxO(0, 798_383n, 0),
      createDummyUTxO(1, 5_000_000n, 0),
      createDummyUTxO(2, 466_272n, 0),
    ];
    const program = recursive(
      sortUTxOs(inputs),
      { lovelace: 5_200_000n },
      4310n,
    );
    const exit = await Effect.runPromiseExit(program);
    // TODO: try using only one expect
    expect(exit._tag).toStrictEqual("Success");
    if (exit._tag == "Success")
      expect(exit.value).toStrictEqual({
        selected: [inputs[1], inputs[0], inputs[2]],
        burnable: { lovelace: 0n },
      });
  });
  it("should select none", async () => {
    const inputs: UTxO[] = [
      createDummyUTxO(0, 798_383n, 5),
      createDummyUTxO(1, 5_000_000n, 40),
      createDummyUTxO(2, 466_272n, 7),
    ];
    const program = recursive(
      sortUTxOs(inputs),
      { lovelace: 5_200_000n },
      4310n,
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toStrictEqual("Failure");
  });
  it("should select all", async () => {
    const inputs: UTxO[] = [
      createDummyUTxO(0, 798_383n, 5),
      createDummyUTxO(1, 5_000_000n, 40),
      createDummyUTxO(2, 466_272n, 7),
      createDummyUTxO(3, 1_000_000n, 0),
      createDummyUTxO(4, 1_000_000n, 0),
      createDummyUTxO(5, 1_000_000n, 0),
      createDummyUTxO(6, 1_000_000n, 0),
      createDummyUTxO(7, 1_000_000n, 0),
      createDummyUTxO(8, 1_000_000n, 0),
      createDummyUTxO(9, 905327n, 0),
      createDummyUTxO(10, 781143n, 0),
    ];
    const program = recursive(
      sortUTxOs(inputs),
      { lovelace: 5_200_000n },
      4310n,
    );
    const expectedSelection = [
      inputs[1],
      inputs[3],
      inputs[4],
      inputs[5],
      inputs[6],
      inputs[7],
      inputs[8],
      inputs[9],
      inputs[0],
    ];

    const exit = await Effect.runPromiseExit(program);
    // TODO: try using only one exepect
    expect(exit._tag).toBe("Success");
    if (exit._tag == "Success")
      expect(exit.value).toStrictEqual({
        selected: expectedSelection,
        burnable: { lovelace: 0n },
      });
  });
  it("should select largest first, and input index 0, 2", async () => {
    const inputs: UTxO[] = [
      createDummyUTxO(0, 798_383n, 0),
      createDummyUTxO(1, 100_000n, 0),
      createDummyUTxO(2, 466_272n, 0),
    ];
    const program = recursive(sortUTxOs(inputs), {}, 4310n, {
      lovelace: 5_000n,
    });
    const exit = await Effect.runPromiseExit(program);
    // TODO: try using only one expect
    expect(exit._tag).toStrictEqual("Success");
    if (exit._tag == "Success")
      expect(exit.value).toStrictEqual({
        selected: [inputs[0], inputs[2]],
        burnable: { lovelace: 0n },
      });
  });
});

// const inputs: UTxO[] = [
//   createDummyUTxO(0, 798383n, 5),
//   createDummyUTxO(1, 5000000n, 40),
//   createDummyUTxO(2, 466272n, 7),
// ];
// const selected = recursive(
//   sortUTxOs(inputs),
//   { lovelace: 5_200_000n },
//   { lovelace: 100_000n },
//   [],
//   4310n
// );

// const inputs: UTxO[] = [
//   createDummyUTxO(0, 798383n, 0),
//   createDummyUTxO(1, 5000000n, 1),
//   createDummyUTxO(2, 466272n, 7),
// ];
// const selected = recursive(sortUTxOs(inputs), { lovelace: 5_200_000n }, 4310n);
