export const round = (number: number, decimalPlaces: number = 2): number =>
  parseFloat(number.toFixed(decimalPlaces));

interface Stats {
  sum?: number;
  average?: number;
  count?: number;
  min?: number;
  max?: number;
  variance?: number;
  q1?: number;
  median?: number;
  q3?: number;
  std?: number;
  sorted?: number[];
  sigmoid?: number[];
  scaled?: number[];
}
export class Calculator<T> {
  private collection: readonly T[];
  count: number;
  private cache: Record<keyof T, Stats>;

  constructor(collection: readonly T[]) {
    this.collection = collection;
    this.count = collection.length;
    this.cache = {} as Record<keyof T, Stats>;
  }

  sum(attribute: keyof T): number {
    const lambda = () =>
      this.collection.reduce((acc, item) => {
        var value = item[attribute] as number;
        return acc + value;
      }, 0);

    return this.cached(attribute, "sum", lambda) as number;
  }

  sorted(attribute: keyof T): number[] {
    const lambda = () =>
      this.collection
        .map((item) => item[attribute] as number)
        .sort((a, b) => a - b);

    return this.cached(attribute, "sorted", lambda) as number[];
  }

  sigmoid(attribute: keyof T): number[] {
    const lambda = () => {
      return this.scaled(attribute).map((x) => {
        return 1.0 / (1 + Math.exp(-x));
      });
    };
    return this.cached(attribute, "sigmoid", lambda) as number[];
  }

  scaled(attribute: keyof T): number[] {
    const values = this.collection.map((item) => item[attribute]) as number[];
    const min = this.min(attribute);
    const max = this.max(attribute);

    return values.map((x) => (x - min) / (max - min));
  }

  min(attribute: keyof T): number {
    const lambda = () => Math.min(...this.sorted(attribute));
    return this.cached(attribute, "min", lambda) as number;
  }

  max(attribute: keyof T): number {
    const lambda = () => Math.max(...this.sorted(attribute));
    return this.cached(attribute, "max", lambda) as number;
  }

  q1(attribute: keyof T): number {
    const lambda = () => this.percentile(attribute, 25);
    return this.cached(attribute, "q1", lambda) as number;
  }

  q3(attribute: keyof T): number {
    const lambda = () => this.percentile(attribute, 75);
    return this.cached(attribute, "q3", lambda) as number;
  }

  median(attribute: keyof T): number {
    const lambda = () => this.percentile(attribute, 50);
    return this.cached(attribute, "median", lambda) as number;
  }

  average(attribute: keyof T): number {
    const lambda = () => round(this.sum(attribute) / this.count);
    return this.cached(attribute, "average", lambda) as number;
  }

  variance(attribute: keyof T): number {
    const lambda = () => {
      const average = this.average(attribute);
      return round(
        this.collection.reduce((acc, item) => {
          const value = item[attribute] as number;
          return acc + Math.pow(value - average, 2);
        }, 0) / this.count,
      );
    };

    return this.cached(attribute, "variance", lambda) as number;
  }

  std(attribute: keyof T): number {
    const lambda = () => Math.sqrt(this.variance(attribute));
    return this.cached(attribute, "std", lambda) as number;
  }

  private percentile(attribute: keyof T, value: number): number {
    const values = this.sorted(attribute);

    const n = values.length;
    const p = value / 100.0;
    const x = p * (n + 1);
    const k = Math.trunc(x);
    const d = x % 1;

    if (k === 0) return values[0];
    if (k >= n) return values[n - 1];

    return values[k - 1] + d * (values[k] - values[k - 1]);
  }

  private cached<R>(
    attribute: keyof T,
    key: keyof Stats,
    lambda: () => any,
  ): R {
    const cache = (this.cache[attribute] ||= {});
    if (cache[key]) return cache[key] as R;

    cache[key] = lambda();

    this.cache[attribute] = cache;
    return cache[key] as R;
  }

  stats(attribute: keyof T) {
    return {
      sum: this.sum(attribute),
      average: this.average(attribute),
      count: this.count,
      min: this.min(attribute),
      q1: this.q1(attribute),
      median: this.median(attribute),
      q3: this.q3(attribute),
      max: this.max(attribute),
      variance: this.variance(attribute),
      std: this.std(attribute),
      sigmoid: this.sigmoid(attribute),
      scaled: this.scaled(attribute),
    };
  }
}
