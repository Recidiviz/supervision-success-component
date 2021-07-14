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
import calcRevocations from "../calcRevocations";
import params from "../__mocks__/params.mock";

describe("calcRevocations tests", () => {
  const BASE_YEAR = 12;
  const { Alabama } = params;
  const RA = Alabama.revocationA;
  const RT = Alabama.revocationsTimescale;
  const RA0 = Alabama.RAlpha0;
  const round = (number) => Number(number.toFixed(4));

  it("should return correct revocations with different months", () => {
    expect(round(calcRevocations(0, 3 + BASE_YEAR, RA, RA0, RT, -40))).toBe(672);
    expect(round(calcRevocations(1, 3 + BASE_YEAR, RA, RA0, RT, -40))).toBe(574.2011);
    expect(round(calcRevocations(9, 3 + BASE_YEAR, RA, RA0, RT, -40))).toBe(403.7342);
    expect(round(calcRevocations(14, 3 + BASE_YEAR, RA, RA0, RT, -40))).toBe(401.55);
  });

  it("should return correct revocations with different implementationPeriod", () => {
    expect(round(calcRevocations(15, 3 + BASE_YEAR, RA, RA0, RT, -30))).toBe(447.6134);
    expect(round(calcRevocations(15, 9 + BASE_YEAR, RA, RA0, RT, -30))).toBe(433.727);
    expect(round(calcRevocations(7, 12 + BASE_YEAR, RA, RA0, RT, -30))).toBe(410.9707);
    expect(round(calcRevocations(6, 0 + BASE_YEAR, RA, RA0, RT, -40))).toBe(417.8321);
    expect(round(calcRevocations(0, 0 + BASE_YEAR, RA, RA0, RT, -40))).toBe(672);
  });

  it("should return correct revocations with different params", () => {
    const mockRA = 63.87488609;
    const mockRA0 = 1.103815534;
    const mockRT = 5.076329992;
    expect(round(calcRevocations(0, 1 + BASE_YEAR, mockRA, mockRA0, mockRT, -30))).toBe(1646);
    expect(round(calcRevocations(7, 1 + BASE_YEAR, mockRA, mockRA0, mockRT, -40))).toBe(286.6884);
    expect(round(calcRevocations(0, 12 + BASE_YEAR, mockRA, mockRA0, mockRT, -30))).toBe(1646);
    expect(round(calcRevocations(6, 12 + BASE_YEAR, mockRA, mockRA0, mockRT, -30))).toBe(386.3172);
    expect(round(calcRevocations(17, 12 + BASE_YEAR, mockRA, mockRA0, mockRT, -30))).toBe(407.7242);
  });

  it("should return correct revocations with different changeInRevocations", () => {
    expect(round(calcRevocations(0, 6 + BASE_YEAR, RA, RA0, RT, -50))).toBe(672);
    expect(round(calcRevocations(8, 6 + BASE_YEAR, RA, RA0, RT, -50))).toBe(406.5641);
    expect(round(calcRevocations(1, 6 + BASE_YEAR, RA, RA0, RT, -50))).toBe(574.2011);
    expect(round(calcRevocations(5, 6 + BASE_YEAR, RA, RA0, RT, -1))).toBe(428.5162);
    expect(round(calcRevocations(6, 6 + BASE_YEAR, RA, RA0, RT, 0))).toBe(417.8321);
    expect(round(calcRevocations(9, 6 + BASE_YEAR, RA, RA0, RT, 1))).toBe(403.7342);
    expect(round(calcRevocations(14, 6 + BASE_YEAR, RA, RA0, RT, 30))).toBe(603.0111);
    expect(round(calcRevocations(14, 6 + BASE_YEAR, RA, RA0, RT, 40))).toBe(631.847);
    expect(round(calcRevocations(4, 6 + BASE_YEAR, RA, RA0, RT, 50))).toBe(445.1524);
  });
});
