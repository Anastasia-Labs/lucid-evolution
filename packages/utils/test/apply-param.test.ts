import { applyParamsToScript } from "../src/scripts";
import { assert, test } from "vitest";

// Parametrized Contract Spec
// type Redeemer {
//   msg: ByteArray,
// }

// validator(
//     owner: Hash<Blake2b_224, VerificationKey>,
//       msg: ByteArray, //"Hello, World!"
// ) {
//   fn spend(
//     _datum: Data,
//     redeemer: Redeemer,
//     context: ScriptContext,
//   ) -> Bool {
//     let must_say_hello = redeemer.msg == msg
//     let must_be_signed =
//       list.has(context.transaction.extra_signatories, owner)
//     must_say_hello? && must_be_signed?
//   }
// }

const helloParam =
  "58b00100003232323232322322322232253330093232533300b3371e6eb8c008c034dd500280388008a5032330010013758601e60206020602060206020602060206020601a6ea8c008c034dd50019129998078008a50132533300d3371e6eb8c04400802c5288998018018009808800918070008a4c26caca66600e66e1d20003008375400226464a666018601c0042930b1bae300c001300937540022c6eb8004dd7000ab9a5573aaae7955cfaba157441";

const helloAppliedValid =
  "58e5010000333232323232322322322232253330093232533300b3371e6eb8c008c034dd500280388008a5032330010013758601e60206020602060206020602060206020601a6ea8c008c034dd50019129998078008a50132533300d3371e6eb8c04400802c5288998018018009808800918070008a4c26caca66600e66e1d20003008375400226464a666018601c0042930b1bae300c001300937540022c6eb8004dd7000ab9a5573aaae7955cfaba157449811e581ce6849315a2984aadcd1e42d9628f6d6cc071685bef02bb52502f86c9004c010e4d48656c6c6f2c20576f726c64210001";

test("Apply Parameters", () => {
  const helloApplied = applyParamsToScript(helloParam, [
    "e6849315a2984aadcd1e42d9628f6d6cc071685bef02bb52502f86c9",
    "48656c6c6f2c20576f726c6421",
  ]);

  assert.strictEqual(helloApplied, helloAppliedValid);
});
