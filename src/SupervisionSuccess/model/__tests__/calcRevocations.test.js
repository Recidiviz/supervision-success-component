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
  const { Alabama, Alaska, Texas } = params;
  const RA = Alabama.revocationA;
  const RT = Alabama.revocationsTimescale;
  const round = (number) => Number(number.toFixed(4));

  it("should return correct revocations with different months", () => {
    expect(round(calcRevocations(0, 6, RA, RT, -30))).toBe(672);
    expect(round(calcRevocations(1, 6, RA, RT, -30))).toBe(665.547);
    expect(round(calcRevocations(9, 6, RA, RT, -30))).toBe(489.0874);
    expect(round(calcRevocations(14, 6, RA, RT, -30))).toBe(472.4415);
  });

  it("should return correct revocations with different implementationPeriod", () => {
    expect(round(calcRevocations(5, 3, RA, RT, -30))).toBe(516.41);
    expect(round(calcRevocations(5, 9, RA, RT, -30))).toBe(605.0575);
    expect(round(calcRevocations(7, 12, RA, RT, -30))).toBe(590.6283);
    expect(round(calcRevocations(6, 0, RA, RT, -70))).toBe(234.6027);
    expect(round(calcRevocations(0, 0, RA, RT, -70))).toBe(672);
  });

  it("should return correct revocations with different params", () => {
    const AlaskaRA = Alaska.revocationA;
    const AlaskaRT = Alaska.revocationsTimescale;
    const TexasRA = Texas.revocationA;
    const TexasRT = Texas.revocationsTimescale;
    expect(round(calcRevocations(0, 1, AlaskaRA, AlaskaRT, -30))).toBe(1099);
    expect(round(calcRevocations(7, 1, AlaskaRA, AlaskaRT, -40))).toBe(699.0063);
    expect(round(calcRevocations(0, 12, TexasRA, TexasRT, -30))).toBe(22940);
    expect(round(calcRevocations(6, 12, TexasRA, TexasRT, -30))).toBe(22013.5847);
    expect(round(calcRevocations(17, 12, TexasRA, TexasRT, -30))).toBe(18248.5668);
  });

  it("should return correct revocations with different changeInRevocations", () => {
    expect(round(calcRevocations(0, 6, RA, RT, -100))).toBe(672);
    expect(round(calcRevocations(8, 6, RA, RT, -100))).toBe(96.9947);
    expect(round(calcRevocations(1, 6, RA, RT, -50))).toBe(661.245);
    expect(round(calcRevocations(5, 6, RA, RT, -1))).toBe(668.6529);
    expect(round(calcRevocations(6, 6, RA, RT, 0))).toBe(672);
    expect(round(calcRevocations(9, 6, RA, RT, 1))).toBe(678.0971);
    expect(round(calcRevocations(14, 6, RA, RT, 50))).toBe(1004.5975);
    expect(round(calcRevocations(14, 6, RA, RT, 99))).toBe(1330.543);
    expect(round(calcRevocations(4, 6, RA, RT, 100))).toBe(910.1056);
  });
});
