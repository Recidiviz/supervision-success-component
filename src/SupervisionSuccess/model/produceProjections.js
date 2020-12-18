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
import calcRevocations from "./calcRevocations";
import calcSavings from "./calcSavings";

/* Number of months to add to the end of chart (chart need to be continued and overflow block),
This months should not participate in savings and prisonPopulationDiff calculations
*/
const ADDED_MONTHS = 5;

/**
 * Function that transforms params and app state to ouput, i.e. chart data and
 * high-level statistics related to costs and prison population reduction.
 * @param {{
     newOffensePopulation: number
     revocationA: number
     revocationsTimescale: number
     numberOfFacilities: number
     stateWideCapacity: number
     marginalCostPerInmate: number
   }} params - params for chosen state taken from source file (`params.csv`)
 * @param {number} implementationPeriod
 * @param {number} projections
 * @param {number} changeInRevocations
 * @returns {{
 *   chartData: {month: number, totalPopulation: number, baseline: number}[],
 *   prisonPopulationDiff: number,
 *   savings: number,
 *   finalRevocations: number,
 * }}
 */
function produceProjections(params, implementationPeriod, projections, changeInRevocations) {
  const {
    newOffensePopulation,
    revocationA,
    revocationsTimescale,
    totalCostPerInmate,
    numberOfFacilities,
    stateWideCapacity,
    marginalCostPerInmate,
  } = params;

  const months = projections * 12 + 1;

  const revocationsByMonth = Array.from({
    length: months + ADDED_MONTHS,
  }).map((revocations, month) =>
    calcRevocations(
      month,
      implementationPeriod,
      revocationA,
      revocationsTimescale,
      changeInRevocations
    )
  );

  const baseline = Math.round(revocationsByMonth[0] + newOffensePopulation);

  const totalSavings = Array.from({ length: months }).reduce(
    (acc, _, month) =>
      acc +
      calcSavings({
        newRevocations: revocationsByMonth[month],
        marginalCostPerInmate,
        newOffensePopulation,
        totalCostPerInmate,
        numberOfFacilities,
        stateWideCapacity,
      }),
    0
  );

  const chartData = Array.from({ length: months + ADDED_MONTHS }).map((item, month) => ({
    month,
    baseline,
    totalPopulation: newOffensePopulation + revocationsByMonth[month],
  }));

  return {
    chartData,
    savings: Number(totalSavings.toFixed(6)),
    prisonPopulationDiff: Math.round(chartData[months - 1].totalPopulation) - baseline,
    finalRevocations: Math.round(revocationsByMonth[months - 1]),
  };
}

export default produceProjections;
