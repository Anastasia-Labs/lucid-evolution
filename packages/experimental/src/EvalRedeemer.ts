/**
 * Follows WebSocket API Reference [ScriptPurpose](https://ogmios.dev/api/#schema-ScriptPurpose)
 */
export type RedeemerTag =
  | "spend"
  | "mint"
  | "publish"
  | "withdraw"
  | "vote"
  | "propose";

export type EvalRedeemer = {
  ex_units: {
    mem: number;
    steps: number;
  };
  redeemer_index: number;
  redeemer_tag: RedeemerTag;
};
