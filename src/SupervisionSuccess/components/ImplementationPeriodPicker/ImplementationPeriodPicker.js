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
        aria-label="Implementation period picker"
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
