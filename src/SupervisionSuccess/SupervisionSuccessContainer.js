import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import SupervisionSuccessComponent from "./components/SupervisionSuccess";
import produceProjections from "./model/produceProjections";
import { DEFAULT_STATE, LS_PERSIST_KEY } from "./constants";

const SupervisionSuccessContainer = ({ params, isError }) => {
  const states = Object.keys(params);
  const persistedValues = JSON.parse(window.localStorage.getItem(LS_PERSIST_KEY)) || {};
  const initialState = {
    ...DEFAULT_STATE,
    ...persistedValues,
    state: states.includes(persistedValues.state) ? persistedValues.state : states[0],
  };
  const [year, setYear] = useState(0);
  const [state, setState] = useState(isError ? "" : initialState.state);
  const [implementationPeriod, setImplementationPeriod] = useState(
    initialState.implementationPeriod
  );
  const [projections, setProjections] = useState(initialState.projections);
  const [changeInRevocations, setChangeInRevocations] = useState(initialState.changeInRevocations);
  const [finalRevocations, setFinalRevocations] = useState(0);
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
    const valuesToPersist = JSON.stringify({
      implementationPeriod,
      projections,
      changeInRevocations,
      state,
    });

    window.localStorage.setItem(LS_PERSIST_KEY, valuesToPersist);
  }, [state, implementationPeriod, projections, changeInRevocations]);

  useEffect(() => {
    if (isError) return;
    const data = produceProjections(
      params[state],
      implementationPeriod,
      projections,
      changeInRevocations
    );
    setChartData(data.chartData);
    setSavings(data.savings);
    setPrisonPopulationDiff(data.prisonPopulationDiff);
    setFinalRevocations(data.finalRevocations);
    setYear(params[state].year);
  }, [isError, params, state, implementationPeriod, projections, changeInRevocations]);

  return (
    <SupervisionSuccessComponent
      isError={isError}
      states={states}
      year={year}
      state={state}
      implementationPeriod={implementationPeriod}
      projections={projections}
      changeInRevocations={changeInRevocations}
      finalRevocations={finalRevocations}
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

SupervisionSuccessContainer.defaultProps = {
  isError: false,
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
      year: PropTypes.number.isRequired,
    })
  ).isRequired,
  isError: PropTypes.bool,
};

export default SupervisionSuccessContainer;
