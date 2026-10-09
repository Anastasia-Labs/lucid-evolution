import { createHash } from "node:crypto";
import { describe, expect, test } from "vitest";
import { CML } from "../src/core.js";
import { nativeVerifyEd25519, verifyEd25519 } from "../src/internal/ed25519.js";

/*
  The emulator verifies vkey witnesses with OpenSSL and falls back to CML
  whenever OpenSSL rejects. That is only sound if OpenSSL never accepts a
  signature CML rejects. These tests compare both with CML on ordinary
  signatures and on the shapes where Ed25519 implementations disagree:
  small-order and mixed-order keys, non-canonical encodings, and s >= L.
*/

// Curve arithmetic for crafting keys and signatures (RFC 8032).
const P = 2n ** 255n - 19n;
const L = 2n ** 252n + 27742317777372353535851937790883648493n;
const mod = (a: bigint, m = P) => ((a % m) + m) % m;
const pow = (b: bigint, e: bigint, m = P) => {
  let r = 1n;
  b = mod(b, m);
  for (; e > 0n; e >>= 1n, b = (b * b) % m) if (e & 1n) r = (r * b) % m;
  return r;
};
const inv = (a: bigint) => pow(a, P - 2n);
const D = mod(-121665n * inv(121666n));
const SQRT_M1 = pow(2n, (P - 1n) / 4n);

type Point = { x: bigint; y: bigint; z: bigint; t: bigint };
const point = (x: bigint, y: bigint): Point => ({ x, y, z: 1n, t: mod(x * y) });
const ZERO = point(0n, 1n);
const add = (p: Point, q: Point): Point => {
  const a = mod((p.y - p.x) * (q.y - q.x));
  const b = mod((p.y + p.x) * (q.y + q.x));
  const c = mod(2n * D * p.t * q.t);
  const d = mod(2n * p.z * q.z);
  const [e, f, g, h] = [b - a, d - c, d + c, b + a];
  return { x: mod(e * f), y: mod(g * h), z: mod(f * g), t: mod(e * h) };
};
const neg = (p: Point): Point => ({ ...p, x: mod(-p.x), t: mod(-p.t) });
const mul = (p: Point, n: bigint): Point => {
  let r = ZERO;
  for (; n > 0n; n >>= 1n, p = add(p, p)) if (n & 1n) r = add(r, p);
  return r;
};
const affine = (p: Point) => {
  const zi = inv(p.z);
  return { x: mod(p.x * zi), y: mod(p.y * zi) };
};
const leBytes = (n: bigint) => {
  const out = new Uint8Array(32);
  for (let i = 0; i < 32; i++, n >>= 8n) out[i] = Number(n & 0xffn);
  return out;
};
const leInt = (bytes: Uint8Array) =>
  bytes.reduceRight((n, byte) => (n << 8n) | BigInt(byte), 0n);
const encode = (p: Point) => {
  const { x, y } = affine(p);
  const out = leBytes(y);
  out[31] |= Number(x & 1n) << 7;
  return out;
};
/** Lenient decoding: y is reduced mod p and the sign of x = 0 is ignored. */
const decode = (bytes: Uint8Array): Point | undefined => {
  const y = mod(leInt(bytes) & (2n ** 255n - 1n));
  const u = mod(y * y - 1n);
  const v = mod(D * y * y + 1n);
  let x = mod(u * pow(v, 3n) * pow(u * pow(v, 7n), (P - 5n) / 8n));
  if (mod(v * x * x) !== u) {
    if (mod(v * x * x) !== mod(-u)) return undefined;
    x = mod(x * SQRT_M1);
  }
  if ((x & 1n) !== BigInt(bytes[31] >> 7)) x = mod(-x);
  return point(x, y);
};
const BASE = decode(Uint8Array.from(Buffer.from("58".padEnd(64, "6"), "hex")))!;
const hashScalar = (...parts: Uint8Array[]) => {
  const hash = createHash("sha512");
  parts.forEach((part) => hash.update(part));
  return mod(leInt(new Uint8Array(hash.digest())), L);
};
const concat = (a: Uint8Array, b: Uint8Array) => {
  const out = new Uint8Array(a.length + b.length);
  out.set(a);
  out.set(b, a.length);
  return out;
};

