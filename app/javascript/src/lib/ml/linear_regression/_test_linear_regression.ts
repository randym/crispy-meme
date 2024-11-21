import { SGDLinearRegression } from "./stochastic_gradient_descent";
import { ClosedForm } from "./closed_form";
import { Preprocessor } from "../preprocessor";
import { data } from "./__test_data_sets";

describe("LinearRegression", () => {
  let sgd: SGDLinearRegression;
  let closed: ClosedForm;

  const features = ["RM", "AGE", "DIS"];
  const target = "MEDV";

  const preprocessorFor = () => {
    const p = new Preprocessor(data);
    p.features = features;
    p.target = target;

    return {
      training: {
        designMatrix: p.designMatrix.slice(0, 50),
        outcomes: p.outcomes.slice(0, 50),
      },

      validation: {
        designMatrix: p.designMatrix.slice(50, 80),
        outcomes: p.outcomes.slice(50, 80),
      },

      test: {
        designMatrix: p.designMatrix.slice(80),
        outcomes: p.outcomes.slice(80),
      },
    };
  };

  beforeAll(() => {
    const { training } = preprocessorFor();
    sgd = new SGDLinearRegression({
      learningRate: 1e-3,
      maxIterations: 1000000,
      tolerance: 1e-10,
      alpha: 1e-4,
    });

    sgd.fit(training.designMatrix, training.outcomes);

    closed = new ClosedForm({
      alpha: 1e-4,
    });

    closed.fit(training.designMatrix, training.outcomes);
  });

  it("sgd its", () => {
    expect(sgd.converged).toBe(true);
  });

  it("makes closed theta and intercept", () => {
    expect(closed.theta.length).toBe(3);
    expect(closed.intercept).toBeGreaterThan(0);
  });

  it("predicts", () => {
    const { validation, test } = preprocessorFor();
    const vR2 = sgd.score(validation.designMatrix, validation.outcomes);
    expect(vR2).toBeGreaterThan(0.9);

    // kind of cool how sgd occasionally does bq better than closed!
    const tR2 = sgd.score(test.designMatrix, test.outcomes);
    expect(tR2).toBeGreaterThan(0.9);

    const cR2 = closed.score(test.designMatrix, test.outcomes);
    expect(cR2).toBeGreaterThan(0.9);
  });
});
