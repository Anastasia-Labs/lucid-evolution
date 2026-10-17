const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const { test } = require("node:test");

for (const build of ["node", "browser"]) {
  for (const shape of [
    "constr",
    "general-constr",
    "list",
    "map",
    "map-key",
    "bytes",
  ]) {
    test(`${build}: roundtrips and releases ${shape} nested 10,000 deep`, () => {
      const result = spawnSync(
        process.execPath,
        [
          ...(build === "browser" ? ["--experimental-wasm-modules"] : []),
          path.join(__dirname, "fixtures/deep-data.cjs"),
          shape,
          build,
        ],
        { encoding: "utf8", timeout: 30_000 },
      );
      assert.equal(result.error, undefined);
      assert.equal(result.signal, null, result.stderr);
      assert.equal(result.status, 0, result.stderr);
      assert.equal(result.stdout, "ok\n");
    });
  }
}
