import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import SupervisionSuccessComponent from "./components/SupervisionSuccess";
import produceProjections from "./model/produceProjections";

const SupervisionSuccess = ({ params, title, description, methodology }) => {
  const states = Object.keys(params);
  const [state, setState] = useState(states[0]);
  const [implementationPeriod, setImplementationPeriod] = useState(6);
  const [projections, setProjections] = useState(5);
  const [changeInRevocations, setChangeInRevocations] = useState(-50);
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
  }, [params, state, implementationPeriod, projections, changeInRevocations]);

  return (
    <SupervisionSuccessComponent
      title={title}
      description={description}
      methodology={methodology}
      states={states}
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

SupervisionSuccess.defaultProps = {
  title: "Supervision Success",
  methodology: `Savings per day is calculated as a graduated function of the population differential. 
  If the population differential surpasses any of several thresholds for closing facilities,
  the total operating budget of thos facilities is saved. For remaining population differentials-namely
  those between thresholds-a marginal daily cost per inmate is used.`,
};

SupervisionSuccess.propTypes = {
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
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  methodology: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  title: PropTypes.string,
};

export default SupervisionSuccess;
