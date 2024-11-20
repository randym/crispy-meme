import { CSV } from "./csv";

describe("CSV", () => {
  it("should parse csv", () => {
    const csv = "a,b,c\n1,s,3\n4,s,6\n7,l,9\n";
    const { headers, source, types } = CSV.parse(csv);
    expect(headers).toEqual(["a", "b", "c"]);
    expect(source).toEqual([
      [1, "s", 3],
      [4, "s", 6],
      [7, "l", 9],
    ]);

    expect(types).toEqual(["number", "string", "number"]);
  });
});
