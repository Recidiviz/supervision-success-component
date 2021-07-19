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
import calcBaselines from "./calcBaselines";
import calculateNewAdmissionsProjection from "./calculateNewAdmissionsProjection";
import calcRevocations from "./calcRevocations";
import calcSavings from "./calcSavings";
import { MAX_CHANGE, MIN_CHANGE } from "../constants";

/* Number of months to add to the end of chart (chart need to be continued and overflow block),
This months should not participate in savings and prisonPopulationDiff calculations
*/
const ADDED_MONTHS = 5;

/* Number of months to add to the beginning of chart (because of the constant first year of the projection) */
const BASE_YEAR = 12;

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
 * @param {number} changeInNewAdmissions
 * @returns {{
 *   chartData: {month: number, totalPopulation: number, baseline: number}[],
 *   prisonPopulationDiff: number,
 *   savings: number,
 *   finalRevocations: number,
 * }}
 */
function produceProjections(
  params,
  implementationPeriod,
  projections,
  changeInRevocations,
  changeInNewAdmissions
) {
  const {
    newOffenseA,
    revocationA,
    NAlpha0,
    RAlpha0,
    newOffenseAvgTimeServedInMonths,
    revocationsTimescale,
    totalCostPerInmate,
    numberOfFacilities,
    stateWideCapacity,
    marginalCostPerInmate,
  } = params;

  const months = BASE_YEAR + projections * 12 + 1;
  const actualImplementationPeriod = BASE_YEAR + implementationPeriod;

  const calculateRevocationsByMonth = (length, revocationChange) => {
    return Array.from({
      length: length + ADDED_MONTHS,
    }).map((revocations, month) =>
      calcRevocations(
        month,
        actualImplementationPeriod,
        revocationA,
        RAlpha0,
        revocationsTimescale,
        revocationChange
      )
    );
  };

  const revocationsByMonth = calculateRevocationsByMonth(months, changeInRevocations);
  const maxRevocationsByMonth = calculateRevocationsByMonth(months, MAX_CHANGE);
  const minRevocationsByMonth = calculateRevocationsByMonth(months, MIN_CHANGE);

  const calculateNewAdmissionsByMonth = (length, newAdmissionsChange) => {
    return Array.from({
      length: length + ADDED_MONTHS,
    }).map((newOffense, month) =>
      calculateNewAdmissionsProjection(
        month,
        actualImplementationPeriod,
        newOffenseA,
        newOffenseAvgTimeServedInMonths,
        NAlpha0,
        newAdmissionsChange
      )
    );
  };

  const newAdmissionsByMonth = calculateNewAdmissionsByMonth(months, changeInNewAdmissions);
  const maxNewAdmissionsByMonth = calculateNewAdmissionsByMonth(months, MAX_CHANGE);
  const minNewAdmissionsByMonth = calculateNewAdmissionsByMonth(months, MIN_CHANGE);

  const baselineByMonth = Array.from({
    length: months + ADDED_MONTHS,
  }).map((baseline, month) =>
    calcBaselines(
      month,
      actualImplementationPeriod,
      revocationA,
      RAlpha0,
      revocationsTimescale,
      newOffenseA,
      newOffenseAvgTimeServedInMonths,
      NAlpha0,
      revocationsByMonth[month],
      newAdmissionsByMonth[month]
    )
  );

  const totalSavingsPolicy = Array.from({ length: months }).reduce(
    (acc, _, month) =>
      acc +
      calcSavings({
        baseValue: revocationsByMonth[month] + newAdmissionsByMonth[month],
        marginalCostPerInmate,
        totalCostPerInmate,
        numberOfFacilities,
        stateWideCapacity,
      }),
    0
  );

  const totalSavingsBaseline = Array.from({ length: months }).reduce(
    (acc, _, month) =>
      acc +
      calcSavings({
        baseValue: baselineByMonth[month],
        marginalCostPerInmate,
        totalCostPerInmate,
        numberOfFacilities,
        stateWideCapacity,
      }),
    0
  );

  const totalSavings = totalSavingsPolicy - totalSavingsBaseline;

  const maxChange =
    Math.max.apply(null, maxRevocationsByMonth) + Math.max.apply(null, maxNewAdmissionsByMonth);
  const minChange =
    Math.min.apply(null, minRevocationsByMonth) + Math.min.apply(null, minNewAdmissionsByMonth);

  const chartData = Array.from({ length: months + ADDED_MONTHS }).map((item, month) => ({
    month,
    baseline: baselineByMonth[month],
    totalPopulation: newAdmissionsByMonth[month] + revocationsByMonth[month],
    max: maxChange > minChange ? maxChange : minChange,
    min: minChange < maxChange ? minChange : maxChange,
  }));

  return {
    chartData,
    savings: Number(totalSavings.toFixed(6)),
    prisonPopulationDiff:
      Math.round(chartData[months - 1].totalPopulation) - chartData[months - 1].baseline,
    finalRevocations: Math.round(revocationsByMonth[months - 1]),
    finalAdmissions: Math.round(newAdmissionsByMonth[months - 1]),
  };
}

export default produceProjections;
