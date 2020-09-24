import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Picker from "../Picker";

import "./StatePicker.scss";

const StatePicker = ({ isError, states, state, onStateChange }) => {
  const options = isError
    ? [{ label: "-", value: "-" }]
    : states.map((item) => ({
        label: item,
        value: item,
      }));
  const onChange = useCallback(
    ({ value }) => {
      onStateChange(value);
    },
    [onStateChange]
  );

  return (
    <div className="state-picker_root">
      <span className="state-picker_label">Choose state</span>
      <Picker
        className="state-picker_picker"
        menuLabel="States"
        isLarge
        defaultValue={options[0]}
        options={options}
        onChange={onChange}
        isError={isError}
      />
      <span className="state-picker_hint">
        Based on {isError ? "-" : state} data from {isError ? "-" : 2017}
      </span>
    </div>
  );
};

StatePicker.defaultProps = {
  isError: false,
};

StatePicker.propTypes = {
  states: PropTypes.arrayOf(PropTypes.string).isRequired,
  state: PropTypes.string.isRequired,
  onStateChange: PropTypes.func.isRequired,
  isError: PropTypes.bool,
};

export default StatePicker;
