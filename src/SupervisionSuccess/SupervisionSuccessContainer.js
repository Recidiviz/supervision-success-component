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
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import SupervisionSuccessComponent from "./components/SupervisionSuccess";
import produceProjections from "./model/produceProjections";

const SupervisionSuccessContainer = ({ params, isError }) => {
  const states = Object.keys(params);
  const [year, setYear] = useState(0);
  const [state, setState] = useState(isError ? "" : states[0]);
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
