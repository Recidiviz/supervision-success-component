import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Picker from "../Picker";

import "./StatePicker.scss";

const StatePicker = ({ states, state, onStateChange }) => {
  const options = states.map((item) => ({
    label: item,
    value: item,
  }));
  const onChange = useCallback(
    ({ value }) => {
      onStateChange(value);
    },
    [onStateChange]
  );

  // TODO: Need to know where from year need to come
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
      />
      <span className="state-picker_hint">Based on {state} data from 2017</span>
    </div>
  );
};

StatePicker.propTypes = {
  states: PropTypes.arrayOf(PropTypes.string).isRequired,
  state: PropTypes.string.isRequired,
  onStateChange: PropTypes.func.isRequired,
};

export default StatePicker;
