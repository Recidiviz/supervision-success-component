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
const { exp } = Math;

/**
 * Function that calculates revocation projections from the given inputs.
 * @param {number} month - Integer from 0 to Infinity that represents quantity
 *   of months since the start
 * @param {number} IP - implementationPeriod - an integer value of months
 * @param {number} RA - revocations A - (a parameter from the upstream spreadsheet)
 * @param {number} RA0 - revocations Alpha 0 - (a parameter from the upstream spreadsheet)
 * @param {number} RT - revocations Timescale - (a parameter from the upstream spreadsheet)
 * @param {number} changeInRevocations - integer value of the percentage change in revocations
 * @const {number} RR - revocation reduction - since we store changeInRevocations
 *   as integer number, we need to divide it by 100 and multiply by
 *   -1 to transform it to a revocation reduction that is used in calculations
 * @returns {number}
 */
function calcRevocations(month, IP, RA, RA0, RT, changeInRevocations) {
  const RR = (changeInRevocations / 100) * -1;

  if (month <= 12) {
    return RA * RT ** 2 * (1 - RA0 + RA0 * exp(-month / RT));
  }

  if (month <= IP) {
    return (
      RA *
      RT ** 2 *
      (RA0 * exp(-month / RT) +
        (1 - (RR * month) / IP + (RR * RT) / IP - RA0 + (RA0 * month) / IP - (RA0 * RT) / IP) -
        (RR - RA0) * (-12 / IP + RT / IP) * exp(-(month - 12) / RT))
    );
  }

  return (
    exp(-(month - IP) / RT) *
      (RA *
        RT ** 2 *
        (RA0 * exp(IP / RT) +
          (1 - RR + (RR * RT) / IP - (RA0 * RT) / IP) -
          (RR - RA0) * (-12 / IP + RT / IP) * exp(-(IP - 12) / RT))) +
    RA * RT ** 2 * (1 - RR) * (1 - exp(-(month - IP) / RT))
  );
}

export default calcRevocations;
