import React, { useCallback } from "react";
import PropTypes from "prop-types";
import ReactSlider from "react-slider";
import debounce from "debounce";

import "./ChangeInRevocations.css";

const ChangeInRevocations = ({ changeInRevocations, onChangeInRevocationsChange }) => {
  const renderThumb = useCallback(
    (props, state) => (
      <span {...props} className="revocations-slider_thumb">
        <span className="revocations-slider_percent">{state.valueNow}%</span>
        <span className="revocations-slider_hint">
          <b className="revocations-slider_hint-count">6324</b> Violations resulting in State
          incarceration
        </span>
      </span>
    ),
    []
  );

  return (
    <div className="revocations-slider">
      <span className="revocations-slider_title">Change in revocations</span>
      <div className="revocations-slider_wrapper">
        <span className="revocations-slider_label">+100%</span>
        <ReactSlider
          orientation="vertical"
          min={-100}
          max={100}
          invert
          defaultValue={changeInRevocations}
          className="revocations-slider_track"
          renderThumb={renderThumb}
          onChange={debounce(onChangeInRevocationsChange, 200)}
        />
        <span className="revocations-slider_label">-100%</span>
      </div>
    </div>
  );
};

ChangeInRevocations.propTypes = {
  onChangeInRevocationsChange: PropTypes.func.isRequired,
  changeInRevocations: PropTypes.number.isRequired,
};

export default ChangeInRevocations;
