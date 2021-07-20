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

/**
 * Function that calculates outcome proportions from the given inputs.
 * @param {number} finalRevocations - integer value of revocations with applied changeInRevocations value
 * @param {number} finalAdmissions - integer value of new admissions with applied changeInNewAdmissions value
 * @param {number} changeInRevocations - integer value of the percentage change in revocations
 * @param {number} changeInNewAdmissions - integer value of the percentage change in new admissions
 * @const {number} prisonPopulationDiff - total difference of people in prison
 * @param {number} baseRevocations - integer value of revocations with zero changeInRevocations value
 * @const {number} baseAdmissions - integer value of change in new admissions with zero changeInNewAdmissions value
 * @returns {{
 *   revocationsProportion: number,
 *   admissionsProportion: number,
 * }}
 */
function calcOutcomesProportions(
  finalRevocations,
  finalAdmissions,
  changeInRevocations,
  changeInNewAdmissions,
  prisonPopulationDiff,
  baseRevocations,
  baseAdmissions
) {
  let revocationsProportion;
  let admissionsProportion;

  if (
    (changeInNewAdmissions > 0 && changeInRevocations > 0) ||
    (changeInRevocations < 0 && changeInNewAdmissions < 0)
  ) {
    revocationsProportion = Math.abs(
      Math.round((Math.abs(baseRevocations - finalRevocations) / prisonPopulationDiff) * 100)
    );

    admissionsProportion = Math.abs(
      Math.round((Math.abs(baseAdmissions - finalAdmissions) / prisonPopulationDiff) * 100)
    );

    if (revocationsProportion === 0) {
      revocationsProportion = null;
    } else if (admissionsProportion === 0) {
      admissionsProportion = null;
    }
  } else if (
    Math.abs(baseRevocations - finalRevocations) > Math.abs(baseAdmissions - finalAdmissions)
  ) {
    revocationsProportion = 100;
    admissionsProportion = null;
  } else {
    revocationsProportion = null;
    admissionsProportion = 100;
  }

  return { revocationsProportion, admissionsProportion };
}

export default calcOutcomesProportions;
