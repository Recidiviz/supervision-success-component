import React, { memo } from "react";
import PropTypes from "prop-types";

import "./ErrorScreen.css";

const ErrorScreen = ({ error }) => <div className="error-screen">{error}</div>;

ErrorScreen.propTypes = {
  error: PropTypes.string.isRequired,
};

export default memo(ErrorScreen);
