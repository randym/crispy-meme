/**
 * Generates a normally distributed random number with a given mean and standard deviation.
 * Uses the Box-Muller transform to generate the random number.
 *
 * @param {Object} [options] - The options for the random number generation.
 * @param {number} [options.mean=0] - The mean of the distribution.
 * @param {number} [options.stdDev=1] - The standard deviation of the distribution.
 * @returns {number} - A normally distributed random number.
 */
export function random({
  mean = 0,
  stdDev = 1,
}: { mean?: number; stdDev?: number } = {}): number {
  let u1 = Math.random();
  let u2 = Math.random();
  let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdDev + mean;
}
