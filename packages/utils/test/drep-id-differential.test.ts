import { describe, expect, test } from "vitest";
import { Cardano } from "@cardano-sdk/core";
import { bech32 } from "@scure/base";
import { Credential } from "@lucid-evolution/core-types";
import { toHex } from "@lucid-evolution/core-utils";
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
    return { error: (error as Error).message };
  }
};

// xorshift32 so failures reproduce.
let state = 0x2545f491;
const next = () => {
  state ^= state << 13;
  state ^= state >>> 17;
  state ^= state << 5;
  return state >>> 0;
};
const pick = <T>(items: readonly T[]): T => items[next() % items.length];
const bytes = (length: number) =>
  Uint8Array.from({ length }, () => next() & 0xff);

const prefixes = ["drep", "drep_script", "drep_vkh", "stake", "drepscript"];
const CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";

const randomDrepID = (): string => {
  const prefix = pick(prefixes);
  const words =
    next() % 2 === 0
      ? // A 28-byte hash, or a CIP-129 header (with any bits set) and hash.
        bech32.toWords(
          next() % 2 === 0
            ? bytes(28)
            : Uint8Array.of(
                pick([0x22, 0x23, 0x02, 0x03, 0x20, 0x21, 0x32, 0xa3, 0xff]),
                ...bytes(28),
              ),
        )
      : // Word counts around the valid ones, with arbitrary padding bits.
        Array.from({ length: pick([44, 45, 46, 47, 48]) }, () => next() & 31);
  const id = bech32.encode(prefix, words, 1023);
  switch (next() % 6) {
    case 0: {
      // Corrupt one data character.
      const i = prefix.length + 1 + (next() % (id.length - prefix.length - 1));
      return id.slice(0, i) + pick([...CHARSET]) + id.slice(i + 1);
    }
    case 1:
      return id.toUpperCase();
    case 2:
      return id.slice(0, -1);
    default:
      return id;
  }
};

describe("drepIDToCredential", () => {
  test("matches @cardano-sdk/core on known IDs", () => {
    const ids = [
      "drep1ygpw93clyzccmen0mfuhcsj5n4e33f8xx3dwl2l5spd9m7qhxh2pd",
      "drep1ygzqwwtgcewhzvxu942xufzl4pg7gnttw9h4e0agm30fnwsqcv00v",
      Cardano.DRepID.cip105FromCredential({
        type: Cardano.CredentialType.KeyHash,
        hash: "17c5c7c8c4f3d6b4be03d5e6c8a3a0f2d6b8a7e9f0c1d2e3f4a5b6c7" as never,
      }),
      Cardano.DRepID.cip105FromCredential({
        type: Cardano.CredentialType.ScriptHash,
        hash: "17c5c7c8c4f3d6b4be03d5e6c8a3a0f2d6b8a7e9f0c1d2e3f4a5b6c7" as never,
      }),
      "drep1",
      "",
    ];
    for (const id of ids)
      expect(outcome(() => drepIDToCredential(id))).toStrictEqual(
        outcome(() => oldDrepIDToCredential(id)),
      );
  });

  test("accepts only the CIP-129 DRep key and script headers", () => {
    const hash = bytes(28);
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
    for (let i = 0; i < 5000; i++) {
      const id = randomDrepID();
      const expected = outcome(() => oldDrepIDToCredential(id));
      expect(
        outcome(() => drepIDToCredential(id)),
        id,
      ).toStrictEqual(expected);
      if ("ok" in expected) valid++;
    }
    expect(valid).toBeGreaterThan(400);
  });
});
