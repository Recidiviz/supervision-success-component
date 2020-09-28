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
import calcSavings from "../calcSavings";
import params from "../__mocks__/params.mock";

jest.mock("../calcRevocations");
jest.mock("../calcSavings");

describe("produceProjections tests", () => {
  it("should return correct results", () => {
    let i = 0;
    let k = 0;
    calcRevocations.mockImplementation(() => {
      return i++;
    });
    calcSavings.mockImplementation(() => {
      return k++;
    });

    expect(produceProjections(params.Alabama, 6, 1, -50)).toStrictEqual({
      chartData: [
        { month: 0, baseline: 32928, totalPopulation: 32928 },
        { month: 1, baseline: 32928, totalPopulation: 32929 },
        { month: 2, baseline: 32928, totalPopulation: 32930 },
        { month: 3, baseline: 32928, totalPopulation: 32931 },
        { month: 4, baseline: 32928, totalPopulation: 32932 },
        { month: 5, baseline: 32928, totalPopulation: 32933 },
        { month: 6, baseline: 32928, totalPopulation: 32934 },
        { month: 7, baseline: 32928, totalPopulation: 32935 },
        { month: 8, baseline: 32928, totalPopulation: 32936 },
        { month: 9, baseline: 32928, totalPopulation: 32937 },
        { month: 10, baseline: 32928, totalPopulation: 32938 },
        { month: 11, baseline: 32928, totalPopulation: 32939 },
        { month: 12, baseline: 32928, totalPopulation: 32940 },
        { month: 13, baseline: 32928, totalPopulation: 32941 },
        { month: 14, baseline: 32928, totalPopulation: 32942 },
        { month: 15, baseline: 32928, totalPopulation: 32943 },
        { month: 16, baseline: 32928, totalPopulation: 32944 },
        { month: 17, baseline: 32928, totalPopulation: 32945 },
      ],
      savings: 78,
      prisonPopulationDiff: 12,
      finalRevocations: 12,
    });
  });
});
