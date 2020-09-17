function calcSavings(initialRevocations, newRevocations, savingsMap, marginalCostPerInmate) {
  const revocationsDiff = initialRevocations - newRevocations;

  const reachedCheckPoint = savingsMap.find(({ checkpoint }) => revocationsDiff > checkpoint) || {
    checkpoint: 0,
    savings: 0,
  };
  const graduatedSavings = reachedCheckPoint.savings;
  const marginalSavings = (revocationsDiff - reachedCheckPoint.checkpoint) * marginalCostPerInmate;

  return (graduatedSavings + marginalSavings) / 12;
}

export default calcSavings;
