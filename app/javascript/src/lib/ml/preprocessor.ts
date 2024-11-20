import { NUMBER } from "./const";
import { CSV } from "./csv";

export class Preprocessor {
  source: (string | number)[][] = [];
  normalized: (string | number)[][] = [];
  types: string[] = [];
  headers: string[] = [];
  features: string[] = [];
  target: string = "";

  normalizations: Record<string, { min: number; max: number }> = {};

  constructor(csv?: string) {
    csv && this.load(csv);
  }

  get outcomes(): number[] {
    const index = this.headerIndex(this.target);
    return this.source.map((row) => row[index] as number);
  }

  get designMatrix(): number[][] {
    const { normalized } = this;
    const indices = this.headerIndices(...this.features);

    return this.normalized.map((row) => [
      ...indices.map((index) => row[index]),
    ]) as number[][];
  }

  load(csv: string) {
    const { headers, source, types } = CSV.parse(csv);
    this.source = source;
    this.types = types;
    this.headers = headers;
    this.normalize();
  }

  denormalize(value: number, header: string) {
    const { min, max } = this.normalizations[header];

    return value * (max - min) + min;
  }

  private headerIndices(...headers: string[]): number[] {
    return headers.map((header) => this.headers.indexOf(header));
  }

  private headerIndex(header: string): number {
    return this.headers.indexOf(header);
  }

  private normalize() {
    const { headers, source, types } = this;

    const mins: number[] = new Array(types.length).fill(Infinity);
    const maxes: number[] = new Array(types.length).fill(-Infinity);

    source.forEach((row) => {
      row.forEach((cell, index) => {
        const value = cell as number;
        value < mins[index] && (mins[index] = value);
        value > maxes[index] && (maxes[index] = value);
      });
    });

    this.normalized = source.map((row) => {
      return row.map((cell, index) => {
        if (types[index] === NUMBER) {
          const value = cell as number;
          const min = mins[index];
          const max = maxes[index];
          this.normalizations[headers[index]] = { min, max };
          return max - min === 0 ? 0.5 : (value - min) / (max - min);
        }
        return cell;
      });
    });
  }
}
