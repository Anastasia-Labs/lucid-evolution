import { describe, expect, it } from "vitest";
import { FastCheck, Schema } from "effect";
import * as DatumHash from "../src/DatumHash.js";

describe("DatumHash property tests", () => {
    describe("DatumHash", () => {
        it("should be a valid HexString datum hash", () => {
            FastCheck.assert(
                FastCheck.property(DatumHash.generator, (datumHash) => {
                    const hexString = Schema.encodeSync(DatumHash.HexString)(
                        datumHash,
                    );
                    const decoded = Schema.decodeSync(DatumHash.HexString)(
                        hexString,
                    );
                    expect(DatumHash.equals(decoded, datumHash)).toBe(true);
                }),
            );
        });

        it("should be a valid Bytes datum hash", () => {
            FastCheck.assert(
                FastCheck.property(DatumHash.generator, (datumHash) => {
                    const bytes = Schema.encodeSync(DatumHash.Bytes)(datumHash);
                    const decoded = Schema.decodeSync(DatumHash.Bytes)(bytes);
                    expect(DatumHash.equals(decoded, datumHash)).toBe(true);
                }),
            );
        });
    });
});
