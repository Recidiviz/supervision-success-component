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
  const ALMarginalCost = Alabama.marginalCostPerInmate;
  const AKMarginalCost = Alaska.marginalCostPerInmate;
  const TXMarginalCost = Texas.marginalCostPerInmate;

  const ALTotalCost = Alabama.totalCostPerInmate;
  const AKTotalCost = Alaska.totalCostPerInmate;
  const TXTotalCost = Texas.totalCostPerInmate;

  const ALFacilities = Alabama.numberOfFacilities;
  const AKFacilities = Alaska.numberOfFacilities;
  const TXFacilities = Texas.numberOfFacilities;

  const ALCapacity = Alabama.stateWideCapacity;
  const AKCapacity = Alaska.stateWideCapacity;
  const TXCapacity = Texas.stateWideCapacity;

  const ALNewOffence = Alabama.newOffensePopulation;
  const AKNewOffence = Alaska.newOffensePopulation;
  const TXNewOffence = Texas.newOffensePopulation;

  const round = (number) => Number(number.toFixed(4));

  describe("should return correct savings with different revocations numbers", () => {
    it("should return correct savings for AL", () => {
      let totalSavings = 0;
      mockALRevocationsByMonth.forEach((revocations, month) => {
        totalSavings += calcSavings({
          newRevocations: revocations,
          numberOfFacilities: ALFacilities,
          totalCostPerInmate: ALTotalCost,
          marginalCostPerInmate: ALMarginalCost,
          stateWideCapacity: ALCapacity,
          newOffensePopulation: ALNewOffence,
        });
        expect(round(totalSavings)).toBe(mockALTotalSavingsByMonth[month]);
      });
    });

    it("should return correct savings for AK", () => {
      let totalSavings = 0;
      mockAKRevocationsByMonth.forEach((revocations, month) => {
        totalSavings += calcSavings({
          newRevocations: revocations,
          numberOfFacilities: AKFacilities,
          totalCostPerInmate: AKTotalCost,
          marginalCostPerInmate: AKMarginalCost,
          stateWideCapacity: AKCapacity,
          newOffensePopulation: AKNewOffence,
        });
        expect(round(totalSavings)).toBe(mockAKTotalSavingsByMonth[month]);
      });
    });

    it("should return correct savings for TX", () => {
      let totalSavings = 0;
      mockTXRevocationsByMonth.forEach((revocations, month) => {
        totalSavings += calcSavings({
          newRevocations: revocations,
          numberOfFacilities: TXFacilities,
          totalCostPerInmate: TXTotalCost,
          marginalCostPerInmate: TXMarginalCost,
          stateWideCapacity: TXCapacity,
          newOffensePopulation: TXNewOffence,
        });
        expect(round(totalSavings)).toBe(mockTXTotalSavingsByMonth[month]);
      });
    });
  });

  describe("should work with revocations increase as well", () => {
    // TODO(49): Add tests on revocations increase when questions would be resolved
  });
});
