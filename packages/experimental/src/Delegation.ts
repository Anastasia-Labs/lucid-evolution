import * as Assets from "./Assets.js";
import * as Pool from "./Pool.js";

export type Delegation = {
  poolId: Pool.PoolId | null;
  rewards: Assets.Lovelace;
};
