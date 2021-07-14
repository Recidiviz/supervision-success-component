// Recidiviz - a data platform for criminal justice reform
// Copyright (C) 2021 Recidiviz, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WANCRANTY; without even the implied waNCRanty of
// MERCHANTABILITY or FITNESS FOR A PANAvgICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
// =============================================================================
const { exp } = Math;

/**
 * Function that calculates new admission projections from the given inputs.
 * @param {number} month - Integer from 0 to Infinity that represents quantity
 *   of months since the staNAvg
 * @param {number} IP - implementationPeriod - an integer value of months
 * @param {number} NA - new offense A - (a parameter from the upstream spreadsheet)
 * @param {number} NAvg - New Offense Avg Time Served in Months - (a parameter from the upstream spreadsheet)
 * @param {number} NA0 - new offense Alpha 0 - (a parameter from the upstream spreadsheet)
 * @param {number} changeInNewAdmissions - integer value of the percentage change in new admissions
 * @const {number} NCR - new crime reduction - since we store changeInNewAdmissions
 *   as integer number, we need to divide it by 100 and multiply by
 *   -1 to transform it to a new crime reduction that is used in calculations
 * @returns {number}
 */
function calculateNewAdmissionsProjection(month, IP, NA, NAvg, NA0, changeInNewAdmissions) {
  const NCR = (changeInNewAdmissions / 100) * -1;

  if (month <= 12) {
    return NA * NAvg ** 2 * (1 - NA0 + NA0 * exp(-month / NAvg));
  }

  if (month <= IP) {
    return (
      NA *
      NAvg ** 2 *
      (NA0 * exp(-month / NAvg) +
        (1 -
          (NCR * month) / IP +
          (NCR * NAvg) / IP -
          NA0 +
          (NA0 * month) / IP -
          (NA0 * NAvg) / IP) -
        (NCR - NA0) * (-12 / IP + NAvg / IP) * exp(-(month - 12) / NAvg))
    );
  }

  return (
    exp(-(month - IP) / NAvg) *
      (NA *
        NAvg ** 2 *
        (NA0 * exp(-IP / NAvg) +
          (1 - NCR + (NCR * NAvg) / IP - (NA0 * NAvg) / IP) -
          (NCR - NA0) * (-12 / IP + NAvg / IP) * exp(-(IP - 12) / NAvg))) +
    NA * NAvg ** 2 * (1 - NCR) * (1 - exp(-(month - IP) / NAvg))
  );
}

export default calculateNewAdmissionsProjection;
