import {
  applyDoubleCborEncoding,
  applySingleCborEncoding,
} from "../src/cbor.js";
import { assert, test } from "vitest";

const helloFlat =
  "01000032323232323223223225333006323253330083371e6eb8c008c028dd5002a4410d48656c6c6f2c20576f726c642100100114a06644646600200200644a66601c00229404c94ccc030cdc79bae301000200414a226600600600260200026eb0c02cc030c030c030c030c030c030c030c030c024dd5180098049baa002375c600260126ea80188c02c0045261365653330043370e900018029baa001132325333009300b002149858dd7180480098031baa0011653330023370e900018019baa0011323253330073009002149858dd7180380098021baa001165734aae7555cf2ab9f5742ae881";

const helloSingleCBOREncoded =
  "58e901000032323232323223223225333006323253330083371e6eb8c008c028dd5002a4410d48656c6c6f2c20576f726c642100100114a06644646600200200644a66601c00229404c94ccc030cdc79bae301000200414a226600600600260200026eb0c02cc030c030c030c030c030c030c030c030c024dd5180098049baa002375c600260126ea80188c02c0045261365653330043370e900018029baa001132325333009300b002149858dd7180480098031baa0011653330023370e900018019baa0011323253330073009002149858dd7180380098021baa001165734aae7555cf2ab9f5742ae881";

const helloCBORDoubleEncoded =
  "58eb58e901000032323232323223223225333006323253330083371e6eb8c008c028dd5002a4410d48656c6c6f2c20576f726c642100100114a06644646600200200644a66601c00229404c94ccc030cdc79bae301000200414a226600600600260200026eb0c02cc030c030c030c030c030c030c030c030c024dd5180098049baa002375c600260126ea80188c02c0045261365653330043370e900018029baa001132325333009300b002149858dd7180480098031baa0011653330023370e900018019baa0011323253330073009002149858dd7180380098021baa001165734aae7555cf2ab9f5742ae881";

test("expect same double encoding application", () => {
  assert.strictEqual(
    helloCBORDoubleEncoded,
    applyDoubleCborEncoding(helloCBORDoubleEncoded),
  );
});

test("expect double encoding from single encoding", () => {
  assert.strictEqual(
    helloCBORDoubleEncoded,
    applyDoubleCborEncoding(helloSingleCBOREncoded),
  );
});

test("expect double encoding from flat bytearray", () => {
  assert.strictEqual(
    helloCBORDoubleEncoded,
    applyDoubleCborEncoding(helloFlat),
  );
});

test("expect same single encoding application", () => {
  assert.strictEqual(
    helloSingleCBOREncoded,
    applySingleCborEncoding(helloSingleCBOREncoded),
  );
});

test("expect single from double encoding", () => {
  assert.strictEqual(
    helloSingleCBOREncoded,
    applySingleCborEncoding(helloCBORDoubleEncoded),
  );
});

test("expect single encoding from flat bytearray", () => {
  assert.strictEqual(
    helloSingleCBOREncoded,
    applySingleCborEncoding(helloFlat),
  );
});
