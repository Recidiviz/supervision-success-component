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
import React from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";

/* istanbul ignore next , no sense to cover styles */
const customStyles = {
  container: (provided, state) => ({
    ...provided,
    "& [class$='singleValue']": {
      color: state.isFocused ? "#07aded" : "#081d33",
    },
    "&:hover [class$='singleValue']": {
      color: "#07aded",
    },
    "&:hover [class$='-Svg']": {
      color: "#07aded",
    },
  }),
  control: (provided) => ({
    ...provided,
    borderWidth: 0,
    borderStyle: "none",
    boxShadow: "none",
  }),
  singleValue: ({ maxWidth, position, top, transform, ...provided }, state) => ({
    ...provided,
    fontSize: state.selectProps.isLarge ? "3rem" : "2rem",
    lineHeight: state.selectProps.isLarge ? "3.625rem" : "2.4375rem",
    fontWeight: 700,
    transition: "color 0.2s",
    marginLeft: 0,
    marginRight: 0,
    "@media (max-width: 1023px)": {
      fontSize: "2rem",
      lineHeight: "2.5rem",
    },
  }),
  menu: (provided) => ({
    ...provided,
    whiteSpace: "nowrap",
    width: "auto",
    right: 0,
    border: 0,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: 0,
    color: state.isFocused ? "#07aded" : "#081d33",
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: state.selectProps.isLarge ? "1.25rem" : "1.125rem",
    fontWeight: 700,
    backgroundColor: state.isFocused ? "rgba(0, 0, 0, 0.1)" : "transparent",
    color: state.isSelected ? "#07aded" : "#081d33",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingLeft: 0,
    paddingRight: 0,
    flex: "auto",
  }),
};

const Picker = ({ menuLabel, options, ...props }) => (
  <ReactSelect
    components={{ IndicatorSeparator: null }}
    isSearchable={false}
    styles={customStyles}
    options={[
      {
        label: menuLabel,
        options,
      },
    ]}
    {...props}
  />
);

Picker.defaultProps = {
  isLarge: false,
};

Picker.propTypes = {
  menuLabel: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string,
  }).isRequired,
  isLarge: PropTypes.bool,
};

export default Picker;
