import { Calculator } from "./calculator";
import { round } from "./calculator";
describe("calculator", () => {
  type testMember = {
    value: number;
  };

  const source: testMember[] = [
    { value: 4 },
    { value: 2 },
    { value: 1 },
    { value: 3 },
  ];

  let sut: Calculator<testMember>;

  const sum = 10;
  const average = 2.5;
  const count = 4;
  const min = 1;
  const q1 = 1.25;
  const median = 2.5;
  const q3 = 3.75;
  const max = 4;
  const variance = 1.25;
  const std = 1.118033988749895;
  const scaled = [1, +0.3333333333333333, 0, 0.6666666666666666];
  const sigmoid = [
    0.7310585786300049, 0.5825702064623147, 0.5, 0.6607563687658172,
  ];

  const sorted = [1, 2, 3, 4];

  beforeAll(() => {
    sut = new Calculator(source);
  });

  it("should round to two decimal places by default", () => {
    expect(round(1.118033988749895)).toBe(1.12);
  });

  it("should round to arbitrary decimal place", () => {
    expect(round(1.118033988749895, 6)).toBe(1.118034);
  });

  it("should sum", () => {
    expect(sut.sum("value")).toBe(sum);
  });

  it("should average", () => {
    expect(sut.average("value")).toBe(average);
  });

  it("should count", () => {
    expect(sut.count).toBe(count);
  });

  it("should min", () => {
    expect(sut.min("value")).toBe(min);
  });

  it("should q1", () => {
    expect(sut.q1("value")).toBe(q1);
  });

  it("should median", () => {
    expect(sut.median("value")).toBe(median);
  });

  it("should q3", () => {
    expect(sut.q3("value")).toBe(q3);
  });

  it("should max", () => {
    expect(sut.max("value")).toBe(max);
  });

  it("should variance", () => {
    expect(sut.variance("value")).toBe(variance);
  });

  it("should std", () => {
    expect(sut.std("value")).toBe(std);
  });

  it("should sorted", () => {
    expect(sut.sorted("value")).toEqual(sorted);
  });

  it("should sigmoid", () => {
    console.log(sut.sigmoid("value"));
    expect(sut.sigmoid("value")).toEqual(sigmoid);
  });

  it("should scaled", () => {
    expect(sut.scaled("value")).toEqual(scaled);
  });

  it("should stats", () => {
    expect(sut.stats("value")).toEqual({
      sum,
      count,
      average,
      min,
      q1,
      median,
      q3,
      max,
      variance,
      std,
      scaled,
      sigmoid,
    });
  });
});
