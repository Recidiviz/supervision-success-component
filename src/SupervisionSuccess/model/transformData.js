import calcRevocations from "./calcRevocations";
import calcSavings from "./calcSavings";
import prettifySavings from "./prettifySavings";

/**
 * Function that transforms params and app state to chartData and stats
 * @param {{
     newOffensePopulation: number
     revocationA: number
     revocationsTimescale: number
     savingsMap: {checkpoint: number savings: number}[]
     marginalCostPerInmate: number
   }} params - params taken from source file
 * @param {string} state - name of state e.g. Alabama, Texas, Missouri
 * @param {number} implementationPeriod
 * @param {number} projections
 * @param {number} changeInRevocations
 * @returns {{chartData: {month: number, totalPopulation: number, baseline: number}[], prisonPopulationDiff: number, savings: number}}
 */
function transformData(params, state, implementationPeriod, projections, changeInRevocations) {
  const {
    newOffensePopulation,
    revocationA,
    revocationsTimescale,
    savingsMap,
    marginalCostPerInmate,
  } = params;

  const months = projections * 12;

  const revocationsByMonth = Array.from({ length: months }).map((revocations, month) =>
    calcRevocations(
      month,
      implementationPeriod,
      revocationA,
      revocationsTimescale,
      changeInRevocations
    )
  );

  const baseline = revocationsByMonth[0] + newOffensePopulation;

  const totalSavings = Array.from({ length: months }).reduce(
    (acc, _, month) =>
      acc +
      calcSavings(
        revocationsByMonth[0],
        revocationsByMonth[month],
        savingsMap,
        marginalCostPerInmate
      ),
    0
  );

  const chartData = Array.from({ length: months }).map((item, month) => ({
    month,
    baseline,
    totalPopulation: newOffensePopulation + revocationsByMonth[month],
  }));

  return {
    chartData,
    savings: prettifySavings(totalSavings),
    prisonPopulationDiff: Math.round(chartData[chartData.length - 1].totalPopulation - baseline),
  };
}

export default transformData;
