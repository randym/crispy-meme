import { Preprocessor } from "./preprocessor";

describe("preprocess", () => {
  let preprocess: Preprocessor;
  beforeEach(() => {
    const csv = `a,b,c\n1,s,3\n4,s,6\n7,l,9`;
    preprocess = new Preprocessor(csv);
    preprocess.features = ["a"];
    preprocess.target = "c";
  });
  it("should load and normalize csv", () => {
    expect(preprocess.normalized).toEqual([
      [0, "s", 0],
      [0.5, "s", 0.5],
      [1, "l", 1],
    ]);
    expect(preprocess.types).toEqual(["number", "string", "number"]);
    expect(preprocess.headers).toEqual(["a", "b", "c"]);
  });

  it("should extract features", () => {
    expect(preprocess.designMatrix).toEqual([[0], [0.5], [1]]);
  });
});
