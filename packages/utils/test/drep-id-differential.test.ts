import { describe, expect, test } from "vitest";
import { FastCheck } from "effect";
import { Cardano } from "@cardano-sdk/core";
import { bech32 } from "@scure/base";
import { Credential } from "@lucid-evolution/core-types";
import { fromHex, toHex } from "@lucid-evolution/core-utils";
import { drepIDToCredential } from "../src/credential.js";

// The implementation drepIDToCredential replaced, kept as the oracle, plus
// the CIP-129 header check it lacked: only 0x22 (key) and 0x23 (script).
const headerError = (drepID: string, header: number) =>
  `Invalid DRep ID: ${drepID}, header 0x${header.toString(16).padStart(2, "0")} is neither a DRep key hash (0x22) nor a script hash (0x23)`;

const oldDrepIDToCredential = (drepID: string): Credential => {
  if (!Cardano.DRepID.isValid(drepID)) {
    throw new Error(`Invalid DRep ID: ${drepID}`);
  }
  const payload = bech32.fromWords(
    bech32.decodeUnsafe(drepID, 1023)?.words ?? [],
  );
  const header = payload[0];
  if (payload.length === 29 && header !== 0x22 && header !== 0x23) {
    throw new Error(headerError(drepID, header));
  }
  const drepCred = Cardano.DRepID.toCredential(Cardano.DRepID(drepID));
  return {
    type: drepCred.type == Cardano.CredentialType.KeyHash ? "Key" : "Script",
    hash: drepCred.hash,
  };
};

const outcome = (f: () => Credential) => {
  try {
    return { ok: f() };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
};

const CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
const hash = FastCheck.uint8Array({ minLength: 28, maxLength: 28 });

const words = FastCheck.oneof(
  // A 28-byte hash, as in CIP-105.
  hash.map((hash) => bech32.toWords(hash)),
  // A CIP-129 header, with any bits set, and the hash.
  FastCheck.tuple(
    FastCheck.constantFrom(
      0x22,
      0x23,
      0x02,
      0x03,
      0x20,
      0x21,
      0x32,
      0xa3,
      0xff,
    ),
    hash,
  ).map(([header, hash]) => bech32.toWords(Uint8Array.of(header, ...hash))),
  // Word counts around the valid ones, with arbitrary padding bits.
  FastCheck.array(FastCheck.integer({ min: 0, max: 31 }), {
    minLength: 44,
    maxLength: 48,
  }),
);
const encodedID = FastCheck.tuple(
  FastCheck.constantFrom(
    "drep",
    "drep_script",
    "drep_vkh",
    "stake",
    "drepscript",
  ),
  words,
).map(([prefix, words]) => bech32.encode(prefix, words, 1023));
const drepID = FastCheck.oneof(
  { arbitrary: encodedID, weight: 3 },
  encodedID.map((id) => id.toUpperCase()),
  encodedID.map((id) => id.slice(0, -1)),
  // One data character replaced, which breaks the checksum.
  FastCheck.tuple(
    encodedID,
    FastCheck.nat(),
    FastCheck.constantFrom(...CHARSET),
  ).map(([id, at, char]) => {
    const data = id.lastIndexOf("1") + 1;
    const i = data + (at % (id.length - data));
    return id.slice(0, i) + char + id.slice(i + 1);
  }),
);

describe("drepIDToCredential", () => {
  test("matches @cardano-sdk/core on known IDs", () => {
    const ids = [
      "drep1ygpw93clyzccmen0mfuhcsj5n4e33f8xx3dwl2l5spd9m7qhxh2pd",
      "drep1ygzqwwtgcewhzvxu942xufzl4pg7gnttw9h4e0agm30fnwsqcv00v",
      // CIP-105 key and script hash IDs.
      ...["drep", "drep_script"].map((prefix) =>
        bech32.encode(
          prefix,
          bech32.toWords(
            fromHex("17c5c7c8c4f3d6b4be03d5e6c8a3a0f2d6b8a7e9f0c1d2e3f4a5b6c7"),
          ),
        ),
      ),
      "drep1",
      "",
    ];
    for (const id of ids)
      expect(outcome(() => drepIDToCredential(id))).toStrictEqual(
        outcome(() => oldDrepIDToCredential(id)),
      );
  });

  test("accepts only the CIP-129 DRep key and script headers", () => {
    const hash = fromHex(
      "17c5c7c8c4f3d6b4be03d5e6c8a3a0f2d6b8a7e9f0c1d2e3f4a5b6c7",
    );
    for (let header = 0; header < 256; header++) {
      const id = bech32.encode(
        "drep",
        bech32.toWords(Uint8Array.of(header, ...hash)),
        1023,
      );
      const expected =
        header === 0x22
          ? { ok: { type: "Key", hash: toHex(hash) } }
          : header === 0x23
            ? { ok: { type: "Script", hash: toHex(hash) } }
            : { error: headerError(id, header) };
      expect(
        outcome(() => drepIDToCredential(id)),
        id,
      ).toStrictEqual(expected);
    }
  });

  test("matches @cardano-sdk/core on random and corrupted IDs", () => {
    let valid = 0;
    FastCheck.assert(
      FastCheck.property(drepID, (id) => {
        const expected = outcome(() => oldDrepIDToCredential(id));
        expect(outcome(() => drepIDToCredential(id))).toStrictEqual(expected);
        if ("ok" in expected) valid++;
      }),
      { numRuns: 5000 },
    );
    // Enough of the generated IDs are valid to exercise both kinds.
    expect(valid).toBeGreaterThan(400);
  });
});
