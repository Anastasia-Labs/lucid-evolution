import { createHash } from "node:crypto";
import { describe, expect, test } from "vitest";
import { FastCheck } from "effect";
import { fromHex, toHex } from "@lucid-evolution/core-utils";
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
const decodeValid = (bytes: Uint8Array): Point => {
  const decoded = decode(bytes);
  if (!decoded) throw new Error(`Not a curve point: ${toHex(bytes)}`);
  return decoded;
};
const BASE = decodeValid(fromHex("58".padEnd(64, "6")));
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

const scalar = FastCheck.bigInt({ min: 0n, max: L - 1n });
const nonZeroScalar = FastCheck.bigInt({ min: 1n, max: L - 1n });
const bytes = (length: number) =>
  FastCheck.uint8Array({ minLength: length, maxLength: length });

/** The message with an attempt counter appended, so retries reproduce. */
const attemptMessage = (message: Uint8Array, attempt: number) =>
  concat(message, leBytes(BigInt(attempt)).subarray(0, 4));

const TORSION = (() => {
  const order8 = decodeValid(
    fromHex("26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05"),
  );
  return Array.from({ length: 8 }, (_, k) => mul(order8, BigInt(k)));
})();

/**
 * A signature that passes the cofactorless check `R = [s]B - [h]A` for a
 * key `A = [a]B + T` with `T` in the torsion subgroup: `R = [r]B - [h]T`,
 * where `h mod 8` is guessed and checked.
 */
const forge = (
  a: bigint,
  torsion: Point,
  encodedKey: Uint8Array,
  r: bigint,
  baseMessage: Uint8Array,
) => {
  const key = decodeValid(encodedKey);
  for (let attempt = 0; ; attempt++) {
    const guess = BigInt(attempt & 7);
    const encodedR = encode(add(mul(BASE, r), neg(mul(torsion, guess))));
    const message = attemptMessage(baseMessage, attempt);
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

const flip = (bytes: Uint8Array, bit: number) => {
  const out = bytes.slice();
  out[bit >> 3] ^= 1 << (bit & 7);
  return out;
};

describe("verifyEd25519", () => {
  test("agrees with CML on ordinary signatures", () => {
    FastCheck.assert(
      FastCheck.property(
        bytes(32),
        FastCheck.uint8Array({ maxLength: 96 }),
        FastCheck.nat(511),
        (secret, message, bit) => {
          const privateKey = CML.PrivateKey.from_normal_bytes(secret);
          const publicKey = privateKey.to_public();
          const signature = privateKey.sign(message).to_raw_bytes();
          const key = publicKey.to_raw_bytes();
          privateKey.free();
          publicKey.free();
          // The same equation holds for s + L, which both must reject.
          const sPlusL = leBytes(leInt(signature.subarray(32)) + L);
          const [valid, ...tampered] = expectAgreement([
            { name: "valid", key, message, signature },
            {
              name: `signature bit ${bit}`,
              key,
              message,
              signature: flip(signature, bit),
            },
            {
              name: `key bit ${bit & 255}`,
              key: flip(key, bit & 255),
              message,
              signature,
            },
            {
              name: "message",
              key,
              message: message.length ? flip(message, 0) : Uint8Array.of(0),
              signature,
            },
            {
              name: "s + L",
              key,
              message,
              signature: concat(signature.subarray(0, 32), sPlusL),
            },
          ]);
          expect(valid.cml && valid.native).toBe(true);
          for (const outcome of tampered) {
            expect(outcome.cml, outcome.name).toBe(false);
          }
        },
      ),
      { numRuns: 200 },
    );
  });

  test("agrees with CML on small-order and mixed-order keys", () => {
    let mixedAccepted = 0;
    TORSION.forEach((torsion, k) => {
      for (const mixed of [false, true]) {
        for (const flipSign of [false, true]) {
          FastCheck.assert(
            FastCheck.property(
              mixed ? nonZeroScalar : FastCheck.constant(0n),
              scalar,
              bytes(32),
              (a, r, message) => {
                const key = withKey(a, torsion, flipSign);
                // Flipping the sign bit negates the point, unless its x is 0.
                const negated =
                  flipSign && affine(add(mul(BASE, a), torsion)).x !== 0n;
                const [secret, component] = negated
                  ? [mod(-a, L), neg(torsion)]
                  : [a, torsion];
                const [outcome] = expectAgreement([
                  {
                    name: `torsion ${k} mixed=${mixed} sign=${flipSign}`,
                    key,
                    ...forge(secret, component, key, r, message),
                  },
                ]);
                if (mixed && outcome.native) mixedAccepted++;
              },
            ),
            { numRuns: 8 },
          );
        }
      }
    });
    // Mixed-order keys verify under both.
    expect(mixedAccepted).toBeGreaterThan(0);
  });

  test("agrees with CML on non-canonical encodings", () => {
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
        FastCheck.assert(
          FastCheck.property(
            scalar,
            bytes(32),
            bytes(64),
            (r, message, signature) => {
              expectAgreement([
                {
                  name: `key y=${y - P}+p sign=${sign}`,
                  key,
                  ...(torsion
                    ? forge(0n, torsion, key, r, message)
                    : { message, signature }),
                },
              ]);
            },
          ),
          { numRuns: 4 },
        );
      }
    }

    // The all-zero key, which CML rejects outright.
    const zero = new Uint8Array(32);
    FastCheck.assert(
      FastCheck.property(scalar, bytes(32), (r, message) => {
        expectAgreement([
          {
            name: "zero key",
            key: zero,
            ...forge(0n, decodeValid(zero), zero, r, message),
          },
        ]);
      }),
      { numRuns: 8 },
    );

    // A non-canonical R (y + p): only points with y < 19 have one, which no
    // honest signature hits, so R is a small-order point with y < 19 (the
    // identity, y = 1, and the two of order 4, y = 0) and the key's torsion
    // part makes [s]B - [h]A land on it.
    const smallY = TORSION.flatMap((t, j) => {
      const { x, y } = affine(t);
      return y < 19n ? [{ j, x, y }] : [];
    });
    expect(smallY.length).toBe(3);
    for (const { j, x, y } of smallY) {
      const r = leBytes(y + P);
      r[31] |= Number(x & 1n) << 7;
      FastCheck.assert(
        FastCheck.property(nonZeroScalar, bytes(32), (a, baseMessage) => {
          const key = withKey(a, TORSION[1]);
          // [s]B - [h]A = -[h]T1 with s = h * a, so h = -j (mod 8) hits T_j.
          for (let attempt = 0; ; attempt++) {
            const message = attemptMessage(baseMessage, attempt);
            const h = hashScalar(r, key, message);
            if (mod(-h, 8n) !== BigInt(j)) continue;
            const s = mod(h * a, L);
            // Sanity check: R decodes leniently to [s]B - [h]A.
            const check = add(mul(BASE, s), neg(mul(decodeValid(key), h)));
            expect(encode(check)).toEqual(encode(decodeValid(r)));
            expectAgreement([
              {
                name: `non-canonical R y=${y}+p sign=${x & 1n}`,
                key,
                message,
                signature: concat(r, leBytes(s)),
              },
            ]);
            return;
          }
        }),
        { numRuns: 4 },
      );
    }
  });
});
