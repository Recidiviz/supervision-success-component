import calcRevocations from "./calcRevocations";
import calcSavings from "./calcSavings";

/* Number of months to add to the end of chart (chart need to be continued and overflow block),
This months should not participate in savings and prisonPopulationDiff calculations
*/
const ADDED_MONTHS = 5;

/**
 * Function that transforms params and app state to chartData and stats
 * @param {{
     newOffensePopulation: number
     revocationA: number
     revocationsTimescale: number
     savingsMap: {checkpoint: number savings: number}[]
     marginalCostPerInmate: number
   }} params - params for chosen state taken from source file
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
    savingsMap,
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
      calcSavings(
        revocationsByMonth[0],
        revocationsByMonth[month],
        savingsMap,
        marginalCostPerInmate
      ),
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
