import { config } from "@lucid-evolution/eslint-config/base";

export default [
  ...config,
  {
    ignores: ["test/**", "src/CML/**", "temp/**", "src/old/**", ".tsup/**/*"],
  },
];
