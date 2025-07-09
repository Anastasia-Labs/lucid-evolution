import { describe, expect, it } from "@effect/vitest";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import * as Data from "../src/Data.js";

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Test configuration
 */
const TEST_CONFIG = {
  // Number of samples to test for each test type
  integer: {
    encoding: 4000,
    decoding: 4000,
    roundTrip: 1000,
  },
  byteArray: {
    encoding: 4000,
    decoding: 4000,
    roundTrip: 1000,
  },
  list: {
    encoding: 4000,
    decoding: 4000,
    roundTrip: 250,
  },
  map: {
    encoding: 4000,
    decoding: 4000,
    roundTrip: 250,
  },
  constr: {
    encoding: 4000,
    decoding: 4000,
    roundTrip: 250,
  },
  data: {
    encoding: 4000,
    decoding: 4000,
    roundTrip: 100,
  },
} as const;

/**
 * Interface for golden test entries
 */
interface GoldenEntry {
  index: number;
  sample: any;
  cborHex: string;
  cborBytes: number[];
  roundTripSuccess: boolean;
  metadata: {
    type: string;
    seed: number;
  };
}

/**
 * Interface for golden test summary
 */
interface GoldenSummary {
  seed: number;
  samplesPerType: number;
  types: string[];
  totalSamples: number;
}

/**
 * Reviver function for parsing JSON with BigInt support
 */
const bigintReviver = (_key: string, value: unknown): unknown => {
  if (
    typeof value === "object" &&
    value !== null &&
    "__type" in value &&
    value.__type === "bigint" &&
    "value" in value &&
    typeof value.value === "string"
  ) {
    return BigInt(value.value);
  }
  return value;
};

/**
 * Load golden files from the test/golden directory
 */
const loadGoldenFile = (filename: string): GoldenEntry[] => {
  const filePath = path.join(__dirname, "golden", filename);
  const content = fs.readFileSync(filePath, "utf8");
  return JSON.parse(content, bigintReviver);
};

/**
 * Load golden summary
 */
const loadGoldenSummary = (): GoldenSummary => {
  const filePath = path.join(__dirname, "golden", "summary.json");
  const content = fs.readFileSync(filePath, "utf8");
  return JSON.parse(content);
};

/**
 * Cache for loaded golden files to avoid repeated I/O
 */
const goldenCache = {
  integer: null as GoldenEntry[] | null,
  byteArray: null as GoldenEntry[] | null,
  list: null as GoldenEntry[] | null,
  map: null as GoldenEntry[] | null,
  constr: null as GoldenEntry[] | null,
  data: null as GoldenEntry[] | null,
};

/**
 * Get golden entries with caching
 */
const getGoldenEntries = (type: keyof typeof goldenCache): GoldenEntry[] => {
  if (!goldenCache[type]) {
    goldenCache[type] = loadGoldenFile(`${type}.golden.json`);
  }
  return goldenCache[type]!;
};

/**
 * Get test cases for a specific type and test category
 */
const getTestCases = (
  type: keyof typeof TEST_CONFIG,
  category: keyof (typeof TEST_CONFIG)[typeof type],
): GoldenEntry[] => {
  const entries = getGoldenEntries(type);
  const count = TEST_CONFIG[type][category];
  return entries.slice(0, count);
};

/**
 * Golden Tests for Data module
 *
 * These tests validate that the current Data implementation maintains
 * compatibility with previously generated golden files, ensuring that
 * CBOR encoding/decoding behavior remains consistent across versions.
 */
