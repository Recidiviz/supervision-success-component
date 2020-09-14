import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Picker from "../Picker";

import "./ProjectionsPicker.css";

const options = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

const ProjectionsPicker = ({ projections, onProjectionsChange }) => {
  const currentOption = options.find(({ value }) => value === projections);

  const onChange = useCallback(
    ({ value }) => {
      onProjectionsChange(value);
    },
    [onProjectionsChange]
  );

  const formatOptionLabel = useCallback(
    ({ label }, { context }) => (context === "menu" ? label : `${label} years`),
    []
  );

  return (
    <div className="projections-picker_root">
      <span className="projections-picker_label">Projections</span>
      <Picker
        className="projections-picker_picker"
        menuLabel="Years"
        defaultValue={currentOption}
        options={options}
        onChange={onChange}
        formatOptionLabel={formatOptionLabel}
      />
    </div>
  );
};

ProjectionsPicker.propTypes = {
  projections: PropTypes.number.isRequired,
  onProjectionsChange: PropTypes.func.isRequired,
};
export default ProjectionsPicker;
