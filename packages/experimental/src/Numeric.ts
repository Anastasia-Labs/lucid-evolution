import { FastCheck, Schema } from "effect";

export const Uint16 = Schema.Number.pipe(
  Schema.filter(
    (number) => Number.isInteger(number) && number >= 0 && number <= 65535,
  ),
  Schema.brand("Uint16"),
).annotations({
  message: (issue) =>
    `Expected a Uint16 (between 0 and 65535 inclusive), but got ${issue.actual}`,
});

export type Uint16 = typeof Uint16.Type;

export const Uint16Generator = FastCheck.integer({
  min: 0,
  max: 65535,
}).map((number) => Uint16.make(number));
