export function normalize(input: number[]) {
  const n = input.length;
  const mean = input.reduce((acc, value) => acc + value, 0) / n;
  const std = Math.sqrt(
    input.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) / n,
  );
  const output = input.map((value) => (value - mean) / std);
  return { mean, std, output };
}
