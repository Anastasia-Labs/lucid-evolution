export const stringify = (data: any) =>
  JSON.stringify(
    data,
    (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value,
    2,
  );
