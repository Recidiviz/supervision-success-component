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

import prettifySavings from "../../utils/prettifySavings";

import "./Outcomes.scss";

const Outcomes = ({
  isError,
  revocationsProportion,
  admissionsProportion,
  prisonPopulationDiff,
  savings,
  year,
}) => {
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
      <div className="outcomes_heading">
        Outcomes
        <p>From {year} baseline</p>
      </div>
      <div className="outcomes_stats">
        <div className="outcomes_stat">
          <div className={`outcomes_stat-value ${prisonPopulationDiffIconClass}`}>
            {isError ? "-" : Math.abs(prisonPopulationDiff)}
          </div>
          <div className="outcomes_stat-key">{prisonPopulationDiffText}</div>
          {revocationsProportion && (
            <div className="outcomes_stat-proportion">Revocations: {revocationsProportion}%</div>
          )}
          {admissionsProportion && (
            <div className="outcomes_stat-proportion">New Admissions: {admissionsProportion}%</div>
          )}
        </div>
        <div className="outcomes_stat">
          <div className={`outcomes_stat-value ${savingsIconClass}`}>
            {isError ? "-" : prettifySavings(savings)}
          </div>
          <div className="outcomes_stat-key">{savingsText}</div>
          <div className="outcomes_stat-proportion">
            Revocations: {revocationsProportion || "-"}%
          </div>
          <div className="outcomes_stat-proportion">
            New Admissions: {admissionsProportion || "-"}%
          </div>
        </div>
      </div>
    </div>
  );
};

Outcomes.defaultProps = {
  isError: false,
  revocationsProportion: null,
  admissionsProportion: null,
};

Outcomes.propTypes = {
  revocationsProportion: PropTypes.number,
  admissionsProportion: PropTypes.number,
  prisonPopulationDiff: PropTypes.number.isRequired,
  savings: PropTypes.number.isRequired,
  isError: PropTypes.bool,
  year: PropTypes.number.isRequired,
};

export default Outcomes;
