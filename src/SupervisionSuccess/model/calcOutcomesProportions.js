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
 * @param {number} changeInRevocations - integer value of the percentage change in revocations
 * @param {number} changeInNewAdmissions - integer value of the percentage change in new admissions
 * @const {number} prisonPopulationDiff - total difference of people in prison
 * @returns {number}
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
  } else if (Math.abs(changeInRevocations) > Math.abs(changeInNewAdmissions)) {
    revocationsProportion = 100;
    admissionsProportion = null;
  } else {
    revocationsProportion = null;
    admissionsProportion = 100;
  }

  return { revocationsProportion, admissionsProportion };
}

export default calcOutcomesProportions;
