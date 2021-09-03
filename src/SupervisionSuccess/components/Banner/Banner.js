// Recidiviz - a data platform for criminal justice reform
// Copyright (C) 2021 Recidiviz, Inc.
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
import { CHANGE_IN_NEW_ADMISSIONS_2020, CHANGE_IN_REVOCATIONS_2020 } from "../../constants";

import "./Banner.scss";

const Banner = ({
  isNotAvailable2020,
  year,
  changeInRevocations,
  changeInNewAdmissions,
  onReset,
  onMaintain2020Levels,
}) => {
  return (
    <div className="banner">
      {isNotAvailable2020 ? (
        <>
          This model estimates the change in prison population if supervision revocations and new
          admissions return to {year} levels. Use the sliders to see the effect of changing the
          parole and probation revocations or new admissions levels moving forward.
        </>
      ) : (
        <>
          This model estimates the change in prison population over time if supervision revocations
          and new admissions return to {year} levels. To estimate the outcome of maintaining 2020
          levels, set revocations to -21% and new admissions to -14%.
        </>
      )}
      <div>
        <button
          className="banner-button"
          type="button"
          disabled={changeInRevocations === 0 && changeInNewAdmissions === 0}
          onClick={onReset}
        >
          Reset
        </button>
        {!isNotAvailable2020 && (
          <button
            className="banner-button"
            type="button"
            disabled={
              changeInRevocations === CHANGE_IN_REVOCATIONS_2020 &&
              changeInNewAdmissions === CHANGE_IN_NEW_ADMISSIONS_2020
            }
            onClick={onMaintain2020Levels}
          >
            Maintain 2020 levels
          </button>
        )}
      </div>
    </div>
  );
};

Banner.propTypes = {
  isNotAvailable2020: PropTypes.bool.isRequired,
  year: PropTypes.number.isRequired,
  changeInRevocations: PropTypes.number.isRequired,
  changeInNewAdmissions: PropTypes.number.isRequired,
  onReset: PropTypes.func.isRequired,
  onMaintain2020Levels: PropTypes.func.isRequired,
};

export default Banner;
