import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";

import SupervisionSuccessComponent from "./components/SupervisionSuccess";

const SupervisionSuccess = () => {
  const [state, setState] = useState("MO");
  const [implementationPeriod, setImplementationPeriod] = useState(6);
  const [projections, setProjections] = useState(5);
  const [changeInRevocations, setChangeInRevocations] = useState(-50);
  const [prisonPopulationDiff] = useState(-400);
  const [savings] = useState(32);

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

  return (
    <SupervisionSuccessComponent
      state={state}
      implementationPeriod={implementationPeriod}
      projections={projections}
      changeInRevocations={changeInRevocations}
      prisonPopulationDiff={prisonPopulationDiff}
      savings={savings}
      onStateChange={onStateChange}
      onImplementationPeriodChange={onImplementationPeriodChange}
      onProjectionsChange={onProjectionsChange}
      onChangeInRevocationsChange={onChangeInRevocationsChange}
      chartData={[
        {
          month: 0,
          baseline: 33600,
          totalPopulation: 33600,
        },
        {
          month: 1,
          baseline: 33600,
          totalPopulation: 33596.77351,
        },
        {
          month: 2,
          baseline: 33600,
          totalPopulation: 33588.69062,
        },
        {
          month: 3,
          baseline: 33600,
          totalPopulation: 33577.48888,
        },
        {
          month: 4,
          baseline: 33600,
          totalPopulation: 33564.28417,
        },
        {
          month: 5,
          baseline: 33600,
          totalPopulation: 33549.79311,
        },
        {
          month: 6,
          baseline: 33600,
          totalPopulation: 33534.47595,
        },
      ]}
    />
  );
};

SupervisionSuccess.propTypes = {
  params: PropTypes.shape({}).isRequired,
};

export default SupervisionSuccess;
