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
 * Function that calculates one month of dollar savings due to the modeled
 * revocation reduction. This will return a negative number if there is an
 * increase in costs due to an increase in revocations.
 * @param {number} newRevocations - revocations at a given month
 * @param {number} marginalCostPerInmate - the marginal cost per incarcerated person
 * @param {number} newOffensePopulation
 * @param {number} totalCostPerInmate - the total cost per incarcerated person
 * @param {number} numberOfFacilities - number of facilities for state
 * @param {number} stateWideCapacity - capacity of facilities
 * @returns {number} - one month of savings
 */
function calcSavings({
  newRevocations,
  marginalCostPerInmate,
  newOffensePopulation,
  totalCostPerInmate,
  numberOfFacilities,
  stateWideCapacity,
}) {
  const totalPopulation = newOffensePopulation + newRevocations;

  const facilitiesDiffRatio = (1 - totalPopulation / stateWideCapacity) * numberOfFacilities;

  const facilitiesDiff = Math.floor(facilitiesDiffRatio);
  const restPopulation = facilitiesDiffRatio % 1;

  const graduatedSavings =
    facilitiesDiff * (stateWideCapacity / numberOfFacilities) * totalCostPerInmate;

  const marginalSavings =
    restPopulation * (stateWideCapacity / numberOfFacilities) * marginalCostPerInmate;

  return (graduatedSavings + marginalSavings) / MONTHS_IN_YEAR;
}

export default calcSavings;
