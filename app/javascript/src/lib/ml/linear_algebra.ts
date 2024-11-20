/**
 * Computes the dot product of two vectors.
 * @param vector1 - The first vector.
 * @param vector2 - The second vector.
 * @returns The dot product of the two vectors.
 */
export const LinearAlgebra = {
  dotProduct(vector1: number[], vector2: number[]): number {
    return vector1.reduce(
      (acc, value, index) => acc + value * vector2[index],
      0,
    );
  },
};
