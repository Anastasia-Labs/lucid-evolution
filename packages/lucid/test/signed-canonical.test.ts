import { afterEach, expect, test, vi } from "vitest";
import * as Effect from "effect/Effect";
import * as Either from "effect/Either";
import type { Wallet } from "@lucid-evolution/core-types";
import { withCMLScope } from "@lucid-evolution/core-utils";
import { CML } from "../src/core.js";
import { canonicalTransaction } from "../src/CanonicalTransaction.js";
import { makeSubmit } from "../src/tx-submit/TxSubmit.js";

const transactions: CML.Transaction[] = [];
afterEach(() => {
  for (const tx of transactions.splice(0)) tx.free();
});

const fixture = (canonical = false) => {
  const tx = withCMLScope((own) => {
    // A valid untagged input set. Canonicalization adds tag 258.
    const original = own(
      CML.TransactionBody.from_cbor_hex(
        "a30081825820" + "11".repeat(32) + "000180021a00030d40",
      ),
    );
    const unsigned = own(
      CML.Transaction.new(original, own(CML.TransactionWitnessSet.new()), true),
    );
    const body = canonical
      ? own(own(canonicalTransaction(unsigned)).body())
      : original;
    const key = own(
      CML.PrivateKey.from_normal_bytes(new Uint8Array(32).fill(7)),
    );
    const witnesses = own(CML.TransactionWitnessSet.new());
    const vkeys = own(CML.VkeywitnessList.new());
    vkeys.add(own(CML.make_vkey_witness(own(CML.hash_transaction(body)), key)));
    witnesses.set_vkeywitnesses(vkeys);
    return CML.Transaction.new(body, witnesses, true);
  });
  transactions.push(tx);
  const submitTx = vi.fn(async (cbor: string) => inspect(cbor).hash);
  const signed = makeSubmit({ submitTx } as Wallet, tx);
  return { signed, submitTx };
};

const inspect = (cbor: string) =>
  withCMLScope((own) => {
    const tx = own(CML.Transaction.from_cbor_hex(cbor));
    const hash = own(CML.hash_transaction(own(tx.body())));
    const witness = own(own(own(tx.witness_set()).vkeywitnesses()!).get(0));
    return {
      hash: hash.to_hex(),
      verifies: own(witness.vkey()).verify(
        hash.to_raw_bytes(),
        own(witness.ed25519_signature()),
      ),
    };
  });

const error = "Canonicalize the transaction before signing";

test("rejects canonical serialization that changes the signed body", () => {
  const { signed } = fixture();
  const original = signed.toCBOR();
  expect(inspect(original).verifies).toBe(true);
  expect(() => signed.toCBOR({ canonical: true })).toThrow(error);
  expect(signed.toCBOR()).toBe(original);
});

test("all submission methods reject before calling the wallet", async () => {
  const { signed, submitTx } = fixture();
  await expect(signed.submit({ canonical: true })).rejects.toThrow(error);
  const safe = await signed.submitSafe({ canonical: true });
  expect(Either.isLeft(safe)).toBe(true);
  if (Either.isLeft(safe)) {
    expect(safe.left._tag).toBe("TxSubmitError");
    expect(safe.left.message).toContain(error);
  }
  const program = await Effect.runPromise(
    Effect.either(signed.submitProgram({ canonical: true })),
  );
  expect(Either.isLeft(program)).toBe(true);
  if (Either.isLeft(program)) expect(program.left._tag).toBe("TxSubmitError");
  expect(submitTx).not.toHaveBeenCalled();
});

test("default submission preserves the signed body and signature", async () => {
  const { signed, submitTx } = fixture();
  const original = signed.toCBOR();
  expect(await signed.submit()).toBe(signed.toHash());
  expect(submitTx).toHaveBeenCalledWith(original);
  expect(inspect(original).verifies).toBe(true);
});

test("allows canonical serialization when canonicalized before signing", async () => {
  const { signed, submitTx } = fixture(true);
  const cbor = signed.toCBOR({ canonical: true });
  expect(inspect(cbor)).toEqual({ hash: signed.toHash(), verifies: true });
  expect(await signed.submit({ canonical: true })).toBe(signed.toHash());
  expect(submitTx).toHaveBeenCalledWith(cbor);
});
