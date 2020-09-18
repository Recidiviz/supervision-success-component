import React from "react";
import PropTypes from "prop-types";

import StatePicker from "../StatePicker";
import ImplementationPeriodPicker from "../ImplementationPeriodPicker";
import ProjectionsPicker from "../ProjectionsPicker";
import ChangeInRevocations from "../ChangeInRevocations";
import Chart from "../Chart/Chart";
import Outcomes from "../Outcomes";

import "./SupervisionSuccess.css";

const SupervisionSuccessComponent = ({
  states,
  state,
  implementationPeriod,
  projections,
  changeInRevocations,
  finalPopulation,
  prisonPopulationDiff,
  savings,
  onStateChange,
  onImplementationPeriodChange,
  onProjectionsChange,
  onChangeInRevocationsChange,
  chartData,
}) => (
  <section className="main-container">
    <header className="main-header">
      <StatePicker states={states} state={state} onStateChange={onStateChange} />
      <ImplementationPeriodPicker
        implementationPeriod={implementationPeriod}
        onImplementationPeriodChange={onImplementationPeriodChange}
      />
      <ProjectionsPicker projections={projections} onProjectionsChange={onProjectionsChange} />
    </header>
    <aside className="main-left-aside">
      <ChangeInRevocations
        state={state}
        finalPopulation={finalPopulation}
        changeInRevocations={changeInRevocations}
        onChangeInRevocationsChange={onChangeInRevocationsChange}
      />
    </aside>
    <section>
      <Chart data={chartData} />
    </section>
    <aside className="main-right-aside">
      <Outcomes prisonPopulationDiff={prisonPopulationDiff} savings={savings} />
    </aside>
  </section>
);

SupervisionSuccessComponent.propTypes = {
  states: PropTypes.arrayOf(PropTypes.string).isRequired,
  state: PropTypes.string.isRequired,
  implementationPeriod: PropTypes.number.isRequired,
  projections: PropTypes.number.isRequired,
  changeInRevocations: PropTypes.number.isRequired,
  finalPopulation: PropTypes.number.isRequired,
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
