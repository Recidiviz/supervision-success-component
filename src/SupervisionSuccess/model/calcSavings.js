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
