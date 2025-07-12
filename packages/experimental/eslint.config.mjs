import { config } from "@evolution-sdk/eslint-config/base";

export default [
  ...config,
  {
    ignores: ["test/**", "src/CML/**", "temp/**", "src/old/**", ".tsup/**/*"],
  },
];
