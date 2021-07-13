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
import params from "../__mocks__/params.mock";

jest.mock("../calcRevocations");
jest.mock("../calculateNewAdmissionsProjection");
jest.mock("../calcSavings");

describe("produceProjections tests", () => {
  it("should return correct results", () => {
    let i = 0;
    let j = 0;
    let k = 0;
    calcRevocations.mockImplementation(() => {
      return i++;
    });
    calculateNewAdmissionsProjection.mockImplementation(() => {
      return j++;
    });
    calcSavings.mockImplementation(() => {
      return k++;
    });

    expect(produceProjections(params.Alabama, 6, 1, -50)).toStrictEqual({
      chartData: [
        { month: 0, baseline: 0, totalPopulation: 0 },
        { month: 1, baseline: 2, totalPopulation: 2 },
        { month: 2, baseline: 4, totalPopulation: 4 },
        { month: 3, baseline: 6, totalPopulation: 6 },
        { month: 4, baseline: 8, totalPopulation: 8 },
        { month: 5, baseline: 10, totalPopulation: 10 },
        { month: 6, baseline: 12, totalPopulation: 12 },
        { month: 7, baseline: 14, totalPopulation: 14 },
        { month: 8, baseline: 16, totalPopulation: 16 },
        { month: 9, baseline: 18, totalPopulation: 18 },
        { month: 10, baseline: 20, totalPopulation: 20 },
        { month: 11, baseline: 22, totalPopulation: 22 },
        { month: 12, baseline: 24, totalPopulation: 24 },
        { month: 13, baseline: 19966, totalPopulation: 26 },
        { month: 14, baseline: 19984, totalPopulation: 28 },
        { month: 15, baseline: 20060, totalPopulation: 30 },
        { month: 16, baseline: 20196, totalPopulation: 32 },
        { month: 17, baseline: 20395, totalPopulation: 34 },
        { month: 18, baseline: 20655, totalPopulation: 36 },
        { month: 19, baseline: 20941, totalPopulation: 38 },
        { month: 20, baseline: 21214, totalPopulation: 40 },
        { month: 21, baseline: 21479, totalPopulation: 42 },
        { month: 22, baseline: 21736, totalPopulation: 44 },
        { month: 23, baseline: 21986, totalPopulation: 46 },
        { month: 24, baseline: 22230, totalPopulation: 48 },
        { month: 25, baseline: 22468, totalPopulation: 50 },
        { month: 26, baseline: 22701, totalPopulation: 52 },
        { month: 27, baseline: 22929, totalPopulation: 54 },
        { month: 28, baseline: 23152, totalPopulation: 56 },
        { month: 29, baseline: 23370, totalPopulation: 58 },
      ],
      savings: -625,
      prisonPopulationDiff: -22182,
      finalRevocations: 24,
      finalAdmissions: 24,
    });
  });
});
