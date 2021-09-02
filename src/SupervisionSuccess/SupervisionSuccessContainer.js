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
import calcOutcomesProportions from "./model/calcOutcomesProportions";
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
  const [isNotAvailable2020, setIsNotAvailable2020] = useState(false);
  const [implementationPeriod, setImplementationPeriod] = useState(
    initialState.implementationPeriod
  );
  const [projections, setProjections] = useState(initialState.projections);
  const [changeInRevocations, setChangeInRevocations] = useState(initialState.changeInRevocations);
  const [changeInNewAdmissions, setChangeInNewAdmissions] = useState(
    initialState.changeInNewAdmissions
  );
  const [finalRevocations, setFinalRevocations] = useState(0);
  const [finalAdmissions, setFinalAdmissions] = useState(0);
  const [prisonPopulationDiff, setPrisonPopulationDiff] = useState(0);
  const [revocationsProportion, setRevocationsProportion] = useState(0);
  const [admissionsProportion, setAdmissionsProportion] = useState(0);
  const [savings, setSavings] = useState(0);
  const [chartData, setChartData] = useState([]);

  const onReset = useCallback(() => {
    setChangeInNewAdmissions(DEFAULT_STATE.changeInNewAdmissions);
    setChangeInRevocations(DEFAULT_STATE.changeInRevocations);
  }, []);
  const onMaintain2020Levels = useCallback(() => {
    setChangeInRevocations(-21);
    setChangeInNewAdmissions(-14);
  }, []);
  const onStateChange = useCallback(
    (newState) => {
      setState(newState);
      onReset();
    },
    [onReset]
  );
  const onImplementationPeriodChange = useCallback((newImplPeriod) => {
    setImplementationPeriod(newImplPeriod);
  }, []);
  const onProjectionsChange = useCallback((newProjections) => {
    setProjections(newProjections);
  }, []);
  const onChangeInRevocationsChange = useCallback((newChangeInRevocations) => {
    setChangeInRevocations(newChangeInRevocations);
  }, []);
  const onChangeInNewAdmissionsChange = useCallback((newChangeInNewAdmissions) => {
    setChangeInNewAdmissions(newChangeInNewAdmissions);
  }, []);

  useEffect(() => {
    const valuesToPersist = JSON.stringify({
      implementationPeriod,
      projections,
      changeInRevocations,
      changeInNewAdmissions,
      state,
    });

    window.localStorage.setItem(LS_PERSIST_KEY, valuesToPersist);
  }, [state, implementationPeriod, projections, changeInRevocations, changeInNewAdmissions]);

  useEffect(() => {
    if (isError) return;
    const data = produceProjections(
      params[state],
      implementationPeriod,
      projections,
      changeInRevocations,
      changeInNewAdmissions
    );

    const baseData = produceProjections(params[state], implementationPeriod, projections, 0, 0);

    const proportions = calcOutcomesProportions(
      finalRevocations,
      finalAdmissions,
      changeInRevocations,
      changeInNewAdmissions,
      prisonPopulationDiff,
      baseData.finalRevocations,
      baseData.finalAdmissions
    );
    setChartData(data.chartData);
    setSavings(data.savings);
    setPrisonPopulationDiff(data.prisonPopulationDiff);
    setFinalRevocations(data.finalRevocations);
    setFinalAdmissions(data.finalAdmissions);
    setRevocationsProportion(proportions.revocationsProportion);
    setAdmissionsProportion(proportions.admissionsProportion);
    setYear(params[state].year);
    setIsNotAvailable2020(params[state].isNotAvailable2020);
  }, [
    isError,
    params,
    state,
    implementationPeriod,
    projections,
    changeInRevocations,
    changeInNewAdmissions,
    finalAdmissions,
    finalRevocations,
    prisonPopulationDiff,
  ]);

  return (
    <SupervisionSuccessComponent
      isError={isError}
      isNotAvailable2020={isNotAvailable2020}
      states={states}
      year={year}
      state={state}
      implementationPeriod={implementationPeriod}
      projections={projections}
      changeInRevocations={changeInRevocations}
      changeInNewAdmissions={changeInNewAdmissions}
      finalRevocations={finalRevocations}
      finalAdmissions={finalAdmissions}
      revocationsProportion={revocationsProportion}
      admissionsProportion={admissionsProportion}
      prisonPopulationDiff={prisonPopulationDiff}
      savings={savings}
      onReset={onReset}
      onMaintain2020Levels={onMaintain2020Levels}
      onStateChange={onStateChange}
      onImplementationPeriodChange={onImplementationPeriodChange}
      onProjectionsChange={onProjectionsChange}
      onChangeInRevocationsChange={onChangeInRevocationsChange}
      onChangeInNewAdmissionsChange={onChangeInNewAdmissionsChange}
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
      isNotAvailable2020: PropTypes.bool.isRequired,
    })
  ).isRequired,
  isError: PropTypes.bool,
};

export default SupervisionSuccessContainer;
