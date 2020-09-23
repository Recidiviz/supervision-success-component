import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Picker from "../Picker";

import "./ImplementationPeriodPicker.scss";

const options = [
  { value: 0, label: "0" },
  { value: 3, label: "3" },
  { value: 6, label: "6" },
  { value: 9, label: "9" },
  { value: 12, label: "12" },
];

const ImplementationPeriodPicker = ({ implementationPeriod, onImplementationPeriodChange }) => {
  const currentOption = options.find(({ value }) => value === implementationPeriod);

  const onChange = useCallback(
    ({ value }) => {
      onImplementationPeriodChange(value);
    },
    [onImplementationPeriodChange]
  );

  const formatOptionLabel = useCallback(
    ({ label }, { context }) => (context === "menu" ? label : `${label} months`),
    []
  );

  return (
    <div className="implementation-period-picker">
      <span className="implementation-period-picker_label">Implementation period</span>
      <Picker
        className="implementation-period-picker_picker"
        menuLabel="Months"
        defaultValue={currentOption}
        options={options}
        onChange={onChange}
        formatOptionLabel={formatOptionLabel}
      />
    </div>
  );
};

ImplementationPeriodPicker.propTypes = {
  implementationPeriod: PropTypes.number.isRequired,
  onImplementationPeriodChange: PropTypes.func.isRequired,
};

export default ImplementationPeriodPicker;
