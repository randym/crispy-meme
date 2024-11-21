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
    // how to test with shuffling? the data will be different

    expect(preprocess.normalized.length).toEqual(3);
    expect(preprocess.normalized.filter((row) => row[0] === 0).length).toEqual(
      1,
    );
    expect(
      preprocess.normalized.filter((row) => row[0] === 0.5).length,
    ).toEqual(1);
    expect(preprocess.normalized.filter((row) => row[0] === 1).length).toEqual(
      1,
    );
    expect(preprocess.types).toEqual(["number", "string", "number"]);
    expect(preprocess.headers).toEqual(["a", "b", "c"]);
  });

  it("should extract features", () => {
    expect(preprocess.designMatrix.length).toEqual(3);
    expect(preprocess.designMatrix[0].length).toEqual(1);
  });
});
