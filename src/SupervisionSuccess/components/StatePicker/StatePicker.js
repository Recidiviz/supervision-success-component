import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Picker from "../Picker";

import "./StatePicker.scss";

const StatePicker = ({ isError, states, year, state, onStateChange }) => {
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
    <div className="state-picker">
      <span className="state-picker_label">Choose state</span>
      <Picker
        className="state-picker_picker"
        menuLabel="States"
        isLarge
        defaultValue={options.find((item) => item.value === state)}
        options={options}
        onChange={onChange}
      />
      <span className="state-picker_hint">
        Based on {isError ? "-" : state} data from {isError ? "-" : year}
      </span>
    </div>
  );
};

StatePicker.defaultProps = {
  isError: false,
};

StatePicker.propTypes = {
  states: PropTypes.arrayOf(PropTypes.string).isRequired,
  year: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
  onStateChange: PropTypes.func.isRequired,
  isError: PropTypes.bool,
};

export default StatePicker;
