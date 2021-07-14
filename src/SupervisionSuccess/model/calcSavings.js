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
 * @param {number} baseValue - base value from which savings are calculated
 * @param {number} marginalCostPerInmate - the marginal cost per incarcerated person
 * @param {number} totalCostPerInmate - the total cost per incarcerated person
 * @param {number} numberOfFacilities - the number of facilities in the state
 * @param {number} stateWideCapacity - the total capacity of facilities across the state
 * @returns {number} - one month of savings
 */
function calcSavings({
  baseValue,
  marginalCostPerInmate,
  totalCostPerInmate,
  numberOfFacilities,
  stateWideCapacity,
}) {
  const populationDiff = stateWideCapacity - baseValue;
  const averageCapacity = stateWideCapacity / numberOfFacilities;
  const facilitiesDiff =
    Math.floor(Math.abs(populationDiff / averageCapacity)) *
    (baseValue > stateWideCapacity ? -1 : 1);
  const restPopulation = populationDiff % averageCapacity;

  const graduatedSavings = facilitiesDiff * averageCapacity * totalCostPerInmate;
  const marginalSavings = restPopulation * marginalCostPerInmate;

  return (graduatedSavings + marginalSavings) / MONTHS_IN_YEAR;
}

export default calcSavings;