// Deterministic randomness, so failures reproduce.
let seed = 0x2545f491;
const nextByte = () => {
  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;
  return seed & 0xff;
};
const randomBytes = (length: number) =>
  Uint8Array.from({ length }, () => nextByte());
const randomScalar = () => mod(leInt(randomBytes(32)), L);

const TORSION = (() => {
  const order8 = decode(
    Uint8Array.from(
      Buffer.from(
        "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05",
        "hex",
      ),
    ),
  )!;
  return Array.from({ length: 8 }, (_, k) => mul(order8, BigInt(k)));
})();

/**
 * A signature that passes the cofactorless check `R = [s]B - [h]A` for a
 * key `A = [a]B + T` with `T` in the torsion subgroup: `R = [r]B - [h]T`,
 * where `h mod 8` is guessed and checked.
 */
const forge = (a: bigint, torsion: Point, encodedKey: Uint8Array) => {
  const key = decode(encodedKey)!;
  for (;;) {
    const r = randomScalar();
    const guess = BigInt(nextByte() & 7);
    const encodedR = encode(add(mul(BASE, r), neg(mul(torsion, guess))));
    const message = randomBytes(32);
    const h = hashScalar(encodedR, encodedKey, message);
    if (h % 8n !== guess) continue;
    const s = mod(r + h * a, L);
    // Sanity check against the curve arithmetic above.
    const check = add(mul(BASE, s), neg(mul(key, h)));
    expect(encode(check)).toEqual(encodedR);
    return { message, signature: concat(encodedR, leBytes(s)) };
  }
};

type Case = {
  name: string;
  key: Uint8Array;
  message: Uint8Array;
  signature: Uint8Array;
};

const compare = ({ key, message, signature }: Case) => {
  const publicKey = CML.PublicKey.from_bytes(key);
  const cmlSignature = CML.Ed25519Signature.from_raw_bytes(signature);
  try {
    const cml = publicKey.verify(message, cmlSignature);
    const native = nativeVerifyEd25519(key, message, signature);
    return {
      cml,
      native,
      verified: verifyEd25519(publicKey, message, cmlSignature),
    };
  } finally {
    publicKey.free();
    cmlSignature.free();
  }
};

const expectAgreement = (cases: Case[]) => {
  const outcomes = cases.map((c) => ({ name: c.name, ...compare(c) }));
  for (const outcome of outcomes) {
    expect(outcome.verified, outcome.name).toBe(outcome.cml);
    if (outcome.native) expect(outcome.cml, outcome.name).toBe(true);
  }
  return outcomes;
};

const withKey = (a: bigint, torsion = ZERO, flipSign = false) => {
  const key = encode(add(mul(BASE, a), torsion));
  if (flipSign) key[31] ^= 0x80;
  return key;
};

