import React from "react";
import PropTypes from "prop-types";

import StatePicker from "../StatePicker";
import ImplementationPeriodPicker from "../ImplementationPeriodPicker";
import ProjectionsPicker from "../ProjectionsPicker";
import ChangeInRevocations from "../ChangeInRevocations/ChangeInRevocations";
import Graph from "../Graph";
import Outcomes from "../Outcomes";

import "./SupervisionSuccess.css";

const SupervisionSuccessComponent = ({
  state,
  implementationPeriod,
  projections,
  changeInRevocations,
  prisonPopulationDiff,
  savings,
  onStateChange,
  onImplementationPeriodChange,
  onProjectionsChange,
  onChangeInRevocationsChange,
}) => (
  <section className="main-container">
    <header className="main-header">
      <StatePicker state={state} onStateChange={onStateChange} />
      <ImplementationPeriodPicker
        implementationPeriod={implementationPeriod}
        onImplementationPeriodChange={onImplementationPeriodChange}
      />
      <ProjectionsPicker projections={projections} onProjectionsChange={onProjectionsChange} />
    </header>
    <aside className="main-left-aside">
      <ChangeInRevocations
        changeInRevocations={changeInRevocations}
        onChangeInRevocationsChange={onChangeInRevocationsChange}
      />
    </aside>
    <section>
      <Graph />
    </section>
    <aside className="main-right-aside">
      <Outcomes prisonPopulationDiff={prisonPopulationDiff} savings={savings} />
    </aside>
  </section>
);

SupervisionSuccessComponent.propTypes = {
  state: PropTypes.string.isRequired,
  implementationPeriod: PropTypes.number.isRequired,
  projections: PropTypes.number.isRequired,
  changeInRevocations: PropTypes.number.isRequired,
  prisonPopulationDiff: PropTypes.number.isRequired,
  savings: PropTypes.number.isRequired,
  onStateChange: PropTypes.func.isRequired,
  onImplementationPeriodChange: PropTypes.func.isRequired,
  onProjectionsChange: PropTypes.func.isRequired,
  onChangeInRevocationsChange: PropTypes.func.isRequired,
};

export default SupervisionSuccessComponent;
