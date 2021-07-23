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
import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import ReactSlider from "react-slider";
import { MAX_CHANGE, MIN_CHANGE } from "../../constants";
import formatNumber from "../../utils/formatNumber";

import "./Slider.scss";

const Slider = ({ title, hint, isError, finalValue, changeValue, onChangeValueChange }) => {
  const [valueNow, setValueNow] = useState(changeValue);
  const thumbContent = useMemo(
    () => (
      <>
        <span className="slider_percent">{valueNow}%</span>
        <span className="slider_hint">
          <b className="slider_hint-count">{isError ? "-" : formatNumber(finalValue)}</b> {hint}
        </span>
      </>
    ),
    [valueNow, isError, finalValue, hint]
  );
  const renderThumb = (props) => (
    <span {...props} aria-label="Slider thumb" className="slider_thumb" />
  );

  return (
    <div className="slider">
      <span className="slider_title">{title}</span>
      <div className="slider_info">{thumbContent}</div>
      <div className="slider_wrapper">
        <span className="slider_label">+{MAX_CHANGE}%</span>
        <ReactSlider
          orientation="horizontal"
          min={MIN_CHANGE}
          max={MAX_CHANGE}
          defaultValue={changeValue}
          className="slider_track"
          renderThumb={renderThumb}
          onChange={setValueNow}
          onAfterChange={onChangeValueChange}
        />
        <span className="slider_label">{MIN_CHANGE}%</span>
      </div>
    </div>
  );
};

Slider.defaultProps = {
  isError: false,
};

Slider.propTypes = {
  title: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
  onChangeValueChange: PropTypes.func.isRequired,
  changeValue: PropTypes.number.isRequired,
  finalValue: PropTypes.number.isRequired,
  isError: PropTypes.bool,
};

export default Slider;
