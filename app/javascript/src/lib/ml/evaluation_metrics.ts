export const SE = (y: number[], y_hat: number[]) => {
  return y.reduce((acc, y_i, i) => {
    return acc + Math.pow(y_i - y_hat[i], 2);
  }, 0);
};

export const MSE = (y: number[], y_hat: number[]) => {
  const n = y.length;
  return (1 / n) * SE(y, y_hat);
};

export const RMSE = (y: number[], y_hat: number[]) => {
  return Math.sqrt(MSE(y, y_hat));
};

export const MAE = (y: number[], y_hat: number[]) => {
  const n = y.length;

  const sumOfAbsoluteValues = y.reduce((acc, y_i, i) => {
    return acc + Math.abs(y_i - y_hat[i]);
  }, 0);

  return sumOfAbsoluteValues / n;
};

export const MAPE = (y: number[], y_hat: number[]) => {
  return (MAE(y, y_hat) / y.reduce((acc, y_i) => acc + y_i, 0)) * 100;
};

export const R2 = (y: number[], y_hat: number[]) => {
  const n = y.length;

  const average = y.reduce((acc, y_i) => acc + y_i, 0) / n;

  const totalSumOfSquares = y.reduce((acc, y_i) => {
    return acc + Math.pow(y_i - average, 2);
  }, 0);

  const residualSumOfSquares = y.reduce((acc, y_i, i) => {
    return acc + Math.pow(y_i - y_hat[i], 2);
  }, 0);

  return 1 - residualSumOfSquares / totalSumOfSquares;
};
