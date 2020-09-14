import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Picker from "../Picker";

import "./StatePicker.css";

const options = [
  { value: "MO", label: "Missouri" },
  { value: "PA", label: "Pennsylvania" },
];

const StatePicker = ({ state, onStateChange }) => {
  const currentOption = options.find(({ value }) => value === state);

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
        defaultValue={currentOption}
        options={options}
        onChange={onChange}
      />
      <span className="state-picker_hint">Based on {currentOption.label} data from 2017</span>
    </div>
  );
};

StatePicker.propTypes = {
  state: PropTypes.string.isRequired,
  onStateChange: PropTypes.func.isRequired,
};

export default StatePicker;
