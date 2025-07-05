import { describe, expect, it } from "vitest";
import { FastCheck, Schema } from "effect";
import * as ShelleyTransactionOutput from "../src/ShelleyTransactionOutput.js";

describe("ShelleyTransactionOutput property tests", () => {
  describe("ShelleyTransactionOutput", () => {
    it("should be a valid CBORBytes transaction output", () => {
      FastCheck.assert(
        FastCheck.property(ShelleyTransactionOutput.generator, (output) => {
          const cborBytes = Schema.encodeSync(
            ShelleyTransactionOutput.CBORBytes,
          )(output);
          const decoded = Schema.decodeSync(ShelleyTransactionOutput.CBORBytes)(
            cborBytes,
          );
          expect(decoded).toEqual(output);
        }),
      );
    });

    it("should be a valid CBORHex transaction output", () => {
      FastCheck.assert(
        FastCheck.property(ShelleyTransactionOutput.generator, (output) => {
          const cborHex = Schema.encodeSync(ShelleyTransactionOutput.CBORHex)(
            output,
          );
          const decoded = Schema.decodeSync(ShelleyTransactionOutput.CBORHex)(
            cborHex,
          );
          expect(decoded).toEqual(output);
        }),
      );
    });
  });
});
