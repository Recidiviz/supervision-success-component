// Recidiviz - a data platform for criminal justice reform
// Copyright (C) 2020 Recidiviz, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
// =============================================================================
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
