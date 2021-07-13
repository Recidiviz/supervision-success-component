// Recidiviz - a data platform for criminal justice reform
// Copyright (C) 2021 Recidiviz, Inc.
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
import calcBaselines from "../calcBaselines";
import { mockALRevocationsByMonth } from "../__mocks__/revocations.mock";
import { mockALNewAdmissionsByMonth } from "../__mocks__/newAdmissions.mock";
import { mockALBaselineByMonth } from "../__mocks__/baselines.mock";
import params from "../__mocks__/params.mock";

describe("calcBaselines tests", () => {
  const BASE_YEAR = 12;
  const { Alabama } = params;
  const RA = Alabama.revocationA;
  const RT = Alabama.revocationsTimescale;
  const RA0 = Alabama.RAlpha0;
  const NA = Alabama.newOffenseA;
  const NAvg = Alabama.newOffenseAvgTimeServedInMonths;
  const NA0 = Alabama.NAlpha0;

  it("should return correct baselines with different months", () => {
    let baseline = 0;
    mockALRevocationsByMonth.forEach((revocations, month) => {
      baseline = calcBaselines(
        month,
        3 + BASE_YEAR,
        RA,
        RA0,
        RT,
        NA,
        NAvg,
        NA0,
        revocations,
        mockALNewAdmissionsByMonth[month]
      );
      expect(baseline).toBe(Math.round(mockALBaselineByMonth[month]));
    });
  });
});
