import React from "react";
import PropTypes from "prop-types";

import SupervisionSuccessModelProvider from "./providers/SupervisionSuccessModelProvider";
import SupervisionSuccessComponent from "./components/SupervisionSuccess";

const SupervisionSuccess = ({ params }) => {
  return (
    <SupervisionSuccessModelProvider params={params}>
      <SupervisionSuccessComponent />
    </SupervisionSuccessModelProvider>
  );
};

SupervisionSuccess.propTypes = {
  params: PropTypes.shape({}).isRequired,
};

export default SupervisionSuccess;
