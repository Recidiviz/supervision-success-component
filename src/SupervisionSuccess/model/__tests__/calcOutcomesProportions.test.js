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
import calcOutcomesProportions from "../calcOutcomesProportions";

describe("calcOutcomesProportions tests", () => {
  const mockBaseRevocations = 672;
  const mockBaseAdmissions = 28007;

  it("should return correct proportions from given inputs with positive percent change", () => {
    const { revocationsProportion, admissionsProportion } = calcOutcomesProportions(
      773,
      32147,
      15,
      18,
      4240,
      mockBaseRevocations,
      mockBaseAdmissions
    );
    expect(revocationsProportion).toBe(2);
    expect(admissionsProportion).toBe(98);
  });

  it("should return correct proportions from given inputs with negative percent change", () => {
    const { revocationsProportion, admissionsProportion } = calcOutcomesProportions(
      464,
      25938,
      -31,
      -9,
      -2278,
      mockBaseRevocations,
      mockBaseAdmissions
    );
    expect(revocationsProportion).toBe(9);
    expect(admissionsProportion).toBe(91);
  });

  it("should return only admissions proportion if absolute admissions value is more than revocations value", () => {
    const { revocationsProportion, admissionsProportion } = calcOutcomesProportions(
      470,
      38815,
      -30,
      47,
      10607,
      mockBaseRevocations,
      mockBaseAdmissions
    );
    expect(revocationsProportion).toBe(null);
    expect(admissionsProportion).toBe(100);
  });

  it("should return only revocations proportion if absolute revocations value is more than admissions value", () => {
    const { revocationsProportion, admissionsProportion } = calcOutcomesProportions(
      383,
      28237,
      -43,
      1,
      -59,
      mockBaseRevocations,
      mockBaseAdmissions
    );
    expect(revocationsProportion).toBe(100);
    expect(admissionsProportion).toBe(null);
  });

  it("should not return proportions, if both percent changes are zero", () => {
    const { revocationsProportion, admissionsProportion } = calcOutcomesProportions(
      672,
      28007,
      0,
      0,
      0,
      mockBaseRevocations,
      mockBaseAdmissions
    );
    expect(revocationsProportion).toBe(null);
    expect(admissionsProportion).toBe(null);
  });
});
