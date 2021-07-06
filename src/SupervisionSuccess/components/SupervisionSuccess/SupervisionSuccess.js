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
import React from "react";
import PropTypes from "prop-types";

import StatePicker from "../StatePicker";
import ImplementationPeriodPicker from "../ImplementationPeriodPicker";
import ProjectionsPicker from "../ProjectionsPicker";
import Slider from "../Slider";
import Chart from "../Chart";
import Outcomes from "../Outcomes";

import "./SupervisionSuccess.scss";

const SupervisionSuccessComponent = ({
  isError,
  states,
  year,
  state,
  implementationPeriod,
  projections,
  changeInRevocations,
  changeInNewAdmissions,
  finalRevocations,
  finalAdmissions,
  prisonPopulationDiff,
  savings,
  onStateChange,
  onImplementationPeriodChange,
  onProjectionsChange,
  onChangeInRevocationsChange,
  onChangeInNewAdmissionsChange,
  chartData,
}) => (
  <section className="main">
    <header className="main_header">
      <div className="main_header-state">
        <StatePicker
          isError={isError}
          year={year}
          states={states}
          state={state}
          onStateChange={onStateChange}
        />
      </div>
      <div className="main_header-implementation-period">
        <ImplementationPeriodPicker
          implementationPeriod={implementationPeriod}
          onImplementationPeriodChange={onImplementationPeriodChange}
        />
      </div>
      <div className="main_header_projections">
        <ProjectionsPicker projections={projections} onProjectionsChange={onProjectionsChange} />
      </div>
    </header>
    <section className="main_sliders">
      <Slider
        title="Change in revocations"
        hint={`Violations resulting in ${isError ? "-" : state} incarceration`}
        isError={isError}
        finalValue={finalRevocations}
        changeValue={changeInRevocations}
        onChangeValueChange={onChangeInRevocationsChange}
      />
      <span className="main_sliders--divider" />
      <Slider
        title="Change in new admissions"
        hint="New admissions to prison"
        isError={isError}
        finalValue={finalAdmissions}
        changeValue={changeInNewAdmissions}
        onChangeValueChange={onChangeInNewAdmissionsChange}
      />
    </section>
    <aside className="main_left-aside">
      <Outcomes isError={isError} prisonPopulationDiff={prisonPopulationDiff} savings={savings} />
    </aside>
    <section className="main_center">
      <Chart isError={isError} data={chartData} />
    </section>
  </section>
);

SupervisionSuccessComponent.defaultProps = {
  isError: false,
};

SupervisionSuccessComponent.propTypes = {
  isError: PropTypes.bool,
  states: PropTypes.arrayOf(PropTypes.string).isRequired,
  year: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
  implementationPeriod: PropTypes.number.isRequired,
  projections: PropTypes.number.isRequired,
  changeInRevocations: PropTypes.number.isRequired,
  changeInNewAdmissions: PropTypes.number.isRequired,
  finalRevocations: PropTypes.number.isRequired,
  finalAdmissions: PropTypes.number.isRequired,
  prisonPopulationDiff: PropTypes.number.isRequired,
  savings: PropTypes.number.isRequired,
  onStateChange: PropTypes.func.isRequired,
  onImplementationPeriodChange: PropTypes.func.isRequired,
  onProjectionsChange: PropTypes.func.isRequired,
  onChangeInRevocationsChange: PropTypes.func.isRequired,
  onChangeInNewAdmissionsChange: PropTypes.func.isRequired,
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.number,
      baseline: PropTypes.number,
      totalPopulation: PropTypes.number,
    })
  ).isRequired,
};

export default SupervisionSuccessComponent;