describe("Data Golden Tests", () => {
  describe("Integer Golden Tests", () => {
    it("should encode integers to CBOR hex consistently", () => {
      const testCases = getTestCases("integer", "encoding");

      testCases.forEach((entry) => {
        const plutusData = Data.int(entry.sample.integer);
        const encoded = Data.Encode.cborHex(plutusData);
        expect(encoded, `Failed at sample index ${entry.index}`).toBe(
          entry.cborHex,
        );
      });
    });

    it("should encode integers to CBOR bytes consistently", () => {
      const testCases = getTestCases("integer", "encoding");

      testCases.forEach((entry) => {
        const plutusData = Data.int(entry.sample.integer);
        const encoded = Data.Encode.cborBytes(plutusData);
        expect(
          Array.from(encoded),
          `Failed at sample index ${entry.index}`,
        ).toEqual(entry.cborBytes);
      });
    });

    it("should decode CBOR hex to integers consistently", () => {
      const testCases = getTestCases("integer", "decoding");

      testCases.forEach((entry) => {
        const decoded = Data.Decode.cborHex(entry.cborHex);
        expect(
          normalizeDecodedData(decoded),
          `Failed at sample index ${entry.index}`,
        ).toEqual(entry.sample);
      });
    });

    it("should decode CBOR bytes to integers consistently", () => {
      const testCases = getTestCases("integer", "decoding");

      testCases.forEach((entry) => {
        const decoded = Data.Decode.cborBytes(new Uint8Array(entry.cborBytes));
        expect(
          normalizeDecodedData(decoded),
          `Failed at sample index ${entry.index}`,
        ).toEqual(entry.sample);
      });
    });

    it("should maintain round-trip consistency", () => {
      const testCases = getTestCases("integer", "roundTrip");

      testCases.forEach((entry) => {
        const plutusData = Data.int(entry.sample.integer);
        const encoded = Data.Encode.cborHex(plutusData);
        const decoded = Data.Decode.cborHex(encoded);

        expect(
          normalizeDecodedData(decoded),
          `Failed at sample index ${entry.index}`,
        ).toEqual(entry.sample);
      });
    });
  });

  describe("ByteArray Golden Tests", () => {
    it("should encode byte arrays to CBOR hex consistently", () => {
      const testCases = getTestCases("byteArray", "encoding");

      testCases.forEach((entry) => {
        const plutusData = Data.bytearray(entry.sample.bytearray);
        const encoded = Data.Encode.cborHex(plutusData);
        expect(encoded, `Failed at sample index ${entry.index}`).toBe(
          entry.cborHex,
        );
      });
    });

    it("should encode byte arrays to CBOR bytes consistently", () => {
      const testCases = getTestCases("byteArray", "encoding");

      testCases.forEach((entry) => {
        const plutusData = Data.bytearray(entry.sample.bytearray);
        const encoded = Data.Encode.cborBytes(plutusData);
        expect(
          Array.from(encoded),
          `Failed at sample index ${entry.index}`,
        ).toEqual(entry.cborBytes);
      });
    });

    it("should decode CBOR hex to byte arrays consistently", () => {
      const testCases = getTestCases("byteArray", "decoding");

      testCases.forEach((entry) => {
        const decoded = Data.Decode.cborHex(entry.cborHex);
        expect(
          normalizeDecodedData(decoded),
          `Failed at sample index ${entry.index}`,
        ).toEqual(entry.sample);
      });
    });

    it("should decode CBOR bytes to byte arrays consistently", () => {
      const testCases = getTestCases("byteArray", "decoding");

      testCases.forEach((entry) => {
        const decoded = Data.Decode.cborBytes(new Uint8Array(entry.cborBytes));
        expect(
          normalizeDecodedData(decoded),
          `Failed at sample index ${entry.index}`,
        ).toEqual(entry.sample);
      });
    });

    it("should maintain round-trip consistency", () => {
      const testCases = getTestCases("byteArray", "roundTrip");

      testCases.forEach((entry) => {
        const plutusData = Data.bytearray(entry.sample.bytearray);
        const encoded = Data.Encode.cborHex(plutusData);
        const decoded = Data.Decode.cborHex(encoded);

        expect(
          normalizeDecodedData(decoded),
          `Failed at sample index ${entry.index}`,
        ).toEqual(entry.sample);
      });
    });
  });

  describe("List Golden Tests", () => {
    it("should encode lists to CBOR hex consistently", () => {
      const testCases = getTestCases("list", "encoding");

      testCases.forEach((entry) => {
        const plutusDataList = entry.sample.list.map(reconstructPlutusData);
        const plutusData = Data.list(plutusDataList);
        const encoded = Data.Encode.cborHex(plutusData);
        expect(encoded, `Failed at sample index ${entry.index}`).toBe(
          entry.cborHex,
        );
      });
    });

    it("should encode lists to CBOR bytes consistently", () => {
      const testCases = getTestCases("list", "encoding");

      testCases.forEach((entry) => {
        const plutusDataList = entry.sample.list.map(reconstructPlutusData);
        const plutusData = Data.list(plutusDataList);
        const encoded = Data.Encode.cborBytes(plutusData);
        expect(
          Array.from(encoded),
          `Failed at sample index ${entry.index}`,
        ).toEqual(entry.cborBytes);
      });
    });

    it("should decode CBOR hex to lists consistently", () => {
      const testCases = getTestCases("list", "decoding");

      testCases.forEach((entry) => {
        const decoded = Data.Decode.cborHex(entry.cborHex);
        expect(decoded, `Failed at sample index ${entry.index}`).toEqual(
          entry.sample,
        );
      });
    });

    it("should decode CBOR bytes to lists consistently", () => {
      const testCases = getTestCases("list", "decoding");

      testCases.forEach((entry) => {
        const decoded = Data.Decode.cborBytes(new Uint8Array(entry.cborBytes));
        expect(decoded, `Failed at sample index ${entry.index}`).toEqual(
          entry.sample,
        );
      });
    });

    it("should maintain round-trip consistency", () => {
      const testCases = getTestCases("list", "roundTrip");

      testCases.forEach((entry) => {
        const plutusDataList = entry.sample.list.map(reconstructPlutusData);
        const plutusData = Data.list(plutusDataList);
        const encoded = Data.Encode.cborHex(plutusData);
        const decoded = Data.Decode.cborHex(encoded);

        expect(decoded, `Failed at sample index ${entry.index}`).toEqual(
          entry.sample,
        );
      });
    });
  });

  describe("Map Golden Tests", () => {
    it("should encode maps to CBOR hex consistently", () => {
      const testCases = getTestCases("map", "encoding");

      testCases.forEach((entry) => {
        const plutusDataEntries = entry.sample.entries.map(
          (entryObj: { key: any; value: any }) => ({
            key: reconstructPlutusData(entryObj.key),
            value: reconstructPlutusData(entryObj.value),
          }),
        );
        const plutusData = Data.map(plutusDataEntries);
        const encoded = Data.Encode.cborHex(plutusData);
        expect(encoded, `Failed at sample index ${entry.index}`).toBe(
          entry.cborHex,
        );
      });
    });

    it("should encode maps to CBOR bytes consistently", () => {
      const testCases = getTestCases("map", "encoding");

      testCases.forEach((entry) => {
        const plutusDataEntries = entry.sample.entries.map(
          (entryObj: { key: any; value: any }) => ({
            key: reconstructPlutusData(entryObj.key),
            value: reconstructPlutusData(entryObj.value),
          }),
        );
        const plutusData = Data.map(plutusDataEntries);
        const encoded = Data.Encode.cborBytes(plutusData);
        expect(
          Array.from(encoded),
          `Failed at sample index ${entry.index}`,
        ).toEqual(entry.cborBytes);
      });
    });

    it("should decode CBOR hex to maps consistently", () => {
      const testCases = getTestCases("map", "decoding");

      testCases.forEach((entry) => {
        const decoded = Data.Decode.cborHex(entry.cborHex);
        expect(decoded, `Failed at sample index ${entry.index}`).toEqual(
          entry.sample,
        );
      });
    });

    it("should decode CBOR bytes to maps consistently", () => {
      const testCases = getTestCases("map", "decoding");

      testCases.forEach((entry) => {
        const decoded = Data.Decode.cborBytes(new Uint8Array(entry.cborBytes));
        expect(decoded, `Failed at sample index ${entry.index}`).toEqual(
          entry.sample,
        );
      });
    });

    it("should maintain round-trip consistency", () => {
      const testCases = getTestCases("map", "roundTrip");

      testCases.forEach((entry) => {
        const plutusDataEntries = entry.sample.entries.map(
          (entryObj: { key: any; value: any }) => ({
            key: reconstructPlutusData(entryObj.key),
            value: reconstructPlutusData(entryObj.value),
          }),
        );
        const plutusData = Data.map(plutusDataEntries);
        const encoded = Data.Encode.cborHex(plutusData);
        const decoded = Data.Decode.cborHex(encoded);

        expect(decoded, `Failed at sample index ${entry.index}`).toEqual(
          entry.sample,
        );
      });
    });
  });

  describe("Constr Golden Tests", () => {
    it("should encode constructors to CBOR hex consistently", () => {
      const testCases = getTestCases("constr", "encoding");

      testCases.forEach((entry) => {
        const plutusDataFields = entry.sample.fields.map(reconstructPlutusData);
        const plutusData = Data.constr(entry.sample.index, plutusDataFields);
        const encoded = Data.Encode.cborHex(plutusData);
        expect(encoded, `Failed at sample index ${entry.index}`).toBe(
          entry.cborHex,
        );
      });
    });

    it("should encode constructors to CBOR bytes consistently", () => {
      const testCases = getTestCases("constr", "encoding");

      testCases.forEach((entry) => {
        const plutusDataFields = entry.sample.fields.map(reconstructPlutusData);
        const plutusData = Data.constr(entry.sample.index, plutusDataFields);
        const encoded = Data.Encode.cborBytes(plutusData);
        expect(
          Array.from(encoded),
          `Failed at sample index ${entry.index}`,
        ).toEqual(entry.cborBytes);
      });
    });

    it("should decode CBOR hex to constructors consistently", () => {
      const testCases = getTestCases("constr", "decoding");

      testCases.forEach((entry) => {
        const decoded = Data.Decode.cborHex(entry.cborHex);
        expect(decoded, `Failed at sample index ${entry.index}`).toEqual(
          entry.sample,
        );
      });
    });

    it("should decode CBOR bytes to constructors consistently", () => {
      const testCases = getTestCases("constr", "decoding");

      testCases.forEach((entry) => {
        const decoded = Data.Decode.cborBytes(new Uint8Array(entry.cborBytes));
        expect(decoded, `Failed at sample index ${entry.index}`).toEqual(
          entry.sample,
        );
      });
    });

    it("should maintain round-trip consistency", () => {
      const testCases = getTestCases("constr", "roundTrip");

      testCases.forEach((entry) => {
        const plutusDataFields = entry.sample.fields.map(reconstructPlutusData);
        const plutusData = Data.constr(entry.sample.index, plutusDataFields);
        const encoded = Data.Encode.cborHex(plutusData);
        const decoded = Data.Decode.cborHex(encoded);

        expect(decoded, `Failed at sample index ${entry.index}`).toEqual(
          entry.sample,
        );
      });
    });
  });

  describe("Data Golden Tests", () => {
    it("should encode complex data structures to CBOR hex consistently", () => {
      const testCases = getTestCases("data", "encoding");

      testCases.forEach((entry) => {
        const plutusData = reconstructPlutusData(entry.sample);
        const encoded = Data.Encode.cborHex(plutusData);
        expect(encoded, `Failed at sample index ${entry.index}`).toBe(
          entry.cborHex,
        );
      });
    });

    it("should encode complex data structures to CBOR bytes consistently", () => {
      const testCases = getTestCases("data", "encoding");

      testCases.forEach((entry) => {
        const plutusData = reconstructPlutusData(entry.sample);
        const encoded = Data.Encode.cborBytes(plutusData);
        expect(
          Array.from(encoded),
          `Failed at sample index ${entry.index}`,
        ).toEqual(entry.cborBytes);
      });
    });

    it("should decode CBOR hex to complex data structures consistently", () => {
      const testCases = getTestCases("data", "decoding");

      testCases.forEach((entry) => {
        const decoded = Data.Decode.cborHex(entry.cborHex);
        expect(decoded, `Failed at sample index ${entry.index}`).toEqual(
          entry.sample,
        );
      });
    });

    it("should decode CBOR bytes to complex data structures consistently", () => {
      const testCases = getTestCases("data", "decoding");

      testCases.forEach((entry) => {
        const decoded = Data.Decode.cborBytes(new Uint8Array(entry.cborBytes));
        expect(decoded, `Failed at sample index ${entry.index}`).toEqual(
          entry.sample,
        );
      });
    });

    it("should maintain round-trip consistency", () => {
      const testCases = getTestCases("data", "roundTrip");

      testCases.forEach((entry) => {
        const plutusData = reconstructPlutusData(entry.sample);
        const encoded = Data.Encode.cborHex(plutusData);
        const decoded = Data.Decode.cborHex(encoded);

        expect(decoded, `Failed at sample index ${entry.index}`).toEqual(
          entry.sample,
        );
      });
    });
  });
});

