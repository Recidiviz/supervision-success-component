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
    fontSize: state.selectProps.isLarge ? "2.25rem" : "1.75rem",
    fontWeight: 700,
    transition: "color 0.2s",
    marginLeft: 0,
    marginRight: 0,
    "@media (max-width: 1200px)": {
      fontSize: state.selectProps.isLarge ? "2rem" : "1.5rem",
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
    backgroundColor: "transparent",
    color: state.isSelected ? "#07aded" : "#081d33",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingLeft: 0,
    paddingRight: 0,
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
