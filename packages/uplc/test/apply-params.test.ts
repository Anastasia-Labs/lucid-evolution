import { describe, expect, test } from "vitest";
import * as speed from "../src/speed/node.js";
import * as size from "../src/size/node.js";

const hex = (bytes: string) => Uint8Array.from(Buffer.from(bytes, "hex"));

// (program 1.1.0 (lam a (lam b (con unit ())))), CBOR-wrapped.
const SCRIPT = hex("46010100224981");

for (const [build, uplc] of Object.entries({ speed, size })) {
  describe(`${build} build: applying parameters`, () => {
    const apply = (params: string) =>
      Buffer.from(uplc.apply_params_to_script(hex(params), SCRIPT)).toString(
        "hex",
      );

    // The script applied to (con data (Constr 128 [])) and (con data (I 1)).
    const APPLIED_TO_CONSTR_AND_ONE =
      "56010100332249930106d86682188080004c0101010001";

    test("applies the parameter after a general constr", () => {
      // [Constr 128 [], 1], with the constructor in the indefinite and the
      // definite form.
      expect(apply("9fd8669f188080ff01ff")).toBe(APPLIED_TO_CONSTR_AND_ONE);
      expect(apply("9fd8668218808001ff")).toBe(APPLIED_TO_CONSTR_AND_ONE);
    });

    test("keeps a general constr in its list", () => {
      // [[Constr 128 [], 5]]: the script applied to the one list.
      expect(apply("9f9fd8669f188080ff05ffff")).toBe(
        "540101003224993001099fd8668218808005ff0001",
      );
    });
  });
}
