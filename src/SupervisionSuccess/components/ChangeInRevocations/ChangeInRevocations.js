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
import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import ReactSlider from "react-slider";
import useIsMobile from "../../utils/useIsMobile";

import "./ChangeInRevocations.scss";

const ChangeInRevocations = ({
  isError,
  state,
  finalRevocations,
  changeInRevocations,
  onChangeInRevocationsChange,
}) => {
  const [valueNow, setValueNow] = useState(changeInRevocations);
  const isMobile = useIsMobile();
  const thumbContent = useMemo(
    () => (
      <>
        <span className="revocations-slider_percent">{valueNow}%</span>
        <span className="revocations-slider_hint">
          <b className="revocations-slider_hint-count">{isError ? "-" : finalRevocations}</b>{" "}
          Violations resulting in {isError ? "-" : state} incarceration
        </span>
      </>
    ),
    [valueNow, isError, finalRevocations, state]
  );
  const renderThumb = useCallback(
    (props) => (
      <span {...props} className="revocations-slider_thumb">
        {!isMobile && thumbContent}
      </span>
    ),
    [isMobile, thumbContent]
  );

  return (
    <div className="revocations-slider">
      <span className="revocations-slider_title">Change in revocations</span>
      <div className="revocations-slider_wrapper">
        <span className="revocations-slider_label">+100%</span>
        <ReactSlider
          orientation={isMobile ? "horizontal" : "vertical"}
          min={-100}
          max={100}
          invert={!isMobile}
          defaultValue={changeInRevocations}
          className="revocations-slider_track"
          renderThumb={renderThumb}
          onChange={setValueNow}
          onAfterChange={onChangeInRevocationsChange}
        />
        <span className="revocations-slider_label">-100%</span>
      </div>
      {isMobile && <div className="revocations-slider_footer">{thumbContent}</div>}
    </div>
  );
};

ChangeInRevocations.defaultProps = {
  isError: false,
};

ChangeInRevocations.propTypes = {
  onChangeInRevocationsChange: PropTypes.func.isRequired,
  changeInRevocations: PropTypes.number.isRequired,
  finalRevocations: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
  isError: PropTypes.bool,
};

export default ChangeInRevocations;
