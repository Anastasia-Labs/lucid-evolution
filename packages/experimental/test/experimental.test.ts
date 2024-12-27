import { AssetName } from "../src/index.js";
import { it } from "@effect/vitest";

it.effect("experimental", () => AssetName.from_hex("deadbeef"));
