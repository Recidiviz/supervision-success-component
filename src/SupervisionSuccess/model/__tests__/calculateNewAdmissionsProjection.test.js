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
import calculateNewAdmissionsProjection from "../calculateNewAdmissionsProjection";
import params from "../__mocks__/params.mock";

describe("calculateNewAdmissionsProjection tests", () => {
  const BASE_YEAR = 12;
  const { Alabama } = params;
  const NA = Alabama.newOffenseA;
  const NAvg = Alabama.newOffenseAvgTimeServedInMonths;
  const NA0 = Alabama.NAlpha0;
  const round = (number) => Number(number.toFixed(4));

  it("should return correct new admissions with different months", () => {
    expect(round(calculateNewAdmissionsProjection(0, 3 + BASE_YEAR, NA, NAvg, NA0, -40))).toBe(
      32928
    );
    expect(round(calculateNewAdmissionsProjection(1, 3 + BASE_YEAR, NA, NAvg, NA0, -40))).toBe(
      31684.0494
    );
    expect(round(calculateNewAdmissionsProjection(9, 3 + BASE_YEAR, NA, NAvg, NA0, -40))).toBe(
      22622.7899
    );
    expect(round(calculateNewAdmissionsProjection(14, 3 + BASE_YEAR, NA, NAvg, NA0, -40))).toBe(
      19351.6401
    );
  });

  it("should return correct new admissions with different implementationPeriod", () => {
    expect(round(calculateNewAdmissionsProjection(15, 3 + BASE_YEAR, NA, NAvg, NA0, -40))).toBe(
      19327.904
    );
    expect(round(calculateNewAdmissionsProjection(15, 9 + BASE_YEAR, NA, NAvg, NA0, -40))).toBe(
      18594.9355
    );
    expect(round(calculateNewAdmissionsProjection(7, 12 + BASE_YEAR, NA, NAvg, NA0, -40))).toBe(
      24746.8738
    );
    expect(round(calculateNewAdmissionsProjection(6, 0 + BASE_YEAR, NA, NAvg, NA0, -40))).toBe(
      25842.9851
    );
    expect(round(calculateNewAdmissionsProjection(0, 0 + BASE_YEAR, NA, NAvg, NA0, -40))).toBe(
      32928
    );
  });

  it("should return correct new admissions with different params", () => {
    const mockNA = 63.87488609;
    const mockNA0 = 1.103815534;
    const mockNAvg = 5.076329992;
    expect(
      round(calculateNewAdmissionsProjection(0, 1 + BASE_YEAR, mockNA, mockNAvg, mockNA0, -30))
    ).toBe(1646);
    expect(
      round(calculateNewAdmissionsProjection(7, 1 + BASE_YEAR, mockNA, mockNAvg, mockNA0, -40))
    ).toBe(286.6884);
    expect(
      round(calculateNewAdmissionsProjection(0, 12 + BASE_YEAR, mockNA, mockNAvg, mockNA0, -30))
    ).toBe(1646);
    expect(
      round(calculateNewAdmissionsProjection(6, 12 + BASE_YEAR, mockNA, mockNAvg, mockNA0, -30))
    ).toBe(386.3172);
    expect(
      round(calculateNewAdmissionsProjection(17, 12 + BASE_YEAR, mockNA, mockNAvg, mockNA0, -30))
    ).toBe(407.7242);
  });

  it("should return correct new admissions with different changeInNewAdmissions", () => {
    expect(round(calculateNewAdmissionsProjection(0, 6 + BASE_YEAR, NA, NAvg, NA0, -50))).toBe(
      32928
    );
    expect(round(calculateNewAdmissionsProjection(8, 6 + BASE_YEAR, NA, NAvg, NA0, -50))).toBe(
      23673.6345
    );
    expect(round(calculateNewAdmissionsProjection(1, 6 + BASE_YEAR, NA, NAvg, NA0, -50))).toBe(
      31684.0494
    );
    expect(round(calculateNewAdmissionsProjection(5, 6 + BASE_YEAR, NA, NAvg, NA0, -1))).toBe(
      26962.4558
    );
    expect(round(calculateNewAdmissionsProjection(6, 6 + BASE_YEAR, NA, NAvg, NA0, 0))).toBe(
      25842.9851
    );
    expect(round(calculateNewAdmissionsProjection(9, 6 + BASE_YEAR, NA, NAvg, NA0, 1))).toBe(
      22622.7899
    );
    expect(round(calculateNewAdmissionsProjection(14, 6 + BASE_YEAR, NA, NAvg, NA0, 30))).toBe(
      19762.294
    );
    expect(round(calculateNewAdmissionsProjection(14, 6 + BASE_YEAR, NA, NAvg, NA0, 40))).toBe(
      19860.5581
    );
    expect(round(calculateNewAdmissionsProjection(4, 6 + BASE_YEAR, NA, NAvg, NA0, 50))).toBe(
      28105.7837
    );
  });
});
