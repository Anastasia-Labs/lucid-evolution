/** Concatenation of policy id and asset name in Hex. */
export type Unit = string;
export type Assets = Record<Unit | "lovelace", bigint>;
export type Lovelace = bigint;
