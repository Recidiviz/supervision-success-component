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

/* eslint-disable no-plusplus */
import produceProjections from "../produceProjections";
import calcRevocations from "../calcRevocations";
import calculateNewAdmissionsProjection from "../calculateNewAdmissionsProjection";
import calcSavings from "../calcSavings";
import calcBaselines from "../calcBaselines";
import params from "../__mocks__/params.mock";

jest.mock("../calcRevocations");
jest.mock("../calculateNewAdmissionsProjection");
jest.mock("../calcSavings");
jest.mock("../calcBaselines");

describe("produceProjections tests", () => {
  it("should return correct results", () => {
    let i = 0;
    let j = 0;
    let k = 0;
    let h = 0;
    calcRevocations.mockImplementation(() => {
      return i++;
    });
    calculateNewAdmissionsProjection.mockImplementation(() => {
      return j++;
    });
    calcBaselines.mockImplementation(() => {
      return h++;
    });
    calcSavings.mockImplementation(() => {
      return k++;
    });

    expect(produceProjections(params.Alabama, 6, 1, -50, -50)).toStrictEqual({
      chartData: [
        { month: 0, baseline: 0, totalPopulation: 0, max: 118, min: 120 },
        { month: 1, baseline: 1, totalPopulation: 2, max: 118, min: 120 },
        { month: 2, baseline: 2, totalPopulation: 4, max: 118, min: 120 },
        { month: 3, baseline: 3, totalPopulation: 6, max: 118, min: 120 },
        { month: 4, baseline: 4, totalPopulation: 8, max: 118, min: 120 },
        { month: 5, baseline: 5, totalPopulation: 10, max: 118, min: 120 },
        { month: 6, baseline: 6, totalPopulation: 12, max: 118, min: 120 },
        { month: 7, baseline: 7, totalPopulation: 14, max: 118, min: 120 },
        { month: 8, baseline: 8, totalPopulation: 16, max: 118, min: 120 },
        { month: 9, baseline: 9, totalPopulation: 18, max: 118, min: 120 },
        { month: 10, baseline: 10, totalPopulation: 20, max: 118, min: 120 },
        { month: 11, baseline: 11, totalPopulation: 22, max: 118, min: 120 },
        { month: 12, baseline: 12, totalPopulation: 24, max: 118, min: 120 },
        { month: 13, baseline: 13, totalPopulation: 26, max: 118, min: 120 },
        { month: 14, baseline: 14, totalPopulation: 28, max: 118, min: 120 },
        { month: 15, baseline: 15, totalPopulation: 30, max: 118, min: 120 },
        { month: 16, baseline: 16, totalPopulation: 32, max: 118, min: 120 },
        { month: 17, baseline: 17, totalPopulation: 34, max: 118, min: 120 },
        { month: 18, baseline: 18, totalPopulation: 36, max: 118, min: 120 },
        { month: 19, baseline: 19, totalPopulation: 38, max: 118, min: 120 },
        { month: 20, baseline: 20, totalPopulation: 40, max: 118, min: 120 },
        { month: 21, baseline: 21, totalPopulation: 42, max: 118, min: 120 },
        { month: 22, baseline: 22, totalPopulation: 44, max: 118, min: 120 },
        { month: 23, baseline: 23, totalPopulation: 46, max: 118, min: 120 },
        { month: 24, baseline: 24, totalPopulation: 48, max: 118, min: 120 },
        { month: 25, baseline: 25, totalPopulation: 50, max: 118, min: 120 },
        { month: 26, baseline: 26, totalPopulation: 52, max: 118, min: 120 },
        { month: 27, baseline: 27, totalPopulation: 54, max: 118, min: 120 },
        { month: 28, baseline: 28, totalPopulation: 56, max: 118, min: 120 },
        { month: 29, baseline: 29, totalPopulation: 58, max: 118, min: 120 },
      ],
      savings: -625,
      prisonPopulationDiff: 24,
      finalRevocations: 24,
      finalAdmissions: 24,
    });
  });
});
