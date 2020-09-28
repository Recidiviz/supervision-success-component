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
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Picker from "../Picker";

import "./ProjectionsPicker.scss";

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
    <div className="projections-picker">
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
