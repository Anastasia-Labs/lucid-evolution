import { describe, expect, it } from "vitest";
import { FastCheck, Schema } from "effect";
import * as BabbageTransactionOutput from "../src/BabbageTransactionOutput.js";

describe("BabbageTransactionOutput property tests", () => {
  it("should be a valid CBORBytes transaction output", () => {
    FastCheck.assert(
      FastCheck.property(BabbageTransactionOutput.generator, (output) => {
        const cborBytes = Schema.encodeSync(BabbageTransactionOutput.CBORBytes)(
          output,
        );
        const decoded = Schema.decodeSync(BabbageTransactionOutput.CBORBytes)(
          cborBytes,
        );
        expect(decoded).toEqual(output);
      }),
    );
  });

  it("should be a valid CBORHex transaction output", () => {
    FastCheck.assert(
      FastCheck.property(BabbageTransactionOutput.generator, (output) => {
        const cborHex = Schema.encodeSync(BabbageTransactionOutput.CBORHex)(
          output,
        );
        const decoded = Schema.decodeSync(BabbageTransactionOutput.CBORHex)(
          cborHex,
        );
        expect(decoded).toEqual(output);
      }),
    );
  });
});
