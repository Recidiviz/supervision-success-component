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
const MONTHS_IN_YEAR = 12;
/**
 * Function that calculates one month savings
 * @param {number} initialRevocations - revocations at the start (when month = 0)
 * @param {number} newRevocations - revocations at given month
 * @param {{
 *   checkpoint: number
 *   savings: number
 * }[]} savingsMap - ordered list of checkpoints and associated savings
 * @param {number} marginalCostPerInmate
 * @returns {number} - one month savings
 */
function calcSavings(initialRevocations, newRevocations, savingsMap, marginalCostPerInmate) {
  const revocationsDiff = initialRevocations - newRevocations;

  const reachedCheckPoint = savingsMap.find(({ checkpoint }) => revocationsDiff > checkpoint) || {
    checkpoint: 0,
    savings: 0,
  };
  const graduatedSavings = reachedCheckPoint.savings;
  const marginalSavings = (revocationsDiff - reachedCheckPoint.checkpoint) * marginalCostPerInmate;

  return (graduatedSavings + marginalSavings) / MONTHS_IN_YEAR;
}

export default calcSavings;
