import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import ReactSlider from "react-slider";
import useIsMobile from "../../utils/useIsMobile";

import "./ChangeInRevocations.scss";

const ChangeInRevocations = ({
  state,
  finalRevocations,
  changeInRevocations,
  onChangeInRevocationsChange,
}) => {
  const [valueNow, setValueNow] = useState(changeInRevocations);
  const isMobile = useIsMobile();
  const renderThumb = useCallback(
    (props) => (
      <span {...props} className="revocations-slider_thumb">
        {!isMobile && (
          <>
            <span className="revocations-slider_percent">{valueNow}%</span>
            <span className="revocations-slider_hint">
              <b className="revocations-slider_hint-count">{finalRevocations}</b> Violations
              resulting in {state} incarceration
            </span>
          </>
        )}
      </span>
    ),
    [isMobile, finalRevocations, state, valueNow]
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
      {isMobile && (
        <div className="revocations-slider_footer">
          <span className="revocations-slider_percent">{valueNow}%</span>
          <span className="revocations-slider_hint">
            <b className="revocations-slider_hint-count">{finalRevocations}</b> Violations resulting
            in {state} incarceration
          </span>
        </div>
      )}
    </div>
  );
};

ChangeInRevocations.propTypes = {
  onChangeInRevocationsChange: PropTypes.func.isRequired,
  changeInRevocations: PropTypes.number.isRequired,
  finalRevocations: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
};

export default ChangeInRevocations;
