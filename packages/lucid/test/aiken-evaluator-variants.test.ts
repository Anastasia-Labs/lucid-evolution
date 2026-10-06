import { describe, expect, it } from "vitest";
import * as UPLC from "@lucid-evolution/uplc";
import * as UPLCSpeed from "@lucid-evolution/uplc/speed";
import * as UPLCSize from "@lucid-evolution/uplc/size";
import { makeAikenEvaluator } from "../src/index.js";

describe("uplc build variants", () => {
  it("resolves the speed build by default on node", () => {
    expect(UPLC.eval_phase_two_raw).toBe(UPLCSpeed.eval_phase_two_raw);
    expect(UPLCSize.eval_phase_two_raw).not.toBe(UPLCSpeed.eval_phase_two_raw);
  });

  it("builds an evaluator from any variant", () => {
    expect(makeAikenEvaluator().name).toBe("aiken");
    expect(makeAikenEvaluator(UPLCSize).name).toBe("aiken");
    expect(makeAikenEvaluator(UPLCSpeed).name).toBe("aiken");
  });
});
