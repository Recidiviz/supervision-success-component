import React from "react";
import PropTypes from "prop-types";

import StatePicker from "../StatePicker";
import ImplementationPeriodPicker from "../ImplementationPeriodPicker";
import ProjectionsPicker from "../ProjectionsPicker";
import ChangeInRevocations from "../ChangeInRevocations";
import Chart from "../Chart";
import Outcomes from "../Outcomes";

import "./SupervisionSuccess.scss";

const SupervisionSuccessComponent = ({
  states,
  year,
  state,
  implementationPeriod,
  projections,
  changeInRevocations,
  finalRevocations,
  prisonPopulationDiff,
  savings,
  onStateChange,
  onImplementationPeriodChange,
  onProjectionsChange,
  onChangeInRevocationsChange,
  chartData,
}) => (
  <section className="main">
    <header className="main_header">
      <StatePicker states={states} year={year} state={state} onStateChange={onStateChange} />
      <ImplementationPeriodPicker
        implementationPeriod={implementationPeriod}
        onImplementationPeriodChange={onImplementationPeriodChange}
      />
      <ProjectionsPicker projections={projections} onProjectionsChange={onProjectionsChange} />
    </header>
    <aside className="main_left-aside">
      <ChangeInRevocations
        state={state}
        finalRevocations={finalRevocations}
        changeInRevocations={changeInRevocations}
        onChangeInRevocationsChange={onChangeInRevocationsChange}
      />
    </aside>
    <section>
      <Chart data={chartData} />
    </section>
    <aside className="main_right-aside">
      <Outcomes prisonPopulationDiff={prisonPopulationDiff} savings={savings} />
    </aside>
  </section>
);

SupervisionSuccessComponent.propTypes = {
  states: PropTypes.arrayOf(PropTypes.string).isRequired,
  year: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
  implementationPeriod: PropTypes.number.isRequired,
  projections: PropTypes.number.isRequired,
  changeInRevocations: PropTypes.number.isRequired,
  finalRevocations: PropTypes.number.isRequired,
  prisonPopulationDiff: PropTypes.number.isRequired,
  savings: PropTypes.number.isRequired,
  onStateChange: PropTypes.func.isRequired,
  onImplementationPeriodChange: PropTypes.func.isRequired,
  onProjectionsChange: PropTypes.func.isRequired,
  onChangeInRevocationsChange: PropTypes.func.isRequired,
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.number,
      baseline: PropTypes.number,
      totalPopulation: PropTypes.number,
    })
  ).isRequired,
};

export default SupervisionSuccessComponent;
