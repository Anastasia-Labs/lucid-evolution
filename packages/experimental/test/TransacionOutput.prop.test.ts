import { describe, expect, it } from "vitest";
import { FastCheck, Schema } from "effect";
import * as TransactionOutput from "../src/TransactionOutput.js";
import * as ShelleyTransactionOutput from "../src/ShelleyTransactionOutput.js";
import * as BabbageTransactionOutput from "../src/BabbageTransactionOutput.js";

describe("TransactionOutput property tests", () => {
  describe("TransactionOutput", () => {
    it("should be a valid CBORBytes transaction output", () => {
      FastCheck.assert(
        FastCheck.property(TransactionOutput.generator, (output) => {
          const cborBytes = Schema.encodeSync(TransactionOutput.CBORBytes)(
            output,
          );
          const decoded = Schema.decodeSync(TransactionOutput.CBORBytes)(
            cborBytes,
          );
          expect(decoded).toEqual(output);
        }),
      );
    });

    it("should be a valid CBORHex transaction output", () => {
      FastCheck.assert(
        FastCheck.property(TransactionOutput.generator, (output) => {
          const cborHex = Schema.encodeSync(TransactionOutput.CBORHex)(output);
          const decoded = Schema.decodeSync(TransactionOutput.CBORHex)(cborHex);
          expect(decoded).toEqual(output);
        }),
      );
    });

    it("should correctly identify ShelleyTransactionOutput via union schema", () => {
      FastCheck.assert(
        FastCheck.property(
          ShelleyTransactionOutput.generator,
          (shelleyOutput) => {
            const cborBytes = Schema.encodeSync(
              ShelleyTransactionOutput.CBORBytes,
            )(shelleyOutput);
            const decoded = Schema.decodeSync(TransactionOutput.CBORBytes)(
              cborBytes,
            );
            expect(decoded._tag).toBe("ShelleyTransactionOutput");
            expect(decoded).toEqual(shelleyOutput);
          },
        ),
      );
    });

    it("should correctly identify BabbageTransactionOutput via union schema", () => {
      FastCheck.assert(
        FastCheck.property(
          BabbageTransactionOutput.generator,
          (babbageOutput) => {
            const cborBytes = Schema.encodeSync(
              BabbageTransactionOutput.CBORBytes,
            )(babbageOutput);
            const decoded = Schema.decodeSync(TransactionOutput.CBORBytes)(
              cborBytes,
            );
            expect(decoded._tag).toBe("BabbageTransactionOutput");
            expect(decoded).toEqual(babbageOutput);
          },
        ),
      );
    });
  });
});
