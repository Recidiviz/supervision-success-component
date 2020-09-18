import calcSavings from "../calcSavings";
import params from "../__mocks__/params.mock";
import {
  mockAKRevocationsByMonth,
  mockALRevocationsByMonth,
  mockTXRevocationsByMonth,
} from "../__mocks__/revocations.mock";
import {
  mockAKTotalSavingsByMonth,
  mockALTotalSavingsByMonth,
  mockTXTotalSavingsByMonth,
} from "../__mocks__/costs.mock";

describe("calcSavings tests", () => {
  const { Alabama, Alaska, Texas } = params;
  const ALSavingsMap = Alabama.savingsMap;
  const AKSavingsMap = Alaska.savingsMap;
  const TXSavingsMap = Texas.savingsMap;
  const ALCost = Alabama.marginalCostPerInmate;
  const AKCost = Alaska.marginalCostPerInmate;
  const TXCost = Texas.marginalCostPerInmate;
  const round = (number) => Number(number.toFixed(4));

  it("should return correct savings with different revocations numbers", () => {
    let totalSavings = 0;
    mockALRevocationsByMonth.forEach((revocations, month) => {
      totalSavings += calcSavings(mockALRevocationsByMonth[0], revocations, ALSavingsMap, ALCost);
      expect(round(totalSavings)).toBe(mockALTotalSavingsByMonth[month]);
    });
  });

  it("should return correct savings with different savings Map and cost", () => {
    let totalSavings = 0;
    mockAKRevocationsByMonth.forEach((revocations, month) => {
      totalSavings += calcSavings(mockAKRevocationsByMonth[0], revocations, AKSavingsMap, AKCost);
      expect(round(totalSavings)).toBe(mockAKTotalSavingsByMonth[month]);
    });
  });

  it("should return correct savings with different savings Map and cost", () => {
    let totalSavings = 0;
    mockTXRevocationsByMonth.forEach((revocations, month) => {
      totalSavings += calcSavings(mockTXRevocationsByMonth[0], revocations, TXSavingsMap, TXCost);
      expect(round(totalSavings)).toBe(mockTXTotalSavingsByMonth[month]);
    });
  });
});
