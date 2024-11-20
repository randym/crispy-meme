import { MSE, R2 } from "../evaluation_metrics";
import { LinearAlgebra } from "../linear_algebra";
import { random } from "../random";
import { mean } from "../../utils/calculator";

interface GradientDescentOptions {
  learningRate: number;
  maxIterations: number;
  tolerance: number;
  alpha: number;
}

const GradientDescentDefaults: GradientDescentOptions = {
  learningRate: 1e-3,
  maxIterations: 1000000,
  tolerance: 1e-4,
  alpha: 1e-4,
};

/**
 * Class representing a Linear Regression model with L2 regularization.
 */
export class LinearRegression implements GradientDescentOptions {
  /**
   * The learning rate for gradient descent.
   */
  learningRate: number;

  /**
   * The maximum number of iterations for gradient descent.
   */
  maxIterations: number;

  /**
   * The tolerance for convergence.
   */
  tolerance: number;

  /**
   * The regularization strength.
   */
  alpha: number;

  /**
   * Indicates whether the model has converged.
   */
  converged: boolean = false;

  /**
   * The design matrix (features).
   */
  X: number[][] = [];

  /**
   * The target values.
   */
  y: number[] = [];

  /**
   * The intercept term.
   */
  intercept: number = 0;

  /**
   * The coefficients for the features.
   */
  theta: number[] = [];

  /**
   * Creates an instance of LinearRegression.
   * @param {Partial<GradientDescentOptions>} [options={}] - The options for gradient descent.
   */
  constructor(options: Partial<GradientDescentOptions> = {}) {
    const mergedOptions = { ...GradientDescentDefaults, ...options };
    this.learningRate = mergedOptions.learningRate;
    this.maxIterations = mergedOptions.maxIterations;
    this.tolerance = mergedOptions.tolerance;
    this.alpha = mergedOptions.alpha;
  }

  /**
   * Fit the linear regression model using gradient descent.
   * This method will update the model's coefficients repeatedly
   * until convergence or the maximum number of iterations is reached.
   * @param X - The design matrix (features).
   * @param y - The target values.
   */
  fit(X: number[][], y: number[]) {
    const { maxIterations, tolerance } = this;
    this.X = X;
    this.y = y;
    this.intercept = mean(y);
    this.theta = X[0].map(() => random());

    let iteration = 0;
    let loss = Infinity;
    let lastLoss = Infinity;
    let improvement = Infinity;

    while (iteration < maxIterations && improvement > tolerance) {
      loss = this.step();
      improvement = Math.abs(lastLoss - loss);
      lastLoss = loss;
      iteration++;
    }

    this.converged = iteration < maxIterations;
    return this;
  }

  /**
   * Predict the target values for a given design matrix.
   * @param matrix - The design matrix (features).
   * @returns The predicted target values.
   */
  predict(matrix: number[][]) {
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
    const predictions = this.predict(matrix);
    return R2(outcomes, predictions);
  }

  /**
   * Perform a gradient descent step to update the model parameters.
   * @returns The current cost after the step.
   */
  private step() {
    const { X, y, theta, learningRate, alpha } = this;
    const n = y.length;
    const scale = -2 / n;

    // Compute predictions
    const y_hat = this.predict(X);

    // Compute residuals (errors)
    const e = y_hat.map((y_hat_i, i) => y[i] - y_hat_i);
    const sumResiduals = e.reduce((acc, e_i) => acc + e_i, 0);

    // Update coefficients (theta)
    theta.forEach((_, j) => {
      const movement = e.reduce((acc, e_i, i) => acc + e_i * X[i][j], 0);
      const regulation = alpha * theta[j];
      const gradient_theta_j = scale * movement + regulation;

      theta[j] -= learningRate * gradient_theta_j;
    });

    // Update intercept
    const gradient_intercept = scale * sumResiduals;
    this.intercept -= learningRate * gradient_intercept;

    return this.cost(X, y);
  }

  /**
   * Calculate the cost function (Mean Squared Error with L2 regularization).
   * @param X - The design matrix (features).
   * @param y - The target values.
   * @returns The cost.
   */
  private cost(X: number[][], y: number[]) {
    const { alpha, theta } = this;
    const n = y.length;
    const y_hat = this.predict(X);
    const mse = MSE(y, y_hat) / n;
    const theta_j2 = theta.reduce((acc, c) => acc + Math.pow(c, 2), 0);

    return mse + (alpha / 2) * theta_j2;
  }
}
