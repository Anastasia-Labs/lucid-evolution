const { cpSync, mkdtempSync, rmSync, writeFileSync } = require("node:fs");
const { tmpdir } = require("node:os");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

async function loadBrowserBuild() {
  // Give the unmodified bundler output an explicit ESM package boundary, then
  // let Node load its real WebAssembly module and generated imports.
  const directory = mkdtempSync(path.join(tmpdir(), "cml-browser-test-"));
  try {
    const root = path.dirname(
      require.resolve("@lucid-evolution/cml/package.json"),
    );
    cpSync(path.join(root, "dist/browser"), directory, { recursive: true });
    writeFileSync(path.join(directory, "package.json"), '{"type":"module"}');
    return await import(
      pathToFileURL(path.join(directory, "cardano_multiplatform_lib.js")).href
    );
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

async function main() {
  const CML =
    process.argv[3] === "browser"
      ? await loadBrowserBuild()
      : require("@lucid-evolution/cml");
  const assert = require("node:assert/strict");
  const shape = process.argv[2];
  const depth = 10_000;
  const [prefix, leaf, suffix, nodePrefix, nodeSuffix] = {
    constr: ["d87981", "00", "", "d8799f", "ff"],
    "general-constr": ["d86682188081", "00", "", "d8669f18809f", "ffff"],
    list: ["81", "00", "", "9f", "ff"],
    map: ["a100", "00", "", "bf00", "ff"],
    "map-key": ["a1", "00", "00", "bf", "00ff"],
    bytes: ["81", "4100", "", "9f", "ff"],
  }[shape];
  const raw = prefix.repeat(depth) + leaf + suffix.repeat(depth);
  const data = CML.PlutusData.from_cbor_hex(raw);
  assert.equal(data.to_cbor_hex(), raw);
  assert.equal(data.to_canonical_cbor_hex(), raw);
  const node = data.to_cardano_node_format();
  assert.equal(
    node.to_cbor_hex(),
    nodePrefix.repeat(depth) + leaf + nodeSuffix.repeat(depth),
  );
  node.free();
  // Containers copy their contents; the copy remains valid after its source is freed.
  const list = CML.PlutusDataList.new();
  list.add(data);
  data.free();
  const copy = list.get(0);
  list.free();
  assert.equal(copy.to_cbor_hex(), raw);
  copy.free();
  // Reusing the instance after releasing the deep value is part of the contract.
  const next = CML.PlutusData.from_cbor_hex("00");
  assert.equal(next.to_cbor_hex(), "00");
  next.free();
  // A partially read deep value also releases its owned children on error.
  assert.throws(() =>
    CML.PlutusData.from_cbor_hex(
      "9f".repeat(depth) + "00" + "ff".repeat(depth - 1),
    ),
  );
  const afterError = CML.PlutusData.from_cbor_hex("01");
  assert.equal(afterError.to_cbor_hex(), "01");
  afterError.free();

  const key0 = "81".repeat(depth) + "00";
  const key1 = "81".repeat(depth) + "01";
  const map = CML.PlutusData.from_cbor_hex(`a2${key1}01${key0}00`);
  assert.equal(map.to_canonical_cbor_hex(), `a2${key0}00${key1}01`);
  const orderedMap = map.to_cardano_node_format();
  assert.equal(orderedMap.to_canonical_cbor_hex(), `a2${key0}00${key1}01`);
  orderedMap.free();
  map.free();
  process.stdout.write("ok\n");
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
