import * as PaymentKeyHash from "./PaymentHash.js";
import * as StakeKeyHash from "./StakeHash.js";
/** Hex */
export type KeyHash =
  | string
  | PaymentKeyHash.PaymentKeyHash
  | StakeKeyHash.StakeKeyHash;
