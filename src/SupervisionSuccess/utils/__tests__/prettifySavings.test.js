import prettifySavings from "../prettifySavings";

describe("prettifySavings tests", () => {
  it("should return integer when number in [-∞; -100] or [100; ∞]", () => {
    expect(prettifySavings(1005.3525235235235)).toBe("$1005M");
    expect(prettifySavings(100.924)).toBe("$101M");
  });

  it("should return 1 digit after dot when number in (-100; -10] or [10, 100)", () => {
    expect(prettifySavings(67.412)).toBe("$67.4M");
    expect(prettifySavings(17.5500000001)).toBe("$17.6M");
  });

  it("should return 2 digits after dot when number in (-10; 1] or [1, 10)", () => {
    expect(prettifySavings(7.4126)).toBe("$7.41M");
    expect(prettifySavings(-1.5500000001)).toBe("$1.55M");
  });

  it("should return sum in thousands when number in (-1; 1)", () => {
    expect(prettifySavings(-0.4125216)).toBe("$413k");
    expect(prettifySavings(0.5500000001)).toBe("$550k");
  });
});
