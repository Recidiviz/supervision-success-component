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

import "./StatePicker.scss";

const StatePicker = ({ isError, states, year, state, onStateChange, isNotAvailable2020 }) => {
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
        aria-label="State picker"
        menuLabel="States"
        isLarge
        defaultValue={options.find((item) => item.value === state)}
        options={options}
        onChange={onChange}
      />
      <span className="state-picker_hint">
        Based on {isError ? "-" : state} data from {isError ? "-" : year}
        {!isNotAvailable2020 && !isError && ", 2020"}
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
  isNotAvailable2020: PropTypes.bool.isRequired,
};

export default StatePicker;
