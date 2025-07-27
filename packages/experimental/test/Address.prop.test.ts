import { describe, expect, it } from "vitest";
import { FastCheck, Schema } from "effect";
import * as Address from "../src/Address.js";

describe("Address property tests", () => {
  describe("Address", () => {
    it("should be a valid Bech32 address", () => {
      FastCheck.assert(
        FastCheck.property(Address.generator, (address) => {
          const bech32 = Schema.encodeSync(Address.FromBech32)(address);
          const decoded = Schema.decodeSync(Address.FromBech32)(bech32);
          expect(decoded).toEqual(address);
        }),
      );
    });
    it("should be a valid HexString address", () => {
      FastCheck.assert(
        FastCheck.property(Address.generator, (address) => {
          const hexString = Schema.encodeSync(Address.FromHex)(address);
          const decoded = Schema.decodeSync(Address.FromHex)(hexString);
          expect(decoded).toEqual(address);
        }),
      );
    });
    it("should be a valid Bytes address", () => {
      FastCheck.assert(
        FastCheck.property(Address.generator, (address) => {
          const bytes = Schema.encodeSync(Address.FromBytes)(address);
          const decoded = Schema.decodeSync(Address.FromBytes)(bytes);
          expect(decoded).toEqual(address);
        }),
      );
    });
  });
});