/**
 * Helper function to reconstruct PlutusData from JSON representation
 */
const reconstructPlutusData = (sample: any): Data.Data => {
  switch (sample._tag) {
    case "Integer":
      // Handle BigInt structure: { __type: "bigint", value: "123..." }
      const integerValue =
        typeof sample.integer === "bigint"
          ? sample.integer
          : BigInt(sample.integer.value);
      return Data.int(integerValue);
    case "ByteArray": // Golden files use "ByteArray"
      return Data.bytearray(sample.bytearray);
    case "List":
      return Data.list(sample.list.map(reconstructPlutusData));
    case "Map":
      return Data.map(
        sample.entries.map((entry: any) => ({
          key: reconstructPlutusData(entry.key),
          value: reconstructPlutusData(entry.value),
        })),
      );
    case "Constr":
      return Data.constr(
        sample.index,
        sample.fields.map(reconstructPlutusData),
      );
    default:
      throw new Error(`Unknown PlutusData type: ${sample._tag}`);
  }
};

/**
 * Helper function to normalize decoded PlutusData to match golden file format
 */
const normalizeDecodedData = (data: any): any => {
  if (typeof data !== "object" || data === null) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(normalizeDecodedData);
  }

  const normalized = { ...data };

  // Normalize tag names to match golden files
  if (normalized._tag === "BytesArray") {
    normalized._tag = "ByteArray";
  }

  // Recursively normalize nested structures
  if (normalized.list && Array.isArray(normalized.list)) {
    normalized.list = normalized.list.map(normalizeDecodedData);
  }

  if (normalized.entries && Array.isArray(normalized.entries)) {
    normalized.entries = normalized.entries.map(([key, value]: [any, any]) => [
      normalizeDecodedData(key),
      normalizeDecodedData(value),
    ]);
  }

  if (normalized.fields && Array.isArray(normalized.fields)) {
    normalized.fields = normalized.fields.map(normalizeDecodedData);
  }

  return normalized;
};
