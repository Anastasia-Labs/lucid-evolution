import { describe, expect, it } from "vitest";
import { FastCheck, Schema } from "effect";
import * as Address from "../src/Address.js";

describe("Address property tests", () => {
  describe("Address", () => {
    it("should be a valid Bech32 address", () => {
      FastCheck.assert(
        FastCheck.property(Address.generator, (address) => {
          const bech32 = Schema.encodeSync(Address.Bech32Schema)(address);
          const decoded = Schema.decodeSync(Address.Bech32Schema)(bech32);
          expect(decoded).toEqual(address);
        }),
      );
    });
    it("should be a valid HexString address", () => {
      FastCheck.assert(
        FastCheck.property(Address.generator, (address) => {
          const hexString = Schema.encodeSync(Address.HexStringSchema)(address);
          const decoded = Schema.decodeSync(Address.HexStringSchema)(hexString);
          expect(decoded).toEqual(address);
        }),
      );
    });
    it("should be a valid Bytes address", () => {
      FastCheck.assert(
        FastCheck.property(Address.generator, (address) => {
          const bytes = Schema.encodeSync(Address.BytesSchema)(address);
          const decoded = Schema.decodeSync(Address.BytesSchema)(bytes);
          expect(decoded).toEqual(address);
        }),
      );
    });
  });
});
