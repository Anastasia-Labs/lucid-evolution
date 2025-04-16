import * as Script from "./old/Script.js";
type CostModel = Record<string, number>;

export type CostModels = Record<Script.PlutusVersion, CostModel>;
