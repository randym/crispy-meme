import { LinearRegression } from ".";
import { Preprocessor } from "../preprocessor";
import { training, validation, test } from "./__test_data_sets";

describe("LinearRegression", () => {
  let model: LinearRegression;
  let preprocessor: Preprocessor;

  const features = ["RM", "AGE", "DIS"];
  const target = "MEDV";

  const preprocessorFor = (data: string) => {
    const p = new Preprocessor(data);
    p.features = features;
    p.target = target;
    return {
      designMatrix: p.designMatrix,
      outcomes: p.outcomes,
    };
  };

  beforeAll(() => {
    const { designMatrix, outcomes } = preprocessorFor(training);
    model = new LinearRegression({
      learningRate: 1e-3,
      maxIterations: 1000000,
      tolerance: 1e-10,
      alpha: 1e-4,
    });

    model.fit(designMatrix, outcomes);
  });

  it("fits", () => {
    expect(model.converged).toBe(true);
  });

  it("predicts", () => {
    const { designMatrix, outcomes } = preprocessorFor(validation);
    const vR2 = model.score(designMatrix, outcomes);

    expect(vR2).toBeCloseTo(0.55, 1);

    const { designMatrix: testMatrix, outcomes: testOutcomes } =
      preprocessorFor(test);
    const tR2 = model.score(testMatrix, testOutcomes);
    expect(tR2).toBeGreaterThanOrEqual(vR2);
  });
});
