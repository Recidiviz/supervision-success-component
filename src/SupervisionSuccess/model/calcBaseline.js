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
const { exp } = Math;

/**
 * Function that calculates revocation projections from the given inputs.
 * @param {number} month - Integer from 0 to Infinity that represents quantity
 *   of months since the start
 * @param {number} IP - implementationPeriod - an integer value of months
 * @param {number} RA - revocations A - (a parameter from the upstream spreadsheet)
 * @param {number} RA0 - revocations Alpha 0 - (a parameter from the upstream spreadsheet)
 * @param {number} RT - revocations Timescale - (a parameter from the upstream spreadsheet)
 * @param {number} NA - new offense A - (a parameter from the upstream spreadsheet)
 * @param {number} NAvg - New Offense Avg Time Served in Months - (a parameter from the upstream spreadsheet)
 * @param {number} NA0 - new offense Alpha 0 - (a parameter from the upstream spreadsheet)
 * @param {number} newRevocations - revocations at a given month
 * @param {number} newOffensePopulation - number of new offense incarcerations at a given month
 * @returns {number}
 */
function calcBaseline(month, IP, RA, RA0, RT, NA, NAvg, NA0, newRevocations, newOffensePopulation) {
  let revocationsBaseline;
  let newOffenseBaseline;

  if (month <= 12) {
    revocationsBaseline = newRevocations;
    newOffenseBaseline = newOffensePopulation;
  } else if (month <= IP) {
    revocationsBaseline =
      RA *
      RT ** 2 *
      (RA0 * exp(-month / RT) +
        1 -
        (0 * month) / IP +
        (0 * RT) / IP -
        RA0 +
        (RA0 * month) / IP -
        (RA0 * RT) / IP -
        (0 - RA0) * (-12 / IP + RT / IP) * exp(-(month - 12) / RT));

    newOffenseBaseline =
      NA *
      NAvg ** 2 *
      (NA0 * exp(-month / NAvg) +
        1 -
        (0 * month) / IP +
        (0 * NAvg) / IP -
        NA0 +
        (NA0 * month) / IP -
        (NA0 * NAvg) / IP -
        (0 - NA0) * (-12 / IP + NAvg / IP) * exp(-(month - 12) / NAvg));
  } else {
    revocationsBaseline =
      exp(-(month - IP) / RT) *
        (RA *
          RT ** 2 *
          (RA0 * exp(-IP / RT) +
            (1 + (0 * RT) / IP - (RA0 * RT) / IP) -
            -RA0 * (-12 / IP + RT / IP) * exp(-(IP - 12) / RT))) +
      RA * RT ** 2 * (1 - 0) * (1 - exp(-(month - IP) / RT));

    newOffenseBaseline =
      exp(-(month - IP) / NAvg) *
        (NA *
          NAvg ** 2 *
          (NA0 * exp(-IP / NAvg) +
            (1 - (NA0 * NAvg) / IP) -
            -NA0 * (-12 / IP + NAvg / IP) * exp(-(IP - 12) / NAvg))) +
      NA * NAvg ** 2 * (1 - 0) * (1 - exp(-(month - IP) / NAvg));
  }

  return Math.round(revocationsBaseline + newOffenseBaseline);
}

export default calcBaseline;
