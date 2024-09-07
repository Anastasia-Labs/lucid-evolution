import { assert, describe, test } from "vitest";
import { Data, Constr } from "../src/data.js";

describe.sequential("Roundtrip data", () => {
  /*
    - TypeScript:

    type MyDatum = bigint

    - Aiken:

    type MyDatum = Int
  */
  test("bigint", async () => {
    const MyDatumSchema = Data.Integer();
    type MyDatum = Data.Static<typeof MyDatumSchema>;
    const MyDatum = MyDatumSchema as unknown as MyDatum;

    const datum: MyDatum = 1234n;
    const newDatum = Data.from(Data.to(datum, MyDatum), MyDatum);
    assert.equal(datum, newDatum);
  });
  /*
    - TypeScript:

    type MyDatum = string

    - Aiken:

    type MyDatum = ByteArray
  */
  test("string", async () => {
    const MyDatumSchema = Data.Bytes();
    type MyDatum = Data.Static<typeof MyDatumSchema>;
    const MyDatum = MyDatumSchema as unknown as MyDatum;

    const datum: MyDatum = "31313131"; //hex
    const newDatum = Data.from(Data.to(datum, MyDatum), MyDatum);
    assert.equal(datum, newDatum);
  });
  /*
    - TypeScript:

    type MyDatum = boolean

    - Aiken:

    type MyDatum = Bool
  */
  test("boolean", async () => {
    const MyDatumSchema = Data.Boolean();
    type MyDatum = Data.Static<typeof MyDatumSchema>;
    const MyDatum = MyDatumSchema as unknown as MyDatum;

    const datum: MyDatum = true;
    const newDatum = Data.from(Data.to(datum, MyDatum), MyDatum);
    assert.equal(datum, newDatum);
  });
  /*
    - TypeScript:

    type MyDatum = {
      myVariableA: string;
      myVariableB: bigint | null;
    }

    - Aiken:

    type MyDatum {
      myVariableA: ByteArray,
      myVariableB: Option(Int),
    }
  */
  test("object", async () => {
    const MyDatumSchema = Data.Object({
      myVariableA: Data.Bytes(),
      myVariableB: Data.Nullable(Data.Integer()),
    });
    type MyDatum = Data.Static<typeof MyDatumSchema>;
    const MyDatum = MyDatumSchema as unknown as MyDatum;

    const datum: MyDatum = {
      myVariableA: "313131",
      myVariableB: 5555n,
    };
    const newDatum = Data.from(Data.to(datum, MyDatum), MyDatum);
    assert.deepEqual(datum, newDatum);

    const datumNullable: MyDatum = {
      myVariableA: "313131",
      myVariableB: null,
    };
    const newDatumNullable = Data.from(
      Data.to(datumNullable, MyDatum),
      MyDatum,
    );

    assert.deepEqual(datumNullable, newDatumNullable);
  });
  /*
    - TypeScript:

    type MyDatum = bigint[]

    - Aiken:

    type MyDatum = List<Int>
  */
  test("array", async () => {
    const MyDatumSchema = Data.Array(Data.Integer(), {
      minItems: 3,
      maxItems: 4,
    });
    type MyDatum = Data.Static<typeof MyDatumSchema>;
    const MyDatum = MyDatumSchema as unknown as MyDatum;

    const datum: MyDatum = [45n, 100n, 9994n, 4281958210985912095n];
    const newDatum = Data.from(Data.to(datum, MyDatum), MyDatum);
    assert.deepEqual(datum, newDatum);
  });
  /*
    - TypeScript:

    type MyDatum = Map<bigint, string>

    - Aiken:

    type MyDatum = Dict<Int, ByteArray>
  */
  test("map", async () => {
    const MyDatumSchema = Data.Map(Data.Integer(), Data.Bytes());
    type MyDatum = Data.Static<typeof MyDatumSchema>;
    const MyDatum = MyDatumSchema as unknown as MyDatum;

    const datum: MyDatum = new Map([
      [3209n, "3131"],
      [249218490182n, "32323232"],
    ]);
    const newDatum = Data.from(Data.to(datum, MyDatum), MyDatum);
    assert.deepEqual(datum, newDatum);
  });
  /*
    - TypeScript:

    type MyDatum = "Left" | "Down" | "Right" | { Up: [string]; }

    - Aiken:

    type MyDatum {
      Left
      Down
      Right
      Up(ByteArray)
    }
  */
  test("enum", async () => {
    const MyDatumSchema = Data.Enum([
      Data.Literal("Left"),
      Data.Literal("Down"),
      Data.Literal("Right"),
      Data.Object({ Up: Data.Tuple([Data.Bytes()]) }),
    ]);

    type MyDatum = Data.Static<typeof MyDatumSchema>;
    const MyDatum = MyDatumSchema as unknown as MyDatum;

    const datumLeft: MyDatum = "Left";
    const newDatumLeft = Data.from(Data.to(datumLeft, MyDatum), MyDatum);
    assert.deepEqual(datumLeft, newDatumLeft);

    const datumUp: MyDatum = { Up: ["313131"] };
    const newDatumUp = Data.from(Data.to(datumUp, MyDatum), MyDatum);
    assert.deepEqual(datumUp, newDatumUp);
  });
  /*
    - TypeScript:

    type MyDatum = "Left" | "Down" | { Right: [string]; } | { Up: { x: bigint; y: bigint;}; }

    - Aiken:

    type MyDatum {
      Left
      Down
      Right(ByteArray)
      Up {x: Int, y: Int}
    }
      */
  test("enum with named args", async () => {
    const MyDatumSchema = Data.Enum([
      Data.Literal("Left"),
      Data.Literal("Down"),
      Data.Object({ Right: Data.Tuple([Data.Bytes()]) }),
      Data.Object({ Up: Data.Object({ x: Data.Integer(), y: Data.Bytes() }) }),
    ]);
    type MyDatum = Data.Static<typeof MyDatumSchema>;
    const MyDatum = MyDatumSchema as unknown as MyDatum;

    const datumLeft: MyDatum = "Left";
    const newDatumLeft = Data.from(Data.to(datumLeft, MyDatum), MyDatum);
    assert.deepEqual(datumLeft, newDatumLeft);

    const datumUp: MyDatum = { Up: { x: 100n, y: "3131" } };
    const newDatumUp = Data.from(Data.to(datumUp, MyDatum), MyDatum);
    assert.deepEqual(datumUp, newDatumUp);
    assert.deepEqual(
      Data.to({ Up: { x: 100n, y: "3131" } }, MyDatum),
      Data.to({ Up: { y: "3131", x: 100n } }, MyDatum),
    );
  });
  /*
    - TypeScript:

    type MyDatum = Data

    - Aiken:

    type MyDatum = Data
  */
  test("any", async () => {
    const datum: Data = new Constr(0, []);
    const newDatum = Data.from(
      Data.to(datum, Data.Any() as unknown as Data),
      Data.Any() as unknown as Data,
    );
    assert.deepEqual(datum, newDatum);
  });
  /*
    - TypeScript:

    type MyDatum = undefined

    - Aiken:

    type MyDatum = Void
  */
  test("void", async () => {
    const MyDatum = {
      anyOf: [{ dataType: "constructor", index: 0, fields: [] }],
    } as unknown as MyDatum;
    type MyDatum = undefined;
    const datum: MyDatum = void 0;
    const newDatum = Data.from(Data.to(void 0, MyDatum), MyDatum);
    assert.deepEqual(datum, newDatum);
  });
  /*
    - TypeScript:

    type MyDatum = [bigint, string]

    - Aiken:

    type MyDatum = (Int, ByteArray)
  */
  test("tuples", async () => {
    const MyDatumSchema = Data.Tuple([Data.Integer(), Data.Bytes()]);
    type MyDatum = Data.Static<typeof MyDatumSchema>;
    const MyDatum = MyDatumSchema as unknown as MyDatum;
    const datum: MyDatum = [123n, "313131"];
    const newDatum = Data.from(Data.to(datum, MyDatum), MyDatum);
    assert.deepEqual(datum, newDatum);
  });
  /*
    - TypeScript:

    type MyDatum = "Down" | {
        Up: [{
            someVariable: bigint | null;
        }[]];
    }

    - Aiken:

    type MyDatum {
      Down
      Up(List<Item>)
    }

    type Item {
      someVariable: Option(Int)
    }
  */
  test("complex data structure", async () => {
    const MyDatumSchema = Data.Enum([
      Data.Object({
        Up: Data.Tuple([
          Data.Array(
            Data.Object({ someVariable: Data.Nullable(Data.Integer()) }),
          ),
          Data.Bytes({ maxLength: 2 }),
        ]),
      }),
      Data.Literal("Down"),
    ]);
    type MyDatum = Data.Static<typeof MyDatumSchema>;
    const MyDatum = MyDatumSchema as unknown as MyDatum;
    const datum: MyDatum = {
      Up: [
        [
          { someVariable: null },
          { someVariable: 123n },
          {
            someVariable: 9990324235325n,
          },
        ],
        "3131",
      ],
    };
    const newDatum = Data.from(Data.to(datum, MyDatum), MyDatum);
    assert.deepEqual(datum, newDatum);
  });
});
