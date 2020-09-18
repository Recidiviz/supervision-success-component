import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import SupervisionSuccessComponent from "./components/SupervisionSuccess";
import produceProjections from "./model/produceProjections";

const SupervisionSuccessContainer = ({ params }) => {
  const states = Object.keys(params);
  const [state, setState] = useState(states[0]);
  const [implementationPeriod, setImplementationPeriod] = useState(6);
  const [projections, setProjections] = useState(5);
  const [changeInRevocations, setChangeInRevocations] = useState(-50);
  const [finalPopulation, setFinalPopulation] = useState(0);
  const [prisonPopulationDiff, setPrisonPopulationDiff] = useState(0);
  const [savings, setSavings] = useState(0);
  const [chartData, setChartData] = useState([]);

  const onStateChange = useCallback((newState) => {
    setState(newState);
  }, []);
  const onImplementationPeriodChange = useCallback((newImplPeriod) => {
    setImplementationPeriod(newImplPeriod);
  }, []);
  const onProjectionsChange = useCallback((newProjections) => {
    setProjections(newProjections);
  }, []);
  const onChangeInRevocationsChange = useCallback((newChangeInRevocations) => {
    setChangeInRevocations(newChangeInRevocations);
  }, []);

  useEffect(() => {
    const data = produceProjections(
      params[state],
      implementationPeriod,
      projections,
      changeInRevocations
    );
    setChartData(data.chartData);
    setSavings(data.savings);
    setPrisonPopulationDiff(data.prisonPopulationDiff);
    setFinalPopulation(data.finalPopulation);
  }, [params, state, implementationPeriod, projections, changeInRevocations]);

  return (
    <SupervisionSuccessComponent
      states={states}
      state={state}
      implementationPeriod={implementationPeriod}
      projections={projections}
      changeInRevocations={changeInRevocations}
      finalPopulation={finalPopulation}
      prisonPopulationDiff={prisonPopulationDiff}
      savings={savings}
      onStateChange={onStateChange}
      onImplementationPeriodChange={onImplementationPeriodChange}
      onProjectionsChange={onProjectionsChange}
      onChangeInRevocationsChange={onChangeInRevocationsChange}
      chartData={chartData}
    />
  );
};

SupervisionSuccessContainer.propTypes = {
  params: PropTypes.objectOf(
    PropTypes.shape({
      newOffensePopulation: PropTypes.number.isRequired,
      revocationA: PropTypes.number.isRequired,
      revocationsTimescale: PropTypes.number.isRequired,
      savingsMap: PropTypes.arrayOf(
        PropTypes.shape({
          checkpoint: PropTypes.number,
          savings: PropTypes.number,
        })
      ),
      marginalCostPerInmate: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SupervisionSuccessContainer;
