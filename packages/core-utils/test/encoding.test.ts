import { expect, test } from "vitest";
import { fromHex, fromText, toHex, toText } from "../src/core-utils";

test("roundtrip", () => {
  expect(toHex(fromHex("deadbeef"))).toBe("deadbeef");
  expect(toHex(fromHex("cafe0123"))).toBe("cafe0123");
  expect(toText(fromText("mytoken"))).toBe("mytoken");
});
