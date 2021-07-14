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
  mockALRevocationsByMonth,
  mockIncreasingALRevocationsByMonth,
} from "../__mocks__/revocations.mock";
import {
  mockALNewAdmissionsByMonth,
  mockIncreasingALNewAdmissionsByMonth,
} from "../__mocks__/newAdmissions.mock";
import { mockALBaselineByMonth } from "../__mocks__/baselines.mock";
import {
  mockALTotalSavingsPolicyByMonth,
  mockALTotalSavingsBaselineByMonth,
  mockIncreasingALTotalSavingsPolicyByMonth,
} from "../__mocks__/costs.mock";

describe("calcSavings tests", () => {
  const { Alabama } = params;
  const ALMarginalCost = Alabama.marginalCostPerInmate;
  const ALTotalCost = Alabama.totalCostPerInmate;
  const ALFacilities = Alabama.numberOfFacilities;
  const ALCapacity = Alabama.stateWideCapacity;

  const round = (number) => Number(number.toFixed(4));

  describe("should return correct savings with different base values", () => {
    it("should return correct policy savings for AL", () => {
      let totalSavings = 0;
      mockALRevocationsByMonth.forEach((revocations, month) => {
        totalSavings += calcSavings({
          baseValue: revocations + mockALNewAdmissionsByMonth[month],
          numberOfFacilities: ALFacilities,
          totalCostPerInmate: ALTotalCost,
          marginalCostPerInmate: ALMarginalCost,
          stateWideCapacity: ALCapacity,
        });
        expect(round(totalSavings)).toBe(mockALTotalSavingsPolicyByMonth[month]);
      });
    });

    it("should return correct baseline savings for AL", () => {
      let totalSavings = 0;
      mockALBaselineByMonth.forEach((baselines, month) => {
        totalSavings += calcSavings({
          baseValue: baselines,
          numberOfFacilities: ALFacilities,
          totalCostPerInmate: ALTotalCost,
          marginalCostPerInmate: ALMarginalCost,
          stateWideCapacity: ALCapacity,
        });
        expect(round(totalSavings)).toBe(mockALTotalSavingsBaselineByMonth[month]);
      });
    });
  });

  describe("should work with base value increase as well", () => {
    it("should return correct policy costs for AL", () => {
      let totalCosts = 0;
      mockIncreasingALRevocationsByMonth.forEach((revocations, month) => {
        totalCosts += calcSavings({
          baseValue: revocations + mockIncreasingALNewAdmissionsByMonth[month],
          numberOfFacilities: ALFacilities,
          totalCostPerInmate: ALTotalCost,
          marginalCostPerInmate: ALMarginalCost,
          stateWideCapacity: ALCapacity,
        });
        expect(round(totalCosts)).toBe(mockIncreasingALTotalSavingsPolicyByMonth[month]);
      });
    });
  });
});
