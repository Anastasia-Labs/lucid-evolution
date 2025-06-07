import { describe, expect, it } from "vitest";
import { FastCheck, Schema } from "effect";
import * as DatumOption from "../src/DatumOption.js";

describe("DatumOption property tests", () => {
  describe("DatumOption", () => {
    it("should be a valid CBORBytes datum option", () => {
      FastCheck.assert(
        FastCheck.property(DatumOption.generator, (datumOption) => {
          const cborBytes = Schema.encodeSync(DatumOption.CBORBytes)(
            datumOption,
          );
          const decoded = Schema.decodeSync(DatumOption.CBORBytes)(cborBytes);
          expect(decoded).toEqual(datumOption);
        }),
      );
    });

    it("should be a valid CBORHex datum option", () => {
      FastCheck.assert(
        FastCheck.property(DatumOption.generator, (datumOption) => {
          const cborHex = Schema.encodeSync(DatumOption.CBORHex)(datumOption);
          const decoded = Schema.decodeSync(DatumOption.CBORHex)(cborHex);
          expect(decoded).toEqual(datumOption);
        }),
      );
    });
  });
});
