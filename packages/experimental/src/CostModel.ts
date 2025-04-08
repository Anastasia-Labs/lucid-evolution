import * as Script from "./Script.js";
type CostModel = Record<string, number>;

export type CostModels = Record<Script.PlutusVersion, CostModel>;
