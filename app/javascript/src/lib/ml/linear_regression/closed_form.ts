import { R2 } from "../evaluation_metrics";
import { LinearAlgebra } from "../linear_algebra";

interface ClosedOptions {
  alpha: number;
}

const GradientDescentDefaults: ClosedOptions = {
  alpha: 1e-4,
};

/**
 * Class representing a Linear Regression model using the closed-form solution.
 */
export class ClosedForm implements ClosedOptions {
  /**
   * The regularization strength.
   */
  alpha: number;
  /**
   * The intercept term.
   */
  intercept: number = 0;

  /**
   * The coefficients for the features.
   */
  theta: number[] = [];

  constructor(options: Partial<ClosedOptions> = {}) {
    const mergedOptions = { ...GradientDescentDefaults, ...options };
    this.alpha = mergedOptions.alpha;
  }

  /**
   * Fit the linear regression model using the closed-form solution.
   * @param {number[][]} X - The design matrix (features).
   * @param {number[]} y - The target values.
   */
  fit(X: number[][], y: number[]) {
    const m = X[0].length;

    const Xmatrix = X.map((row) => [1, ...row]);
    const yMatrix = LinearAlgebra.vector(y);

    const I = LinearAlgebra.identity(m + 1);
    const Xtranspose = LinearAlgebra.transpose(Xmatrix);
    const XtransposeX = LinearAlgebra.multiply(Xtranspose, Xmatrix);
    const regularization = LinearAlgebra.multiplyScalar(I, this.alpha);
    const inverseTerm = LinearAlgebra.inverse(
      LinearAlgebra.add(XtransposeX, regularization),
    );
    const Xtransposey = LinearAlgebra.multiply(Xtranspose, yMatrix);
    const thetaMatrix = LinearAlgebra.multiply(inverseTerm, Xtransposey);

    this.intercept = thetaMatrix[0][0];
    this.theta = thetaMatrix.slice(1).map((row) => row[0]);
  }

  /**
   * Predict the target values for a given design matrix.
   * @param matrix - The design matrix (features).
   * @returns The predicted target values.
   */
  predict(matrix: number[][]) {
    if (!this.theta.length) {
      throw new Error("Model has not been trained yet.");
    }

    const { theta, intercept } = this;
    return matrix.map(
      (sample) => LinearAlgebra.dotProduct(theta, sample) + intercept,
    );
  }

  /**
   * Calculate the R2 score for the model.
   * @param matrix - The design matrix (features).
   * @param outcomes - The actual target values.
   * @returns The R2 score.
   */
  score(matrix: number[][], outcomes: number[]) {
    if (!this.theta.length) {
      throw new Error("Model has not been trained yet.");
    }
    const predictions = this.predict(matrix);
    return R2(outcomes, predictions);
  }
}
