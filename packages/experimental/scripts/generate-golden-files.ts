/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastCheck } from "effect";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import * as Data from "../src/Data_old.js";

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create golden directory if it doesn't exist
const goldenDir = path.join(__dirname, "../test/golden");
if (!fs.existsSync(goldenDir)) {
  fs.mkdirSync(goldenDir, { recursive: true });
}

console.log("Generating golden files for Data_old module...");

// BigInt JSON replacer function
const bigintReplacer = (_key: string, value: unknown): unknown => {
  if (typeof value === "bigint") {
    return { __type: "bigint", value: value.toString() };
  }
  return value;
};

// Configuration for golden file generation
const config = {
  seed: 12345, // Fixed seed for reproducible results
  numSamples: 200, // Number of samples per type
};

// Generate samples for each data type
const generateSamples = <T>(
  generator: FastCheck.Arbitrary<T>,
  name: string,
): T[] => {
  console.log(`Generating ${config.numSamples} samples for ${name}...`);

  // Use FastCheck.sample with fixed seed for reproducible results
  const samples = FastCheck.sample(generator, {
    numRuns: config.numSamples,
    seed: config.seed,
  });

  return samples;
};

// Generate golden data for each type
const goldenData = {
  integer: generateSamples(Data.genInteger(), "Integer"),
  byteArray: generateSamples(Data.genByteArray(), "ByteArray"),
  list: generateSamples(Data.genList(2), "List"),
  map: generateSamples(Data.genMap(2), "Map"),
  constr: generateSamples(Data.genConstr(2), "Constr"),
  data: generateSamples(Data.genData(3), "Data"),
};

// Process each data type and create golden files
Object.entries(goldenData).forEach(([typeName, samples]) => {
  console.log(`Processing ${typeName}...`);

  const goldenEntries = samples
    .map((sample, index) => {
      try {
        // Encode to CBOR using Data_old functions
        const cborHex = Data.encodeCBOROrThrow(sample);
        // Convert hex to bytes for bytes representation
        const hexWithoutPrefix = cborHex.startsWith("0x")
          ? cborHex.slice(2)
          : cborHex;
        const cborBytes = new Uint8Array(
          hexWithoutPrefix
            .match(/.{1,2}/g)
            ?.map((byte) => parseInt(byte, 16)) || [],
        );

        // Verify round-trip using Data_old functions
        const decoded = Data.resolveCBOROrThrow(cborHex);
        const roundTripSuccess =
          JSON.stringify(sample, bigintReplacer) ===
          JSON.stringify(decoded, bigintReplacer);

        if (!roundTripSuccess) {
          console.warn(`Round-trip failed for ${typeName} sample ${index}`);
        }

        return {
          index,
          sample: JSON.parse(JSON.stringify(sample, bigintReplacer)), // Convert BigInt to serializable format
          cborHex,
          cborBytes: Array.from(cborBytes), // Convert Uint8Array to regular array for JSON
          roundTripSuccess,
          metadata: {
            type: typeName,
            seed: config.seed,
          },
        };
      } catch (error) {
        console.error(`Error processing ${typeName} sample ${index}:`, error);
        return null;
      }
    })
    .filter(Boolean); // Remove null entries

  // Write golden file
  const goldenFile = path.join(goldenDir, `${typeName}.golden.json`);
  fs.writeFileSync(goldenFile, JSON.stringify(goldenEntries, null, 2));
  console.log(`Generated ${goldenFile} with ${goldenEntries.length} entries`);
});

// Generate a summary file
const summary = {
  seed: config.seed,
  samplesPerType: config.numSamples,
  types: Object.keys(goldenData),
  totalSamples: Object.values(goldenData).reduce(
    (sum, samples) => sum + samples.length,
    0,
  ),
};

fs.writeFileSync(
  path.join(goldenDir, "summary.json"),
  JSON.stringify(summary, null, 2),
);

console.log("Golden file generation completed!");
console.log(
  `Summary: ${summary.totalSamples} total samples across ${summary.types.length} types`,
);
