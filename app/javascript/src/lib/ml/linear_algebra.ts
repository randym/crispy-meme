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
  /**
   * Converts a 1D array to a vector.
   * @param array - The 1D array.
   * @returns The vector.
   */
  vector(array: number[]): number[][] {
    return array.map((value) => [value]);
  },
  /**
   * Transposes a matrix.
   * @param matrix - The matrix to transpose.
   * @returns The transposed matrix.
   */
  transpose(matrix: number[][]): number[][] {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
  },

  /**
   * Adds two matrices.
   * @param A - The first matrix.
   * @param B - The second matrix.
   * @returns The sum of the matrices.
   */
  add(A: number[][], B: number[][]): number[][] {
    return A.map((row, i) => row.map((val, j) => val + B[i][j]));
  },

  /**
   * Inverts a matrix using Gauss-Jordan elimination. (really should be using a library for this stuff...)
   * @param matrix - The matrix to invert.
   * @returns The inverted matrix.
   */
  inverse(matrix: number[][]): number[][] {
    const n = matrix.length;
    const augmentedMatrix = matrix.map((row, i) => [
      ...row,
      ...Array(n)
        .fill(0)
        .map((_, j) => (i === j ? 1 : 0)),
    ]);

    // Perform Gauss-Jordan elimination
    for (let i = 0; i < n; i++) {
      // Make the diagonal contain all 1's
      let diagElement = augmentedMatrix[i][i];
      if (diagElement === 0) {
        // Find a row to swap
        for (let k = i + 1; k < n; k++) {
          if (augmentedMatrix[k][i] !== 0) {
            [augmentedMatrix[i], augmentedMatrix[k]] = [
              augmentedMatrix[k],
              augmentedMatrix[i],
            ];
            diagElement = augmentedMatrix[i][i];
            break;
          }
        }
      }
      if (diagElement === 0) {
        throw new Error("Matrix is singular and cannot be inverted.");
      }
      for (let j = 0; j < 2 * n; j++) {
        augmentedMatrix[i][j] /= diagElement;
      }

      // Make the other elements in the column 0
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = augmentedMatrix[k][i];
          for (let j = 0; j < 2 * n; j++) {
            augmentedMatrix[k][j] -= factor * augmentedMatrix[i][j];
          }
        }
      }
    }

    // Extract the inverse matrix
    const inverseMatrix = augmentedMatrix.map((row) => row.slice(n));
    return inverseMatrix;
  },
  /**
   * Multiplies two matrices.
   * @param A - The first matrix.
   * @param B - The second matrix.
   * @returns The product of the matrices.
   */
  multiply(A: number[][], B: number[][]): number[][] {
    const result = Array(A.length)
      .fill(0)
      .map(() => Array(B[0].length).fill(0));
    for (let i = 0; i < A.length; i++) {
      for (let j = 0; j < B[0].length; j++) {
        for (let k = 0; k < B.length; k++) {
          result[i][j] += A[i][k] * B[k][j];
        }
      }
    }
    return result;
  },
  /**
   * Multiplies a matrix by a scalar.
   * @param matrix - The matrix.
   * @param scalar - The scalar.
   * @returns The scaled matrix.
   */
  multiplyScalar(matrix: number[][], scalar: number): number[][] {
    return matrix.map((row) => row.map((val) => val * scalar));
  },
  /**
   * Creates an identity matrix of size n.
   * @param n - The size of the identity matrix.
   * @returns The identity matrix.
   */
  identity(n: number): number[][] {
    return Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
    );
  },
};
