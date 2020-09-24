import React from "react";
import PropTypes from "prop-types";

import prettifySavings from "../../utils/prettifySavings";

import "./Outcomes.scss";

const Outcomes = ({ prisonPopulationDiff, savings }) => {
  const [prisonPopulationDiffText, prisonPopulationDiffIconClass] = (() => {
    if (prisonPopulationDiff < 0) return ["Fewer people in prison", "outcomes_stat-icon-down"];
    if (prisonPopulationDiff > 0) return ["More people in prison", "outcomes_stat-icon-up"];
    return ["No change in population", ""];
  })();

  const [savingsText, savingsIconClass] = (() => {
    if (savings > 0) return ["Reduced costs", "outcomes_stat-icon-down"];
    if (savings < 0) return ["Increased costs", "outcomes_stat-icon-up"];
    return ["No change in cost", ""];
  })();

  return (
    <div className="outcomes">
      <div className="outcomes_heading">Outcomes</div>
      <div className="outcomes_stats">
        <div className="outcomes_stat">
          <div className={`outcomes_stat-value ${prisonPopulationDiffIconClass}`}>
            {Math.abs(prisonPopulationDiff)}
          </div>
          <div className="outcomes_stat-key">{prisonPopulationDiffText}</div>
        </div>
        <div className="outcomes_stat">
          <div className={`outcomes_stat-value ${savingsIconClass}`}>
            {prettifySavings(savings)}
          </div>
          <div className="outcomes_stat-key">{savingsText}</div>
        </div>
      </div>
    </div>
  );
};

Outcomes.propTypes = {
  prisonPopulationDiff: PropTypes.number.isRequired,
  savings: PropTypes.number.isRequired,
};

export default Outcomes;