describe("verifyEd25519", () => {
  test("agrees with CML on ordinary signatures", () => {
    const cases: Case[] = [];
    for (let i = 0; i < 200; i++) {
      const privateKey = CML.PrivateKey.from_normal_bytes(randomBytes(32));
      const publicKey = privateKey.to_public();
      const message = randomBytes(i % 3 === 0 ? 32 : i % 97);
      const signature = privateKey.sign(message).to_raw_bytes();
      const key = publicKey.to_raw_bytes();
      privateKey.free();
      publicKey.free();
      cases.push({ name: `valid ${i}`, key, message, signature });

      const flip = (bytes: Uint8Array, bit: number) => {
        const out = bytes.slice();
        out[bit >> 3] ^= 1 << (bit & 7);
        return out;
      };
      const bit = (nextByte() << 1) | (nextByte() & 1);
      cases.push(
        {
          name: `signature bit ${bit} ${i}`,
          key,
          message,
          signature: flip(signature, bit),
        },
        {
          name: `key bit ${bit & 255} ${i}`,
          key: flip(key, bit & 255),
          message,
          signature,
        },
        {
          name: `message ${i}`,
          key,
          message: message.length ? flip(message, 0) : Uint8Array.of(0),
          signature,
        },
      );
      // The same equation holds for s + L, which both must reject.
      const s = leInt(signature.subarray(32)) + L;
      cases.push({
        name: `s + L ${i}`,
        key,
        message,
        signature: concat(signature.subarray(0, 32), leBytes(s)),
      });
    }
    const outcomes = expectAgreement(cases);
    const valid = outcomes.filter((o) => o.name.startsWith("valid"));
    expect(valid.every((o) => o.cml && o.native)).toBe(true);
    expect(outcomes.filter((o) => !o.cml).length).toBeGreaterThan(700);
  });

  test("agrees with CML on small-order and mixed-order keys", () => {
    const cases: Case[] = [];
    TORSION.forEach((torsion, k) => {
      for (const a of [0n, randomScalar()]) {
        for (const flipSign of [false, true]) {
          const key = withKey(a, torsion, flipSign);
          if (!decode(key)) continue;
          // Flipping the sign bit negates the point, unless its x is 0.
          const negated =
            flipSign && affine(add(mul(BASE, a), torsion)).x !== 0n;
          const [scalar, component] = negated
            ? [mod(-a, L), neg(torsion)]
            : [a, torsion];
          for (let i = 0; i < 8; i++) {
            const { message, signature } = forge(scalar, component, key);
            cases.push({
              name: `torsion ${k} a=${a === 0n ? 0 : "random"} sign=${flipSign} ${i}`,
              key,
              message,
              signature,
            });
          }
        }
      }
    });
    const outcomes = expectAgreement(cases);
    // Mixed-order keys verify under both.
    expect(
      outcomes.filter((o) => o.name.includes("random") && o.native).length,
    ).toBeGreaterThan(0);
  });

  test("agrees with CML on non-canonical encodings", () => {
    const cases: Case[] = [];
    // y >= p: the 19 non-canonical values, with either sign bit.
    for (let y = P; y < 2n ** 255n; y++) {
      for (const sign of [0, 0x80]) {
        const key = leBytes(y);
        key[31] |= sign;
        const decoded = decode(key);
        if (!decoded) continue;
        const torsion = TORSION.find(
          (t) => encode(t).join() === encode(decoded).join(),
        );
        for (let i = 0; i < 4; i++) {
          const forged = torsion
            ? forge(0n, torsion, key)
            : { message: randomBytes(32), signature: randomBytes(64) };
          cases.push({ name: `key y=${y - P}+p sign=${sign}`, key, ...forged });
        }
      }
    }
    // The all-zero key, which CML rejects outright.
    const zero = new Uint8Array(32);
    for (let i = 0; i < 8; i++) {
      cases.push({
        name: `zero key ${i}`,
        key: zero,
        ...forge(0n, decode(zero)!, zero),
      });
    }
    // A non-canonical R (y + p) for a valid signature.
    for (let i = 0; i < 8; i++) {
      const privateKey = CML.PrivateKey.from_normal_bytes(randomBytes(32));
      const publicKey = privateKey.to_public();
      const message = randomBytes(32);
      const signature = privateKey.sign(message).to_raw_bytes();
      const ry = leInt(signature.subarray(0, 32)) & (2n ** 255n - 1n);
      if (ry + P < 2n ** 255n) {
        const r = leBytes(ry + P);
        r[31] |= signature[31] & 0x80;
        cases.push({
          name: `non-canonical R ${i}`,
          key: publicKey.to_raw_bytes(),
          message,
          signature: concat(r, signature.subarray(32)),
        });
      }
      privateKey.free();
      publicKey.free();
    }
    expectAgreement(cases);
  });
});
